<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    require_once "../conexion.php";
    require_once "../modelos/usuario.php";

    $control = $_GET['control'];

    $usuario = new Usuario($conexion);

    switch ($control) {
        case 'consulta':
            $vec = $usuario->consulta();
        break;
        case 'insertar':
            $json = file_get_contents('php://input');
            $params = json_decode($json);
            $vec = $usuario->insertar($params);
        break;
        case 'eliminar':
                $id = $_GET['id'];
                $vec = $usuario->eliminar($id);
        break;
        case 'editar':
                $json = file_get_contents('php://input');
                $params = json_decode($json);
                $id = $_GET['id'];
                $vec = $usuario->editar($id, $params);
        break;
        case 'filtro':
                $dato = $_GET['dato'];
                $vec = $usuario->filtro( $dato );
        break;   
        /*case 'ccliente':
            $dato = $_GET['dato'];
            $vec = $usuario->consultar_cliente( $dato );
    break;  */ 
    }

    $datosj = json_encode($vec);
    header('Content-Type: application/json');
    echo $datosj;


?>
