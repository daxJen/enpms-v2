@extends('layouts.app')

@section('title')
	Travel Sheet Status Report
@endsection

@section('content')
 <?php
 $exist = 0;
foreach ($user_accesses as $user_access){
        if($user_access->code == "R0001" ){
            $exist++;
        }
}
    if($exist == 0){
        echo  '<script>window.history.back()</script>';
        exit;
    }
?>
<section class="content-header">
    <h1>Travel Sheet Status</h1>
</section>
<section class="content">
	<div class="row justify-content-center">
        <div class="col-lg-12 col-md-10 col-sm-12 col-xs-12">
            <div class="box">
                <div class="box-body">
                    <div class="row">
                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <button type="button" id="btn_filter" class="btn btn-block bg-blue permission-button">Search / Filter</button>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <button type="button" id="btn_download" class="btn btn-block bg-green permission-button">Download</button>
                        </div>

                        <input type="hidden" id="dl_date_from" />
                        <input type="hidden" id="dl_date_to" />
                        <input type="hidden" id="dl_jo_no" />
                        <input type="hidden" id="dl_jo_sequence" />
                        <input type="hidden" id="dl_sc_no" />
                        <input type="hidden" id="dl_prod_code" />
                        <input type="hidden" id="dl_code_description" />
                        <input type="hidden" id="dl_status" />
                    </div>
		           <table class="table table-sm table-hover table-striped table-bordered nowrap" id="tbl_travel_sheet_status" width="100%">
		                <thead class="thead-dark">
		                    <tr>
                                <th width="5%"></th>
								<th>JO #</th>
								<th>JO Sequence #</th>
								<th>SC #</th>
								<th>Product Code</th>
								<th>Description</th>
								<th>Order Qty</th>
								<th>Issued Qty</th>
								<th>Remaining</th>
								<th>Status</th>
								<th>FG Stocks</th>
								<th>CRUDE Stocks</th>
								<th>Updated Date</th>
		                    </tr>
		                </thead>
		                <tbody id="tbl_travel_sheet_status_body"></tbody>
		            </table>
                </div>
            </div>
        </div>
    </div>
</section>

@include('includes.modals.system-modals')
@include('includes.modals.reports.travel-sheet-filter-modal')
@include('includes.modals.reports.travel-sheet-status-modal')
 


@endsection
@push('scripts')
    <script type="text/javascript">
        var downloadExcel = "{{ url('reports/travel-sheet-status/downloadExcel') }}";
        var displayTSURL = "{{ url('reports/travel-sheet-status/displayTS') }}";
        var displayProdTSURL = "{{ url('reports/travel-sheet-status/displayProdTS') }}";
        var pdfTSReprintURL = "{{ url('/pdf/travel-sheet-status') }}";
    </script>
	<script type="text/javascript" src="{{ asset('/js/pages/ppc/reports/travel-sheet-status.js') }}"></script>
@endpush
