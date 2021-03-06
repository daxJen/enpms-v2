var prod_output_arr = [];
var searched_jo_arr = [];
var tag_update = 0;
$(function () {
  makeSearchTable(searched_jo_arr);
  checkAllCheckboxesInTable('.check_all', '.check_item');
  init();

  $('#tbl_searched_jo_body').on('click', '.btn_edit_travel_sheet', function () {
    clear();
    $('#travel_sheet_process_id').val($(this).attr('data-id'));
    $('#travel_sheet_id').val($(this).attr('data-travel_sheet_id'));
    $('#jo_sequence').val($(this).attr('data-jo_sequence'));
    $('#jo_no').val($(this).attr('data-jo_no'));
    $('#prod_order').val($(this).attr('data-prod_order_no'));
    $('#prod_code').val($(this).attr('data-prod_code'));
    $('#description').val($(this).attr('data-description'));
    $('#mat_used').val($(this).attr('data-material_used'));
    $('#material_heat_no').val($(this).attr('data-material_heat_no'));
    $('#lot_no').val($(this).attr('data-lot_no'));
    $('#type').val($(this).attr('data-type'));
    $('#order_qty').val($(this).attr('data-order_qty'));
    $('#issued_qty').val($(this).attr('data-issued_qty'));
    $('#prev_process').val($(this).attr('data-previous_process'));
    $('#current_process').val($(this).attr('data-process'));
    $('#sequence').val($(this).attr('data-sequence'));
    $('#unprocessed').val($(this).attr('data-unprocessed'));
    getTransferQty($(this).attr('data-id'));
    $('.loadingOverlay-modal').show();
    getOutputs($(this).attr('data-id'));
    tag_update = 0;
    if ($(this).attr('data-unprocessed') > 0) {
      $('#btn_save_output').prop('disabled', false);
    } else {
      $('#btn_save_output').prop('disabled', true);
    }

    $('#modal_production_output').modal('show');
    $('#btn_update').prop('disabled', true);
  });
  $('#tbl_production_ouput_body').on('click', '.btn_delete_set', function () {
   var travel_sheet_process_id = $(this).attr('data-travel_sheet_process_id');
   var id = $(this).val();
   
   var msgtext = "You will not be able to recover your data.";

    swal({
        title: "Are you sure?",
        text: msgtext,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f95454",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        closeOnConfirm: true,
        closeOnCancel: false
    }, function(isConfirm){
        if (isConfirm) {
          $('.loadingOverlay').show();
           $.ajax({
              url: deleteProductonOutput,
              type: 'POST',
              dataType: 'JSON',
              data: {
                id: id,
                travel_sheet_process_id: travel_sheet_process_id
              }
            }).done(function (data, textStatus, xhr) {
              msg("Production Output was successfully deleted.", 'success');
              $('#unprocessed').val(data.unprocessed);
              getOutputs($('#travel_sheet_process_id').val());
              searched_jo_arr = [];
              searched_jo_arr = data.travel_sheet;
              makeSearchTable(searched_jo_arr);
              clear();
            }).fail(function (xhr, textStatus, errorThrown) {
              ErrorMsg(xhr);
            });
       } else {
            swal("Cancelled", "Your data is safe and not deleted.");
      }
      });
    
  });
  $('#tbl_production_ouput_body').on('click', '.btn_edit_set', function () {
    var id;
      id = $(this).attr('data-travel_sheet_process_id');
      $('#operator').val($(this).attr('data-operator'));
      $('#operator_name').val($(this).attr('data-operator_name'));
      $('#machine_no').val($(this).attr('data-machine_no'));
      $('#unprocessed').val($(this).attr('data-unprocessed'));
      $('#good').val($(this).attr('data-good'));
      $('#scrap').val($(this).attr('data-scrap'));
      $('#rework').val($(this).attr('data-rework'));
      $('#nc').val($(this).attr('data-reworked'));
      $('#conver').val($(this).attr('data-convert'));
      $('#alloy_mix').val($(this).attr('data-alloy_mix'));
      $('#btn_save_output').prop('disabled',true);
      $('#btn_update').prop('disabled',false);
      tag_update = 1;
 
  });
  
  $('#btn_update').on('click', function (e) {
    var id;
      id = $(this).attr('data-travel_sheet_process_id');
      $('#operator').val($(this).attr('data-operator'));
      $('#operator_name').val($(this).attr('data-operator_name'));
      $('#machine_no').val($(this).attr('data-machine_no'));
      $('#unprocessed').val($(this).attr('data-unprocessed'));
      $('#good').val($(this).attr('data-good'));
      $('#scrap').val($(this).attr('data-scrap'));
      $('#rework').val($(this).attr('data-rework'));
      $('#nc').val($(this).attr('data-reworked'));
      $('#conver').val($(this).attr('data-convert'));
      $('#alloy_mix').val($(this).attr('data-alloy_mix'));
      $('#btn_save_output').prop('disabled',true);
      $('#btn_update').prop('disabled',false);
      tag_update = 1;


    var msgtext = "You want to edit/modify your data.";

    swal({
        title: "Are you sure?",
        text: msgtext,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f95454",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        closeOnConfirm: true,
        closeOnCancel: false
    }, function(isConfirm){
        if (isConfirm) {
          $('.loadingOverlay').show();
           $.ajax({
              url: editProdOutput,
              type: 'POST',
              dataType: 'JSON',
              data: {
                id: id,
                travel_sheet_process_id: travel_sheet_process_id,
                operator: operator,
                operator_name: operator_name,
                machine_no: machine_no,
                unprocessed: unprocessed,
                good: good,
                rework: rework,
                scrap: scrap,
                nc: nc,
                conver: conver,
                alloy_mix: alloy_mix
              }
            }).done(function (data, textStatus, xhr) {
              msg("Production Output was successfully edited.", 'success');
              $('#unprocessed').val(data.unprocessed);
              getOutputs($('#travel_sheet_process_id').val());
              searched_jo_arr = [];
              searched_jo_arr = data.travel_sheet;
              makeSearchTable(searched_jo_arr);
              clear();
            }).fail(function (xhr, textStatus, errorThrown) {
              ErrorMsg(xhr);
            });
       } else {
            swal("Cancelled", "No changes has been made.");
      }
      });
    
  });
  $('#btn_refresh').on('click', function (e) {
    $('#operator').val('');
    $('#operator_name').val('');
    $('#machine_no').val('');
    $('#unprocessed').val(0);
    $('#good').val(0);
    $('#rework').val(0);
    $('#scrap').val(0);
    $('#nc').val(0);
    $('#conver').val(0);
    $('#alloy_mix').val(0);
    $('#btn_save_output').prop('disabled',false);
    $('#btn_update').prop('disabled',true);
    tag_update = 0;



    if ($(this).attr('data-unprocessed') > 0) {
      $('#btn_save_output').prop('disabled', false);
    } else {
      $('#btn_save_output').prop('disabled', true);
    }
  });
  
  function clear_state() {
  $('.clear').val('');
  }

  $('#frm_search_jo').on('submit', function (e) {
    e.preventDefault();
    $('.loadingOverlay').show();
    searched_jo_arr = [];
    $.ajax({
      url: $(this).attr('action'),
      type: 'POST',
      dataType: 'JSON',
      data: $(this).serialize()
    }).done(function (data, textStatus, xhr) {
      if (data.status == 'failed') {
        makeSearchTable([]);
        msg(data.msg, data.status);
      } else {
        searched_jo_arr = data.jo;
        makeSearchTable(searched_jo_arr);
      }
    }).fail(function (xhr, textStatus, errorThrown) {
      makeSearchTable([]);
      ErrorMsg(xhr);
    }).always(function (xhr, textStatus) {
      $('.loadingOverlay').hide();
    });
  });
  $('#search_jo').on('keyup', function () {
    if ($(this).val().trim() == "") {
      makeSearchTable([]);
    }
  });
  $("#frm_prod_output").on('submit', function (e) {
    e.preventDefault();
    var unprocessed = parseInt($('#unprocessed').val());
    var qtyTransfer = parseInt($('#total_qty_transfer').val());
    var qty = qtyTransfer == 0 ? unprocessed : unprocessed - qtyTransfer;
    unprocessed = unprocessed - (parseInt($('#rework').val()) + parseInt($('#scrap').val()) + parseInt($('#good').val()) + parseInt($('#conver').val()) + parseInt($('#alloy_mix').val()) + parseInt($('#nc').val()));
    qty = qty - (parseInt($('#rework').val()) + parseInt($('#scrap').val()) + parseInt($('#good').val())); //alert(qty);

    if (parseInt($('#unprocessed').val()) == unprocessed) {
      msg('Please put some value on quantity entries.', 'warning');
    } else if (unprocessed < 0 && $('#current_process').val() !== 'CUTTING') {
      if (tag_update = 1) {

      }else{
        msg("Please Input less than unprocessed", "warning");
      }
    } else if (qtyTransfer > 0) {
      msg("The process has a pending Transfer Item of " + qtyTransfer, "warning");
    } else if ($('#good').val() < 0 || $('#scrap').val() < 0 || $('#rework').val() < 0 || $('#nc').val() < 0 || $('#alloy_mix').val() < 0 || $('#conver').val() < 0) {
      msg("Please Input valit number", "warning");
    } else {
      $('.loadingOverlay-modal').show();
      $.ajax({
        dataType: 'json',
        type: 'POST',
        url: $(this).attr("action"),
        data: $(this).serialize()
      }).done(function (data, textStatus, xhr) {
        prod_output_arr = [];
        prod_output_arr = data.outputs;
        makeProdOutputTable(prod_output_arr);
        searched_jo_arr = [];
        searched_jo_arr = data.travel_sheet;
        makeSearchTable(searched_jo_arr);
        msg(data.msg, data.status);
        zero_it();
        clear();

        if (data.unprocessed !== undefined) {
          $('#unprocessed').val(data.unprocessed);
        }
      }).fail(function (xhr, textStatus, errorThrown) {
        ErrorMsg(xhr);
      }).always(function (xhr, textStatus) {
        $('.loadingOverlay-modal').hide();
      });
    }
  });
  $('#good').on('change', function () {
    if ($(this).val() == '') {
      $(this).val(0);
    } else {
      deductUnprocessed('good', $(this).val());
    }
  });
  $('#scrap').on('change', function () {
    if ($(this).val() == '') {
      $(this).val(0);
    } else {
      deductUnprocessed('scrap', $(this).val());
    }
  });
  $('#rework').on('change', function () {
    if ($(this).val() == '') {
      $(this).val(0);
    } else {
      deductUnprocessed('rework', $(this).val());
    }
  });
  $('#nc').on('change', function () {
    if ($(this).val() == '') {
      $(this).val(0);
    } else {
      deductUnprocessed('nc', $(this).val());
    }
  });
  $('#conver').on('change', function () {
    if ($(this).val() == '') {
      $(this).val(0);
    } else {
      deductUnprocessed('conver', $(this).val());
    }
  });
  $('#alloy_mix').on('change', function () {
    if ($(this).val() == '') {
      $(this).val(0);
    } else {
      deductUnprocessed('alloy_mix', $(this).val());
    }
  });
  $('#operator').on('change', function () {
    getOperator();
    getOperatorName($('#operator').val());
  });
});

