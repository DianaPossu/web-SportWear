<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    require_once "../conexion.php";
    require_once "../modelos/proveedor.php";

    $control = $_GET['control'];

    $prov = new Proveedor($conexion);

    switch ($control) {
        case 'consulta':
            $vec = $prov->consulta();
        break;
        case 'insertar':
            $json = file_get_contents('php://input');
            //$json = '{"nombre":"prueba 2"}';
            $params = json_decode($json);
            $vec = $prov->insertar($params);
        break;
        case 'eliminar':
                $id = $_GET['id'];
                $vec = $prov->eliminar($id);
        break;
        case 'editar':
                $json = file_get_contents('php://input');
                $params = json_decode($json);
                $id = $_GET['id'];
                $vec = $prov->editar($id, $params);
        break;
        case 'filtro':
                $dato = $_GET['dato'];
                $vec = $prov->filtro( $dato );
        break;    
    }

    $datosj = json_encode($vec);
    echo $datosj;
    header('Content-Type: application/json');

?>
