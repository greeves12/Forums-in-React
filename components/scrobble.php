<?php 
$mysqli = mysqli_connect("sql3.freemysqlhosting.net", "sql3291677", "ims68BCblx", "sql3291677");

$json = file_get_contents("php://input");

$obj = json_decode($json, true);

$username = $obj['username'];


if($result = $mysqli->query("SELECT * FROM posts WHERE username='$username'")){
    if($result->num_rows){
        $rows = $result->fetch_all();

        echo json_encode($rows);
    }
}



?>