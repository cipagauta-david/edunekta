### Arquitectura de Datos – Edunekta v2.0 (versión simplificada para equipos novatos)

Versión: 2.0  
Motor: MySQL 8.x (InnoDB, utf8mb4_0900_ai_ci)  
Alcance: Colombia (zona horaria recomendada: America/Bogota)  
Objetivo: Mantener el modelo multi-institución y los procesos clave (académico, asistencia, evaluaciones y finanzas) con el menor número posible de tablas y reglas. Se reemplazan la mayoría de catálogos por ENUMs y se eliminan flujos complejos (2FA, tokens, ledger contable, sesiones de clase, permisos granulares).

Nota de diseño: Esta versión prioriza que el equipo pueda construir y entender el sistema. Hay trade-offs (menos flexibilidad, más cambios de esquema ante nuevos valores). Cuando el equipo madure, podrán migrar de ENUMs a catálogos y de reglas simples a modelos más robustos.



### Sección 1: Tablas

#### 1.1 Entidades centrales

- institucion:
  - id INT PK AI
  - nombre VARCHAR(255) UNIQUE NOT NULL
  - nit VARCHAR(20) UNIQUE
  - correo VARCHAR(150)
  - telefono VARCHAR(30)
  - direccion TEXT
  - created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  - updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  - Descripción: Tenancy. Todo dato “propio” de un colegio se ancla a esta tabla.

- usuario:
  - id INT PK AI
  - institucion_id INT NULL FK -> institucion(id) [NULL reservado para un Super Admin global si lo necesitas; si no, hazlo NOT NULL]
  - nombre VARCHAR(100) NOT NULL
  - apellido VARCHAR(100) NOT NULL
  - email VARCHAR(150) NOT NULL
  - password_hash VARCHAR(255) NOT NULL
  - tipo_documento ENUM('CC','TI','CE','PP') NULL
  - documento VARCHAR(30) NULL
  - genero ENUM('M','F','O') NULL
  - fecha_nacimiento DATE NULL
  - telefono VARCHAR(20) NULL
  - direccion VARCHAR(200) NULL
  - rol ENUM('ESTUDIANTE','PROFESOR','ACUDIENTE','ADMIN') NOT NULL
  - foto_perfil VARCHAR(255) NULL
  - ultimo_acceso DATETIME NULL
  - activo BOOLEAN DEFAULT TRUE
  - email_verificado BOOLEAN DEFAULT FALSE
  - created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  - updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  - UNIQUE (institucion_id, email)
  - INDEX idx_usuario_institucion (institucion_id)
  - Descripción: Un solo rol por usuario para simplificar. Contraseña como hash (manejado por la app). Sin 2FA ni tokens.

- estudiante_acudiente:
  - id INT PK AI
  - institucion_id INT NOT NULL FK -> institucion(id)
  - estudiante_id INT NOT NULL FK -> usuario(id)
  - acudiente_id INT NOT NULL FK -> usuario(id)
  - parentesco ENUM('PADRE','MADRE','TUTOR','OTRO') NOT NULL
  - UNIQUE (institucion_id, estudiante_id, acudiente_id)
  - Descripción: Vincula estudiantes con su acudiente principal.



#### 1.2 Estructura académica

- nivel_academico:
  - id INT PK AI
  - institucion_id INT NOT NULL FK -> institucion(id)
  - nombre VARCHAR(100) NOT NULL
  - descripcion TEXT
  - UNIQUE (institucion_id, nombre)

- grado:
  - id INT PK AI
  - institucion_id INT NOT NULL FK -> institucion(id)
  - nivel_academico_id INT NOT NULL FK -> nivel_academico(id)
  - nombre VARCHAR(100) NOT NULL
  - descripcion TEXT
  - UNIQUE (institucion_id, nombre)

- grupo:
  - id INT PK AI
  - institucion_id INT NOT NULL FK -> institucion(id)
  - grado_id INT NOT NULL FK -> grado(id)
  - nombre VARCHAR(50) NOT NULL
  - periodo_academico_id INT NOT NULL FK -> periodo_academico(id)
  - descripcion TEXT
  - UNIQUE (institucion_id, grado_id, periodo_academico_id, nombre)

