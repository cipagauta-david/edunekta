<?php
// Verificar si la clase ya existe antes de declararla
if (!class_exists('Conexion')) {
    class Conexion {
        private $host = "edunekta-edunekta.i.aivencloud.com:10536";
        private $dbname = "edunekta";
        private $username = ""; 
        private $password = "";
        private $conexion;

        public function __construct() {
            try {
                $this->conexion = new mysqli(
                    $this->host,
                    $this->username, 
                    $this->password,
                    $this->dbname
                );
                if ($this->conexion->connect_error) {
                    throw new Exception("Error de conexión: " . $this->conexion->connect_error);
                }
            } catch(Exception $e) {
                echo "Error de conexión: " . $e->getMessage();
            }
        }

        public function getConexion() {
            return $this->conexion;
        }
    }
}