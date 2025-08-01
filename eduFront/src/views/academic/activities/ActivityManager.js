import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CBadge,
  CAlert,
  CForm,
  CFormSelect,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CSpinner,
  CFormTextarea,
  CProgress,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CTabs,
  CTabList,
  CTab,
  CTabContent,
  CTabPanel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPlus,
  cilPencil,
  cilTrash,
  cilTask,
  cilCalendar,
  cilClock,
  cilUser,
  cilSearch,
  cilSave,
  cilSettings,
  cilCheckAlt,
  cilX,
  cilCloudUpload,
  cilDocument,
  cilEye,
} from '@coreui/icons'
import DataTable from '../../../components/common/DataTable'
import ConfirmDialog from '../../../components/common/ConfirmDialog'

const ActivityManager = () => {
  const navigate = useNavigate()
  const [activities, setActivities] = useState([])
  const [subjects, setSubjects] = useState([])
  const [groups, setGroups] = useState([])
  const [periods, setPeriods] = useState([])
  const [evidences, setEvidences] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('activities')
  const [activityModal, setActivityModal] = useState({
    visible: false,
    activity: null,
    mode: 'create',
  })
  const [evidenceModal, setEvidenceModal] = useState({ visible: false, activity: null })
  const [deleteDialog, setDeleteDialog] = useState({ visible: false, activity: null })
  const [message, setMessage] = useState({ type: '', text: '' })
  const [filters, setFilters] = useState({
    asignatura: '',
    grupo: '',
    periodo: '',
    estado: '',
    search: '',
  })
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    asignatura_id: '',
    grupo_id: '',
    periodo_academico_id: '',
    fecha_inicio: '',
    fecha_fin: '',
    fecha_limite_entrega: '',
    puntaje_maximo: 100,
    tipo_actividad: 'Tarea',
    estado_actividad_id: 1,
    instrucciones: '',
    recursos_necesarios: '',
    criterios_evaluacion: '',
  })

  // Current user (mock)
  const currentUser = {
    id: 1,
    nombre: 'Juan Carlos',
    apellido: 'Pérez García',
    rol: 'Profesor',
  }

  const activityTypes = [
    'Tarea',
    'Proyecto',
    'Examen',
    'Quiz',
    'Ensayo',
    'Presentación',
    'Laboratorio',
    'Investigación',
  ]

  const activityStates = [
    { id: 1, nombre: 'Borrador', color: 'secondary' },
    { id: 2, nombre: 'Publicada', color: 'info' },
    { id: 3, nombre: 'En Progreso', color: 'warning' },
    { id: 4, nombre: 'Finalizada', color: 'success' },
    { id: 5, nombre: 'Cancelada', color: 'danger' },
  ]

  const evidenceStates = [
    { id: 1, nombre: 'Pendiente', color: 'warning' },
    { id: 2, nombre: 'Entregada', color: 'info' },
    { id: 3, nombre: 'Revisada', color: 'primary' },
    { id: 4, nombre: 'Calificada', color: 'success' },
    { id: 5, nombre: 'Rechazada', color: 'danger' },
  ]

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      // Simulate API calls
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data based on actividad and evidencia_actividad tables
      const mockSubjects = [
        { id: 1, nombre: 'Matemáticas', codigo: 'MAT101' },
        { id: 2, nombre: 'Español', codigo: 'ESP101' },
        { id: 3, nombre: 'Ciencias Naturales', codigo: 'CNA101' },
        { id: 4, nombre: 'Historia', codigo: 'HIS101' },
      ]

      const mockGroups = [
        { id: 1, nombre: '10-A', grado: 'Décimo' },
        { id: 2, nombre: '10-B', grado: 'Décimo' },
        { id: 3, nombre: '11-A', grado: 'Once' },
        { id: 4, nombre: '9-C', grado: 'Noveno' },
      ]

      const mockPeriods = [
        { id: 1, nombre: '2024-1', estado: 'Activo' },
        { id: 2, nombre: '2024-2', estado: 'Programado' },
        { id: 3, nombre: '2023-2', estado: 'Cerrado' },
      ]

      const mockActivities = [
        {
          id: 1,
          titulo: 'Ecuaciones Cuadráticas - Ejercicios',
          descripcion:
            'Resolver conjunto de ejercicios sobre ecuaciones cuadráticas aplicando diferentes métodos',
          asignatura_id: 1,
          asignatura: mockSubjects[0],
          grupo_id: 1,
          grupo: mockGroups[0],
          periodo_academico_id: 1,
          periodo: mockPeriods[0],
          fecha_inicio: '2024-07-25T08:00:00',
          fecha_fin: '2024-08-05T23:59:00',
          fecha_limite_entrega: '2024-08-05T23:59:00',
          puntaje_maximo: 100,
          tipo_actividad: 'Tarea',
          estado_actividad_id: 2,
          estado: 'Publicada',
          instrucciones:
            'Resolver los ejercicios del 1 al 20 de la página 145. Mostrar todo el procedimiento.',
          recursos_necesarios: 'Libro de texto, calculadora, hojas cuadriculadas',
          criterios_evaluacion:
            'Procedimiento correcto (60%), Resultado final (30%), Presentación (10%)',
          fecha_creacion: '2024-07-20T10:00:00',
          usuario_creador_id: 1,
          creador: currentUser,
          // Statistics
          total_estudiantes: 25,
          entregas_pendientes: 8,
          entregas_realizadas: 17,
          promedio_calificacion: 85.5,
        },
        {
          id: 2,
          titulo: 'Ensayo: Literatura del Siglo XX',
          descripcion:
            'Ensayo argumentativo sobre las características principales de la literatura del siglo XX',
          asignatura_id: 2,
          asignatura: mockSubjects[1],
          grupo_id: 1,
          grupo: mockGroups[0],
          periodo_academico_id: 1,
          periodo: mockPeriods[0],
          fecha_inicio: '2024-07-28T08:00:00',
          fecha_fin: '2024-08-10T23:59:00',
          fecha_limite_entrega: '2024-08-10T23:59:00',
          puntaje_maximo: 100,
          tipo_actividad: 'Ensayo',
          estado_actividad_id: 3,
          estado: 'En Progreso',
          instrucciones:
            'Redactar un ensayo de mínimo 1000 palabras sobre las características de la literatura del siglo XX.',
          recursos_necesarios: 'Fuentes bibliográficas, procesador de texto',
          criterios_evaluacion:
            'Contenido (40%), Estructura (30%), Gramática y ortografía (20%), Referencias (10%)',
          fecha_creacion: '2024-07-25T14:30:00',
          usuario_creador_id: 1,
          creador: currentUser,
          total_estudiantes: 25,
          entregas_pendientes: 20,
          entregas_realizadas: 5,
          promedio_calificacion: 78.2,
        },
        {
          id: 3,
          titulo: 'Proyecto: Sistema Solar',
          descripcion: 'Investigación y presentación sobre el sistema solar y sus componentes',
          asignatura_id: 3,
          asignatura: mockSubjects[2],
          grupo_id: 2,
          grupo: mockGroups[1],
          periodo_academico_id: 1,
          periodo: mockPeriods[0],
          fecha_inicio: '2024-07-30T08:00:00',
          fecha_fin: '2024-08-15T23:59:00',
          fecha_limite_entrega: '2024-08-15T23:59:00',
          puntaje_maximo: 150,
          tipo_actividad: 'Proyecto',
          estado_actividad_id: 2,
          estado: 'Publicada',
          instrucciones:
            'Crear una presentación interactiva sobre el sistema solar incluyendo planetas, lunas y otros cuerpos celestes.',
          recursos_necesarios:
            'Material de investigación, herramientas de presentación, materiales para maqueta (opcional)',
          criterios_evaluacion:
            'Investigación (35%), Presentación (25%), Creatividad (25%), Participación (15%)',
          fecha_creacion: '2024-07-28T09:15:00',
          usuario_creador_id: 1,
          creador: currentUser,
          total_estudiantes: 28,
          entregas_pendientes: 28,
          entregas_realizadas: 0,
          promedio_calificacion: 0,
        },
      ]

      const mockEvidences = [
        {
          id: 1,
          actividad_id: 1,
          actividad: mockActivities[0],
          usuario_id_estudiante: 10,
          estudiante: { nombre: 'Ana María', apellido: 'García López' },
          fecha_entrega: '2024-08-03T20:30:00',
          descripcion_entrega: 'Ejercicios resueltos con procedimiento completo',
          archivo_evidencia: 'ecuaciones_cuadraticas_ana_garcia.pdf',
          estado_evidencia_id: 4,
          estado: 'Calificada',
          calificacion: 92,
          comentarios_profesor: 'Excelente trabajo. Procedimientos claros y resultados correctos.',
          fecha_calificacion: '2024-08-04T10:15:00',
        },
        {
          id: 2,
          actividad_id: 1,
          actividad: mockActivities[0],
          usuario_id_estudiante: 11,
          estudiante: { nombre: 'Carlos Eduardo', apellido: 'Martínez Silva' },
          fecha_entrega: '2024-08-05T22:45:00',
          descripcion_entrega: 'Resolución de ejercicios matemáticos',
          archivo_evidencia: 'tarea_matematicas_carlos.pdf',
          estado_evidencia_id: 2,
          estado: 'Entregada',
          calificacion: null,
          comentarios_profesor: null,
          fecha_calificacion: null,
        },
        {
          id: 3,
          actividad_id: 2,
          actividad: mockActivities[1],
          usuario_id_estudiante: 12,
          estudiante: { nombre: 'María Fernanda', apellido: 'Rodríguez Pérez' },
          fecha_entrega: '2024-08-08T18:20:00',
          descripcion_entrega:
            'Ensayo sobre literatura del siglo XX con análisis de autores principales',
          archivo_evidencia: 'ensayo_literatura_maria.docx',
          estado_evidencia_id: 3,
          estado: 'Revisada',
          calificacion: null,
          comentarios_profesor: 'Buen análisis, revisar algunas referencias bibliográficas.',
          fecha_calificacion: null,
        },
      ]

      setActivities(mockActivities)
      setSubjects(mockSubjects)
      setGroups(mockGroups)
      setPeriods(mockPeriods)
      setEvidences(mockEvidences)
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al cargar las actividades' })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateActivity = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      asignatura_id: '',
      grupo_id: '',
      periodo_academico_id: periods.find((p) => p.estado === 'Activo')?.id || '',
      fecha_inicio: '',
      fecha_fin: '',
      fecha_limite_entrega: '',
      puntaje_maximo: 100,
      tipo_actividad: 'Tarea',
      estado_actividad_id: 1,
      instrucciones: '',
      recursos_necesarios: '',
      criterios_evaluacion: '',
    })
    setActivityModal({ visible: true, activity: null, mode: 'create' })
  }

  const handleEditActivity = (activity) => {
    setFormData({
      titulo: activity.titulo,
      descripcion: activity.descripcion,
      asignatura_id: activity.asignatura_id,
      grupo_id: activity.grupo_id,
      periodo_academico_id: activity.periodo_academico_id,
      fecha_inicio: activity.fecha_inicio ? activity.fecha_inicio.slice(0, 16) : '',
      fecha_fin: activity.fecha_fin ? activity.fecha_fin.slice(0, 16) : '',
      fecha_limite_entrega: activity.fecha_limite_entrega
        ? activity.fecha_limite_entrega.slice(0, 16)
        : '',
      puntaje_maximo: activity.puntaje_maximo,
      tipo_actividad: activity.tipo_actividad,
      estado_actividad_id: activity.estado_actividad_id,
      instrucciones: activity.instrucciones || '',
      recursos_necesarios: activity.recursos_necesarios || '',
      criterios_evaluacion: activity.criterios_evaluacion || '',
    })
    setActivityModal({ visible: true, activity, mode: 'edit' })
  }

  const handleDeleteActivity = (activity) => {
    setDeleteDialog({ visible: true, activity })
  }

  const handleViewEvidences = (activity) => {
    setEvidenceModal({ visible: true, activity })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const required = [
      'titulo',
      'descripcion',
      'asignatura_id',
      'grupo_id',
      'periodo_academico_id',
      'fecha_limite_entrega',
    ]
    const missing = required.filter((field) => !formData[field])

    if (missing.length > 0) {
      setMessage({ type: 'danger', text: 'Por favor, complete todos los campos obligatorios' })
      return false
    }

    if (
      formData.fecha_inicio &&
      formData.fecha_fin &&
      new Date(formData.fecha_inicio) >= new Date(formData.fecha_fin)
    ) {
      setMessage({ type: 'danger', text: 'La fecha de inicio debe ser anterior a la fecha de fin' })
      return false
    }

    if (formData.puntaje_maximo <= 0) {
      setMessage({ type: 'danger', text: 'El puntaje máximo debe ser mayor a 0' })
      return false
    }

    return true
  }

  const saveActivity = async () => {
    if (!validateForm()) return

    try {
      setLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const subject = subjects.find((s) => s.id === parseInt(formData.asignatura_id))
      const group = groups.find((g) => g.id === parseInt(formData.grupo_id))
      const period = periods.find((p) => p.id === parseInt(formData.periodo_academico_id))
      const state = activityStates.find((s) => s.id === parseInt(formData.estado_actividad_id))

      if (activityModal.mode === 'create') {
        // Add new activity
        const newActivity = {
          id: Date.now(),
          ...formData,
          asignatura_id: parseInt(formData.asignatura_id),
          grupo_id: parseInt(formData.grupo_id),
          periodo_academico_id: parseInt(formData.periodo_academico_id),
          estado_actividad_id: parseInt(formData.estado_actividad_id),
          puntaje_maximo: parseFloat(formData.puntaje_maximo),
          asignatura: subject,
          grupo: group,
          periodo: period,
          estado: state.nombre,
          fecha_creacion: new Date().toISOString(),
          usuario_creador_id: currentUser.id,
          creador: currentUser,
          total_estudiantes: 25, // Mock value
          entregas_pendientes: 25,
          entregas_realizadas: 0,
          promedio_calificacion: 0,
        }
        setActivities((prev) => [newActivity, ...prev])
        setMessage({ type: 'success', text: 'Actividad creada exitosamente' })
      } else {
        // Update existing activity
        setActivities((prev) =>
          prev.map((a) =>
            a.id === activityModal.activity.id
              ? {
                  ...a,
                  ...formData,
                  asignatura_id: parseInt(formData.asignatura_id),
                  grupo_id: parseInt(formData.grupo_id),
                  periodo_academico_id: parseInt(formData.periodo_academico_id),
                  estado_actividad_id: parseInt(formData.estado_actividad_id),
                  puntaje_maximo: parseFloat(formData.puntaje_maximo),
                  asignatura: subject,
                  grupo: group,
                  periodo: period,
                  estado: state.nombre,
                }
              : a,
          ),
        )
        setMessage({ type: 'success', text: 'Actividad actualizada exitosamente' })
      }

      setActivityModal({ visible: false, activity: null, mode: 'create' })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al guardar la actividad' })
    } finally {
      setLoading(false)
    }
  }

  const confirmDelete = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setActivities((prev) => prev.filter((a) => a.id !== deleteDialog.activity.id))
      setMessage({ type: 'success', text: 'Actividad eliminada exitosamente' })
      setDeleteDialog({ visible: false, activity: null })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al eliminar la actividad' })
    }
  }

  const getStateInfo = (stateId) => {
    return activityStates.find((s) => s.id === stateId) || activityStates[0]
  }

  const getEvidenceStateInfo = (stateId) => {
    return evidenceStates.find((s) => s.id === stateId) || evidenceStates[0]
  }

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const calculateProgress = (activity) => {
    if (activity.total_estudiantes === 0) return 0
    return Math.round((activity.entregas_realizadas / activity.total_estudiantes) * 100)
  }

  const filteredActivities = activities.filter((activity) => {
    return (
      (!filters.asignatura || activity.asignatura_id.toString() === filters.asignatura) &&
      (!filters.grupo || activity.grupo_id.toString() === filters.grupo) &&
      (!filters.periodo || activity.periodo_academico_id.toString() === filters.periodo) &&
      (!filters.estado || activity.estado === filters.estado) &&
      (!filters.search ||
        activity.titulo.toLowerCase().includes(filters.search.toLowerCase()) ||
        activity.descripcion.toLowerCase().includes(filters.search.toLowerCase()))
    )
  })

  const activityColumns = [
    {
      key: 'titulo',
      label: 'Actividad',
      render: (value, item) => (
        <div>
          <div className="fw-semibold">{item.titulo}</div>
          <small className="text-muted">{item.descripcion}</small>
          <div className="mt-1">
            <CBadge color="info" className="me-1">
              {item.tipo_actividad}
            </CBadge>
            <CBadge color={getStateInfo(item.estado_actividad_id).color}>{item.estado}</CBadge>
          </div>
        </div>
      ),
    },
    {
      key: 'asignatura',
      label: 'Asignatura/Grupo',
      render: (value, item) => (
        <div>
          <div className="fw-semibold">{item.asignatura.nombre}</div>
          <small className="text-muted">
            {item.grupo.nombre} - {item.grupo.grado}
          </small>
          <div>
            <small className="text-muted">Período: {item.periodo.nombre}</small>
          </div>
        </div>
      ),
    },
    {
      key: 'fechas',
      label: 'Fechas',
      render: (value, item) => (
        <div>
          <div>
            <small>
              <strong>Límite:</strong> {formatDateTime(item.fecha_limite_entrega)}
            </small>
          </div>
          {item.fecha_inicio && (
            <div>
              <small>
                <strong>Inicio:</strong> {formatDateTime(item.fecha_inicio)}
              </small>
            </div>
          )}
          {item.fecha_fin && (
            <div>
              <small>
                <strong>Fin:</strong> {formatDateTime(item.fecha_fin)}
              </small>
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'progreso',
      label: 'Progreso',
      render: (value, item) => {
        const progress = calculateProgress(item)
        return (
          <div>
            <CProgress value={progress} className="mb-1" />
            <small className="text-muted">
              {item.entregas_realizadas}/{item.total_estudiantes} ({progress}%)
            </small>
            <div>
              <small className="text-muted">Promedio: {item.promedio_calificacion || 'N/A'}</small>
            </div>
          </div>
        )
      },
    },
    {
      key: 'puntaje',
      label: 'Puntaje',
      render: (value, item) => (
        <div className="text-center">
          <h6 className="mb-0">{item.puntaje_maximo}</h6>
          <small className="text-muted">puntos</small>
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Acciones',
      sortable: false,
      render: (value, item) => (
        <div className="d-flex gap-2">
          <CButton
            color="success"
            variant="outline"
            size="sm"
            onClick={() => handleViewEvidences(item)}
            title="Ver entregas"
          >
            <CIcon icon={cilEye} size="sm" />
          </CButton>
          <CButton
            color="info"
            variant="outline"
            size="sm"
            onClick={() => handleEditActivity(item)}
            title="Editar actividad"
          >
            <CIcon icon={cilPencil} size="sm" />
          </CButton>
          <CButton
            color="danger"
            variant="outline"
            size="sm"
            onClick={() => handleDeleteActivity(item)}
            title="Eliminar actividad"
            disabled={item.entregas_realizadas > 0}
          >
            <CIcon icon={cilTrash} size="sm" />
          </CButton>
        </div>
      ),
    },
  ]

  const evidenceColumns = [
    {
      key: 'estudiante',
      label: 'Estudiante',
      render: (value, item) => (
        <div>
          <div className="fw-semibold">
            {item.estudiante.nombre} {item.estudiante.apellido}
          </div>
          <small className="text-muted">
            Entregado: {item.fecha_entrega ? formatDateTime(item.fecha_entrega) : 'No entregado'}
          </small>
        </div>
      ),
    },
    {
      key: 'estado',
      label: 'Estado',
      render: (value, item) => (
        <CBadge color={getEvidenceStateInfo(item.estado_evidencia_id).color}>{item.estado}</CBadge>
      ),
    },
    {
      key: 'calificacion',
      label: 'Calificación',
      render: (value, item) => (
        <div className="text-center">
          {item.calificacion !== null ? (
            <h6 className="mb-0">{item.calificacion}</h6>
          ) : (
            <small className="text-muted">Pendiente</small>
          )}
        </div>
      ),
    },
    {
      key: 'archivo',
      label: 'Archivo',
      render: (value, item) => (
        <div>
          {item.archivo_evidencia ? (
            <CButton color="link" size="sm">
              <CIcon icon={cilDocument} className="me-1" />
              {item.archivo_evidencia}
            </CButton>
          ) : (
            <small className="text-muted">Sin archivo</small>
          )}
        </div>
      ),
    },
  ]

  return (
    <>
      <CRow>
        <CCol xs={12}>
          {message.text && (
            <CAlert
              color={message.type}
              dismissible
              onClose={() => setMessage({ type: '', text: '' })}
              className="mb-3"
            >
              {message.text}
            </CAlert>
          )}

          {/* Summary Cards */}
          <CRow className="mb-3">
            <CCol md={3}>
              <CCard className="text-center">
                <CCardBody>
                  <h4 className="text-primary">{activities.length}</h4>
                  <small className="text-muted">Total Actividades</small>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={3}>
              <CCard className="text-center">
                <CCardBody>
                  <h4 className="text-success">
                    {activities.filter((a) => a.estado === 'Publicada').length}
                  </h4>
                  <small className="text-muted">Publicadas</small>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={3}>
              <CCard className="text-center">
                <CCardBody>
                  <h4 className="text-warning">
                    {activities.filter((a) => a.estado === 'En Progreso').length}
                  </h4>
                  <small className="text-muted">En Progreso</small>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={3}>
              <CCard className="text-center">
                <CCardBody>
                  <h4 className="text-info">{evidences.length}</h4>
                  <small className="text-muted">Total Entregas</small>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          <CTabs activeItemKey={activeTab} onActiveItemChange={setActiveTab}>
            <CTabList variant="tabs">
              <CTab itemKey="activities">
                <CIcon icon={cilTask} className="me-2" />
                Gestión de Actividades
              </CTab>
              <CTab itemKey="evidences">
                <CIcon icon={cilDocument} className="me-2" />
                Entregas y Evidencias
              </CTab>
            </CTabList>

            <CTabContent>
              <CTabPanel itemKey="activities">
                {/* Activity Filters */}
                <CCard className="mb-3">
                  <CCardBody>
                    <CRow>
                      <CCol md={2}>
                        <CFormSelect
                          value={filters.asignatura}
                          onChange={(e) =>
                            setFilters((prev) => ({ ...prev, asignatura: e.target.value }))
                          }
                        >
                          <option value="">Todas las asignaturas</option>
                          {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                              {subject.nombre}
                            </option>
                          ))}
                        </CFormSelect>
                      </CCol>
                      <CCol md={2}>
                        <CFormSelect
                          value={filters.grupo}
                          onChange={(e) =>
                            setFilters((prev) => ({ ...prev, grupo: e.target.value }))
                          }
                        >
                          <option value="">Todos los grupos</option>
                          {groups.map((group) => (
                            <option key={group.id} value={group.id}>
                              {group.nombre}
                            </option>
                          ))}
                        </CFormSelect>
                      </CCol>
                      <CCol md={2}>
                        <CFormSelect
                          value={filters.estado}
                          onChange={(e) =>
                            setFilters((prev) => ({ ...prev, estado: e.target.value }))
                          }
                        >
                          <option value="">Todos los estados</option>
                          {activityStates.map((state) => (
                            <option key={state.id} value={state.nombre}>
                              {state.nombre}
                            </option>
                          ))}
                        </CFormSelect>
                      </CCol>
                      <CCol md={6}>
                        <CInputGroup>
                          <CInputGroupText>
                            <CIcon icon={cilSearch} />
                          </CInputGroupText>
                          <CFormInput
                            placeholder="Buscar actividades..."
                            value={filters.search}
                            onChange={(e) =>
                              setFilters((prev) => ({ ...prev, search: e.target.value }))
                            }
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>

                <DataTable
                  data={filteredActivities}
                  columns={activityColumns}
                  title="Gestión de Actividades Académicas"
                  loading={loading}
                  searchable={false}
                  sortable={true}
                  paginated={true}
                  pageSize={10}
                  actions={
                    <CButton
                      color="primary"
                      onClick={handleCreateActivity}
                      className="d-flex align-items-center"
                    >
                      <CIcon icon={cilPlus} className="me-2" />
                      Nueva Actividad
                    </CButton>
                  }
                />
              </CTabPanel>

              <CTabPanel itemKey="evidences">
                <DataTable
                  data={evidences}
                  columns={evidenceColumns}
                  title="Entregas y Evidencias de Actividades"
                  loading={loading}
                  searchable={true}
                  sortable={true}
                  paginated={true}
                  pageSize={15}
                />
              </CTabPanel>
            </CTabContent>
          </CTabs>
        </CCol>
      </CRow>

      {/* Activity Modal */}
      <CModal
        visible={activityModal.visible}
        onClose={() => setActivityModal({ visible: false, activity: null, mode: 'create' })}
        size="xl"
      >
        <CModalHeader>
          <CModalTitle>
            {activityModal.mode === 'create' ? 'Crear Nueva Actividad' : 'Editar Actividad'}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow>
              <CCol md={8} className="mb-3">
                <label className="form-label">Título de la Actividad *</label>
                <CFormInput
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  placeholder="Título descriptivo de la actividad"
                  required
                />
              </CCol>
              <CCol md={4} className="mb-3">
                <label className="form-label">Tipo de Actividad</label>
                <CFormSelect
                  name="tipo_actividad"
                  value={formData.tipo_actividad}
                  onChange={handleInputChange}
                >
                  {activityTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={4} className="mb-3">
                <label className="form-label">Asignatura *</label>
                <CFormSelect
                  name="asignatura_id"
                  value={formData.asignatura_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccionar asignatura</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.nombre} ({subject.codigo})
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={4} className="mb-3">
                <label className="form-label">Grupo *</label>
                <CFormSelect
                  name="grupo_id"
                  value={formData.grupo_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccionar grupo</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.nombre} - {group.grado}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={4} className="mb-3">
                <label className="form-label">Período Académico *</label>
                <CFormSelect
                  name="periodo_academico_id"
                  value={formData.periodo_academico_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccionar período</option>
                  {periods.map((period) => (
                    <option key={period.id} value={period.id}>
                      {period.nombre} ({period.estado})
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12} className="mb-3">
                <label className="form-label">Descripción *</label>
                <CFormTextarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Descripción detallada de la actividad..."
                  required
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md={4} className="mb-3">
                <label className="form-label">Fecha de Inicio</label>
                <CFormInput
                  type="datetime-local"
                  name="fecha_inicio"
                  value={formData.fecha_inicio}
                  onChange={handleInputChange}
                />
              </CCol>
              <CCol md={4} className="mb-3">
                <label className="form-label">Fecha de Fin</label>
                <CFormInput
                  type="datetime-local"
                  name="fecha_fin"
                  value={formData.fecha_fin}
                  onChange={handleInputChange}
                />
              </CCol>
              <CCol md={4} className="mb-3">
                <label className="form-label">Fecha Límite de Entrega *</label>
                <CFormInput
                  type="datetime-local"
                  name="fecha_limite_entrega"
                  value={formData.fecha_limite_entrega}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6} className="mb-3">
                <label className="form-label">Puntaje Máximo</label>
                <CFormInput
                  type="number"
                  name="puntaje_maximo"
                  value={formData.puntaje_maximo}
                  onChange={handleInputChange}
                  min="1"
                  step="0.1"
                />
              </CCol>
              <CCol md={6} className="mb-3">
                <label className="form-label">Estado</label>
                <CFormSelect
                  name="estado_actividad_id"
                  value={formData.estado_actividad_id}
                  onChange={handleInputChange}
                >
                  {activityStates.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.nombre}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12} className="mb-3">
                <label className="form-label">Instrucciones</label>
                <CFormTextarea
                  name="instrucciones"
                  value={formData.instrucciones}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Instrucciones detalladas para los estudiantes..."
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6} className="mb-3">
                <label className="form-label">Recursos Necesarios</label>
                <CFormTextarea
                  name="recursos_necesarios"
                  value={formData.recursos_necesarios}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Materiales, herramientas, recursos necesarios..."
                />
              </CCol>
              <CCol md={6} className="mb-3">
                <label className="form-label">Criterios de Evaluación</label>
                <CFormTextarea
                  name="criterios_evaluacion"
                  value={formData.criterios_evaluacion}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Criterios y ponderaciones para la evaluación..."
                />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setActivityModal({ visible: false, activity: null, mode: 'create' })}
          >
            Cancelar
          </CButton>
          <CButton color="primary" onClick={saveActivity} disabled={loading}>
            {loading ? (
              <>
                <CSpinner size="sm" className="me-2" />
                Guardando...
              </>
            ) : (
              <>
                <CIcon icon={cilSave} className="me-2" />
                {activityModal.mode === 'create' ? 'Crear Actividad' : 'Actualizar Actividad'}
              </>
            )}
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Evidence Modal */}
      <CModal
        visible={evidenceModal.visible}
        onClose={() => setEvidenceModal({ visible: false, activity: null })}
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>Entregas - {evidenceModal.activity?.titulo}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {evidenceModal.activity && (
            <div>
              <div className="mb-3">
                <strong>Actividad:</strong> {evidenceModal.activity.titulo}
                <br />
                <strong>Asignatura:</strong> {evidenceModal.activity.asignatura?.nombre}
                <br />
                <strong>Grupo:</strong> {evidenceModal.activity.grupo?.nombre}
                <br />
                <strong>Fecha límite:</strong>{' '}
                {formatDateTime(evidenceModal.activity.fecha_limite_entrega)}
              </div>

              <DataTable
                data={evidences.filter((e) => e.actividad_id === evidenceModal.activity.id)}
                columns={evidenceColumns}
                title=""
                loading={false}
                searchable={true}
                sortable={true}
                paginated={true}
                pageSize={10}
              />
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setEvidenceModal({ visible: false, activity: null })}
          >
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        visible={deleteDialog.visible}
        onClose={() => setDeleteDialog({ visible: false, activity: null })}
        onConfirm={confirmDelete}
        title="Eliminar Actividad"
        message={`¿Está seguro de que desea eliminar la actividad "${deleteDialog.activity?.titulo}"? Esta acción no se puede deshacer.`}
        type="danger"
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </>
  )
}

export default ActivityManager
