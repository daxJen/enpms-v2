<div id="modal_travel_sheet_status" class="modal fade " data-backdrop="static">
    <div class="modal-dialog modal-full" role="document">
        <form id="frm_prod_output" role="form" method="POST" action="{{ url('/prod/production-output/create') }}" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Production Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body table-responsive">
                    <div class="loadingOverlay-modal"></div>

                    <div class="row">
                        <div class="col-md-4">
                            @csrf
                        <!--     <input type="hidden" id="travel_sheet_process_id" name="travel_sheet_process_id">
                            <input type="hidden" id="travel_sheet_id" name="travel_sheet_id">
                            <input type="hidden" name="jo_sequence" id="jo_sequence">
                            <input type="hidden" id="prod_output_id" name="prod_output_id">
                            <input type="hidden" id="total_qty_transfer" name="total_qty_transfer" value='0'> -->
                            <div class="form-group row">
                                <!-- <div class="form-group row"> -->
                                <div class="col-sm-10">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">JO No:</span>
                                        </div>
                                        <input type="text" class="form-control validate " name="ts_jo_no" id="ts_jo_no" readonly>
                                        <span id="ts_jo_no_feedback"></span>
                                    </div>
                                <!-- </div> -->
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-10">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">J.O. Sequence:</span>
                                        </div>
                                        <input type="text" class="form-control validate " name="ts_jo_sequence" id="ts_jo_sequence" readonly>
                                        <span id="ts_jo_sequence_feedback"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-10">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Production Order :</span>
                                        </div>
                                        <input type="text" class="form-control validate " name="prod_order" id="prod_order" readonly>
                                        <span id="prod_order_feedback"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-10">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Product Code :</span>
                                        </div>
                                        <input type="text" class="form-control validate " name="ts_prod_code" id="ts_prod_code" readonly>
                                        <span id="ts_prod_code_feedback"></span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        <div class="col-md-4">
                             <div class="form-group row">
                                <div class="col-sm-12">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Description:</span>
                                        </div>
                                        <input type="text" class="form-control validate " name="description" id="description" readonly>
                                        <span id="description_feedback"></span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-12">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Material Used:</span>
                                        </div>
                                        <input type="text" class="form-control validate " name="mat_used" id="mat_used" readonly>
                                        <span id="mat_used_feedback"></span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-12">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Material Heat #:</span>
                                        </div>
                                        <input type="text" class="form-control validate " name="material_heat_no" id="material_heat_no" readonly >
                                        <span id="material_heat_no_feedback"></span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-12">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Lot #:</span>
                                        </div>
                                        <input type="text" class="form-control validate " name="lot_no" id="lot_no" readonly >
                                        <span id="lot_no_feedback"></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group row">
                                <div class="col-sm-12">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Type:</span>
                                        </div>
                                        <input type="text" class="form-control validate " name="type" id="type" readonly >
                                        <span id="type_feedback"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-12">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Order Qty:</span>
                                        </div>
                                        <input type="text" class="form-control validate " name="order_qty" id="order_qty" readonly>
                                        <span id="order_qty_feedback"></span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-12">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Issued Qty:</span>
                                        </div>
                                        <input type="text" class="form-control validate " name="issued_qty" id="issued_qty" readonly>
                                        <span id="issued_qty_feedback"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Updated Date:</span>
                                        </div>
                                        <input type="text" class="form-control validate zero" name="process_date" id="process_date" readonly>
                                        <span id="process_date_feedback"></span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="row mb-10 mt-15">
                            <table class="table table-sm table-striped table-bordered" cellspacing="0" width="100%"  id="tbl_production_ouput">
                                <thead class="thead-dark">
                                    <th># </th>
                                    <th>Unprocssed</th>
                                    <th>Good</th>
                                    <th>Rework</th>
                                    <th>Scrap</th>
                                    <th>Reworked</th>
                                    <th>Convert</th>
                                    <th>Alloy Mix</th>
                                    <th>Process</th>
                                    <th>Div Code</th>
                                    <th>Status</th>
                                    <th>Operator ID</th>
                                    <th>Operator Name</th>
                                    <th>Machine No.</th>
                                    <th>Updated Date</th>
                                </thead>
                                <tbody id="tbl_production_ouput_body"></tbody>
                            </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn bg-red" data-dismiss="modal">Close</button>
                    
                    <button type="button" id=btn_ts_preview class="btn bg-blue float-right permission-button">Re-print</button>
                </div>
                    
            </div>
       
    </div>
</div>
