<?php 
$mysqli = mysqli_connect("localhost", "root", "roco2603", "react");

$json = file_get_contents("php://input");

$obj = json_decode($json, true);

$username = $obj['username'];


$result = $mysqli->query("SELECT * FROM posts");

$dbarray = array();


while($row = mysqli_fetch_array($result)){
    $dbarray[]=array(
        'id'          => $row["id"],
        'username'    => $row["username"],
        'title'       => $row["title"],
        'description' => $row["description"]
    );
}

echo json_encode($dbarray);

mysqli_close($mysqli);
?>