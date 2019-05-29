<?php
$mysqli = mysqli_connect("localhost", "root", "roco2603", "react");
$json = file_get_contents("php://input");
$obj = json_decode($json, true);

$username = $obj['username'];
$title = $obj['title'];
$id = $obj['id'];
$description= $obj['description'];
$t = 0;

$sqlpost = "INSERT INTO comments (id, username, title, description, reply) values ('$id', '$username', '$title', '$description', '$t')";

if(mysqli_query($mysqli, $sqlpost)){
    echo json_encode("Comment created");
}else{
    echo json_decode("Error occured. Try again later");
}



?>