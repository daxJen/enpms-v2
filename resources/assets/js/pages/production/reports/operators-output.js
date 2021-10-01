var operator_output_arr = [];
var searched_operator_arr = [];

$( function() {
    init();
    displayOperators();
    
    $("#frm_search").on('submit', function(e) {
        e.preventDefault();
        $('.loadingOverlay-modal').show();

        $.ajax({
            url: $(this).attr('action'),
            type: 'GET',
            dataType: 'JSON',
            data: $(this).serialize(),
        }).done(function(data, textStatus, xhr) {
            $('#dl_date_from').val($('#date_from').val());
            $('#dl_date_to').val($('#date_to').val());
            $('#dl_operator').val($('#operator').val());
            $('#dl_operator_name').val($('#operator_name').val());
            $('#dl_jo_no').val($('#jo_no').val());
            $('#dl_prod_code').val($('#prod_code').val());
            $('#dl_code_description').val($('#code_description').val());
            $('#dl_div_code').val($('#div_code').val());
            $('#dl_process_name').val($('#process_name').val());
            $('#dl_machine_no').val($('#machine_no').val());

            makeOperatorTable(data);

        }).fail(function(xhr, textStatus, errorThrown) {
            ErrorMsg(xhr);
        }).always(function() {
            $('.loadingOverlay-modal').hide();
        });
    });


    
	$("#frm_operator").on('submit',function(e){
        e.preventDefault();
        $('.loadingOverlay').show();
    });

    $('#btn_download').on('click', function() {
        window.location.href = downloadExcel + '?date_from=' + $('#dl_date_from').val() +
            '&date_to=' + $('#dl_date_to').val() +
            '&operator=' + $('#dl_operator').val() +
            '&operator_name=' + $('#dl_operator_name').val() +
            '&jo_no=' + $('#dl_jo_no').val() +
            '&prod_code=' + $('#dl_prod_code').val() +
            '&code_description=' + $('#dl_code_description').val() +
            '&div_code=' + $('#dl_div_code').val() +
            '&process_name=' + $('#dl_process_name').val();
            '&machine_no=' + $('#dl_machine_no').val();
    });
    
    $('#btn_clear').on('click', function() {
        $('.srch-clear').val('');
       
    });
	
});

$('#btn_filter').on('click', function() {
        $('#modal_search').modal('show');
    });
// $('#btnSearch').on('click', function () {
//     if ($('#id_operator').val() != "" && $('#date_from').val() != "" && $('#date_to').val() != "") {

//           $('.loadingOverlay').show();
//           $.ajax({
//             url: getOperatorsURL,
//             type: 'GET',
//             dataType: 'JSON',
//             data: {
//               _token: token,
//               date_from: $('#date_from').val(),
//               date_to: $('#date_to').val(),
//               id_operator: $('#id_operator').val()
//             }
//           }).done(function (data, textStatus, xhr) {
//             operator_output_arr = data;
//             makeOperatorTable(operator_output_arr);
//           }).fail(function (xhr, textStatus, errorThrown) {
//             ErrorMsg(xhr);
//            }).always(function() {
//              $('.loadingOverlay').hide();
//             });
//     }else if ($('#id_operator').val() == "" && $('#date_from').val() != "" && $('#date_to').val() != "") {
//              $('.loadingOverlay').show();
//           $.ajax({
//             url: displayOperatorsDateURL,
//             type: 'GET',
//             dataType: 'JSON',
//             data: {
//               _token: token,
//               date_from: $('#date_from').val(),
//               date_to: $('#date_to').val(),
//             }
//           }).done(function (data, textStatus, xhr) {
//             operator_output_arr = data;
//             makeOperatorTable(operator_output_arr);
//           }).fail(function (xhr, textStatus, errorThrown) {
//             ErrorMsg(xhr);
//            }).always(function() {
//              $('.loadingOverlay').hide();
//             });
//     }
//     else{
//             msg("From Input is required","warning");
//         }
//  });

