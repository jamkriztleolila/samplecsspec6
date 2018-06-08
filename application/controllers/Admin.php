<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller {
  //consturctor
  public function index()
	{
    //$this->_checkUserSession();
		$this->load->view('head');
		$this->load->view('admin\header');
		$this->load->view('admin\nav_main');
		$this->load->view('admin\dashboard');
		$this->load->view('footer');
	}
}
