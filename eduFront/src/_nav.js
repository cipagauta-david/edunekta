import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilBook,
  cilTask,
  cilPeople,
  cilSpeech,
  cilEnvelopeOpen,
  cilNewspaper,
  cilBell,
  cilBadge,
  cilSettings,
  cilChartPie,
  cilUser,
  cilEducation,
  cilCalendar,
  cilFolder,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'INICIO',
    },
  },
  {
    component: CNavTitle,
    name: 'Académico',
  },
  {
    component: CNavGroup,
    name: 'Asignaturas',
    to: '/academic/subjects',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Lista de Asignaturas',
        to: '/academic/subjects',
      },
      {
        component: CNavItem,
        name: 'Crear Asignatura',
        to: '/academic/subjects/create',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Actividades',
    to: '/academic/activities',
    icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Lista de Actividades',
        to: '/academic/activities',
      },
      {
        component: CNavItem,
        name: 'Crear Actividad',
        to: '/academic/activities/create',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Inscripciones',
    to: '/academic/enrollment',
    icon: <CIcon icon={cilFolder} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Comunicación',
  },
  {
    component: CNavItem,
    name: 'Foros',
    to: '/communication/forum',
    icon: <CIcon icon={cilSpeech} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Mensajes',
    to: '/communication/messages',
    icon: <CIcon icon={cilEnvelopeOpen} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Noticias',
    to: '/communication/news',
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Notificaciones',
    to: '/communication/notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Administración',
  },
  {
    component: CNavGroup,
    name: 'Usuarios',
    to: '/admin/users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Lista de Usuarios',
        to: '/admin/users',
      },
      {
        component: CNavItem,
        name: 'Crear Usuario',
        to: '/admin/users/create',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Certificados',
    to: '/admin/certificates',
    icon: <CIcon icon={cilBadge} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Reportes',
    to: '/admin/reports',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Configuración',
    to: '/admin/settings',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Mi Cuenta',
  },
  {
    component: CNavItem,
    name: 'Mi Perfil',
    to: '/profile',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
]

export default _nav
