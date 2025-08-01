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
  CListGroup,
  CListGroupItem,
  CSpinner,
  CFormTextarea,
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
  cilBell,
  cilBellExclamation,
  cilEnvelopeClosed,
  cilSearch,
  cilSend,
  cilSettings,
  cilCheckAlt,
  cilX,
  cilClock,
  cilInfo,
  cilWarning,
  cilBan,
} from '@coreui/icons'
import DataTable from '../../../components/common/DataTable'
import ConfirmDialog from '../../../components/common/ConfirmDialog'

const NotificationCenter = () => {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('received')
  const [notificationModal, setNotificationModal] = useState({
    visible: false,
    notification: null,
    mode: 'create',
  })
  const [deleteDialog, setDeleteDialog] = useState({ visible: false, notification: null })
  const [message, setMessage] = useState({ type: '', text: '' })
  const [filters, setFilters] = useState({
    tipo: '',
    estado: '',
    search: '',
  })
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
    tipo_notificacion: 'Información',
    prioridad: 'Media',
    destinatarios: [],
    fecha_programada: '',
  })

  // Current user (mock)
  const currentUser = {
    id: 1,
    nombre: 'Juan Carlos',
    apellido: 'Pérez García',
    email: 'juan.perez@edunekta.edu',
  }

  const notificationTypes = [
    { value: 'Información', color: 'info', icon: cilInfo },
    { value: 'Advertencia', color: 'warning', icon: cilWarning },
    { value: 'Error', color: 'danger', icon: cilBan },
    { value: 'Éxito', color: 'success', icon: cilCheckAlt },
    { value: 'Recordatorio', color: 'primary', icon: cilClock },
  ]

  const priorityLevels = [
    { value: 'Baja', color: 'secondary' },
    { value: 'Media', color: 'info' },
    { value: 'Alta', color: 'warning' },
    { value: 'Crítica', color: 'danger' },
  ]

  const notificationStates = [
    { value: 'Pendiente', color: 'warning' },
    { value: 'Enviada', color: 'info' },
    { value: 'Leída', color: 'success' },
    { value: 'Archivada', color: 'secondary' },
  ]

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      // Simulate API calls
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data based on notificacion table structure
      const mockUsers = [
        {
          id: 1,
          nombre: 'Juan Carlos',
          apellido: 'Pérez García',
          email: 'juan.perez@edunekta.edu',
          rol: 'Administrador',
        },
        {
          id: 2,
          nombre: 'María Elena',
          apellido: 'García López',
          email: 'maria.garcia@edunekta.edu',
          rol: 'Profesor',
        },
        {
          id: 3,
          nombre: 'Ana Sofía',
          apellido: 'Martínez Silva',
          email: 'ana.martinez@estudiante.edu',
          rol: 'Estudiante',
        },
        {
          id: 4,
          nombre: 'Carlos Eduardo',
          apellido: 'Rodríguez Pérez',
          email: 'carlos.rodriguez@padre.edu',
          rol: 'Acudiente',
        },
      ]

      const mockNotifications = [
        {
          id: 1,
          usuario_id: 1,
          destinatario: mockUsers[0],
          titulo: 'Reunión de Coordinación Académica',
          contenido:
            'Se ha programado una reunión de coordinación académica para el próximo viernes 2 de agosto a las 10:00 AM en la sala de profesores.',
          tipo_notificacion: 'Información',
          prioridad: 'Alta',
          estado_notificacion_id: 2,
          estado: 'Enviada',
          fecha_creacion: '2024-07-30T08:00:00',
          fecha_programada: '2024-07-30T08:00:00',
          fecha_leida: null,
          remitente: 'Sistema',
          es_enviada: false, // Received notification
          leida: false,
        },
        {
          id: 2,
          usuario_id: 1,
          destinatario: mockUsers[0],
          titulo: 'Calificaciones del Período Actualizadas',
          contenido:
            'Las calificaciones del primer período académico han sido actualizadas. Puede revisar los reportes en el módulo de calificaciones.',
          tipo_notificacion: 'Éxito',
          prioridad: 'Media',
          estado_notificacion_id: 3,
          estado: 'Leída',
          fecha_creacion: '2024-07-29T14:30:00',
          fecha_programada: '2024-07-29T14:30:00',
          fecha_leida: '2024-07-29T15:45:00',
          remitente: 'Sistema Académico',
          es_enviada: false,
          leida: true,
        },
        {
          id: 3,
          usuario_id: 2,
          destinatario: mockUsers[1],
          titulo: 'Recordatorio: Entrega de Reportes',
          contenido:
            'Recordatorio: Los reportes académicos del período deben ser entregados antes del 5 de agosto.',
          tipo_notificacion: 'Recordatorio',
          prioridad: 'Alta',
          estado_notificacion_id: 1,
          estado: 'Pendiente',
          fecha_creacion: '2024-07-30T09:00:00',
          fecha_programada: '2024-08-01T08:00:00',
          fecha_leida: null,
          remitente: currentUser.nombre + ' ' + currentUser.apellido,
          es_enviada: true, // Sent notification
          leida: false,
        },
        {
          id: 4,
          usuario_id: 3,
          destinatario: mockUsers[2],
          titulo: 'Nueva Actividad Disponible',
          contenido:
            'Se ha publicado una nueva actividad de Matemáticas. Fecha límite de entrega: 10 de agosto.',
          tipo_notificacion: 'Información',
          prioridad: 'Media',
          estado_notificacion_id: 2,
          estado: 'Enviada',
          fecha_creacion: '2024-07-30T10:15:00',
          fecha_programada: '2024-07-30T10:15:00',
          fecha_leida: null,
          remitente: currentUser.nombre + ' ' + currentUser.apellido,
          es_enviada: true,
          leida: false,
        },
      ]

      setNotifications(mockNotifications)
      setUsers(mockUsers)
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al cargar las notificaciones' })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNotification = () => {
    setFormData({
      titulo: '',
      contenido: '',
      tipo_notificacion: 'Información',
      prioridad: 'Media',
      destinatarios: [],
      fecha_programada: '',
    })
    setNotificationModal({ visible: true, notification: null, mode: 'create' })
  }

  const handleEditNotification = (notification) => {
    setFormData({
      titulo: notification.titulo,
      contenido: notification.contenido,
      tipo_notificacion: notification.tipo_notificacion,
      prioridad: notification.prioridad,
      destinatarios: [notification.usuario_id],
      fecha_programada: notification.fecha_programada
        ? notification.fecha_programada.slice(0, 16)
        : '',
    })
    setNotificationModal({ visible: true, notification, mode: 'edit' })
  }

  const handleDeleteNotification = (notification) => {
    setDeleteDialog({ visible: true, notification })
  }

  const handleMarkAsRead = async (notificationId) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === notificationId
            ? {
                ...notif,
                estado_notificacion_id: 3,
                estado: 'Leída',
                fecha_leida: new Date().toISOString(),
                leida: true,
              }
            : notif,
        ),
      )
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al marcar como leída' })
    }
  }

  const handleArchiveNotification = async (notificationId) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === notificationId
            ? {
                ...notif,
                estado_notificacion_id: 4,
                estado: 'Archivada',
              }
            : notif,
        ),
      )

      setMessage({ type: 'success', text: 'Notificación archivada' })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al archivar notificación' })
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDestinatarioChange = (userId, checked) => {
    setFormData((prev) => ({
      ...prev,
      destinatarios: checked
        ? [...prev.destinatarios, userId]
        : prev.destinatarios.filter((id) => id !== userId),
    }))
  }

  const validateForm = () => {
    const required = ['titulo', 'contenido']
    const missing = required.filter((field) => !formData[field])

    if (missing.length > 0) {
      setMessage({ type: 'danger', text: 'Por favor, complete todos los campos obligatorios' })
      return false
    }

    if (formData.destinatarios.length === 0) {
      setMessage({ type: 'danger', text: 'Debe seleccionar al menos un destinatario' })
      return false
    }

    return true
  }

  const saveNotification = async () => {
    if (!validateForm()) return

    try {
      setLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const typeInfo = notificationTypes.find((t) => t.value === formData.tipo_notificacion)
      const now = new Date().toISOString()
      const scheduledDate = formData.fecha_programada
        ? new Date(formData.fecha_programada).toISOString()
        : now

      if (notificationModal.mode === 'create') {
        // Create notifications for each destinatario
        const newNotifications = formData.destinatarios.map((userId) => ({
          id: Date.now() + userId,
          usuario_id: userId,
          destinatario: users.find((u) => u.id === userId),
          titulo: formData.titulo,
          contenido: formData.contenido,
          tipo_notificacion: formData.tipo_notificacion,
          prioridad: formData.prioridad,
          estado_notificacion_id: formData.fecha_programada ? 1 : 2,
          estado: formData.fecha_programada ? 'Pendiente' : 'Enviada',
          fecha_creacion: now,
          fecha_programada: scheduledDate,
          fecha_leida: null,
          remitente: currentUser.nombre + ' ' + currentUser.apellido,
          es_enviada: true,
          leida: false,
        }))

        setNotifications((prev) => [...newNotifications, ...prev])
        setMessage({
          type: 'success',
          text: `Notificación enviada a ${formData.destinatarios.length} destinatario(s)`,
        })
      } else {
        // Update existing notification
        setNotifications((prev) =>
          prev.map((notif) =>
            notif.id === notificationModal.notification.id
              ? {
                  ...notif,
                  titulo: formData.titulo,
                  contenido: formData.contenido,
                  tipo_notificacion: formData.tipo_notificacion,
                  prioridad: formData.prioridad,
                  fecha_programada: scheduledDate,
                }
              : notif,
          ),
        )
        setMessage({ type: 'success', text: 'Notificación actualizada exitosamente' })
      }

      setNotificationModal({ visible: false, notification: null, mode: 'create' })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al guardar la notificación' })
    } finally {
      setLoading(false)
    }
  }

  const confirmDelete = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setNotifications((prev) => prev.filter((notif) => notif.id !== deleteDialog.notification.id))
      setMessage({ type: 'success', text: 'Notificación eliminada exitosamente' })
      setDeleteDialog({ visible: false, notification: null })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al eliminar la notificación' })
    }
  }

  const getTypeInfo = (type) => {
    return notificationTypes.find((t) => t.value === type) || notificationTypes[0]
  }

  const getPriorityInfo = (priority) => {
    return priorityLevels.find((p) => p.value === priority) || priorityLevels[1]
  }

  const getStateInfo = (state) => {
    return notificationStates.find((s) => s.value === state) || notificationStates[0]
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

  const receivedNotifications = notifications.filter((n) => !n.es_enviada)
  const sentNotifications = notifications.filter((n) => n.es_enviada)

  const filteredNotifications = (
    activeTab === 'received' ? receivedNotifications : sentNotifications
  ).filter((notif) => {
    return (
      (!filters.tipo || notif.tipo_notificacion === filters.tipo) &&
      (!filters.estado || notif.estado === filters.estado) &&
      (!filters.search ||
        notif.titulo.toLowerCase().includes(filters.search.toLowerCase()) ||
        notif.contenido.toLowerCase().includes(filters.search.toLowerCase()))
    )
  })

  const unreadCount = receivedNotifications.filter((n) => !n.leida).length

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
                  <h4 className="text-primary">{receivedNotifications.length}</h4>
                  <small className="text-muted">Recibidas</small>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={3}>
              <CCard className="text-center">
                <CCardBody>
                  <h4 className="text-warning">{unreadCount}</h4>
                  <small className="text-muted">No Leídas</small>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={3}>
              <CCard className="text-center">
                <CCardBody>
                  <h4 className="text-info">{sentNotifications.length}</h4>
                  <small className="text-muted">Enviadas</small>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={3}>
              <CCard className="text-center">
                <CCardBody>
                  <h4 className="text-success">
                    {notifications.filter((n) => n.estado === 'Leída').length}
                  </h4>
                  <small className="text-muted">Leídas</small>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          <CCard>
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <CIcon icon={cilBell} className="me-2" />
                <h4 className="mb-0">Centro de Notificaciones</h4>
                {unreadCount > 0 && (
                  <CBadge color="danger" className="ms-2">
                    {unreadCount}
                  </CBadge>
                )}
              </div>
              <CButton
                color="primary"
                onClick={handleCreateNotification}
                className="d-flex align-items-center"
              >
                <CIcon icon={cilPlus} className="me-2" />
                Nueva Notificación
              </CButton>
            </CCardHeader>

            <CCardBody>
              <CTabs activeItemKey={activeTab} onActiveItemChange={setActiveTab}>
                <CTabList variant="tabs">
                  <CTab itemKey="received">
                    <CIcon icon={cilBell} className="me-2" />
                    Recibidas
                    {unreadCount > 0 && (
                      <CBadge color="danger" className="ms-2">
                        {unreadCount}
                      </CBadge>
                    )}
                  </CTab>
                  <CTab itemKey="sent">
                    <CIcon icon={cilSend} className="me-2" />
                    Enviadas
                  </CTab>
                </CTabList>

                <CTabContent>
                  <CTabPanel itemKey="received">
                    {/* Filters */}
                    <CRow className="mb-3">
                      <CCol md={3}>
                        <CFormSelect
                          value={filters.tipo}
                          onChange={(e) =>
                            setFilters((prev) => ({ ...prev, tipo: e.target.value }))
                          }
                        >
                          <option value="">Todos los tipos</option>
                          {notificationTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.value}
                            </option>
                          ))}
                        </CFormSelect>
                      </CCol>
                      <CCol md={3}>
                        <CFormSelect
                          value={filters.estado}
                          onChange={(e) =>
                            setFilters((prev) => ({ ...prev, estado: e.target.value }))
                          }
                        >
                          <option value="">Todos los estados</option>
                          {notificationStates.map((state) => (
                            <option key={state.value} value={state.value}>
                              {state.value}
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
                            placeholder="Buscar notificaciones..."
                            value={filters.search}
                            onChange={(e) =>
                              setFilters((prev) => ({ ...prev, search: e.target.value }))
                            }
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>

                    {/* Notifications List */}
                    <CListGroup>
                      {filteredNotifications.map((notification) => {
                        const typeInfo = getTypeInfo(notification.tipo_notificacion)
                        const priorityInfo = getPriorityInfo(notification.prioridad)
                        const stateInfo = getStateInfo(notification.estado)

                        return (
                          <CListGroupItem
                            key={notification.id}
                            className={`d-flex justify-content-between align-items-start ${!notification.leida ? 'bg-light border-start border-primary border-3' : ''}`}
                          >
                            <div className="flex-grow-1">
                              <div className="d-flex align-items-center mb-2">
                                <CIcon
                                  icon={typeInfo.icon}
                                  className={`me-2 text-${typeInfo.color}`}
                                />
                                <h6 className="mb-0 me-2">{notification.titulo}</h6>
                                <CBadge color={priorityInfo.color} className="me-2">
                                  {notification.prioridad}
                                </CBadge>
                                <CBadge color={stateInfo.color}>{notification.estado}</CBadge>
                              </div>
                              <p className="mb-2 text-muted">{notification.contenido}</p>
                              <div className="d-flex align-items-center text-muted">
                                <small className="me-3">
                                  <strong>De:</strong> {notification.remitente}
                                </small>
                                <small className="me-3">
                                  <CIcon icon={cilClock} className="me-1" />
                                  {formatDateTime(notification.fecha_creacion)}
                                </small>
                                {notification.fecha_leida && (
                                  <small>
                                    <CIcon icon={cilCheckAlt} className="me-1" />
                                    Leída: {formatDateTime(notification.fecha_leida)}
                                  </small>
                                )}
                              </div>
                            </div>
                            <div className="d-flex flex-column gap-1">
                              {!notification.leida && (
                                <CButton
                                  color="success"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                  title="Marcar como leída"
                                >
                                  <CIcon icon={cilCheckAlt} size="sm" />
                                </CButton>
                              )}
                              <CButton
                                color="secondary"
                                variant="outline"
                                size="sm"
                                onClick={() => handleArchiveNotification(notification.id)}
                                title="Archivar"
                              >
                                <CIcon icon={cilTrash} size="sm" />
                              </CButton>
                            </div>
                          </CListGroupItem>
                        )
                      })}
                    </CListGroup>
                  </CTabPanel>

                  <CTabPanel itemKey="sent">
                    {/* Sent Notifications */}
                    <CListGroup>
                      {filteredNotifications.map((notification) => {
                        const typeInfo = getTypeInfo(notification.tipo_notificacion)
                        const priorityInfo = getPriorityInfo(notification.prioridad)
                        const stateInfo = getStateInfo(notification.estado)

                        return (
                          <CListGroupItem
                            key={notification.id}
                            className="d-flex justify-content-between align-items-start"
                          >
                            <div className="flex-grow-1">
                              <div className="d-flex align-items-center mb-2">
                                <CIcon
                                  icon={typeInfo.icon}
                                  className={`me-2 text-${typeInfo.color}`}
                                />
                                <h6 className="mb-0 me-2">{notification.titulo}</h6>
                                <CBadge color={priorityInfo.color} className="me-2">
                                  {notification.prioridad}
                                </CBadge>
                                <CBadge color={stateInfo.color}>{notification.estado}</CBadge>
                              </div>
                              <p className="mb-2 text-muted">{notification.contenido}</p>
                              <div className="d-flex align-items-center text-muted">
                                <small className="me-3">
                                  <strong>Para:</strong> {notification.destinatario.nombre}{' '}
                                  {notification.destinatario.apellido}
                                </small>
                                <small className="me-3">
                                  <CIcon icon={cilClock} className="me-1" />
                                  {formatDateTime(notification.fecha_creacion)}
                                </small>
                                {notification.fecha_programada !== notification.fecha_creacion && (
                                  <small>
                                    <CIcon icon={cilBellExclamation} className="me-1" />
                                    Programada: {formatDateTime(notification.fecha_programada)}
                                  </small>
                                )}
                              </div>
                            </div>
                            <div className="d-flex flex-column gap-1">
                              <CButton
                                color="info"
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditNotification(notification)}
                                title="Editar"
                                disabled={notification.estado === 'Enviada'}
                              >
                                <CIcon icon={cilPencil} size="sm" />
                              </CButton>
                              <CButton
                                color="danger"
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteNotification(notification)}
                                title="Eliminar"
                              >
                                <CIcon icon={cilTrash} size="sm" />
                              </CButton>
                            </div>
                          </CListGroupItem>
                        )
                      })}
                    </CListGroup>
                  </CTabPanel>
                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Notification Modal */}
      <CModal
        visible={notificationModal.visible}
        onClose={() => setNotificationModal({ visible: false, notification: null, mode: 'create' })}
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>
            {notificationModal.mode === 'create' ? 'Nueva Notificación' : 'Editar Notificación'}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow>
              <CCol md={8} className="mb-3">
                <label className="form-label">Título *</label>
                <CFormInput
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  placeholder="Título de la notificación"
                  required
                />
              </CCol>
              <CCol md={4} className="mb-3">
                <label className="form-label">Tipo</label>
                <CFormSelect
                  name="tipo_notificacion"
                  value={formData.tipo_notificacion}
                  onChange={handleInputChange}
                >
                  {notificationTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.value}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6} className="mb-3">
                <label className="form-label">Prioridad</label>
                <CFormSelect
                  name="prioridad"
                  value={formData.prioridad}
                  onChange={handleInputChange}
                >
                  {priorityLevels.map((priority) => (
                    <option key={priority.value} value={priority.value}>
                      {priority.value}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={6} className="mb-3">
                <label className="form-label">Fecha Programada (Opcional)</label>
                <CFormInput
                  type="datetime-local"
                  name="fecha_programada"
                  value={formData.fecha_programada}
                  onChange={handleInputChange}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12} className="mb-3">
                <label className="form-label">Contenido *</label>
                <CFormTextarea
                  name="contenido"
                  value={formData.contenido}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Contenido de la notificación..."
                  required
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md={12} className="mb-3">
                <label className="form-label">Destinatarios *</label>
                <CListGroup>
                  {users
                    .filter((u) => u.id !== currentUser.id)
                    .map((user) => (
                      <CListGroupItem
                        key={user.id}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <strong>
                            {user.nombre} {user.apellido}
                          </strong>
                          <div>
                            <small className="text-muted">
                              {user.email} - {user.rol}
                            </small>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={formData.destinatarios.includes(user.id)}
                          onChange={(e) => handleDestinatarioChange(user.id, e.target.checked)}
                        />
                      </CListGroupItem>
                    ))}
                </CListGroup>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              setNotificationModal({ visible: false, notification: null, mode: 'create' })
            }
          >
            Cancelar
          </CButton>
          <CButton color="primary" onClick={saveNotification} disabled={loading}>
            {loading ? (
              <>
                <CSpinner size="sm" className="me-2" />
                Guardando...
              </>
            ) : (
              <>
                <CIcon icon={cilSend} className="me-2" />
                {notificationModal.mode === 'create'
                  ? 'Enviar Notificación'
                  : 'Actualizar Notificación'}
              </>
            )}
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        visible={deleteDialog.visible}
        onClose={() => setDeleteDialog({ visible: false, notification: null })}
        onConfirm={confirmDelete}
        title="Eliminar Notificación"
        message={`¿Está seguro de que desea eliminar la notificación "${deleteDialog.notification?.titulo}"?`}
        type="danger"
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </>
  )
}

export default NotificationCenter
