<?php

include('database.php');

$name = $_POST['name'];
$desc =  $_POST['description'];
$id =  $_POST['id'];

$query = "UPDATE task SET name= '$name', 
description = '$desc' WHERE id = '$id'";

$result = mysqli_query($connection, $query);
if(!$result){
    die('Query Failed');
}

echo "Update task Successfully";



?>