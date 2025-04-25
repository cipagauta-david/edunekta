<?php
require_once './DEMO/Conexion.php'; 

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
    $usuario = $resultado->fetch_assoc();
    $_SESSION['correo'] = $usuario['correo'];
    $_SESSION['rol'] = $usuario['rol'];  

    switch ($usuario['rol']) {
        case 'Docente':
            header("Location: DEMO/dashboard_docente.php");
            break;
        case 'Administrativo':
            header("Location: DEMO/dashboard_administrativo.php");
            break;
        case 'Psicologo':
            header("Location: DEMO/dashboard_psicologo.php");
            break;
        case 'Acudiente':
            header("Location: DEMO/dashboard_acudiente.php");
            break;
        case 'Estudiantes':
            header("Location: ESTUDIANTE/dashboard_estu.php");
            break;
        default:
           
            header("Location: login.html?error=rol_invalido");
            break;
    }
    exit();
} else {
    header("Location: login.html?error=1");
    exit();
}
?>
