<?php 

$mysqli = mysqli_connect("sql3.freemysqlhosting.net", "sql3291677", "ims68BCblx", "sql3291677");



$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$username = $obj['username'];
$email = $obj['email'];
$password = $obj['password'];

$checkParams = "SELECT * FROM users WHERE username='$username'";
$checkParams2 = "SELECT * FROM users WHERE email='$email'";

if(isset($checkParams) || isset($checkParams2)){
    echo json_encode("Username or email already exists")
}else {

$Sql_Query = "insert into users (username,email,password) values ('$username','$email','$password')";

if(mysqli_query($mysqli, $Sql_Query)){
    echo json_encode("Successfully registered");
}else{
    echo json_encode("ERROR: 2201 (Server Down)");

}
}

?>