function init() {
  if (permission_access == '2' || permission_access == 2) {
    $('.permission').prop('readonly', true);
    $('.permission-button').prop('disabled', true);
  } else {
    $('.permission').prop('readonly', false);
    $('.permission-button').prop('disabled', false);
  }
}

function deductUnprocessed(el_name, value) {
  if (isNaN(value)) {
    $('#' + el_name).addClass('is-invalid');
    $('#' + el_name + '_feedback').addClass('invalid-feedback');
    $('#' + el_name + '_feedback').html("Please input numbers only.");
  } else {
    var unprocessed = parseInt($('#unprocessed').val());
    unprocessed = unprocessed - (parseInt($('#rework').val()) + parseInt($('#scrap').val()) + parseInt($('#good').val()) + parseInt($('#nc').val()) + parseInt($('#conver').val()) + parseInt($('#alloy_mix').val()));

    if (unprocessed < 0 && $('#current_process').val() !== 'CUTTING') {
      if (tag_update = 1){

      }else {
        msg("Please Input less than unprocessed", "warning");  
      }
    }
  }
}

function zero_it() {
  $('.zero').val(0);
}

function clear() {
  $('.clear').val('');
}

function getOutputs(id) {
  prod_output_arr = [];
  $.ajax({
    url: getOutputsURL,
    type: 'GET',
    dataType: 'JSON',
    data: {
      _token: token,
      id: id
    }
  }).done(function (data, textStatus, xhr) {
    prod_output_arr = data;
    makeProdOutputTable(prod_output_arr);
  }).fail(function (xhr, textStatus, errorThrown) {
    ErrorMsg(xhr);
  });
}