- asignatura:
  - id INT PK AI
  - institucion_id INT NOT NULL FK -> institucion(id)
  - nombre VARCHAR(150) NOT NULL
  - descripcion TEXT
  - UNIQUE (institucion_id, nombre)

- aula:
  - id INT PK AI
  - institucion_id INT NOT NULL FK -> institucion(id)
  - nombre VARCHAR(100) NOT NULL
  - capacidad INT
  - ubicacion TEXT
  - UNIQUE (institucion_id, nombre)

- periodo_academico:
  - id INT PK AI
  - institucion_id INT NOT NULL FK -> institucion(id)
  - nombre VARCHAR(50) NOT NULL
  - estado ENUM('PLANIFICADO','EN_CURSO','FINALIZADO','ARCHIVADO') NOT NULL DEFAULT 'PLANIFICADO'
  - fecha_inicio DATE NOT NULL
  - fecha_fin DATE NOT NULL
  - UNIQUE (institucion_id, nombre)

- clase:
  - id INT PK AI
  - institucion_id INT NOT NULL FK -> institucion(id)
  - nombre VARCHAR(200)
  - dia ENUM('Lunes','Martes','Miércoles','Jueves','Viernes','Sábado') NOT NULL
  - hora_inicio TIME NOT NULL
  - hora_fin TIME NOT NULL
  - grupo_id INT NOT NULL FK -> grupo(id)
  - periodo_academico_id INT NOT NULL FK -> periodo_academico(id)
  - aula_id INT NOT NULL FK -> aula(id)
  - asignatura_id INT NOT NULL FK -> asignatura(id)
  - profesor_id INT NOT NULL FK -> usuario(id)
  - INDEX (institucion_id, periodo_academico_id, grupo_id, dia, hora_inicio)
  - INDEX (institucion_id, periodo_academico_id, profesor_id, dia, hora_inicio)
  - Descripción: Slot de horario básico. Sin “sesiones” generadas para simplificar.

- matricula:
  - id INT PK AI
  - institucion_id INT NOT NULL FK -> institucion(id)
  - estudiante_id INT NOT NULL FK -> usuario(id)
  - grado_id INT NOT NULL FK -> grado(id)
  - grupo_id INT NOT NULL FK -> grupo(id)
  - periodo_academico_id INT NOT NULL FK -> periodo_academico(id)
  - estado ENUM('ACTIVA','RETIRADO','FINALIZADA','PENDIENTE') NOT NULL DEFAULT 'ACTIVA'
  - fecha_matricula DATE NOT NULL
  - UNIQUE (institucion_id, estudiante_id, periodo_academico_id)



#### 1.3 Actividades, evidencias, asistencia y archivos

- actividad:
  - id INT PK AI
  - institucion_id INT NOT NULL FK -> institucion(id)
  - titulo VARCHAR(255) NOT NULL
  - descripcion TEXT
  - fecha_entrega DATETIME
  - clase_id INT NOT NULL FK -> clase(id)
  - estado ENUM('PUBLICADA','CERRADA','CALIFICADA') NOT NULL DEFAULT 'PUBLICADA'
  - categoria ENUM('TAREA','EXAMEN','PROYECTO','PARTICIPACION') NOT NULL
  - created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  - updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

- evidencia_actividad:
  - id INT PK AI
  - institucion_id INT NOT NULL FK -> institucion(id)
  - actividad_id INT NOT NULL FK -> actividad(id)
  - estudiante_id INT NOT NULL FK -> usuario(id)
  - descripcion TEXT
  - fecha_subida DATETIME DEFAULT CURRENT_TIMESTAMP
  - calificacion DECIMAL(5,2)
  - UNIQUE (institucion_id, actividad_id, estudiante_id)

- asistencia:
  - id INT PK AI
  - institucion_id INT NOT NULL FK -> institucion(id)
  - clase_id INT NOT NULL FK -> clase(id)
  - estudiante_id INT NOT NULL FK -> usuario(id)
  - fecha DATE NOT NULL
  - estado ENUM('PRESENTE','AUSENTE','TARDE','JUSTIFICADA') NOT NULL
  - observacion VARCHAR(255)
  - UNIQUE (institucion_id, clase_id, estudiante_id, fecha)

