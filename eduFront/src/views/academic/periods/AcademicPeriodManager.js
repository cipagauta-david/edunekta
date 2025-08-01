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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPlus,
  cilPencil,
  cilTrash,
  cilCalendar,
  cilClock,
  cilPlay,
  cilPause,
  cilStop,
  cilSearch,
  cilSave,
  cilSettings,
} from '@coreui/icons'
import DataTable from '../../../components/common/DataTable'
import ConfirmDialog from '../../../components/common/ConfirmDialog'

const AcademicPeriodManager = () => {
  const navigate = useNavigate()
  const [periods, setPeriods] = useState([])
  const [loading, setLoading] = useState(true)
  const [periodModal, setPeriodModal] = useState({ visible: false, period: null, mode: 'create' })
  const [deleteDialog, setDeleteDialog] = useState({ visible: false, period: null })
  const [statusDialog, setStatusDialog] = useState({ visible: false, period: null, newStatus: '' })
  const [message, setMessage] = useState({ type: '', text: '' })
  const [filters, setFilters] = useState({
    estado: '',
    search: '',
  })
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    estado_periodo_id: 1, // Default to "Programado"
    observaciones: '',
  })

  const periodStatuses = [
    { id: 1, nombre: 'Programado', color: 'info', icon: cilClock },
    { id: 2, nombre: 'Activo', color: 'success', icon: cilPlay },
    { id: 3, nombre: 'Cerrado', color: 'secondary', icon: cilStop },
    { id: 4, nombre: 'Cancelado', color: 'danger', icon: cilPause },
  ]

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      // Simulate API calls
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data based on periodo_academico table structure
      const mockPeriods = [
        {
          id: 1,
          nombre: '2024-1',
          descripcion: 'Primer semestre académico 2024',
          fecha_inicio: '2024-02-01',
          fecha_fin: '2024-06-30',
          estado_periodo_id: 2,
          estado: 'Activo',
          observaciones: 'Período académico regular',
          fecha_creacion: '2023-12-15T10:00:00',
          fecha_actualizacion: '2024-01-30T14:30:00',
          // Additional calculated fields
          duracion_dias: 150,
          progreso: 65,
          estudiantes_matriculados: 1250,
          clases_programadas: 180,
        },
        {
          id: 2,
          nombre: '2024-2',
          descripcion: 'Segundo semestre académico 2024',
          fecha_inicio: '2024-07-01',
          fecha_fin: '2024-11-30',
          estado_periodo_id: 1,
          estado: 'Programado',
          observaciones: null,
          fecha_creacion: '2024-01-20T09:00:00',
          fecha_actualizacion: '2024-01-20T09:00:00',
          duracion_dias: 153,
          progreso: 0,
          estudiantes_matriculados: 0,
          clases_programadas: 0,
        },
        {
          id: 3,
          nombre: '2023-2',
          descripcion: 'Segundo semestre académico 2023',
          fecha_inicio: '2023-07-01',
          fecha_fin: '2023-11-30',
          estado_periodo_id: 3,
          estado: 'Cerrado',
          observaciones: 'Período cerrado exitosamente',
          fecha_creacion: '2023-01-15T11:00:00',
          fecha_actualizacion: '2023-12-01T16:45:00',
          duracion_dias: 153,
          progreso: 100,
          estudiantes_matriculados: 1180,
          clases_programadas: 175,
        },
      ]

      setPeriods(mockPeriods)
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al cargar los períodos académicos' })
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePeriod = () => {
    setFormData({
      nombre: '',
      descripcion: '',
      fecha_inicio: '',
      fecha_fin: '',
      estado_periodo_id: 1,
      observaciones: '',
    })
    setPeriodModal({ visible: true, period: null, mode: 'create' })
  }

  const handleEditPeriod = (period) => {
    setFormData({
      nombre: period.nombre,
      descripcion: period.descripcion,
      fecha_inicio: period.fecha_inicio,
      fecha_fin: period.fecha_fin,
      estado_periodo_id: period.estado_periodo_id,
      observaciones: period.observaciones || '',
    })
    setPeriodModal({ visible: true, period, mode: 'edit' })
  }

  const handleDeletePeriod = (period) => {
    setDeleteDialog({ visible: true, period })
  }

  const handleStatusChange = (period, newStatusId) => {
    const newStatus = periodStatuses.find((s) => s.id === newStatusId)
    setStatusDialog({
      visible: true,
      period,
      newStatus: newStatus.nombre,
      newStatusId,
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const required = ['nombre', 'fecha_inicio', 'fecha_fin']
    const missing = required.filter((field) => !formData[field])

    if (missing.length > 0) {
      setMessage({ type: 'danger', text: 'Por favor, complete todos los campos obligatorios' })
      return false
    }

    if (new Date(formData.fecha_inicio) >= new Date(formData.fecha_fin)) {
      setMessage({ type: 'danger', text: 'La fecha de inicio debe ser anterior a la fecha de fin' })
      return false
    }

    return true
  }

  const savePeriod = async () => {
    if (!validateForm()) return

    try {
      setLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const statusInfo = periodStatuses.find((s) => s.id === parseInt(formData.estado_periodo_id))
      const startDate = new Date(formData.fecha_inicio)
      const endDate = new Date(formData.fecha_fin)
      const duracionDias = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))

      if (periodModal.mode === 'create') {
        // Add new period
        const newPeriod = {
          id: Date.now(),
          ...formData,
          estado: statusInfo.nombre,
          fecha_creacion: new Date().toISOString(),
          fecha_actualizacion: new Date().toISOString(),
          duracion_dias: duracionDias,
          progreso: 0,
          estudiantes_matriculados: 0,
          clases_programadas: 0,
        }
        setPeriods((prev) => [...prev, newPeriod])
        setMessage({ type: 'success', text: 'Período académico creado exitosamente' })
      } else {
        // Update existing period
        setPeriods((prev) =>
          prev.map((p) =>
            p.id === periodModal.period.id
              ? {
                  ...p,
                  ...formData,
                  estado: statusInfo.nombre,
                  fecha_actualizacion: new Date().toISOString(),
                  duracion_dias: duracionDias,
                }
              : p,
          ),
        )
        setMessage({ type: 'success', text: 'Período académico actualizado exitosamente' })
      }

      setPeriodModal({ visible: false, period: null, mode: 'create' })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al guardar el período académico' })
    } finally {
      setLoading(false)
    }
  }

  const confirmDelete = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setPeriods((prev) => prev.filter((p) => p.id !== deleteDialog.period.id))
      setMessage({ type: 'success', text: 'Período académico eliminado exitosamente' })
      setDeleteDialog({ visible: false, period: null })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al eliminar el período académico' })
    }
  }

  const confirmStatusChange = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setPeriods((prev) =>
        prev.map((p) =>
          p.id === statusDialog.period.id
            ? {
                ...p,
                estado_periodo_id: statusDialog.newStatusId,
                estado: statusDialog.newStatus,
                fecha_actualizacion: new Date().toISOString(),
              }
            : p,
        ),
      )
      setMessage({
        type: 'success',
        text: `Estado del período cambiado a "${statusDialog.newStatus}"`,
      })
      setStatusDialog({ visible: false, period: null, newStatus: '', newStatusId: '' })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al cambiar el estado del período' })
    }
  }

  const getStatusInfo = (statusId) => {
    return periodStatuses.find((s) => s.id === statusId) || periodStatuses[0]
  }

  const calculateProgress = (period) => {
    if (period.estado === 'Cerrado') return 100
    if (period.estado === 'Programado') return 0

    const now = new Date()
    const start = new Date(period.fecha_inicio)
    const end = new Date(period.fecha_fin)

    if (now < start) return 0
    if (now > end) return 100

    const total = end - start
    const elapsed = now - start
    return Math.round((elapsed / total) * 100)
  }

  const filteredPeriods = periods.filter((period) => {
    return (
      (!filters.estado || period.estado === filters.estado) &&
      (!filters.search ||
        period.nombre.toLowerCase().includes(filters.search.toLowerCase()) ||
        period.descripcion?.toLowerCase().includes(filters.search.toLowerCase()))
    )
  })

  const columns = [
    {
      key: 'nombre',
      label: 'Período',
      render: (value, item) => (
        <div>
          <div className="fw-semibold">{item.nombre}</div>
          <small className="text-muted">{item.descripcion}</small>
        </div>
      ),
    },
    {
      key: 'fechas',
      label: 'Fechas',
      render: (value, item) => (
        <div>
          <div className="fw-semibold">
            {new Date(item.fecha_inicio).toLocaleDateString('es-ES')} -
            {new Date(item.fecha_fin).toLocaleDateString('es-ES')}
          </div>
          <small className="text-muted">{item.duracion_dias} días</small>
        </div>
      ),
    },
    {
      key: 'estado',
      label: 'Estado',
      render: (value, item) => {
        const statusInfo = getStatusInfo(item.estado_periodo_id)
        return (
          <CBadge color={statusInfo.color}>
            <CIcon icon={statusInfo.icon} className="me-1" />
            {item.estado}
          </CBadge>
        )
      },
    },
    {
      key: 'progreso',
      label: 'Progreso',
      render: (value, item) => {
        const progress = calculateProgress(item)
        return (
          <div>
            <CProgress value={progress} className="mb-1" />
            <small className="text-muted">{progress}%</small>
          </div>
        )
      },
    },
    {
      key: 'estadisticas',
      label: 'Estadísticas',
      render: (value, item) => (
        <div>
          <div>
            <small>
              Estudiantes: <strong>{item.estudiantes_matriculados}</strong>
            </small>
          </div>
          <div>
            <small>
              Clases: <strong>{item.clases_programadas}</strong>
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
            color="info"
            variant="outline"
            size="sm"
            onClick={() => handleEditPeriod(item)}
            title="Editar período"
          >
            <CIcon icon={cilPencil} size="sm" />
          </CButton>
          <CDropdown>
            <CDropdownToggle color="warning" variant="outline" size="sm">
              <CIcon icon={cilSettings} size="sm" />
            </CDropdownToggle>
            <CDropdownMenu>
              {periodStatuses.map((status) => (
                <CDropdownItem
                  key={status.id}
                  onClick={() => handleStatusChange(item, status.id)}
                  disabled={status.id === item.estado_periodo_id}
                >
                  <CIcon icon={status.icon} className="me-2" />
                  {status.nombre}
                </CDropdownItem>
              ))}
            </CDropdownMenu>
          </CDropdown>
          <CButton
            color="danger"
            variant="outline"
            size="sm"
            onClick={() => handleDeletePeriod(item)}
            title="Eliminar período"
            disabled={item.estado === 'Activo'}
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
                  <h4 className="text-success">
                    {periods.filter((p) => p.estado === 'Activo').length}
                  </h4>
                  <small className="text-muted">Períodos Activos</small>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={3}>
              <CCard className="text-center">
                <CCardBody>
                  <h4 className="text-info">
                    {periods.filter((p) => p.estado === 'Programado').length}
                  </h4>
                  <small className="text-muted">Programados</small>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={3}>
              <CCard className="text-center">
                <CCardBody>
                  <h4 className="text-secondary">
                    {periods.filter((p) => p.estado === 'Cerrado').length}
                  </h4>
                  <small className="text-muted">Cerrados</small>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={3}>
              <CCard className="text-center">
                <CCardBody>
                  <h4 className="text-primary">
                    {periods.reduce((sum, p) => sum + p.estudiantes_matriculados, 0)}
                  </h4>
                  <small className="text-muted">Total Estudiantes</small>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          {/* Filters */}
          <CCard className="mb-3">
            <CCardBody>
              <CRow>
                <CCol md={4}>
                  <CFormSelect
                    value={filters.estado}
                    onChange={(e) => setFilters((prev) => ({ ...prev, estado: e.target.value }))}
                  >
                    <option value="">Todos los estados</option>
                    {periodStatuses.map((status) => (
                      <option key={status.id} value={status.nombre}>
                        {status.nombre}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={8}>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilSearch} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Buscar períodos..."
                      value={filters.search}
                      onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>

          <DataTable
            data={filteredPeriods}
            columns={columns}
            title="Gestión de Períodos Académicos"
            loading={loading}
            searchable={false} // Using custom search
            sortable={true}
            paginated={true}
            pageSize={10}
            actions={
              <CButton
                color="primary"
                onClick={handleCreatePeriod}
                className="d-flex align-items-center"
              >
                <CIcon icon={cilPlus} className="me-2" />
                Nuevo Período
              </CButton>
            }
          />
        </CCol>
      </CRow>

      {/* Period Modal */}
      <CModal
        visible={periodModal.visible}
        onClose={() => setPeriodModal({ visible: false, period: null, mode: 'create' })}
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>
            {periodModal.mode === 'create'
              ? 'Crear Nuevo Período Académico'
              : 'Editar Período Académico'}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow>
              <CCol md={6} className="mb-3">
                <label className="form-label">Nombre del Período *</label>
                <CFormInput
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ej: 2024-1"
                  required
                />
              </CCol>
              <CCol md={6} className="mb-3">
                <label className="form-label">Estado</label>
                <CFormSelect
                  name="estado_periodo_id"
                  value={formData.estado_periodo_id}
                  onChange={handleInputChange}
                >
                  {periodStatuses.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.nombre}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6} className="mb-3">
                <label className="form-label">Fecha de Inicio *</label>
                <CFormInput
                  type="date"
                  name="fecha_inicio"
                  value={formData.fecha_inicio}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
              <CCol md={6} className="mb-3">
                <label className="form-label">Fecha de Fin *</label>
                <CFormInput
                  type="date"
                  name="fecha_fin"
                  value={formData.fecha_fin}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12} className="mb-3">
                <label className="form-label">Descripción</label>
                <CFormInput
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  placeholder="Descripción del período académico"
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
                  placeholder="Observaciones adicionales sobre el período..."
                />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setPeriodModal({ visible: false, period: null, mode: 'create' })}
          >
            Cancelar
          </CButton>
          <CButton color="primary" onClick={savePeriod} disabled={loading}>
            {loading ? (
              <>
                <CSpinner size="sm" className="me-2" />
                Guardando...
              </>
            ) : (
              <>
                <CIcon icon={cilSave} className="me-2" />
                {periodModal.mode === 'create' ? 'Crear Período' : 'Actualizar Período'}
              </>
            )}
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        visible={deleteDialog.visible}
        onClose={() => setDeleteDialog({ visible: false, period: null })}
        onConfirm={confirmDelete}
        title="Eliminar Período Académico"
        message={`¿Está seguro de que desea eliminar el período "${deleteDialog.period?.nombre}"? Esta acción no se puede deshacer.`}
        type="danger"
        confirmText="Eliminar"
        cancelText="Cancelar"
      />

      {/* Status Change Confirmation Dialog */}
      <ConfirmDialog
        visible={statusDialog.visible}
        onClose={() =>
          setStatusDialog({ visible: false, period: null, newStatus: '', newStatusId: '' })
        }
        onConfirm={confirmStatusChange}
        title="Cambiar Estado del Período"
        message={`¿Está seguro de que desea cambiar el estado del período "${statusDialog.period?.nombre}" a "${statusDialog.newStatus}"?`}
        type="warning"
        confirmText="Cambiar Estado"
        cancelText="Cancelar"
      />
    </>
  )
}

export default AcademicPeriodManager
