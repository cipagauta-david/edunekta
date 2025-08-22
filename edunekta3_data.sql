-- Edunekta v2.0 — Datos de ejemplo, análisis y plan
-- Motor: MySQL 8.x (InnoDB, utf8mb4_0900_ai_ci)
-- Contenido: análisis + plan + sentencias INSERT con al menos 3 filas por tabla.
-- Ejecutar en el mismo esquema / orden que la DDL original (asegúrate de haber ejecutado
-- previamente el DDL proporcionado por el usuario que crea las tablas y triggers).

/*
ANÁLISIS RÁPIDO
- Objetivo: poblar todas las tablas con datos de ejemplo (>=3 filas por tabla) manteniendo
  la coherencia referencial con las FK y respetando CHECK / UNIQUE constraints y triggers.
- Estrategia: insertar en el orden lógico de dependencias (instituciones → usuarios y
  catálogos → niveles/grados/periodos → aulas/asignaturas → grupos → clases →
  matrículas/actividades/evidencias/asistencias → módulo financiero → calendario/mensajería).
- Para evitar consultas adicionales, se usan IDs explícitas controladas en los INSERT
  (esto facilita las FK en este script de ejemplo).
- Notas sobre triggers: existen triggers que validan ponderaciones y actualizan saldos
  al insertar pagos. Los porcentajes por clase no exceden 100% y los pagos hacen
  coherente el saldo de la factura.

PLAN DE EJECUCIÓN (orden de inserción)
1) institucion
2) nivel_academico, grado, periodo_academico, asignatura, aula
3) usuario
4) grupo
5) clase
6) matricula
7) estudiante_acudiente
8) actividad, evidencia_actividad
9) asistencia
10) archivo_digital
11) ponderacion_evaluacion
12) calificacion_periodo
13) concepto_facturacion, factura, detalle_factura, pago
14) calendario_evento
15) conversacion, usuario_conversacion, mensaje
16) foro, comentario_foro
17) notificacion

-- Sugerencia: ejecutar todo en una transacción durante las pruebas (BEGIN; ... COMMIT;)
-- para poder revertir si algo falla.
*/

SET NAMES utf8mb4;
USE edunekta3;

-- =========================
-- 1) INSTITUCIONES (>=3)
-- =========================
INSERT INTO institucion (id, nombre, nit, correo, telefono, direccion)
VALUES
  (1, 'Colegio San José', '900123456-1', 'info@c-sanjose.edu.co', '+57 1 555 0101', 'Calle 10 # 5-20'),
  (2, 'Institución Educativa La Cumbre', '900987654-2', 'contacto@lacumbre.edu.co', '+57 1 555 0202', 'Carrera 7 # 34-56'),
  (3, 'Academia Tech', '901112223-3', 'hola@academiatech.edu', '+57 1 555 0303', 'Av. Tecnología 200');

-- =========================
-- 2) NIVEL_ACADEMICO (>=3)
-- =========================
INSERT INTO nivel_academico (id, institucion_id, nombre, descripcion)
VALUES
  (1, 1, 'Inicial', 'Nivel inicial preescolar'),
  (2, 1, 'Primaria', 'Educación básica primaria'),
  (3, 1, 'Secundaria', 'Educación media - secundaria');
  (4, 1, 'Bachillerato', 'Educación media/alta - bachillerato');
  (5, 1, 'Técnico', 'Educación alta - técnico');  
  (6, 1, 'Tecnólogo', 'Educación alta - tecnólogo');  

-- =========================
-- 3) GRADO (>=3)
-- =========================
INSERT INTO grado (id, institucion_id, nivel_academico_id, nombre, descripcion)
VALUES
  (1, 1, 1, 'Pre-K', 'Pre kinder'),
  (2, 1, 2, '3°', 'Tercer grado de primaria'),
  (3, 1, 4, '11°', 'Onceavo grado de bachillerato');
  (4, 1, 5, 'Técnico en sistemas', 'Técnico en sistemas');  

