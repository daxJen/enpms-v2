<?php

namespace App\Http\Controllers\Production\Transaction;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HelpersController;
use App\Http\Controllers\Admin\AuditTrailController;
use Illuminate\Support\Facades\Auth;
use App\ProdTransferItem;
use App\ProdTravelSheet;
use App\ProdTravelSheetProcess;
use DB;
use DataTables;
use App\PpcDivision;
use App\Notification;
use Event;
use App\Events\Notify;

class TransferItemController extends Controller
{
    protected $_helper;
    protected $_audit;
    protected $_moduleID;

    public function __construct()
    {
        // $this->middleware('ajax-session-expired');
        // $this->middleware('auth');
        $this->_helper = new HelpersController;
        $this->_audit = new AuditTrailController;

        $this->_moduleID = $this->_helper->moduleID('T0008');
    }

    public function index()
    {
        $user_accesses = $this->_helper->UserAccess();
        $permission_access = $this->_helper->check_permission('T0008');
        return view('production.transaction.transfer-item',[
                    'user_accesses' => $user_accesses,
                    'permission_access' => $permission_access
                ]);
    }

    public function save(Request $req)
    {
        $div = PpcDivision::find($req->div_code);

        $data = [
            'msg' => 'Saving failed.',
            'status' => 'failed',
            'transfer_item' => ''
        ];

        $this->validate($req, [ 
                'jo_no' => 'required',
                'prod_order_no' => 'required',
                'prod_code' => 'required',
                'description' => 'required',
                'qty' => 'required|integer|not_in:0',
                'div_code' => 'required',
                'process' => 'required',
                'status' => 'required'
        ],['not_in' => 'The :attribute field is not be in 0.']);

        $trans_date = '';

        if (isset($req->transfer_date) && isset($req->transfer_time)) {
            $trans_date = $req->transfer_date.' '.$req->transfer_time;
        } elseif (!isset($req->transfer_date) && isset($req->transfer_time)) {
            $trans_date = date('Y-m-d').' '.$req->transfer_time;
        } elseif (isset($req->transfer_date) && !isset($req->transfer_time)) {
            $trans_date = $req->transfer_date.' '.date('H:i:s');
        } else {
            $trans_date = date('Y-m-d H:i:s');
        }

        // check if transsaction id for update
        if (isset($req->id)) {
            $items = ProdTransferItem::find($req->id);

            if ($items->item_status == 1) {
                # code...
            } else {
                $items->jo_no = strtoupper($req->jo_no);
                $items->prod_order_no = strtoupper($req->prod_order_no);
                $items->prod_code = strtoupper($req->prod_code);
                $items->description = strtoupper($req->description);
                $items->process = strtoupper($req->process);
                $items->div_code = $req->div_code;
                $items->status = strtoupper($req->status);
                $items->remarks = strtoupper($req->remarks);
                $items->qty = $req->qty;
                $items->item_status = 0;
                $items->receive_remarks = "";
                $items->receive_qty = 0;
                $items->output_status = $req->ostatus;
                $items->date_transfered = $trans_date;

                if (strtoupper($req->status) !== 'REWORK') {
                    $items->process_id = $req->process_id;
                }
                
                $items->update_user = Auth::user()->id;
                $items->updated_at = date('Y-m-d h:i:s');
                $items->update();

                $this->_audit->insert([
                    'user_type' => Auth::user()->user_type,
                    'module_id' => $this->_moduleID,
                    'module' => 'Transfer Item',
                    'action' => 'Edited Transfer Item JO: '.$req->jo_no.', Product Code: '.strtoupper($req->prod_code),
                    'user' => Auth::user()->id,
                    'fullname' => Auth::user()->firstname. ' ' .Auth::user()->lastname
                ]);

                $data = [
                    'msg' => 'Successfully saved.',
                    'status' => 'success',
                    'transfer_item' => $this->getTransferEntry()
                ];
            }
        } else {
            // check if data already exist
            $check = DB::select(DB::raw("select (select `".strtolower($req->status)."`
                                        from enpms.prod_travel_sheet_processes
                                        where id = ".$req->curr_process.") as current_process,
                                        (select `" . strtolower($req->status) . "`
                                        from enpms.prod_travel_sheet_processes
                                        where process = '".strtoupper($req->process)."'
                                        and travel_sheet_id = ".$req->travel_sheet_id." 
                                        and div_code = ".$req->div_code.") as to_process"));
            if (count((array)$check) > 0) {
                if ((double)$check[0]->current_process <= (double)$check[0]->to_process) {
                    $data = [
                        'msg' => 'Already transfered items.',
                        'status' => 'failed',
                        'transfer_item' => $this->getTransferEntry()
                    ];
                    
                    return response()->json($data);
                }

                // get reamaining qty
                $remaining_qty = (double)$check[0]->current_process - (double)$check[0]->to_process;

                // check if transfer qty is more than the remaining qty of process
                if ((double)$req->qty > (double)$remaining_qty) {
                    $data = [
                        'msg' => 'Quantity to transfer is more than '.$remaining_qty.' remaining quantity for transfer.',
                        'status' => 'failed',
                        'transfer_item' => $this->getTransferEntry()
                    ];

                    return response()->json($data);
                }

                $check_existence = DB::select("SELECT sum(ti.qty) as qty, ti.process as process, d.div_code as div_code 
                                                FROM prod_transfer_items as ti
                                                join ppc_divisions as d
                                                on d.id = ti.div_code
                                                where jo_no = '".$req->jo_no."'
                                                and deleted <> 1
                                                and current_process = ".$req->curr_process."
                                                and `status` = '".$req->status. "'
                                                group by ti.process, d.div_code
                                                ");
                if (count((array)$check_existence) > 0) {
                    if ((float)$check_existence[0]->qty >= (float)$req->qty) {
                        $msg = $req->status . ' quantity('. $req->qty.') is already transfered to Process: '. $check_existence[0]->process .', Div Code: '. $check_existence[0]->div_code .', Qty: '. $check_existence[0]->qty;
                        $data = [
                            'msg' => $msg,
                            'status' => 'failed',
                            'transfer_item' => $this->getTransferEntry()
                        ];

                        return response()->json($data);
                    } else if ((float)$req->qty > (float)$check_existence[0]->qty) {
                        $msg = 'You already transfered to Process: ' . $check_existence[0]->process . ', Div Code: ' . $check_existence[0]->div_code . ', Qty: ' . $check_existence[0]->qty.', Please transfer the remaining quantity.';
                        $data = [
                            'msg' => $msg,
                            'status' => 'failed',
                            'transfer_item' => $this->getTransferEntry()
                        ];

                        return response()->json($data);
                    }
                }
            }

            // save transaction
            $items = new ProdTransferItem();
            $items->jo_no = strtoupper($req->jo_no);
            $items->prod_order_no = strtoupper($req->prod_order_no);
            $items->prod_code = strtoupper($req->prod_code);
            $items->description = strtoupper($req->description);
            $items->current_process = $req->curr_process;
            $items->process = strtoupper($req->process);
            $items->div_code = $req->div_code;
            $items->qty = $req->qty;
            $items->status = strtoupper($req->status);
            $items->remarks = strtoupper($req->remarks);
            $items->receive_remarks = "";
            $items->receive_qty = 0;
            $items->item_status = 0;
            $items->output_status = $req->ostatus;
            $items->date_transfered = $trans_date;

            if (strtoupper($req->status) !== 'REWORK') {
                $items->process_id = $req->process_id;
            }
            
            $items->create_user = Auth::user()->id;
            $items->update_user = Auth::user()->id;
            $items->created_at = date('Y-m-d h:i:s');
            $items->updated_at = date('Y-m-d h:i:s');

            $items->save();

            $this->_audit->insert([
                'user_type' => Auth::user()->user_type,
                'module_id' => $this->_moduleID,
                'module' => 'Transfer Item',
                'action' => 'Transfered Item JO: '.$req->jo_no.', Product Code: '.strtoupper($req->prod_code),
                'user' => Auth::user()->id,
                'fullname' => Auth::user()->firstname. ' ' .Auth::user()->lastname
            ]);

            // get person to notify
            $to_notify = DB::table('ppc_divisions as d')
                        ->join('ppc_division_processes as p','p.division_id','=','d.id')
                        ->where('d.id',$items->div_code)
                        ->where('p.process',$items->process)
                        ->select('d.user_id')
                        ->get();

            $notis = [];

            foreach ($to_notify as $key => $notify) {
                // make notification
                Notification::create([
                    'title' => "Transfer Items",
                    'content' => "Items from Division Code [".$this->_helper->currentDivCodeID($req->curr_process).
                                    "] and is currently in process of ".$this->_helper->currentProcessID($req->curr_process).
                                    " for transferring to Division Code [".
                                    $this->_helper->getDivCodeByID($req->div_code).
                                    "] in process of ".$req->process.".",
                    'from' => Auth::user()->firstname." ".Auth::user()->lastname,
                    'from_id' => Auth::user()->id,
                    'to' => $notify->user_id,
                    'read' => 0,
                    'module' => 'T0007',
                    'link' => '../prod/transfer-item?receive_items=true',
                    'content_id' => $items->id,
                    'create_user' => Auth::user()->id,
                    'update_user' => Auth::user()->id
                ]);
            }

            // get created notification
            $noti = Notification::select('to','content')->where('read',0)->get();

            // send notification
            Event::fire(new Notify($noti));

            $data = [
                'msg' => 'Successfully saved.',
                'status' => 'success',
                'transfer_item' => $this->getTransferEntry()
            ];
        }

        return response()->json($data);
    }

    public function getTransferEntry()
    {
        $entry = DB::select(DB::raw("CALL GET_transfer_items(".Auth::user()->id.")"));
        return DataTables::of($entry)
						->editColumn('id', function($data) {
							return $data->id;
                        })
                        ->editColumn('item_status', function($data) {
							if ($data->item_status == 1) {
                                return "RECEIVED";
                            } else {
                                return "TRANSFERED";
                            }
                        })
                        ->addColumn('action', function($data) {
                            $disabled ='';
                            if ($data->item_status != 0) {
                                $disabled = 'disabled';
                            }

                            $transfer_date = substr($data->date_transfered, 0, 10);
                            $transfer_time = substr($data->date_transfered, -8);

                            return "<button class='btn btn-sm btn-primary btn_edit'
                                        data-id='".$data->id."'
                                        data-jo_no='".$data->jo_no."'
                                        data-prod_order_no='".$data->prod_order_no."'
                                        data-prod_code='".$data->prod_code."'
                                        data-description='".$data->description."'
                                        data-current_process='".$data->current_process."'
                                        data-div_code='".$data->div_code."'
                                        data-user_div_code='".$data->user_div_code."'
                                        data-process='".$data->process."'
                                        data-qty='".$data->qty."'
                                        data-status='".$data->status."'
                                        data-remarks='".$data->remarks."'
                                        data-output_status='".$data->output_status."'
                                        data-transfer_date='".$transfer_date."'
                                        data-transfer_time='".$transfer_time."'
                                        data-process_id='".$data->process_id."'
                                        data-create_user='".$data->create_user."'
                                        data-created_at='".$data->created_at."'
                                        data-update_user='".$data->update_user."'
                                        data-updated_at='".$data->updated_at."' ".$disabled.">
                                        <i class='fa fa-edit'></i>
                                    </button>";
                        })
                        ->make(true);
                        
        // if (count((array)$entry) > 0) {
        //     return $entry;
        // }
        
        // return '';
    }

    public function received_items()
    {
        $receivables = DB::select(DB::raw("CALL GET_received_items(".Auth::user()->id.")"));
        return DataTables::of($receivables)
						->editColumn('id', function($data) {
							return $data->id;
                        })
                        ->editColumn('item_status', function($data) {
							if ($data->item_status == 1) {
                                return "RECEIVED";
                            } else {
                                return "TRANSFERED";
                            }
                        })
                        ->addColumn('action', function($data) {
                            $disabled ='';
                            if ($data->item_status != 0) {
                                $disabled = 'disabled';
                            }

                            return "<button class='btn btn-sm btn-primary btn_receive' 
                                        data-id='".$data->id."'
                                        data-jo_no='".$data->jo_no."'
                                        data-current_process_name='".$data->current_process_name."'
                                        data-user_div_code='".$data->user_div_code."'
                                        data-current_process='".$data->current_process."'
                                        data-qty='".$data->qty."'
                                        data-receive_qty='".$data->receive_qty."'
                                        data-remaining_qty='".$data->remaining_qty."'
                                        data-process='".$data->process."'
                                        data-current_div_code='".$data->current_div_code."'
                                        data-prod_order_no='".$data->prod_order_no."'
                                        data-prod_code='".$data->prod_code."'
                                        data-description='".$data->description."'
                                        data-div_code='".$data->div_code."'
                                        data-status='".$data->status."'
                                        data-ostatus='".$data->output_status."'
                                        data-remarks='".$data->remarks."'
                                        data-create_user='".$data->create_user."'
                                        data-created_at='".$data->created_at."'
                                        data-item_status='".$data->item_status."'
                                        data-process_id='".$data->process_id."'
                                        data-update_user='".$data->update_user."'
                                        data-updated_at='".$data->updated_at."' ".$disabled.">
                                        <i class='fa fa-edit'></i> Receive
                                    </button>";
                        })
                        ->make(true);
    }

    public function DivisionCode(Request $req)
    {
        $div_code = DB::table('ppc_divisions as d')
                    ->leftjoin('ppc_division_processes as dp', 'd.id', '=', 'dp.division_id')
                    ->select('d.id as id', 'd.div_code as div_code', 'd.plant as plant')
                    ->where('dp.process', $req->process)->get();
        return response()->json($div_code);
    }

    public function getDivCodeProcess(Request $req)
    {
        $jo = ProdTravelSheet::where('jo_no',$req->jo_no)
                            ->orWhere('jo_sequence',$req->jo_no)
                            ->select('id')->first();
        $process =DB::table('prod_travel_sheet_processes as tsp')
                ->join('prod_travel_sheets as ts', 'ts.id', '=', 'tsp.travel_sheet_id')
                            ->where('tsp.travel_sheet_id',$jo->id)
                            ->select('tsp.id as process_id','tsp.process as process')
                            ->get();
        return response()->json($process);
    }

    public function destroy(Request $req)
    {
        $data = [
            'msg' => 'Deleting items was failed.',
            'status' => 'failed'
        ];

        $moved_qty_id = [];
        $deleted = 0;

        if (isset($req->ids)) {
            foreach ($req->ids as $key => $id) {
                $transfer_item = ProdTransferItem::find($id);

                if ($transfer_item->item_status == 1) {
                    // check if qty already moved
                    $process = ProdTravelSheetProcess::find($transfer_item->process_id);

                    $moved_qty = $process->good + $process->rework + $process->scrap + $process->conver + $process->alloy_mix + $process->nc;

                    if ($moved_qty > 0) {
                        array_push($moved_qty_id,$transfer_item->id);
                    } else {
                        // delete transfer item
                        $transfer_item->deleted = 1;
                        $transfer_item->deleted_at = date('Y-m-d H:i:s');
                        $transfer_item->delete_user = Auth::user()->id;
                        $transfer_item->update();

                        $deleted++;

                        // deduct from receive process
                        $process->unprocessed = $process->unprocessed - $transfer_item->receive_qty;
                        $process->update();

                        // delete notification
                        Notification::where('content_id',$id)->delete();

                        // make audit
                        $current = ProdTravelSheetProcess::find($transfer_item->current_process);
                        $msg = "Deleted Transfer data of ".$transfer_item->jo_no." from ".$current->div_code." ".$current->process." to ".$transfer_item->process."";

                        $this->_audit->insert([
                            'user_type' => Auth::user()->user_type,
                            'module_id' => $this->_moduleID,
                            'module' => 'Transfer Item',
                            'action' => $msg,
                            'user' => Auth::user()->id,
                            'fullname' => Auth::user()->firstname. ' ' .Auth::user()->lastname
                        ]);
                    }
                } else {
                    // delete transfer item
                    $transfer_item->deleted = 1;
                    $transfer_item->deleted_at = date('Y-m-d H:i:s');
                    $transfer_item->delete_user = Auth::user()->id;
                    $transfer_item->update();

                    $deleted++;
                    // delete notification
                    Notification::where('content_id',$id)->delete();

                    // make audit
                    $current = ProdTravelSheetProcess::find($transfer_item->current_process);
                    $msg = "Deleted Transfer data of ".$transfer_item->jo_no." from ".$current->div_code." ".$current->process." to ".$transfer_item->process."";

                    $this->_audit->insert([
                        'user_type' => Auth::user()->user_type,
                        'module_id' => $this->_moduleID,
                        'module' => 'Transfer Item',
                        'action' => $msg,
                        'user' => Auth::user()->id,
                        'fullname' => Auth::user()->firstname. ' ' .Auth::user()->lastname
                    ]);
                }
            }
            
        }

        $moved = [];

        if (count($moved_qty_id) > 0) {
            $id = implode(",",$moved_qty_id);
            $moved = DB::select("select ti.jo_no as jo_no,
                                        ti.prod_code as prod_code,
                                        ti.description as description,
                                        (select div_code 
                                        from prod_travel_sheet_processes as p 
                                        where p.id = ti.current_process
                                        limit 1) as current_div_code,
                                        (select process 
                                        from prod_travel_sheet_processes as p 
                                        where p.id = ti.current_process
                                        limit 1) as current_process,
                                        (select div_code 
                                        from ppc_divisions as d 
                                        where d.id = ti.div_code
                                        limit 1) as to_div_code,
                                        ti.process as to_process,
                                        ti.receive_qty
                                from prod_transfer_items as ti
                                where ti.id in (".$id.")");
        }

        if ($deleted > 0) {
            $data = [
                'msg' => "Data was successfully deleted.",
                'status' => "success",
                'moved_data' => $moved
            ];
        } else {
            $data = [
                'msg' => "Nothing was deleted.",
                'status' => "failed",
                'moved_data' => $moved
            ];
        }

        return response()->json($data);
    }

    public function getJOdetails(Request $req)
    {
        $data = [
            'jo' => '',
            'current_processes' => ''
        ];

        $jo = DB::table('prod_travel_sheets as ts')
                ->leftJoin('ppc_product_codes as pc','ts.prod_code','=','pc.product_code')
                // ->where('ts.jo_no',$req->jo_no)
                ->Where('ts.jo_sequence',$req->jo_no)
                ->select(
                    DB::raw("ts.id as id"),
                    DB::raw("ts.prod_order_no as prod_order_no"),
                    DB::raw("ts.prod_code as prod_code"),
                    DB::raw("ifnull(pc.code_description,ts.description) as description"),
                    DB::raw("`status` as `status`")
                )->first();

        if(isset($jo->id)){
            if (count((array)$data) > 0) {
                $data = [
                    'jo' => $jo,
                    'current_processes' => $this->getCurrentProcesses($jo->id)
                ];

                return response()->json($data);
            }
        }

        return response()->json($data);
    }

    private function getDivCode($travel_sheet_id)
    {
        $div_codes = [];
        // $divs = PpcDivision::where('user_id',Auth::user()->id)
        //                     ->select('div_code')
        //                     ->get();

        $divs = DB::table('prod_travel_sheet_processes')
                        ->where('travel_sheet_id',$travel_sheet_id)
                        ->select('div_code')
                        ->get();

        // $divs = DB::select("SELECT d.div_code,p.process FROM enpms.ppc_divisions as d
        //                     inner join enpms.ppc_division_processes as p
        //                     on d.id = p.division_id");

        if (count((array)$divs)) {
            foreach ($divs as $key => $div) {
                array_push($div_codes, $div->div_code);
            }
        }

        return $div_codes;
    }

    private function getCurrentProcesses($id)
    {
        $div_codes = $this->getDivCode($id);

        $current_processes = DB::table('prod_travel_sheet_processes')
                        ->whereIn('div_code',$div_codes)
                        ->where('travel_sheet_id',$id)
                        /* ->where('is_current','<>',0) */
                        ->select('id','process')
                        ->groupBy('id','process')
                        ->orderBy('id','asc')
                        ->get();

        if (count((array)$current_processes) > 0) {
            return $current_processes;
        }

        return '';
    }

    public function unprocessedItem(Request $req)
    {
        $data = [
                'UnprocessTravel' => [],
                'UnprocessTransfer' => 0
            ];

        if (isset($req->output_status)) {
            $UnprocessTravel =DB::table('prod_travel_sheet_processes')
                                ->where('id',$req->current_process)
                                ->select(
                                    DB::raw("`".$req->output_status."` as total_qty"), 
                                    'div_code', 
                                    'leader'
                                )
                                ->first();

            $UnprocessTransfer = DB::table('prod_transfer_items as i')
                            ->join('prod_travel_sheet_processes as tsp', 'tsp.id', '=', 'i.current_process')
                            ->where('i.current_process', $req->current_process)
                            ->where('i.item_status' , 0 )  
                            ->select(DB::raw("SUM(i.qty) as qty"))->groupBy('i.current_process')->first();
            $qty =0;            
            if(isset($UnprocessTransfer->qty)){
                $qty = $UnprocessTransfer->qty;
            }
            $data = [
                'UnprocessTravel' => $UnprocessTravel,
                'UnprocessTransfer' => $qty
            ];
        }

        return response()->json($data);
    }

    public function receiveProcess(Request $req)
    {
        //Getting id 
        $jo_no = ProdTravelSheet::where('jo_no',$req->jo_no)->orWhere('jo_sequence',$req->jo_no)->select('id')->first();

        //Update the qty of the process that will transfer to other div code
        $qty = $req->qty;
        $qtyprocess = $req->qty;

        if ($req->status == 'SCRAP' || $req->status == 'CONVERT'){
            $qty = 0;
        } else if($req->status == 'GOOD'){
            $qtyprocess = 0;
        }

        // accumulate the unprocess of next process.
        $data = ProdTravelSheetProcess::where('id' , $req->process_id)->where('div_code',$req->user_div_code)
                ->where('process',$req->process)->update([
                    'unprocessed' => DB::raw("`unprocessed` + ".$qty)
                    //  strtolower($req->status) => DB::raw( strtolower($req->status)."+".$qtyprocess)
                ]);

        $hasNewProcess = 0;
        
        //Inserting new process if different Div Code and the process not yet existing in that div code
        if($data == 0){
            $tsp = ProdTravelSheetProcess::where('travel_sheet_id' , $jo_no->id)->where('process' , $req->process)->first();

            $newProcess = ProdTravelSheetProcess::insertGetId([
                    'travel_sheet_id' => $jo_no->id,
                    'unprocessed' => $req->qty,
                    'process' => $req->process,
                    'previous_process' => $req->current_process_name,
                    'div_code' => $req->user_div_code,
                    'sequence' => $tsp->sequence,
                    'status' => 4,
                    // strtolower($req->status) => $qtyprocess,
                    'create_user' => Auth::user()->id,
                    'update_user' => Auth::user()->id,
                ]);

            $hasNewProcess++;
        }

        //Update qty of the unprocessed in production output
        //added by jawo 2021-02-17 start
        // ProdTravelSheetProcess::where('id' , $req->current_process)
        //                         ->update([
        //                             strtolower($req->ostatus) => DB::raw(strtolower($req->ostatus)." - ".$req->qty)
        //                         ]);
        //added by jawo 2021-02-17 end
        
        //Update Status 
        $item = ProdTransferItem::find($req->id);

        $received_qty =  (double)$item->receive_qty + $req->qty;

        if ($item->qty == $received_qty) {
            $item->item_status = 1;

            ProdTravelSheetProcess::where('travel_sheet_id' , $jo_no->id)
                                ->where('process' , $req->current_process_name)
                                ->update([
                                    'is_current' => 0
                                ]);
        }

        // if has new process inserted, update the process_id of transfer data
        if ($hasNewProcess > 0) {
            $item->process_id = $newProcess;
        }
        
        $item->receive_remarks = $req->remarks;
        $item->receive_qty = $received_qty;
        $item->update_user = Auth::user()->id;
        $item->date_received = date('Y-m-d h:i:s');
        $item->update();

        // Read notification
        Notification::where('content_id',$req->id)->update(['read' => 1]);

        // get users to notify depending on division
        $to_notify = DB::table('ppc_divisions')
                        ->where('div_code',$req->user_div_code)
                        ->select('user_id')
                        ->get();
        $notis = [];
        foreach ($to_notify as $key => $notify) {
            // create notification
            Notification::create([
                'title' => "Received Items",
                'content' => "Division Code [".$req->user_div_code."] and its process [".$req->process."] has been 
                                 received the transfer item from 
                                 Division Code [".$req->current_div_code."] and its process [".$req->current_process_name."].",
                'from' => Auth::user()->firstname." ".Auth::user()->lastname,
                'from_id' => Auth::user()->id,
                'to' => $notify->user_id,
                'read' => 0,
                'module' => 'T0007',
                'link' => '../prod/transfer-item',
                'content_id' => $item->id,
                'create_user' => Auth::user()->id,
                'update_user' => Auth::user()->id
            ]);
        }
        // get created notification
        $noti = Notification::select('to','content')->where('read',0)->get();

        // send notification
        Event::fire(new Notify($noti));

        $this->_audit->insert([
            'user_type' => Auth::user()->user_type,
            'module_id' => $this->_moduleID,
            'module' => 'Received Items',
            'action' => 'Item Received Job number '.$req->jo_no,
            'user' => Auth::user()->id,
            'fullname' => Auth::user()->firstname. ' ' .Auth::user()->lastname
        ]);

        return response()->json($data);

    }

    public function SaveNewProcess(Request $req)
    {
        $data = [
            'msg' => "Process was successfully added.",
            'status' => "success"
        ];

        foreach ($req->processes as $key => $process) {
            $travel_process = ProdTravelSheetProcess::where('travel_sheet_id' , $req->travel_sheet_id)
                                        ->where('div_code',$req->division)
                                        ->where('process' , $process)
                                        ->get();

            if ($travel_process->count() != 0) {
                $data = [
                    'msg' => 'This process ('.$process.') already on the travel sheet.',
                    'status' => 'failed'
                ];
            }else{
                $tsp = ProdTravelSheetProcess::where('id' , $req->curr_process)->first();

                $newProcess = ProdTravelSheetProcess::insertGetId([
                        'travel_sheet_id' => $req->travel_sheet_id,
                        'unprocessed' => 0,
                        'process' => $process,
                        'previous_process' => $req->current_process_name,
                        'div_code' => $req->division,
                        'sequence' => $tsp->sequence,
                        'status' => 0,
                        'create_user' => Auth::user()->id,
                        'update_user' => Auth::user()->id,
                    ]);
            }


        }
        return response()->json($data);

    }

    public function getExtraDivCode(Request $req)
    {
        $div = DB::select("SELECT distinct d.id as id, d.div_code as `text` 
                            FROM ppc_divisions d
                            join ppc_division_processes as dp
                            on dp.division_id = d.id
                            order by d.div_code");
        return response()->json($div);
    }

    public function getExtraProcess(Request $req)
	{
		$pro = DB::select("SELECT distinct 
                                    dp.process as id,
                                    dp.process as `text`
                            FROM ppc_divisions d
                            join ppc_division_processes as dp
                            on dp.division_id = d.id
                            where d.id = ".$req->div_code_id."
                            order by dp.process");
		return response()->json($pro);
	}
}
