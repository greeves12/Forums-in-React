<?php
$mysqli = mysqli_connect("localhost", "root", "roco2603", "react");

$json = file_get_contents("php://input");
$obj = json_decode($json, true);

$username = $obj['username'];
$password = $obj['password'];
    


$result = "SELECT * FROM users WHERE username='$username' AND password='$password'";
$check = mysqli_fetch_array(mysqli_query($mysqli, $result));


if(isset($check)){
    echo json_encode("LOGIN");
}else{
    echo json_encode("NO");
}
?>