-- =========================
-- 4) PERIODO_ACADEMICO (>=3)
-- =========================
INSERT INTO periodo_academico (id, institucion_id, nombre, estado, fecha_inicio, fecha_fin)
VALUES
  (1, 1, '2025-I', 'EN_CURSO', '2025-02-01', '2025-06-30'),
  (2, 1, '2025-II', 'PLANIFICADO', '2025-08-01', '2025-12-20'),
  (3, 1, '2024-II', 'FINALIZADO', '2024-08-01', '2024-12-20');

-- =========================
-- 5) ASIGNATURA (>=3)
-- =========================
INSERT INTO asignatura (id, institucion_id, nombre, descripcion)
VALUES
  (1, 1, 'Matemáticas', 'Matemáticas básicas y aplicadas'),
  (2, 1, 'Ciencias', 'Ciencias naturales'),
  (3, 1, 'Historia', 'Historia y formación ciudadana');
  (4, 1, 'Programación I', 'Introducción a la programación (algoritmos y Python)'),
  (5, 1, 'Redes y Comunicaciones', 'Conceptos básicos de redes, topologías y TCP/IP'),
  (6, 1, 'Sistemas Operativos', 'Administración y conceptos de SO (Linux/Windows)'),
  (7, 1, 'Bases de Datos', 'Modelado, SQL y diseño de bases de datos');

-- =========================
-- 6) AULA (>=3)
-- =========================
INSERT INTO aula (id, institucion_id, nombre, capacidad, ubicacion)
VALUES
  (1, 1, 'A101', 30, 'Edificio A - Piso 1'),
  (2, 1, 'B202', 25, 'Edificio B - Piso 2'),
  (3, 1, 'C303', 20, 'Edificio C - Piso 3');

