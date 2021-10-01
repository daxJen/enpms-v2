<div id="modal_search" class="modal fade " data-backdrop="static">
    <div class="modal-dialog modal-lg" role="document">
        <form method="GET" action="{{ url('/prod/reports/operators-output/filter-report') }}" id="frm_search">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Search / Filter</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                
                <div class="modal-body">
                    <div class="loadingOverlay-modal"></div>

                    @csrf

                    <div class="row">
                        <div class="col-md-6">

                            <div class="form-group row">
                                <label for="date" class="col-sm-3 control-label mt-5">Date:</label>
                                <div class="col-sm-8">
                                    <div class="input-group input-group-sm">
                                        <input type="date" class="form-control validate srch-clear" name="date_from" id="date_from">
                                        
                                        <div class="input-group-append">
                                            <span class="input-group-text">-</span>
                                        </div>
                                        <input type="date" class="form-control validate srch-clear" name="date_to" id="date_to">
                                        
                                    </div>
                                    <div id="date_from_feedback"></div>
                                    <div id="date_to_feedback"></div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="jo_no" class="col-sm-3 control-label mt-5">Operator ID:</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control validate srch-clear" name="operator" id="operator">
                                    <div id="operator_feedback"></div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="prod_code" class="col-sm-3 control-label mt-5">Operator Name:</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control validate srch-clear" name="operator_name" id="operator_name">
                                    <div id="operator_name_feedback"></div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="code_description" class="col-sm-3 control-label mt-5">Jo Number:</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control validate srch-clear" name="jo_no" id="jo_no">
                                    <div id="jo_no_feedback"></div>
                                </div>
                            </div>
                            
                        </div>

                        <div class="col-md-6">
                            <div class="form-group row">
                                <label for="div_code" class="col-sm-2 control-label mt-5">Division:</label>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control validate srch-clear" name="div_code" id="div_code">
                                    <div id="div_code_feedback"></div>
                                </div>
                                <label for="machine_no" class="col-sm-2 control-label mt-5">Machine No.:</label>
                                <div class="col-sm-5">
                                    <input type="text" class="form-control validate srch-clear" name="machine_no" id="machine_no">
                                    <div id="machine_no_feedback"></div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="div_code" class="col-sm-2 control-label mt-5">Product Code:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control validate srch-clear" name="prod_code" id="div_code">
                                    <div id="prod_code_feedback"></div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="div_code" class="col-sm-2 control-label mt-5">Description:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control validate srch-clear" name="description" id="description">
                                    <div id="description_feedback"></div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="process_name" class="col-sm-2 control-label mt-5">Process:</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control validate srch-clear" name="process_name" id="process_name">
                                    <div id="process_name_feedback"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn bg-red" data-dismiss="modal">Close</button>
                    
                    <button type="submit" class="btn bg-blue float-right permission-button">Filter</button>
                    <button type="button" id="btn_clear" class="btn btn-secondary float-right"><i class="fa fa-refresh"></i> Clear</button>
                </div>
                
            </div>
        </form>
    </div>
</div>