¡Excelente pregunta! Esta es la diferencia entre tener un buen diseño y tener una estrategia de ejecución exitosa. Para un equipo pequeño, la clave no es solo *qué* construir, sino *en qué orden* para entregar valor de forma incremental y tener un producto funcional lo antes posible.

Basado en mi experiencia, un enfoque de "vertical slices" (cortes verticales) es el más efectivo. Cada fase entrega una pieza de funcionalidad completa (DB + Backend + Frontend), creando un producto que crece en capacidades con cada ciclo.

Aquí tienes un roadmap estratégico diseñado para maximizar el impacto y minimizar el riesgo.

---

### **Roadmap Estratégico de Desarrollo: Edunekta**

**Filosofía:** Comenzar con un **Producto Mínimo Viable (MVP)** que resuelva el problema más urgente del núcleo de usuarios (profesores y estudiantes) y luego expandir concéntricamente para incluir a otros actores (administradores, padres) y añadir capas de valor (finanzas, personalización).

---

### **Fase 0: El Cimiento - Administración Global (Duración: ~2-3 Semanas)**

**Objetivo:** Crear la estructura base para que exista el sistema y podamos dar de alta a nuestra primera institución. Esto es puramente para el administrador del sistema (ustedes).

*   **1. Base de Datos:**
    *   `institucion`: Para crear el primer colegio.
    *   `usuario`: Para crear al Super Administrador (`institucion_id` = NULL) y al primer Administrador de la Institución.
    *   `rol`: Definir 'Super Admin' y 'Admin Institución'.
    *   `usuario_rol`: Asignar los roles.
    *   `estado_usuario`: Catálogo simple ('Activo', 'Inactivo').

*   **2. Backend (Lógica y APIs):**
    *   Endpoint de autenticación (`/login`) que valide al Super Admin.
    *   API segura para CRUD (`Create`, `Read`, `Update`, `Delete`) de `institucion`.
    *   API para crear el primer `usuario` de tipo 'Admin Institución' y asociarlo a una `institucion`.

*   **3. Frontend (Vistas y Funcionalidad):**
    *   Una única página de "Super Admin" protegida por login.
    *   Una tabla simple que lista las instituciones.
    *   Un formulario para crear/editar una `institucion`.
    *   Un formulario para crear al administrador de esa institución.

**Resultado al final de la Fase 0:** Tienen un sistema capaz de gestionar múltiples instituciones, aunque estas aún no puedan hacer nada.

---

### **Fase 1: El Esqueleto Académico - Configuración Institucional (Duración: ~4-6 Semanas)**

**Objetivo:** Darle al 'Admin de Institución' las herramientas para construir la estructura digital de su colegio. Aún no hay interacción diaria, solo configuración.

*   **1. Base de Datos:**
    *   `nivel_academico`, `grado`, `grupo`, `asignatura`, `aula`, `periodo_academico`.
    *   Tablas de unión: `asignatura_grado`, `profesor_asignatura`.
    *   Expandir `rol` con 'Profesor' y 'Estudiante'.

*   **2. Backend (Lógica y APIs):**
    *   Autenticación para el 'Admin de Institución'.
    *   APIs CRUD para todas las nuevas tablas (`/api/grados`, `/api/asignaturas`, etc.), **con lógica de negocio crítica para asegurar que un admin solo pueda gestionar los datos de su propia `institucion_id`**.
    *   API para que el admin pueda crear usuarios (Profesores, Estudiantes) dentro de su institución.

*   **3. Frontend (Vistas y Funcionalidad):**
    *   **Panel de Administración Institucional:**
        *   Sección "Usuarios": Crear/editar profesores y estudiantes.
        *   Sección "Estructura Académica": Interfaces para gestionar grados, asignaturas, aulas, etc.
        *   Sección "Periodos": Para crear el año escolar (ej. "2025").

**Resultado al final de la Fase 1:** Un administrador puede configurar su colegio por completo, creando usuarios y definiendo la estructura académica. El sistema está listo para la acción.

---

### **Fase 2: El Ciclo Académico Diario - El MVP Lanzable (Duración: ~6-8 Semanas)**

**Objetivo:** ¡Hacer que la plataforma cobre vida! Este es el núcleo de la interacción diaria y el resultado es un producto que ya se puede vender y usar.

