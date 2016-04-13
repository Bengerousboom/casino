<?php


$key=$_GET['key'];
$array = array();
$con=mysqli_connect('localhost', 'root', 'root','pokerdb');
//$db=mysqli_select_db("pokerdb",$con);
$query=mysqli_query($con, "SELECT Namen FROM player WHERE Namen LIKE '%{$key}%'");

while($row=mysqli_fetch_assoc($query))
{
    $array[] = $row['Namen'];
}
echo json_encode($array);

?>