<?php
include "foro.php" ;
// Código para procesar el formulario cuando se envía
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $factory = new ForoFactory();
  $resultado = $factory->procesarFormulario($_POST);
  
  if ($resultado['exito']) {
      // Redireccionar o mostrar mensaje de éxito
      header('Location: editarForo.php" ?success=1');
      exit;
  } else {
      // Redirigir con mensaje de error
      header('Location: crearForo.php" error=' . urlencode($resultado['mensaje']));
      exit;
  }
}
?>