-- =========================
-- 7) USUARIO (>=9 para cubrir roles)
-- =========================
INSERT INTO usuario (id, institucion_id, nombre, apellido, email, password_hash, tipo_documento, documento, genero, fecha_nacimiento, telefono, direccion, rol, activo, email_verificado, created_at)
VALUES
  (1, 1, 'Carlos', 'Gómez', 'c.gomez@c-sanjose.edu.co', 'hash_prof_1', 'CC', '800111222', 'M', '1985-05-12', '+57 3001110001', 'Calle Maestro 1', 'PROFESOR', TRUE, TRUE, '2024-01-10 08:00:00'),
  (2, 1, 'Sofía', 'Martínez', 's.martinez@c-sanjose.edu.co', 'hash_est_1', 'CC', '100111222', 'F', '2012-03-22', '+57 3002220002', 'Calle Estudiante 2', 'ESTUDIANTE', TRUE, TRUE, '2024-02-15 09:00:00'),
  (3, 1, 'Luis', 'Martínez', 'l.martinez@c-sanjose.edu.co', 'hash_acu_1', 'CC', '700111222', 'M', '1980-11-20', '+57 3003330003', 'Calle Padre 3', 'ACUDIENTE', TRUE, TRUE, '2024-02-15 09:05:00'),
  (4, 1, 'Ana', 'López', 'a.lopez@c-sanjose.edu.co', 'hash_prof_2', 'CC', '800222333', 'F', '1990-08-02', '+57 3004440004', 'Calle Profesora 4', 'PROFESOR', TRUE, TRUE, '2024-03-01 10:00:00'),
  (5, 1, 'Diego', 'Pérez', 'd.perez@c-sanjose.edu.co', 'hash_est_2', 'CC', '102222333', 'M', '2011-06-30', '+57 3005550005', 'Calle Estudiante 5', 'ESTUDIANTE', TRUE, TRUE, '2024-03-05 11:00:00'),
  (6, 1, 'María', 'Pérez', 'm.perez@c-sanjose.edu.co', 'hash_acu_2', 'CC', '702222333', 'F', '1982-01-18', '+57 3006660006', 'Calle Madre 6', 'ACUDIENTE', TRUE, TRUE, '2024-03-05 11:05:00'),
  (7, 1, 'Admin', 'Principal', 'admin@c-sanjose.edu.co', 'hash_admin', 'CC', '900000001', 'O', '1975-09-01', '+57 3007770007', 'Oficina Principal', 'ADMIN', TRUE, TRUE, '2024-01-01 07:00:00'),
  (8, 1, 'Miguel', 'Rodríguez', 'm.rodriguez@c-sanjose.edu.co', 'hash_est_3', 'CC', '103333444', 'M', '2010-12-10', '+57 3008880008', 'Barrio 8', 'ESTUDIANTE', TRUE, TRUE, '2024-04-01 12:00:00'),
  (9, 1, 'Sandra', 'Rodríguez', 's.rodriguez@c-sanjose.edu.co', 'hash_acu_3', 'CC', '703333444', 'F', '1978-07-07', '+57 3009990009', 'Barrio 9', 'ACUDIENTE', TRUE, TRUE, '2024-04-01 12:05:00');
  (10, 1, 'José', 'Herrera', 'j.herrera@c-sanjose.edu.co', 'hash_prof_tech1', 'CC', '801010101', 'M', '1982-04-10', '+57 3101001010', 'Laboratorio 1', 'PROFESOR', TRUE, TRUE, '2024-06-01 08:00:00'),
  (11, 1, 'Laura', 'Ruiz', 'l.ruiz@c-sanjose.edu.co', 'hash_prof_tech2', 'CC', '801020202', 'F', '1987-09-21', '+57 3102002020', 'Laboratorio 2', 'PROFESOR', TRUE, TRUE, '2024-06-02 08:30:00');
  (12, 1, 'Andrés', 'Gómez', 'andres.gomez@c-sanjose.edu.co', 'hash_est_tech_1', 'CC', '110110110', 'M', '2006-02-14', '+57 3200000012', 'Barrio Tech 12', 'ESTUDIANTE', TRUE, TRUE, '2024-07-01 09:00:00'),
  (13, 1, 'Camila', 'Santos', 'camila.santos@c-sanjose.edu.co', 'hash_est_tech_2', 'CC', '110110111', 'F', '2006-05-20', '+57 3200000013', 'Barrio Tech 13', 'ESTUDIANTE', TRUE, TRUE, '2024-07-02 09:10:00'),
  (14, 1, 'Jhon', 'Velásquez', 'jhon.velasquez@c-sanjose.edu.co', 'hash_est_tech_3', 'CC', '110110112', 'M', '2005-11-03', '+57 3200000014', 'Barrio Tech 14', 'ESTUDIANTE', TRUE, TRUE, '2024-07-03 09:20:00'),
  (15, 1, 'Natalia', 'Rueda', 'natalia.rueda@c-sanjose.edu.co', 'hash_est_tech_4', 'CC', '110110113', 'F', '2006-08-11', '+57 3200000015', 'Barrio Tech 15', 'ESTUDIANTE', TRUE, TRUE, '2024-07-04 09:30:00');
  (16, 1, 'Rafael', 'Gómez', 'rafael.gomez@familias.edu.co', 'hash_acu_tech_1', 'CC', '720110110', 'M', '1978-01-05', '+57 3201000016', 'Calle Padre 16', 'ACUDIENTE', TRUE, TRUE, '2024-07-05 10:00:00'),
  (17, 1, 'Isabel', 'Santos', 'isabel.santos@familias.edu.co', 'hash_acu_tech_2', 'CC', '720110111', 'F', '1980-04-10', '+57 3201000017', 'Calle Madre 17', 'ACUDIENTE', TRUE, TRUE, '2024-07-05 10:05:00'),
  (18, 1, 'Marcos', 'Velasquez', 'marcos.velasquez@familias.edu.co', 'hash_acu_tech_3', 'CC', '720110112', 'M', '1975-09-09', '+57 3201000018', 'Calle Padre 18', 'ACUDIENTE', TRUE, TRUE, '2024-07-05 10:10:00'),
  (19, 1, 'Patricia', 'Rueda', 'patricia.rueda@familias.edu.co', 'hash_acu_tech_4', 'CC', '720110113', 'F', '1979-12-12', '+57 3201000019', 'Calle Madre 19', 'ACUDIENTE', TRUE, TRUE, '2024-07-05 10:15:00');

