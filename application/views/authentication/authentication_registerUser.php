<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Library System | Registration Page</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.6 -->
  <link rel="stylesheet" href="<?=base_url();?>resources/bootstrap/css/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="<?=base_url();?>resources/dist/css/AdminLTE.min.css">
  <!-- iCheck -->
  <link rel="stylesheet" href="<?=base_url();?>resources/plugins/iCheck/square/blue.css">

  <link rel="stylesheet" href="<?=base_url();?>resources/plugins/select2/select2.min.css">

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>
<body class="hold-transition register-page">
<div class="register-box">
  <div class="register-logo">
    <a href="<?=base_url();?>register/user"><b>Library</b>System</a>
  </div>


  <div class="nav-tabs-custom">
    <ul class="nav nav-tabs">
      <li class="active" id = "registrationTab">
        <a>Registration</a>
      </li>
      <li class = "disabled" id = "confirmationTab">
        <a>Confirmation</a>
      </li>
      <li class = "disabled" id = "approvalTab">
        <a >For Approval</a>
      </li>
    </ul>
    <div class="tab-content">
      <div class="active tab-pane" id="registration" data-url = "<?=base_url()?>">
        <div class="register-box-body">
          <p class="login-box-msg">Register a new membership</p>

            <span style="color: red;text-align: center; font-weight: bold">
              <div>
                <p name = "error" id = "error"></p>
              </div>
            </span>

            <div class="form-group has-feedback">
              <span class="glyphicon glyphicon-user form-control-feedback"></span>
              <input type="text" class="form-control" placeholder="School ID" name = "id" id = "id">
            </div>
            <div class="form-group has-feedback">
              <span class="glyphicon glyphicon-user form-control-feedback"></span>
              <input type="text" class="form-control" placeholder="First Name" name = "firstName" id = "firstName">
            </div>
            <div class="form-group has-feedback">
              <input type="text" class="form-control" placeholder="Middle Name" name = "middleName" id = "middleName">
              <span class="glyphicon glyphicon-user form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
              <input type="text" class="form-control" placeholder="Last Name" name = "lastName" id = "lastName">
              <span class="glyphicon glyphicon-user form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
              <input type="email" class="form-control" placeholder="Email" name = "email" id = "email">
              <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
            <div class="form-group">
              <select class="form-control" style="width: 100%;" name = "userType" id = "userType">
                <option disabled selected value>- - You are a Student or a Professor? - - </option>
                <option value = "student">Student</option>
                <option value = "professor">Professor</option>
              </select>
            </div>
            <div class="form-group">
              <select class="form-control select2" style="width: 100%;" name = "school" id = "school">
                <option disabled selected value>- - Select your School - - </option>
                <?=$school;?>
              </select>
            </div>
            <div class="row">
              <div class="col-xs-8">
                <div class="checkbox icheck">
                  <label>
                    <input type="checkbox" id = "termsandconditions"> I agree to the <a href="#">terms</a>
                  </label>
                </div>
              </div>
              <!-- /.col -->
              <div class="col-xs-4">
                <button onclick="registerUser()" class="btn btn-primary btn-block btn-flat">Register</button>
              </div>              <!-- /.col -->
            </div>

          <div class="social-auth-links text-center">
            <p>- OR -</p>
            <a href="#" class="btn btn-block btn-social btn-facebook btn-flat"><i class="fa fa-facebook"></i> Sign up using
              Facebook</a>
            <a href="#" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google-plus"></i> Sign up using
              Google+</a>
          </div>

          <a href="<?=base_url();?>login" class="text-center">I already have a membership</a>
        </div>
      </div>
      <div class="tab-pane" id = "confirmation">
        <div class="register-box-body">
          <p class="login-box-msg">Email Confirmation</p>

          <p id = "confirmation_message" name = "confirmation_message">
            You have been registered! As part of the registration process, You need to confirm your email address.
            Please check your email now and confirm to continue.
            <br><br>Click the button below after confirmation.
          </p>

          <button onclick="registerUser()" class="btn btn-primary btn-block btn-flat">Email Confirmed</button>
          <center><a href="<?=base_url();?>login" class="text-center">Resend confirmation email</a></center>
        </div>
      </div>
      <div class="tab-pane" id = "approval">
        <div class="register-box-body">
          <p class="login-box-msg">School Librarian's Approval</p>

          <p id = "confirmation_message" name = "confirmation_message">
            Your School Librarian is asigned to accept or decline your registration.
            For now, You may go to the <a href = "<?=base_url();?>OPAC">Library System OPAC</a> to look for books.
            You may also still borrow books if not yet accepted but you cannot take them home.

            <br><br>Note: We will send you an email once you have been accepted / declined.
          </p>

        </div>
      </div>
    </div>
  </div>
  <!-- /.form-box -->
</div>
<!-- /.register-box -->

<!-- jQuery 2.2.3 -->
<script src="<?=base_url();?>resources/plugins/jQuery/jquery-2.2.3.min.js"></script>
<!-- Select2 -->
<script src="<?=base_url();?>resources/plugins/select2/select2.full.min.js"></script>
<!-- Bootstrap 3.3.6 -->
<script src="<?=base_url();?>resources/bootstrap/js/bootstrap.min.js"></script>
<!-- iCheck -->
<script src="<?=base_url();?>resources/plugins/iCheck/icheck.min.js"></script>
<!-- iCheck -->
<script src="<?=base_url();?>resources/js/authentication.js"></script>
<script>
  $(function () {
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%' // optional
    });
    $(".select2").select2();
  });
</script>
</body>
</html>
