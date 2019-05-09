<?php 

$mysqli = new mysqli("localhost", "username", "password", "database");



$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$username = $obj['username'];
$email = $obj['email'];
$password = $obj['password'];

$resultname = $mysqli->query("SELECT * FROM users WHERE username='$username'");
$resultemail = $mysqli->query("SELECT * FROM users WHERE email='$email'");

if($resultname->num_rows >0){
    echo json_encode('Username already exists');
}else{
    $add = $mysqli->query("INSERT INTO users (name, email, password) values('$username', '$email', '$password')");

    if($add){
        echo json_encode("Registration Success");
    }else{
        echo json_encode("Registration failed");
    }
}



?>