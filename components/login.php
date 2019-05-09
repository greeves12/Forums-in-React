<?php
$mysqli = new mysqli("localhost", "username", "password", "database");

$json = file_get_contents("php://input");
$obj = json_decode($json, true);

$username = $obj['username'];
$password = $obj['password'];

$result = $mysqli->query("SELECT * FROM users WHERE username='$username' AND WHERE password='$password'");

if($result){
    echo json_encode("LOGIN");
}else{
    echo json_encode("NO");
}


?>