-- =========================
-- 8) GRUPO (>=3)
-- =========================
INSERT INTO grupo (id, institucion_id, grado_id, periodo_academico_id, nombre, descripcion)
VALUES
  (1, 1, 2, 1, '3A', 'Tercero - Grupo A'),
  (2, 1, 2, 1, '3B', 'Tercero - Grupo B'),
  (3, 1, 3, 1, '11A', 'Once - Grupo A');
  (4, 1, 4, 1, '541', 'Ficha 541');

-- =========================
-- 9) CLASE (>=3)
-- =========================
INSERT INTO clase (id, institucion_id, nombre, dia, hora_inicio, hora_fin, grupo_id, periodo_academico_id, aula_id, asignatura_id, profesor_id)
VALUES
  (1, 1, 'Matemáticas 3A - Lunes', 'Lunes', '08:00:00', '09:00:00', 1, 1, 1, 1, 1),
  (2, 1, 'Ciencias 3B - Martes', 'Martes', '09:00:00', '10:00:00', 2, 1, 2, 2, 4),
  (3, 1, 'Historia 11A - Miércoles', 'Miércoles', '10:00:00', '11:30:00', 3, 1, 3, 3, 1);
  (4, 1, 'Programación I - Técnico 541', 'Lunes', '13:00:00', '15:00:00', 4, 1, 2, 4, 10),
  (5, 1, 'Redes y Comunicaciones - Técnico 541', 'Martes', '13:00:00', '15:00:00', 4, 1, 2, 5, 11),
  (6, 1, 'Sistemas Operativos - Técnico 541', 'Miércoles', '13:00:00', '15:00:00', 4, 1, 3, 6, 10),
  (7, 1, 'Bases de Datos - Técnico 541', 'Jueves', '13:00:00', '15:00:00', 4, 1, 3, 7, 11);


-- =========================
-- 10) MATRICULA (>=3)
-- =========================
INSERT INTO matricula (id, institucion_id, estudiante_id, grado_id, grupo_id, periodo_academico_id, estado, fecha_matricula)
VALUES
  (1, 1, 2, 2, 1, 1, 'ACTIVA', '2025-02-01'),
  (2, 1, 5, 2, 2, 1, 'ACTIVA', '2025-02-02'),
  (3, 1, 8, 3, 3, 1, 'ACTIVA', '2025-02-03');
  (4, 1, 12, 4, 4, 1, 'ACTIVA', '2025-01-15'),
  (5, 1, 13, 4, 4, 1, 'ACTIVA', '2025-01-16'),
  (6, 1, 14, 4, 4, 1, 'ACTIVA', '2025-01-17'),
  (7, 1, 15, 4, 4, 1, 'ACTIVA', '2025-01-18');

-- =========================
-- 11) ESTUDIANTE_ACUDIENTE (>=3)
-- =========================
INSERT INTO estudiante_acudiente (id, institucion_id, estudiante_id, acudiente_id, parentesco)
VALUES
  (1, 1, 2, 3, 'MADRE'),
  (2, 1, 5, 6, 'MADRE'),
  (3, 1, 8, 9, 'PADRE');
  (4, 1, 12, 16, 'PADRE'),
  (5, 1, 13, 17, 'MADRE'),
  (6, 1, 14, 18, 'PADRE'),
  (7, 1, 15, 19, 'MADRE');


