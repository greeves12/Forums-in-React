<?php 
$mysqli = mysqli_connect("localhost", "root", "roco2603", "react");

$json = file_get_contents("php://input");

$obj = json_decode($json, true);

$username = $obj['username'];



if($result = $mysqli->query("SELECT * FROM posts WHERE username='$username'")){
    if($result->num_rows){
        $rows = $result->fetch_all();

        echo json_encode($rows);
    }
}
}




?>