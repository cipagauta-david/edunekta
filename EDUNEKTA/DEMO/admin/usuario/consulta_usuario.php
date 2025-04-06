<?php
// Incluir archivo de conexión
include('../../conexion.php');  // Asegúrate de que la ruta sea correcta

// Verificar si se ha enviado el formulario con los parámetros de búsqueda
if (isset($_GET['criterio']) && isset($_GET['valor'])) {
    $criterio = $_GET['criterio'];
    $valor = $_GET['valor'];

    // Conexión a la base de datos
    $conexion = new Conexion();
    $conexionDB = $conexion->getConexion();

    // Verificar si el criterio de búsqueda es válido
    $valid_criterios = ['nombre_completo', 'cedula', 'correo', 'rol'];

    if (in_array($criterio, $valid_criterios)) {
        // Preparar la consulta SQL
        $sql = "SELECT * FROM personal WHERE $criterio LIKE ?";
        $stmt = $conexionDB->prepare($sql);
        $valor_busqueda =  $valor ; // Usamos el comodín para buscar cualquier coincidencia
        $stmt->bind_param("s", $valor_busqueda); // "s" para un parámetro de tipo string
        $stmt->execute();
        $resultado = $stmt->get_result();

        // Verificar si se encontraron resultados
        if ($resultado->num_rows > 0) {
            // Mostrar los resultados en una tabla estilizada
            echo '<table class="tabla">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Cédula</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            
                        </tr>
                    </thead>
                    <tbody>';
            
            // Mostrar los resultados en las filas de la tabla
            while ($fila = $resultado->fetch_assoc()) {
                echo '<tr>
                        <td>' . $fila['id'] . '</td>
                        <td>' . $fila['nombre_completo'] . '</td>
                        <td>' . $fila['cedula'] . '</td>
                        <td>' . $fila['correo'] . '</td>
                        <td>' . $fila['rol'] . '</td>
                      
                      </tr>';
            }

            echo '</tbody></table>';
        } else {
            echo "<div class='alert alert-warning'>No se encontraron resultados para la búsqueda.</div>";
        }

        // Cerrar la sentencia preparada
        $stmt->close();
    } else {
        echo "<div class='alert alert-danger'>Criterio de búsqueda no válido.</div>";
    }
} else {
    echo "<div class='alert alert-info'>Por favor, ingresa un criterio y valor de búsqueda.</div>";
}
?>