-- =========================
-- 12) ACTIVIDAD (>=3)
-- =========================
INSERT INTO actividad (id, institucion_id, titulo, descripcion, fecha_entrega, clase_id, estado, categoria)
VALUES
  (1, 1, 'Tarea suma', 'Practicar sumas básicas', '2025-05-10 23:59:00', 1, 'PUBLICADA', 'TAREA'),
  (2, 1, 'Laboratorio plantas', 'Informe de laboratorio', '2025-05-15 17:00:00', 2, 'PUBLICADA', 'PROYECTO'),
  (3, 1, 'Ensayo histórico', 'Ensayo sobre independencia', '2025-05-20 12:00:00', 3, 'PUBLICADA', 'EXAMEN');
  (4, 1, 'Proyecto: Calculadora en Python', 'Desarrollar una calculadora con interfaz simple', '2025-05-30 23:59:00', 4, 'PUBLICADA', 'PROYECTO'),
  (5, 1, 'Informe: Topologías de red', 'Documento explicativo y diagrama', '2025-05-25 23:59:00', 5, 'PUBLICADA', 'TAREA'),
  (6, 1, 'Laboratorio: Instalación Linux', 'Instalación y configuración básica', '2025-06-05 23:59:00', 6, 'PUBLICADA', 'PROYECTO'),
  (7, 1, 'SQL: Normalización y consultas', 'Ejercicios de modelado y queries', '2025-06-10 23:59:00', 7, 'PUBLICADA', 'EXAMEN');


-- =========================
-- 13) EVIDENCIA_ACTIVIDAD (>=3)
-- =========================
INSERT INTO evidencia_actividad (id, institucion_id, actividad_id, estudiante_id, descripcion, fecha_subida, calificacion)
VALUES
  (1, 1, 1, 2, 'Archivo PDF con ejercicios', '2025-05-09 14:00:00', 95.00),
  (2, 1, 2, 5, 'Fotos del experimento', '2025-05-14 11:00:00', 88.50),
  (3, 1, 3, 8, 'Ensayo en Word', '2025-05-19 09:30:00', 76.00);
  (4, 1, 4, 12, 'Código completo y README', '2025-05-28 16:00:00', 90.00),
  (5, 1, 4, 13, 'Codigo y video demo', '2025-05-29 10:00:00', 88.00),
  (6, 1, 5, 14, 'Informe con diagrama PDF', '2025-05-24 12:00:00', 92.50),
  (7, 1, 6, 15, 'Capturas y configuración', '2025-06-04 09:00:00', 85.00);


-- =========================
-- 14) ASISTENCIA (>=3)
-- =========================
INSERT INTO asistencia (id, institucion_id, clase_id, estudiante_id, fecha, estado, observacion)
VALUES
  (1, 1, 1, 2, '2025-03-03', 'PRESENTE', NULL),
  (2, 1, 2, 5, '2025-03-04', 'TARDE', 'Llegó 10 minutos tarde'),
  (3, 1, 3, 8, '2025-03-05', 'AUSENTE', 'Enfermo');
  (4, 1, 4, 12, '2025-03-10', 'PRESENTE', NULL),
  (5, 1, 5, 13, '2025-03-11', 'PRESENTE', NULL),
  (6, 1, 6, 14, '2025-03-12', 'TARDE', 'Problema transporte'),
  (7, 1, 7, 15, '2025-03-13', 'PRESENTE', NULL);


-- =========================
-- 15) ARCHIVO_DIGITAL (>=3)
-- =========================
INSERT INTO archivo_digital (id, institucion_id, nombre, url, tipo, extension, propietario_id)
VALUES
  (1, 1, 'Rutina_mate.pdf', '/files/rutina_mate.pdf', 'DOCUMENTO', 'pdf', 1),
  (2, 1, 'Fotos_laboratorio.zip', '/files/fotos_lab.zip', 'DOCUMENTO', 'zip', 4),
  (3, 1, 'Horario_2025.png', '/files/horario_2025.png', 'IMAGEN', 'png', 7);
  (4, 1, 'Proyecto_Calculadora_Andres.zip', '/files/proy_calc_andres.zip', 'DOCUMENTO', 'zip', 12),
  (5, 1, 'Informe_Redes_Camila.pdf', '/files/informe_redes_camila.pdf', 'DOCUMENTO', 'pdf', 13),
  (6, 1, 'InstalacionLinux_Natalia.docx', '/files/inst_linux_natalia.docx', 'DOCUMENTO', 'docx', 15);


