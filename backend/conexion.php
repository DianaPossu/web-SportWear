<?php
    $servidor = "localhost";
    $usuario = "root";
    $clave = "";
    $bd = "sportwear";

    $conexion = mysqli_connect($servidor, $usuario, $clave) or die('no se conecto al motor mysql');
    mysqli_select_db($conexion, $bd) or die('No se encontro la base de datos');
    mysqli_set_charset( $conexion,"utf8");
?>