<?php

namespace App\Http\Controllers\PPC\Reports;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HelpersController;
use App\Http\Controllers\Admin\AuditTrailController;
use DB;
use Excel;

class TravelSheetStatusController extends Controller
{
    protected $_helper = '';
    protected $_audit;
    protected $_moduleID;

    public function __construct()
    {
        // $this->middleware('ajax-session-expired');
        // $this->middleware('auth');
        $this->_helper = new HelpersController;
        $this->_audit = new AuditTrailController;

        $this->_moduleID = $this->_helper->moduleID('R0001');
    }

    public function index()
    {
        $user_accesses = $this->_helper->UserAccess();
        $permission_access = $this->_helper->check_permission('R0001');

        return view('ppc.reports.travel-sheet-status', [
            'user_accesses' => $user_accesses,
            'permission_access' => $permission_access
        ]);
    }
    public function search_travelsheet(Request $req)
    {
        $date_from = "NULL";
        $date_to = "NULL";
       
        if (isset($req->date_from) && !isset($req->date_to)) {
            $data = [
                        'msg' => 'The Date to required if the Date from have value.',
                        'status' => 'failed'
                    ];

            return response()->json($data);
        }
        $travelSheet_status=$this->GetTravelSheetStatusList($req);

        if (count($travelSheet_status) > 0) {
            $data = ['status' => 'success','ppo' => $travelSheet_status];
        } else {
                $data = ['msg' => 'No travel sheet in that date range.','status' => 'failed'];
        }

        return response()->json($data);
    }
    public function downloadExcel(Request $req)
    {
        $data=$this->getFilteredTSstatus($req);
        $date = date('Ymd');
        Excel::create('TRAVELSHEET_STATUS_'.$date, function($excel)use($data)
        {
            $excel->sheet('TravelSheetStatus', function($sheet) use($data)
            {
                $sheet->setHeight(4, 20);
                $sheet->mergeCells('A2:M2');
                $sheet->cells('A2:M2', function($cells) {
                    $cells->setAlignment('center');
                    $cells->setFont([
                        'family'     => 'Calibri',
                        'size'       => '14',
                        'bold'       =>  true,
                        'underline'  =>  true
                    ]);
                });
                $sheet->cell('A2',"Travel Sheet Status");

                $sheet->setHeight(6, 15);
                $sheet->cells('A4:M4', function($cells) {
                    $cells->setFont([
                        'family'     => 'Calibri',
                        'size'       => '11',
                        'bold'       =>  true,
                    ]);
                    // Set all borders (top, right, bottom, left)
                    $cells->setBorder('solid', 'solid', 'solid', 'solid');
                });

                $sheet->cell('A4', function($cell) {
                    $cell->setAlignment('center');
                    $cell->setValue("#");
                    $cell->setBorder('thick','thick','thick','thick');
                });
            
                $sheet->cell('B4', function($cell) {
                    $cell->setAlignment('center');
                    $cell->setValue("JO No#");
                    $cell->setBorder('thick','thick','thick','thick');
                });

                $sheet->cell('C4', function($cell) {
                    $cell->setAlignment('center');
                    $cell->setValue("JO Sequence");
                    $cell->setBorder('thick','thick','thick','thick');
                });

                $sheet->cell('D4', function($cell) {
                    $cell->setAlignment('center');
                    $cell->setValue("SC #");
                    $cell->setBorder('thick','thick','thick','thick');
                });

                $sheet->cell('E4', function($cell) {
                    $cell->setAlignment('center');
                    $cell->setValue("Prod Code");
                    $cell->setBorder('thick','thick','thick','thick');
                });

                $sheet->cell('F4', function($cell) {
                    $cell->setAlignment('center');
                    $cell->setValue("Description");
                    $cell->setBorder('thick','thick','thick','thick');
                });

                $sheet->cell('G4', function($cell) {
                    $cell->setAlignment('center');
                    $cell->setValue("Order Qty");
                    $cell->setBorder('thick','thick','thick','thick');
                });

                $sheet->cell('H4', function($cell) {
                    $cell->setAlignment('center');
                    $cell->setValue("Issued Qty");
                    $cell->setBorder('thick','thick','thick','thick');
                });

                $sheet->cell('I4', function($cell) {
                    $cell->setAlignment('center');
                    $cell->setValue("Remaining");
                    $cell->setBorder('thick','thick','thick','thick');
                });

                $sheet->cell('J4', function($cell) {
                    $cell->setAlignment('center');
                    $cell->setValue("Status");
                    $cell->setBorder('thick','thick','thick','thick');
                });

                $sheet->cell('K4', function($cell) {
                    $cell->setAlignment('center');
                    $cell->setValue("FG Stocks");
                    $cell->setBorder('thick','thick','thick','thick');
                });
                $sheet->cell('L4', function($cell) {
                    $cell->setAlignment('center');
                    $cell->setValue("CRUDE Stocks");
                    $cell->setBorder('thick','thick','thick','thick');
                });
                $sheet->cell('M4', function($cell) {
                    $cell->setAlignment('center');
                    $cell->setValue("Updated Date");
                    $cell->setBorder('thick','thick','thick','thick');
                });
                

                $row = 5;

                foreach ($data as $key => $dt) {
                    $sheet->setHeight($row, 15);
                    $sheet->cell('A'.$row, function($cell) use($dt,$row) {
                        $cell->setValue($row - 4);
                        $cell->setBorder('thin','thin','thin','thin');
                    });
                    $sheet->cell('B'.$row, function($cell) use($dt) {
                        $cell->setValue($dt->ts_jo_no);
                        $cell->setBorder('thin','thin','thin','thin');
                    });
                    $sheet->cell('C'.$row, function($cell) use($dt) {
                        $cell->setValue($dt->jo_sequence);
                        $cell->setBorder('thin','thin','thin','thin');
                    });
                    $sheet->cell('D'.$row, function($cell) use($dt) {
                        $cell->setValue($dt->sc_no);
                        $cell->setBorder('thin','thin','thin','thin');
                    });
                    $sheet->cell('E'.$row, function($cell) use($dt) {
                        $cell->setValue($dt->prod_code);
                        $cell->setBorder('thin','thin','thin','thin');
                    });
                    $sheet->cell('F'.$row, function($cell) use($dt) {
                        $cell->setValue($dt->code_description);
                        $cell->setBorder('thin','thin','thin','thin');
                    });
                    $sheet->cell('G'.$row, function($cell) use($dt) {
                        $cell->setValue($dt->order_qty);
                        $cell->setBorder('thin','thin','thin','thin');
                    });
                    $sheet->cell('H'.$row, function($cell) use($dt) {
                        $cell->setValue($dt->issued_qty);
                        $cell->setBorder('thin','thin','thin','thin');
                    });
                    $sheet->cell('I'.$row, function($cell) use($dt) {
                        $cell->setValue($dt->remaining);
                        $cell->setBorder('thin','thin','thin','thin');
                    });
                    $sheet->cell('J'.$row, function($cell) use($dt) {
                        $cell->setValue($dt->statusko);
                        $cell->setBorder('thin','thin','thin','thin');
                    });
                    $sheet->cell('K'.$row, function($cell) use($dt) {
                        $cell->setValue($dt->fg_stocks);
                        $cell->setBorder('thin','thin','thin','thin');
                    });
                    $sheet->cell('L'.$row, function($cell) use($dt) {
                        $cell->setValue($dt->crude_stocks);
                        $cell->setBorder('thin','thin','thin','thin');
                    });
                    $sheet->cell('M'.$row, function($cell) use($dt) {
                        $cell->setValue($dt->updated_date);
                        $cell->setBorder('thin','thin','thin','thin');
                    });
                    $row++;
                }
                
                $sheet->cells('A4:M'.$row, function($cells) {
                    $cells->setBorder('thick', 'thick', 'thick', 'thick');
                });
            });
        })->download('xlsx');
    }
   public function filterReport(Request $req)
    {
        return $this->getFilteredTSstatus($req);
    }
    public function getFilteredTSstatus($req)
    {
        $date_from = "NULL";
        $date_to = "NULL";
        $jo_no = "NULL";
        $jo_sequence = "NULL";
        $sc_no = "NULL";
        $prod_code = "NULL";
        $code_description = "NULL";
        $statusko = "NULL";
        
        if (!is_null($req->date_from) && !is_null($req->date_to)) {
            $date_from = "'" . $req->date_from . "'";
            $date_to = "'" . $req->date_to . "'";
        }

        if (!is_null($req->jo_no)) {
            $jo_no = "'" . $req->jo_no . "'";
        }

        if (!is_null($req->jo_sequence)) {
            $jo_sequence = "'" . $req->jo_sequence . "'";
        }

        if (!is_null($req->sc_no)) {
            $sc_no = "'" . $req->sc_no . "'";
        }

        if (!is_null($req->prod_code)) {
            $prod_code = "'" . $req->prod_code . "'";
        }

        if (!is_null($req->code_description)) {
            $code_description = "'" . $req->code_description . "'";
        }

        if (!is_null($req->statusko)) {
            $statusko = "'" . $req->statusko . "'";
        }
        
        $data = DB::select(
            DB::raw("CALL Get_TravelSheet_Status_Filter(" . $date_from . ",
                                                                " . $date_to . ",
                                                                " . $jo_no . ",
                                                                " . $jo_sequence . ",
                                                                " . $sc_no . ",
                                                                " . $prod_code . ",
                                                                " . $code_description . ",
                                                                " . $statusko . ",
                                                                " . Auth::user()->id . ")")
        );

        return $data;
    }
    public function displayProdDetails(Request $req)
    {
        $jo_sequence = "NULL";        
        if (!is_null($req->jo_sequence)) {
            $jo_sequence = "'" . $req->jo_sequence . "'";
        }

        $data = DB::select(
            DB::raw("CALL GET_prod_travel_sheet(" . $jo_sequence . ")")
        );

        return response ()->json($data); 
    }
    public function displayTravelSheet(Request $req){
        
            $data = DB::select(DB::raw("CALL Get_TravelSheet_Status(" . Auth::user()->id . ")"))  ;
        
             return response ()->json($data);                    
    }
}