function makeProdOutputTable(arr) {
  var row = -1;
  $('#tbl_production_ouput').dataTable().fnClearTable();
  $('#tbl_production_ouput').dataTable().fnDestroy();
  $('#tbl_production_ouput').dataTable({
    data: arr,
    bLengthChange: false,
    searching: false,
    paging: false,
    order: [[9, 'asc']],
    columns: [{
      data: function data(x) {
      row++;
          return "<button type='button' class='btn btn-lg bg-blue btn_edit_set' " +
            "data-id='" + x.id + "'" +
            "data-row='" + row + "'" +
            "'data-travel_sheet_id='" + x.travel_sheet_id + 
            "'data-travel_sheet_process_id='" + x.travel_sheet_process_id +
            "'data-unprocessed='" + x.unprocessed + 
            "'data-good='" + x.good + 
            "'data-rework='" + x.rework +
            "'data-scrap='" + x.scrap +
            "'data-reworked='" + x.nc +
            "'data-convert='" + x.conver +
            "'data-alloy_mix='" + x.alloy_mix +
            "'data-operator='" + x.operator +
            "'data-operator_name='" + x.operator_name +
            "'data-machine_no='" + x.machine_no +        
            "'value='" + x.id + "'>" + 
            "<i class='fa fa-edit'></i>" +
            "</button>" + " " +

            "<button type='button' class='btn btn-lg bg-red btn_delete_set' " + 
            "'data-id='" + x.id + 
            "'data-row='" + row + "'" +
            "'data-travel_sheet_id='" + x.travel_sheet_id + 
            "'data-travel_sheet_process_id='" + x.travel_sheet_process_id + 
            "'data-unprocessed='" + x.unprocessed + 
            "'data-good='" + x.good + 
            "'data-rework='" + x.rework +
            "'data-scrap='" + x.scrap +
            "'data-reworked='" + x.nc +
            "'data-convert='" + x.conver +
            "'data-alloy_mix='" + x.alloy_mix +
            "'data-operator='" + x.operator +
            "'data-operator_name='" + x.operator_name +
            "'data-machine_no='" + x.machine_no +   
            "'value='" + x.id + "'>" + 
            "<i class='fa fa-times'></i>" +
            "</button>";
      },

      searchable: false,
      orderable: false,
      width: '3.33%'
      
    }, {
      data: 'unprocessed'
    }, {
      data: 'good'
    }, {
      data: 'rework'
    }, {
      data: 'scrap'
    }, {
      data: 'nc'
    }, {
      data: 'conver'
    }, {
      data: 'alloy_mix'
    }, {
      data: 'total'
    }, {
      data: 'process_date'
    }, {
      data: 'operator_name'
    }, {
      data: 'operator'
    }, {
      data: 'machine_no'
    }],
    fnInitComplete: function fnInitComplete() {
      $('.loadingOverlay-modal').hide();
      $('.dataTables_scrollBody').slimscroll();
    }
  });
}

