<?php
header("Content-Type: image/jpeg"); 

	readfile('http://192.168.1.7/photos/'.$_REQUEST['id'].'.JPG');
?>