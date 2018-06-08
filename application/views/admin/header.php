<?php
defined('BASEPATH') OR exit('No direct script access allowed');

?>
<body class="hold-transition skin-green sidebar-mini">
	<div class="wrapper">

		<header class="main-header">
			<!-- Logo -->
			<a href="index2.html" class="logo">
				<!-- mini logo for sidebar mini 50x50 pixels -->
				<span class="logo-mini">
					<img src="<?php echo base_url(); ?>resources/img/FIT.png" alt="FIT Icon" style="width: 30px; height: 40px; margin: 5px;">
				</span>
				<!-- logo for regular state and mobile devices -->
				<span class="logo-lg">
					<img src="<?php echo base_url(); ?>resources/img/FIT.png" alt="FIT Icon" style="width: 30px; height: 40px; margin: 5px;">
					<b> Library</b> System
				</span>
			</a>
			<!-- Header Navbar: style can be found in header.less -->
			<nav class="navbar navbar-static-top">
				<!-- Sidebar toggle button-->
				<a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
					<span class="sr-only">Toggle navigation</span>
				</a>

				<div class="navbar-custom-menu">
					<ul class="nav navbar-nav">
						<!-- User Account: style can be found in dropdown.less -->
						<li class="dropdown user user-menu">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">
								<img src="<?php//'data:image/jpeg;base64,'.base64_encode( $admin['Picture'] )?>" class="user-image" alt="User Image">
								<span class="hidden-xs"><?= "test";//	$admin['FirstName'].' '.$admin['LastName']?></span>
							</a>
							<ul class="dropdown-menu">
								<!-- User image -->
								<li class="user-header">
									<img src="<?php//'data:image/jpeg;base64,'.base64_encode( $counselor['Picture'] )?>" class="img-circle" alt="User Image">
									<p>
										<?= "test";//	$admin['FirstName'].' '.$admin['MiddleName'].' '.$admin['LastName']?>
										<small><?= "201802449";//	$admin['Id']?></small>
										<small>User
										</small>
									</p>
								</li>
								<!-- Menu Footer-->
								<li class="user-footer">
									<div class="pull-left">
										<a href="Profile" class="btn btn-default btn-flat">Profile</a>
									</div>
									<div class="pull-right">
										<a href="<?=base_url();?>Authentication/logout" class="btn btn-default btn-flat">Sign out</a>
									</div>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</nav>
		</header>
