<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Authentication extends CI_Controller {
  //consturctor
  public function index()
	{
    $this->_checkUserSession();
		$this->load->view('authentication\authentication_login');
	}

  public function login(){
      $this->_checkUserSession();
    	$this->form_validation->set_rules('email', 'Email', 'trim|required|valid_email');
  		$this->form_validation->set_rules('password', 'Password', 'trim|required');

      if ($this->form_validation->run() == FALSE) {
  			$this->session->set_flashdata('error_message', validation_errors());
  			redirect('login');
  		}
  		else{
  			//call private login()
  			$this->_login($this->input->post());
  		}
  }

  public function userRegistration(){
    $this->_checkUserSession();
    $schoolsList = $this->Authentication_data->getSchools();
    $data["school"] = "";
    foreach ($schoolsList as $value) {
      $data["school"] .= "<option value = '" . $value['id'] . "'>".
                  $value['name']."</option>";
    }
    $this->load->view('authentication\authentication_registerUser', $data);
  }

  public function registerUser(){
    $this->form_validation->set_rules('schoolId', 'School ID', 'trim|required');
    $this->form_validation->set_rules('firstName', 'First Name', 'trim|required');
    $this->form_validation->set_rules('middleName', 'Middle Name', 'trim');
    $this->form_validation->set_rules('lastName', 'Last Name', 'trim');
    $this->form_validation->set_rules('email', 'Email', 'trim|required|valid_email');
    $this->form_validation->set_rules('userType', 'student or a professor', 'trim|required');
    $this->form_validation->set_rules('school', 'School', 'trim|required');

    if ($this->form_validation->run() == FALSE) {
      $data['error_message'] = validation_errors();
      $data['error_message'] = explode("</p>", $data['error_message']);
      $data['error_message'] = $data['error_message'][0];
      echo json_encode($data);
    }
    else{
      $result = $this->Authentication_data->registerUser($this->input->post());
      echo json_encode($result);
    }
  }

  public function emailConfirmation($emailId){
    echo $this->Authentication_data->confirmEmail($emailId);
  }


  private function _checkUserSession(){
    if(isset($this->session->userdata['student_in'])){
      redirect('Student/profile'); //student
    }
    else if(isset($this->session->userdata['professor_in'])){
      redirect('Professor/profile'); //counselor
    }
    else if(isset($this->session->userdata['admin_in'])){
      redirect('Admin/profile'); //counselor
    }
  }
  private function _login($user_data){
    $result = $this->Authentication_data->login_auth($user_data);
    if($result != null){
      print_r($result);
      echo "success";
    }
    else{
      $this->session->set_flashdata('error_message', "Authentication Error");
      redirect('login');
    }
  }

  public function viewEmail(){
    $data["userName"] = "test";
    $data["userFN"] = "test";
    $data["userMN"] = "test";
    $data["userLN"] = "test";
    $data["userSID"] = "test";
    $data["userSYID"] = "201410060";
    $data["userEmail"] = "test";
    $data["email"] = "test";
    print_r($this->Authentication_data->emailTransaction($data, "registration"));
    $this->load->view('emails/new_user', $data);
  }

}
?>
