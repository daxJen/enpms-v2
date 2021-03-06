<div id="modal_upload_orders" class="modal fade " data-backdrop="static">
    <div class="modal-dialog" role="document">
        <form>
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Do you want to overwrite from Production Schedule?</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                
                <div class="modal-body">
                    <p id="overwrite_msg"></p>
                    <table class="table table-sm table-striped table-bordered dt-responsive nowrap" id="tbl_overwrite" style="width:100%">
                        <thead class="thead-dark">
                            <th></th>
                            <th>SC#</th>
                            <th>Product Code</th>
                            <th>Current Quantity</th>
                            <th>New Quantity</th>
                            <th>P.O. No.</th>
                            <th style="display:none;">ID</th>
                        </thead>
                        <tbody id="tbl_overwrite_body">
                            <tr>
                                <td colspan="5">No data displayed.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn bg-red" data-dismiss="modal">
                        <i class="fa fa-thumbs-down"></i> No
                    </button>
                    {{-- <button type="button" class="btn bg-blue float-right" data-dismiss="modal" id="btn_yes"> --}}
                    <button type="button" class="btn bg-blue float-right" id="btn_yes">
                         <i class="fa fa-thumbs-up"></i> Yes
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>


<div id="modal_not_registered" class="modal fade " data-backdrop="static">
    <div class="modal-dialog" role="document">
        <form>
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">These products are not registered in Product Master</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                
                <div class="modal-body">
                    <p>Most of data are uploaded but these products are not registered in Product Master.</p>
                    <br>
                    <table class="table table-sm table-striped table-bordered dt-responsive nowrap" id="tbl_not_registered" style="width:100%">
                        <thead class="thead-dark">
                            <th>SC#</th>
                            <th>Product Code</th>
                            <th>Quantity</th>
                            <th>P.O. No.</th>
                        </thead>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn bg-red" data-dismiss="modal">Close</button>
                    <button type="button" class="btn bg-green float-right permission-button" id="btn_excel">
                         <i class="fa fa-download"></i> Download excel file
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>

<div id="modal_Schedule" class="modal fade " data-backdrop="static">
    <div class="modal-dialog" role="document">
        <form>
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">These products are already have a pending production schedule</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                
                <div class="modal-body">
                    <p>Most of data are uploaded but these products are have a pending production schedule.</p>
                    <br>
                    <table class="table table-sm table-striped table-bordered dt-responsive nowrap" id="tbl_Schedule" style="width:100%">
                        <thead class="thead-dark">
                            <th>SC#</th>
                            <th>Product Code</th>
                            <th>Quantity</th>
                            <th>P.O. No.</th>
                        </thead>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn bg-red" data-dismiss="modal">Close</button>
                </div>
            </div>
        </form>
    </div>
</div>

<div id="modal_order_search" class="modal fade " data-backdrop="static">
    <div class="modal-dialog modal-md" role="document">
        <form method="GET" action="{{ url('/transaction/upload-orders/search-filter-orders') }}" id="frm_search">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Search / Filter Orders</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                
                <div class="modal-body">
                    <div class="loadingOverlay-modal"></div>

                    @csrf

                    <div class="row">
                        <div class="col-md-12">

                            <div class="form-group row">
                                <label for="srch_date_upload" class="col-sm-2 control-label mt-5">Upload Date:</label>
                                <div class="col-sm-10">
                                    <div class="input-group input-group-sm">
                                        <input type="date" class="form-control validate srch-clear" name="srch_date_upload_from" id="srch_date_upload_from">
                                        
                                        <div class="input-group-append">
                                            <span class="input-group-text">-</span>
                                        </div>
                                        <input type="date" class="form-control validate srch-clear" name="srch_date_upload_to" id="srch_date_upload_to">
                                        
                                    </div>
                                    <div id="srch_date_upload_from_feedback"></div>
                                    <div id="srch_date_upload_to_feedback"></div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="srch_sc_no" class="col-sm-2 control-label mt-5">SC No.:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control validate srch-clear" name="srch_sc_no" id="srch_sc_no">
                                    <div id="srch_sc_no_feedback"></div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="srch_prod_code" class="col-sm-2 control-label mt-5">Product Code:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control validate srch-clear" name="srch_prod_code" id="srch_prod_code">
                                    <div id="srch_prod_code_feedback"></div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="srch_description" class="col-sm-2 control-label mt-5">Description:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control validate srch-clear" name="srch_description" id="srch_description">
                                    <div id="srch_description_feedback"></div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="srch_po" class="col-sm-2 control-label mt-5">P.O.:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control validate srch-clear" name="srch_po" id="srch_po">
                                    <div id="srch_po_feedback"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row justify-content-center">
                        <div class="col-md-12" style="display:none" id="progress">
                            <div class="progress">
                                <div class="progress-bar progress-bar-success progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="00" aria-valuemin="0" aria-valuemax="100" style="width: 00%">
                                    <span class="sr-only"></span>
                                </div>
                            </div>
                            <span class="progress-msg">Processing...</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn bg-red" data-dismiss="modal">Close</button>
                    <button type="button" id="btn_search_excel" class="btn bg-green float-right">Download Excel</button>
                    <button type="submit" class="btn bg-blue float-right permission-button">Filter</button>
                </div>
                
            </div>
        </form>
    </div>
</div>