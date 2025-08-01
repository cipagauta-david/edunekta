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
  CListGroup,
  CListGroupItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPlus,
  cilPencil,
  cilTrash,
  cilUser,
  cilPeople,
  cilUserFollow,
  cilSearch,
  cilSave,
  cilPhone,
  cilEnvelopeClosed,
  cilHome,
} from '@coreui/icons'
import DataTable from '../../../components/common/DataTable'
import ConfirmDialog from '../../../components/common/ConfirmDialog'

const GuardianManager = () => {
  const navigate = useNavigate()
  const [guardianRelationships, setGuardianRelationships] = useState([])
  const [students, setStudents] = useState([])
  const [guardians, setGuardians] = useState([])
  const [loading, setLoading] = useState(true)
  const [relationshipModal, setRelationshipModal] = useState({
    visible: false,
    relationship: null,
    mode: 'create',
  })
  const [deleteDialog, setDeleteDialog] = useState({ visible: false, relationship: null })
  const [message, setMessage] = useState({ type: '', text: '' })
  const [filters, setFilters] = useState({
    student: '',
    guardian: '',
    search: '',
  })
  const [formData, setFormData] = useState({
    usuario_id_estudiante: '',
    usuario_id_acudiente: '',
    tipo_relacion: '',
    es_responsable_principal: false,
    observaciones: '',
  })

  const relationshipTypes = [
    'Padre',
    'Madre',
    'Abuelo/a',
    'Tío/a',
    'Hermano/a',
    'Tutor Legal',
    'Otro',
  ]

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      // Simulate API calls
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data based on estudiante_acudiente table structure
      const mockStudents = [
        {
          id: 1,
          nombre: 'Ana María',
          apellido: 'García López',
          email: 'ana.garcia@estudiante.edu',
          documento: '1234567890',
          telefono: '3001234567',
          grupo: '10-A',
          grado: 'Décimo',
        },
        {
          id: 2,
          nombre: 'Carlos Eduardo',
          apellido: 'Rodríguez Pérez',
          email: 'carlos.rodriguez@estudiante.edu',
          documento: '0987654321',
          telefono: '3007654321',
          grupo: '11-B',
          grado: 'Once',
        },
        {
          id: 3,
          nombre: 'María Fernanda',
          apellido: 'Martínez Silva',
          email: 'maria.martinez@estudiante.edu',
          documento: '1122334455',
          telefono: '3009876543',
          grupo: '9-C',
          grado: 'Noveno',
        },
      ]

      const mockGuardians = [
        {
          id: 4,
          nombre: 'Roberto Carlos',
          apellido: 'García Mendoza',
          email: 'roberto.garcia@padre.edu',
          documento: '5566778899',
          telefono: '3005566778',
          direccion: 'Calle 123 #45-67',
          ocupacion: 'Ingeniero',
        },
        {
          id: 5,
          nombre: 'Patricia Elena',
          apellido: 'López Vargas',
          email: 'patricia.lopez@madre.edu',
          documento: '6677889900',
          telefono: '3006677889',
          direccion: 'Carrera 89 #12-34',
          ocupacion: 'Doctora',
        },
        {
          id: 6,
          nombre: 'Miguel Ángel',
          apellido: 'Rodríguez Castro',
          email: 'miguel.rodriguez@padre.edu',
          documento: '7788990011',
          telefono: '3007788990',
          direccion: 'Avenida 56 #78-90',
          ocupacion: 'Abogado',
        },
        {
          id: 7,
          nombre: 'Carmen Rosa',
          apellido: 'Pérez Jiménez',
          email: 'carmen.perez@madre.edu',
          documento: '8899001122',
          telefono: '3008899001',
          direccion: 'Diagonal 34 #56-78',
          ocupacion: 'Profesora',
        },
      ]

      const mockRelationships = [
        {
          id: 1,
          usuario_id_estudiante: 1,
          estudiante: mockStudents[0],
          usuario_id_acudiente: 4,
          acudiente: mockGuardians[0],
          tipo_relacion: 'Padre',
          es_responsable_principal: true,
          observaciones: 'Responsable principal del estudiante',
          fecha_creacion: '2024-01-15T10:00:00',
        },
        {
          id: 2,
          usuario_id_estudiante: 1,
          estudiante: mockStudents[0],
          usuario_id_acudiente: 5,
          acudiente: mockGuardians[1],
          tipo_relacion: 'Madre',
          es_responsable_principal: false,
          observaciones: 'Contacto secundario',
          fecha_creacion: '2024-01-15T10:30:00',
        },
        {
          id: 3,
          usuario_id_estudiante: 2,
          estudiante: mockStudents[1],
          usuario_id_acudiente: 6,
          acudiente: mockGuardians[2],
          tipo_relacion: 'Padre',
          es_responsable_principal: true,
          observaciones: null,
          fecha_creacion: '2024-01-20T14:00:00',
        },
        {
          id: 4,
          usuario_id_estudiante: 2,
          estudiante: mockStudents[1],
          usuario_id_acudiente: 7,
          acudiente: mockGuardians[3],
          tipo_relacion: 'Madre',
          es_responsable_principal: false,
          observaciones: null,
          fecha_creacion: '2024-01-20T14:15:00',
        },
      ]

      setGuardianRelationships(mockRelationships)
      setStudents(mockStudents)
      setGuardians(mockGuardians)
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al cargar las relaciones acudiente-estudiante' })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateRelationship = () => {
    setFormData({
      usuario_id_estudiante: '',
      usuario_id_acudiente: '',
      tipo_relacion: '',
      es_responsable_principal: false,
      observaciones: '',
    })
    setRelationshipModal({ visible: true, relationship: null, mode: 'create' })
  }

  const handleEditRelationship = (relationship) => {
    setFormData({
      usuario_id_estudiante: relationship.usuario_id_estudiante,
      usuario_id_acudiente: relationship.usuario_id_acudiente,
      tipo_relacion: relationship.tipo_relacion,
      es_responsable_principal: relationship.es_responsable_principal,
      observaciones: relationship.observaciones || '',
    })
    setRelationshipModal({ visible: true, relationship, mode: 'edit' })
  }

  const handleDeleteRelationship = (relationship) => {
    setDeleteDialog({ visible: true, relationship })
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const validateForm = () => {
    const required = ['usuario_id_estudiante', 'usuario_id_acudiente', 'tipo_relacion']
    const missing = required.filter((field) => !formData[field])

    if (missing.length > 0) {
      setMessage({ type: 'danger', text: 'Por favor, complete todos los campos obligatorios' })
      return false
    }

    // Check if relationship already exists
    const existingRelationship = guardianRelationships.find(
      (r) =>
        r.usuario_id_estudiante.toString() === formData.usuario_id_estudiante &&
        r.usuario_id_acudiente.toString() === formData.usuario_id_acudiente &&
        (relationshipModal.mode === 'create' || r.id !== relationshipModal.relationship?.id),
    )

    if (existingRelationship) {
      setMessage({
        type: 'danger',
        text: 'Ya existe una relación entre este estudiante y acudiente',
      })
      return false
    }

    return true
  }

  const saveRelationship = async () => {
    if (!validateForm()) return

    try {
      setLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const student = students.find((s) => s.id.toString() === formData.usuario_id_estudiante)
      const guardian = guardians.find((g) => g.id.toString() === formData.usuario_id_acudiente)

      if (relationshipModal.mode === 'create') {
        // Add new relationship
        const newRelationship = {
          id: Date.now(),
          ...formData,
          usuario_id_estudiante: parseInt(formData.usuario_id_estudiante),
          usuario_id_acudiente: parseInt(formData.usuario_id_acudiente),
          estudiante: student,
          acudiente: guardian,
          fecha_creacion: new Date().toISOString(),
        }
        setGuardianRelationships((prev) => [...prev, newRelationship])
        setMessage({ type: 'success', text: 'Relación acudiente-estudiante creada exitosamente' })
      } else {
        // Update existing relationship
        setGuardianRelationships((prev) =>
          prev.map((r) =>
            r.id === relationshipModal.relationship.id
              ? {
                  ...r,
                  ...formData,
                  usuario_id_estudiante: parseInt(formData.usuario_id_estudiante),
                  usuario_id_acudiente: parseInt(formData.usuario_id_acudiente),
                  estudiante: student,
                  acudiente: guardian,
                }
              : r,
          ),
        )
        setMessage({
          type: 'success',
          text: 'Relación acudiente-estudiante actualizada exitosamente',
        })
      }

      setRelationshipModal({ visible: false, relationship: null, mode: 'create' })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al guardar la relación acudiente-estudiante' })
    } finally {
      setLoading(false)
    }
  }

  const confirmDelete = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setGuardianRelationships((prev) => prev.filter((r) => r.id !== deleteDialog.relationship.id))
      setMessage({ type: 'success', text: 'Relación acudiente-estudiante eliminada exitosamente' })
      setDeleteDialog({ visible: false, relationship: null })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al eliminar la relación acudiente-estudiante' })
    }
  }

  const filteredRelationships = guardianRelationships.filter((relationship) => {
    return (
      (!filters.student || relationship.usuario_id_estudiante.toString() === filters.student) &&
      (!filters.guardian || relationship.usuario_id_acudiente.toString() === filters.guardian) &&
      (!filters.search ||
        relationship.estudiante.nombre.toLowerCase().includes(filters.search.toLowerCase()) ||
        relationship.estudiante.apellido.toLowerCase().includes(filters.search.toLowerCase()) ||
        relationship.acudiente.nombre.toLowerCase().includes(filters.search.toLowerCase()) ||
        relationship.acudiente.apellido.toLowerCase().includes(filters.search.toLowerCase()))
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
            <small className="text-muted">
              {item.estudiante.grupo} - {item.estudiante.grado}
            </small>
          </div>
        </div>
      ),
    },
    {
      key: 'acudiente',
      label: 'Acudiente',
      render: (value, item) => (
        <div>
          <div className="fw-semibold">
            {item.acudiente.nombre} {item.acudiente.apellido}
          </div>
          <small className="text-muted">
            <CIcon icon={cilEnvelopeClosed} className="me-1" />
            {item.acudiente.email}
          </small>
          <div>
            <small className="text-muted">
              <CIcon icon={cilPhone} className="me-1" />
              {item.acudiente.telefono}
            </small>
          </div>
        </div>
      ),
    },
    {
      key: 'tipo_relacion',
      label: 'Relación',
      render: (value, item) => (
        <div>
          <CBadge color="info">{item.tipo_relacion}</CBadge>
          {item.es_responsable_principal && (
            <div className="mt-1">
              <CBadge color="warning" variant="outline">
                Responsable Principal
              </CBadge>
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'contacto',
      label: 'Información Adicional',
      render: (value, item) => (
        <div>
          {item.acudiente.ocupacion && (
            <div>
              <small>
                <strong>Ocupación:</strong> {item.acudiente.ocupacion}
              </small>
            </div>
          )}
          {item.acudiente.direccion && (
            <div>
              <small>
                <CIcon icon={cilHome} className="me-1" />
                {item.acudiente.direccion}
              </small>
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'observaciones',
      label: 'Observaciones',
      render: (value) => <small className="text-muted">{value || 'Sin observaciones'}</small>,
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
            onClick={() => handleEditRelationship(item)}
            title="Editar relación"
          >
            <CIcon icon={cilPencil} size="sm" />
          </CButton>
          <CButton
            color="danger"
            variant="outline"
            size="sm"
            onClick={() => handleDeleteRelationship(item)}
            title="Eliminar relación"
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
                  <h4 className="text-primary">{students.length}</h4>
                  <small className="text-muted">Estudiantes</small>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={3}>
              <CCard className="text-center">
                <CCardBody>
                  <h4 className="text-info">{guardians.length}</h4>
                  <small className="text-muted">Acudientes</small>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={3}>
              <CCard className="text-center">
                <CCardBody>
                  <h4 className="text-success">{guardianRelationships.length}</h4>
                  <small className="text-muted">Relaciones</small>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={3}>
              <CCard className="text-center">
                <CCardBody>
                  <h4 className="text-warning">
                    {guardianRelationships.filter((r) => r.es_responsable_principal).length}
                  </h4>
                  <small className="text-muted">Responsables Principales</small>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          {/* Filters */}
          <CCard className="mb-3">
            <CCardBody>
              <CRow>
                <CCol md={3}>
                  <CFormSelect
                    value={filters.student}
                    onChange={(e) => setFilters((prev) => ({ ...prev, student: e.target.value }))}
                  >
                    <option value="">Todos los estudiantes</option>
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.nombre} {student.apellido}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={3}>
                  <CFormSelect
                    value={filters.guardian}
                    onChange={(e) => setFilters((prev) => ({ ...prev, guardian: e.target.value }))}
                  >
                    <option value="">Todos los acudientes</option>
                    {guardians.map((guardian) => (
                      <option key={guardian.id} value={guardian.id}>
                        {guardian.nombre} {guardian.apellido}
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
                      placeholder="Buscar relaciones..."
                      value={filters.search}
                      onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>

          <DataTable
            data={filteredRelationships}
            columns={columns}
            title="Gestión de Relaciones Acudiente-Estudiante"
            loading={loading}
            searchable={false} // Using custom search
            sortable={true}
            paginated={true}
            pageSize={15}
            actions={
              <CButton
                color="primary"
                onClick={handleCreateRelationship}
                className="d-flex align-items-center"
              >
                <CIcon icon={cilUserFollow} className="me-2" />
                Nueva Relación
              </CButton>
            }
          />
        </CCol>
      </CRow>

      {/* Relationship Modal */}
      <CModal
        visible={relationshipModal.visible}
        onClose={() => setRelationshipModal({ visible: false, relationship: null, mode: 'create' })}
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>
            {relationshipModal.mode === 'create' ? 'Crear Nueva Relación' : 'Editar Relación'}{' '}
            Acudiente-Estudiante
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow>
              <CCol md={6} className="mb-3">
                <label className="form-label">Estudiante *</label>
                <CFormSelect
                  name="usuario_id_estudiante"
                  value={formData.usuario_id_estudiante}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccionar estudiante</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.nombre} {student.apellido} - {student.grupo}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={6} className="mb-3">
                <label className="form-label">Acudiente *</label>
                <CFormSelect
                  name="usuario_id_acudiente"
                  value={formData.usuario_id_acudiente}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccionar acudiente</option>
                  {guardians.map((guardian) => (
                    <option key={guardian.id} value={guardian.id}>
                      {guardian.nombre} {guardian.apellido} - {guardian.documento}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6} className="mb-3">
                <label className="form-label">Tipo de Relación *</label>
                <CFormSelect
                  name="tipo_relacion"
                  value={formData.tipo_relacion}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccionar tipo de relación</option>
                  {relationshipTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={6} className="mb-3 d-flex align-items-end">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="es_responsable_principal"
                    checked={formData.es_responsable_principal}
                    onChange={handleInputChange}
                    id="responsablePrincipal"
                  />
                  <label className="form-check-label" htmlFor="responsablePrincipal">
                    Responsable Principal
                  </label>
                </div>
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
                  placeholder="Observaciones adicionales sobre la relación..."
                />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              setRelationshipModal({ visible: false, relationship: null, mode: 'create' })
            }
          >
            Cancelar
          </CButton>
          <CButton color="primary" onClick={saveRelationship} disabled={loading}>
            {loading ? (
              <>
                <CSpinner size="sm" className="me-2" />
                Guardando...
              </>
            ) : (
              <>
                <CIcon icon={cilSave} className="me-2" />
                {relationshipModal.mode === 'create' ? 'Crear Relación' : 'Actualizar Relación'}
              </>
            )}
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        visible={deleteDialog.visible}
        onClose={() => setDeleteDialog({ visible: false, relationship: null })}
        onConfirm={confirmDelete}
        title="Eliminar Relación Acudiente-Estudiante"
        message={`¿Está seguro de que desea eliminar la relación entre "${deleteDialog.relationship?.estudiante?.nombre} ${deleteDialog.relationship?.estudiante?.apellido}" y "${deleteDialog.relationship?.acudiente?.nombre} ${deleteDialog.relationship?.acudiente?.apellido}"?`}
        type="danger"
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </>
  )
}

export default GuardianManager
