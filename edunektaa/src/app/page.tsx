import React from "react";
import Image from "next/image";
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
import "./globals.css";
import "./globals.js";

export default function Home() {
  return (
    <main>
      {/* <Header /> */}

      <div>
        <section className="fraseinicial">
          <h2>Únete a nuestra revolución educativa</h2>
        </section>

        <section className="contenido">
          <div className="p1">
            <Image
              src="/imagenes/imgcolegio.jpg"
              alt="Imagen de un colegio"
              className="responsive-img"
              width={500}
              height={300}
            />
            <p className="margen">
              En <b>Edunekta</b>, creemos en transformar la educación a través
              de tecnologías innovadoras y metodologías centradas en el
              estudiante. Nuestro objetivo es proporcionar herramientas
              accesibles y efectivas que empoderen a docentes y alumnos,
              fomentando un ambiente de aprendizaje dinámico y colaborativo.
            </p>
          </div>

          <div className="p2">
            <p className="margen2">
              Nuestra visión es crear una comunidad educativa inclusiva y
              sostenible donde cada individuo tenga la oportunidad de alcanzar
              su máximo potencial. Nos comprometemos a impulsar el desarrollo
              continuo, promoviendo valores de respeto, creatividad y excelencia
              en todos nuestros programas y actividades.
            </p>
            <Image
              src="/imagenes/imgcolegio.jpg"
              alt="Imagen de un colegio"
              className="responsive-img"
              width={500}
              height={300}
            />
          </div>
        </section>

        <section className="testimonios margen2">
          <h2>Testimonios</h2>
          <div className="container row">
            <div className="col-1"></div>
            <div className="col-1"></div>

            <div className="cajausuario col-6">
              <Image
                src="/imagenes/avatarHombre1.png"
                alt="Usuario 1"
                className="imgtestimonios"
                width={80}
                height={80}
              />
              <div className="info">
                <p>
                  <strong>Juan Pérez</strong>
                </p>
                <p>
                  Edunekta transformó mi experiencia educativa. ¡Altamente
                  recomendado!
                </p>
              </div>
            </div>

            <div className="col-1"></div>
            <div className="col-1"></div>

            <div className="cajausuario col-6">
              <Image
                src="/imagenes/avatarMujer2.png"
                alt="Usuario 2"
                className="imgtestimonios"
                width={80}
                height={80}
              />
              <div className="info">
                <p>
                  <strong>María López</strong>
                </p>
                <p>
                  La plataforma es intuitiva y muy útil para el aprendizaje
                  diario.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* <Footer /> */}
    </main>
  );
}
