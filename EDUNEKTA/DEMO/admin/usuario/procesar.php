<?php
include "usuario.php";
// Código para procesar el formulario cuando se envía
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $factory = new PersonalFactory();
  $resultado = $factory->procesarFormulario($_POST);
  
  if ($resultado['exito']) {
      // Redireccionar o mostrar mensaje de éxito
      header('Location: Registrar.html?success=1');
      exit;
  } else {
      // Redirigir con mensaje de error
      header('Location: Registrar.html?error=' . urlencode($resultado['mensaje']));
      exit;
  }
}
?>