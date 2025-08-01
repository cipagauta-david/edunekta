import React, { useState, useEffect, useRef } from 'react'
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
  CAvatar,
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
  cilUser,
  cilPeople,
  cilEnvelopeClosed,
  cilSearch,
  cilSend,
  cilSettings,
  cilUserFollow,
  cilUserUnfollow,
  cilClock,
  cilCheckAlt,
} from '@coreui/icons'

const ConversationManager = () => {
  const navigate = useNavigate()
  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [newConversationModal, setNewConversationModal] = useState({ visible: false })
  const [addParticipantModal, setAddParticipantModal] = useState({
    visible: false,
    conversation: null,
  })
  const [message, setMessage] = useState({ type: '', text: '' })
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedParticipants, setSelectedParticipants] = useState([])
  const [conversationTitle, setConversationTitle] = useState('')
  const messagesEndRef = useRef(null)

  // Current user (mock)
  const currentUser = {
    id: 1,
    nombre: 'Juan Carlos',
    apellido: 'Pérez García',
    email: 'juan.perez@edunekta.edu',
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.id)
    }
  }, [selectedConversation])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadData = async () => {
    setLoading(true)
    try {
      // Simulate API calls
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data based on conversacion, mensaje, and usuario_conversacion tables
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

      const mockConversations = [
        {
          id: 1,
          titulo: 'Reunión de Padres - 10-A',
          descripcion: 'Coordinación para la reunión de padres del grupo 10-A',
          estado_conversacion_id: 1,
          estado: 'Activa',
          fecha_creacion: '2024-07-25T10:00:00',
          fecha_actualizacion: '2024-07-30T15:30:00',
          participantes: [
            {
              usuario_id: 1,
              usuario: mockUsers[0],
              fecha_union: '2024-07-25T10:00:00',
              es_administrador: true,
            },
            {
              usuario_id: 2,
              usuario: mockUsers[1],
              fecha_union: '2024-07-25T10:05:00',
              es_administrador: false,
            },
            {
              usuario_id: 4,
              usuario: mockUsers[3],
              fecha_union: '2024-07-25T14:20:00',
              es_administrador: false,
            },
          ],
          ultimo_mensaje: {
            contenido: 'Perfecto, entonces quedamos confirmados para el viernes a las 3:00 PM',
            fecha_envio: '2024-07-30T15:30:00',
            remitente: mockUsers[3],
          },
          mensajes_no_leidos: 2,
        },
        {
          id: 2,
          titulo: 'Consulta Académica - Matemáticas',
          descripcion: 'Dudas sobre el tema de álgebra lineal',
          estado_conversacion_id: 1,
          estado: 'Activa',
          fecha_creacion: '2024-07-28T09:15:00',
          fecha_actualizacion: '2024-07-30T11:45:00',
          participantes: [
            {
              usuario_id: 2,
              usuario: mockUsers[1],
              fecha_union: '2024-07-28T09:15:00',
              es_administrador: true,
            },
            {
              usuario_id: 3,
              usuario: mockUsers[2],
              fecha_union: '2024-07-28T09:15:00',
              es_administrador: false,
            },
          ],
          ultimo_mensaje: {
            contenido:
              'Gracias profesora, ya entendí el concepto. ¿Podríamos revisar algunos ejercicios más?',
            fecha_envio: '2024-07-30T11:45:00',
            remitente: mockUsers[2],
          },
          mensajes_no_leidos: 1,
        },
        {
          id: 3,
          titulo: 'Coordinación Administrativa',
          descripcion: 'Temas administrativos y de gestión institucional',
          estado_conversacion_id: 1,
          estado: 'Activa',
          fecha_creacion: '2024-07-20T08:00:00',
          fecha_actualizacion: '2024-07-29T16:20:00',
          participantes: [
            {
              usuario_id: 1,
              usuario: mockUsers[0],
              fecha_union: '2024-07-20T08:00:00',
              es_administrador: true,
            },
            {
              usuario_id: 2,
              usuario: mockUsers[1],
              fecha_union: '2024-07-20T08:05:00',
              es_administrador: false,
            },
          ],
          ultimo_mensaje: {
            contenido: 'Los reportes del período están listos para revisión',
            fecha_envio: '2024-07-29T16:20:00',
            remitente: mockUsers[1],
          },
          mensajes_no_leidos: 0,
        },
      ]

      setConversations(mockConversations)
      setUsers(mockUsers)

      // Select first conversation by default
      if (mockConversations.length > 0) {
        setSelectedConversation(mockConversations[0])
      }
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al cargar las conversaciones' })
    } finally {
      setLoading(false)
    }
  }

  const loadMessages = async (conversationId) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock messages for the selected conversation
      const mockMessages = [
        {
          id: 1,
          conversacion_id: conversationId,
          usuario_id_remitente: 1,
          remitente: users.find((u) => u.id === 1),
          contenido:
            'Hola a todos, espero que estén bien. Quería coordinar con ustedes la reunión de padres del próximo viernes.',
          fecha_envio: '2024-07-25T10:00:00',
          leido: true,
        },
        {
          id: 2,
          conversacion_id: conversationId,
          usuario_id_remitente: 2,
          remitente: users.find((u) => u.id === 2),
          contenido: 'Perfecto Juan Carlos, me parece muy bien. ¿A qué hora sería conveniente?',
          fecha_envio: '2024-07-25T10:05:00',
          leido: true,
        },
        {
          id: 3,
          conversacion_id: conversationId,
          usuario_id_remitente: 1,
          remitente: users.find((u) => u.id === 1),
          contenido:
            'Propongo que sea a las 3:00 PM, así los padres que trabajan pueden asistir después del horario laboral.',
          fecha_envio: '2024-07-25T14:15:00',
          leido: true,
        },
        {
          id: 4,
          conversacion_id: conversationId,
          usuario_id_remitente: 4,
          remitente: users.find((u) => u.id === 4),
          contenido: 'Me parece perfecto el horario. ¿Qué temas vamos a tratar en la reunión?',
          fecha_envio: '2024-07-25T14:20:00',
          leido: true,
        },
        {
          id: 5,
          conversacion_id: conversationId,
          usuario_id_remitente: 2,
          remitente: users.find((u) => u.id === 2),
          contenido:
            'Principalmente el rendimiento académico del período, las actividades extracurriculares programadas y algunos ajustes al cronograma.',
          fecha_envio: '2024-07-30T15:25:00',
          leido: false,
        },
        {
          id: 6,
          conversacion_id: conversationId,
          usuario_id_remitente: 4,
          remitente: users.find((u) => u.id === 4),
          contenido: 'Perfecto, entonces quedamos confirmados para el viernes a las 3:00 PM',
          fecha_envio: '2024-07-30T15:30:00',
          leido: false,
        },
      ]

      setMessages(mockMessages)
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al cargar los mensajes' })
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newMsg = {
        id: Date.now(),
        conversacion_id: selectedConversation.id,
        usuario_id_remitente: currentUser.id,
        remitente: currentUser,
        contenido: newMessage.trim(),
        fecha_envio: new Date().toISOString(),
        leido: true,
      }

      setMessages((prev) => [...prev, newMsg])
      setNewMessage('')

      // Update conversation's last message
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation.id
            ? {
                ...conv,
                ultimo_mensaje: {
                  contenido: newMsg.contenido,
                  fecha_envio: newMsg.fecha_envio,
                  remitente: currentUser,
                },
                fecha_actualizacion: newMsg.fecha_envio,
              }
            : conv,
        ),
      )
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al enviar el mensaje' })
    }
  }

  const handleCreateConversation = async () => {
    if (!conversationTitle.trim() || selectedParticipants.length === 0) {
      setMessage({
        type: 'danger',
        text: 'Por favor, complete el título y seleccione al menos un participante',
      })
      return
    }

    try {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newConversation = {
        id: Date.now(),
        titulo: conversationTitle.trim(),
        descripcion: '',
        estado_conversacion_id: 1,
        estado: 'Activa',
        fecha_creacion: new Date().toISOString(),
        fecha_actualizacion: new Date().toISOString(),
        participantes: [
          {
            usuario_id: currentUser.id,
            usuario: currentUser,
            fecha_union: new Date().toISOString(),
            es_administrador: true,
          },
          ...selectedParticipants.map((userId) => ({
            usuario_id: userId,
            usuario: users.find((u) => u.id === userId),
            fecha_union: new Date().toISOString(),
            es_administrador: false,
          })),
        ],
        ultimo_mensaje: null,
        mensajes_no_leidos: 0,
      }

      setConversations((prev) => [newConversation, ...prev])
      setSelectedConversation(newConversation)
      setNewConversationModal({ visible: false })
      setConversationTitle('')
      setSelectedParticipants([])
      setMessage({ type: 'success', text: 'Conversación creada exitosamente' })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al crear la conversación' })
    } finally {
      setLoading(false)
    }
  }

  const handleAddParticipant = async (userId) => {
    if (!addParticipantModal.conversation) return

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const user = users.find((u) => u.id === userId)
      const newParticipant = {
        usuario_id: userId,
        usuario: user,
        fecha_union: new Date().toISOString(),
        es_administrador: false,
      }

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === addParticipantModal.conversation.id
            ? { ...conv, participantes: [...conv.participantes, newParticipant] }
            : conv,
        ),
      )

      if (selectedConversation?.id === addParticipantModal.conversation.id) {
        setSelectedConversation((prev) => ({
          ...prev,
          participantes: [...prev.participantes, newParticipant],
        }))
      }

      setAddParticipantModal({ visible: false, conversation: null })
      setMessage({
        type: 'success',
        text: `${user.nombre} ${user.apellido} agregado a la conversación`,
      })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al agregar participante' })
    }
  }

  const formatMessageTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    } else {
      return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })
    }
  }

  const getAvailableUsers = () => {
    if (!selectedConversation) return users.filter((u) => u.id !== currentUser.id)

    const participantIds = selectedConversation.participantes.map((p) => p.usuario_id)
    return users.filter((u) => !participantIds.includes(u.id))
  }

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.participantes.some(
        (p) =>
          p.usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.usuario.apellido.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  )

  return (
    <>
      <CRow className="h-100">
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
        </CCol>

        {/* Conversations List */}
        <CCol md={4}>
          <CCard className="h-100">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <CIcon icon={cilEnvelopeClosed} className="me-2" />
                Conversaciones
              </h5>
              <CButton
                color="primary"
                size="sm"
                onClick={() => setNewConversationModal({ visible: true })}
              >
                <CIcon icon={cilPlus} />
              </CButton>
            </CCardHeader>
            <CCardBody className="p-0">
              {/* Search */}
              <div className="p-3 border-bottom">
                <CInputGroup>
                  <CInputGroupText>
                    <CIcon icon={cilSearch} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Buscar conversaciones..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </CInputGroup>
              </div>

              {/* Conversations List */}
              <div style={{ height: '500px', overflowY: 'auto' }}>
                <CListGroup flush>
                  {filteredConversations.map((conversation) => (
                    <CListGroupItem
                      key={conversation.id}
                      action
                      active={selectedConversation?.id === conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      className="border-0"
                    >
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <h6 className="mb-0">{conversation.titulo}</h6>
                            {conversation.mensajes_no_leidos > 0 && (
                              <CBadge color="primary" shape="rounded-pill">
                                {conversation.mensajes_no_leidos}
                              </CBadge>
                            )}
                          </div>
                          <div className="d-flex align-items-center mb-1">
                            <small className="text-muted me-2">
                              {conversation.participantes.length} participantes
                            </small>
                            <small className="text-muted">
                              {formatMessageTime(conversation.fecha_actualizacion)}
                            </small>
                          </div>
                          {conversation.ultimo_mensaje && (
                            <small className="text-muted">
                              <strong>{conversation.ultimo_mensaje.remitente.nombre}:</strong>{' '}
                              {conversation.ultimo_mensaje.contenido.length > 50
                                ? conversation.ultimo_mensaje.contenido.substring(0, 50) + '...'
                                : conversation.ultimo_mensaje.contenido}
                            </small>
                          )}
                        </div>
                      </div>
                    </CListGroupItem>
                  ))}
                </CListGroup>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Messages Area */}
        <CCol md={8}>
          {selectedConversation ? (
            <CCard className="h-100">
              <CCardHeader className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0">{selectedConversation.titulo}</h5>
                  <small className="text-muted">
                    {selectedConversation.participantes.length} participantes
                  </small>
                </div>
                <CDropdown>
                  <CDropdownToggle color="light" size="sm">
                    <CIcon icon={cilSettings} />
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem
                      onClick={() =>
                        setAddParticipantModal({
                          visible: true,
                          conversation: selectedConversation,
                        })
                      }
                    >
                      <CIcon icon={cilUserFollow} className="me-2" />
                      Agregar Participante
                    </CDropdownItem>
                    <CDropdownItem>
                      <CIcon icon={cilPencil} className="me-2" />
                      Editar Conversación
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CCardHeader>

              {/* Participants */}
              <div className="px-3 py-2 border-bottom bg-light">
                <div className="d-flex flex-wrap gap-1">
                  {selectedConversation.participantes.map((participant) => (
                    <CBadge
                      key={participant.usuario_id}
                      color={participant.es_administrador ? 'primary' : 'secondary'}
                      className="d-flex align-items-center"
                    >
                      <CAvatar size="sm" className="me-1" style={{ width: '20px', height: '20px' }}>
                        {participant.usuario.nombre.charAt(0)}
                      </CAvatar>
                      {participant.usuario.nombre} {participant.usuario.apellido}
                      {participant.es_administrador && ' (Admin)'}
                    </CBadge>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <CCardBody className="p-0" style={{ height: '400px', overflowY: 'auto' }}>
                <div className="p-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`mb-3 d-flex ${msg.usuario_id_remitente === currentUser.id ? 'justify-content-end' : 'justify-content-start'}`}
                    >
                      <div
                        className={`p-3 rounded ${
                          msg.usuario_id_remitente === currentUser.id
                            ? 'bg-primary text-white'
                            : 'bg-light'
                        }`}
                        style={{ maxWidth: '70%' }}
                      >
                        {msg.usuario_id_remitente !== currentUser.id && (
                          <div className="fw-bold mb-1 text-primary">
                            {msg.remitente.nombre} {msg.remitente.apellido}
                          </div>
                        )}
                        <div className="mb-1">{msg.contenido}</div>
                        <div className="d-flex justify-content-between align-items-center">
                          <small
                            className={
                              msg.usuario_id_remitente === currentUser.id
                                ? 'text-white-50'
                                : 'text-muted'
                            }
                          >
                            {formatMessageTime(msg.fecha_envio)}
                          </small>
                          {msg.usuario_id_remitente === currentUser.id && (
                            <CIcon
                              icon={msg.leido ? cilCheckAlt : cilClock}
                              size="sm"
                              className="text-white-50"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </CCardBody>

              {/* Message Input */}
              <div className="p-3 border-top">
                <CInputGroup>
                  <CFormInput
                    placeholder="Escribir mensaje..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <CButton
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <CIcon icon={cilSend} />
                  </CButton>
                </CInputGroup>
              </div>
            </CCard>
          ) : (
            <CCard className="h-100 d-flex align-items-center justify-content-center">
              <CCardBody className="text-center">
                <CIcon icon={cilEnvelopeClosed} size="3xl" className="text-muted mb-3" />
                <h5 className="text-muted">Selecciona una conversación para comenzar</h5>
              </CCardBody>
            </CCard>
          )}
        </CCol>
      </CRow>

      {/* New Conversation Modal */}
      <CModal
        visible={newConversationModal.visible}
        onClose={() => setNewConversationModal({ visible: false })}
      >
        <CModalHeader>
          <CModalTitle>Nueva Conversación</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <label className="form-label">Título de la Conversación *</label>
              <CFormInput
                value={conversationTitle}
                onChange={(e) => setConversationTitle(e.target.value)}
                placeholder="Ingrese el título de la conversación"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Participantes *</label>
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
                        checked={selectedParticipants.includes(user.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedParticipants((prev) => [...prev, user.id])
                          } else {
                            setSelectedParticipants((prev) => prev.filter((id) => id !== user.id))
                          }
                        }}
                      />
                    </CListGroupItem>
                  ))}
              </CListGroup>
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setNewConversationModal({ visible: false })}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={handleCreateConversation} disabled={loading}>
            {loading ? <CSpinner size="sm" className="me-2" /> : null}
            Crear Conversación
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Add Participant Modal */}
      <CModal
        visible={addParticipantModal.visible}
        onClose={() => setAddParticipantModal({ visible: false, conversation: null })}
      >
        <CModalHeader>
          <CModalTitle>Agregar Participante</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CListGroup>
            {getAvailableUsers().map((user) => (
              <CListGroupItem
                key={user.id}
                action
                onClick={() => handleAddParticipant(user.id)}
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
                <CIcon icon={cilUserFollow} className="text-primary" />
              </CListGroupItem>
            ))}
          </CListGroup>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setAddParticipantModal({ visible: false, conversation: null })}
          >
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ConversationManager
