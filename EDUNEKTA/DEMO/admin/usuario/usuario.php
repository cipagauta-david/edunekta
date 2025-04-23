<?php
include "../../conexion.php" ;

class Personal {
    private $id;
    private $nombre_completo;
    private $cedula;
    private $correo;
    private $telefono;
    private $rol;
    private $fecha_nacimiento;
    private $direccion;
    private $observaciones;

    public function __construct($id = null, $nombre_completo = null, $cedula = null, $correo = null, $telefono = null, $rol = null, $fecha_nacimiento = null, $direccion = null, $observaciones = null) {
        $this->id = $id;
        $this->nombre_completo = $nombre_completo;
        $this->cedula = $cedula;
        $this->correo = $correo;
        $this->telefono = $telefono;
        $this->rol = $rol;
        $this->fecha_nacimiento = $fecha_nacimiento;
        $this->direccion = $direccion;
        $this->observaciones = $observaciones;
    }

    // Getters
    public function getId() {
        return $this->id;
    }

    public function getNombreCompleto() {
        return $this->nombre_completo;
    }

    public function getCedula() {
        return $this->cedula;
    }

    public function getCorreo() {
        return $this->correo;
    }

    public function getTelefono() {
        return $this->telefono;
    }

    public function getRol() {
        return $this->rol;
    }

    public function getFechaNacimiento() {
        return $this->fecha_nacimiento;
    }

    public function getDireccion() {
        return $this->direccion;
    }

    public function getObservaciones() {
        return $this->observaciones;
    }

    // Métodos para operaciones CRUD
    public function guardar($conexion) {
        $stmt = $conexion->prepare("INSERT INTO personal (nombre_completo, cedula, correo, telefono, rol, fecha_nacimiento, direccion, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssssss", $this->nombre_completo, $this->cedula, $this->correo, $this->telefono, $this->rol, $this->fecha_nacimiento, $this->direccion, $this->observaciones);

        if ($stmt->execute()) {
            $this->id = $conexion->insert_id;
            return true;
        }
        return false;
    }
}
class PersonalFactory {
    private $conexion;

    public function __construct() {
        $conexionDB = new Conexion();
        $this->conexion = $conexionDB->getConexion();
        
        // Verificar si la tabla existe, si no, crearla
        $this->crearTablaPersonal();
    }

    // Método para crear la tabla si no existe
    private function crearTablaPersonal() {
        $sql = "CREATE TABLE IF NOT EXISTS personal (
            id_personal INT AUTO_INCREMENT PRIMARY KEY,
            nombre_completo VARCHAR(255) NOT NULL,
            cedula VARCHAR(20) NOT NULL UNIQUE,
            correo VARCHAR(100) NOT NULL,
            telefono VARCHAR(20),
            rol VARCHAR(50) NOT NULL,
            fecha_nacimiento DATE NOT NULL,
            direccion VARCHAR(255),
            observaciones TEXT
        )";

        $this->conexion->query($sql);
    }

    // Crear nuevo registro de personal desde los datos del formulario
    public function crearPersonal($nombre_completo, $cedula, $correo, $telefono, $rol, $fecha_nacimiento, $direccion, $observaciones) {
        $stmt = $this->conexion->prepare("INSERT INTO personal (nombre_completo, cedula, correo, telefono, rol, fecha_nacimiento, direccion, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssssss", $nombre_completo, $cedula, $correo, $telefono, $rol, $fecha_nacimiento, $direccion, $observaciones);
        
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Obtener todos los registros de personal
    public function obtenerPersonal() {
        $result = $this->conexion->query("SELECT * FROM personal");
        $personales = [];

        while ($row = $result->fetch_assoc()) {
            $personales[] = $row;
        }

        return $personales;
    }

    // Obtener una persona por su ID
    public function obtenerPersonalPorId($id_personal) {
        $stmt = $this->conexion->prepare("SELECT * FROM personal WHERE id_personal = ?");
        $stmt->bind_param("i", $id_personal);
        $stmt->execute();
        
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            return $result->fetch_assoc();
        }
        
        return null;
    }

    // Editar los datos del personal
    public function editarPersonal($id_personal, $nombre_completo, $cedula, $correo, $telefono, $rol, $fecha_nacimiento, $direccion, $observaciones) {
        $stmt = $this->conexion->prepare("UPDATE personal SET nombre_completo = ?, cedula = ?, correo = ?, telefono = ?, rol = ?, fecha_nacimiento = ?, direccion = ?, observaciones = ? WHERE id_personal = ?");
        $stmt->bind_param("ssssssssi", $nombre_completo, $cedula, $correo, $telefono, $rol, $fecha_nacimiento, $direccion, $observaciones, $id_personal);
        
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Eliminar un registro de personal
    public function eliminarPersonal($id_personal) {
        $stmt = $this->conexion->prepare("DELETE FROM personal WHERE id_personal = ?");
        $stmt->bind_param("i", $id_personal);
        
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Procesar el formulario de registro de personal
    public function procesarFormulario($datos) {
        // Validar datos del formulario
        if (empty($datos['nombre_completo']) || empty($datos['cedula']) || empty($datos['correo']) || empty($datos['telefono']) || empty($datos['rol']) || empty($datos['fecha_nacimiento'])) {
            return [
                'exito' => false,
                'mensaje' => 'Por favor complete todos los campos obligatorios'
            ];
        }
        
        // Crear el personal
        if ($this->crearPersonal(
            $datos['nombre_completo'],
            $datos['cedula'],
            $datos['correo'],
            $datos['telefono'],
            $datos['rol'],
            $datos['fecha_nacimiento'],
            $datos['direccion'],
            $datos['observaciones']
        )) {
            return [
                'exito' => true,
                'mensaje' => 'Registro de personal creado con éxito.'
            ];
        } else {
            return [
                'exito' => false,
                'mensaje' => 'Error al crear el registro de personal.'
            ];
        }
    }
}

?>
