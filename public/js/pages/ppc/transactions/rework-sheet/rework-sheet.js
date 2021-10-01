/******/ (function(modules) { // webpackBootstrap
/******/  // The module cache
/******/  var installedModules = {};
/******/
/******/  // The require function
/******/  function __webpack_require__(moduleId) {
/******/
/******/    // Check if module is in cache
/******/    if(installedModules[moduleId]) {
/******/      return installedModules[moduleId].exports;
/******/    }
/******/    // Create a new module (and put it into the cache)
/******/    var module = installedModules[moduleId] = {
/******/      i: moduleId,
/******/      l: false,
/******/      exports: {}
/******/    };
/******/
/******/    // Execute the module function
/******/    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/    // Flag the module as loaded
/******/    module.l = true;
/******/
/******/    // Return the exports of the module
/******/    return module.exports;
/******/  }
/******/
/******/
/******/  // expose the modules object (__webpack_modules__)
/******/  __webpack_require__.m = modules;
/******/
/******/  // expose the module cache
/******/  __webpack_require__.c = installedModules;
/******/
/******/  // define getter function for harmony exports
/******/  __webpack_require__.d = function(exports, name, getter) {
/******/    if(!__webpack_require__.o(exports, name)) {
/******/      Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/    }
/******/  };
/******/
/******/  // define __esModule on exports
/******/  __webpack_require__.r = function(exports) {
/******/    if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/    }
/******/    Object.defineProperty(exports, '__esModule', { value: true });
/******/  };
/******/
/******/  // create a fake namespace object
/******/  // mode & 1: value is a module id, require it
/******/  // mode & 2: merge all properties of value into the ns
/******/  // mode & 4: return value when already ns object
/******/  // mode & 8|1: behave like require
/******/  __webpack_require__.t = function(value, mode) {
/******/    if(mode & 1) value = __webpack_require__(value);
/******/    if(mode & 8) return value;
/******/    if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/    var ns = Object.create(null);
/******/    __webpack_require__.r(ns);
/******/    Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/    if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/    return ns;
/******/  };
/******/
/******/  // getDefaultExport function for compatibility with non-harmony modules
/******/  __webpack_require__.n = function(module) {
/******/    var getter = module && module.__esModule ?
/******/      function getDefault() { return module['default']; } :
/******/      function getModuleExports() { return module; };
/******/    __webpack_require__.d(getter, 'a', getter);
/******/    return getter;
/******/  };
/******/
/******/  // Object.prototype.hasOwnProperty.call
/******/  __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/  // __webpack_public_path__
/******/  __webpack_require__.p = "/";
/******/
/******/
/******/  // Load entry module and return exports
/******/  return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/pages/ppc/transaction/rework-sheet/rework-sheet.js":
/*!*************************************************************!*\
  !*** ./resources/assets/js/pages/ppc/reports/fg-summary.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var Rework_arr = [];
$(function () {
  init();
  $('#tbl_jo_details').on('click', '.btn_edit_rework', function () {
    $('#id').val($(this).attr('data-id'));
    $('#jo_no').val($(this).attr('data-jo_no'));
    $('#prod_code').val($(this).attr('data-prod_code'));
    $('#description').val($(this).attr('data-description'));
    $('#based_qty').val($(this).attr('data-based_qty'));
    $('#rework_qty').val($(this).attr('data-rework_qty'));
    $('#fr_process').val($(this).attr('data-fr_process'));
    $('#div_code').val($(this).attr('data-div_code'));
    $('#create_user').val($(this).attr('data-create_user'));
    get_jo_no($(this).attr('data-jo_no'), $(this).attr('data-prod_code'));
    $('#modal_rework_sheet').modal('show');
  });
  $("#frm_rework_sheet").on('submit', function (e) {
    e.preventDefault();

    if (parseInt($('#based_qty').val()) > parseInt($('#rework_qty').val())) {
      msg('Rework Qty need to be less than based qty', 'warning');
    } else {
      var form_action = $(this).attr("action");
      $.ajax({
        dataType: 'json',
        type: 'POST',
        url: form_action,
        data: $(this).serialize()
      }).done(function (data, textStatus, xhr) {
        msg(data.msg, data.status);
        getRework();

        if (data.status == 'success') {
          $('#modal_rework_sheet').modal('hide');
        }
      }).fail(function (xhr, textStatus, errorThrown) {
        var errors = xhr.responseJSON.errors;
        showErrors(errors);
      });
    }
  });
  $('#based_qty').on('change', function (e) {
    e.preventDefault();

    if (parseInt($(this).val()) > parseInt($('#qty').val())) {
      msg('Qty need to be less than based qty', 'warning');
    } 
  });
  // $('#sc_no').on('change', function (e) {
  //   e.preventDefault();
  //   $('#total_order_qty').val($(this).find("option:selected").attr('data-order_qty'));
  // });
  // $('#status').on('change', function (e) {
  //   getFG($(this).val());
  // });
});

function init() {
  if (permission_access == '2' || permission_access == 2) {
    $('.permission').prop('readonly', true);
    $('.permission-button').prop('disabled', true);
  } else {
    $('.permission').prop('readonly', false);
    $('.permission-button').prop('disabled', false);
  }

  getRework(0);
}

function getRework(status) {
  transfer_item_arr = [];
  $.ajax({
    url: getReworkURL,
    type: 'GET',
    dataType: 'JSON',
    data: {   
      _token: token,
      status: status
    }
  }).done(function (data, textStatus, xhr) {
    Rework_arr = data;
    makeReworkTable(Rework_arr);
  }).fail(function (xhr, textStatus, errorThrown) {
    msg(errorThrown, textStatus);
  });
}

function makeReworkTable(arr) {
  $('#tbl_jo_details').dataTable().fnClearTable();
  $('#tbl_jo_details').dataTable().fnDestroy();
  $('#tbl_jo_details').dataTable({
    data: arr,w
    bLengthChange: false,
    searching: true,
    paging: true,
    columns: [{
      data: function data(x) {
        return '<button class="btn btn-sm bg-blue btn_edit_fg" ' + 'data-id="' + x.id + '" ' + 'data-jo_no="' + x.jo_no + '" ' + 'data-prod_code="' + x.prod_code + '" ' + 'data-description="' + x.description + '" ' + 'data-based_qty="' + x.based_qty + '" ' + 'data-rework_qty="' + x.rework_qty + '" ' + 'data-fr_process="' + x.fr_process + '" ' + 'data-div_code="' + x.div_code + '">' + '<i class="fa fa-edit"></i>' + '</button>';
      },
      searchable: false,
      orderable: false
    }, {
      data: 'jo_no',
      name: 'jo_no'
    }, {
      data: 'prod_code',
      name: 'prod_code'
    }, {
      data: 'description',
      name: 'description'
    }, {
      data: 'based_qty',
      name: 'based_qty'
    }]
  });
}

function get_jo_no(jo_nos, prod_code) {
  var jo_no = '<option></option>';
  $('#jo_no').html(jo_no);
  $.ajax({
    url: getJo_noURL,
    type: 'GET',
    dataType: 'JSON',
    data: {
      _token: token,
      prod_code: prod_code
    }
  }).done(function (data, textStatus, xhr) {
    $.each(data, function (i, x) {
      if (x.jo_no != jo_nos) {
        jo_no = '<option value="' + x.jo_no + '" data-based_qty="' + x.based_qty + '">' + x.jo_no + '</option>';
        $('#jo_no').append(jo_no);
      }
    });
  }).fail(function (xhr, textStatus, errorThrown) {
    msg(errorThrown, textStatus);
  });
}

function clear() {
  $('.clear').val('');
}

/***/ }),

/***/ 24:
/*!*******************************************************************!*\
  !*** multi ./resources/assets/js/pages/ppc/reports/fg-summary.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\laragon\www\en-pms\resources\assets\js\pages\ppc\reports\fg-summary.js */"./resources/assets/js/pages/ppc/reports/fg-summary.js");


/***/ })

/******/ });