<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edunekta - Acerca</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css">
    <script src="https://kit.fontawesome.com/b408879b64.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="estilos.css">
    <style>
        .box-info {
            color: #000;
            display: flex;
            flex-direction: column;
            gap: 50px;
        }

        .box-info>h1 {
            text-align: left;
            letter-spacing: 5px;
        }

        .data {
            display: flex;
            flex-direction: column;
            gap: 25px
        }

        .data>p {
            font-size: 1rem;
        }

        .data>p>i {
            color: rgb(63, 186, 243);
            margin-right: 10px;
            font-size: 25px;
        }

        .container {
            display: grid;
            grid-template-columns: repeat(2, 50%);
            padding: 20px;
            gap: 10px;
            width: 1000px;
        }

        .container {
            background: #fff;
            padding: 50px 55px;
            box-shadow: rgba(0, 0, 0, 0.2);
            border-radius: 20px;
        }

        main{            
            background: linear-gradient(#57b0d2, #d4ebf4);
            margin-top: 50px;
            margin-bottom: 50px;
        }


        .links {
            display: flex;
            gap: 15px;
        }

        .links>a {
            text-decoration: none;
            width: 40px;
            height: 40px;
            background: rgb(63, 186, 243);
            text-align: center;
            transition: .1s;
        }

        .links>a>i {
            color: #fff;
            line-height: 40px;
            font-size: 20px;
        }


        form {
            display: flex;
            flex-direction: column;
            text-align: center;
            gap: 15px;
        }

        .input-box {
            position: relative;
        }

        .input-box>input {
            width: 100%;
            height: 40px;
            padding: 0 10px;
            outline: none;
            background: rgba(252, 234, 234, 0.1);
            border: 3px solid transparent;
            letter-spacing: 1px;
            transition: .3s;
            color: #000;

        }

        .input-box>input::placeholder,
        .input-box>textarea::placeholder {
            color: #000;

        }

        .input-box>input:focus::placeholder,
        .input-box>textarea:focus::placeholder {
            color: transparent;
        }

        .input-box>input:focus,
        .input-box>textarea:focus {
            border-bottom: 3px solid rgb(63, 186, 243);
            animation: shake .2s;
        }

        .input-box>textarea {
            width: 100%;
            height: 130px;
            padding: 10px;
            background: rgba(255 255 255 / .1);
            border: 3px solid transparent;
            letter-spacing: 1px;
            outline: none;
            transition: .3s;
            color: #000;
            letter-spacing: 1.5px;
        }


        .input-box>i {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 10px;
            color: rgba(255 255 255 / .3);
            transition: .3s;
        }

        .input-box>input:focus~i {
            color: rgb(63, 186, 243);
        }

        form>button {
            width: 100%;
            padding: 10px;
            outline: none;
            background: rgb(63, 186, 243);
            color: #fff;
            border: none;
            transition: .1s;
            cursor: pointer;
            font-size: 1rem;
        }

        .tyc>button {

            width: 30%;
            padding: 10px;
            outline: none;
            background: rgb(63, 186, 243);
            color: #fff;
            border: none;
            transition: .1s;
            cursor: pointer;
            font-size: 1rem;
        }

        form>button:hover,
        .links>a:hover,
        .tyc>button:hover {
            background: rgb(16, 19, 172);
        }

        @keyframes shake {

            0%,
            100% {
                transform: translateX(0);
            }

            10%,
            30%,
            50%,
            70%,
            90% {
                transform: translateX(-10px);
            }

            20%,
            40%,
            60%,
            80% {
                transform: translateX(10px);
            }
        }


        @media screen and (max-width:600px) {
            .container {
                width: 95%;
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            .box-info {
                gap: 15px;
            }

            .box-info>h1 {
                font-size: 1.5rem;
            }
        }
    </style>
</head>

<body>
    <header>
        <div class="caja1">
            <div class="logo">
                <a href="index.php" >
                    <img src="imagenes/Logotipo.png" alt="Logo Edunekta" width="50" height="50">
                </a>
                <h1>Edunekta</h1>
            </div>
            <nav>
                <ul class="links">
                    <li><a href="index.php" >Inicio</a></li>
                    <li><a href="acerca.php" >Acerca</a></li>
                    <li><a href="contactenos.php" class="active">Contáctanos</a></li>
                    <li><a href="FAQ.php" >FAQ</a></li>
                </ul>
            </nav>
            <button class="login-button" onclick="window.location.href='login_1.php" '">LOGIN</button>
        </div>
    </header>

    <main class="mb-10">
        <div class="container">
            <div class="box-info">
                <h1> CONTACTESE CON NOSOTROS</h1>
                <div class="data">
                    <p><i class="fa-solid fa-phone"></i> +57 1010232524</p>
                    <p><i class="fa-solid fa-envelope"></i> Edunekta@gmail.com</p>
                    <p><i class="fa-solid fa-location-dot"></i>Cl. 170 #67-51, Bogotá </p>
                </div>
                <div class="links">
                    <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                    <a href="#"><i class="fa-brands fa-instagram"></i></a>
                    <a href="#"><i class="fa-brands fa-twitter"></i></a>
                    <a href="#"><i class="fa-brands fa-linkedin"></i></a>
                </div>
            </div>
            <form>
                <div class="input-box">
                    <input type="text" placeholder="Nombre y apellido" required>
                    <i class="fa-solid fa-user"></i>
                </div>
                <div class="input-box">
                    <input type="email" required placeholder="Correo electrónico">
                    <i class="fa-solid fa-envelope"></i>
                </div>
                <div class="input-box">
                    <input type="text" placeholder="Asunto">
                    <i class="fa-solid fa-pen-to-square"></i>
                </div>
                <div class="input-box">
                    <textarea placeholder="Escribe tu mensaje..."></textarea>
                </div>
                <button type="submit">Enviar mensaje</button>

            </form>
        </div>
    </main>
    
    <footer>
        <div class="contenedorfooter">
            <h2>Edunekta</h2>
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
            <p>&copy; 2024 Edunekta. Todos los derechos reservados.</p>
        </div>
    </footer>
    <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=674147c10387f1f3fa2b46c8"
        type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
        crossorigin="anonymous"></script>
    <script src="https://cdn.prod.website-files.com/674147c10387f1f3fa2b46c8/js/webflow.f4b71bfd4.js"
        type="text/javascript"></script>
</body>

</html>