$('#tbl_operator_body').on('click', '.btn_edit_set', function () {  
   $('#id').val($(this).attr('data-id'));
   $('#operator').val($(this).attr('data-operator'));
   $('#operator_name').val($(this).attr('data-operator_name'));
   $('#jo_sequence').val($(this).attr('data-jo_sequence'));
   $('#prod_code').val($(this).attr('data-prod_code'));
   $('#description').val($(this).attr('data-description'));      
   $('#div_code').val($(this).attr('data-div_code'));  
   $('#current_process').val($(this).attr('data-current_process'));
   $('#good').val($(this).attr('data-good'));
   $('#rework').val($(this).attr('data-rework'));
   $('#scrap').val($(this).attr('data-scrap'));
   $('#nc').val($(this).attr('data-nc'));
   $('#conver').val($(this).attr('data-conver'));
   $('#alloy_mix').val($(this).attr('data-alloy_mix'));
   $('#machine_no').val($(this).attr('data-machine_no'));
   $('#process_date').val($(this).attr('data-process_date'));
   $('#user_id').val($(this).attr('data-user_id'));
   // getOperators($(this).attr('data-user_id'));    
  
    
  });
function init() {
    if (permission_access == '2' || permission_access == 2) {
        $('.permission').prop('readonly', true);
        $('.permission-button').prop('disabled', true);
    } else {
        $('.permission').prop('readonly', false);
        $('.permission-button').prop('disabled', false);
    }

    makeOperatorTable();
}
function displayOperators() {
   
    $('.loadingOverlay').show();
  $.ajax({
    url: displayOperatorsURL,
    type: 'GET',
    dataType: 'JSON',
    data: {
      _token: token
     
    }
  }).done(function (data, textStatus, xhr) {
    operator_output_arr = data;
    makeOperatorTable(operator_output_arr);
  }).fail(function (xhr, textStatus, errorThrown) {
    ErrorMsg(xhr);
   }).always(function() {
     $('.loadingOverlay').hide();
    });

}

function makeOperatorTable(arr) {
     var row = -1;
    $('#tbl_operator').dataTable().fnClearTable();
    $('#tbl_operator').dataTable().fnDestroy();
    $('#tbl_operator').dataTable({
        data: arr,
        bLengthChange: false,
        searching: true,
        pageLength: 10,
        order: [[2, 'asc']],
        columns: [{
            data: function data(x) { 
            row++;
            return "<button type='button' class='btn btn-lg bg-blue btn_edit_set' " +
            "data-id='" + x.id + "'" +
            "'data-operator='" + x.operator + 
            "'data-operator_name='" + x.operator_name + 
            "'data-jo_sequence='" + x.jo_sequence + 
            "'data-prod_code='" + x.prod_code +
            "'data-code_description='" + x.description +
            "'data-div_code='" + x.div_code +
            "'data-current_process='" + x.current_process +
            "'data-good='" + x.good +
            "'data-rework='" + x.rework +
            "'data-scrap='" + x.scrap +
            "'data-nc='" + x.nc +
            "'data-conver='" + x.conver +
            "'data-alloy_mix='" + x.alloy_mix +
            "'data-process_date='" + x.process_date +
            "'data-machine_no='" + x.machine_no +     
            "'data-user_id='" + x.user_id +         
            "'value='" + x.id + "'>" + 
            "<i class='fa fa-edit'></i>" +
            "</button>";
            },

          searchable: false,
          orderable: false,
          width: '3.33%'

            }, { data: 'operator', width: '5.33%'}, 
            { data: 'operator_name', width: '10.33%'},
		    { data: 'jo_sequence', width: '9.33%'},
		    { data: 'prod_code', width: '8.33%'},
		    { data: 'code_description', width: '9.33%'},
            { data: 'div_code', width: '4.33%'},
		    { data: 'current_process', width: '8.33%'},
		    { data: 'good', width: '4.33%'},
		    { data: 'rework', width: '4.33%'},
		    { data: 'scrap', width: '4.33%'},
            { data: 'nc', width: '4.33%'},
            { data: 'conver', width: '4.33%'},
            { data: 'alloy_mix', width: '5.33%'},
            { data: 'machine_no', width: '5.33%'},
            { data: 'process_date', width: '6.33%'
       },],
    // fnInitComplete: function fnInitComplete() {
    //   $('.loadingOverlay-modal').hide();
    //   $('.dataTables_scrollBody').slimscroll();

      fnInitComplete: function() {
            $('.loadingOverlay').hide();
            $('.dataTables_scrollBody').slimscroll();
            $("#tbl_transfer_entry").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
    
  });
}