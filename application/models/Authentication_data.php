<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Authentication_data extends CI_Model{

    public function login_auth($user){
      $this->db->select('id, schoolId, firstName, middleName, lastName, email, status, userType, userLevel, school');
      $this->db->where('email', $user['email']);
      $this->db->where('password', $user['password']);
      $query = $this->db->get('users');
      if($query->num_rows() == 1){
        $result = $query->result_array();
        return $result[0];
      }
      else{
        return null;
      }
    }

    public function registerUser($data){
      if($this->_checkSchoolId($data)){
        $data['error_message'] = "School I.D. already used";
        return $data;
      }
      else if($this->_checkEmail($data)){
        $data['error_message'] = "Email is already used";
        return $data;
      }
      else{
        $data['id'] = $this->_createNewID("users");
        $this->db->insert("users", $data);
        if($this->db->affected_rows() === 1) {
          $this->_emailTransaction($data, "registration");
          return $data;
        }
        else {
          $data['error_message'] = "Registration Error";
          return $data;
        }
      }
    }

    public function getSchools(){
      $this->db->select('id, name');
      $query = $this->db->get('schools');
      if($query->num_rows() > 0){
        $result = $query->result_array();
        return $result;
      }
      else{
        return null;
      }
    }

    public function confirmEmail($emailId){
      $this->db->where("id", $emailId);
      $this->db->where("status", "new");
      $query = $this->db->get('email_record');
      if($query->num_rows() > 0){
        $result = $query->result_array();

        $this->db->set("status", "used");
        $this->db->where("id", $emailId);
        $this->db->update("email_record");

        $updates = array(
          "status" => "for approval"
        );
        return $this->_updateUser($updates, $result[0]["receiverId"]);
      }
      else{
        return null;
      }
    }

    private function _updateUser($updates, $id){
      $this->db->set($updates);
      $this->db->where("id", $id);
      $this->db->update("users");
      if($this->db->affected_rows() === 1)
        return true;
      else return false;
    }

    private function _emailTransaction($data, $purpose){
      $emailData["id"] = $this->_createNewID("email_record");
      $data["emailId"] = $emailData["id"];
      if($purpose == "registration"){
        $currDate = new DateTime('now', new DateTimeZone('Asia/Manila'));
        $newDate = $currDate->modify("+5 day");

        $emailData["receiverId"] = $data["id"];
        $emailData["receiverEmail"] = $data["email"];
        $emailData["purpose"] = $purpose;
        $emailData["validityPeriod"] = $newDate->format('Y-m-d H:i:s');
      }

      if($this->_registerEmail($data)){
        $this->db->insert("email_record", $emailData);
      }
      else{
        $emailData["status"] = "error";
        $this->db->insert("email_record", $emailData);
      }

      if($this->db->affected_rows() === 1 && !isset($emailData["status"]))
          return $data;
      else if($this->db->affected_rows() === 1 && isset($emailData["status"])){
          $error['error_message'] = "Email confirmation Error <br>
                                    We will send you another confirmation email later.<br>
                                    Thank you!";
          return $error;
      }
      else {
        $error['error_message'] = "Email confirmation Error<br>
                                  We will send you another confirmation email later.<br>
                                  Thank you!";
        return $error;
      }
    }

    private function _checkSchoolId($data){
      $this->db->where('schoolId', $data["schoolId"]);
      $this->db->where('school', $data['school']);
      $this->db->where('status !=', "deactivated" );
      $query = $this->db->get('users');
      if($query->num_rows() == 1){
        return true;
      }
      else{
        return false;
      }
    }

    private function _checkEmail($data){
      $this->db->where('email', $data["email"]);
      $this->db->where('school', $data['school']);
      $this->db->where('status !=', "deactivated" );
      $query = $this->db->get('users');
      if($query->num_rows() == 1){
        return true;
      }
      else{
        return false;
      }
    }

    private function _registerEmail($data){
      $mail['protocol']='smtp';
  		$mail['smtp_host']='ssl://smtp.gmail.com';
  		$mail['smtp_port']= 465; // ssl - 465 none - 587
  		$mail['smtp_timeout']='30';
  		$mail['smtp_user']='ana.tolentino8991@gmail.com';
  		$mail['smtp_pass']='MGrey_32';
  		$mail['charset']='utf-8';
  		$mail['newline']="\r\n";
  		$mail['mailtype']="html";
  		$mail['wordwrap'] = TRUE;
  		$this->email->initialize($mail);

      $this->email->from('ana.tolentino8991@gmail.com', 'Library System Admin');
      $this->email->to($data["email"]);
      $this->email->subject("Welcome To Library System!");
      $this->email->message($this->load->view('emails/new_user', $data, true));

      if($this->email->send()) return true;
  		else return 'Email conformation Error: '.$this->email->print_debugger();
    }

    private function _createNewID($table){
      $this->db->select("id");
      $this->db->order_by("id", "ASC");
  		$query = $this->db->get($table);
      $id = date("Y");

      if($table == "users"){
        $id .= "U";
      }
      else if($table == "email_record"){
        $id .= "E";
      }

      if($query->num_rows() == 0){
        $id .= "00001";
      }
      else{
        $row = $query->last_row('array');
        $id .= substr(((substr($row['id'], 5) + 100000) + 1), 1);
      }
      return $id;
    }

}

?>