- archivo_digital:
  - id INT PK AI
  - institucion_id INT NOT NULL FK -> institucion(id)
  - nombre VARCHAR(255) NOT NULL
  - url TEXT NOT NULL
  - tipo ENUM('DOCUMENTO','IMAGEN','VIDEO','AUDIO') NOT NULL
  - extension VARCHAR(10) NULL
  - propietario_id INT NOT NULL FK -> usuario(id)
  - created_at DATETIME DEFAULT CURRENT_TIMESTAMP



#### 1.4 Evaluaciones y calificaciones

- ponderacion_evaluacion:
  - id INT PK AI
  - institucion_id INT NOT NULL FK -> institucion(id)
  - clase_id INT NOT NULL FK -> clase(id)
  - categoria ENUM('TAREA','EXAMEN','PROYECTO','PARTICIPACION') NOT NULL
  - porcentaje DECIMAL(5,2) NOT NULL
  - Descripción: La suma por clase debe ser 100%. Se valida con trigger.

- calificacion_periodo:
  - id INT PK AI
  - institucion_id INT NOT NULL FK -> institucion(id)
  - estudiante_id INT NOT NULL FK -> usuario(id)
  - asignatura_id INT NOT NULL FK -> asignatura(id)
  - periodo_academico_id INT NOT NULL FK -> periodo_academico(id)
  - nota_final DECIMAL(5,2) NOT NULL
  - observaciones TEXT
  - UNIQUE (institucion_id, estudiante_id, asignatura_id, periodo_academico_id)



#### 1.5 Módulo financiero (simple)

- concepto_facturacion:
  - id INT PK AI
  - institucion_id INT NOT NULL FK -> institucion(id)
  - nombre VARCHAR(255) NOT NULL
  - descripcion TEXT
  - costo_base DECIMAL(12,2) NOT NULL
  - activo BOOLEAN DEFAULT TRUE
  - UNIQUE (institucion_id, nombre)

- factura:
  - id INT PK AI
  - institucion_id INT NOT NULL FK -> institucion(id)
  - acudiente_id INT NOT NULL FK -> usuario(id)
  - fecha_emision DATE NOT NULL
  - fecha_vencimiento DATE NOT NULL
  - total DECIMAL(12,2) NOT NULL
  - estado ENUM('PENDIENTE','PARCIAL','PAGADA','VENCIDA','ANULADA') NOT NULL DEFAULT 'PENDIENTE'
  - saldo_cache DECIMAL(13,2) NOT NULL DEFAULT 0
  - created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  - updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

- detalle_factura:
  - id INT PK AI
  - institucion_id INT NOT NULL FK -> institucion(id)
  - factura_id INT NOT NULL FK -> factura(id)
  - concepto_facturacion_id INT NOT NULL FK -> concepto_facturacion(id)
  - descripcion_adicional VARCHAR(255)
  - cantidad DECIMAL(10,2) NOT NULL DEFAULT 1.00
  - precio_unitario DECIMAL(12,2) NOT NULL
  - monto DECIMAL(12,2) NOT NULL
  - INDEX (institucion_id, factura_id)

- pago:
  - id INT PK AI
  - institucion_id INT NOT NULL FK -> institucion(id)
  - factura_id INT NOT NULL FK -> factura(id)
  - monto DECIMAL(12,2) NOT NULL
  - fecha_pago DATETIME NOT NULL
  - metodo ENUM('EFECTIVO','TRANSFERENCIA','TARJETA','PSE') NOT NULL
  - referencia VARCHAR(100) NULL
  - created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  - INDEX (institucion_id, factura_id, fecha_pago)
  - Descripción: Para simplificar, no se permite editar/eliminar pagos desde la app. Si se necesita revertir, registrar un pago negativo (hecho por un admin).



#### 1.6 Calendario, mensajería, foros y notificaciones

- calendario_evento:
  - id INT PK AI
  - institucion_id INT NOT NULL FK -> institucion(id)
  - titulo VARCHAR(255) NOT NULL
  - descripcion TEXT
  - fecha_inicio DATETIME NOT NULL
  - fecha_fin DATETIME NOT NULL
  - tipo ENUM('FERIADO','REUNION','ACADEMICO','CIVICO') NOT NULL
  - INDEX (institucion_id, fecha_inicio, fecha_fin)

