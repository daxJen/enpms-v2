@extends('layouts.app')

@section('title')
	Rework Sheet
@endsection

@push('styles')
    <style type="text/css">
        .dataTables_scrollHeadInner{
            width:100% !important;
        }
        .dataTables_scrollHeadInner table{
            width:100% !important;
        }
        .modal-backdrop {
            z-index: -1;
        }
    </style>
@endpush
@section('content')
 <?php
 $exist = 0;
foreach ($user_accesses as $user_access){
        if($user_access->code == "T0010" ){
            $exist++;
        }
}
    if($exist == 0){
         echo  '<script>window.history.back()</script>';
        exit;
    }
?>
<section class="content-header">
    <h1>Rework Sheet</h1>
</section>

<section class="content">
	<div class="row justify-content-center mb-5">
        <div class="col-md-10 col-xs-12 col-sm-12">
            <!-- <div class="form-group row">
                <div class="col-md-3">
                    <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">From</span>
                        </div>
                        <input type="text" class="form-control" name="from" id="from" placeholder="J.O. Number">
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">To</span>
                        </div>
                        <input type="text" class="form-control" name="to" id="to" placeholder="J.O. Number">
                    </div>
                </div>

                <div class="col-md-2">
                    <div class="input-group input-group-sm mb-5">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Status</span>
                        </div>
                        <select class="form-control" name="status" id="status">
                            <option value="">All</option>
                            <option value="0">No quantity issued</option>
                            <option value="1">Ready to Issue</option>
                            <option value="2">On-going Process</option>
                            <option value="3">Cancelled</option>
                            <option value="4">Proceeded to Production</option>
                            <option value="5">Closed</option>
                            <option value="6">In Production</option>
                        </select>
                    </div>
                </div>

                <div class="col-md-2">
                    <button type="button" class="btn btn-block btn-sm bg-blue" id="searchPS">
                        <i class="fa fa-search"></i> Search
                    </button>
                </div>
            </div> -->
        </div>
    </div>

    <div class="row justify-content-center">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="box">
                <div class="box-body">
            		<div class="table-responsive">
            			<table class="table table-sm table-hover table-striped table-bordered nowrap" style="width: 100%" id="tbl_jo_details">
            				<thead class="thead-dark">
                                <tr>
                                    <th></th>
                                    <th>Job Order No.</th>
                                    <th>Product Code</th>
                                    <th>Description</th>
                                    <th>Based Qty.</th>
                                    <th>Rework Qty.</th>
                                    <th>From Process</th>
                                    <th>Division Code</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="tbl_jo_details_body"></tbody>
            			</table>
            		</div>
                </div>
            </div>
    	</div>
    </div>

    <div class="row justify-content-center">
    	<div class="col-lg-2 col-md-2 col-sm-2">
    		<button class="btn btn-lg bg-green btn-block mb-3" id="btn_travel_sheet_all_print_preview">
    			<i class="fa fa-file-text-o"></i> Rework Sheet
    		</button>
        </div>
        
        <div class="col-lg-2 col-md-2 col-sm-2">
    		<button class="btn btn-lg bg-blue btn-block mb-3" id="btn_proceed">
    			<i class="fa fa-arrow-right"></i> Proceed to Production
    		</button>
    	</div>
    </div>

</section>
@include('includes.modals.transactions.rework-sheet-modals')

@endsection

@push('scripts')
    <script type="text/javascript">
        // var joDetailsListURL = "{{ url('/transaction/rework-sheet/set-up/jo-list') }}";
        // var getProcessURL = "{{ url('/transaction/rework-sheet/set-up/process') }}";
        
        
        // var auth_user = "{{ Auth::user()->firstname.' '.Auth::user()->lastname }}";
        // var pdfReworkSheetURL = "{{ url('/pdf/travel-sheet') }}";
        // var getReworkSheetDataURL = "{{ url('/transaction/rework-sheet/rework-sheet-data') }}";

        var getReworkURL = "{{ url('/transaction/rework-sheet/set-up/rework-list') }}";
        var getJo_noURL = "{{ url('/transaction/rework-sheet/set-up/rework-process') }}";
        // var getProcessDivURL = "{{ url('/transaction/rework-sheet/get-process-div') }}";
        
    </script>
    <script type="text/javascript" src="{{ asset('/js/pages/ppc/transactions/rework-sheet/rework-sheet.js') }}"></script>
@endpush