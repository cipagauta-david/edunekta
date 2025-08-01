<?php
include('../../conexion.php');

$conexion = new Conexion();
$conn = $conexion->getConexion();

$accion = $_POST['accion'] ?? '';

if ($accion === 'editar') {
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $cedula = $_POST['cedula'];
    $correo = $_POST['correo'];
    $rol = $_POST['rol'];
    $estado = $_POST['estado']; // 'Activo' o 'Inactivo'

    $stmt = $conn->prepare("UPDATE personal SET nombre_completo=?, cedula=?, correo=?, rol=?, estado=? WHERE id=?");
    $stmt->bind_param("sssssi", $nombre, $cedula, $correo, $rol, $estado, $id);
    echo $stmt->execute() ? 'ok' : 'error';

} elseif ($accion === 'eliminar') {
    $id = $_POST['id'];
    $stmt = $conn->prepare("DELETE FROM personal WHERE id=?");
    $stmt->bind_param("i", $id);
    echo $stmt->execute() ? 'ok' : 'error';

} else {
    echo 'acción inválida';
}
?>