function delete_set() {
    $.ajax({
      url: deleteProductonOutput,
      type: 'POST',
      dataType: 'JSON',
      data: {
        id: id
      }
    }).done(function (data, textStatus, xhr) {
      msg("Production Output was successfully deleted.", 'success');
      $('#unprocessed').val(data.unprocessed);
      getOutputs($('#travel_sheet_process_id').val());
      searched_jo_arr = [];
      searched_jo_arr = data.travel_sheet;
      makeSearchTable(searched_jo_arr);
      clear();
    }).fail(function (xhr, textStatus, errorThrown) {
      ErrorMsg(xhr);
    });
  // }
 }
function edit_set() {
  var chkArray = [];
  // $(".check_item:checked").each(function () {
    chkArray.push({
      travel_sheet_process_id: $(this).attr('data-travel_sheet_process_id'),
      travel_sheet_id: $(this).attr('data-travel_sheet_id'),
      id: $(this).val()
    });
  // });

  if (chkArray.length > 0) {
    $.ajax({
      url: deleteProductonOutput,
      type: 'POST',
      dataType: 'JSON',
      data: {
        _token: token,
        chkArray: chkArray
      }
    }).done(function (data, textStatus, xhr) {
      msg("Production Output was successfully deleted.", 'success');
      $('#unprocessed').val(data.unprocessed);
      getOutputs($('#travel_sheet_process_id').val());
      searched_jo_arr = [];
      searched_jo_arr = data.travel_sheet;
      makeSearchTable(searched_jo_arr);
      clear();
    }).fail(function (xhr, textStatus, errorThrown) {
      ErrorMsg(xhr);
    });
  }

  // $('.check_all').prop('checked', false);
}