-- =========================
-- 16) PONDERACION_EVALUACION (>=3, suma por clase = 100)
-- =========================
INSERT INTO ponderacion_evaluacion (id, institucion_id, clase_id, categoria, porcentaje)
VALUES
  (1, 1, 1, 'TAREA', 40.00),
  (2, 1, 1, 'EXAMEN', 50.00),
  (3, 1, 1, 'PROYECTO', 10.00);
  (4, 1, 4, 'TAREA', 40.00),
  (5, 1, 4, 'PROYECTO', 50.00),
  (6, 1, 4, 'EXAMEN', 10.00);
  (7, 1, 5, 'TAREA', 30.00),
  (8, 1, 5, 'PROYECTO', 40.00),
  (9, 1, 5, 'EXAMEN', 30.00);
  (10, 1, 6, 'TAREA', 20.00),
  (11, 1, 6, 'PROYECTO', 60.00),
  (12, 1, 6, 'EXAMEN', 20.00);
  (13, 1, 7, 'TAREA', 30.00),
  (14, 1, 7, 'EXAMEN', 50.00),
  (15, 1, 7, 'PROYECTO', 20.00);

-- =========================
-- 17) CALIFICACION_PERIODO (>=3)
-- =========================
INSERT INTO calificacion_periodo (id, institucion_id, estudiante_id, asignatura_id, periodo_academico_id, nota_final, observaciones)
VALUES
  (1, 1, 2, 1, 1, 92.50, 'Buen desempeño'),
  (2, 1, 5, 2, 1, 85.00, 'Necesita mejorar prácticas'),
  (3, 1, 8, 3, 1, 78.00, 'Aceptable');
  (4, 1, 12, 4, 1, 89.50, 'Buen proyecto y participación'),
  (5, 1, 13, 5, 1, 91.00, 'Excelente informe de redes'),
  (6, 1, 14, 6, 1, 78.00, 'Debe reforzar prácticas'),
  (7, 1, 15, 7, 1, 86.75, 'Buen manejo de SQL');

-- =========================
-- 18) CONCEPTO_FACTURACION (>=3)
-- =========================
INSERT INTO concepto_facturacion (id, institucion_id, nombre, descripcion, costo_base, activo)
VALUES
  (1, 1, 'Matrícula', 'Pago de matrícula anual', 200000.00, TRUE),
  (2, 1, 'Pensión mensual', 'Valor mensual de pensión', 150000.00, TRUE),
  (3, 1, 'Seguro estudiantil', 'Seguro contra accidentes', 25000.00, TRUE);

-- =========================
-- 19) FACTURA (>=3)
-- =========================
INSERT INTO factura (id, institucion_id, acudiente_id, fecha_emision, fecha_vencimiento, total, estado)
VALUES
  (1, 1, 3, '2025-02-10', '2025-03-10', 350000.00, 'PENDIENTE'),
  (2, 1, 6, '2025-02-15', '2025-03-15', 175000.00, 'PENDIENTE'),
  (3, 1, 9, '2024-09-01', '2024-10-01', 175000.00, 'PENDIENTE');

-- =========================
-- 20) DETALLE_FACTURA (>=3)
-- =========================
INSERT INTO detalle_factura (id, institucion_id, factura_id, concepto_facturacion_id, descripcion_adicional, cantidad, precio_unitario, monto)
VALUES
  (1, 1, 1, 1, 'Matrícula 2025', 1.00, 200000.00, 200000.00),
  (2, 1, 1, 2, 'Pensión Febrero 2025', 1.00, 150000.00, 150000.00),
  (3, 1, 2, 2, 'Pensión Febrero 2025', 1.00, 150000.00, 150000.00);

-- =========================
-- 21) PAGO (>=3)
-- =========================
-- Nota: el trigger trg_pago_actualiza_factura actualiza saldo_cache y estado tras cada INSERT
INSERT INTO pago (id, institucion_id, factura_id, monto, fecha_pago, metodo, referencia)
VALUES
  (1, 1, 1, 150000.00, '2025-02-20 10:00:00', 'TRANSFERENCIA', 'TRX12345'),
  (2, 1, 2, 175000.00, '2025-03-01 15:30:00', 'PSE', 'PSE67890'),
  (3, 1, 1, 200000.00, '2025-03-05 09:00:00', 'EFECTIVO', 'EFT-0001');

