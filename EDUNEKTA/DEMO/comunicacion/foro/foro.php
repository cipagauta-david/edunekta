<?php
include "../../conexion.php" ;

class Foro {
    private $id_foro;
    private $titulo;
    private $fecha;
    private $autor;
    private $descripcion;
    private $institucion_id_institucion;

    public function __construct($id_foro = null, $titulo = null, $fecha = null, $autor = null, $descripcion = null, $institucion_id_institucion = null) {
        $this->id_foro = $id_foro;
        $this->titulo = $titulo;
        $this->fecha = $fecha;
        $this->autor = $autor;
        $this->descripcion = $descripcion;
        $this->institucion_id_institucion = $institucion_id_institucion;
    }

    // Getters
    public function getIdForo() {
        return $this->id_foro;
    }

    public function getTitulo() {
        return $this->titulo;
    }

    // Setters
    public function setIdForo($id_foro) {
        $this->id_foro = $id_foro;
    } 

    public function setTitulo($titulo) {
        $this->titulo = $titulo;
    }
    
    // CRUD
    public function guardar($conexion) {
        $stmt = $conexion->prepare("INSERT INTO foro (titulo, fecha, autor, descripcion, institucion_id_institucion) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssi", $this->titulo, $this->fecha, $this->autor, $this->descripcion, $this->institucion_id_institucion);

        if ($stmt->execute()) {
            $this->id_foro = $conexion->insert_id;
            return true;
        }

        return false;
    }

    public function actualizar($conexion) {
        $stmt = $conexion->prepare("UPDATE foro SET titulo = ?, fecha = ?, autor = ?, descripcion = ?, institucion_id_institucion = ? WHERE id_foro = ?");
        $stmt->bind_param("ssssii", $this->titulo, $this->fecha, $this->autor, $this->descripcion, $this->institucion_id_institucion, $this->id_foro);

        return $stmt->execute();
    }

    public function eliminar($conexion) {
        $stmt = $conexion->prepare("DELETE FROM foro WHERE id_foro = ?");
        $stmt->bind_param("i", $this->id_foro);

        return $stmt->execute();
    }

    public function obtener($conexion) {
        $stmt = $conexion->prepare("SELECT * FROM foro WHERE id_foro = ?");
        $stmt->bind_param("i", $this->id_foro);
        $stmt->execute();

        $result = $stmt->get_result();

        if ($row = $result->fetch_assoc()) {
            $this->titulo = $row['titulo'];
            $this->fecha = $row['fecha'];
            $this->autor = $row['autor'];
            $this->descripcion = $row['descripcion'];
            $this->institucion_id_institucion = $row['institucion_id_institucion'];
            return true;
        }

        return false;
    }
}

// Factory para la creación de objetos Foro
class ForoFactory {
    private $conexion;

    public function __construct() {
        $conexionDB = new Conexion();
        $this->conexion = $conexionDB->getConexion();
        
        // Verificar si la tabla existe, si no, crearla
        $this->crearTablaForo();
    }

    // Método para crear la tabla si no existe
    private function crearTablaForo() {
        $sql = "CREATE TABLE IF NOT EXISTS foro (
            id_foro INT AUTO_INCREMENT PRIMARY KEY,
            titulo VARCHAR(255) NOT NULL,
            fecha DATE NOT NULL,
            autor VARCHAR(255) NOT NULL,
            descripcion TEXT,
            institucion_id_institucion INT NOT NULL
        )";
        
        $this->conexion->query($sql);
    }

    // Crear nuevo foro desde los datos de formulario
    public function crearForo($titulo, $fecha, $autor, $descripcion, $institucion_id_institucion) {
        $foro = new Foro(null, $titulo, $fecha, $autor, $descripcion, $institucion_id_institucion);
        
        if ($foro->guardar($this->conexion)) {
            return $foro;
        }
        
        return null;
    }

    // Obtener un foro por su ID
    public function obtenerForoPorId($id_foro) {
        $stmt = $this->conexion->prepare("SELECT * FROM foro WHERE id_foro = ?");
        $stmt->bind_param("i", $id_foro);
        $stmt->execute();
        
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            return new Foro(
                $row['id_foro'], 
                $row['titulo'],
                $row['fecha'], 
                $row['autor'], 
                $row['descripcion'], 
                $row['institucion_id_institucion']
            );
        }
        
        return null;
    }

    // Obtener todos los foros
    public function obtenerTodosLosForos() {
        $result = $this->conexion->query("SELECT * FROM foro ORDER BY fecha DESC");
        $foros = [];
        
        while ($row = $result->fetch_assoc()) {
            $foros[] = new Foro(
                $row['id_foro'], 
                $row['titulo'],
                $row['fecha'], 
                $row['autor'], 
                $row['descripcion'], 
                $row['institucion_id_institucion']
            );
        }
        
        return $foros;
    }
    
    // Obtener foros por institución
    public function obtenerForosPorInstitucion($institucion_id_institucion) {
        $stmt = $this->conexion->prepare("SELECT * FROM foro WHERE institucion_id_institucion = ? ORDER BY fecha DESC");
        $stmt->bind_param("i", $institucion_id_institucion);
        $stmt->execute();
        
        $result = $stmt->get_result();
        $foros = [];
        
        while ($row = $result->fetch_assoc()) {
            $foros[] = new Foro(
                $row['id_foro'], 
                $row['titulo'],
                $row['fecha'], 
                $row['autor'], 
                $row['descripcion'], 
                $row['institucion_id_institucion']
            );
        }
        
        return $foros;
    }

    // Procesar la solicitud del formulario
    public function procesarFormulario($datos) {
        // Validar datos del formulario
        if (empty($datos['titulo']) || empty($datos['fecha']) || empty($datos['autor']) || empty($datos['institucion_id_institucion'])) {
            return [
                'exito' => false,
                'mensaje' => 'Por favor complete todos los campos obligatorios'
            ];
        }
        
        // Crear el foro
        $foro = $this->crearForo(
            $datos['titulo'],
            $datos['fecha'],
            $datos['autor'],
            isset($datos['descripcion']) ? $datos['descripcion'] : '',
            $datos['institucion_id_institucion']
        );
        
        if ($foro) {
            return [
                'exito' => true,
                'mensaje' => 'Foro creado con éxito',
                'foro' => $foro
            ];
        } else {
            return [
                'exito' => false,
                'mensaje' => 'Error al crear el foro'
            ];
        }
    }
}
