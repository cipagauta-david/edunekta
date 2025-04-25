<!-- filepath: c:\xampp\htdocs\edunekta\EDUNEKTA\DEMO\logout.php -->
<?php
session_start();
session_destroy(); // Destruir la sesión
header("Location: ../index.html"); // Redirigir al login
exit();
?>