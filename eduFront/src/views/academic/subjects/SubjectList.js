import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CBadge, CAlert } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilPencil, cilTrash, cilBook, cilPeople, cilCalendar } from '@coreui/icons'
import DataTable from '../../../components/common/DataTable'
import ConfirmDialog from '../../../components/common/ConfirmDialog'

const SubjectList = () => {
  const navigate = useNavigate()
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteDialog, setDeleteDialog] = useState({ visible: false, subject: null })
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    loadSubjects()
  }, [])

  const loadSubjects = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data
      const mockSubjects = [
        {
          id: 1,
          name: 'Matemáticas Avanzadas',
          description: 'Curso de matemáticas para estudiantes avanzados',
          category: 'Ciencias Exactas',
          instructor: 'Dr. Juan Pérez',
          enrolledStudents: 45,
          totalCapacity: 50,
          status: 'active',
          startDate: '2024-02-01',
          endDate: '2024-06-30',
          createdAt: '2024-01-15',
        },
        {
          id: 2,
          name: 'Historia Universal',
          description: 'Recorrido por la historia mundial desde la antigüedad',
          category: 'Humanidades',
          instructor: 'Prof. María García',
          enrolledStudents: 32,
          totalCapacity: 40,
          status: 'active',
          startDate: '2024-02-15',
          endDate: '2024-07-15',
          createdAt: '2024-01-20',
        },
        {
          id: 3,
          name: 'Química Orgánica',
          description: 'Fundamentos de química orgánica y aplicaciones',
          category: 'Ciencias Naturales',
          instructor: 'Dr. Carlos López',
          enrolledStudents: 28,
          totalCapacity: 35,
          status: 'draft',
          startDate: '2024-03-01',
          endDate: '2024-08-01',
          createdAt: '2024-02-01',
        },
        {
          id: 4,
          name: 'Literatura Contemporánea',
          description: 'Análisis de obras literarias del siglo XX y XXI',
          category: 'Humanidades',
          instructor: 'Prof. Ana Martínez',
          enrolledStudents: 25,
          totalCapacity: 30,
          status: 'completed',
          startDate: '2023-09-01',
          endDate: '2024-01-31',
          createdAt: '2023-08-15',
        },
        {
          id: 5,
          name: 'Programación Web',
          description: 'Desarrollo de aplicaciones web modernas',
          category: 'Tecnología',
          instructor: 'Ing. Roberto Silva',
          enrolledStudents: 38,
          totalCapacity: 40,
          status: 'active',
          startDate: '2024-01-15',
          endDate: '2024-05-15',
          createdAt: '2024-01-01',
        },
      ]

      setSubjects(mockSubjects)
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al cargar las asignaturas' })
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    navigate('/academic/subjects/create')
  }

  const handleEdit = (subject) => {
    navigate(`/academic/subjects/edit/${subject.id}`)
  }

  const handleDelete = (subject) => {
    setDeleteDialog({ visible: true, subject })
  }

  const confirmDelete = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSubjects((prev) => prev.filter((s) => s.id !== deleteDialog.subject.id))
      setMessage({ type: 'success', text: 'Asignatura eliminada exitosamente' })
      setDeleteDialog({ visible: false, subject: null })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al eliminar la asignatura' })
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'success', text: 'Activa' },
      draft: { color: 'warning', text: 'Borrador' },
      completed: { color: 'info', text: 'Completada' },
      cancelled: { color: 'danger', text: 'Cancelada' },
    }
    const config = statusConfig[status] || statusConfig.draft
    return <CBadge color={config.color}>{config.text}</CBadge>
  }

  const getEnrollmentProgress = (enrolled, total) => {
    const percentage = (enrolled / total) * 100
    let color = 'success'
    if (percentage > 90) color = 'danger'
    else if (percentage > 75) color = 'warning'

    return (
      <div className="d-flex align-items-center">
        <span className="me-2">
          {enrolled}/{total}
        </span>
        <div className="flex-grow-1" style={{ minWidth: '60px' }}>
          <div className={`progress progress-thin bg-${color}-subtle`}>
            <div className={`progress-bar bg-${color}`} style={{ width: `${percentage}%` }} />
          </div>
        </div>
      </div>
    )
  }

  const columns = [
    {
      key: 'name',
      label: 'Asignatura',
      render: (value, item) => (
        <div>
          <div className="fw-semibold">{value}</div>
          <small className="text-muted">{item.category}</small>
        </div>
      ),
    },
    {
      key: 'instructor',
      label: 'Instructor',
    },
    {
      key: 'enrolledStudents',
      label: 'Estudiantes',
      render: (value, item) => getEnrollmentProgress(value, item.totalCapacity),
    },
    {
      key: 'status',
      label: 'Estado',
      render: (value) => getStatusBadge(value),
    },
    {
      key: 'startDate',
      label: 'Fecha Inicio',
      type: 'date',
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
            disabled={item.status === 'active' && item.enrolledStudents > 0}
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
            data={subjects}
            columns={columns}
            title="Gestión de Asignaturas"
            loading={loading}
            searchable={true}
            sortable={true}
            paginated={true}
            pageSize={10}
            actions={
              <CButton color="primary" onClick={handleCreate} className="d-flex align-items-center">
                <CIcon icon={cilPlus} className="me-2" />
                Nueva Asignatura
              </CButton>
            }
            onRowClick={(subject) => navigate(`/academic/subjects/${subject.id}`)}
          />
        </CCol>
      </CRow>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        visible={deleteDialog.visible}
        onClose={() => setDeleteDialog({ visible: false, subject: null })}
        onConfirm={confirmDelete}
        title="Eliminar Asignatura"
        message={`¿Está seguro de que desea eliminar la asignatura "${deleteDialog.subject?.name}"? Esta acción no se puede deshacer.`}
        type="danger"
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </>
  )
}

export default SubjectList
