<?php
include "../../conexion.php" ;

class Noticia {
    private $inameof;
    private $titulo;
    private $fecha;
    private $descripcion;
    private $clase_id;
    private $estado;

    public function __construct($id = null, $titulo = null, $fecha = null, $descripcion = null, $clase_id = null, $estado = "Pendiente") {
        $this->id = $id;
        $this->titulo = $titulo;
        $this->fecha = $fecha;
        $this->descripcion = $descripcion;
        $this->clase_id = $clase_id;
        $this->estado = $estado;
    }

    // Getters
    public function getId() {
        return $this->id;
    }

    // Setters
    public function setId($id) {
        $this->id = $id;
    }

    // Métodos para operaciones CRUD
    public function obtener($conexion) {
        $stmt = $conexion->prepare("SELECT * from actividad where id=?");
        $stmt->bind_param("sssis", $this->titulo, $this->fecha, $this->descripcion, $this->clase_id, $this->estado);
        
        if ($stmt->execute()) {
            $this->id = $conexion->insert_id;
            return true;
        }
        
        return false;
    }
    public function guardar($conexion) {
        $stmt = $conexion->prepare("INSERT INTO actividad (titulo, fecha_entrega, descripcion, clase_id_clase, estado) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssis", $this->titulo, $this->fecha, $this->descripcion, $this->clase_id, $this->estado);
        
        if ($stmt->execute()) {
            $this->id = $conexion->insert_id;
            return true;
        }
        
        return false;
    }

    public function actualizar($conexion) {
        $stmt = $conexion->prepare("UPDATE actividades SET titulo=?, fecha=?, descripcion=?, clase_id=?, estado=? WHERE id=?");
        $stmt->bind_param("sssisi", $this->titulo, $this->fecha, $this->descripcion, $this->clase_id, $this->estado, $this->id);
        
        return $stmt->execute();
    }

    public function eliminar($conexion) {
        $stmt = $conexion->prepare("DELETE FROM actividades WHERE id=?");
        $stmt->bind_param("i", $this->id);
        
        return $stmt->execute();
    }
}

// Factory para la creación de objetos Actividad
class ActividadFactory {
    private $conexion;

    public function __construct() {
        $conexionDB = new Conexion();
        $this->conexion = $conexionDB->getConexion();
        
        // Verificar si la tabla existe, si no, crearla
        $this->crearTablaActividades();
    }

    // Método para crear la tabla si no existe
    private function crearTablaActividades() {
        $sql = "CREATE TABLE IF NOT EXISTS actividades (
            id_actividad INT AUTO_INCREMENT PRIMARY KEY,
            titulo VARCHAR(255) NOT NULL,
            fecha_entrega DATE NOT NULL,
            descripcion TEXT,
            clase_id_clase INT NOT NULL,
            estado VARCHAR(50) DEFAULT 'Pendiente'
        )";
        
        $this->conexion->query($sql);
    }

    // Crear nueva actividad desde los datos de formulario
    public function crearActividad($titulo, $fecha, $descripcion, $clase_id, $estado = "Pendiente") {
        $actividad = new Actividad(null, $titulo, $fecha, $descripcion, $clase_id, $estado);
        
        if ($actividad->guardar($this->conexion)) {
            return $actividad;
        }
        
        return null;
    }

    // Obtener una actividad por su ID
    public function obtenerActividadPorId($id) {
        $stmt = $this->conexion->prepare("SELECT * FROM actividades WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            return new Actividad(
                $row['id'], 
                $row['titulo'], 
                $row['fecha'], 
                $row['descripcion'], 
                $row['clase_id'], 
                $row['estado']
            );
        }
        
        return null;
    }

    // Obtener todas las actividades
    public function obtenerTodasLasActividades() {
        $result = $this->conexion->query("SELECT * FROM actividades ORDER BY fecha DESC");
        $actividades = [];
        
        while ($row = $result->fetch_assoc()) {
            $actividades[] = new Actividad(
                $row['id'], 
                $row['titulo'], 
                $row['fecha'], 
                $row['descripcion'], 
                $row['clase_id'], 
                $row['estado']
            );
        }
        
        return $actividades;
    }
    
    // Obtener actividades por estado
    public function obtenerActividadesPorEstado($estado) {
        $stmt = $this->conexion->prepare("SELECT * FROM actividades WHERE estado = ? ORDER BY fecha DESC");
        $stmt->bind_param("s", $estado);
        $stmt->execute();
        
        $result = $stmt->get_result();
        $actividades = [];
        
        while ($row = $result->fetch_assoc()) {
            $actividades[] = new Actividad(
                $row['id'], 
                $row['titulo'], 
                $row['fecha'], 
                $row['descripcion'], 
                $row['clase_id'], 
                $row['estado']
            );
        }
        
        return $actividades;
    }
    
    // Obtener actividades por clase
    public function obtenerActividadesPorClase($clase_id) {
        $stmt = $this->conexion->prepare("SELECT * FROM actividades WHERE clase_id = ? ORDER BY fecha DESC");
        $stmt->bind_param("i", $clase_id);
        $stmt->execute();
        
        $result = $stmt->get_result();
        $actividades = [];
        
        while ($row = $result->fetch_assoc()) {
            $actividades[] = new Actividad(
                $row['id'], 
                $row['titulo'], 
                $row['fecha'], 
                $row['descripcion'], 
                $row['clase_id'], 
                $row['estado']
            );
        }
        
        return $actividades;
    }

    // Procesar la solicitud del formulario
    public function procesarFormulario($datos) {
        // Validar datos del formulario
        if (empty($datos['titulo']) || empty($datos['fecha']) || empty($datos['clase'])) {
            return [
                'exito' => false,
                'mensaje' => 'Por favor complete todos los campos obligatorios'
            ];
        }
        
        // Crear la actividad
        $actividad = $this->crearActividad(
            $datos['titulo'],
            $datos['fecha'],
            isset($datos['descripcion']) ? $datos['descripcion'] : '',
            $datos['clase'],
            'Pendiente'
        );
        
        if ($actividad) {
            return [
                'exito' => true,
                'mensaje' => 'Actividad creada con éxito',
                'actividad' => $actividad
            ];
        } else {
            return [
                'exito' => false,
                'mensaje' => 'Error al crear la actividad'
            ];
        }
    }
}

