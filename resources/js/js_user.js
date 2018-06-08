$.widget.bridge('uibutton', $.ui.button);
$(document).ready(function () {
  //Date picker
  $('#dates').datepicker({
    autoclose: true
  });
  $('#datese').datepicker({
    autoclose: true
  });

  $('#datestartterm').on("click",function(){
    var today = new Date($("#lastdate").val());
    var startDate = new Date(today);
    startDate.setDate(today.getDate()+1);
    startDate.toLocaleDateString();

    if (startDate == "")
    {
      $("#datestartterm").datepicker({
          startDate: "+0d",
          autoclose: true
      }).datepicker('show').on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf()+(70*24*60*60*1000));
        $('#dateendterm').datepicker('setDate', null).datepicker('setStartDate', minDate).datepicker('autoclose',true);
      });
    }
    else
    {
      $("#datestartterm").datepicker({
          startDate: startDate,
          autoclose: true
      }).datepicker('show').on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf()+(70*24*60*60*1000));
        $('#dateendterm').datepicker('setDate', null).datepicker('setStartDate', minDate).datepicker('autoclose',true);
      });
    }
  });

  $('#dateendterm').on("click",function(){
    if ($("#datestartterm").val() == "")
      alert("Please select start date of term first!");
  });

  $('#datestartterm1').on("click",function(){
    var startDate = $("#lastdate1").val();
    if (startDate == "")
    {
      $("#datestartterm1").datepicker({
          startDate: "+0d",
          autoclose: true
      }).datepicker('show').on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf()+(70*24*60*60*1000));
        $('#dateendterm1').datepicker('setDate', null).datepicker('setStartDate', minDate).datepicker('autoclose',true);
      });
    }
    else
    {
      $("#datestartterm1").datepicker({
          startDate: startDate,
          autoclose: true
      }).datepicker('show').on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf()+(70*24*60*60*1000));
        $('#dateendterm1').datepicker('setDate', null).datepicker('setStartDate', minDate).datepicker('autoclose',true);
      });
    }
  });

  $('#dateendterm1').on("click",function(){
    var startDate = $("#lastdate1").val();
    if (startDate == "")
    {
      $("#dateendterm1").datepicker({
        startDate: "+0d",
        autoclose: true
      }).datepicker('show');
    }
    else
    {
      $("#dateendterm1").datepicker({
          startDate: startDate,
          autoclose: true
      }).datepicker('show');
    }
  });

  $('#datesdel').on("click",function(){
    var datesEnabled = [];

    for (var i = 0; i < $("#count").val(); i++) {
      datesEnabled[i] = $("#holidays"+i).val();
    }

    $('#datesdel').datepicker({
      format: 'mm/dd/yyyy',
      autoclose: true,
      beforeShowDay: function (date) {
        var d = (date.getMonth() + 1);
        if (d < 10)
          d = "0" + d;
        var allDates = date.getFullYear() + '-' + d + '-' + date.getDate();
        if(datesEnabled.indexOf(allDates) != -1)
        return true;
        else
        return false;
      }
    }).datepicker('show');
  });
  
  $( "#tabs-building" ).tabs();
  $( "#tabs-roomtype" ).tabs();
  $( "#tabs-room" ).tabs();
  $( "#tabs-term" ).tabs();
});

function openbldgdoor(clicked_id) {
  var build_id = clicked_id.substr(2);
  $("#rg"+build_id).toggleClass('right_open ');
  $("#lg"+build_id).toggleClass('left_open ');
  $('.container').css("display", "block");
  $.ajax({
    url: "http://"+window.location.hostname+window.location.pathname.substring(0,12)+"room",
    type: "post",
    data: "build_id="+build_id,
    success: function(html){
      window.setTimeout(showhideblro(html),1000);
    }
  });
}

function showhideblro(html){
  $("#bldng").fadeOut(500);
  $('#clrooms').html(html);
  $("#clrooms").show(1000);
}

function openroomdoor(clicked_id,build_id) {
  var room_id = clicked_id.substr(2);
  $("#di"+room_id).toggleClass('doorOpen');
  if (room_id == "exit")
  {
    window.setTimeout(exitclosebdoor(build_id),1000);
  }
  else
  {
    $.ajax({
      url: "http://"+window.location.hostname+window.location.pathname.substring(0,12)+"reservation",      
      type: "post",
      data: "room_num="+room_id,
      success: function(html){
        window.setTimeout(showhiderore(html,room_id),1000);
      }
    });
  }
}

function exitclosebdoor(build_id){
  $("#clrooms").fadeOut(1500);
  $("#bldng").show(1500);
  $("#rg"+build_id).toggleClass('right_open ');
  $("#lg"+build_id).toggleClass('left_open ');
}

function exitcloserdoor(room_id){
  $("#reservation").fadeOut(1500);
  $("#clrooms").show(1500);
  $("#titlecomlab").hide();
  $("#titleup").show();
  $("#comlabcenterword").show();
  $("#di"+room_id).toggleClass('doorOpen');
}

function showfiledreservations(dept){
  window.location.href = "http://"+window.location.hostname+window.location.pathname.substring(0,12)+"allreservations"
}

function showcreatereservation(){
  window.location.href = "http://"+window.location.hostname+window.location.pathname.substring(0,12)+"dashboard";
}

function showhiderore(html,room_id){
  $("#clrooms").fadeOut(400);
  $('#reservation').html(html);
  $("#reservation").fadeIn(2000);
  $.ajax({
    url: "http://"+window.location.hostname+window.location.pathname.substring(0,12)+"titlereservation",      
    type: "post",
    data: "room_num="+room_id,
    success: function(html){
      $('#titlecomlab').html(html);
      $("#titlecomlab").show();
      $("#titleup").hide();
      $("#comlabcenterword").hide();
    }
  });
}

function syChange() {
  var term = document.getElementById('term').value;
  var sy1 = document.getElementById('sy1').value;
  if (sy1 == ""){
    document.getElementById("sy2").value = "";
  }
  else if (term == "4"){
    document.getElementById("sy2").value = parseInt(sy1);
  }
  else{
    document.getElementById("sy2").value = parseInt(sy1)+1;
  }   
}

function change(bldg){
    console.log("A");
    //var blg = "rg" + bldg;
    document.getElementById(bldg).style.left = "100%";
    document.getElementById(bldg).style.left = "-50%";
    console.log("B");
}

function timeChange(start,end) {
  var time_start = document.getElementById(start).value;
  var select = document.getElementById(end);
  var i=0;
  
  $("#"+end).empty();

  if (time_start.slice(-2)=="30")
    i = parseInt(time_start)+70;
  else
    i = parseInt(time_start)+30;

  while(i<=2100){
    var opt = document.createElement('option');
    opt.value = i;
    if (i<1000)
      opt.innerHTML = "0"+i;
    else
      opt.innerHTML = i;
    select.appendChild(opt);
    if (i%100 == 0)
      i = i+30;
    else
      i = i+70;
  }
}