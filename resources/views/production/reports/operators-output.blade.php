@extends('layouts.app')

@section('title')
	Operator's Output
@endsection

@section('content')
 <?php
 $exist = 0;
foreach ($user_accesses as $user_access){
        if($user_access->code == "R0004" ){
            $exist++;
        }
}
    if($exist == 0){
        echo  '<script>window.history.back()</script>';
        exit;
    }
?>
<section class="content-header">
    <h1>Operators Output</h1>
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
                        <input type="hidden" id="dl_operator" />
                        <input type="hidden" id="dl_operator_name" />
                        <input type="hidden" id="dl_jo_no" />
                        <input type="hidden" id="dl_prod_code" />
                        <input type="hidden" id="dl_code_description" />
                        <input type="hidden" id="dl_div_code" />
                        <input type="hidden" id="dl_process_name" />
                        <input type="hidden" id="dl_machine_no" />
                    </div>
		           <table class="table table-sm table-hover table-striped table-bordered nowrap" id="tbl_operator" width="100%">
		                <thead class="thead-dark">
		                    <tr>
                                <th width="5%"></th>
		                        <th>Operator</th>
		                        <th>Operator Name</th>
		                        <th>JO Number</th>
		                        <th>Product Code</th>
                                <th>Description</th>
                                <th width="5%">Division</th>
		                        <th width="5%">Process </th>
		                        <th width="3%">Good</th>
		                        <th width="3%">Rework</th>
		                        <th width="3%">Scrap</th>
                                <th width="3%">Reworked</th>
		                        <th width="3%">Convert</th>
                                <th width="4%">Alloy Mix</th>
                                <th>Machine No.</th>
		                        <th>Process Date</th>
		                    </tr>
		                </thead>
		                <tbody id="tbl_operator_body"></tbody>
		            </table>
                </div>
            </div>
        </div>
    </div>
</section>
@include('includes.modals.reports.operator-report')
@endsection
@push('scripts')
    <script type="text/javascript">
        var downloadExcel = "{{ url('/prod/reports/operators-output/downloadExcel') }}";
        var displayOperatorsURL = "{{ url('/prod/reports/operators-output/displayoperator') }}";
        var displayOperatorsDateURL = "{{ url('/prod/reports/operators-output/displayoperatorDate') }}";
        var getOperatorsURL = "{{ url('/prod/reports/operators-output/getoperator') }}";
    </script>
    <script type="text/javascript" src="{{ asset('/js/pages/production/reports/operators-output.js') }}"></script>

@endpush