*   **1. Base de Datos:**
    *   `clase`: Para crear el horario.
    *   `matricula`: Para inscribir estudiantes en los grupos/grados.
    *   `asistencia` y su catálogo `estado_asistencia`.
    *   `actividad`: Tareas y trabajos.
    *   `evidencia_actividad`: Entregas de los estudiantes.
    *   `calificacion_periodo`: El libro de calificaciones consolidado.

*   **2. Backend (Lógica y APIs):**
    *   Autenticación para roles 'Profesor' y 'Estudiante'.
    *   **Lógica de Profesor:** APIs para crear `clase` (su horario), gestionar `asistencia`, crear `actividad`, ver `evidencia_actividad` y registrar `calificacion_periodo`.
    *   **Lógica de Estudiante:** APIs para ver su horario, ver sus `actividad`, subir `evidencia_actividad` y consultar sus `calificacion_periodo`.
    *   **Lógica de Admin:** API para gestionar `matricula`.

*   **3. Frontend (Vistas y Funcionalidad):**
    *   **Portal del Profesor:** Un dashboard con su horario, una vista para tomar asistencia, un gestor de actividades y una interfaz para calificar.
    *   **Portal del Estudiante:** Un dashboard con su horario, una lista de tareas pendientes, un formulario para subir archivos y una vista de sus calificaciones.
    *   **Panel de Admin:** Una interfaz para matricular estudiantes en sus grupos.

**¡HITO CRÍTICO! Al final de la Fase 2, tienes un producto funcional y valioso.** Puedes empezar a hacer demos y onboardings.

---

### **Fase 3: Comunicación y Comunidad - Ampliación del Valor (Duración: ~4-5 Semanas)**

**Objetivo:** Conectar a los usuarios y cerrar el círculo de comunicación incluyendo a los padres. Esto aumenta enormemente el "engagement" y el valor percibido.

*   **1. Base de Datos:**
    *   Expandir `rol` con 'Acudiente'.
    *   `estudiante_acudiente`: Para vincular padres e hijos.
    *   `conversacion`, `mensaje`, `usuario_conversacion`.
    *   `notificacion` y `estado_notificacion`.

*   **2. Backend (Lógica y APIs):**
    *   API para que el admin vincule acudientes a estudiantes.
    *   API de mensajería (puede empezar con polling simple y luego migrar a WebSockets).
    *   Servicio de notificaciones que se dispare con eventos clave (nueva nota, nueva tarea, mensaje recibido).

*   **3. Frontend (Vistas y Funcionalidad):**
    *   **Portal del Acudiente:** Una nueva vista de solo lectura donde los padres pueden ver las notas, asistencia y tareas de sus hijos.
    *   **Módulo de Chat:** Una interfaz de mensajería integrada en todos los portales.
    *   **Icono de Notificaciones:** Una "campanita" en la UI que muestre las últimas alertas.

---

### **Fase 4: El Módulo Financiero - Eficiencia Administrativa (Duración: ~5-6 Semanas)**

**Objetivo:** Atacar uno de los mayores dolores de cabeza de las instituciones y abrir una nueva vía de monetización o justificación de precio.

*   **1. Base de Datos:**
    *   `concepto_facturacion`, `factura`, `detalle_factura`, `pago`, `metodo_pago`, `estado_factura`.

*   **2. Backend (Lógica y APIs):**
    *   Lógica para generar facturas masivamente (ej: pensión de cada mes).
    *   APIs para registrar pagos y actualizar el estado de las facturas.
    *   Triggers en la BD (`trigger_actualizar_estado_factura_al_pagar`) para automatizar procesos.

*   **3. Frontend (Vistas y Funcionalidad):**
    *   **Panel de Admin:** Módulo de "Finanzas" para definir conceptos de cobro, generar facturas y ver reportes de pagos.
    *   **Portal de Acudiente:** Sección "Pagos" para ver facturas pendientes, historial de pagos y, opcionalmente, un botón para pagar online (integración con pasarelas).

---

### **Fase 5 y Posteriores: Madurez y Escalabilidad**

**Objetivo:** Fortalecer la plataforma, hacerla más segura, robusta y personalizable para atraer a clientes más grandes y exigentes.

*   **Fase 5A: Seguridad Granular (RBAC):**
    *   **DB:** `permiso`, `rol_permiso`.
    *   **Backend:** Refactorizar todos los chequeos de autorización para usar el sistema de permisos en lugar de roles hardcodeados.
    *   **Frontend:** Interfaz para que el Super Admin (y quizás el Admin de Institución) pueda crear roles personalizados y asignar permisos.

