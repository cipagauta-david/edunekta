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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPlus,
  cilSpeech,
  cilPeople,
  cilClock,
  cilPin,
  cilLockLocked,
  cilFire,
  cilCommentSquare,
} from '@coreui/icons'
import LoadingSpinner from '../../../components/common/LoadingSpinner'

const ForumList = () => {
  const navigate = useNavigate()
  const [forums, setForums] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    loadForums()
  }, [])

  const loadForums = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data
      const mockForums = [
        {
          id: 1,
          title: 'Ayuda con Matemáticas Avanzadas',
          description: 'Resuelve tus dudas sobre álgebra lineal y cálculo',
          category: 'Académico',
          subject: 'Matemáticas Avanzadas',
          author: {
            id: 1,
            name: 'Dr. Juan Pérez',
            avatar: '',
            role: 'teacher',
          },
          stats: {
            topics: 45,
            posts: 234,
            members: 67,
          },
          lastPost: {
            author: 'María García',
            time: '2024-07-29T14:30:00',
            title: 'Duda sobre matrices inversas',
          },
          isPinned: true,
          isLocked: false,
          isHot: true,
          createdAt: '2024-01-15T09:00:00',
        },
        {
          id: 2,
          title: 'Discusión General - Historia Universal',
          description: 'Debates y análisis sobre eventos históricos',
          category: 'Académico',
          subject: 'Historia Universal',
          author: {
            id: 2,
            name: 'Prof. María García',
            avatar: '',
            role: 'teacher',
          },
          stats: {
            topics: 32,
            posts: 156,
            members: 45,
          },
          lastPost: {
            author: 'Carlos López',
            time: '2024-07-29T11:15:00',
            title: 'Causas de la Primera Guerra Mundial',
          },
          isPinned: false,
          isLocked: false,
          isHot: false,
          createdAt: '2024-01-20T10:30:00',
        },
        {
          id: 3,
          title: 'Laboratorio de Química - Experimentos',
          description: 'Compartir resultados y procedimientos de laboratorio',
          category: 'Académico',
          subject: 'Química Orgánica',
          author: {
            id: 3,
            name: 'Dr. Carlos López',
            avatar: '',
            role: 'teacher',
          },
          stats: {
            topics: 28,
            posts: 89,
            members: 35,
          },
          lastPost: {
            author: 'Ana Martínez',
            time: '2024-07-28T16:45:00',
            title: 'Resultados del experimento de síntesis',
          },
          isPinned: false,
          isLocked: false,
          isHot: true,
          createdAt: '2024-02-01T14:20:00',
        },
        {
          id: 4,
          title: 'Proyectos de Programación Web',
          description: 'Muestra tus proyectos y obtén feedback',
          category: 'Proyectos',
          subject: 'Programación Web',
          author: {
            id: 4,
            name: 'Ing. Roberto Silva',
            avatar: '',
            role: 'teacher',
          },
          stats: {
            topics: 52,
            posts: 298,
            members: 78,
          },
          lastPost: {
            author: 'Laura Rodríguez',
            time: '2024-07-29T09:20:00',
            title: 'Mi primera aplicación React',
          },
          isPinned: false,
          isLocked: false,
          isHot: true,
          createdAt: '2024-01-10T11:00:00',
        },
        {
          id: 5,
          title: 'Anuncios Generales',
          description: 'Comunicados oficiales de la institución',
          category: 'Oficial',
          subject: null,
          author: {
            id: 5,
            name: 'Administración',
            avatar: '',
            role: 'admin',
          },
          stats: {
            topics: 12,
            posts: 45,
            members: 156,
          },
          lastPost: {
            author: 'Administración',
            time: '2024-07-27T08:00:00',
            title: 'Nuevas fechas de exámenes finales',
          },
          isPinned: true,
          isLocked: true,
          isHot: false,
          createdAt: '2024-01-01T08:00:00',
        },
        {
          id: 6,
          title: 'Café Virtual - Charlas Libres',
          description: 'Espacio para conversaciones informales entre estudiantes',
          category: 'Social',
          subject: null,
          author: {
            id: 6,
            name: 'Comunidad Estudiantil',
            avatar: '',
            role: 'student',
          },
          stats: {
            topics: 89,
            posts: 567,
            members: 123,
          },
          lastPost: {
            author: 'Pedro Sánchez',
            time: '2024-07-29T15:45:00',
            title: '¿Alguien quiere formar grupo de estudio?',
          },
          isPinned: false,
          isLocked: false,
          isHot: false,
          createdAt: '2024-02-15T12:00:00',
        },
      ]

      setForums(mockForums)
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al cargar los foros' })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateForum = () => {
    navigate('/communication/forum/create')
  }

  const handleForumClick = (forum) => {
    navigate(`/communication/forum/${forum.id}`)
  }

  const getCategoryBadge = (category) => {
    const categoryConfig = {
      Académico: { color: 'primary', text: 'Académico' },
      Proyectos: { color: 'success', text: 'Proyectos' },
      Oficial: { color: 'danger', text: 'Oficial' },
      Social: { color: 'info', text: 'Social' },
      Ayuda: { color: 'warning', text: 'Ayuda' },
    }
    const config = categoryConfig[category] || categoryConfig['Académico']
    return (
      <CBadge color={config.color} variant="outline">
        {config.text}
      </CBadge>
    )
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

  if (loading) {
    return <LoadingSpinner text="Cargando foros..." />
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
              <CIcon icon={cilSpeech} className="me-2" />
              <h4 className="mb-0">Foros de Discusión</h4>
            </div>
            <CButton
              color="primary"
              onClick={handleCreateForum}
              className="d-flex align-items-center"
            >
              <CIcon icon={cilPlus} className="me-2" />
              Crear Foro
            </CButton>
          </CCardHeader>

          <CCardBody className="p-0">
            <CListGroup flush>
              {forums.map((forum) => (
                <CListGroupItem
                  key={forum.id}
                  className="cursor-pointer hover-bg-light p-4"
                  onClick={() => handleForumClick(forum)}
                >
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <CAvatar
                        size="lg"
                        src={
                          forum.author.avatar ||
                          `https://ui-avatars.com/api/?name=${forum.author.name}&background=0d6efd&color=fff`
                        }
                      />
                    </div>

                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center mb-1">
                            {forum.isPinned && (
                              <CIcon icon={cilPin} className="text-warning me-2" title="Fijado" />
                            )}
                            {forum.isLocked && (
                              <CIcon
                                icon={cilLockLocked}
                                className="text-danger me-2"
                                title="Cerrado"
                              />
                            )}
                            {forum.isHot && (
                              <CIcon icon={cilFire} className="text-danger me-2" title="Popular" />
                            )}
                            <h5 className="mb-0 fw-semibold">{forum.title}</h5>
                          </div>

                          <p className="text-muted mb-2">{forum.description}</p>

                          <div className="d-flex align-items-center flex-wrap gap-2">
                            {getCategoryBadge(forum.category)}
                            {forum.subject && (
                              <CBadge color="secondary" variant="outline">
                                {forum.subject}
                              </CBadge>
                            )}
                            <span className="text-muted small">
                              por {forum.author.name}
                              {getRoleBadge(forum.author.role)}
                            </span>
                          </div>
                        </div>

                        <div className="text-end ms-3">
                          <div className="d-flex gap-3 mb-2">
                            <div className="text-center">
                              <div className="fw-bold text-primary">{forum.stats.topics}</div>
                              <small className="text-muted">Temas</small>
                            </div>
                            <div className="text-center">
                              <div className="fw-bold text-success">{forum.stats.posts}</div>
                              <small className="text-muted">Posts</small>
                            </div>
                            <div className="text-center">
                              <div className="fw-bold text-info">{forum.stats.members}</div>
                              <small className="text-muted">Miembros</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center text-muted small">
                          <CIcon icon={cilCommentSquare} className="me-1" />
                          <span>
                            Último post: <strong>{forum.lastPost.title}</strong>
                          </span>
                        </div>
                        <div className="text-muted small">
                          <CIcon icon={cilClock} className="me-1" />
                          por {forum.lastPost.author} • {formatTime(forum.lastPost.time)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CListGroupItem>
              ))}
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ForumList
