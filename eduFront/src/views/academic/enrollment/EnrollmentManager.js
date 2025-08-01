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
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPlus,
  cilPencil,
  cilTrash,
  cilUser,
  cilCalendar,
  cilEducation,
  cilSearch,
  cilUserFollow,
} from '@coreui/icons'
import DataTable from '../../../components/common/DataTable'
import ConfirmDialog from '../../../components/common/ConfirmDialog'

const EnrollmentManager = () => {
  const navigate = useNavigate()
  const [enrollments, setEnrollments] = useState([])
  const [students, setStudents] = useState([])
  const [groups, setGroups] = useState([])
  const [periods, setPeriods] = useState([])
  const [loading, setLoading] = useState(true)
  const [enrollModal, setEnrollModal] = useState({ visible: false, student: null })
  const [deleteDialog, setDeleteDialog] = useState({ visible: false, enrollment: null })
  const [message, setMessage] = useState({ type: '', text: '' })
  const [filters, setFilters] = useState({
    periodo: '',
    grupo: '',
    estado: '',
    search: '',
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      // Simulate API calls
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data based on database structure
      const mockEnrollments = [
        {
          id: 1,
          usuario_id_estudiante: 1,
          estudiante: {
            nombre: 'Ana María',
            apellido: 'García López',
            email: 'ana.garcia@estudiante.edu',
            documento: '1234567890',
          },
          grupo_id: 1,
          grupo: {
            nombre: '10-A',
            grado: 'Décimo',
            nivel_academico: 'Educación Media',
          },
          periodo_academico_id: 1,
          periodo: {
            nombre: '2024-1',
            fecha_inicio: '2024-02-01',
            fecha_fin: '2024-06-30',
          },
          estado_matricula_id: 1,
          estado: 'Activa',
          fecha_matricula: '2024-01-15T10:30:00',
          observaciones: 'Matrícula regular',
        },
        {
          id: 2,
          usuario_id_estudiante: 2,
          estudiante: {
            nombre: 'Carlos Eduardo',
            apellido: 'Rodríguez Pérez',
            email: 'carlos.rodriguez@estudiante.edu',
            documento: '0987654321',
          },
          grupo_id: 2,
          grupo: {
            nombre: '11-B',
            grado: 'Once',
            nivel_academico: 'Educación Media',
          },
          periodo_academico_id: 1,
          periodo: {
            nombre: '2024-1',
            fecha_inicio: '2024-02-01',
            fecha_fin: '2024-06-30',
          },
          estado_matricula_id: 1,
          estado: 'Activa',
          fecha_matricula: '2024-01-20T14:15:00',
          observaciones: null,
        },
        {
          id: 3,
          usuario_id_estudiante: 3,
          estudiante: {
            nombre: 'María Fernanda',
            apellido: 'Martínez Silva',
            email: 'maria.martinez@estudiante.edu',
            documento: '1122334455',
          },
          grupo_id: 1,
          grupo: {
            nombre: '10-A',
            grado: 'Décimo',
            nivel_academico: 'Educación Media',
          },
          periodo_academico_id: 2,
          periodo: {
            nombre: '2024-2',
            fecha_inicio: '2024-07-01',
            fecha_fin: '2024-11-30',
          },
          estado_matricula_id: 2,
          estado: 'Pendiente',
          fecha_matricula: '2024-06-15T09:00:00',
          observaciones: 'Pendiente documentación',
        },
      ]

      const mockStudents = [
        { id: 1, nombre: 'Ana María García López', email: 'ana.garcia@estudiante.edu' },
        {
          id: 2,
          nombre: 'Carlos Eduardo Rodríguez Pérez',
          email: 'carlos.rodriguez@estudiante.edu',
        },
        { id: 3, nombre: 'María Fernanda Martínez Silva', email: 'maria.martinez@estudiante.edu' },
        { id: 4, nombre: 'Juan Pablo Hernández', email: 'juan.hernandez@estudiante.edu' },
        { id: 5, nombre: 'Laura Sofía Vargas', email: 'laura.vargas@estudiante.edu' },
      ]

      const mockGroups = [
        { id: 1, nombre: '10-A', grado: 'Décimo', nivel_academico: 'Educación Media' },
        { id: 2, nombre: '11-B', grado: 'Once', nivel_academico: 'Educación Media' },
        { id: 3, nombre: '9-C', grado: 'Noveno', nivel_academico: 'Educación Básica' },
      ]

      const mockPeriods = [
        {
          id: 1,
          nombre: '2024-1',
          fecha_inicio: '2024-02-01',
          fecha_fin: '2024-06-30',
          estado: 'Activo',
        },
        {
          id: 2,
          nombre: '2024-2',
          fecha_inicio: '2024-07-01',
          fecha_fin: '2024-11-30',
          estado: 'Programado',
        },
      ]

      setEnrollments(mockEnrollments)
      setStudents(mockStudents)
      setGroups(mockGroups)
      setPeriods(mockPeriods)
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al cargar los datos de matrícula' })
    } finally {
      setLoading(false)
    }
  }

  const handleEnrollStudent = (student = null) => {
    setEnrollModal({ visible: true, student })
  }

  const handleDeleteEnrollment = (enrollment) => {
    setDeleteDialog({ visible: true, enrollment })
  }

  const confirmDelete = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setEnrollments((prev) => prev.filter((e) => e.id !== deleteDialog.enrollment.id))
      setMessage({ type: 'success', text: 'Matrícula eliminada exitosamente' })
      setDeleteDialog({ visible: false, enrollment: null })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al eliminar la matrícula' })
    }
  }

  const getStatusBadge = (estado) => {
    const statusConfig = {
      Activa: { color: 'success', text: 'Activa' },
      Pendiente: { color: 'warning', text: 'Pendiente' },
      Inactiva: { color: 'danger', text: 'Inactiva' },
      Cancelada: { color: 'secondary', text: 'Cancelada' },
    }
    const config = statusConfig[estado] || statusConfig['Pendiente']
    return <CBadge color={config.color}>{config.text}</CBadge>
  }

  const filteredEnrollments = enrollments.filter((enrollment) => {
    return (
      (!filters.periodo || enrollment.periodo_academico_id.toString() === filters.periodo) &&
      (!filters.grupo || enrollment.grupo_id.toString() === filters.grupo) &&
      (!filters.estado || enrollment.estado === filters.estado) &&
      (!filters.search ||
        enrollment.estudiante.nombre.toLowerCase().includes(filters.search.toLowerCase()) ||
        enrollment.estudiante.apellido.toLowerCase().includes(filters.search.toLowerCase()) ||
        enrollment.estudiante.email.toLowerCase().includes(filters.search.toLowerCase()))
    )
  })

  const columns = [
    {
      key: 'estudiante',
      label: 'Estudiante',
      render: (value, item) => (
        <div>
          <div className="fw-semibold">
            {item.estudiante.nombre} {item.estudiante.apellido}
          </div>
          <small className="text-muted">{item.estudiante.email}</small>
          <div>
            <small className="text-muted">Doc: {item.estudiante.documento}</small>
          </div>
        </div>
      ),
    },
    {
      key: 'grupo',
      label: 'Grupo',
      render: (value, item) => (
        <div>
          <div className="fw-semibold">{item.grupo.nombre}</div>
          <small className="text-muted">{item.grupo.grado}</small>
        </div>
      ),
    },
    {
      key: 'periodo',
      label: 'Período',
      render: (value, item) => (
        <div>
          <div className="fw-semibold">{item.periodo.nombre}</div>
          <small className="text-muted">
            {new Date(item.periodo.fecha_inicio).toLocaleDateString()} -
            {new Date(item.periodo.fecha_fin).toLocaleDateString()}
          </small>
        </div>
      ),
    },
    {
      key: 'estado',
      label: 'Estado',
      render: (value) => getStatusBadge(value),
    },
    {
      key: 'fecha_matricula',
      label: 'Fecha Matrícula',
      render: (value) => new Date(value).toLocaleDateString('es-ES'),
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
            onClick={() => navigate(`/academic/enrollment/${item.id}`)}
            title="Ver detalle"
          >
            <CIcon icon={cilPencil} size="sm" />
          </CButton>
          <CButton
            color="danger"
            variant="outline"
            size="sm"
            onClick={() => handleDeleteEnrollment(item)}
            title="Eliminar matrícula"
            disabled={item.estado === 'Activa'}
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

          {/* Filters */}
          <CCard className="mb-3">
            <CCardBody>
              <CRow>
                <CCol md={3}>
                  <CFormSelect
                    value={filters.periodo}
                    onChange={(e) => setFilters((prev) => ({ ...prev, periodo: e.target.value }))}
                  >
                    <option value="">Todos los períodos</option>
                    {periods.map((period) => (
                      <option key={period.id} value={period.id}>
                        {period.nombre}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={3}>
                  <CFormSelect
                    value={filters.grupo}
                    onChange={(e) => setFilters((prev) => ({ ...prev, grupo: e.target.value }))}
                  >
                    <option value="">Todos los grupos</option>
                    {groups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.nombre} - {group.grado}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={3}>
                  <CFormSelect
                    value={filters.estado}
                    onChange={(e) => setFilters((prev) => ({ ...prev, estado: e.target.value }))}
                  >
                    <option value="">Todos los estados</option>
                    <option value="Activa">Activa</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Inactiva">Inactiva</option>
                    <option value="Cancelada">Cancelada</option>
                  </CFormSelect>
                </CCol>
                <CCol md={3}>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilSearch} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Buscar estudiante..."
                      value={filters.search}
                      onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>

          <DataTable
            data={filteredEnrollments}
            columns={columns}
            title="Gestión de Matrículas"
            loading={loading}
            searchable={false} // Using custom search
            sortable={true}
            paginated={true}
            pageSize={15}
            actions={
              <CButton
                color="primary"
                onClick={() => handleEnrollStudent()}
                className="d-flex align-items-center"
              >
                <CIcon icon={cilUserFollow} className="me-2" />
                Nueva Matrícula
              </CButton>
            }
          />
        </CCol>
      </CRow>

      {/* Enrollment Modal */}
      <CModal
        visible={enrollModal.visible}
        onClose={() => setEnrollModal({ visible: false, student: null })}
      >
        <CModalHeader>
          <CModalTitle>Nueva Matrícula</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow>
              <CCol md={12} className="mb-3">
                <CFormSelect>
                  <option value="">Seleccionar estudiante</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.nombre} - {student.email}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormSelect>
                  <option value="">Seleccionar período</option>
                  {periods.map((period) => (
                    <option key={period.id} value={period.id}>
                      {period.nombre}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormSelect>
                  <option value="">Seleccionar grupo</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.nombre} - {group.grado}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setEnrollModal({ visible: false, student: null })}
          >
            Cancelar
          </CButton>
          <CButton color="primary">Matricular</CButton>
        </CModalFooter>
      </CModal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        visible={deleteDialog.visible}
        onClose={() => setDeleteDialog({ visible: false, enrollment: null })}
        onConfirm={confirmDelete}
        title="Eliminar Matrícula"
        message={`¿Está seguro de que desea eliminar la matrícula de "${deleteDialog.enrollment?.estudiante?.nombre} ${deleteDialog.enrollment?.estudiante?.apellido}"?`}
        type="danger"
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </>
  )
}

export default EnrollmentManager
