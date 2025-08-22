-- Edunekta v2.0 (simplificada para equipos novatos)
-- Motor: MySQL 8.x, InnoDB, utf8mb4_0900_ai_ci

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET sql_mode = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE DATABASE IF NOT EXISTS edunekta3
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;
USE edunekta3;

-- =========================
-- 1) ENTIDADES CENTRALES
-- =========================

CREATE TABLE institucion (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  nit VARCHAR(20) UNIQUE,
  correo VARCHAR(150),
  telefono VARCHAR(30),
  direccion TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_institucion_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE usuario (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NULL,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  tipo_documento ENUM('CC','TI','CE','PP') NULL,
  documento VARCHAR(30) NULL,
  genero ENUM('M','F','O') NULL,
  fecha_nacimiento DATE NULL,
  telefono VARCHAR(20) NULL,
  direccion VARCHAR(200) NULL,
  rol ENUM('ESTUDIANTE','PROFESOR','ACUDIENTE','ADMIN') NOT NULL,
  foto_perfil VARCHAR(255) NULL,
  ultimo_acceso DATETIME NULL,
  activo BOOLEAN DEFAULT TRUE,
  email_verificado BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_usuario_institucion_email (institucion_id, email),
  KEY idx_usuario_institucion (institucion_id),
  CONSTRAINT fk_usuario_institucion FOREIGN KEY (institucion_id) REFERENCES institucion(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE estudiante_acudiente (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NOT NULL,
  estudiante_id INT NOT NULL,
  acudiente_id INT NOT NULL,
  parentesco ENUM('PADRE','MADRE','TUTOR','OTRO') NOT NULL,
  UNIQUE KEY uq_est_acud (institucion_id, estudiante_id, acudiente_id),
  CONSTRAINT fk_estacud_inst FOREIGN KEY (institucion_id) REFERENCES institucion(id),
  CONSTRAINT fk_estacud_est FOREIGN KEY (estudiante_id) REFERENCES usuario(id),
  CONSTRAINT fk_estacud_acu FOREIGN KEY (acudiente_id) REFERENCES usuario(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- =========================
-- 2) ESTRUCTURA ACADÉMICA
-- =========================

CREATE TABLE nivel_academico (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  UNIQUE KEY uq_nivel_nombre (institucion_id, nombre),
  CONSTRAINT fk_nivel_inst FOREIGN KEY (institucion_id) REFERENCES institucion(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE grado (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NOT NULL,
  nivel_academico_id INT NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  UNIQUE KEY uq_grado_nombre (institucion_id, nombre),
  CONSTRAINT fk_grado_inst FOREIGN KEY (institucion_id) REFERENCES institucion(id),
  CONSTRAINT fk_grado_nivel FOREIGN KEY (nivel_academico_id) REFERENCES nivel_academico(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE periodo_academico (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  estado ENUM('PLANIFICADO','EN_CURSO','FINALIZADO','ARCHIVADO') NOT NULL DEFAULT 'PLANIFICADO',
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  UNIQUE KEY uq_periodo_nombre (institucion_id, nombre),
  CONSTRAINT fk_periodo_inst FOREIGN KEY (institucion_id) REFERENCES institucion(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE grupo (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NOT NULL,
  grado_id INT NOT NULL,
  periodo_academico_id INT NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  descripcion TEXT,
  UNIQUE KEY uq_grupo (institucion_id, grado_id, periodo_academico_id, nombre),
  CONSTRAINT fk_grupo_inst FOREIGN KEY (institucion_id) REFERENCES institucion(id),
  CONSTRAINT fk_grupo_grado FOREIGN KEY (grado_id) REFERENCES grado(id),
  CONSTRAINT fk_grupo_periodo FOREIGN KEY (periodo_academico_id) REFERENCES periodo_academico(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE asignatura (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NOT NULL,
  nombre VARCHAR(150) NOT NULL,
  descripcion TEXT,
  UNIQUE KEY uq_asignatura_nombre (institucion_id, nombre),
  CONSTRAINT fk_asignatura_inst FOREIGN KEY (institucion_id) REFERENCES institucion(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE aula (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  capacidad INT,
  ubicacion TEXT,
  UNIQUE KEY uq_aula_nombre (institucion_id, nombre),
  CONSTRAINT fk_aula_inst FOREIGN KEY (institucion_id) REFERENCES institucion(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE clase (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NOT NULL,
  nombre VARCHAR(200),
  dia ENUM('Lunes','Martes','Miércoles','Jueves','Viernes','Sábado') NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  grupo_id INT NOT NULL,
  periodo_academico_id INT NOT NULL,
  aula_id INT NOT NULL,
  asignatura_id INT NOT NULL,
  profesor_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_clase_grupo (institucion_id, periodo_academico_id, grupo_id, dia, hora_inicio),
  KEY idx_clase_profesor (institucion_id, periodo_academico_id, profesor_id, dia, hora_inicio),
  CONSTRAINT fk_clase_inst FOREIGN KEY (institucion_id) REFERENCES institucion(id),
  CONSTRAINT fk_clase_grupo FOREIGN KEY (grupo_id) REFERENCES grupo(id),
  CONSTRAINT fk_clase_periodo FOREIGN KEY (periodo_academico_id) REFERENCES periodo_academico(id),
  CONSTRAINT fk_clase_aula FOREIGN KEY (aula_id) REFERENCES aula(id),
  CONSTRAINT fk_clase_asign FOREIGN KEY (asignatura_id) REFERENCES asignatura(id),
  CONSTRAINT fk_clase_prof FOREIGN KEY (profesor_id) REFERENCES usuario(id),
  CHECK (hora_inicio < hora_fin)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE matricula (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NOT NULL,
  estudiante_id INT NOT NULL,
  grado_id INT NOT NULL,
  grupo_id INT NOT NULL,
  periodo_academico_id INT NOT NULL,
  estado ENUM('ACTIVA','RETIRADO','FINALIZADA','PENDIENTE') NOT NULL DEFAULT 'ACTIVA',
  fecha_matricula DATE NOT NULL,
  UNIQUE KEY uq_matricula_est_per (institucion_id, estudiante_id, periodo_academico_id),
  CONSTRAINT fk_matricula_inst FOREIGN KEY (institucion_id) REFERENCES institucion(id),
  CONSTRAINT fk_matricula_est FOREIGN KEY (estudiante_id) REFERENCES usuario(id),
  CONSTRAINT fk_matricula_grado FOREIGN KEY (grado_id) REFERENCES grado(id),
  CONSTRAINT fk_matricula_grupo FOREIGN KEY (grupo_id) REFERENCES grupo(id),
  CONSTRAINT fk_matricula_periodo FOREIGN KEY (periodo_academico_id) REFERENCES periodo_academico(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- =========================================
-- 3) ACTIVIDADES, EVIDENCIAS, ASISTENCIA
-- =========================================

CREATE TABLE actividad (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  fecha_entrega DATETIME,
  clase_id INT NOT NULL,
  estado ENUM('PUBLICADA','CERRADA','CALIFICADA') NOT NULL DEFAULT 'PUBLICADA',
  categoria ENUM('TAREA','EXAMEN','PROYECTO','PARTICIPACION') NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_actividad_inst FOREIGN KEY (institucion_id) REFERENCES institucion(id),
  CONSTRAINT fk_actividad_clase FOREIGN KEY (clase_id) REFERENCES clase(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE evidencia_actividad (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NOT NULL,
  actividad_id INT NOT NULL,
  estudiante_id INT NOT NULL,
  descripcion TEXT,
  fecha_subida DATETIME DEFAULT CURRENT_TIMESTAMP,
  calificacion DECIMAL(5,2),
  UNIQUE KEY uq_evidencia (institucion_id, actividad_id, estudiante_id),
  CONSTRAINT fk_evidencia_inst FOREIGN KEY (institucion_id) REFERENCES institucion(id),
  CONSTRAINT fk_evidencia_actividad FOREIGN KEY (actividad_id) REFERENCES actividad(id),
  CONSTRAINT fk_evidencia_est FOREIGN KEY (estudiante_id) REFERENCES usuario(id),
  CHECK (calificacion IS NULL OR (calificacion >= 0 AND calificacion <= 100))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE asistencia (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NOT NULL,
  clase_id INT NOT NULL,
  estudiante_id INT NOT NULL,
  fecha DATE NOT NULL,
  estado ENUM('PRESENTE','AUSENTE','TARDE','JUSTIFICADA') NOT NULL,
  observacion VARCHAR(255),
  UNIQUE KEY uq_asistencia (institucion_id, clase_id, estudiante_id, fecha),
  CONSTRAINT fk_asistencia_inst FOREIGN KEY (institucion_id) REFERENCES institucion(id),
  CONSTRAINT fk_asistencia_clase FOREIGN KEY (clase_id) REFERENCES clase(id),
  CONSTRAINT fk_asistencia_est FOREIGN KEY (estudiante_id) REFERENCES usuario(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE archivo_digital (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  tipo ENUM('DOCUMENTO','IMAGEN','VIDEO','AUDIO') NOT NULL,
  extension VARCHAR(10),
  propietario_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_archivo_inst FOREIGN KEY (institucion_id) REFERENCES institucion(id),
  CONSTRAINT fk_archivo_prop FOREIGN KEY (propietario_id) REFERENCES usuario(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- =========================
-- 4) EVALUACIONES Y NOTAS
-- =========================

CREATE TABLE ponderacion_evaluacion (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NOT NULL,
  clase_id INT NOT NULL,
  categoria ENUM('TAREA','EXAMEN','PROYECTO','PARTICIPACION') NOT NULL,
  porcentaje DECIMAL(5,2) NOT NULL,
  UNIQUE KEY uq_pond_cat (institucion_id, clase_id, categoria),
  CONSTRAINT fk_pond_inst FOREIGN KEY (institucion_id) REFERENCES institucion(id),
  CONSTRAINT fk_pond_clase FOREIGN KEY (clase_id) REFERENCES clase(id),
  CHECK (porcentaje >= 0 AND porcentaje <= 100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE calificacion_periodo (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NOT NULL,
  estudiante_id INT NOT NULL,
  asignatura_id INT NOT NULL,
  periodo_academico_id INT NOT NULL,
  nota_final DECIMAL(5,2) NOT NULL,
  observaciones TEXT,
  UNIQUE KEY uq_calif (institucion_id, estudiante_id, asignatura_id, periodo_academico_id),
  CONSTRAINT fk_calif_inst FOREIGN KEY (institucion_id) REFERENCES institucion(id),
  CONSTRAINT fk_calif_est FOREIGN KEY (estudiante_id) REFERENCES usuario(id),
  CONSTRAINT fk_calif_asig FOREIGN KEY (asignatura_id) REFERENCES asignatura(id),
  CONSTRAINT fk_calif_periodo FOREIGN KEY (periodo_academico_id) REFERENCES periodo_academico(id),
  CHECK (nota_final >= 0 AND nota_final <= 100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- =========================
-- 5) MÓDULO FINANCIERO
-- =========================

CREATE TABLE concepto_facturacion (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  costo_base DECIMAL(12,2) NOT NULL,
  activo BOOLEAN DEFAULT TRUE,
  UNIQUE KEY uq_concepto_nombre (institucion_id, nombre),
  CONSTRAINT fk_concepto_inst FOREIGN KEY (institucion_id) REFERENCES institucion(id),
  CHECK (costo_base >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE factura (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NOT NULL,
  acudiente_id INT NOT NULL,
  fecha_emision DATE NOT NULL,
  fecha_vencimiento DATE NOT NULL,
  total DECIMAL(12,2) NOT NULL,
  estado ENUM('PENDIENTE','PARCIAL','PAGADA','VENCIDA','ANULADA') NOT NULL DEFAULT 'PENDIENTE',
  saldo_cache DECIMAL(13,2) NOT NULL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_factura_inst FOREIGN KEY (institucion_id) REFERENCES institucion(id),
  CONSTRAINT fk_factura_acud FOREIGN KEY (acudiente_id) REFERENCES usuario(id),
  CHECK (total >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE detalle_factura (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NOT NULL,
  factura_id INT NOT NULL,
  concepto_facturacion_id INT NOT NULL,
  descripcion_adicional VARCHAR(255),
  cantidad DECIMAL(10,2) NOT NULL DEFAULT 1.00,
  precio_unitario DECIMAL(12,2) NOT NULL,
  monto DECIMAL(12,2) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  KEY idx_detalle_factura (institucion_id, factura_id),
  CONSTRAINT fk_detalle_inst FOREIGN KEY (institucion_id) REFERENCES institucion(id),
  CONSTRAINT fk_detalle_factura FOREIGN KEY (factura_id) REFERENCES factura(id),
  CONSTRAINT fk_detalle_concepto FOREIGN KEY (concepto_facturacion_id) REFERENCES concepto_facturacion(id),
  CHECK (cantidad >= 0),
  CHECK (precio_unitario >= 0),
  CHECK (monto >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE pago (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NOT NULL,
  factura_id INT NOT NULL,
  monto DECIMAL(12,2) NOT NULL,
  fecha_pago DATETIME NOT NULL,
  metodo ENUM('EFECTIVO','TRANSFERENCIA','TARJETA','PSE') NOT NULL,
  referencia VARCHAR(100),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  KEY idx_pago_factura (institucion_id, factura_id, fecha_pago),
  CONSTRAINT fk_pago_inst FOREIGN KEY (institucion_id) REFERENCES institucion(id),
  CONSTRAINT fk_pago_factura FOREIGN KEY (factura_id) REFERENCES factura(id),
  CHECK (monto <> 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- =========================
-- 6) CALENDARIO Y MENSAJERÍA
-- =========================

CREATE TABLE calendario_evento (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  fecha_inicio DATETIME NOT NULL,
  fecha_fin DATETIME NOT NULL,
  tipo ENUM('FERIADO','REUNION','ACADEMICO','CIVICO') NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  KEY idx_calendario_rango (institucion_id, fecha_inicio, fecha_fin),
  CONSTRAINT fk_calendario_inst FOREIGN KEY (institucion_id) REFERENCES institucion(id),
  CHECK (fecha_inicio <= fecha_fin)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE conversacion (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NOT NULL,
  estado ENUM('ACTIVA','ARCHIVADA') NOT NULL DEFAULT 'ACTIVA',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_conv_inst FOREIGN KEY (institucion_id) REFERENCES institucion(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE usuario_conversacion (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NOT NULL,
  conversacion_id INT NOT NULL,
  usuario_id INT NOT NULL,
  last_read_at DATETIME NULL,
  UNIQUE KEY uq_usr_conv (institucion_id, conversacion_id, usuario_id),
  CONSTRAINT fk_usrconv_inst FOREIGN KEY (institucion_id) REFERENCES institucion(id),
  CONSTRAINT fk_usrconv_conv FOREIGN KEY (conversacion_id) REFERENCES conversacion(id),
  CONSTRAINT fk_usrconv_usr FOREIGN KEY (usuario_id) REFERENCES usuario(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE mensaje (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NOT NULL,
  conversacion_id INT NOT NULL,
  usuario_id_remitente INT NOT NULL,
  contenido TEXT NOT NULL,
  fecha_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
  KEY idx_mensaje_conv (institucion_id, conversacion_id, fecha_envio),
  CONSTRAINT fk_msg_inst FOREIGN KEY (institucion_id) REFERENCES institucion(id),
  CONSTRAINT fk_msg_conv FOREIGN KEY (conversacion_id) REFERENCES conversacion(id),
  CONSTRAINT fk_msg_usr FOREIGN KEY (usuario_id_remitente) REFERENCES usuario(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE foro (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  usuario_id_autor INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_foro_inst FOREIGN KEY (institucion_id) REFERENCES institucion(id),
  CONSTRAINT fk_foro_autor FOREIGN KEY (usuario_id_autor) REFERENCES usuario(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE comentario_foro (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NOT NULL,
  foro_id INT NOT NULL,
  usuario_id_autor INT NOT NULL,
  contenido TEXT NOT NULL,
  parent_id INT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  KEY idx_comentario_foro (foro_id, created_at),
  CONSTRAINT fk_cforo_inst FOREIGN KEY (institucion_id) REFERENCES institucion(id),
  CONSTRAINT fk_cforo_foro FOREIGN KEY (foro_id) REFERENCES foro(id),
  CONSTRAINT fk_cforo_autor FOREIGN KEY (usuario_id_autor) REFERENCES usuario(id),
  CONSTRAINT fk_cforo_parent FOREIGN KEY (parent_id) REFERENCES comentario_foro(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE notificacion (
  id INT PRIMARY KEY AUTO_INCREMENT,
  institucion_id INT NOT NULL,
  usuario_id INT NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  mensaje TEXT NOT NULL,
  canal ENUM('APP','EMAIL','SMS') NOT NULL DEFAULT 'APP',
  prioridad ENUM('BAJA','MEDIA','ALTA') NOT NULL DEFAULT 'MEDIA',
  estado ENUM('NO_LEIDA','LEIDA') NOT NULL DEFAULT 'NO_LEIDA',
  url_destino TEXT,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_notif_inst FOREIGN KEY (institucion_id) REFERENCES institucion(id),
  CONSTRAINT fk_notif_usr FOREIGN KEY (usuario_id) REFERENCES usuario(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- =========================
-- 7) TRIGGERS (MÍNIMOS)
-- =========================

-- A) Ponderaciones deben sumar 100% por clase (en inserts)
DELIMITER //
CREATE TRIGGER trg_ponderacion_check
BEFORE INSERT ON ponderacion_evaluacion
FOR EACH ROW
BEGIN
  DECLARE v_sum DECIMAL(6,2);
  SELECT COALESCE(SUM(porcentaje),0) INTO v_sum
  FROM ponderacion_evaluacion
  WHERE institucion_id = NEW.institucion_id
    AND clase_id = NEW.clase_id;
  IF v_sum + NEW.porcentaje > 100.00 + 0.001 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La suma de ponderaciones supera 100%';
  END IF;
END//
DELIMITER ;

-- B) Inicializar saldo de factura = total al crear (práctico para consultas)
DELIMITER //
CREATE TRIGGER trg_factura_init_saldo
BEFORE INSERT ON factura
FOR EACH ROW
BEGIN
  SET NEW.saldo_cache = NEW.total;
END//
DELIMITER ;

-- C) Al registrar un pago, recalcular saldo y estado de la factura
DELIMITER //
CREATE TRIGGER trg_pago_actualiza_factura
AFTER INSERT ON pago
FOR EACH ROW
BEGIN
  -- Recalcular saldo: saldo = total - sum(pagos)
  UPDATE factura f
  SET f.saldo_cache = GREATEST(0, f.total - (
      SELECT COALESCE(SUM(p.monto),0)
      FROM pago p
      WHERE p.factura_id = f.id
    ))
  WHERE f.id = NEW.factura_id;

  -- Actualizar estado según saldo y vencimiento
  UPDATE factura f
  SET f.estado = CASE
      WHEN f.saldo_cache = 0 THEN 'PAGADA'
      WHEN f.saldo_cache < f.total AND CURDATE() <= f.fecha_vencimiento THEN 'PARCIAL'
      WHEN CURDATE() > f.fecha_vencimiento AND f.saldo_cache > 0 THEN 'VENCIDA'
      ELSE 'PENDIENTE'
    END
  WHERE f.id = NEW.factura_id;
END//
DELIMITER ;

-- =========================
-- 8) VISTAS (opcionales y simples)
-- =========================

-- Vista de horario completo por clase (útil para UI de calendario/horario)
CREATE OR REPLACE VIEW vista_horario_completo AS
SELECT
  c.id AS clase_id,
  c.institucion_id,
  i.nombre AS institucion_nombre,
  p.id AS periodo_id,
  p.nombre AS periodo_nombre,
  g.id AS grupo_id,
  g.nombre AS grupo_nombre,
  gr.id AS grado_id,
  gr.nombre AS grado_nombre,
  a.id AS asignatura_id,
  a.nombre AS asignatura_nombre,
  u.id AS profesor_id,
  CONCAT(u.nombre, ' ', u.apellido) AS profesor_nombre,
  au.id AS aula_id,
  au.nombre AS aula_nombre,
  c.dia,
  c.hora_inicio,
  c.hora_fin
FROM clase c
JOIN institucion i          ON i.id = c.institucion_id
JOIN periodo_academico p    ON p.id = c.periodo_academico_id
JOIN grupo g                ON g.id = c.grupo_id
JOIN grado gr               ON gr.id = g.grado_id
JOIN asignatura a           ON a.id = c.asignatura_id
JOIN aula au                ON au.id = c.aula_id
JOIN usuario u              ON u.id = c.profesor_id;

-- Vista de estado financiero por acudiente (sumas simples por institución y acudiente)
CREATE OR REPLACE VIEW vista_estado_financiero_acudiente AS
SELECT
  f.institucion_id,
  f.acudiente_id,
  ua.nombre AS acudiente_nombre,
  ua.apellido AS acudiente_apellido,
  ua.email AS acudiente_email,
  SUM(CASE WHEN f.estado <> 'ANULADA' THEN 1 ELSE 0 END) AS cantidad_facturas,
  ROUND(SUM(CASE WHEN f.estado <> 'ANULADA' THEN f.total ELSE 0 END), 2) AS total_facturado,
  ROUND(COALESCE(SUM(CASE WHEN f.estado <> 'ANULADA' THEN p.monto ELSE 0 END), 0), 2) AS total_pagado,
  ROUND(SUM(CASE WHEN f.estado <> 'ANULADA' THEN f.saldo_cache ELSE 0 END), 2) AS saldo
FROM factura f
JOIN usuario ua ON ua.id = f.acudiente_id
LEFT JOIN pago p ON p.factura_id = f.id
GROUP BY
  f.institucion_id,
  f.acudiente_id,
  ua.nombre,
  ua.apellido,
  ua.email;

-- Objetivo: ver cuántos estudiantes están matriculados por periodo, por grado y por grupo — base para capacidad y planificación.
CREATE OR REPLACE VIEW vista_matriculas_por_periodo AS
SELECT
  p.id AS periodo_id,
  p.nombre AS periodo_nombre,
  g.id AS grado_id,
  g.nombre AS grado_nombre,
  gr.id AS grupo_id,
  gr.nombre AS grupo_nombre,
  COUNT(m.id) AS total_matriculas
FROM periodo_academico p
JOIN grupo gr ON gr.periodo_academico_id = p.id
JOIN grado g ON g.id = gr.grado_id
LEFT JOIN matricula m
  ON m.periodo_academico_id = p.id
  AND m.grupo_id = gr.id
GROUP BY p.id, p.nombre, g.id, g.nombre, gr.id, gr.nombre;

-- Objetivo: indicadores de asistencia por estudiante y por clase (presentes, ausentes, tardes, justificadas). Útil para detectar problemas de retención temprana.
CREATE OR REPLACE VIEW vista_asistencia_resumen AS
SELECT
  a.institucion_id,
  a.clase_id,
  c.nombre AS clase_nombre,
  a.estudiante_id,
  CONCAT(u.nombre, ' ', u.apellido) AS estudiante_nombre,
  SUM(a.estado = 'PRESENTE') AS cnt_presente,
  SUM(a.estado = 'AUSENTE') AS cnt_ausente,
  SUM(a.estado = 'TARDE') AS cnt_tarde,
  SUM(a.estado = 'JUSTIFICADA') AS cnt_justificada,
  COUNT(*) AS total_registros,
  ROUND(100 * SUM(a.estado = 'PRESENTE') / GREATEST(COUNT(*),1),2) AS pct_presente
FROM asistencia a
JOIN usuario u ON u.id = a.estudiante_id
LEFT JOIN clase c ON c.id = a.clase_id
GROUP BY a.institucion_id, a.clase_id, a.estudiante_id, c.nombre;

-- Objetivo: ver la distribución de notas por rangos (buckets) por asignatura — para analizar si una materia es “dura” o “fácil”.
CREATE OR REPLACE VIEW vista_distribucion_notas_por_asignatura AS
SELECT
  cp.asignatura_id,
  a.nombre AS asignatura_nombre,
  CASE
    WHEN cp.nota_final >= 90 THEN '90-100'
    WHEN cp.nota_final >= 80 THEN '80-89'
    WHEN cp.nota_final >= 70 THEN '70-79'
    WHEN cp.nota_final >= 60 THEN '60-69'
    ELSE '0-59'
  END AS rango,
  COUNT(*) AS cantidad,
  ROUND(100 * COUNT(*) / GREATEST((SELECT COUNT(*) FROM calificacion_periodo cp2 WHERE cp2.asignatura_id = cp.asignatura_id),1),2) AS porcentaje
FROM calificacion_periodo cp
JOIN asignatura a ON a.id = cp.asignatura_id
GROUP BY cp.asignatura_id, a.nombre, rango;

-- Objetivo: promedio de notas por grupo y asignatura — para detectar brechas entre grupos en la misma materia.
CREATE OR REPLACE VIEW vista_promedio_notas_por_grupo_asignatura AS
SELECT
  cp.periodo_academico_id,
  pa.nombre AS periodo_nombre,
  gr.id AS grupo_id,
  gr.nombre AS grupo_nombre,
  cp.asignatura_id,
  a.nombre AS asignatura_nombre,
  ROUND(AVG(cp.nota_final),2) AS promedio_nota,
  COUNT(*) AS muestras
FROM calificacion_periodo cp
JOIN periodo_academico pa ON pa.id = cp.periodo_academico_id
LEFT JOIN grupo gr ON gr.institucion_id = cp.institucion_id -- join solo para traer nombre si aplica
LEFT JOIN asignatura a ON a.id = cp.asignatura_id
GROUP BY cp.periodo_academico_id, pa.nombre, gr.id, gr.nombre, cp.asignatura_id, a.nombre;

-- Objetivo: cuántas clases, horas y estudiantes atiende cada profesor — útil para asignación y balance de carga.
CREATE OR REPLACE VIEW vista_carga_docente AS
SELECT
  u.id AS profesor_id,
  CONCAT(u.nombre, ' ', u.apellido) AS profesor_nombre,
  COUNT(DISTINCT c.id) AS numero_clases,
  -- horas estimadas por sesión (TIME_TO_SEC) convertido a horas
  ROUND(SUM(TIME_TO_SEC(TIMEDIFF(c.hora_fin, c.hora_inicio))) / 3600, 2) AS horas_por_semana_aprox,
  COUNT(DISTINCT m.estudiante_id) AS alumnos_distintos
FROM clase c
JOIN usuario u ON u.id = c.profesor_id
LEFT JOIN grupo g ON g.id = c.grupo_id
LEFT JOIN matricula m ON m.grupo_id = g.id AND m.periodo_academico_id = c.periodo_academico_id
GROUP BY u.id, profesor_nombre;

-- Objetivo: totales facturados, pagado y saldo por periodo (fecha de emisión agrupada por mes/año).
CREATE OR REPLACE VIEW vista_resumen_financiero_periodo AS
SELECT
  YEAR(f.fecha_emision) AS anio,
  MONTH(f.fecha_emision) AS mes,
  CONCAT(YEAR(f.fecha_emision), '-', LPAD(MONTH(f.fecha_emision),2,'0')) AS anio_mes,
  ROUND(SUM(f.total),2) AS total_facturado,
  ROUND(COALESCE(SUM(p.monto),0),2) AS total_pagado,
  ROUND(SUM(f.saldo_cache),2) AS saldo_total
FROM factura f
LEFT JOIN pago p ON p.factura_id = f.id
GROUP BY YEAR(f.fecha_emision), MONTH(f.fecha_emision)
ORDER BY anio, mes;

-- Objetivo: agrupar facturas vencidas en buckets (0-30, 31-60, 61-90, >90) para priorizar cobros.
CREATE OR REPLACE VIEW vista_aging_facturas AS
SELECT
  CASE
    WHEN DATEDIFF(CURDATE(), f.fecha_vencimiento) < 0 THEN 'NO VENCIDA'
    WHEN DATEDIFF(CURDATE(), f.fecha_vencimiento) BETWEEN 0 AND 30 THEN '0-30'
    WHEN DATEDIFF(CURDATE(), f.fecha_vencimiento) BETWEEN 31 AND 60 THEN '31-60'
    WHEN DATEDIFF(CURDATE(), f.fecha_vencimiento) BETWEEN 61 AND 90 THEN '61-90'
    ELSE '90+'
  END AS aging_bucket,
  COUNT(*) AS cantidad_facturas,
  ROUND(SUM(f.saldo_cache),2) AS total_saldo
FROM factura f
WHERE f.estado <> 'ANULADA'
GROUP BY aging_bucket;

-- Objetivo: para cada actividad, tasa de entrega y tasa de entrega a tiempo (on-time vs late). Crucial para medir compromiso.
CREATE OR REPLACE VIEW vista_tasa_entrega_actividades AS
SELECT
  act.id AS actividad_id,
  act.titulo,
  act.clase_id,
  COALESCE((SELECT COUNT(*) FROM matricula m WHERE m.grupo_id = cl.grupo_id AND m.periodo_academico_id = cl.periodo_academico_id), 0) AS alumnos_inscritos,
  COUNT(ea.id) AS entregas_registradas,
  SUM(ea.fecha_subida <= act.fecha_entrega) AS entregas_a_tiempo,
  ROUND(100 * COUNT(ea.id) / GREATEST((SELECT COUNT(*) FROM matricula m WHERE m.grupo_id = cl.grupo_id AND m.periodo_academico_id = cl.periodo_academico_id),1),2) AS pct_entrega,
  ROUND(100 * SUM(ea.fecha_subida <= act.fecha_entrega) / GREATEST(COUNT(ea.id),1),2) AS pct_on_time_entregas
FROM actividad act
LEFT JOIN clase cl ON cl.id = act.clase_id
LEFT JOIN evidencia_actividad ea ON ea.actividad_id = act.id
GROUP BY act.id, act.titulo, act.clase_id, cl.grupo_id, cl.periodo_academico_id;

-- Objetivo: quién sube qué tipo de archivos y volumen por usuario/tipo (uso y gobernanza de almacenamiento).
CREATE OR REPLACE VIEW vista_uso_archivos AS
SELECT
  ad.propietario_id,
  CONCAT(u.nombre, ' ', u.apellido) AS propietario_nombre,
  ad.tipo,
  COUNT(*) AS cantidad_archivos,
  MAX(ad.created_at) AS ultima_subida
FROM archivo_digital ad
LEFT JOIN usuario u ON u.id = ad.propietario_id
GROUP BY ad.propietario_id, propietario_nombre, ad.tipo;

-- Objetivo: actividad de foros (número de foros creados, comentarios, respuestas en árbol) por usuario o por foro.
CREATE OR REPLACE VIEW vista_participacion_foro AS
SELECT
  f.id AS foro_id,
  f.titulo,
  f.usuario_id_autor,
  CONCAT(u.nombre, ' ', u.apellido) AS autor_nombre,
  COUNT(cf.id) AS total_comentarios,
  SUM(CASE WHEN cf.parent_id IS NOT NULL THEN 1 ELSE 0 END) AS respuestas,
  ROUND(COUNT(cf.id) / GREATEST((SELECT COUNT(*) FROM usuario_conversacion uc WHERE uc.institucion_id = f.institucion_id),1),2) AS comentarios_por_usuario_relativo
FROM foro f
LEFT JOIN comentario_foro cf ON cf.foro_id = f.id
LEFT JOIN usuario u ON u.id = f.usuario_id_autor
GROUP BY f.id, f.titulo, f.usuario_id_autor, autor_nombre;

-- Objetivo: medir entregabilidad / lectura de notificaciones por canal y prioridad.
CREATE OR REPLACE VIEW vista_notificaciones_resumen AS
SELECT
  canal,
  prioridad,
  COUNT(*) AS enviadas,
  SUM(estado = 'LEIDA') AS leidas,
  ROUND(100 * SUM(estado = 'LEIDA') / GREATEST(COUNT(*),1),2) AS pct_leidas
FROM notificacion
GROUP BY canal, prioridad;

-- Objetivo: entender qué aulas están más ocupadas (horas agendadas) y su relación con capacidad (utilización).
CREATE OR REPLACE VIEW vista_ocupacion_aulas AS
SELECT
  au.id AS aula_id,
  au.nombre AS aula_nombre,
  au.capacidad,
  COUNT(c.id) AS sesiones_programadas,
  ROUND(SUM(TIME_TO_SEC(TIMEDIFF(c.hora_fin, c.hora_inicio))) / 3600, 2) AS horas_programadas_total
FROM aula au
LEFT JOIN clase c ON c.aula_id = au.id
GROUP BY au.id, au.nombre, au.capacidad;
