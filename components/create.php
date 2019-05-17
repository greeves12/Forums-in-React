<?php 
$mysqli = mysqli_connect("localhost", "root", "roco2603", "react");

$json = file_get_contents("php://input");
$obj = json_decode($json, true);

$title = $obj['title'];
$description = $obj['description'];
$username = $obj['username'];
$date = date('Y/m/d H:i:s');

$result = "INSERT INTO posts (username,title,description, date) values ('$username', '$title', '$description', '$date')";

if(mysqli_query($mysqli, $result)){
    echo json_encode("POSTED");
}else{
    echo json_encode("FAILED");
}


?>