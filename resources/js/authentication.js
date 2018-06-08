function registerUser(){
  alert($("#termsandconditions").prop('checked'));
  if($("#termsandconditions").prop('checked') == true){
      $.post($("#registration").data('url') + "Authentication/registerUser",
      {
        schoolId: $('#id').val(),
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        middleName: $('#middleName').val(),
        email: $('#email').val(),
        userType: $('#userType').val(),
        school: $('#school').val()
      },
      function(data){
        alert(data);
        console.log(data);
        if(data.hasOwnProperty('error_message')){
          var res = data['error_message'];
          $("#error").html(res.fontcolor("red"));
        }
        else if(data != null){
            $("#registrationTab").removeClass("active").addClass("disabled");
            $("#registration").removeClass("active").addClass("disabled");
            $("#confirmationTab").removeClass("disabled").addClass("active");
            $("#confirmation").addClass("active");
        }
        else{
          var res = "Registration Error";
          $("#error").html(res.fontcolor("red"));
        }
      }, "json");
  }

  else{
    var res = "Please agree to the terms and conditions first!";
    $("#error").html(res.fontcolor("red"));
  }
}

function confirmUser(){

}