-- =========================
-- 22) CALENDARIO_EVENTO (>=3)
-- =========================
INSERT INTO calendario_evento (id, institucion_id, titulo, descripcion, fecha_inicio, fecha_fin, tipo)
VALUES
  (1, 1, 'Reunión de padres', 'Reunión trimestral de padres de familia', '2025-03-10 17:00:00', '2025-03-10 19:00:00', 'REUNION'),
  (2, 1, 'Día escolar - Feriado local', 'Feriado por celebración municipal', '2025-05-01 00:00:00', '2025-05-01 23:59:59', 'FERIADO'),
  (3, 1, 'Feria de ciencias', 'Muestra de proyectos de ciencias', '2025-06-05 08:00:00', '2025-06-05 12:00:00', 'ACADEMICO');

-- =========================
-- 23) CONVERSACION, USUARIO_CONVERSACION, MENSAJE
-- =========================
INSERT INTO conversacion (id, institucion_id, estado)
VALUES
  (1, 1, 'ACTIVA');

INSERT INTO usuario_conversacion (id, institucion_id, conversacion_id, usuario_id, last_read_at)
VALUES
  (1, 1, 1, 1, NULL),
  (2, 1, 1, 2, NULL),
  (3, 1, 1, 3, NULL);

INSERT INTO mensaje (id, institucion_id, conversacion_id, usuario_id_remitente, contenido, fecha_envio)
VALUES
  (1, 1, 1, 1, 'Recordatorio: tarea para el lunes.', '2025-03-01 08:30:00'),
  (2, 1, 1, 2, 'Gracias profe, ya la vi.', '2025-03-01 09:00:00'),
  (3, 1, 1, 3, '¿A qué hora es la reunión?', '2025-03-01 09:05:00');

-- =========================
-- 24) FORO y COMENTARIO_FORO (>=3)
-- =========================
INSERT INTO foro (id, institucion_id, titulo, descripcion, usuario_id_autor)
VALUES
  (1, 1, 'Dudas matemáticas 3A', 'Foro para preguntas de matemáticas', 1);

INSERT INTO comentario_foro (id, institucion_id, foro_id, usuario_id_autor, contenido, parent_id)
VALUES
  (1, 1, 1, 2, '¿Cómo se resuelve el ejercicio 4?', NULL),
  (2, 1, 1, 1, 'Mira este paso a paso: ...', 1),
  (3, 1, 1, 3, 'Muchas gracias profe.', 2);

-- =========================
-- 25) NOTIFICACION (>=3)
-- =========================
INSERT INTO notificacion (id, institucion_id, usuario_id, titulo, mensaje, canal, prioridad, estado, url_destino)
VALUES
  (1, 1, 2, 'Nueva tarea disponible', 'Se ha publicado una nueva tarea en Matemáticas.', 'APP', 'MEDIA', 'NO_LEIDA', '/actividades/1'),
  (2, 1, 3, 'Factura pendiente', 'Tiene una factura pendiente con vencimiento próximo.', 'EMAIL', 'ALTA', 'NO_LEIDA', '/facturas/1'),
  (3, 1, 7, 'Backup programado', 'Se realizará mantenimiento el sábado.', 'APP', 'BAJA', 'NO_LEIDA', NULL);

/*
FIN DEL SCRIPT DE POBLACIÓN.
- Se han incluido al menos 3 filas en cada tabla relevante.
- Si desea ampliar datos para más instituciones, otros grados o periodos, puedo generar
  un script extendido (por ejemplo 50-100 filas) con variaciones realistas.
- Si su entorno SQL aplica restricciones a la inserción de IDs explícitos en tablas
  con AUTO_INCREMENT, quite explicit id fields y deje que MySQL asigne los IDs,
  adaptando los valores FK en consecuencia (o ejecute SELECT LAST_INSERT_ID() entre
  bloques).
*/