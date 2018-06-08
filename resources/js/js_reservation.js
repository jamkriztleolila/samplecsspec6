$(document).ready(function () {
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  var filename = '';

   if (location.pathname == "/clems/user/filedreservations"){
      filename = 'Filed Reservations';
    }

   if (location.pathname == "/clems/user/approvedreservations"){
      filename = 'Approved Reservations';
    }

   if (location.pathname == "/clems/user/disapprovedreservations"){
      filename = 'Disapproved Reservations';
    }

   if (location.pathname == "/clems/user/voidreservations"){
      filename = 'Void Reservations';
    }

   if (location.pathname == "/clems/user/allreservations"){
      filename = 'All Reservations';
    }

    if (location.pathname == "/clems/user/todayreservations"){
      filename = 'Reservations for Today';
    }

  var myreservation = $('#myreservation').DataTable({
    "language": {
      "emptyTable": "No reservations found",
    },
    dom: 'B',
    "pageLength": 3,
    buttons: [
      {
        extend: 'excel',
        filename: filename,
        title: filename,
        text: 'Export To Excel',
        messageTop: 'As of ' + month[new Date().getMonth()] + " " + new Date().getDate() + ", " + new Date().getFullYear(),
        exportOptions : {
          columns : ':visible',
          format : {
            header : function (mDataProp, columnIdx) {
              var htmlText = '<span>' + mDataProp + '</span>';
              var jHtmlObject = jQuery(htmlText);
              jHtmlObject.find('div').remove();
              var newHtml = jHtmlObject.text();
              return newHtml;
            }
          }
        } 
      }
    ],
    initComplete: function() {
     $('.dt-buttons').hide();
     $('#exportExcel').on('click', function() {
        $('.dt-buttons').find('.buttons-excel').click(); 
     });
   } 
  });

  $('#searchField').keyup(function(){
      $('#myreservation').DataTable().search($(this).val()).draw() ;
  });

  /*$('#filter_dater').datepicker({
    autoclose: true,
    dateFormat: "mmmm dd, yyyy",
    onSelect: function() {
      $('#myreservation').DataTable().search( $(this).val() ).draw();
    }
  });*/
});

  function pageclick(pagenumber){
    var oTable = $("#myreservation").dataTable();
    oTable.fnPageChange( pagenumber );
  }