*   **Fase 5B: Auditoría y Eventos:**
    *   **DB:** Implementar todas las tablas `_hist` y sus triggers. `calendario_evento`.
    *   **Backend:** APIs para consultar los logs de auditoría. APIs para gestionar eventos institucionales.
    *   **Frontend:** Una vista de "Log de Cambios" para administradores. Un calendario institucional visible para todos.

*   **Fase 6: Personalización Avanzada (Framework "Edificable"):**
    *   **DB:** `configuracion_institucion`, `campo_personalizado_definicion`, `campo_personalizado_valor`.
    *   **Backend/Frontend:** La compleja tarea de hacer que la plataforma se reconfigure y muestre campos dinámicamente según la configuración de cada institución.

Este roadmap proporciona un camino claro, realista y centrado en el valor, permitiendo a un equipo pequeño construir un producto complejo de manera sostenible.

.
├── apps/                                // Contenedores de aplicaciones desplegables.
│   ├── api/                             // Aplicación principal de API REST de Edunekta.
│   │   └── src/
│   │       ├── app.module.ts            // Módulo raíz de la API. Importa los módulos de dominio, core, CQRS, y el EventBus.
│   │       ├── main.ts                  // Punto de entrada. INICIALIZA: Pino (logging), OpenTelemetry (tracing), guardias globales (JwtAuth, Permissions, ResourceOwnership), pipes globales (ValidationPipe) y filtros globales.
│   │       └── commands/                // Lógica de CLI y Crons que pertenecen al ciclo de vida de la API.
│   │           ├── cron/
│   │           │   ├── GenerateMonthlyInvoices.task.ts // Tarea programada (@Cron) que usa el CommandBus para disparar la generación de facturas de forma masiva.
│   │           │   └── MarkOverdueInvoices.task.ts     // Tarea programada para marcar facturas como vencidas y posiblemente disparar un evento `InvoiceOverdueEvent`.
│   │           └── cli/
│   │               └── create-super-admin.command.ts // Comando (ej: `npm run cli:create-admin`) para crear el primer usuario con privilegios globales, indispensable para el bootstrap del sistema.
│   └── outbox-publisher/                // **NUEVA APP**: Worker dedicado y desacoplado. Su única responsabilidad es procesar el Outbox.
│       └── src/
│           ├── main.ts                  // Punto de entrada para el worker.
│           ├── app.module.ts            // Módulo que importa la conexión a la BD y el cliente del bus de eventos real (ej: Kafka/RabbitMQ).
│           └── publisher.service.ts     // **LÓGICA CRÍTICA**: Servicio que se ejecuta en un bucle o cron de alta frecuencia. Lee eventos de la tabla `outbox`, los publica en el bus de eventos y los marca como procesados. Esto garantiza la entrega de eventos incluso si la API principal se reinicia, y no añade latencia a las peticiones del usuario.
├── libs/                                // Librerías de código compartido y reutilizable, el corazón del monorepo.
│   ├── common/                          // Caja de herramientas agnóstica al negocio. Utilidades transversales.
│   │   └── src/
│   │       ├── decorators/
│   │       │   ├── Public.decorator.ts       // @Public(): Marca un endpoint como público, haciendo que el `JwtAuth.guard` global lo ignore. Esencial para endpoints de login o webhooks.
│   │       │   ├── RequirePermission.decorator.ts // @RequirePermission('crear_factura'): Decorador declarativo para RBAC. Vincula un endpoint a un permiso específico.
│   │       │   └── CheckOwnership.decorator.ts  // @CheckOwnership('Invoice'): Declara qué tipo de recurso debe ser verificado por el `ResourceOwnershipGuard` para prevenir BOLA.
│   │       ├── guards/
│   │       │   ├── JwtAuth.guard.ts          // Guardia global. Valida el JWT en cada petición (a menos que sea @Public) y adjunta el usuario al request.
│   │       │   ├── Permissions.guard.ts      // Guardia RBAC. Se activa por `@RequirePermission`. Valida que el ROL del usuario tenga el PERMISO requerido consultando la base de datos o una caché de permisos.
│   │       │   └── ResourceOwnership.guard.ts// **PROTECCIÓN BOLA/BFLA**: Se activa por `@CheckOwnership`. Implementa una estrategia para validar que el `userId` o `institutionId` del token autoriza el acceso al recurso solicitado (ej: un profesor solo puede ver las notas de SUS alumnos, no los de otros).
│   │       ├── filters/
│   │       │   ├── AllExceptions.filter.ts    // Captura y estandariza todas las respuestas de error no manejadas, asegurando que nunca se filtren stack traces a producción.
│   │       │   └── TypeOrmException.filter.ts // Traduce errores específicos de la base de datos (ej: violación de unique constraint) a errores HTTP semánticos (ej: 409 Conflict), mejorando la experiencia del desarrollador del cliente.
│   │       ├── interceptors/
│   │       │   ├── TenantContext.interceptor.ts // Extrae el `institutionId` del payload del JWT y lo establece en un contexto asíncrono (`AsyncLocalStorage`) para que esté disponible en toda la pila de la petición sin pasarlo como parámetro.
│   │       │   └── TransformResponse.interceptor.ts // **NUEVO**: Intercepta respuestas exitosas y las envuelve en un formato estándar, ej: { "statusCode": 200, "data": [...] }, para una API predecible.
│   │       ├── providers/
│   │       │   └── TenantContext.provider.ts   // Provider que expone y gestiona la instancia de `AsyncLocalStorage` para el contexto del tenant. Es la clave para el aislamiento de datos multi-tenant.
│   │       ├── dtos/                        // **NUEVO**: DTOs comunes y reutilizables para evitar la duplicación de código.
│   │       │   ├── pagination-query.dto.ts  // DTO estándar para queries de paginación (`?page=1&limit=20`), con validadores de clase (`class-validator`).
│   │       │   └── paginated-response.dto.ts// DTO genérico para encapsular respuestas paginadas (`{ data: T[], meta: { total, page, limit } }`).
│   │       └── utils/
│   │           └── hashing.util.ts             // Utilidades para Bcrypt, abstraen el `hash` y `compare`.
│   ├── core/                            // Infraestructura central e inmutable del sistema. No contiene lógica de negocio.
│   │   └── src/
│   │       ├── auth/
│   │       │   ├── services/                 // **NUEVO**: Servicios de apoyo para autenticación.
│   │       │   │   └── token-blacklist.service.ts // **NUEVO**: Implementa la revocación de JWTs mediante una blacklist (idealmente en Redis con un TTL). El `JwtAuth.guard` consultaría este servicio para rechazar tokens que han sido invalidados antes de su expiración (ej: por cierre de sesión o cambio de contraseña).
│   │       │   ├── strategies/
│   │       │   │   └── jwt.strategy.ts         // Lógica de PassportJS que valida el payload del JWT. Debe contener { sub: userId, roleId, institutionId, jti: jwtId }.
│   │       │   ├── auth.service.ts
│   │       │   └── auth.module.ts
│   │       ├── config/
│   │       │   ├── configuration.ts         // Carga y valida variables de entorno con Zod o Joi, asegurando que la aplicación no arranque con una configuración inválida.
│   │       │   └── config.module.ts
│   │       ├── database/
│   │       │   ├── typeorm/
│   │       │   │   ├── data-source.ts         // Configuración de TypeORM aislada, utilizada por el CLI de TypeORM para generar y ejecutar migraciones.
│   │       │   │   ├── migrations/            // Directorio donde TypeORM guarda los archivos de migración generados.
│   │       │   │   └── base.repository.ts     // **MULTI-TENANCY HERMÉTICA**: Repositorio base del que todos los demás heredan. Inyecta automáticamente 'WHERE institution_id = :tenantId' en CADA consulta (SELECT, UPDATE, DELETE) usando el `TenantContext.provider`, eliminando la posibilidad de error humano de fuga de datos entre tenants.
│   │       │   │   └── unit-of-work.provider.ts // **NUEVO**: Provider que gestiona el ciclo de vida de una transacción de BD (`startTransaction`, `commit`, `rollback`). Los `Command Handlers` lo inyectan para asegurar que operaciones complejas (ej: guardar una factura Y un evento en el outbox) sean atómicas.
│   │       │   └── database.module.ts
│   │       ├── event-bus/
│   │       │   └── src/
│   │       │       └── event-publisher.port.ts // Abstracción (puerto) para la publicación de eventos. La implementación real (adaptador) usará el patrón Outbox, escribiendo en la tabla de la BD.
│   │       └── observability/
│   │           └── src/
│   │               ├── logging/
│   │               │   └── pino.config.ts   // Configuración de Pino para logging JSON estructurado y de alto rendimiento, con enriquecimiento automático (correlationId, tenantId).
│   │               ├── tracing/
│   │               │   └── opentelemetry.config.ts // Configuración de OpenTelemetry para trazado distribuido end-to-end a través de la API, workers y bus de eventos.
│   │               └── metrics/                 // **NUEVO**: Para métricas de negocio y de sistema.
│   │                   └── prometheus.provider.ts // **NUEVO**: Configura y expone un registro de métricas de Prometheus. Permite a los dominios registrar métricas customizadas (ej: `invoices_created_total{tenant_id="X"}`) para monitoreo y alertas proactivas.
│   ├── domains/                         // LIBRERÍAS DE DOMINIO (Bounded Contexts de DDD). Cada dominio es una mini-aplicación hexagonal.
│   │   ├── access-control/              // Dominio: Gestión de Roles, Permisos y su asignación.
│   │   │   └── src/
│   │   │       ├── application/
│   │   │       │   ├── commands/
│   │   │       │   │   ├── handlers/ // Ej: AssignPermissionToRole.handler.ts
│   │   │       │   │   └── impl/     // DTOs de Comandos.
│   │   │       │   └── queries/    // Ej: GetPermissionsForRole.handler.ts
│   │   │       ├── domain/
│   │   │       │   ├── models/     // rol.model.ts, permiso.model.ts
│   │   │       │   └── ports/      // rol.repository.port.ts
│   │   │       └── infrastructure/
│   │   │           ├── controllers/
│   │   │           │   └── rbac.controller.ts // Endpoints para CRUD de roles/permisos, protegidos para Super Admins.
│   │   │           └── persistence/
│   │   │               └── typeorm/ // Adaptadores que implementan los puertos de persistencia.
│   │   ├── academic/                    // Dominio: Gestión de Grados, Asignaturas, Matrículas y Calificaciones.
│   │   │   └── src/
│   │   │       ├── application/
│   │   │       │   ├── commands/     // Ej: EnrollStudent.handler.ts, SubmitGrade.handler.ts
│   │   │       │   │   └── handlers/
│   │   │       │   │       └── consolidate-period-grades.handler.ts // **NUEVA LÓGICA**: Lógica de batch que recopila todas las notas de un periodo, aplica ponderaciones y genera la nota final consolidada.
│   │   │       │   ├── queries/      // Ej: GetStudentGrades.query.ts, GetClassSchedule.query.ts
│   │   │       │   └── sagas/
│   │   │       │       └── enrollment.saga.ts // **SAGA**: Orquesta el complejo proceso de matriculación. Escucha `PaymentVerifiedEvent`, dispara comando `VerifyPrerequisitesCommand`, luego `EnrollStudentCommand`. Maneja flujos de compensación si un paso falla.
│   │   │       ├── domain/
│   │   │       │   ├── models/     // grade.model.ts, enrollment.model.ts, etc.
│   │   │       │   ├── events/     // StudentEnrolledEvent.ts
│   │   │       │   └── ports/      // enrollment.repository.port.ts
│   │   │       └── infrastructure/
│   │   │           ├── controllers/ // enrollment.controller.ts, grading.controller.ts
│   │   │           └── persistence/ // Adaptadores de persistencia.
│   │   ├── communication/               // Dominio: Chats, Foros y Notificaciones.
│   │   │   └── src/
│   │   │       ├── application/
│   │   │       │   ├── commands/     // Ej: SendMessageCommand.ts
│   │   │       │   └── listeners/
│   │   │       │       └── notification.listener.ts // Escucha eventos de otros dominios (ej. `InvoiceCreatedEvent`, `GradeSubmittedEvent`) y usa un NotificationService para crear notificaciones push o internas para los usuarios relevantes.
│   │   │       ├── domain/
│   │   │       │   ├── models/     // message.model.ts, notification.model.ts
│   │   │       │   └── ports/      // notification.service.port.ts (abstracción para enviar notificaciones)
│   │   │       └── infrastructure/
│   │   │           ├── adapters/
│   │   │           │   └── internal-notification.service.adapter.ts // Implementación que guarda notificaciones en la BD. Podría haber otros adaptadores para Push Notifications o Email.
│   │   │           └── gateways/
│   │   │               └── messaging.gateway.ts // Gateway de WebSocket (Socket.IO) para el chat en tiempo real.
│   │   ├── financial/                   // Dominio: Facturación y Pagos.
│   │   │   └── src/
│   │   │       ├── application/
│   │   │       │   ├── commands/
│   │   │       │   │   ├── handlers/
│   │   │       │   │   │   └── create-invoice.handler.ts // Lógica que, DENTRO DE UNA TRANSACCIÓN (manejada por el UnitOfWork), guarda la factura y guarda el evento `InvoiceCreated` en la tabla OUTBOX.
│   │   │       │   │   └── impl/
│   │   │       │   │       └── create-invoice.command.ts
│   │   │       │   └── queries/
│   │   │       │       └── handlers/
│   │   │       │           └── get-invoice.handler.ts // Lógica de lectura optimizada, posiblemente contra una réplica de lectura.
│   │   │       ├── domain/
│   │   │       │   ├── models/
│   │   │       │   │   └── invoice.model.ts    // Modelo de dominio rico, con métodos como `addPayment()` o `markAsOverdue()`, sin dependencias de framework.
│   │   │       │   ├── events/
│   │   │       │   │   └── invoice-created.event.ts
│   │   │       │   └── ports/
│   │   │       │       ├── invoice.repository.port.ts
│   │   │       │       └── outbox.repository.port.ts // **PUERTO OUTBOX**: Contrato para guardar eventos de forma atómica con la operación de negocio.
│   │   │       └── infrastructure/
│   │   │           ├── controllers/
│   │   │           │   └── invoices.controller.ts // Expone los comandos y queries vía HTTP, protegido por guardias de permisos.
│   │   │           └── persistence/
│   │   │               └── typeorm/
│   │   │                   ├── entities/
│   │   │                   │   ├── invoice.entity.ts
│   │   │                   │   ├── payment.entity.ts
│   │   │                   │   └── outbox.entity.ts // **ENTIDAD OUTBOX**: Entidad de TypeORM que define la tabla donde se guardan los eventos serializados antes de ser publicados.
│   │   │                   └── repositories/
│   │   │                       ├── typeorm-invoice.repository.adapter.ts // Implementa el puerto del repositorio de facturas.
│   │   │                       └── typeorm-outbox.repository.adapter.ts  // Implementa el puerto del repositorio Outbox.
│   │   ├── institutions/                // Dominio: Gestión de Instituciones (onboarding, configuración).
│   │   │   └── src/
│   │   │       ├── application/
│   │   │       │   └── commands/
│   │   │       │       └── handlers/
│   │   │       │           └── onboard-institution.handler.ts // **NUEVA LÓGICA**: Comando transaccional que crea la institución, su primer usuario administrador y asigna los roles iniciales. Es un proceso crítico de negocio.
│   │   │       └── ... // Estructura hexagonal y CQRS similar.
│   │   └── users/                       // Dominio: Gestión de Usuarios, Perfiles y Ciclo de Vida.
│   │       └── src/
│   │           ├── application/
│   │           │   ├── commands/
│   │           │   │   └── handlers/
│   │           │   │       ├── request-password-reset.handler.ts // **NUEVA LÓGICA**: Genera token seguro, lo almacena y dispara evento para enviar email.
│   │           │   │       └── confirm-password-reset.handler.ts // **NUEVA LÓGICA**: Valida token y actualiza contraseña.
│   │           │   └── sagas/
│   │           │       └── user-invitation.saga.ts // **NUEVA LÓGICA**: Orquesta la invitación de un nuevo usuario a la plataforma.
│   │           └── ... // Estructura hexagonal y CQRS similar.
│   └── integrations/                    // Librerías para clientes de servicios de terceros (adaptadores salientes del Hexágono).
│       └── src/
│           ├── payments/
│           │   ├── stripe.adapter.ts      // Implementa un `PaymentGatewayPort` definido en el dominio `financial`. **NOTA ARQUITECTÓNICA**: Este adaptador DEBE implementar patrones de resiliencia como Circuit Breaker y Retries con backoff exponencial, ya que depende de una red externa.
│           │   └── payments.module.ts
│           ├── storage/
│           │   ├── s3.adapter.ts          // Implementa un `FileStoragePort` que podría ser usado por varios dominios para subir archivos.
│           │   └── storage.module.ts
│           └── email/
│               ├── ses.adapter.ts         // Implementa un `EmailPort` para enviar correos transaccionales (ej. de la saga de invitación o reseteo de contraseña).
│               └── email.module.ts
├── package.json
├── nest-cli.json                        // Configuración del CLI para el monorepo (workspaces), definiendo las rutas de las librerías.
└── tsconfig.base.json                   // Configuración de TypeScript base con paths mapeados (ej: `@app/core`) para importaciones limpias.