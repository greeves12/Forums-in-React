<?php
#Creates the connection with the database
$mysqli = mysqli_connect("localhost", "root", "roco2603", "react");
#Gets the content of the sent data
$json = file_get_contents("php://input");
#Decodes the json that was sent
$obj = json_decode($json, true);

#Gets the requested id from the json object that was sent
$id = $obj['id'];

#Creates a query to the database where we are getting the comments attached with the ID that was requested
$result = $mysqli->query("SELECT * FROM comments WHERE id='$id'");
#Creates an array that we will be sending back
$dbarray = array();
#While loop to get the data from the database
while($row = mysqli_fetch_array($result)){
    #Adds all the goods into the array
    $dbarray[]=array(
        'username'    => $row["username"],
        'title'       => $row["title"],
        'description' => $row["description"]
    );
}
#Sends the requested array back through an encoded json
echo json_encode($dbarray);

#Closes the mysql connection *IMPORT as the server is prone to sql injection attacks if we don't*
mysqli_close($mysqli);

?>