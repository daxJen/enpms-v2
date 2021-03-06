@extends('layouts.app')

@section('title')
	PPC Dashboard
@endsection

@section('content')
<section class="content-header">
    <h1>Dashboard</h1>
</section>

<section class="content">
    <div class="form-group row">
        {{-- <div class="col-md-5">
            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Date From</span>
                </div>
                <input type="date" class="form-control" name="date_from" id="date_from" value="{{ $from }}">
            </div>
        </div>

        <div class="col-md-5">
            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Date To</span>
                </div>
                <input type="date" class="form-control" name="date_to" id="date_to" value="{{ $to }}">
            </div>
        </div> --}}
    </div>

    <div class="box">
        <div class="box-header with-border">
            <h3 class="box-title">Work In Progress</h3>
            <div class="box-tools">
                <button type="button" class="btn btn-sm bg-teal" id="btn_search_filter">
                    <i class="fa fa-search"></i> Search / Filter
                </button>
            </div>
        
        </div>
            <input type="hidden" id="dl_date_from" />
            <input type="hidden" id="dl_date_to" />
            <input type="hidden" id="dl_jo_no" />
            <input type="hidden" id="dl_prod_code" />
            <input type="hidden" id="dl_code_description" />
            <input type="hidden" id="dl_div_code" />
            <input type="hidden" id="dl_process_name" />
            <input type="hidden" id="dl_material_used" />
            <input type="hidden" id="dl_material_heat_no" />
            <input type="hidden" id="dl_lot_no" />
        <div class="box-body">
            {{-- <div class="table-responsive"> --}}
                <table class="table table-sm table-hover table-bordered table-striped nowrap" id="tbl_dashboard" style="width: 100%">
                    <thead class="thead-dark">
                        <tr>
                            <th>JO No.</th>
                            <th>Item Code</th>
                            <th>Description</th>
                            <th>Divison</th>
                            <th>Process</th>
                            <th>Material</th>
                            <th>Heat No.</th>
                            <th>Lot No.</th>
                            <th>Sched Qty.</th> 
                            <th>Unprocess</th>
                            <th>Good</th>
                            <th>Rework</th>
                            <th>Scrap</th>
                            <th>Total Ouput</th>
                            <th>Order Qty.</th>
                            <th>Total Issued Qty</th>
                            <th>Issued Qty</th> 
                            <th>Update Date</th> 
                           <!--  <th>End Date</th>     -->                  
                            <th>Status</th>

                        </tr>
                    </thead>
                    <tbody id="tbl_dashboard_body"></tbody>
                </table>
                
            {{-- </div> --}}
            
        </div>
    </div>
    <div class="form-group row">
        <div class="col-md-3">
            <div class="input-group input-group-sm">
                <div class="input-group-prepend">
                    <span class="input-group-text">Jo No:</span>
                </div>
                    <input class="form-control input-sm validate clear" name="jo_no" id="jo_no">
                <div id="jo_no_feedback"></div>
            </div>                            
        </div>
        <div class="col-md-1">
                <button type="button" class="btn btn-sm bg-teal" id="btn_graph">
                    <i class="fa fa-search"></i> Display Graph
                </button>
        </div>
    </div>
    
  <!--  <form action="" method="post" role="form">
        <div class="form-group row">
            <div class="col-md-5">
                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Job Order</span>
                    </div>
                    <select class="form-control" name="jo_no" id="jo_no" ></select>
                </div>
            </div>
        </div>
    </form> -->

    <div class="row" id="chart"></div>
</section>
@include('includes.modals.system-modals')
@include('includes.modals.ppc-dashboard-modal')
@endsection

@push('scripts')
    <script type="text/javascript">
        var get_dashboard = "{{ url('/dashboard/get-dashboard') }}";
        var get_chartURl = "{{ url('/dashboard/pie-graph') }}";
        var get_chartfilterURl = "{{ url('/dashboard/pie-graphfilter') }}";
        var get_jonoURL = "{{ url('/dashboard/get-jono') }}";
        var downloadSearchExcelURL = "{{ url('/dashboard/dashboard-search-excel') }}";
        // var getFilteredDataURL = "{{ url('/dashboard/dashboard-search-filter') }}";
    </script>
    <script src="{{ mix('/js/pages/ppc/dashboard/dashboard.js') }}"></script>
@endpush
