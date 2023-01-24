<?php
include('database.php');

//Listar tareas Query

$query = "SELECT * from task"; //Query
$result = mysqli_query($connection, $query); //Resultado Query

if(!$result){ //Validar Error
    die('Query Failed' . mysqli_error($connection));
} 

$json = array(); //inicializar JSON
while($row = mysqli_fetch_array($result)){ //Recorrer datos JSON
    $json[] = array(
        'name' => $row['name'],
        'description' => $row['description'],
        'id' => $row['id']
    );
}

$jsonstring = json_encode($json); //Codificar JSON
echo $jsonstring; //Mostrar string JSON

?>