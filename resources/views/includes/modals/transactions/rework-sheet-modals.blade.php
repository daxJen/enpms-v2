<div id="modal_rework_sheet" class="modal fade " data-backdrop="static">
    <div class="modal-dialog modal-full" role="document">
        <form method="POST" action="{{ url('/transaction/rework-sheet/set-up/save') }}" id="frm_rework_sheet">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Set Up Rework Sheet</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <div class="loadingOverlay-modal"></div>
                    @csrf
                    <h6>FROM</h6>
                    <hr/>
                    <div class="row mb-10">
                        <div class="col-md-7">
                            @csrf
                            <input type="hidden" id="id" name="id" class="clear">
                            <input type="hidden" id="userDivCode" name="userDivCode" class="clear">
                            <input type="hidden" id="UnprocessTransfer" name="UnprocessTransfer" class="clear" value='0'>

                            
                            <div class="form-group row">
                                <div class="col-sm-10">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">J.O. #:</span>
                                        </div>
                                        <input type="text" class="form-control validate clear" name="jo_no" id="jo_no">
                                        <span id="jo_no_feedback"></span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-10">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Production Order #:</span>
                                        </div>
                                        <input type="text" class="form-control validate clear" name="prod_order_no" id="prod_order_no" readonly>
                                        <span id="prod_order_no_feedback"></span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-12">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Product Code:</span>
                                        </div>
                                        <input type="hidden" class="form-control clear" name="travel_sheet_id" id="travel_sheet_id">
                                        <input type="text" class="form-control validate clear" name="prod_code" id="prod_code" readonly>
                                        <span id="prod_code_feedback"></span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-12">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Description:</span>
                                        </div>
                                        <input type="text" class="form-control validate clear" name="description" id="description" readonly>
                                        <span id="description_feedback"></span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-12">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Current Process:</span>
                                        </div>
                                        <select class="form-control select-validate clear" name="curr_process" id="curr_process">
                                            <option value=""></option>
                                        </select>
                                        <span id="curr_process_feedback"></span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="form-group row">
                                <div class="col-sm-12">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Output Status:</span>
                                        </div>
                                        <select class="form-control select-validate clear" name="ostatus" id="ostatus" title="Where will you get the quantity to transfer?">
                                            <option style="display:none"></option>
                                            <option value="good">GOOD</option>
                                            <option value="rework">REWORK</option>
                                            <option value="scrap">SCRAP</option>
                                            <option value="convert">CONVERT</option>
                                            <option value="alloy_mix">ALLOY MIX</option>
                                            <option value="nc">N/C</option>
                                        </select>           
                                        <span id="status_feedback"></span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="form-group row">
                                <div class="col-sm-12">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"># of Item to transfer:</span>
                                        </div>
                                        <input type="text" class="form-control select-validate clear" name="unprocessed" id="unprocessed" value='0' readonly>
                                        <span id="curr_process_feedback"></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-5">
                            <div class="form-group row">
                                <div class="col-sm-12">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Transfer Date:</span>
                                        </div>
                                        <input type="date" class="form-control" name="transfer_date" id="transfer_date">
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-12">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Transfer Time:</span>
                                        </div>
                                        <input type="time" class="form-control" name="transfer_time" id="transfer_time">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h6>TO</h6>
                    <hr/>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group row">
                                <div class="col-sm-9">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Process:</span>
                                        </div>
                                        <select class="form-control select-validate clear" name="process" id="process" data-div_code="">
                                            <option value=""></option>
                                        </select>
                                        <input type="hidden" class="form-control validate clear" name="process_id" id="process_id">
                                        <span id="process_feedback"></span>
                                    </div>
                                </div>
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-sm btn-block bg-green" id="btn_process">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-12">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Division Code:</span>
                                        </div>
                                        <select class="form-control select-validate clear" name="div_code" id="div_code">
                                            <option value=""></option>
                                        </select>
                                        <span id="div_code_feedback"></span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-6">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Qty:</span>
                                        </div>
                                        <input type="number" step='1' class="form-control validate clear" name="qty" id="qty">
                                        <span id="qty_feedback"></span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-10">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Status:</span>
                                        </div>
                                        <select class="form-control select-validate clear" name="status" id="status">
                                            <option style="display:none"></option>
                                            <option value="GOOD">GOOD</option>
                                            <option value="REWORK">REWORK</option>
                                            <option value="SCRAP">SCRAP</option>
                                            <option value="CONVERT">CONVERT</option>
                                        </select>           
                                        <span id="status_feedback"></span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="row">
                                <div class="col-sm-12">
                                    <div class="table-responsive">
                                        <table class="table table-sm table-hover table-bordered table-striped dt-responsive nowrap" id="tbl_product" style="width: 100%">
                                            <thead class="thead-dark">
                                                <tr>
                                                    <th width="20%">Product Code</th>
                                                    <th width="10%">Issued Qty</th>
                                                    <th width="20%">SC. Qty</th>
                                                    <th width="40%">SC No.</th>
                                                    <th width="10%"></th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbl_product_body"></tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="col-md-6">

                        <div class="col-md-6">
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Process Set</span>
                                </div>

                                <input type="hidden" name="process_id" id="process_id">
                                <input type="hidden" name="prod_id" id="prod_id">

                                <select class="form-control form-control-sm disableOnProduction" name="set" id="set">
                                    <option value=""></option>
                                </select>
                            </div>

                            <div class="input-group mb-3 input-group-sm">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Process:</span>
                                </div>
                                <select class="form-control select-validate" id="process"></select>
                                <div id="process_feedback"></div>
                            </div>

                            <div class="input-group mb-3 input-group-sm">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Sequence No.:</span>
                                </div>
                                <input type="number" class="form-control select-validate" id="sequence" min="1">
                                <div id="sequence_feedback"></div>
                            </div>

                            <div class="row justify-content-center">
                                <div class="col-sm-3 col-sm-3 mb-3" id="add_process">
                                    <button type="button" id="btn_add_process" class="btn btn-sm bg-green btn-block">
                                        <i class="fa fa-plus"></i> Add Process
                                    </button>
                                </div>
                                <div class="col-sm-3 col-sm-3 mb-3" id="cancel_process">
                                    <button type="button" id="btn_cancel_process" class="btn btn-sm bg-red btn-block">
                                        <i class="fa fa-times"></i> Cancel
                                    </button>
                                </div>
                            </div>

                            <div class="table-responsive">
                                <table class="table table-sm table-hover table-bordered table-striped dt-responsive nowrap" id="tbl_process">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th>#</th>
                                            <th>Process Name</th>
                                            <th>Remarks</th>
                                            <th>Div. Code</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbl_process_body"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn bg-red" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn bg-blue float-right permission-button disableOnProduction">
                        <i class="fa fa-floppy-o"></i> Save
                    </button>
                    <button type="button" class="btn bg-purple float-right" id="btn_travel_sheet_preview">
                        <i class="fa fa-eye"></i> Print Preview
                    </button>
                    {{-- <button type="button" class="btn bg-red float-right" id="btn_cancel_travel_sheet">
                        <i class="fa fa-times"></i> Cancel Travel Sheet
                    </button> --}}
                </div>

            </div>
        </form>
    </div>
</div>