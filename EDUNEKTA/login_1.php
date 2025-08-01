<!DOCTYPE html> 
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edunekta - Inicio</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="estilos.css">
</head>

<body>

    <!-- Alerta de error si error=1 en la URL -->
    <div class="container mt-3">
        <div id="alertaError" class="alert alert-danger alert-dismissible fade show d-none" role="alert">
            <strong>Error:</strong> Correo o cédula incorrectos. Intenta de nuevo.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>

    <main>
        <div class="caja2 align-items-center">
            <form action="login.php" method="post" class="form-box needs-validation" novalidate>
                <a href="./index.php" ><img src="./imagenes/Logotipo.png" alt="logo" class="logologin"></a>
                <h1>Iniciar Sesión</h1>
                
                <label for="usuario" class="form-label"></label>
                <input type="text" id="usuario" class="form-control espacio" name="correo" required placeholder="Usuario">
                <div class="invalid-feedback">Por favor, ingresa un nombre de usuario.</div>
                
                <label for="contrasena" class="form-label"></label>
                <input type="password" id="contrasena" class="form-control espacio" name="cedula" required placeholder="Contraseña">
                <div class="invalid-feedback">La contraseña es obligatoria.</div>
                
                <input type="submit" class="btn btn-primary" style="align-self: center;" value="Iniciar Sesión">
                <input type="button" class="btn btn-primary mt-3" onclick="window.location.href='DEMO/dashboard.php" '" value="DEMO">
                <button type="button" class="btn btn-secondary mt-3" onclick="window.location.href='index.php" '">Regresar</button>
            </form>
        </div>
    </main>

    <footer>
        <div class="footer-container">
            <div class="left-footer">
                <div class="social-icons">
                    <a href="#" aria-label="Facebook">
                        <img src="imagenes/iconoFacebook.png" alt="Icono de Facebook" width="20" height="20">
                    </a>
                    <a href="#" aria-label="LinkedIn">
                        <img src="imagenes/iconoLinkedin.png" alt="Icono de LinkedIn" width="20" height="20">
                    </a>
                    <a href="#" aria-label="YouTube">
                        <img src="imagenes/iconoYoutube.png" alt="Icono de YouTube" width="20" height="20">
                    </a>
                    <a href="#" aria-label="Instagram">
                        <img src="imagenes/iconoInstragram.png" alt="Icono de Instagram" width="20" height="20">
                    </a>
                    <a href="mapa.php" id="mapaS">Conoce el mapa del sitio</a>
                    <a href="error404page.php" id="mapaS">Error 404</a>
                    <a href="error500page.php" id="mapaS">Error 500</a>
                </div>
                <h2>Edunekta</h2>
            </div>
            <div class="right-footer">
                <p>&copy; 2024 Edunekta. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>

    <script>
        // Validación de Bootstrap
        (() => {
            'use strict'
            const forms = document.querySelectorAll('.needs-validation')
            Array.from(forms).forEach(form => {
                form.addEventListener('submit', event => {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    form.classList.add('was-validated')
                }, false)
            })
        })();

        // Mostrar alerta si hay error en login
        const params = new URLSearchParams(window.location.search);
        if (params.get("error") === "1") {
            document.getElementById("alertaError").classList.remove("d-none");
        }
    </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>
