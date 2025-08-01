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
  CProgress,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPlus,
  cilPencil,
  cilTrash,
  cilTask,
  cilCalendar,
  cilClock,
  cilCheckCircle,
} from '@coreui/icons'
import DataTable from '../../../components/common/DataTable'
import ConfirmDialog from '../../../components/common/ConfirmDialog'

const ActivityList = () => {
  const navigate = useNavigate()
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteDialog, setDeleteDialog] = useState({ visible: false, activity: null })
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    loadActivities()
  }, [])

  const loadActivities = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data
      const mockActivities = [
        {
          id: 1,
          title: 'Ejercicios de Álgebra Lineal',
          description: 'Práctica de sistemas de ecuaciones y matrices',
          subject: 'Matemáticas Avanzadas',
          type: 'exercise',
          status: 'active',
          dueDate: '2024-08-15',
          createdDate: '2024-07-20',
          totalStudents: 45,
          completedStudents: 32,
          instructor: 'Dr. Juan Pérez',
          estimatedTime: '2 horas',
          difficulty: 'medium',
        },
        {
          id: 2,
          title: 'Ensayo sobre la Revolución Francesa',
          description: 'Análisis crítico de las causas y consecuencias',
          subject: 'Historia Universal',
          type: 'assignment',
          status: 'active',
          dueDate: '2024-08-20',
          createdDate: '2024-07-25',
          totalStudents: 32,
          completedStudents: 18,
          instructor: 'Prof. María García',
          estimatedTime: '4 horas',
          difficulty: 'hard',
        },
        {
          id: 3,
          title: 'Laboratorio de Reacciones Químicas',
          description: 'Experimentos prácticos con compuestos orgánicos',
          subject: 'Química Orgánica',
          type: 'lab',
          status: 'scheduled',
          dueDate: '2024-08-25',
          createdDate: '2024-08-01',
          totalStudents: 28,
          completedStudents: 0,
          instructor: 'Dr. Carlos López',
          estimatedTime: '3 horas',
          difficulty: 'hard',
        },
        {
          id: 4,
          title: 'Quiz de Literatura Contemporánea',
          description: 'Evaluación sobre autores del siglo XX',
          subject: 'Literatura Contemporánea',
          type: 'quiz',
          status: 'completed',
          dueDate: '2024-07-30',
          createdDate: '2024-07-15',
          totalStudents: 25,
          completedStudents: 25,
          instructor: 'Prof. Ana Martínez',
          estimatedTime: '1 hora',
          difficulty: 'easy',
        },
        {
          id: 5,
          title: 'Proyecto Final - Aplicación Web',
          description: 'Desarrollo de una aplicación web completa',
          subject: 'Programación Web',
          type: 'project',
          status: 'active',
          dueDate: '2024-09-15',
          createdDate: '2024-07-01',
          totalStudents: 38,
          completedStudents: 5,
          instructor: 'Ing. Roberto Silva',
          estimatedTime: '40 horas',
          difficulty: 'hard',
        },
      ]

      setActivities(mockActivities)
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al cargar las actividades' })
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    navigate('/academic/activities/create')
  }

  const handleEdit = (activity) => {
    navigate(`/academic/activities/edit/${activity.id}`)
  }

  const handleDelete = (activity) => {
    setDeleteDialog({ visible: true, activity })
  }

  const confirmDelete = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setActivities((prev) => prev.filter((a) => a.id !== deleteDialog.activity.id))
      setMessage({ type: 'success', text: 'Actividad eliminada exitosamente' })
      setDeleteDialog({ visible: false, activity: null })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al eliminar la actividad' })
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'success', text: 'Activa' },
      scheduled: { color: 'warning', text: 'Programada' },
      completed: { color: 'info', text: 'Completada' },
      cancelled: { color: 'danger', text: 'Cancelada' },
      draft: { color: 'secondary', text: 'Borrador' },
    }
    const config = statusConfig[status] || statusConfig.draft
    return <CBadge color={config.color}>{config.text}</CBadge>
  }

  const getTypeBadge = (type) => {
    const typeConfig = {
      exercise: { color: 'primary', text: 'Ejercicio' },
      assignment: { color: 'info', text: 'Tarea' },
      quiz: { color: 'warning', text: 'Quiz' },
      exam: { color: 'danger', text: 'Examen' },
      project: { color: 'success', text: 'Proyecto' },
      lab: { color: 'secondary', text: 'Laboratorio' },
    }
    const config = typeConfig[type] || typeConfig.exercise
    return (
      <CBadge color={config.color} variant="outline">
        {config.text}
      </CBadge>
    )
  }

  const getDifficultyBadge = (difficulty) => {
    const difficultyConfig = {
      easy: { color: 'success', text: 'Fácil' },
      medium: { color: 'warning', text: 'Medio' },
      hard: { color: 'danger', text: 'Difícil' },
    }
    const config = difficultyConfig[difficulty] || difficultyConfig.medium
    return (
      <CBadge color={config.color} shape="rounded-pill">
        {config.text}
      </CBadge>
    )
  }

  const getCompletionProgress = (completed, total) => {
    const percentage = total > 0 ? (completed / total) * 100 : 0
    let color = 'success'
    if (percentage < 30) color = 'danger'
    else if (percentage < 70) color = 'warning'

    return (
      <div className="d-flex align-items-center">
        <span className="me-2 small">
          {completed}/{total}
        </span>
        <div className="flex-grow-1" style={{ minWidth: '80px' }}>
          <CProgress thin color={color} value={percentage} className="mb-0" />
        </div>
        <span className="ms-2 small text-muted">{Math.round(percentage)}%</span>
      </div>
    )
  }

  const isOverdue = (dueDate, status) => {
    return status === 'active' && new Date(dueDate) < new Date()
  }

  const columns = [
    {
      key: 'title',
      label: 'Actividad',
      render: (value, item) => (
        <div>
          <div className="fw-semibold d-flex align-items-center">
            {value}
            {isOverdue(item.dueDate, item.status) && (
              <CBadge color="danger" className="ms-2">
                Vencida
              </CBadge>
            )}
          </div>
          <small className="text-muted">{item.subject}</small>
          <div className="mt-1">
            {getTypeBadge(item.type)}
            <span className="ms-2">{getDifficultyBadge(item.difficulty)}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'instructor',
      label: 'Instructor',
    },
    {
      key: 'completedStudents',
      label: 'Progreso',
      render: (value, item) => getCompletionProgress(value, item.totalStudents),
    },
    {
      key: 'dueDate',
      label: 'Fecha Límite',
      render: (value, item) => (
        <div>
          <div className={isOverdue(value, item.status) ? 'text-danger fw-semibold' : ''}>
            {new Date(value).toLocaleDateString('es-ES')}
          </div>
          <small className="text-muted">
            <CIcon icon={cilClock} size="sm" className="me-1" />
            {item.estimatedTime}
          </small>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Estado',
      render: (value) => getStatusBadge(value),
    },
    {
      key: 'actions',
      label: 'Acciones',
      sortable: false,
      render: (value, item) => (
        <div className="d-flex gap-2">
          <CButton
            color="info"
            variant="outline"
            size="sm"
            onClick={() => handleEdit(item)}
            title="Editar"
          >
            <CIcon icon={cilPencil} size="sm" />
          </CButton>
          <CButton
            color="danger"
            variant="outline"
            size="sm"
            onClick={() => handleDelete(item)}
            title="Eliminar"
            disabled={item.status === 'active' && item.completedStudents > 0}
          >
            <CIcon icon={cilTrash} size="sm" />
          </CButton>
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

          <DataTable
            data={activities}
            columns={columns}
            title="Gestión de Actividades"
            loading={loading}
            searchable={true}
            sortable={true}
            paginated={true}
            pageSize={10}
            actions={
              <CButton color="primary" onClick={handleCreate} className="d-flex align-items-center">
                <CIcon icon={cilPlus} className="me-2" />
                Nueva Actividad
              </CButton>
            }
            onRowClick={(activity) => navigate(`/academic/activities/${activity.id}`)}
          />
        </CCol>
      </CRow>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        visible={deleteDialog.visible}
        onClose={() => setDeleteDialog({ visible: false, activity: null })}
        onConfirm={confirmDelete}
        title="Eliminar Actividad"
        message={`¿Está seguro de que desea eliminar la actividad "${deleteDialog.activity?.title}"? Esta acción no se puede deshacer.`}
        type="danger"
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </>
  )
}

export default ActivityList