- conversacion:
  - id INT PK AI
  - institucion_id INT NOT NULL FK -> institucion(id)
  - estado ENUM('ACTIVA','ARCHIVADA') NOT NULL DEFAULT 'ACTIVA'
  - created_at DATETIME DEFAULT CURRENT_TIMESTAMP

- usuario_conversacion:
  - id INT PK AI
  - institucion_id INT NOT NULL FK -> institucion(id)
  - conversacion_id INT NOT NULL FK -> conversacion(id)
  - usuario_id INT NOT NULL FK -> usuario(id)
  - last_read_at DATETIME NULL
  - UNIQUE (institucion_id, conversacion_id, usuario_id)

- mensaje:
  - id INT PK AI
  - institucion_id INT NOT NULL FK -> institucion(id)
  - conversacion_id INT NOT NULL FK -> conversacion(id)
  - usuario_id_remitente INT NOT NULL FK -> usuario(id)
  - contenido TEXT NOT NULL
  - fecha_envio DATETIME DEFAULT CURRENT_TIMESTAMP
  - Descripción: Ediciones y borrado suave se pueden manejar en la app; no forzado en BD.

- foro:
  - id INT PK AI
  - institucion_id INT NOT NULL FK -> institucion(id)
  - titulo VARCHAR(255) NOT NULL
  - descripcion TEXT
  - usuario_id_autor INT NOT NULL FK -> usuario(id)
  - created_at DATETIME DEFAULT CURRENT_TIMESTAMP

- comentario_foro:
  - id INT PK AI
  - institucion_id INT NOT NULL FK -> institucion(id)
  - foro_id INT NOT NULL FK -> foro(id)
  - usuario_id_autor INT NOT NULL FK -> usuario(id)
  - contenido TEXT NOT NULL
  - parent_id INT NULL FK -> comentario_foro(id)
  - created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  - INDEX (foro_id, created_at)

- notificacion:
  - id INT PK AI
  - institucion_id INT NOT NULL FK -> institucion(id)
  - usuario_id INT NOT NULL FK -> usuario(id)
  - titulo VARCHAR(255) NOT NULL
  - mensaje TEXT NOT NULL
  - canal ENUM('APP','EMAIL','SMS') NOT NULL DEFAULT 'APP'
  - prioridad ENUM('BAJA','MEDIA','ALTA') NOT NULL DEFAULT 'MEDIA'
  - estado ENUM('NO_LEIDA','LEIDA') NOT NULL DEFAULT 'NO_LEIDA'
  - url_destino TEXT
  - fecha DATETIME DEFAULT CURRENT_TIMESTAMP



### Sección 2: Vistas (opcionales y simples)

- vista_horario_completo: une clase con asignatura, profesor (usuario), grupo y aula para mostrar el horario.
- vista_estado_financiero_acudiente: consolida por acudiente el total facturado, total pagado y saldo usando factura, pago y saldo_cache. Si no quieres usar saldo_cache, calcula saldo como total - SUM(pagos).



### Sección 3: Triggers (mínimos y entendibles)

- trigger_ponderacion_check (suma 100% por clase):

```sql
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
```

- trigger_actualizar_factura_al_pagar (saldo y estado). Requiere columna saldo_cache en factura:

```sql
ALTER TABLE factura ADD COLUMN saldo_cache DECIMAL(13,2) NOT NULL DEFAULT 0;

DELIMITER //
CREATE TRIGGER trg_pago_actualiza_factura
AFTER INSERT ON pago
FOR EACH ROW
BEGIN
  -- Actualiza saldo: saldo = total - sum(pagos)
  UPDATE factura f
  SET f.saldo_cache = GREATEST(0, f.total - (
      SELECT COALESCE(SUM(p.monto),0)
      FROM pago p
      WHERE p.factura_id = f.id
    ))
  WHERE f.id = NEW.factura_id;

  -- Actualiza estado según saldo y vencimiento
  UPDATE factura f
  SET f.estado = CASE
      WHEN f.saldo_cache = 0 THEN 'PAGADA'
      WHEN f.saldo_cache < f.total AND CURDATE() <= f.fecha_vencimiento THEN 'PARCIAL'
      WHEN CURDATE() > f.fecha_vencimiento THEN 'VENCIDA'
      ELSE 'PENDIENTE'
    END
  WHERE f.id = NEW.factura_id;
END//
DELIMITER ;
```

