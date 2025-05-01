<?php
class Usuario {
    public $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function consulta() {
        $con = "SELECT * FROM usuario ORDER BY nombre";
        $res = mysqli_query($this->conexion, $con);
        $vec = [];

        while ($row = mysqli_fetch_array($res)) {
            $vec[] = $row;
        }

        return $vec;
    }
    

    public function eliminar($id) {
        $del = "DELETE FROM usuario WHERE id_usuario = $id";
        mysqli_query($this->conexion, $del);
        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje'] = "El usuario ha sido eliminado";
        return $vec;
    }

    public function insertar($params) {
        $ins = "INSERT INTO usuario(ident, nombre, direccion, celular, email, rol) 
                VALUES('$params->ident', '$params->nombre', '$params->direccion', '$params->celular', '$params->email', '$params->rol')";
        mysqli_query($this->conexion, $ins);
        return ['resultado' => 'OK', 'mensaje' => 'El usuario ha sido guardado'];
    }
    
    public function editar($id, $params) {
        $editar = "UPDATE usuario SET 
                    ident = '$params->ident',
                    nombre = '$params->nombre', 
                    direccion = '$params->direccion', 
                    celular = '$params->celular',
                    email = '$params->email', 
                    rol = '$params->rol'
                   WHERE id_usuario = $id";
        mysqli_query($this->conexion, $editar);
        return ['resultado' => 'OK', 'mensaje' => 'El usuario ha sido editado'];
        }

    public function filtro($dato) {
        $con = "SELECT c.*, ci.municipio AS municipios, d.departamento AS departamentos FROM usuario c 
        INNER JOIN municipios ci ON c.rol = ci.id_ciudad
        INNER JOIN departamentos d ON ci.departamento_id = d.id_departamento 
        WHERE c.ident LIKE '%$dato%' OR c.nombre LIKE '%$dato%' OR c.email LIKE '%$dato%' 
        ORDER BY c.nombre";
        $res = mysqli_query($this->conexion, $con);
        $vec = [];
        
        while ($row = mysqli_fetch_array($res)) {
            $vec[] = $row;
        }

        return $vec;
    }

    public function consultar_usuario($dato) {
        $con = "SELECT c.*, ci.municipio AS municipios, d.departamento AS departamentos FROM usuario c 
        INNER JOIN municipios ci ON c.rol = ci.id_ciudad
        INNER JOIN departamentos d ON ci.departamento_id = d.id_departamento 
        WHERE c.ident = '$dato'
        ORDER BY c.nombre";
        $res = mysqli_query($this->conexion, $con);
        $vec = [];
        
        while ($row = mysqli_fetch_array($res)) {
            $vec[] = $row;
        }

        return $vec;
    }  
}

?>
