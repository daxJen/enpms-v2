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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/assets/js/pages/ppc/dashboard/dashboard.js":
/*!**************************************************************!*\
  !*** ./resources/assets/js/pages/ppc/dashboard/dashboard.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(function () {
  init();
  get_chart();
  get_jono('');
  $('#btn_graph').on('click', function (e) {
    e.preventDefault();
    get_chart($(this).val());
  });
  $("#tbl_dashboard").on('column-sizing.dt', function (e, settings) {
    $(".dataTables_scrollHeadInner").css("width", "100%");
  });
  $('#btn_search_filter').on('click', function () {
    // $('.loadingOverlay-modal').show();
    $('#modal_ppc_dashboard').modal('show');
  });
  $('#srch_date_from').on('change', function () {
    var selected_date = new Date($(this).val()).toISOString().split('T')[0];
    document.getElementsByName("srch_date_to")[0].setAttribute('min', selected_date);
  });
  $("#frm_search").on('submit', function (e) {
    e.preventDefault();
    $('.loadingOverlay-modal').show();
    $.ajax({
      url: $(this).attr('action'),
      type: 'GET',
      dataType: 'JSON',
      data: $(this).serialize()
    }).done(function (data, textStatus, xhr) {
      $('#dl_date_from').val($('#srch_date_from').val());
      $('#dl_date_to').val($('#srch_date_to').val());
      $('#dl_jo_sequence').val($('#srch_jo_sequence').val());
      $('#dl_prod_code').val($('#srch_prod_code').val());
      $('#dl_code_description').val($('#srch_description').val());
      $('#dl_div_code').val($('#srch_div_code').val());
      $('#dl_process_name').val($('#srch_process').val());
      $('#dl_material_used').val($('#srch_material_used').val());
      $('#dl_material_heat_no').val($('#srch_material_heat_no').val());
      $('#dl_lot_no').val($('#srch_lot_no').val());
      dashboardDataTable(data);
      get_chartFilter(); // }).fail(function (xhr, textStatus, errorThrown) {
      // 	var errors = xhr.responseJSOdownloadExcelN.errors;
      // 	console.log(errors);
      // 	showErrors(errors);
      // }).always(function () {
      // 	$('.loadingOverlay-modal').hide();
      // });
    }).fail(function (xhr, textStatus, errorThrown) {
      ErrorMsg(xhr);
    }).always(function () {
      $('.loadingOverlay-modal').hide();
    });
  });
  $('#btn_search_excel').on('click', function () {
    var srch_date_from = $('#srch_date_from').val();
    var srch_date_to = $('#srch_date_to').val();
    var srch_jo_sequence = $('#srch_jo_sequence').val();
    var srch_prod_code = $('#srch_prod_code').val();
    var srch_description = $('#srch_description').val();
    var srch_div_code = $('#srch_div_code').val(); // var srch_plant = $('#srch_plant').val();

    var srch_process = $('#srch_process').val();
    var srch_material_used = $('#srch_material_used').val();
    var srch_material_heat_no = $('#srch_material_heat_no').val();
    var srch_lot_no = $('#srch_lot_no').val();
    var srch_status = $('#srch_status').val();
    var url = downloadSearchExcelURL + "?srch_date_from=" + srch_date_from + "&srch_date_to=" + srch_date_to + "&srch_jo_sequence=" + srch_jo_sequence + "&srch_prod_code=" + srch_prod_code + "&srch_description=" + srch_description + "&srch_div_code=" + srch_div_code + // "&srch_plant=" + srch_plant +
    "&srch_process=" + srch_process + "&srch_material_used=" + srch_material_used + "&srch_material_heat_no=" + srch_material_heat_no + "&srch_lot_no=" + srch_lot_no + "&srch_status=" + srch_status;
    window.location.href = url;
  });
  $('#btn_search_clear').on('click', function () {
    $('.srch-clear').val('');
    $('#srch_status').select2({}).val(null).trigger('change.select2');
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

  dashboardDataTable([]);
  $('#srch_date_from').on('change', function () {
    setMinxDate('srch_date_to', $(this).val());
  });
  $('#srch_date_to').on('change', function () {
    setMaxDate('srch_date_from', $(this).val());
  });
}

function get_chart(jo_no) {
  $('#chart').html('');
  var count = 0;
  $.ajax({
    url: get_chartURl,
    type: 'GET',
    dataType: 'JSON',
    data: {
      _token: token,
      jo_no: jo_no
    }
  }).done(function (data, textStatus, xhr) {
    $.each(data, function (i, x) {
      count++;
      chart = '<div class="col-md-6">' + '<div class="box box-solid">' + '<div class="box-body text-center">' + '<div class="row">' + '<div class="col-md-12">' + '<div id="' + count + '" style="height: 370px; max-width: 920px; margin: 0px auto;"></div>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>';
      $('#chart').append(chart);
      var options = {
        title: {
          text: x.process,
          fontSize: 20
        },
        theme: "light2",
        exportEnabled: true,
        animationEnabled: true,
        legend: {
          cursor: "pointer",
          itemclick: explodePie
        },
        data: [{
          type: "pie",
          toolTipContent: "{label}: <strong>{y}%</strong>",
          showInLegend: "true",
          legendText: "{label}",
          yValueFormatString: "##0.00\"%\"",
          indexLabel: "{label} {y}",
          dataPoints: x.records
        }]
      };
      $('#' + count).CanvasJSChart(options);

      function explodePie(e) {
        if (typeof e.dataSeries.dataPoints[e.dataPointIndex].exploded === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
          e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
        } else {
          e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
        }

        e.chart.clear();
        e.chart.render();
      }
    });
  }).fail(function (xhr, textStatus, errorThrown) {
    msg(errorThrown, textStatus);
  });
}

function get_chartFilter() {
  $('#chart').html('');
  var count = 0;
  $.ajax({
    url: get_chartfilterURl,
    type: 'GET',
    dataType: 'JSON',
    data: {
      _token: token,
      date_from: $('#srch_date_from').val(),
      date_to: $('#srch_date_to').val(),
      jo_sequence: $('#srch_jo_sequence').val(),
      prod_code: $('#srch_prod_code').val(),
      code_description: $('#srch_description').val(),
      div_code: $('#srch_div_code').val(),
      process_name: $('#srch_process').val(),
      material_used: $('#srch_material_used').val(),
      material_heat_no: $('#srch_material_heat_no').val(),
      lot_no: $('#srch_lot_no').val()
    }
  }).done(function (data, textStatus, xhr) {
    $.each(data, function (i, x) {
      count++;
      chart = '<div class="col-md-6">' + '<div class="box box-solid">' + '<div class="box-body text-center">' + '<div class="row">' + '<div class="col-md-12">' + '<div id="' + count + '" style="height: 370px; max-width: 920px; margin: 0px auto;"></div>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>';
      $('#chart').append(chart);
      var options = {
        title: {
          text: x.process,
          fontSize: 20
        },
        theme: "light2",
        exportEnabled: true,
        animationEnabled: true,
        legend: {
          cursor: "pointer",
          itemclick: explodePie
        },
        data: [{
          type: "pie",
          toolTipContent: "{label}: <strong>{y}%</strong>",
          showInLegend: "true",
          legendText: "{label}",
          yValueFormatString: "##0.00\"%\"",
          indexLabel: "{label} {y}",
          dataPoints: x.records
        }]
      };
      $('#' + count).CanvasJSChart(options);

      function explodePie(e) {
        if (typeof e.dataSeries.dataPoints[e.dataPointIndex].exploded === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
          e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
        } else {
          e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
        }

        e.chart.render();
      }
    });
  }).fail(function (xhr, textStatus, errorThrown) {
    msg(errorThrown, textStatus);
  });
}

function get_jono() {
  $('#jo_no').html("<option value=''></option>");
  $.ajax({
    url: get_jonoURL,
    type: 'GET',
    dataType: 'JSON',
    data: {
      _token: token
    }
  }).done(function (data, textStatus, xhr) {
    $.each(data, function (i, x) {
      $('#jo_no').append("<option value='" + x.jo_sequence + "'>" + x.jo_sequence + "</option>");
    });
  }).fail(function (xhr, textStatus, errorThrown) {
    msg(errorThrown, textStatus);
  });
}

function dashboardDataTable(arr) {
  var _$$dataTable;

  $('#tbl_dashboard').dataTable().fnClearTable();
  $('#tbl_dashboard').dataTable().fnDestroy();
  $('#tbl_dashboard').dataTable((_$$dataTable = {
    data: arr,
    processing: true
  }, _defineProperty(_$$dataTable, "data", arr), _defineProperty(_$$dataTable, "deferRender", true), _defineProperty(_$$dataTable, "scrollX", true), _defineProperty(_$$dataTable, "order", [[18, 'desc']]), _defineProperty(_$$dataTable, "columns", [{
    data: 'jo_sequence',
    name: 'jo_sequence'
  }, {
    data: 'prod_code',
    name: 'prod_code'
  }, {
    data: 'code_description',
    name: 'code_description'
  }, {
    data: 'div_code',
    name: 'div_code'
  }, {
    data: 'process_name',
    name: 'process'
  }, {
    data: 'material_used',
    name: 'material_used'
  }, {
    data: 'material_heat_no',
    name: 'material_heat_no'
  }, {
    data: 'lot_no',
    name: 'lot_no'
  }, {
    data: 'sched_qty',
    name: 'sched_qty'
  }, {
    data: 'unprocessed',
    name: 'unprocessed'
  }, {
    data: 'good',
    name: 'good'
  }, {
    data: 'rework',
    name: 'rework'
  }, {
    data: 'scrap',
    name: 'scrap'
  }, {
    data: 'total_output',
    name: 'total_output'
  }, {
    data: 'order_qty',
    name: 'order_qty'
  }, {
    data: 'total_issued_qty',
    name: 'total_issued_qty'
  }, {
    data: 'issued_qty',
    name: 'issued_qty'
  }, {
    data: 'updated_date',
    name: 'updated_date'
  }, // { data: 'end_date', name: 'end_date' },
  {
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
    name: 'statusko' // { data: 'status', name: 'p.status'}

  }]), _defineProperty(_$$dataTable, "language", {
    aria: {
      sortAscending: ": activate to sort column ascending",
      sortDescending: ": activate to sort column descending"
    },
    emptyTable: "No data available in table",
    info: "Showing _START_ to _END_ of _TOTAL_ records",
    infoEmpty: "No records found",
    infoFiltered: "(filtered1 from _MAX_ total records)",
    lengthMenu: "Show _MENU_",
    search: "Search:",
    zeroRecords: "No matching records found",
    paginate: {
      "previous": "Prev",
      "next": "Next",
      "last": "Last",
      "first": "First"
    }
  }), _defineProperty(_$$dataTable, "lengthMenu", [[5, 10, 15, 20, -1], [5, 10, 15, 20, "All"]]), _defineProperty(_$$dataTable, "pageLength", 10), _defineProperty(_$$dataTable, "createdRow", function createdRow(row, data, dataIndex) {
    if (data.statusko == 2 || data.statusko == '2') {
      $(row).css('background-color', '#001F3F'); // NAVY

      $(row).css('color', '#fff');
    }

    if (data.statusko == 3 || data.statusko == '3') {
      $(row).css('background-color', '#ff6266'); // RED

      $(row).css('color', '#fff');
    }

    if (data.statusko == 4 || data.statusko == '4') {
      $(row).css('background-color', '#7460ee'); // PURPLE

      $(row).css('color', '#fff');
    }

    if (data.statusko == 5 || data.statusko == '1') {
      $(row).css('background-color', 'rgb(139 241 191)'); // GREEN

      $(row).css('color', '#000000');
    }

    if (data.statusko == 6 || data.statusko == '5') {
      $(row).css('background-color', 'rgb(121 204 241)'); // BLUE

      $(row).css('color', '#000000');
    }
  }), _$$dataTable));
}

/***/ }),

/***/ 4:
/*!********************************************************************!*\
  !*** multi ./resources/assets/js/pages/ppc/dashboard/dashboard.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xampp\htdocs\en-pms\resources\assets\js\pages\ppc\dashboard\dashboard.js */"./resources/assets/js/pages/ppc/dashboard/dashboard.js");


/***/ })

/******/ });