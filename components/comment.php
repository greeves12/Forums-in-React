<?php
$mysqli = new mysqli('localhost', 'root', 'roco2603', 'react');

$json = file_get_contents("php://input");
$obj = json_decode($json, true);

$id = $obj['id'];

$result = $mysqli->query("SELECT comments FROM posts WHERE id='$id'");

echo json_encode($result);

?>