<?php
header("Content-Type: application/json; charset=UTF-8");

//$key=$_GET['key'];
$array = array();
$con=mysqli_connect('localhost', 'root', 'root','pokerdb');
//$db=mysqli_select_db("pokerdb",$con);
$query=mysqli_query($con, "SELECT Namen, Punkte FROM player");

while($row=mysqli_fetch_assoc($query))
{
    $array[] = $row;
}
echo json_encode($array);

?>