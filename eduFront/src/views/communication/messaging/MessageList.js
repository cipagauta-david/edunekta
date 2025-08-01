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
  CAvatar,
  CListGroup,
  CListGroupItem,
  CInputGroup,
  CFormInput,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CButtonGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPlus,
  cilEnvelopeOpen,
  cilEnvelopeClosed,
  cilSearch,
  cilOptions,
  cilTrash,
  cilStar,
  // cilReply,
  cilClock,
} from '@coreui/icons'
import LoadingSpinner from '../../../components/common/LoadingSpinner'

const MessageList = () => {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [filteredMessages, setFilteredMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all') // all, unread, important, sent
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    loadMessages()
  }, [])

  useEffect(() => {
    filterMessages()
  }, [messages, searchTerm, filter])

  const loadMessages = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data
      const mockMessages = [
        {
          id: 1,
          subject: 'Recordatorio: Entrega de proyecto final',
          sender: {
            id: 1,
            name: 'Dr. Juan Pérez',
            avatar: '',
            role: 'teacher',
          },
          recipient: 'Tú',
          preview:
            'Les recuerdo que la fecha límite para la entrega del proyecto final de Matemáticas Avanzadas es el próximo viernes...',
          timestamp: '2024-07-29T14:30:00',
          isRead: false,
          isImportant: true,
          hasAttachment: true,
          type: 'received',
        },
        {
          id: 2,
          subject: 'Consulta sobre el laboratorio de química',
          sender: {
            id: 2,
            name: 'María García',
            avatar: '',
            role: 'student',
          },
          recipient: 'Tú',
          preview:
            'Profesor, tengo una duda sobre el procedimiento del experimento que realizamos ayer en el laboratorio...',
          timestamp: '2024-07-29T11:15:00',
          isRead: false,
          isImportant: false,
          hasAttachment: false,
          type: 'received',
        },
        {
          id: 3,
          subject: 'Re: Horarios de tutorías',
          sender: {
            id: 3,
            name: 'Tú',
            avatar: '',
            role: 'teacher',
          },
          recipient: 'Carlos López',
          preview:
            'Hola Carlos, los horarios de tutoría para esta semana son: Lunes 2-4 PM, Miércoles 10-12 AM...',
          timestamp: '2024-07-29T09:45:00',
          isRead: true,
          isImportant: false,
          hasAttachment: false,
          type: 'sent',
        },
        {
          id: 4,
          subject: 'Invitación: Conferencia sobre IA en Educación',
          sender: {
            id: 4,
            name: 'Administración',
            avatar: '',
            role: 'admin',
          },
          recipient: 'Todos los profesores',
          preview:
            'Estimados colegas, los invitamos cordialmente a participar en la conferencia sobre Inteligencia Artificial en Educación...',
          timestamp: '2024-07-28T16:20:00',
          isRead: true,
          isImportant: true,
          hasAttachment: true,
          type: 'received',
        },
        {
          id: 5,
          subject: 'Solicitud de extensión para tarea',
          sender: {
            id: 5,
            name: 'Ana Martínez',
            avatar: '',
            role: 'student',
          },
          recipient: 'Tú',
          preview:
            'Estimado profesor, me dirijo a usted para solicitar una extensión en la fecha de entrega de la tarea...',
          timestamp: '2024-07-28T13:10:00',
          isRead: true,
          isImportant: false,
          hasAttachment: false,
          type: 'received',
        },
        {
          id: 6,
          subject: 'Felicitaciones por el proyecto',
          sender: {
            id: 6,
            name: 'Tú',
            avatar: '',
            role: 'teacher',
          },
          recipient: 'Roberto Silva',
          preview:
            'Hola Roberto, quería felicitarte por el excelente trabajo que presentaste en el proyecto de programación...',
          timestamp: '2024-07-27T15:30:00',
          isRead: true,
          isImportant: false,
          hasAttachment: false,
          type: 'sent',
        },
        {
          id: 7,
          subject: 'Cambio en el horario de clases',
          sender: {
            id: 7,
            name: 'Coordinación Académica',
            avatar: '',
            role: 'admin',
          },
          recipient: 'Estudiantes de Historia',
          preview:
            'Estimados estudiantes, les informamos que debido a circunstancias imprevistas, la clase de Historia Universal...',
          timestamp: '2024-07-27T08:45:00',
          isRead: true,
          isImportant: true,
          hasAttachment: false,
          type: 'received',
        },
      ]

      setMessages(mockMessages)
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al cargar los mensajes' })
    } finally {
      setLoading(false)
    }
  }

  const filterMessages = () => {
    let filtered = messages

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (msg) =>
          msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          msg.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          msg.preview.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply category filter
    switch (filter) {
      case 'unread':
        filtered = filtered.filter((msg) => !msg.isRead)
        break
      case 'important':
        filtered = filtered.filter((msg) => msg.isImportant)
        break
      case 'sent':
        filtered = filtered.filter((msg) => msg.type === 'sent')
        break
      default:
        // 'all' - no additional filtering
        break
    }

    setFilteredMessages(filtered)
  }

  const handleComposeMessage = () => {
    navigate('/communication/messages/compose')
  }

  const handleMessageClick = (messageItem) => {
    navigate(`/communication/messages/${messageItem.id}`)

    // Mark as read if it's unread
    if (!messageItem.isRead) {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === messageItem.id ? { ...msg, isRead: true } : msg)),
      )
    }
  }

  const handleToggleImportant = (messageItem, e) => {
    e.stopPropagation()
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageItem.id ? { ...msg, isImportant: !msg.isImportant } : msg,
      ),
    )
  }

  const handleDeleteMessage = (messageItem, e) => {
    e.stopPropagation()
    setMessages((prev) => prev.filter((msg) => msg.id !== messageItem.id))
    setMessage({ type: 'success', text: 'Mensaje eliminado' })
  }

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: { color: 'danger', text: 'Admin' },
      teacher: { color: 'primary', text: 'Prof' },
      student: { color: 'info', text: 'Est' },
    }
    const config = roleConfig[role] || roleConfig.student
    return (
      <CBadge color={config.color} shape="rounded-pill" className="ms-2">
        {config.text}
      </CBadge>
    )
  }

  const formatTime = (time) => {
    const date = new Date(time)
    const now = new Date()
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffHours < 1) return 'Hace menos de 1 hora'
    if (diffHours < 24) return `Hace ${diffHours} horas`
    if (diffHours < 48) return 'Ayer'
    return date.toLocaleDateString('es-ES')
  }

  const getUnreadCount = () => messages.filter((msg) => !msg.isRead).length
  const getImportantCount = () => messages.filter((msg) => msg.isImportant).length
  const getSentCount = () => messages.filter((msg) => msg.type === 'sent').length

  if (loading) {
    return <LoadingSpinner text="Cargando mensajes..." />
  }

  return (
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

        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <CIcon icon={cilEnvelopeOpen} className="me-2" />
              <h4 className="mb-0">Mensajes</h4>
            </div>
            <CButton
              color="primary"
              onClick={handleComposeMessage}
              className="d-flex align-items-center"
            >
              <CIcon icon={cilPlus} className="me-2" />
              Nuevo Mensaje
            </CButton>
          </CCardHeader>

          <CCardBody>
            {/* Filters and Search */}
            <CRow className="mb-3">
              <CCol md={8}>
                <CInputGroup>
                  <CFormInput
                    placeholder="Buscar mensajes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <CButton variant="outline" color="secondary">
                    <CIcon icon={cilSearch} />
                  </CButton>
                </CInputGroup>
              </CCol>
              <CCol md={4}>
                <CButtonGroup className="w-100">
                  <CButton
                    color={filter === 'all' ? 'primary' : 'outline-primary'}
                    onClick={() => setFilter('all')}
                    size="sm"
                  >
                    Todos ({messages.length})
                  </CButton>
                  <CButton
                    color={filter === 'unread' ? 'primary' : 'outline-primary'}
                    onClick={() => setFilter('unread')}
                    size="sm"
                  >
                    No leídos ({getUnreadCount()})
                  </CButton>
                  <CButton
                    color={filter === 'important' ? 'primary' : 'outline-primary'}
                    onClick={() => setFilter('important')}
                    size="sm"
                  >
                    Importantes ({getImportantCount()})
                  </CButton>
                  <CButton
                    color={filter === 'sent' ? 'primary' : 'outline-primary'}
                    onClick={() => setFilter('sent')}
                    size="sm"
                  >
                    Enviados ({getSentCount()})
                  </CButton>
                </CButtonGroup>
              </CCol>
            </CRow>

            {/* Messages List */}
            <CListGroup flush>
              {filteredMessages.length === 0 ? (
                <CListGroupItem className="text-center py-4">
                  <div className="text-muted">
                    {searchTerm ? 'No se encontraron mensajes' : 'No hay mensajes'}
                  </div>
                </CListGroupItem>
              ) : (
                filteredMessages.map((messageItem) => (
                  <CListGroupItem
                    key={messageItem.id}
                    className={`cursor-pointer hover-bg-light p-3 ${!messageItem.isRead ? 'bg-light' : ''}`}
                    onClick={() => handleMessageClick(messageItem)}
                  >
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <CAvatar
                          size="md"
                          src={
                            messageItem.sender.avatar ||
                            `https://ui-avatars.com/api/?name=${messageItem.sender.name}&background=0d6efd&color=fff`
                          }
                        />
                      </div>

                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start mb-1">
                          <div className="flex-grow-1">
                            <div className="d-flex align-items-center">
                              <span className={`fw-${!messageItem.isRead ? 'bold' : 'normal'}`}>
                                {messageItem.type === 'sent'
                                  ? `Para: ${messageItem.recipient}`
                                  : messageItem.sender.name}
                              </span>
                              {messageItem.sender.role && getRoleBadge(messageItem.sender.role)}
                              {messageItem.hasAttachment && (
                                <CIcon
                                  icon={cilOptions}
                                  className="text-muted ms-2"
                                  title="Tiene adjuntos"
                                />
                              )}
                            </div>
                          </div>

                          <div className="d-flex align-items-center gap-2">
                            <small className="text-muted">
                              <CIcon icon={cilClock} className="me-1" />
                              {formatTime(messageItem.timestamp)}
                            </small>

                            <CDropdown>
                              <CDropdownToggle
                                color="transparent"
                                size="sm"
                                className="p-1"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <CIcon icon={cilOptions} />
                              </CDropdownToggle>
                              <CDropdownMenu>
                                <CDropdownItem
                                  onClick={(e) => handleToggleImportant(messageItem, e)}
                                >
                                  <CIcon
                                    icon={cilStar}
                                    className={`me-2 ${messageItem.isImportant ? 'text-warning' : ''}`}
                                  />
                                  {messageItem.isImportant
                                    ? 'Quitar importancia'
                                    : 'Marcar importante'}
                                </CDropdownItem>
                                <CDropdownItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    navigate(`/communication/messages/reply/${messageItem.id}`)
                                  }}
                                >
                                  <CIcon icon={cilEnvelopeOpen} className="me-2" />
                                  Responder
                                </CDropdownItem>
                                <CDropdownItem divider />
                                <CDropdownItem
                                  onClick={(e) => handleDeleteMessage(messageItem, e)}
                                  className="text-danger"
                                >
                                  <CIcon icon={cilTrash} className="me-2" />
                                  Eliminar
                                </CDropdownItem>
                              </CDropdownMenu>
                            </CDropdown>
                          </div>
                        </div>

                        <div className={`fw-${!messageItem.isRead ? 'semibold' : 'normal'} mb-1`}>
                          {messageItem.isImportant && (
                            <CIcon icon={cilStar} className="text-warning me-2" />
                          )}
                          {messageItem.subject}
                        </div>

                        <div className="text-muted small">{messageItem.preview}</div>
                      </div>

                      <div className="flex-shrink-0 ms-2">
                        {!messageItem.isRead && (
                          <div
                            className="bg-primary rounded-circle"
                            style={{ width: '8px', height: '8px' }}
                          ></div>
                        )}
                      </div>
                    </div>
                  </CListGroupItem>
                ))
              )}
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default MessageList
