<?php
include('../../conexion.php');
$conexion = new Conexion();
$conn = $conexion->getConexion();

$accion = $_POST['accion'] ?? '';

if ($accion === 'editar') {
    $stmt = $conn->prepare("UPDATE personal SET nombre_completo=?, cedula=?, correo=?, rol=?, estado=? WHERE id=?");
    $stmt->bind_param("ssssii", $_POST['nombre'], $_POST['cedula'], $_POST['correo'], $_POST['rol'], $_POST['estado'], $_POST['id']);
    echo $stmt->execute() ? 'ok' : 'error';

} elseif ($accion === 'eliminar') {
    $stmt = $conn->prepare("DELETE FROM personal WHERE id=?");
    $stmt->bind_param("i", $_POST['id']);
    echo $stmt->execute() ? 'ok' : 'error';

} else {
    echo 'acción inválida';
}
?>
