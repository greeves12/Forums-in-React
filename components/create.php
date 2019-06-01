<?php 
#Establishes a connection with the database
$mysqli = mysqli_connect("localhost", "root", "roco2603", "react");
#Gets the contents of the file
$json = file_get_contents("php://input");
#Decodes the json that was sent from the client
$obj = json_decode($json, true);

#Bunch of params that were sent from the client
$title = $obj['title'];
$description = $obj['description'];
$username = $obj['username'];
$date = date('Y/m/d H:i:s');

#Inserts the the params that were receieved into the database
$result = "INSERT INTO posts (username,title,description, date) values ('$username', '$title', '$description', '$date')";

#Starts the query of the statement above
if(mysqli_query($mysqli, $result)){
    #If is successful than send back the approved status
    echo json_encode("POSTED");
}else{
    #Then send back the failed status
    echo json_encode("FAILED");
}
#Closes the connection with the database
mysqli_close($mysqli);

?>