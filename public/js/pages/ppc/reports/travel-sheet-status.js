/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/assets/js/pages/ppc/reports/travel-sheet-status.js":
/*!**********************************************************************!*\
  !*** ./resources/assets/js/pages/ppc/reports/travel-sheet-status.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var travel_sheet_arr = [];
var prod_ts_arr = [];
$(function () {
  init();
  displayTS();
  $("#frm_search").on('submit', function (e) {
    e.preventDefault();
    $('.loadingOverlay-modal').show();
    $.ajax({
      url: $(this).attr('action'),
      type: 'GET',
      dataType: 'JSON',
      data: $(this).serialize()
    }).done(function (data, textStatus, xhr) {
      $('#dl_date_from').val($('#date_from').val());
      $('#dl_date_to').val($('#date_to').val());
      $('#dl_jo_no').val($('#jo_no').val());
      $('#dl_jo_sequence').val($('#jo_sequence').val());
      $('#dl_sc_no').val($('#sc_no').val());
      $('#dl_prod_code').val($('#prod_code').val());
      $('#dl_code_description').val($('#code_description').val());
      $('#dl_status').val($('#status').val());
      makeTravelSheetTable(data);
    }).fail(function (xhr, textStatus, errorThrown) {
      ErrorMsg(xhr);
    }).always(function () {
      $('.loadingOverlay-modal').hide();
    });
  });
  $('#btn_download').on('click', function () {
    window.location.href = downloadExcel + '?date_from=' + $('#dl_date_from').val() + '&date_to=' + $('#dl_date_to').val() + '&jo_no=' + $('#dl_jo_no').val() + '&jo_sequence=' + $('#dl_jo_sequence').val() + '&sc_no=' + $('#dl_sc_no').val() + '&prod_code=' + $('#dl_prod_code').val() + '&code_description=' + $('#dl_code_description').val() + '&statusko=' + $('#dl_status').val();
  });
  $('#btn_search_clear').on('click', function () {
    $('.srch-clear').val('');
    $('#srch_status').select2({}).val(null).trigger('change.select2');
  });
  $('#btn_ts_preview').on('click', function () {
    var travel_sheet = pdfTSReprintURL + '?jo_sequence=' + $('#jo_sequence').val();
    window.open(travel_sheet, '_tab');
  });
});

function init() {
  $('#status').select2({
    // allowClear: true,
    placeholder: 'Select Status'
  }).val(null);

  if (permission_access == '2' || permission_access == 2) {
    $('.permission').prop('readonly', true);
    $('.permission-button').prop('disabled', true);
  } else {
    $('.permission').prop('readonly', false);
    $('.permission-button').prop('disabled', false);
  }

  makeTravelSheetTable();
}

$('#btn_filter').on('click', function () {
  $('#modal_search').modal('show');
});
$('#tbl_travel_sheet_status_body').on('click', '.btn_print_set', function () {
  $('#modal_travel_sheet_status').modal('show');
  var ts_id = $(this).attr('data-ts_id');
  $('#ts_jo_no').val($(this).attr('data-ts_jo_no'));
  $('#ts_jo_sequence').val($(this).attr('data-jo_sequence'));
  $('#prod_order').val($(this).attr('data-prod_order_no'));
  $('#ts_prod_code').val($(this).attr('data-prod_code'));
  $('#description').val($(this).attr('data-description'));
  $('#mat_used').val($(this).attr('data-material_used'));
  $('#material_heat_no').val($(this).attr('data-material_heat_no'));
  $('#lot_no').val($(this).attr('data-lot_no'));
  $('#type').val($(this).attr('data-type'));
  $('#order_qty').val($(this).attr('data-order_qty'));
  $('#issued_qty').val($(this).attr('data-issued_qty'));
  $('#process_date').val($(this).attr('data-updated_at'));
  displayProdTS($(this).attr('data-jo_sequence'));
});

function displayTS() {
  $('.loadingOverlay').show();
  $.ajax({
    url: displayTSURL,
    type: 'GET',
    dataType: 'JSON',
    data: {
      _token: token
    }
  }).done(function (data, textStatus, xhr) {
    travel_sheet_arr = data;
    makeTravelSheetTable(travel_sheet_arr);
  }).fail(function (xhr, textStatus, errorThrown) {
    ErrorMsg(xhr);
  }).always(function () {
    $('.loadingOverlay').hide();
  });
}

function makeTravelSheetTable(arr) {
  // var row = -1;
  $('#tbl_travel_sheet_status').dataTable().fnClearTable();
  $('#tbl_travel_sheet_status').dataTable().fnDestroy();
  $('#tbl_travel_sheet_status').dataTable({
    data: arr,
    bLengthChange: false,
    searching: true,
    pageLength: 10,
    order: [[1, 'asc']],
    columns: [{
      data: function data(s) {
        // row++;   
        return "<button class='btn btn-lg bg-blue btn_print_set'" + "data-ts_id='" + s.ts_id + "' " + "data-ts_jo_no='" + s.ts_jo_no + "' " + "data-jo_sequence='" + s.jo_sequence + "' " + "data-prod_order_no='" + s.sc_no + "' " + "data-prod_code='" + s.prod_code + "' " + "data-description='" + s.code_description + "' " + "data-material_used='" + s.material_used + "' " + "data-material_heat_no='" + s.material_heat_no + "' " + "data-lot_no='" + s.lot_no + "' " + "data-type='" + s.type1 + "' " + "data-order_qty='" + s.order_qty + "' " + "data-issued_qty='" + s.issued_qty + "' " + "data-updated_at='" + s.updated_date + "'>" + "<i class='fa fa-print'></i>" + "</button>";
      },
      searchable: false,
      orderable: false,
      width: '3.33%'
    }, {
      data: 'ts_jo_no'
    }, {
      data: 'jo_sequence'
    }, {
      data: 'sc_no'
    }, {
      data: 'prod_code'
    }, {
      data: 'code_description'
    }, {
      data: 'order_qty'
    }, {
      data: 'issued_qty'
    }, {
      data: 'remaining'
    }, {
      data: function data(x) {
        switch (x.statusko) {
          case 1:
          case '1':
            return 'DONE PROCESS';
            break;

          case 2:
          case '2':
            return 'ON-GOING';
            break;

          case 3:
          case '3':
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
      name: 'statusko'
    }, {
      data: 'fg_stocks',
      width: '4.33%'
    }, {
      data: 'crude_stocks',
      width: '4.33%'
    }, {
      data: 'updated_date',
      width: '4.33%'
    }],
    fnInitComplete: function fnInitComplete() {
      $('.loadingOverlay').hide();
      $('.dataTables_scrollBody').slimscroll();
      $("#tbl_transfer_entry").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
    }
  });
}

function displayProdTS(jo_sequence) {
  // $('.loadingOverlay').show();
  $.ajax({
    url: displayProdTSURL,
    type: 'GET',
    dataType: 'JSON',
    data: {
      _token: token,
      jo_sequence: jo_sequence
    }
  }).done(function (data, textStatus, xhr) {
    prod_ts_arr = data;
    makeProdTSTable(prod_ts_arr);
  }).fail(function (xhr, textStatus, errorThrown) {
    ErrorMsg(xhr);
  }).always(function () {// $('.loadingOverlay').hide();
  });
}

function makeProdTSTable(arr) {
  $('#tbl_production_ouput').dataTable().fnClearTable();
  $('#tbl_production_ouput').dataTable().fnDestroy();
  $('#tbl_production_ouput').dataTable({
    data: arr,
    bLengthChange: false,
    searching: false,
    pageLength: 10,
    order: [[1, 'asc']],
    columns: [{
      data: 'sequence'
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
      data: 'process'
    }, {
      data: 'div_code'
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
          case '3':
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
      name: 'status'
    }, {
      data: 'operator'
    }, {
      data: 'operator_name'
    }, {
      data: 'machine_no'
    }, {
      data: 'updated_at'
    }],
    fnInitComplete: function fnInitComplete() {
      $('.loadingOverlay').hide();
      $('.dataTables_scrollBody').slimscroll();
      $("#tbl_transfer_entry").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
    }
  });
}

/***/ }),

/***/ 26:
/*!****************************************************************************!*\
  !*** multi ./resources/assets/js/pages/ppc/reports/travel-sheet-status.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xampp\htdocs\en-pms\resources\assets\js\pages\ppc\reports\travel-sheet-status.js */"./resources/assets/js/pages/ppc/reports/travel-sheet-status.js");


/***/ })

/******/ });