<?php
    class Proveedor {
        public $conexion;

        public function __construct($conexion) {
            $this->conexion = $conexion;
        }

        public function consulta() {
            $con = "SELECT * FROM proveedor ORDER BY nombre";
            $res = mysqli_query($this->conexion, $con);
            $vec = [];

            while ($row = mysqli_fetch_array($res)) {
                $vec[] = $row;
            }

            return $vec;
        }

        public function eliminar($id) {
            $del = "DELETE FROM proveedor WHERE id_proveedor = $id";
            mysqli_query($this->conexion, $del);
            $vec = [];
            $vec['resultado'] = "OK";
            $vec['mensaje'] = "El proveedor ha sido eliminado";
            return $vec;
        }

        public function insertar($params) {
            $ins = "INSERT INTO proveedor(nombre, telefono) VALUES('$params->nombre', '$params->telefono')";
            mysqli_query($this->conexion, $ins);
            $vec = [];
            $vec['resultado'] = "OK";
            $vec['mensaje'] = "El proveedor ha sido guardado";
            return $vec;
        }

        public function editar($id, $params) {
            $editar = "UPDATE proveedor SET nombre = '$params->nombre', telefono = '$params->telefono' WHERE id_proveedor = $id";
            mysqli_query($this->conexion, $editar);
            $vec = [];
            $vec['resultado'] = "OK";
            $vec['mensaje'] = "El proveedor ha sido editado";
            return $vec;
        }

        public function filtro($valor) {
            $filtro = "SELECT * FROM proveedor WHERE nombre LIKE '%$valor%'";
            $res = mysqli_query($this->conexion, $filtro);
            $vec = [];

            while ($row = mysqli_fetch_array($res)) {
                $vec[] = $row;
            }

            return $vec;
        }
    }
    
?>
