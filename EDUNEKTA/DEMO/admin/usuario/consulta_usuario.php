<?php
session_start();
include('../../conexion.php');

// Verificar si se ha enviado el formulario con los parámetros de búsqueda
if (isset($_GET['criterio']) && isset($_GET['valor'])) {
    $criterio = $_GET['criterio'];
    $valor = $_GET['valor'];

    $conexion = new Conexion();
    $conexionDB = $conexion->getConexion();

    $columnas = [
        'nombre_completo' => 'nombre_completo',
        'cedula' => 'cedula',
        'correo' => 'correo',
        'rol' => 'rol'
    ];

    if (array_key_exists($criterio, $columnas)) {
        $columna = $columnas[$criterio];
        $sql = "SELECT * FROM personal WHERE $columna LIKE ?";
        $stmt = $conexionDB->prepare($sql);
        $valor_busqueda = '%' . $valor . '%';
        $stmt->bind_param("s", $valor_busqueda);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows > 0) {
            $_SESSION['resultados'] = $resultado->fetch_all(MYSQLI_ASSOC);
            header("Location: resultado.html");
            exit();
        } else {
            echo "<script>alert('No se encontraron resultados.'); window.history.back();</script>";
        }

        $stmt->close();
        $conexionDB->close();
    } else {
        echo "<script>alert('Criterio de búsqueda no válido.'); window.history.back();</script>";
    }
} else {
    echo "<script>alert('Por favor, ingresa un criterio y valor de búsqueda.'); window.history.back();</script>";
}
?>
