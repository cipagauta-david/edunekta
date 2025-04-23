<?php
require_once './DEMO/Conexion.php" '; 

$conexionBD = new Conexion();
$conn = $conexionBD->getConexion();

if (!$conn) {
    die("No se pudo establecer conexión con la base de datos.");
}

$correo = $_POST['correo'];
$cedula = $_POST['cedula'];

$correo = $conn->real_escape_string($correo);
$cedula = $conn->real_escape_string($cedula);

$sql = "SELECT * FROM personal WHERE correo = '$correo' AND cedula = '$cedula'";
$resultado = $conn->query($sql);

if ($resultado->num_rows > 0) {
    session_start();
    $_SESSION['correo'] = $correo;
    header("Location: DEMO/dashboard.php" ); 
    exit();
} else {
    // Redirige con un parámetro de error
    header("Location: login.php?error=1");
    exit();
}

$conn->close();
?>