Sugerencia didáctica para pagos: no permitir UPDATE/DELETE desde la app. Si se requiere corregir, insertar un pago con monto negativo. Así evitas más triggers.



### Sección 4: Reglas y simplificaciones clave

- Multi-institución: todas las tablas “operativas” tienen institucion_id y las consultas siempre deben filtrar por institucion_id del usuario. Si no usarás Super Admin, haz usuario.institucion_id NOT NULL.
- Roles: un único rol por usuario con ENUM. La lógica en la app puede usar “si rol == 'PROFESOR'” sin sistema de permisos complejo.
- Horario: no se validan solapes en BD; haz la validación en la app (si aprueban, se inserta).
- Asistencia: por fecha y clase; una fila por estudiante al día por clase.
- Evaluaciones: define categorías como ENUM; la suma de ponderaciones por clase debe ser 100% (trigger lo asegura).
- Finanzas: facturas con líneas y pagos simples. Saldo en factura.saldo_cache actualizado por trigger al insertar pagos. Estado se deriva automáticamente. Evita editar o borrar pagos.
- Auditoría: usa created_at y updated_at. Si necesitas más adelante historial, añádelo como nueva tabla pero no ahora.
- Contraseñas: password_hash únicamente. Sin verificación 2 pasos ni tablas de tokens ahora.
- Zona horaria: guarda todo en UTC desde la app o, si se complica, usa hora local “America/Bogota” de forma consistente.



### Sección 5: Índices y unicidades básicas

- usuario: UNIQUE (institucion_id, email)
- grado: UNIQUE (institucion_id, nombre)
- grupo: UNIQUE (institucion_id, grado_id, periodo_academico_id, nombre)
- asignatura: UNIQUE (institucion_id, nombre)
- matricula: UNIQUE (institucion_id, estudiante_id, periodo_academico_id)
- evidencia_actividad: UNIQUE (institucion_id, actividad_id, estudiante_id)
- asistencia: UNIQUE (institucion_id, clase_id, estudiante_id, fecha)
- pago: INDEX (institucion_id, factura_id, fecha_pago)
- clase: índices por periodo, grupo/profesor, día y hora como indicado en su definición



### Sección 6: Vías de migración y trabajo del equipo

- Paso 1: crear institucion y asegurar que todas las tablas nuevas tengan institucion_id. 
- Paso 2: crear usuario con rol por ENUM y email único por institución. 
- Paso 3: crear la estructura académica (nivel, grado, grupo, asignatura, periodo) y clase. 
- Paso 4: habilitar actividades, evidencias y asistencia. 
- Paso 5: habilitar finanzas (factura, detalle, pago) y el trigger de saldo/estado. 
- Paso 6: crear mensajería, foros, notificaciones si se requieren.

Consejos didácticos: trabajar por módulos, crear datos de ejemplo desde el primer día y probar cada tabla con inserts simples antes de avanzar. Mantener consultas SQL en scripts versionados.



### Sección 7: Limitaciones conocidas por simplificación

- ENUMs requieren migraciones si agregas nuevos valores (ej. un nuevo método de pago).
- Sin “sesión de clase”: no hay reprogramaciones ni cancelaciones formales; se maneja con asistencia y observaciones.
- Sin ledger contable ni auditoría avanzada: la contabilidad es básica y suficiente para un colegio pequeño.
- Sin permisos granulares: se gobierna por rol único en usuario. Si se requieren permisos finos, más adelante se puede reintroducir rol/permiso.



Si quieres, te genero el DDL (CREATE TABLE y los 2 triggers) listo para ejecutar en MySQL 8 con este diseño simplificado. Solo dime si quieres usuario.institucion_id obligatorio (recomendado) y si mantendrás Super Admin global o no.