function makeSearchTable(arr) {
  console.log(arr);
  $('#tbl_searched_jo').dataTable().fnClearTable();
  $('#tbl_searched_jo').dataTable().fnDestroy();
  $('#tbl_searched_jo').dataTable({
    data: arr,
    bLengthChange: false,
    searching: false,
    paging: false,
    order: [[1, 'asc']],
    columns: [{
      data: function data(x) {
        return "<button class='btn btn-sm bg-blue btn_edit_travel_sheet' " + 
               "data-travel_sheet_id='" + x.travel_sheet_id + "' " + 
               "data-id='" + x.id + "' " + 
               "data-jo_no='" + x.jo_no + "' " + 
               "data-jo_sequence='" + x.jo_sequence + "' " + 
               "data-prod_order_no='" + x.prod_order_no + "' " + 
               "data-material_used='" + x.material_used + "' " + 
               "data-material_heat_no='" + x.material_heat_no + "' " + 
               "data-lot_no='" + x.lot_no + "' " + 
               "data-type='" + x.type + "' " + 
               "data-order_qty='" + x.order_qty + "' " + 
               "data-previous_process='" + x.previous_process + "' " + 
               "data-process='" + x.process + "' " + 
               "data-sequence='" + x.sequence + "' " + 
               "data-unprocessed='" + x.unprocessed + "' " + 
               "data-prod_code='" + x.prod_code + "' " + 
               "data-description='" + x.description + "' " + 
               "data-total_issued_qty='" + x.total_issued_qty + "' " + 
               "data-issued_qty='" + x.issued_qty + "' " + 
               "data-sc_no='" + x.sc_no + "'>" + 
               "<i class='fa fa-edit'></i>" + "</button>";
      },
      searchable: false,
      orderable: false,
      width: '3.33%'
    }, {
      data: 'jo_no',
      width: '8.33%'
    }, {
      data: 'jo_sequence',
      width: '10.33%'
    }, {
      data: 'prod_code',
      width: '11.33%'
    }, {
      data: 'div_code',
      width: '8.33%'
    }, {
      data: 'issued_qty',
      width: '8.33%'
    }, {
      data: 'process',
      width: '8.33%'
    }, {
      data: 'unprocessed',
      width: '8.33%'
    }, {
      data: 'good',
      width: '8.33%'
    }, {
      data: 'rework',
      width: '8.33%'
    }, {
      data: 'scrap',
      width: '8.33%'
    }, {
      data: 'nc',
      width: '8.33%'
    }, {
      data: 'conver',
      width: '8.33%'
    }, {
      data: 'alloy_mix',
      width: '8.33%'
    }, {
      data: function data(x) {
        switch (x.status) {
          case 1:
          case '1':
            return 'DONE PROCESS';
            break;

          case 2:
          case '2':
            return 'ON-GOING';
            break;

          case 3:
          case '31':
            return 'CANCELLED';
            break;

          case 4:
          case '4':
            return 'TRANSFER ITEM';
            break;

          case 5:
          case '5':
            return 'ALL PROCESS DONE';
            break;

          case 7:
          case '7':
            return 'RECEIVED';
            break;

          case 0:
          case '0':
            return 'WAITING';
            break;
        } 
      },
      width: '8.33%'
    }],
    createdRow: function createdRow(row, data, dataIndex) {
      if (data.status == 1 || data.status == '1') {
        $(row).css('background-color', 'rgb(139 241 191)'); // GREEN

        $(row).css('color', '#000000');
      }
    },
    fnInitComplete: function fnInitComplete() {
      $('.loadingOverlay').hide();
      $('.dataTables_scrollBody').slimscroll();
    }
  });
}

function getOperator() {
  $.ajax({
    url: getOperatorURl,
    type: 'POST',
    dataType: 'JSON',
    data: {
      _token: token,
      operator: $('#operator').val()
    }
  }).done(function (data, textStatus, xhr) {
    console.log('success');
  }).fail(function (xhr, textStatus, errorThrown) {
    $('#operator_name').prop('readonly', false);
    ErrorMsg(xhr);
  });
}
function getOperatorName(operator_id) {
    $('.loadingOverlay').show();
    $.ajax({
        url: getOperatorNameURL,
        type: 'GET',
        dataType: 'JSON',
        data: {
            operator_id: operator_id 
            
        },
    }).done(function(data, textStatus, xhr) {
       var op_name = data[0];
        $('#operator_name').val(op_name.firstname + " " + op_name.lastname);
        $('#operator_name').prop('readonly', true);

    }).fail(function (xhr, textStatus, errorThrown) {
      ErrorMsg(xhr);
    }).always(function () {
      $('.loadingOverlay').hide();
    });
}

function getTransferQty(id) {
  $.ajax({
    url: getTransferQtyURL,
    type: 'POST',
    dataType: 'JSON',
    data: {
      _token: token,
      id: id
    }
  }).done(function (data, textStatus, xhr) {
    $('#total_qty_transfer').val(data);
  }).fail(function (xhr, textStatus, errorThrown) {
    ErrorMsg(xhr);
  });
}