<?php
$mysqli = mysqli_connect("localhost", "root", "roco2603", "react");
$json = file_get_contents("php://input");
$obj = json_decode($json, true);

$title = $obj['title'];
$description = $obj['description'];
$id = $obj['id'];

$sqlQuery = "UPDATE posts SET title='$title',description='$description' WHERE id='$id'";

if(mysqli_query($mysqli,$sqlQuery)){
    echo json_encode("Post Updated");
}else{
    echo json_encode("Failed to edit post");
}
mysqli_close($mysqli);
?>