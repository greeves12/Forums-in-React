<?php 

$mysqli = mysqli_connect("localhost", "root", "roco2603", "react");



$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$username = $obj['username'];
$email = $obj['email'];
$password = $obj['password'];

$qu = $mysqli->query("SELECT * FROM users WHERE username='$username' OR email='$email'" );
if($qu->num_rows > 0){
    echo json_encode("Username or email already exists");
    return;
}
  


$Sql_Query = "insert into users (username,email,password) values ('$username','$email','$password')";

if(mysqli_query($mysqli, $Sql_Query)){
    echo json_encode("Successfully registered");
}else{
    echo json_encode("ERROR: 2201 (Server Down)");

}

?>