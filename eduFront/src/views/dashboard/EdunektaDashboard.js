import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CWidgetStatsA,
  CWidgetStatsF,
  CProgress,
  CAlert,
  CButton,
  CButtonGroup,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import { CChartLine, CChartBar, CChartDoughnut } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import {
  cilPeople,
  cilBook,
  cilTask,
  cilBadge,
  cilCalendar,
  cilBell,
  cilChartPie,
  // cilTrendingUp,
  cilEducation,
} from '@coreui/icons'
import LoadingSpinner from '../../components/common/LoadingSpinner'

const EdunektaDashboard = () => {
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('week')
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalStudents: 0,
      totalSubjects: 0,
      totalActivities: 0,
      completedCertificates: 0,
    },
    recentActivity: [],
    chartData: {
      enrollments: [],
      activities: [],
      performance: [],
    },
  })

  useEffect(() => {
    loadDashboardData()
  }, [timeRange])

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock data
      setDashboardData({
        stats: {
          totalStudents: 1247,
          totalSubjects: 45,
          totalActivities: 312,
          completedCertificates: 89,
        },
        recentActivity: [
          {
            id: 1,
            type: 'enrollment',
            message: 'Juan Pérez se inscribió en Matemáticas Avanzadas',
            time: '2 min ago',
            icon: cilPeople,
          },
          {
            id: 2,
            type: 'activity',
            message: 'Nueva actividad creada: Ejercicios de Álgebra',
            time: '15 min ago',
            icon: cilTask,
          },
          {
            id: 3,
            type: 'certificate',
            message: 'María García completó el curso de Física',
            time: '1 hora ago',
            icon: cilBadge,
          },
          {
            id: 4,
            type: 'subject',
            message: 'Nuevo curso disponible: Química Orgánica',
            time: '2 horas ago',
            icon: cilBook,
          },
        ],
        chartData: {
          enrollments: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [
              {
                label: 'Inscripciones',
                data: [65, 78, 90, 81, 95, 105],
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.1)',
                tension: 0.4,
              },
            ],
          },
          activities: {
            labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
            datasets: [
              {
                label: 'Actividades Completadas',
                data: [12, 19, 15, 25, 22, 18, 8],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          performance: {
            labels: ['Excelente', 'Bueno', 'Regular', 'Necesita Mejora'],
            datasets: [
              {
                data: [35, 40, 20, 5],
                backgroundColor: [
                  'rgba(40, 167, 69, 0.8)',
                  'rgba(23, 162, 184, 0.8)',
                  'rgba(255, 193, 7, 0.8)',
                  'rgba(220, 53, 69, 0.8)',
                ],
                borderWidth: 2,
              },
            ],
          },
        },
      })
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getActivityIcon = (type) => {
    const icons = {
      enrollment: cilPeople,
      activity: cilTask,
      certificate: cilBadge,
      subject: cilBook,
    }
    return icons[type] || cilBell
  }

  const getActivityColor = (type) => {
    const colors = {
      enrollment: 'primary',
      activity: 'success',
      certificate: 'warning',
      subject: 'info',
    }
    return colors[type] || 'secondary'
  }

  if (loading) {
    return <LoadingSpinner text="Cargando dashboard..." />
  }

  return (
    <>
      {/* Welcome Alert */}
      <CRow className="mb-4">
        <CCol xs={12}>
          <CAlert color="info" className="d-flex align-items-center">
            <CIcon icon={cilEducation} size="lg" className="me-3" />
            <div>
              <h4 className="alert-heading mb-1">¡Bienvenido a Edunekta!</h4>
              <p className="mb-0">
                Aquí tienes un resumen de la actividad reciente en tu plataforma educativa.
              </p>
            </div>
          </CAlert>
        </CCol>
      </CRow>

      {/* Stats Cards */}
      <CRow className="mb-4">
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="primary"
            value={dashboardData.stats.totalStudents.toLocaleString()}
            title="Estudiantes Activos"
            action={
              <CDropdown alignment="end">
                <CDropdownToggle color="transparent" caret={false} className="p-0">
                  <CIcon icon={cilCalendar} className="text-high-emphasis-inverse" />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>Hoy</CDropdownItem>
                  <CDropdownItem>Esta semana</CDropdownItem>
                  <CDropdownItem>Este mes</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            }
            chart={
              <CChartLine
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                  datasets: [
                    {
                      label: 'Estudiantes',
                      backgroundColor: 'transparent',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointBackgroundColor: 'rgba(255,255,255,.55)',
                      data: [1100, 1150, 1200, 1220, 1240, 1247],
                    },
                  ],
                }}
                options={{
                  plugins: { legend: { display: false } },
                  maintainAspectRatio: false,
                  scales: {
                    x: { display: false },
                    y: { display: false },
                  },
                  elements: {
                    line: { borderWidth: 1 },
                    point: { radius: 4, hitRadius: 10, hoverRadius: 4 },
                  },
                }}
              />
            }
          />
        </CCol>

        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="success"
            value={dashboardData.stats.totalSubjects.toString()}
            title="Asignaturas Disponibles"
            action={
              <CDropdown alignment="end">
                <CDropdownToggle color="transparent" caret={false} className="p-0">
                  <CIcon icon={cilBook} className="text-high-emphasis-inverse" />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>Ver todas</CDropdownItem>
                  <CDropdownItem>Más populares</CDropdownItem>
                  <CDropdownItem>Recientes</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            }
            chart={
              <CChartLine
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                  datasets: [
                    {
                      label: 'Asignaturas',
                      backgroundColor: 'transparent',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointBackgroundColor: 'rgba(255,255,255,.55)',
                      data: [35, 38, 40, 42, 44, 45],
                    },
                  ],
                }}
                options={{
                  plugins: { legend: { display: false } },
                  maintainAspectRatio: false,
                  scales: {
                    x: { display: false },
                    y: { display: false },
                  },
                  elements: {
                    line: { borderWidth: 1 },
                    point: { radius: 4, hitRadius: 10, hoverRadius: 4 },
                  },
                }}
              />
            }
          />
        </CCol>

        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="warning"
            value={dashboardData.stats.totalActivities.toString()}
            title="Actividades Creadas"
            action={
              <CDropdown alignment="end">
                <CDropdownToggle color="transparent" caret={false} className="p-0">
                  <CIcon icon={cilTask} className="text-high-emphasis-inverse" />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>Pendientes</CDropdownItem>
                  <CDropdownItem>Completadas</CDropdownItem>
                  <CDropdownItem>En progreso</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            }
            chart={
              <CChartLine
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                  datasets: [
                    {
                      label: 'Actividades',
                      backgroundColor: 'transparent',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointBackgroundColor: 'rgba(255,255,255,.55)',
                      data: [250, 270, 285, 295, 305, 312],
                    },
                  ],
                }}
                options={{
                  plugins: { legend: { display: false } },
                  maintainAspectRatio: false,
                  scales: {
                    x: { display: false },
                    y: { display: false },
                  },
                  elements: {
                    line: { borderWidth: 1 },
                    point: { radius: 4, hitRadius: 10, hoverRadius: 4 },
                  },
                }}
              />
            }
          />
        </CCol>

        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="info"
            value={dashboardData.stats.completedCertificates.toString()}
            title="Certificados Emitidos"
            action={
              <CDropdown alignment="end">
                <CDropdownToggle color="transparent" caret={false} className="p-0">
                  <CIcon icon={cilBadge} className="text-high-emphasis-inverse" />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>Este mes</CDropdownItem>
                  <CDropdownItem>Últimos 3 meses</CDropdownItem>
                  <CDropdownItem>Este año</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            }
            chart={
              <CChartLine
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                  datasets: [
                    {
                      label: 'Certificados',
                      backgroundColor: 'transparent',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointBackgroundColor: 'rgba(255,255,255,.55)',
                      data: [65, 70, 75, 80, 85, 89],
                    },
                  ],
                }}
                options={{
                  plugins: { legend: { display: false } },
                  maintainAspectRatio: false,
                  scales: {
                    x: { display: false },
                    y: { display: false },
                  },
                  elements: {
                    line: { borderWidth: 1 },
                    point: { radius: 4, hitRadius: 10, hoverRadius: 4 },
                  },
                }}
              />
            }
          />
        </CCol>
      </CRow>

      {/* Charts Row */}
      <CRow className="mb-4">
        <CCol md={8}>
          <CCard>
            <CCardHeader>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Inscripciones por Mes</h5>
                <CButtonGroup>
                  <CButton
                    color="outline-secondary"
                    size="sm"
                    active={timeRange === 'week'}
                    onClick={() => setTimeRange('week')}
                  >
                    Semana
                  </CButton>
                  <CButton
                    color="outline-secondary"
                    size="sm"
                    active={timeRange === 'month'}
                    onClick={() => setTimeRange('month')}
                  >
                    Mes
                  </CButton>
                  <CButton
                    color="outline-secondary"
                    size="sm"
                    active={timeRange === 'year'}
                    onClick={() => setTimeRange('year')}
                  >
                    Año
                  </CButton>
                </CButtonGroup>
              </div>
            </CCardHeader>
            <CCardBody>
              <CChartLine
                style={{ height: '300px' }}
                data={dashboardData.chartData.enrollments}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: true },
                  },
                  scales: {
                    x: { grid: { display: false } },
                    y: {
                      beginAtZero: true,
                      grid: { borderDash: [1, 3] },
                    },
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={4}>
          <CCard>
            <CCardHeader>
              <h5 className="mb-0">Rendimiento Estudiantil</h5>
            </CCardHeader>
            <CCardBody>
              <CChartDoughnut
                style={{ height: '300px' }}
                data={dashboardData.chartData.performance}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: true,
                      position: 'bottom',
                    },
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Activity Feed and Quick Actions */}
      <CRow>
        <CCol md={8}>
          <CCard>
            <CCardHeader>
              <h5 className="mb-0">Actividad Reciente</h5>
            </CCardHeader>
            <CCardBody>
              {dashboardData.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="d-flex align-items-center mb-3 pb-3 border-bottom"
                >
                  <div
                    className={`me-3 p-2 rounded-circle bg-${getActivityColor(activity.type)}-subtle`}
                  >
                    <CIcon
                      icon={getActivityIcon(activity.type)}
                      className={`text-${getActivityColor(activity.type)}`}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-semibold">{activity.message}</div>
                    <small className="text-muted">{activity.time}</small>
                  </div>
                </div>
              ))}
              <div className="text-center">
                <CButton color="outline-primary" size="sm">
                  Ver todas las actividades
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={4}>
          <CCard>
            <CCardHeader>
              <h5 className="mb-0">Acciones Rápidas</h5>
            </CCardHeader>
            <CCardBody>
              <div className="d-grid gap-2">
                <CButton color="primary" variant="outline">
                  <CIcon icon={cilBook} className="me-2" />
                  Crear Asignatura
                </CButton>
                <CButton color="success" variant="outline">
                  <CIcon icon={cilTask} className="me-2" />
                  Nueva Actividad
                </CButton>
                <CButton color="info" variant="outline">
                  <CIcon icon={cilPeople} className="me-2" />
                  Gestionar Usuarios
                </CButton>
                <CButton color="warning" variant="outline">
                  <CIcon icon={cilBadge} className="me-2" />
                  Emitir Certificado
                </CButton>
                <CButton color="secondary" variant="outline">
                  <CIcon icon={cilChartPie} className="me-2" />
                  Ver Reportes
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default EdunektaDashboard
