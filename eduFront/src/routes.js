import React from 'react'

// Dashboard
const Dashboard = React.lazy(() => import('./views/dashboard/EdunektaDashboard'))

// Authentication
const Profile = React.lazy(() => import('./views/auth/Profile'))

// Academic Management - Core Components
const SubjectList = React.lazy(() => import('./views/academic/subjects/SubjectList'))
const CreateSubject = React.lazy(() => import('./views/academic/subjects/CreateSubject'))
const ActivityList = React.lazy(() => import('./views/academic/activities/ActivityList'))

// Academic Management - Database-Driven Components
const ClassScheduler = React.lazy(() => import('./views/academic/classes/ClassScheduler'))
const AcademicPeriodManager = React.lazy(
  () => import('./views/academic/periods/AcademicPeriodManager'),
)
const EnrollmentManager = React.lazy(() => import('./views/academic/enrollment/EnrollmentManager'))
const GradeBook = React.lazy(() => import('./views/academic/grades/GradeBook'))
const AttendanceTracker = React.lazy(() => import('./views/academic/attendance/AttendanceTracker'))

// Administration - Core Components
const UserList = React.lazy(() => import('./views/admin/users/UserList'))

// Administration - Database-Driven Components
const UserRoleManager = React.lazy(() => import('./views/admin/users/UserRoleManager'))
const GuardianManager = React.lazy(() => import('./views/admin/users/GuardianManager'))

// Communication - Core Components
const ForumList = React.lazy(() => import('./views/communication/forum/ForumList'))
const MessageList = React.lazy(() => import('./views/communication/messaging/MessageList'))

// Communication - Database-Driven Components
const ConversationManager = React.lazy(
  () => import('./views/communication/conversations/ConversationManager'),
)
const NotificationCenter = React.lazy(
  () => import('./views/communication/notifications/NotificationCenter'),
)

// Fallback components for routes that don't exist yet
const ComingSoon = React.lazy(() => import('./views/pages/page404/Page404'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  // Profile
  { path: '/profile', name: 'Mi Perfil', element: Profile },

  // Academic Routes - Core Features
  { path: '/academic', name: 'Académico', element: SubjectList, exact: true },
  { path: '/academic/subjects', name: 'Asignaturas', element: SubjectList, exact: true },
  { path: '/academic/subjects/create', name: 'Crear Asignatura', element: CreateSubject },
  { path: '/academic/subjects/edit/:id', name: 'Editar Asignatura', element: CreateSubject },
  { path: '/academic/subjects/:id', name: 'Detalle Asignatura', element: ComingSoon },

  { path: '/academic/activities', name: 'Actividades', element: ActivityList, exact: true },
  { path: '/academic/activities/create', name: 'Crear Actividad', element: ComingSoon },
  { path: '/academic/activities/edit/:id', name: 'Editar Actividad', element: ComingSoon },
  { path: '/academic/activities/:id', name: 'Detalle Actividad', element: ComingSoon },

  // Academic Routes - Database-Driven Features
  { path: '/academic/classes', name: 'Programación de Clases', element: ClassScheduler },
  { path: '/academic/periods', name: 'Períodos Académicos', element: AcademicPeriodManager },
  { path: '/academic/enrollment', name: 'Gestión de Matrículas', element: EnrollmentManager },
  { path: '/academic/grades', name: 'Libro de Calificaciones', element: GradeBook },
  { path: '/academic/attendance', name: 'Control de Asistencia', element: AttendanceTracker },

  // Communication Routes - Core Features
  { path: '/communication/forum', name: 'Foros', element: ForumList, exact: true },
  { path: '/communication/forum/create', name: 'Crear Foro', element: ComingSoon },
  { path: '/communication/forum/:id', name: 'Foro', element: ComingSoon },

  { path: '/communication/messages', name: 'Mensajes', element: MessageList, exact: true },
  { path: '/communication/messages/compose', name: 'Nuevo Mensaje', element: ComingSoon },
  { path: '/communication/messages/:id', name: 'Mensaje', element: ComingSoon },

  // Communication Routes - Database-Driven Features
  { path: '/communication/conversations', name: 'Conversaciones', element: ConversationManager },
  {
    path: '/communication/notifications',
    name: 'Centro de Notificaciones',
    element: NotificationCenter,
  },

  { path: '/communication/news', name: 'Noticias', element: ComingSoon },

  // Administration Routes - Core Features
  { path: '/admin/users', name: 'Usuarios', element: UserList, exact: true },
  { path: '/admin/users/create', name: 'Crear Usuario', element: ComingSoon },
  { path: '/admin/users/edit/:id', name: 'Editar Usuario', element: ComingSoon },
  { path: '/admin/users/:id', name: 'Detalle Usuario', element: ComingSoon },

  // Administration Routes - Database-Driven Features
  { path: '/admin/user-roles', name: 'Gestión de Roles', element: UserRoleManager },
  { path: '/admin/guardians', name: 'Relaciones Acudiente-Estudiante', element: GuardianManager },

  { path: '/admin/certificates', name: 'Certificados', element: ComingSoon },
  { path: '/admin/reports', name: 'Reportes', element: ComingSoon },
  { path: '/admin/settings', name: 'Configuración', element: ComingSoon },

  // Additional Academic Routes for Future Implementation
  { path: '/academic/evaluations', name: 'Evaluaciones', element: ComingSoon },
  { path: '/academic/curriculum', name: 'Plan de Estudios', element: ComingSoon },
  { path: '/academic/groups', name: 'Gestión de Grupos', element: ComingSoon },

  // Additional Communication Routes for Future Implementation
  { path: '/communication/announcements', name: 'Anuncios', element: ComingSoon },
  { path: '/communication/events', name: 'Eventos', element: ComingSoon },

  // Additional Administration Routes for Future Implementation
  { path: '/admin/institutions', name: 'Instituciones', element: ComingSoon },
  { path: '/admin/billing', name: 'Facturación', element: ComingSoon },
  { path: '/admin/audit', name: 'Auditoría', element: ComingSoon },
]

export default routes
