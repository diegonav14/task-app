<?php
$connection = mysqli_connect(
    'localhost',
    'root',
    'password',
    'task-app'
);

    if($connection){
        echo "Database is connected";
    }
?>