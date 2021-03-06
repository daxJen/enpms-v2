<div id="modal_production_output" class="modal fade " data-backdrop="static">
    <div class="modal-dialog modal-full" role="document">
        <form id="frm_prod_output" role="form" method="POST" action="{{ url('/prod/production-output/create') }}" >
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Production Output</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body table-responsive">
                    <div class="loadingOverlay-modal"></div>

                    <div class="row">
                        <div class="col-md-4">
							@csrf
							<input type="hidden" id="travel_sheet_process_id" name="travel_sheet_process_id">
							<input type="hidden" id="travel_sheet_id" name="travel_sheet_id">
							<input type="hidden" name="jo_sequence" id="jo_sequence">
                            <input type="hidden" id="prod_output_id" name="prod_output_id">
                            <input type="hidden" id="total_qty_transfer" name="total_qty_transfer" value='0'>
				            <div class="form-group row">
			                    <div class="col-sm-10">
			                        <div class="input-group input-group-sm">
			                            <div class="input-group-prepend">
			                                <span class="input-group-text">J.O. #:</span>
			                            </div>
			                            <input type="text" class="form-control validate " name="jo_no" id="jo_no" readonly>
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
			                            <input type="text" class="form-control validate " name="prod_order" id="prod_order" readonly>
			                            <span id="prod_order_feedback"></span>
			                        </div>
			                    </div>
			                </div>

			                <div class="form-group row">
			                    <div class="col-sm-10">
			                        <div class="input-group input-group-sm">
			                            <div class="input-group-prepend">
			                                <span class="input-group-text">Product Code:</span>
			                            </div>
			                            <input type="text" class="form-control validate " name="prod_code" id="prod_code" readonly>
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
			                            <input type="text" class="form-control validate " name="description" id="description" readonly>
			                            <span id="description_feedback"></span>
			                        </div>
			                    </div>
			                </div>

			                
						</div>

						<div class="col-md-4">

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
                        </div>

                        <div class="col-md-4">

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
				                            <span class="input-group-text">Process Date:</span>
				                        </div>
				                        <input type="date" class="form-control validate zero" name="process_date" id="process_date">
				                        <span id="process_date_feedback"></span>
				                    </div>
								</div>
								<div class="col-sm-6">
				                    <div class="input-group input-group-sm">
				                        <div class="input-group-prepend">
				                            <span class="input-group-text">Process Time:</span>
				                        </div>
				                        <input type="time" class="form-control validate zero" name="process_time" id="process_time">
				                        <span id="process_time_feedback"></span>
				                    </div>
				                </div>
							</div>

                            {{-- <div class="form-group row">
                                <div class="col-sm-6">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Created By:</span>
                                        </div>
                                        <input type="text" class="form-control" name="create_user" id="create_user" value="{{Auth::user()->user_id}}" readonly>
                                    </div>
                                </div>

                                <div class="col-sm-6">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Created Date:</span>
                                        </div>
                                        <input type="text" class="form-control" name="created_date" id="created_date" value="{{date('m/d/Y')}}" readonly>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-6">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Updated By:</span>
                                        </div>
                                        <input type="text" class="form-control" name="update_user" id="update_user" value="{{Auth::user()->user_id}}" readonly>
                                    </div>
                                </div>

                                <div class="col-sm-6">
                                    <div class="input-group input-group-sm">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Updated Date:</span>
                                        </div>
                                        <input type="text" class="form-control" name="updated_date" id="updated_date" value="{{date('m/d/Y')}}" readonly>
                                    </div>
                                </div>
                            </div> --}}
                        </div>
                    </div>

                    <div class="row mb-10 mt-15">
                    	<div class="col-md-3">

                    		<div class="form-group row">
				                <div class="col-sm-10">
				                    <div class="input-group input-group-sm">
				                        <div class="input-group-prepend">
				                            <span class="input-group-text">Previous Process:</span>
				                        </div>
				                        <input type="text" class="form-control validate" name="prev_process" id="prev_process" readonly>
				                        <span id="prev_process_feedback"></span>
				                    </div>
				                    <input type="hidden" name="current_process" id="current_process">
				                    <input type="hidden" name="sequence" id="sequence">
				                </div>
				            </div>

				            <div class="form-group row">
								<div class="col-sm-10">
				                    <div class="input-group input-group-sm">
				                        <div class="input-group-prepend">
				                            <span class="input-group-text">Operator ID:</span>
				                        </div>
				                        <input type="text" class="form-control input-sm validate clear" name="operator" id="operator">
				                        <span id="operator_feedback"></span>
				                    </div>
				                </div>
				            </div>
				            <div class="form-group row">
								<div class="col-sm-10">
				                    <div class="input-group input-group-sm">
				                        <div class="input-group-prepend">
				                            <span class="input-group-text">Operator Name:</span>
				                        </div>
				                        <input type="text" class="form-control input-sm validate clear" name="operator_name" id="operator_name">
				                        <span id="operator_name_feedback"></span>
				                    </div>
				                </div>
				            </div>

				            <div class="form-group row mb-15">
				                <div class="col-sm-10">
				                    <div class="input-group input-group-sm">
				                        <div class="input-group-prepend">
				                            <span class="input-group-text">Machine #:</span>
				                        </div>
				                        <input type="text" class="form-control input-sm validate clear" name="machine_no" id="machine_no">
				                        <span id="machine_no_feedback"></span>
				                    </div>
				                </div>
				            </div>

				            <div class="form-group row">
				                <div class="col-sm-10">
				                    <div class="input-group input-group-sm">
				                        <div class="input-group-prepend">
				                            <span class="input-group-text">Uprocessed:</span>
				                        </div>
				                        <input type="text" class="form-control validate" name="unprocessed" id="unprocessed" value="0" readonly>
				                        <span id="unprocessed_feedback"></span>
				                    </div>
				                </div>
				            </div>

				            <div class="form-group row">
				                <div class="col-sm-10">
				                    <div class="input-group input-group-sm">
				                        <div class="input-group-prepend">
				                            <span class="input-group-text">Good:</span>
				                        </div>
				                        <input type="number" step='1' class="form-control validate zero" name="good" id="good" value="0">
				                        <span id="good_feedback"></span>
				                    </div>
				                </div>
				            </div>

				            <div class="form-group row">
				                <div class="col-sm-10">
				                    <div class="input-group input-group-sm">
				                        <div class="input-group-prepend">
				                            <span class="input-group-text">Rework:</span>
				                        </div>
				                        <input type="number" step='1' class="form-control validate zero" name="rework" id="rework" value="0">
				                        <span id="rework_feedback"></span>
				                    </div>
				                </div>
				            </div>

				            <div class="form-group row mb-15">
				                <div class="col-sm-10">
				                    <div class="input-group input-group-sm">
				                        <div class="input-group-prepend">
				                            <span class="input-group-text">Scrap:</span>
				                        </div>
				                        <input type="number" step='1' class="form-control validate zero" name="scrap" id="scrap" value="0">
				                        <span id="scrap_feedback"></span>
				                    </div>
				                </div>
				            </div>

				            <div class="form-group row">
				                <div class="col-sm-10">
				                    <div class="input-group input-group-sm">
				                        <div class="input-group-prepend">
				                            <span class="input-group-text">Reworked:</span>
				                        </div>
				                        <input type="number" step='1' class="form-control validate zero" name="nc" id="nc" value="0">
				                        <span id="nc_feedback"></span>
				                    </div>
				                </div>
							</div>

				            <div class="form-group row mb-15">
				                <div class="col-sm-10">
				                    <div class="input-group input-group-sm">
				                        <div class="input-group-prepend">
				                            <span class="input-group-text">Convert:</span>
				                        </div>
				                        <input type="number" step='1' class="form-control validate zero" name="conver" id="conver" value="0">
				                        <span id="scrap_feedback"></span>
				                    </div>
				                </div>
				            </div>

				            <div class="form-group row">
				                <div class="col-sm-10">
				                    <div class="input-group input-group-sm">
				                        <div class="input-group-prepend">
				                            <span class="input-group-text">Alloy Mix:</span>
				                        </div>
				                        <input type="number" step='1' class="form-control validate zero" name="alloy_mix" id="alloy_mix" value="0" >
				                        <span id="alloy_mix_feedback"></span>
				                    </div>
				                </div>
				            </div>

                    	</div>

                    	<div class="col-9">
                    		<table class="table table-sm table-striped table-bordered" cellspacing="0" width="100%"  id="tbl_production_ouput">
		                        <thead class="thead-dark">
	                        		<th width="5%"></th>
	                                <th>Unprocssed</th>
	                                <th>Good</th>
	                                <th>Rework</th>
	                                <th>Scrap</th>
	                                <th>Reworked</th>
	                                <th>Convert</th>
	                                <th>Alloy Mix</th>
	                                <th>Total</th>
	                                <th>Process Date/Time</th>
	                                <th>Operator's Name</th>
	                                <th>Operator id</th>
	                                <th>Machine No</th>
		                        </thead>
		                        <tbody id="tbl_production_ouput_body"></tbody>
		                    </table>

		                    <div class="row justify-content-center">
		                    	<div class="col-md-3">
		                    		<button type="submit" id="btn_save_output" class="btn btn-sm btn-block bg-blue permission-button">
		                    			<i class="fa fa-floppy-o"></i> SAVE
		                    		</button>
		                    	</div> </form>
		                    	<div class="col-md-3">
			                        <button type="button" id="btn_update" class="btn bg-purple btn-block permission-button">
			                            <i class="fa fa-update"></i> Update
			                        </button>
			                    </div>
		                    	<!-- <div class="col-md-3">
		                    		<button type="button" id="btn_delete_set" class="btn btn-sm btn-block bg-red permission-button">
		                    			<i class="fa fa-trash"></i> Delete
		                    		</button>
		                    	</div> -->
		                    </div>
                    	</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn bg-red" data-dismiss="modal">Close</button>
                	<button type="button" id="btn_refresh" class="btn bg-green">Clear Entry</button>
                </div>
               
                    
            </div>
       
    </div>
</div>
