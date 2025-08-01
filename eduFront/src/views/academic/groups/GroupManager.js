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
  CListGroup,
  CListGroupItem,
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
  cilPeople,
  cilUser,
  cilCalendar,
  cilSearch,
  cilSave,
  cilSettings,
  cilUserFollow,
  cilUserUnfollow,
  cilEducation,
} from '@coreui/icons'
import DataTable from '../../../components/common/DataTable'
import ConfirmDialog from '../../../components/common/ConfirmDialog'

const GroupManager = () => {
  const navigate = useNavigate()
  const [groups, setGroups] = useState([])
  const [grades, setGrades] = useState([])
  const [academicLevels, setAcademicLevels] = useState([])
  const [students, setStudents] = useState([])
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('groups')
  const [groupModal, setGroupModal] = useState({ visible: false, group: null, mode: 'create' })
  const [studentModal, setStudentModal] = useState({ visible: false, group: null })
  const [deleteDialog, setDeleteDialog] = useState({ visible: false, group: null })
  const [message, setMessage] = useState({ type: '', text: '' })
  const [filters, setFilters] = useState({
    grado: '',
    nivel: '',
    estado: '',
    search: '',
  })
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    grado_id: '',
    nivel_academico_id: '',
    usuario_id_director: '',
    capacidad_maxima: 30,
    periodo_academico_id: '',
    estado_grupo_id: 1,
    observaciones: '',
  })

  const groupStates = [
    { id: 1, nombre: 'Activo', color: 'success' },
    { id: 2, nombre: 'Inactivo', color: 'secondary' },
    { id: 3, nombre: 'Cerrado', color: 'danger' },
    { id: 4, nombre: 'En Formación', color: 'warning' },
  ]

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      // Simulate API calls
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data based on grupo, grado, nivel_academico tables
      const mockAcademicLevels = [
        { id: 1, nombre: 'Primaria', descripcion: 'Educación Primaria', orden: 1 },
        { id: 2, nombre: 'Secundaria', descripcion: 'Educación Secundaria', orden: 2 },
        { id: 3, nombre: 'Media', descripcion: 'Educación Media', orden: 3 },
      ]

      const mockGrades = [
        {
          id: 1,
          nombre: 'Primero',
          numero: 1,
          nivel_academico_id: 1,
          nivel: mockAcademicLevels[0],
        },
        {
          id: 2,
          nombre: 'Segundo',
          numero: 2,
          nivel_academico_id: 1,
          nivel: mockAcademicLevels[0],
        },
        {
          id: 3,
          nombre: 'Tercero',
          numero: 3,
          nivel_academico_id: 1,
          nivel: mockAcademicLevels[0],
        },
        { id: 4, nombre: 'Cuarto', numero: 4, nivel_academico_id: 1, nivel: mockAcademicLevels[0] },
        { id: 5, nombre: 'Quinto', numero: 5, nivel_academico_id: 1, nivel: mockAcademicLevels[0] },
        { id: 6, nombre: 'Sexto', numero: 6, nivel_academico_id: 2, nivel: mockAcademicLevels[1] },
        {
          id: 7,
          nombre: 'Séptimo',
          numero: 7,
          nivel_academico_id: 2,
          nivel: mockAcademicLevels[1],
        },
        { id: 8, nombre: 'Octavo', numero: 8, nivel_academico_id: 2, nivel: mockAcademicLevels[1] },
        { id: 9, nombre: 'Noveno', numero: 9, nivel_academico_id: 2, nivel: mockAcademicLevels[1] },
        {
          id: 10,
          nombre: 'Décimo',
          numero: 10,
          nivel_academico_id: 3,
          nivel: mockAcademicLevels[2],
        },
        { id: 11, nombre: 'Once', numero: 11, nivel_academico_id: 3, nivel: mockAcademicLevels[2] },
      ]

      const mockTeachers = [
        {
          id: 1,
          nombre: 'María Elena',
          apellido: 'García López',
          email: 'maria.garcia@edunekta.edu',
        },
        {
          id: 2,
          nombre: 'Carlos Eduardo',
          apellido: 'Martínez Silva',
          email: 'carlos.martinez@edunekta.edu',
        },
        {
          id: 3,
          nombre: 'Ana Patricia',
          apellido: 'Rodríguez Pérez',
          email: 'ana.rodriguez@edunekta.edu',
        },
        {
          id: 4,
          nombre: 'Luis Fernando',
          apellido: 'González Castro',
          email: 'luis.gonzalez@edunekta.edu',
        },
      ]

      const mockStudents = [
        {
          id: 10,
          nombre: 'Juan Carlos',
          apellido: 'Pérez García',
          documento: '1234567890',
          grupo_id: 1,
        },
        {
          id: 11,
          nombre: 'Ana María',
          apellido: 'López Martínez',
          documento: '0987654321',
          grupo_id: 1,
        },
        {
          id: 12,
          nombre: 'Carlos Eduardo',
          apellido: 'Silva Rodríguez',
          documento: '1122334455',
          grupo_id: 1,
        },
        {
          id: 13,
          nombre: 'María Fernanda',
          apellido: 'Castro González',
          documento: '5566778899',
          grupo_id: 2,
        },
        {
          id: 14,
          nombre: 'Diego Alejandro',
          apellido: 'Vargas Jiménez',
          documento: '6677889900',
          grupo_id: 2,
        },
        {
          id: 15,
          nombre: 'Sofía Isabella',
          apellido: 'Herrera Morales',
          documento: '7788990011',
          grupo_id: 3,
        },
      ]

      const mockGroups = [
        {
          id: 1,
          nombre: '10-A',
          descripcion: 'Grupo A de décimo grado - Énfasis en ciencias',
          grado_id: 10,
          grado: mockGrades[9], // Décimo
          nivel_academico_id: 3,
          nivel: mockAcademicLevels[2], // Media
          usuario_id_director: 1,
          director: mockTeachers[0],
          capacidad_maxima: 30,
          periodo_academico_id: 1,
          estado_grupo_id: 1,
          estado: 'Activo',
          observaciones: 'Grupo con énfasis en ciencias naturales y matemáticas',
          fecha_creacion: '2024-01-15T10:00:00',
          // Statistics
          estudiantes_matriculados: 28,
          estudiantes_activos: 27,
          promedio_asistencia: 92.5,
          promedio_rendimiento: 85.3,
        },
        {
          id: 2,
          nombre: '10-B',
          descripcion: 'Grupo B de décimo grado - Énfasis en humanidades',
          grado_id: 10,
          grado: mockGrades[9],
          nivel_academico_id: 3,
          nivel: mockAcademicLevels[2],
          usuario_id_director: 2,
          director: mockTeachers[1],
          capacidad_maxima: 30,
          periodo_academico_id: 1,
          estado_grupo_id: 1,
          estado: 'Activo',
          observaciones: 'Grupo con énfasis en humanidades y ciencias sociales',
          fecha_creacion: '2024-01-15T10:30:00',
          estudiantes_matriculados: 25,
          estudiantes_activos: 25,
          promedio_asistencia: 89.7,
          promedio_rendimiento: 82.1,
        },
        {
          id: 3,
          nombre: '11-A',
          descripcion: 'Grupo A de once grado - Preparación universitaria',
          grado_id: 11,
          grado: mockGrades[10], // Once
          nivel_academico_id: 3,
          nivel: mockAcademicLevels[2],
          usuario_id_director: 3,
          director: mockTeachers[2],
          capacidad_maxima: 25,
          periodo_academico_id: 1,
          estado_grupo_id: 1,
          estado: 'Activo',
          observaciones: 'Grupo de preparación para ingreso a la universidad',
          fecha_creacion: '2024-01-15T11:00:00',
          estudiantes_matriculados: 22,
          estudiantes_activos: 22,
          promedio_asistencia: 95.2,
          promedio_rendimiento: 88.7,
        },
        {
          id: 4,
          nombre: '9-C',
          descripcion: 'Grupo C de noveno grado',
          grado_id: 9,
          grado: mockGrades[8], // Noveno
          nivel_academico_id: 2,
          nivel: mockAcademicLevels[1],
          usuario_id_director: 4,
          director: mockTeachers[3],
          capacidad_maxima: 32,
          periodo_academico_id: 1,
          estado_grupo_id: 4,
          estado: 'En Formación',
          observaciones: 'Grupo en proceso de formación para el nuevo período',
          fecha_creacion: '2024-07-20T14:00:00',
          estudiantes_matriculados: 15,
          estudiantes_activos: 15,
          promedio_asistencia: 0,
          promedio_rendimiento: 0,
        },
      ]

      setGroups(mockGroups)
      setGrades(mockGrades)
      setAcademicLevels(mockAcademicLevels)
      setStudents(mockStudents)
      setTeachers(mockTeachers)
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al cargar los grupos' })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateGroup = () => {
    setFormData({
      nombre: '',
      descripcion: '',
      grado_id: '',
      nivel_academico_id: '',
      usuario_id_director: '',
      capacidad_maxima: 30,
      periodo_academico_id: 1, // Default active period
      estado_grupo_id: 1,
      observaciones: '',
    })
    setGroupModal({ visible: true, group: null, mode: 'create' })
  }

  const handleEditGroup = (group) => {
    setFormData({
      nombre: group.nombre,
      descripcion: group.descripcion || '',
      grado_id: group.grado_id,
      nivel_academico_id: group.nivel_academico_id,
      usuario_id_director: group.usuario_id_director,
      capacidad_maxima: group.capacidad_maxima,
      periodo_academico_id: group.periodo_academico_id,
      estado_grupo_id: group.estado_grupo_id,
      observaciones: group.observaciones || '',
    })
    setGroupModal({ visible: true, group, mode: 'edit' })
  }

  const handleDeleteGroup = (group) => {
    setDeleteDialog({ visible: true, group })
  }

  const handleManageStudents = (group) => {
    setStudentModal({ visible: true, group })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Auto-select academic level when grade changes
    if (name === 'grado_id') {
      const selectedGrade = grades.find((g) => g.id === parseInt(value))
      if (selectedGrade) {
        setFormData((prev) => ({
          ...prev,
          nivel_academico_id: selectedGrade.nivel_academico_id,
        }))
      }
    }
  }

  const validateForm = () => {
    const required = ['nombre', 'grado_id', 'nivel_academico_id', 'usuario_id_director']
    const missing = required.filter((field) => !formData[field])

    if (missing.length > 0) {
      setMessage({ type: 'danger', text: 'Por favor, complete todos los campos obligatorios' })
      return false
    }

    if (formData.capacidad_maxima <= 0) {
      setMessage({ type: 'danger', text: 'La capacidad máxima debe ser mayor a 0' })
      return false
    }

    // Check if group name already exists
    const existingGroup = groups.find(
      (g) =>
        g.nombre.toLowerCase() === formData.nombre.toLowerCase() &&
        (groupModal.mode === 'create' || g.id !== groupModal.group?.id),
    )

    if (existingGroup) {
      setMessage({ type: 'danger', text: 'Ya existe un grupo con este nombre' })
      return false
    }

    return true
  }

  const saveGroup = async () => {
    if (!validateForm()) return

    try {
      setLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const grade = grades.find((g) => g.id === parseInt(formData.grado_id))
      const level = academicLevels.find((l) => l.id === parseInt(formData.nivel_academico_id))
      const director = teachers.find((t) => t.id === parseInt(formData.usuario_id_director))
      const state = groupStates.find((s) => s.id === parseInt(formData.estado_grupo_id))

      if (groupModal.mode === 'create') {
        // Add new group
        const newGroup = {
          id: Date.now(),
          ...formData,
          grado_id: parseInt(formData.grado_id),
          nivel_academico_id: parseInt(formData.nivel_academico_id),
          usuario_id_director: parseInt(formData.usuario_id_director),
          capacidad_maxima: parseInt(formData.capacidad_maxima),
          periodo_academico_id: parseInt(formData.periodo_academico_id),
          estado_grupo_id: parseInt(formData.estado_grupo_id),
          grado: grade,
          nivel: level,
          director: director,
          estado: state.nombre,
          fecha_creacion: new Date().toISOString(),
          estudiantes_matriculados: 0,
          estudiantes_activos: 0,
          promedio_asistencia: 0,
          promedio_rendimiento: 0,
        }
        setGroups((prev) => [newGroup, ...prev])
        setMessage({ type: 'success', text: 'Grupo creado exitosamente' })
      } else {
        // Update existing group
        setGroups((prev) =>
          prev.map((g) =>
            g.id === groupModal.group.id
              ? {
                  ...g,
                  ...formData,
                  grado_id: parseInt(formData.grado_id),
                  nivel_academico_id: parseInt(formData.nivel_academico_id),
                  usuario_id_director: parseInt(formData.usuario_id_director),
                  capacidad_maxima: parseInt(formData.capacidad_maxima),
                  periodo_academico_id: parseInt(formData.periodo_academico_id),
                  estado_grupo_id: parseInt(formData.estado_grupo_id),
                  grado: grade,
                  nivel: level,
                  director: director,
                  estado: state.nombre,
                }
              : g,
          ),
        )
        setMessage({ type: 'success', text: 'Grupo actualizado exitosamente' })
      }

      setGroupModal({ visible: false, group: null, mode: 'create' })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al guardar el grupo' })
    } finally {
      setLoading(false)
    }
  }

  const confirmDelete = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setGroups((prev) => prev.filter((g) => g.id !== deleteDialog.group.id))
      setMessage({ type: 'success', text: 'Grupo eliminado exitosamente' })
      setDeleteDialog({ visible: false, group: null })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al eliminar el grupo' })
    }
  }

  const getStateInfo = (stateId) => {
    return groupStates.find((s) => s.id === stateId) || groupStates[0]
  }

  const calculateOccupancy = (group) => {
    if (group.capacidad_maxima === 0) return 0
    return Math.round((group.estudiantes_matriculados / group.capacidad_maxima) * 100)
  }

  const filteredGroups = groups.filter((group) => {
    return (
      (!filters.grado || group.grado_id.toString() === filters.grado) &&
      (!filters.nivel || group.nivel_academico_id.toString() === filters.nivel) &&
      (!filters.estado || group.estado === filters.estado) &&
      (!filters.search ||
        group.nombre.toLowerCase().includes(filters.search.toLowerCase()) ||
        group.descripcion?.toLowerCase().includes(filters.search.toLowerCase()))
    )
  })

  const groupColumns = [
    {
      key: 'nombre',
      label: 'Grupo',
      render: (value, item) => (
        <div>
          <div className="fw-semibold">{item.nombre}</div>
          <small className="text-muted">{item.descripcion}</small>
          <div className="mt-1">
            <CBadge color={getStateInfo(item.estado_grupo_id).color}>{item.estado}</CBadge>
          </div>
        </div>
      ),
    },
    {
      key: 'grado',
      label: 'Grado/Nivel',
      render: (value, item) => (
        <div>
          <div className="fw-semibold">{item.grado.nombre}</div>
          <small className="text-muted">{item.nivel.nombre}</small>
        </div>
      ),
    },
    {
      key: 'director',
      label: 'Director de Grupo',
      render: (value, item) => (
        <div>
          <div className="fw-semibold">
            {item.director.nombre} {item.director.apellido}
          </div>
          <small className="text-muted">{item.director.email}</small>
        </div>
      ),
    },
    {
      key: 'estudiantes',
      label: 'Estudiantes',
      render: (value, item) => {
        const occupancy = calculateOccupancy(item)
        return (
          <div>
            <div className="fw-semibold">
              {item.estudiantes_matriculados}/{item.capacidad_maxima}
            </div>
            <CProgress value={occupancy} className="mb-1" />
            <small className="text-muted">{occupancy}% ocupación</small>
          </div>
        )
      },
    },
    {
      key: 'rendimiento',
      label: 'Rendimiento',
      render: (value, item) => (
        <div>
          <div>
            <small>
              <strong>Asistencia:</strong> {item.promedio_asistencia}%
            </small>
          </div>
          <div>
            <small>
              <strong>Académico:</strong> {item.promedio_rendimiento}
            </small>
          </div>
          <div>
            <small>
              <strong>Activos:</strong> {item.estudiantes_activos}
            </small>
          </div>
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
            onClick={() => handleManageStudents(item)}
            title="Gestionar estudiantes"
          >
            <CIcon icon={cilPeople} size="sm" />
          </CButton>
          <CButton
            color="info"
            variant="outline"
            size="sm"
            onClick={() => handleEditGroup(item)}
            title="Editar grupo"
          >
            <CIcon icon={cilPencil} size="sm" />
          </CButton>
          <CButton
            color="danger"
            variant="outline"
            size="sm"
            onClick={() => handleDeleteGroup(item)}
            title="Eliminar grupo"
            disabled={item.estudiantes_matriculados > 0}
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

          {/* Summary Cards */}
          <CRow className="mb-3">
            <CCol md={3}>
              <CCard className="text-center">
                <CCardBody>
                  <h4 className="text-primary">{groups.length}</h4>
                  <small className="text-muted">Total Grupos</small>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={3}>
              <CCard className="text-center">
                <CCardBody>
                  <h4 className="text-success">
                    {groups.filter((g) => g.estado === 'Activo').length}
                  </h4>
                  <small className="text-muted">Grupos Activos</small>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={3}>
              <CCard className="text-center">
                <CCardBody>
                  <h4 className="text-info">
                    {groups.reduce((sum, g) => sum + g.estudiantes_matriculados, 0)}
                  </h4>
                  <small className="text-muted">Total Estudiantes</small>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={3}>
              <CCard className="text-center">
                <CCardBody>
                  <h4 className="text-warning">
                    {Math.round(
                      groups.reduce((sum, g) => sum + calculateOccupancy(g), 0) / groups.length,
                    ) || 0}
                    %
                  </h4>
                  <small className="text-muted">Ocupación Promedio</small>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          {/* Filters */}
          <CCard className="mb-3">
            <CCardBody>
              <CRow>
                <CCol md={2}>
                  <CFormSelect
                    value={filters.grado}
                    onChange={(e) => setFilters((prev) => ({ ...prev, grado: e.target.value }))}
                  >
                    <option value="">Todos los grados</option>
                    {grades.map((grade) => (
                      <option key={grade.id} value={grade.id}>
                        {grade.nombre}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={2}>
                  <CFormSelect
                    value={filters.nivel}
                    onChange={(e) => setFilters((prev) => ({ ...prev, nivel: e.target.value }))}
                  >
                    <option value="">Todos los niveles</option>
                    {academicLevels.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.nombre}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={2}>
                  <CFormSelect
                    value={filters.estado}
                    onChange={(e) => setFilters((prev) => ({ ...prev, estado: e.target.value }))}
                  >
                    <option value="">Todos los estados</option>
                    {groupStates.map((state) => (
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
                      placeholder="Buscar grupos..."
                      value={filters.search}
                      onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>

          <DataTable
            data={filteredGroups}
            columns={groupColumns}
            title="Gestión de Grupos Académicos"
            loading={loading}
            searchable={false} // Using custom search
            sortable={true}
            paginated={true}
            pageSize={10}
            actions={
              <CButton
                color="primary"
                onClick={handleCreateGroup}
                className="d-flex align-items-center"
              >
                <CIcon icon={cilPlus} className="me-2" />
                Nuevo Grupo
              </CButton>
            }
          />
        </CCol>
      </CRow>

      {/* Group Modal */}
      <CModal
        visible={groupModal.visible}
        onClose={() => setGroupModal({ visible: false, group: null, mode: 'create' })}
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>
            {groupModal.mode === 'create' ? 'Crear Nuevo Grupo' : 'Editar Grupo'}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow>
              <CCol md={6} className="mb-3">
                <label className="form-label">Nombre del Grupo *</label>
                <CFormInput
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ej: 10-A, 11-B"
                  required
                />
              </CCol>
              <CCol md={6} className="mb-3">
                <label className="form-label">Capacidad Máxima</label>
                <CFormInput
                  type="number"
                  name="capacidad_maxima"
                  value={formData.capacidad_maxima}
                  onChange={handleInputChange}
                  min="1"
                  max="50"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6} className="mb-3">
                <label className="form-label">Grado *</label>
                <CFormSelect
                  name="grado_id"
                  value={formData.grado_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccionar grado</option>
                  {grades.map((grade) => (
                    <option key={grade.id} value={grade.id}>
                      {grade.nombre} ({grade.nivel.nombre})
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={6} className="mb-3">
                <label className="form-label">Nivel Académico *</label>
                <CFormSelect
                  name="nivel_academico_id"
                  value={formData.nivel_academico_id}
                  onChange={handleInputChange}
                  required
                  disabled={!formData.grado_id}
                >
                  <option value="">Seleccionar nivel</option>
                  {academicLevels.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.nombre}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6} className="mb-3">
                <label className="form-label">Director de Grupo *</label>
                <CFormSelect
                  name="usuario_id_director"
                  value={formData.usuario_id_director}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccionar director</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.nombre} {teacher.apellido}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={6} className="mb-3">
                <label className="form-label">Estado del Grupo</label>
                <CFormSelect
                  name="estado_grupo_id"
                  value={formData.estado_grupo_id}
                  onChange={handleInputChange}
                >
                  {groupStates.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.nombre}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12} className="mb-3">
                <label className="form-label">Descripción</label>
                <CFormInput
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  placeholder="Descripción del grupo, énfasis, características especiales..."
                />
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
                  placeholder="Observaciones adicionales sobre el grupo..."
                />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setGroupModal({ visible: false, group: null, mode: 'create' })}
          >
            Cancelar
          </CButton>
          <CButton color="primary" onClick={saveGroup} disabled={loading}>
            {loading ? (
              <>
                <CSpinner size="sm" className="me-2" />
                Guardando...
              </>
            ) : (
              <>
                <CIcon icon={cilSave} className="me-2" />
                {groupModal.mode === 'create' ? 'Crear Grupo' : 'Actualizar Grupo'}
              </>
            )}
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Student Management Modal */}
      <CModal
        visible={studentModal.visible}
        onClose={() => setStudentModal({ visible: false, group: null })}
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>Gestionar Estudiantes - {studentModal.group?.nombre}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {studentModal.group && (
            <div>
              <div className="mb-3">
                <strong>Grupo:</strong> {studentModal.group.nombre}
                <br />
                <strong>Grado:</strong> {studentModal.group.grado?.nombre}
                <br />
                <strong>Director:</strong> {studentModal.group.director?.nombre}{' '}
                {studentModal.group.director?.apellido}
                <br />
                <strong>Capacidad:</strong> {studentModal.group.estudiantes_matriculados}/
                {studentModal.group.capacidad_maxima}
              </div>

              <h6>Estudiantes Matriculados</h6>
              <CListGroup>
                {students
                  .filter((s) => s.grupo_id === studentModal.group.id)
                  .map((student) => (
                    <CListGroupItem
                      key={student.id}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>
                          {student.nombre} {student.apellido}
                        </strong>
                        <div>
                          <small className="text-muted">Documento: {student.documento}</small>
                        </div>
                      </div>
                      <CButton color="danger" variant="outline" size="sm">
                        <CIcon icon={cilUserUnfollow} size="sm" />
                      </CButton>
                    </CListGroupItem>
                  ))}
              </CListGroup>

              {students.filter((s) => s.grupo_id === studentModal.group.id).length === 0 && (
                <CAlert color="info">No hay estudiantes matriculados en este grupo.</CAlert>
              )}
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" variant="outline">
            <CIcon icon={cilUserFollow} className="me-2" />
            Agregar Estudiantes
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setStudentModal({ visible: false, group: null })}
          >
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        visible={deleteDialog.visible}
        onClose={() => setDeleteDialog({ visible: false, group: null })}
        onConfirm={confirmDelete}
        title="Eliminar Grupo"
        message={`¿Está seguro de que desea eliminar el grupo "${deleteDialog.group?.nombre}"? Esta acción no se puede deshacer.`}
        type="danger"
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </>
  )
}

export default GroupManager
