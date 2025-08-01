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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPlus,
  cilPencil,
  cilTrash,
  cilCalendar,
  cilClock,
  cilLocationPin,
  cilBook,
  cilPeople,
  cilSave,
} from '@coreui/icons'
import DataTable from '../../../components/common/DataTable'
import ConfirmDialog from '../../../components/common/ConfirmDialog'

const ClassScheduler = () => {
  const navigate = useNavigate()
  const [classes, setClasses] = useState([])
  const [subjects, setSubjects] = useState([])
  const [teachers, setTeachers] = useState([])
  const [groups, setGroups] = useState([])
  const [classrooms, setClassrooms] = useState([])
  const [periods, setPeriods] = useState([])
  const [loading, setLoading] = useState(true)
  const [classModal, setClassModal] = useState({ visible: false, class: null, mode: 'create' })
  const [deleteDialog, setDeleteDialog] = useState({ visible: false, class: null })
  const [message, setMessage] = useState({ type: '', text: '' })
  const [filters, setFilters] = useState({
    periodo: '',
    asignatura: '',
    profesor: '',
    grupo: '',
    search: '',
  })
  const [formData, setFormData] = useState({
    asignatura_id: '',
    usuario_id_profesor: '',
    grupo_id: '',
    periodo_academico_id: '',
    aula_id: '',
    dia_semana: '',
    hora_inicio: '',
    hora_fin: '',
    observaciones: '',
  })

  const daysOfWeek = [
    { value: 1, label: 'Lunes' },
    { value: 2, label: 'Martes' },
    { value: 3, label: 'Miércoles' },
    { value: 4, label: 'Jueves' },
    { value: 5, label: 'Viernes' },
    { value: 6, label: 'Sábado' },
    { value: 7, label: 'Domingo' },
  ]

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      // Simulate API calls
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data based on clase table structure
      const mockClasses = [
        {
          id: 1,
          asignatura_id: 1,
          asignatura: {
            nombre: 'Matemáticas',
            codigo: 'MAT-001',
          },
          usuario_id_profesor: 1,
          profesor: {
            nombre: 'Dr. Juan Pérez',
            email: 'juan.perez@edunekta.edu',
          },
          grupo_id: 1,
          grupo: {
            nombre: '10-A',
            grado: 'Décimo',
          },
          periodo_academico_id: 1,
          periodo: {
            nombre: '2024-1',
          },
          aula_id: 1,
          aula: {
            nombre: 'A-101',
            capacidad: 30,
          },
          dia_semana: 1,
          hora_inicio: '08:00:00',
          hora_fin: '09:30:00',
          observaciones: 'Clase regular de matemáticas',
          fecha_creacion: '2024-01-15T10:00:00',
        },
        {
          id: 2,
          asignatura_id: 2,
          asignatura: {
            nombre: 'Español',
            codigo: 'ESP-001',
          },
          usuario_id_profesor: 2,
          profesor: {
            nombre: 'Prof. María García',
            email: 'maria.garcia@edunekta.edu',
          },
          grupo_id: 1,
          grupo: {
            nombre: '10-A',
            grado: 'Décimo',
          },
          periodo_academico_id: 1,
          periodo: {
            nombre: '2024-1',
          },
          aula_id: 2,
          aula: {
            nombre: 'A-102',
            capacidad: 25,
          },
          dia_semana: 1,
          hora_inicio: '09:45:00',
          hora_fin: '11:15:00',
          observaciones: null,
          fecha_creacion: '2024-01-15T10:30:00',
        },
        {
          id: 3,
          asignatura_id: 3,
          asignatura: {
            nombre: 'Ciencias Naturales',
            codigo: 'CIE-001',
          },
          usuario_id_profesor: 3,
          profesor: {
            nombre: 'Dr. Carlos López',
            email: 'carlos.lopez@edunekta.edu',
          },
          grupo_id: 2,
          grupo: {
            nombre: '11-B',
            grado: 'Once',
          },
          periodo_academico_id: 1,
          periodo: {
            nombre: '2024-1',
          },
          aula_id: 3,
          aula: {
            nombre: 'Lab-1',
            capacidad: 20,
          },
          dia_semana: 2,
          hora_inicio: '10:00:00',
          hora_fin: '11:30:00',
          observaciones: 'Laboratorio de química',
          fecha_creacion: '2024-01-16T09:00:00',
        },
      ]

      const mockSubjects = [
        { id: 1, nombre: 'Matemáticas', codigo: 'MAT-001' },
        { id: 2, nombre: 'Español', codigo: 'ESP-001' },
        { id: 3, nombre: 'Ciencias Naturales', codigo: 'CIE-001' },
        { id: 4, nombre: 'Ciencias Sociales', codigo: 'SOC-001' },
        { id: 5, nombre: 'Inglés', codigo: 'ING-001' },
      ]

      const mockTeachers = [
        { id: 1, nombre: 'Dr. Juan Pérez', email: 'juan.perez@edunekta.edu' },
        { id: 2, nombre: 'Prof. María García', email: 'maria.garcia@edunekta.edu' },
        { id: 3, nombre: 'Dr. Carlos López', email: 'carlos.lopez@edunekta.edu' },
        { id: 4, nombre: 'Prof. Ana Martínez', email: 'ana.martinez@edunekta.edu' },
      ]

      const mockGroups = [
        { id: 1, nombre: '10-A', grado: 'Décimo' },
        { id: 2, nombre: '11-B', grado: 'Once' },
        { id: 3, nombre: '9-C', grado: 'Noveno' },
      ]

      const mockClassrooms = [
        { id: 1, nombre: 'A-101', capacidad: 30, tipo: 'Aula Regular' },
        { id: 2, nombre: 'A-102', capacidad: 25, tipo: 'Aula Regular' },
        { id: 3, nombre: 'Lab-1', capacidad: 20, tipo: 'Laboratorio' },
        { id: 4, nombre: 'Aud-1', capacidad: 100, tipo: 'Auditorio' },
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

      setClasses(mockClasses)
      setSubjects(mockSubjects)
      setTeachers(mockTeachers)
      setGroups(mockGroups)
      setClassrooms(mockClassrooms)
      setPeriods(mockPeriods)
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al cargar los datos de clases' })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateClass = () => {
    setFormData({
      asignatura_id: '',
      usuario_id_profesor: '',
      grupo_id: '',
      periodo_academico_id: '',
      aula_id: '',
      dia_semana: '',
      hora_inicio: '',
      hora_fin: '',
      observaciones: '',
    })
    setClassModal({ visible: true, class: null, mode: 'create' })
  }

  const handleEditClass = (classItem) => {
    setFormData({
      asignatura_id: classItem.asignatura_id,
      usuario_id_profesor: classItem.usuario_id_profesor,
      grupo_id: classItem.grupo_id,
      periodo_academico_id: classItem.periodo_academico_id,
      aula_id: classItem.aula_id,
      dia_semana: classItem.dia_semana,
      hora_inicio: classItem.hora_inicio.slice(0, 5), // Remove seconds
      hora_fin: classItem.hora_fin.slice(0, 5),
      observaciones: classItem.observaciones || '',
    })
    setClassModal({ visible: true, class: classItem, mode: 'edit' })
  }

  const handleDeleteClass = (classItem) => {
    setDeleteDialog({ visible: true, class: classItem })
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
      'asignatura_id',
      'usuario_id_profesor',
      'grupo_id',
      'periodo_academico_id',
      'aula_id',
      'dia_semana',
      'hora_inicio',
      'hora_fin',
    ]
    const missing = required.filter((field) => !formData[field])

    if (missing.length > 0) {
      setMessage({ type: 'danger', text: 'Por favor, complete todos los campos obligatorios' })
      return false
    }

    if (formData.hora_inicio >= formData.hora_fin) {
      setMessage({ type: 'danger', text: 'La hora de inicio debe ser anterior a la hora de fin' })
      return false
    }

    return true
  }

  const saveClass = async () => {
    if (!validateForm()) return

    try {
      setLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (classModal.mode === 'create') {
        // Add new class
        const newClass = {
          id: Date.now(),
          ...formData,
          asignatura: subjects.find((s) => s.id.toString() === formData.asignatura_id),
          profesor: teachers.find((t) => t.id.toString() === formData.usuario_id_profesor),
          grupo: groups.find((g) => g.id.toString() === formData.grupo_id),
          periodo: periods.find((p) => p.id.toString() === formData.periodo_academico_id),
          aula: classrooms.find((c) => c.id.toString() === formData.aula_id),
          fecha_creacion: new Date().toISOString(),
        }
        setClasses((prev) => [...prev, newClass])
        setMessage({ type: 'success', text: 'Clase creada exitosamente' })
      } else {
        // Update existing class
        setClasses((prev) =>
          prev.map((c) =>
            c.id === classModal.class.id
              ? {
                  ...c,
                  ...formData,
                  asignatura: subjects.find((s) => s.id.toString() === formData.asignatura_id),
                  profesor: teachers.find((t) => t.id.toString() === formData.usuario_id_profesor),
                  grupo: groups.find((g) => g.id.toString() === formData.grupo_id),
                  periodo: periods.find((p) => p.id.toString() === formData.periodo_academico_id),
                  aula: classrooms.find((c) => c.id.toString() === formData.aula_id),
                }
              : c,
          ),
        )
        setMessage({ type: 'success', text: 'Clase actualizada exitosamente' })
      }

      setClassModal({ visible: false, class: null, mode: 'create' })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al guardar la clase' })
    } finally {
      setLoading(false)
    }
  }

  const confirmDelete = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setClasses((prev) => prev.filter((c) => c.id !== deleteDialog.class.id))
      setMessage({ type: 'success', text: 'Clase eliminada exitosamente' })
      setDeleteDialog({ visible: false, class: null })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al eliminar la clase' })
    }
  }

  const getDayName = (dayNumber) => {
    const day = daysOfWeek.find((d) => d.value === dayNumber)
    return day ? day.label : 'N/A'
  }

  const formatTime = (time) => {
    return time ? time.slice(0, 5) : 'N/A'
  }

  const filteredClasses = classes.filter((classItem) => {
    return (
      (!filters.periodo || classItem.periodo_academico_id.toString() === filters.periodo) &&
      (!filters.asignatura || classItem.asignatura_id.toString() === filters.asignatura) &&
      (!filters.profesor || classItem.usuario_id_profesor.toString() === filters.profesor) &&
      (!filters.grupo || classItem.grupo_id.toString() === filters.grupo) &&
      (!filters.search ||
        classItem.asignatura.nombre.toLowerCase().includes(filters.search.toLowerCase()) ||
        classItem.profesor.nombre.toLowerCase().includes(filters.search.toLowerCase()) ||
        classItem.grupo.nombre.toLowerCase().includes(filters.search.toLowerCase()))
    )
  })

  const columns = [
    {
      key: 'asignatura',
      label: 'Asignatura',
      render: (value, item) => (
        <div>
          <div className="fw-semibold">{item.asignatura.nombre}</div>
          <small className="text-muted">{item.asignatura.codigo}</small>
        </div>
      ),
    },
    {
      key: 'profesor',
      label: 'Profesor',
      render: (value, item) => (
        <div>
          <div className="fw-semibold">{item.profesor.nombre}</div>
          <small className="text-muted">{item.profesor.email}</small>
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
      key: 'horario',
      label: 'Horario',
      render: (value, item) => (
        <div>
          <div className="fw-semibold">{getDayName(item.dia_semana)}</div>
          <small className="text-muted">
            {formatTime(item.hora_inicio)} - {formatTime(item.hora_fin)}
          </small>
        </div>
      ),
    },
    {
      key: 'aula',
      label: 'Aula',
      render: (value, item) => (
        <div>
          <div className="fw-semibold">{item.aula.nombre}</div>
          <small className="text-muted">Cap: {item.aula.capacidad}</small>
        </div>
      ),
    },
    {
      key: 'periodo',
      label: 'Período',
      render: (value, item) => <CBadge color="info">{item.periodo.nombre}</CBadge>,
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
            onClick={() => handleEditClass(item)}
            title="Editar clase"
          >
            <CIcon icon={cilPencil} size="sm" />
          </CButton>
          <CButton
            color="danger"
            variant="outline"
            size="sm"
            onClick={() => handleDeleteClass(item)}
            title="Eliminar clase"
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
                <CCol md={2}>
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
                    value={filters.profesor}
                    onChange={(e) => setFilters((prev) => ({ ...prev, profesor: e.target.value }))}
                  >
                    <option value="">Todos los profesores</option>
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.nombre}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={2}>
                  <CFormSelect
                    value={filters.grupo}
                    onChange={(e) => setFilters((prev) => ({ ...prev, grupo: e.target.value }))}
                  >
                    <option value="">Todos los grupos</option>
                    {groups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.nombre}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={4}>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilCalendar} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Buscar clases..."
                      value={filters.search}
                      onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>

          <DataTable
            data={filteredClasses}
            columns={columns}
            title="Programación de Clases"
            loading={loading}
            searchable={false} // Using custom search
            sortable={true}
            paginated={true}
            pageSize={15}
            actions={
              <CButton
                color="primary"
                onClick={handleCreateClass}
                className="d-flex align-items-center"
              >
                <CIcon icon={cilPlus} className="me-2" />
                Nueva Clase
              </CButton>
            }
          />
        </CCol>
      </CRow>

      {/* Class Modal */}
      <CModal
        visible={classModal.visible}
        onClose={() => setClassModal({ visible: false, class: null, mode: 'create' })}
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>
            {classModal.mode === 'create' ? 'Crear Nueva Clase' : 'Editar Clase'}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow>
              <CCol md={6} className="mb-3">
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
              <CCol md={6} className="mb-3">
                <label className="form-label">Profesor *</label>
                <CFormSelect
                  name="usuario_id_profesor"
                  value={formData.usuario_id_profesor}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccionar profesor</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.nombre}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6} className="mb-3">
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
              <CCol md={6} className="mb-3">
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
                      {period.nombre}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={4} className="mb-3">
                <label className="form-label">Día de la Semana *</label>
                <CFormSelect
                  name="dia_semana"
                  value={formData.dia_semana}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccionar día</option>
                  {daysOfWeek.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={4} className="mb-3">
                <label className="form-label">Hora Inicio *</label>
                <CFormInput
                  type="time"
                  name="hora_inicio"
                  value={formData.hora_inicio}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
              <CCol md={4} className="mb-3">
                <label className="form-label">Hora Fin *</label>
                <CFormInput
                  type="time"
                  name="hora_fin"
                  value={formData.hora_fin}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12} className="mb-3">
                <label className="form-label">Aula *</label>
                <CFormSelect
                  name="aula_id"
                  value={formData.aula_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccionar aula</option>
                  {classrooms.map((classroom) => (
                    <option key={classroom.id} value={classroom.id}>
                      {classroom.nombre} - {classroom.tipo} (Cap: {classroom.capacidad})
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12} className="mb-3">
                <label className="form-label">Observaciones</label>
                <CFormTextarea
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Observaciones adicionales sobre la clase..."
                />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setClassModal({ visible: false, class: null, mode: 'create' })}
          >
            Cancelar
          </CButton>
          <CButton color="primary" onClick={saveClass} disabled={loading}>
            {loading ? (
              <>
                <CSpinner size="sm" className="me-2" />
                Guardando...
              </>
            ) : (
              <>
                <CIcon icon={cilSave} className="me-2" />
                {classModal.mode === 'create' ? 'Crear Clase' : 'Actualizar Clase'}
              </>
            )}
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        visible={deleteDialog.visible}
        onClose={() => setDeleteDialog({ visible: false, class: null })}
        onConfirm={confirmDelete}
        title="Eliminar Clase"
        message={`¿Está seguro de que desea eliminar la clase de "${deleteDialog.class?.asignatura?.nombre}" del grupo "${deleteDialog.class?.grupo?.nombre}"?`}
        type="danger"
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </>
  )
}

export default ClassScheduler
