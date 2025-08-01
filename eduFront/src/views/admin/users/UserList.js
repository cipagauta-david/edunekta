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
  cilPeople,
  cilOptions,
  cilLockLocked,
  cilLockUnlocked,
  cilEnvelopeOpen,
} from '@coreui/icons'
import DataTable from '../../../components/common/DataTable'
import ConfirmDialog from '../../../components/common/ConfirmDialog'

const UserList = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteDialog, setDeleteDialog] = useState({ visible: false, user: null })
  const [statusDialog, setStatusDialog] = useState({ visible: false, user: null, action: '' })
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data
      const mockUsers = [
        {
          id: 1,
          username: 'juan.perez',
          firstName: 'Juan',
          lastName: 'Pérez',
          email: 'juan.perez@edunekta.com',
          role: 'teacher',
          status: 'active',
          lastLogin: '2024-07-29T10:30:00',
          createdAt: '2024-01-15T09:00:00',
          avatar: '',
          phone: '+1234567890',
          enrolledSubjects: 3,
          completedActivities: 45,
        },
        {
          id: 2,
          username: 'maria.garcia',
          firstName: 'María',
          lastName: 'García',
          email: 'maria.garcia@edunekta.com',
          role: 'teacher',
          status: 'active',
          lastLogin: '2024-07-29T14:15:00',
          createdAt: '2024-01-20T11:30:00',
          avatar: '',
          phone: '+1234567891',
          enrolledSubjects: 2,
          completedActivities: 32,
        },
        {
          id: 3,
          username: 'carlos.lopez',
          firstName: 'Carlos',
          lastName: 'López',
          email: 'carlos.lopez@edunekta.com',
          role: 'admin',
          status: 'active',
          lastLogin: '2024-07-29T16:45:00',
          createdAt: '2024-01-10T08:00:00',
          avatar: '',
          phone: '+1234567892',
          enrolledSubjects: 0,
          completedActivities: 0,
        },
        {
          id: 4,
          username: 'ana.martinez',
          firstName: 'Ana',
          lastName: 'Martínez',
          email: 'ana.martinez@edunekta.com',
          role: 'student',
          status: 'active',
          lastLogin: '2024-07-28T20:30:00',
          createdAt: '2024-02-01T10:15:00',
          avatar: '',
          phone: '+1234567893',
          enrolledSubjects: 5,
          completedActivities: 28,
        },
        {
          id: 5,
          username: 'roberto.silva',
          firstName: 'Roberto',
          lastName: 'Silva',
          email: 'roberto.silva@edunekta.com',
          role: 'teacher',
          status: 'inactive',
          lastLogin: '2024-07-25T12:00:00',
          createdAt: '2024-01-25T14:20:00',
          avatar: '',
          phone: '+1234567894',
          enrolledSubjects: 1,
          completedActivities: 15,
        },
        {
          id: 6,
          username: 'laura.rodriguez',
          firstName: 'Laura',
          lastName: 'Rodríguez',
          email: 'laura.rodriguez@edunekta.com',
          role: 'student',
          status: 'pending',
          lastLogin: null,
          createdAt: '2024-07-29T09:30:00',
          avatar: '',
          phone: '+1234567895',
          enrolledSubjects: 0,
          completedActivities: 0,
        },
      ]

      setUsers(mockUsers)
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al cargar los usuarios' })
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    navigate('/admin/users/create')
  }

  const handleEdit = (user) => {
    navigate(`/admin/users/edit/${user.id}`)
  }

  const handleDelete = (user) => {
    setDeleteDialog({ visible: true, user })
  }

  const handleStatusChange = (user, action) => {
    setStatusDialog({ visible: true, user, action })
  }

  const confirmDelete = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setUsers((prev) => prev.filter((u) => u.id !== deleteDialog.user.id))
      setMessage({ type: 'success', text: 'Usuario eliminado exitosamente' })
      setDeleteDialog({ visible: false, user: null })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al eliminar el usuario' })
    }
  }

  const confirmStatusChange = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newStatus = statusDialog.action === 'activate' ? 'active' : 'inactive'
      setUsers((prev) =>
        prev.map((u) => (u.id === statusDialog.user.id ? { ...u, status: newStatus } : u)),
      )

      const actionText = statusDialog.action === 'activate' ? 'activado' : 'desactivado'
      setMessage({ type: 'success', text: `Usuario ${actionText} exitosamente` })
      setStatusDialog({ visible: false, user: null, action: '' })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al cambiar el estado del usuario' })
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'success', text: 'Activo' },
      inactive: { color: 'danger', text: 'Inactivo' },
      pending: { color: 'warning', text: 'Pendiente' },
      suspended: { color: 'secondary', text: 'Suspendido' },
    }
    const config = statusConfig[status] || statusConfig.pending
    return <CBadge color={config.color}>{config.text}</CBadge>
  }

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: { color: 'danger', text: 'Administrador' },
      teacher: { color: 'primary', text: 'Profesor' },
      student: { color: 'info', text: 'Estudiante' },
    }
    const config = roleConfig[role] || roleConfig.student
    return (
      <CBadge color={config.color} variant="outline">
        {config.text}
      </CBadge>
    )
  }

  const formatLastLogin = (lastLogin) => {
    if (!lastLogin) return 'Nunca'
    const date = new Date(lastLogin)
    const now = new Date()
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffHours < 1) return 'Hace menos de 1 hora'
    if (diffHours < 24) return `Hace ${diffHours} horas`
    if (diffHours < 48) return 'Ayer'
    return date.toLocaleDateString('es-ES')
  }

  const columns = [
    {
      key: 'user',
      label: 'Usuario',
      render: (value, item) => (
        <div className="d-flex align-items-center">
          <CAvatar
            size="md"
            src={
              item.avatar ||
              `https://ui-avatars.com/api/?name=${item.firstName}+${item.lastName}&background=0d6efd&color=fff`
            }
            className="me-3"
          />
          <div>
            <div className="fw-semibold">
              {item.firstName} {item.lastName}
            </div>
            <small className="text-muted">@{item.username}</small>
            <div className="mt-1">{getRoleBadge(item.role)}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (value, item) => (
        <div>
          <div>{value}</div>
          {item.phone && <small className="text-muted">{item.phone}</small>}
        </div>
      ),
    },
    {
      key: 'enrolledSubjects',
      label: 'Actividad',
      render: (value, item) => (
        <div>
          <div>
            <strong>{value}</strong> asignaturas
          </div>
          <small className="text-muted">{item.completedActivities} actividades</small>
        </div>
      ),
    },
    {
      key: 'lastLogin',
      label: 'Último Acceso',
      render: (value) => (
        <small className={!value ? 'text-muted' : ''}>{formatLastLogin(value)}</small>
      ),
    },
    {
      key: 'status',
      label: 'Estado',
      render: (value) => getStatusBadge(value),
    },
    {
      key: 'actions',
      label: 'Acciones',
      sortable: false,
      render: (value, item) => (
        <CDropdown>
          <CDropdownToggle color="secondary" variant="outline" size="sm">
            <CIcon icon={cilOptions} />
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => handleEdit(item)}>
              <CIcon icon={cilPencil} className="me-2" />
              Editar
            </CDropdownItem>
            <CDropdownItem onClick={() => navigate(`/admin/users/${item.id}`)}>
              <CIcon icon={cilPeople} className="me-2" />
              Ver Perfil
            </CDropdownItem>
            {item.status === 'active' ? (
              <CDropdownItem onClick={() => handleStatusChange(item, 'deactivate')}>
                <CIcon icon={cilLockLocked} className="me-2" />
                Desactivar
              </CDropdownItem>
            ) : (
              <CDropdownItem onClick={() => handleStatusChange(item, 'activate')}>
                <CIcon icon={cilLockUnlocked} className="me-2" />
                Activar
              </CDropdownItem>
            )}
            <CDropdownItem divider />
            <CDropdownItem
              onClick={() => handleDelete(item)}
              className="text-danger"
              disabled={item.role === 'admin'}
            >
              <CIcon icon={cilTrash} className="me-2" />
              Eliminar
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
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
            data={users}
            columns={columns}
            title="Gestión de Usuarios"
            loading={loading}
            searchable={true}
            sortable={true}
            paginated={true}
            pageSize={10}
            actions={
              <CButton color="primary" onClick={handleCreate} className="d-flex align-items-center">
                <CIcon icon={cilPlus} className="me-2" />
                Nuevo Usuario
              </CButton>
            }
            onRowClick={(user) => navigate(`/admin/users/${user.id}`)}
          />
        </CCol>
      </CRow>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        visible={deleteDialog.visible}
        onClose={() => setDeleteDialog({ visible: false, user: null })}
        onConfirm={confirmDelete}
        title="Eliminar Usuario"
        message={`¿Está seguro de que desea eliminar al usuario "${deleteDialog.user?.firstName} ${deleteDialog.user?.lastName}"? Esta acción no se puede deshacer.`}
        type="danger"
        confirmText="Eliminar"
        cancelText="Cancelar"
      />

      {/* Status Change Confirmation Dialog */}
      <ConfirmDialog
        visible={statusDialog.visible}
        onClose={() => setStatusDialog({ visible: false, user: null, action: '' })}
        onConfirm={confirmStatusChange}
        title={`${statusDialog.action === 'activate' ? 'Activar' : 'Desactivar'} Usuario`}
        message={`¿Está seguro de que desea ${statusDialog.action === 'activate' ? 'activar' : 'desactivar'} al usuario "${statusDialog.user?.firstName} ${statusDialog.user?.lastName}"?`}
        type={statusDialog.action === 'activate' ? 'success' : 'warning'}
        confirmText={statusDialog.action === 'activate' ? 'Activar' : 'Desactivar'}
        cancelText="Cancelar"
      />
    </>
  )
}

export default UserList
