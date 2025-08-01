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
  CFormCheck,
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
  cilUser,
  cilPeople,
  cilShield,
  cilSearch,
  cilSave,
  cilSettings,
  cilUserFollow,
  cilUserUnfollow,
} from '@coreui/icons'
import DataTable from '../../../components/common/DataTable'
import ConfirmDialog from '../../../components/common/ConfirmDialog'

const UserRoleManager = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [permissions, setPermissions] = useState([])
  const [userRoles, setUserRoles] = useState([])
  const [rolePermissions, setRolePermissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('users')
  const [userRoleModal, setUserRoleModal] = useState({ visible: false, user: null })
  const [rolePermissionModal, setRolePermissionModal] = useState({ visible: false, role: null })
  const [deleteDialog, setDeleteDialog] = useState({ visible: false, item: null, type: '' })
  const [message, setMessage] = useState({ type: '', text: '' })
  const [filters, setFilters] = useState({
    userRole: '',
    userStatus: '',
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

      // Mock data based on usuario, rol, usuario_rol, and rol_permiso tables
      const mockUsers = [
        {
          id: 1,
          nombre: 'Juan Carlos',
          apellido: 'Pérez García',
          email: 'juan.perez@edunekta.edu',
          documento: '12345678',
          telefono: '3001234567',
          estado_usuario_id: 1,
          estado: 'Activo',
          institucion_id: 1,
          fecha_creacion: '2024-01-15T10:00:00',
          roles: [
            { id: 1, nombre: 'Administrador', color: 'danger' },
            { id: 2, nombre: 'Profesor', color: 'primary' },
          ],
        },
        {
          id: 2,
          nombre: 'María Elena',
          apellido: 'García López',
          email: 'maria.garcia@edunekta.edu',
          documento: '87654321',
          telefono: '3007654321',
          estado_usuario_id: 1,
          estado: 'Activo',
          institucion_id: 1,
          fecha_creacion: '2024-01-20T14:30:00',
          roles: [{ id: 2, nombre: 'Profesor', color: 'primary' }],
        },
        {
          id: 3,
          nombre: 'Ana Sofía',
          apellido: 'Martínez Silva',
          email: 'ana.martinez@estudiante.edu',
          documento: '11223344',
          telefono: '3009876543',
          estado_usuario_id: 1,
          estado: 'Activo',
          institucion_id: 1,
          fecha_creacion: '2024-02-01T09:15:00',
          roles: [{ id: 3, nombre: 'Estudiante', color: 'success' }],
        },
        {
          id: 4,
          nombre: 'Carlos Eduardo',
          apellido: 'Rodríguez Pérez',
          email: 'carlos.rodriguez@padre.edu',
          documento: '55667788',
          telefono: '3005556677',
          estado_usuario_id: 1,
          estado: 'Activo',
          institucion_id: 1,
          fecha_creacion: '2024-02-05T11:45:00',
          roles: [{ id: 4, nombre: 'Acudiente', color: 'info' }],
        },
      ]

      const mockRoles = [
        {
          id: 1,
          nombre: 'Administrador',
          descripcion: 'Acceso completo al sistema',
          estado_rol_id: 1,
          estado: 'Activo',
          color: 'danger',
          usuarios_count: 1,
          permisos_count: 15,
          fecha_creacion: '2024-01-01T00:00:00',
        },
        {
          id: 2,
          nombre: 'Profesor',
          descripcion: 'Gestión académica y calificaciones',
          estado_rol_id: 1,
          estado: 'Activo',
          color: 'primary',
          usuarios_count: 2,
          permisos_count: 8,
          fecha_creacion: '2024-01-01T00:00:00',
        },
        {
          id: 3,
          nombre: 'Estudiante',
          descripcion: 'Acceso a contenido académico',
          estado_rol_id: 1,
          estado: 'Activo',
          color: 'success',
          usuarios_count: 1,
          permisos_count: 4,
          fecha_creacion: '2024-01-01T00:00:00',
        },
        {
          id: 4,
          nombre: 'Acudiente',
          descripcion: 'Seguimiento académico de estudiantes',
          estado_rol_id: 1,
          estado: 'Activo',
          color: 'info',
          usuarios_count: 1,
          permisos_count: 3,
          fecha_creacion: '2024-01-01T00:00:00',
        },
      ]

      const mockPermissions = [
        { id: 1, nombre: 'usuarios.crear', descripcion: 'Crear usuarios', modulo: 'Usuarios' },
        { id: 2, nombre: 'usuarios.editar', descripcion: 'Editar usuarios', modulo: 'Usuarios' },
        {
          id: 3,
          nombre: 'usuarios.eliminar',
          descripcion: 'Eliminar usuarios',
          modulo: 'Usuarios',
        },
        { id: 4, nombre: 'usuarios.ver', descripcion: 'Ver usuarios', modulo: 'Usuarios' },
        {
          id: 5,
          nombre: 'calificaciones.crear',
          descripcion: 'Crear calificaciones',
          modulo: 'Académico',
        },
        {
          id: 6,
          nombre: 'calificaciones.editar',
          descripcion: 'Editar calificaciones',
          modulo: 'Académico',
        },
        {
          id: 7,
          nombre: 'calificaciones.ver',
          descripcion: 'Ver calificaciones',
          modulo: 'Académico',
        },
        {
          id: 8,
          nombre: 'asistencia.crear',
          descripcion: 'Registrar asistencia',
          modulo: 'Académico',
        },
        { id: 9, nombre: 'asistencia.ver', descripción: 'Ver asistencia', modulo: 'Académico' },
        { id: 10, nombre: 'clases.crear', descripcion: 'Crear clases', modulo: 'Académico' },
        { id: 11, nombre: 'clases.editar', descripcion: 'Editar clases', modulo: 'Académico' },
        { id: 12, nombre: 'reportes.generar', descripcion: 'Generar reportes', modulo: 'Reportes' },
        {
          id: 13,
          nombre: 'configuracion.sistema',
          descripcion: 'Configurar sistema',
          modulo: 'Sistema',
        },
        { id: 14, nombre: 'foros.moderar', descripcion: 'Moderar foros', modulo: 'Comunicación' },
        {
          id: 15,
          nombre: 'mensajes.enviar',
          descripcion: 'Enviar mensajes',
          modulo: 'Comunicación',
        },
      ]

      // Mock role-permission assignments
      const mockRolePermissions = [
        // Administrador - All permissions
        ...mockPermissions.map((p) => ({ rol_id: 1, permiso_id: p.id })),
        // Profesor - Academic permissions
        { rol_id: 2, permiso_id: 4 }, // usuarios.ver
        { rol_id: 2, permiso_id: 5 }, // calificaciones.crear
        { rol_id: 2, permiso_id: 6 }, // calificaciones.editar
        { rol_id: 2, permiso_id: 7 }, // calificaciones.ver
        { rol_id: 2, permiso_id: 8 }, // asistencia.crear
        { rol_id: 2, permiso_id: 9 }, // asistencia.ver
        { rol_id: 2, permiso_id: 10 }, // clases.crear
        { rol_id: 2, permiso_id: 11 }, // clases.editar
        // Estudiante - Limited permissions
        { rol_id: 3, permiso_id: 7 }, // calificaciones.ver
        { rol_id: 3, permiso_id: 9 }, // asistencia.ver
        { rol_id: 3, permiso_id: 15 }, // mensajes.enviar
        // Acudiente - Student tracking permissions
        { rol_id: 4, permiso_id: 7 }, // calificaciones.ver
        { rol_id: 4, permiso_id: 9 }, // asistencia.ver
        { rol_id: 4, permiso_id: 15 }, // mensajes.enviar
      ]

      setUsers(mockUsers)
      setRoles(mockRoles)
      setPermissions(mockPermissions)
      setRolePermissions(mockRolePermissions)
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al cargar los datos de usuarios y roles' })
    } finally {
      setLoading(false)
    }
  }

  const handleManageUserRoles = (user) => {
    setUserRoleModal({ visible: true, user })
  }

  const handleManageRolePermissions = (role) => {
    setRolePermissionModal({ visible: true, role })
  }

  const handleDeleteItem = (item, type) => {
    setDeleteDialog({ visible: true, item, type })
  }

  const toggleUserRole = (userId, roleId) => {
    const user = users.find((u) => u.id === userId)
    const hasRole = user.roles.some((r) => r.id === roleId)

    if (hasRole) {
      // Remove role
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, roles: u.roles.filter((r) => r.id !== roleId) } : u,
        ),
      )
    } else {
      // Add role
      const role = roles.find((r) => r.id === roleId)
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId
            ? { ...u, roles: [...u.roles, { id: role.id, nombre: role.nombre, color: role.color }] }
            : u,
        ),
      )
    }
  }

  const toggleRolePermission = (roleId, permissionId) => {
    const hasPermission = rolePermissions.some(
      (rp) => rp.rol_id === roleId && rp.permiso_id === permissionId,
    )

    if (hasPermission) {
      // Remove permission
      setRolePermissions((prev) =>
        prev.filter((rp) => !(rp.rol_id === roleId && rp.permiso_id === permissionId)),
      )
    } else {
      // Add permission
      setRolePermissions((prev) => [...prev, { rol_id: roleId, permiso_id: permissionId }])
    }
  }

  const saveUserRoles = async () => {
    try {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setMessage({ type: 'success', text: 'Roles de usuario actualizados exitosamente' })
      setUserRoleModal({ visible: false, user: null })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al actualizar los roles de usuario' })
    } finally {
      setLoading(false)
    }
  }

  const saveRolePermissions = async () => {
    try {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update role permission count
      const role = rolePermissionModal.role
      const permissionCount = rolePermissions.filter((rp) => rp.rol_id === role.id).length
      setRoles((prev) =>
        prev.map((r) => (r.id === role.id ? { ...r, permisos_count: permissionCount } : r)),
      )

      setMessage({ type: 'success', text: 'Permisos de rol actualizados exitosamente' })
      setRolePermissionModal({ visible: false, role: null })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al actualizar los permisos de rol' })
    } finally {
      setLoading(false)
    }
  }

  const getRolePermissions = (roleId) => {
    return rolePermissions.filter((rp) => rp.rol_id === roleId)
  }

  const getPermissionsByModule = () => {
    return permissions.reduce((acc, permission) => {
      if (!acc[permission.modulo]) {
        acc[permission.modulo] = []
      }
      acc[permission.modulo].push(permission)
      return acc
    }, {})
  }

  const filteredUsers = users.filter((user) => {
    return (
      (!filters.userRole || user.roles.some((r) => r.nombre === filters.userRole)) &&
      (!filters.userStatus || user.estado === filters.userStatus) &&
      (!filters.search ||
        user.nombre.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.apellido.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase()))
    )
  })

  const userColumns = [
    {
      key: 'usuario',
      label: 'Usuario',
      render: (value, item) => (
        <div>
          <div className="fw-semibold">
            {item.nombre} {item.apellido}
          </div>
          <small className="text-muted">{item.email}</small>
          <div>
            <small className="text-muted">Doc: {item.documento}</small>
          </div>
        </div>
      ),
    },
    {
      key: 'roles',
      label: 'Roles',
      render: (value, item) => (
        <div>
          {item.roles.map((role) => (
            <CBadge key={role.id} color={role.color} className="me-1 mb-1">
              {role.nombre}
            </CBadge>
          ))}
          {item.roles.length === 0 && <CBadge color="secondary">Sin roles</CBadge>}
        </div>
      ),
    },
    {
      key: 'estado',
      label: 'Estado',
      render: (value, item) => (
        <CBadge color={item.estado === 'Activo' ? 'success' : 'danger'}>{item.estado}</CBadge>
      ),
    },
    {
      key: 'fecha_creacion',
      label: 'Fecha Creación',
      render: (value) => new Date(value).toLocaleDateString('es-ES'),
    },
    {
      key: 'actions',
      label: 'Acciones',
      sortable: false,
      render: (value, item) => (
        <div className="d-flex gap-2">
          <CButton
            color="primary"
            variant="outline"
            size="sm"
            onClick={() => handleManageUserRoles(item)}
            title="Gestionar roles"
          >
            <CIcon icon={cilShield} size="sm" />
          </CButton>
          <CButton
            color="info"
            variant="outline"
            size="sm"
            onClick={() => navigate(`/admin/users/${item.id}`)}
            title="Editar usuario"
          >
            <CIcon icon={cilPencil} size="sm" />
          </CButton>
        </div>
      ),
    },
  ]

  const roleColumns = [
    {
      key: 'nombre',
      label: 'Rol',
      render: (value, item) => (
        <div>
          <CBadge color={item.color} className="me-2">
            {item.nombre}
          </CBadge>
          <div className="mt-1">
            <small className="text-muted">{item.descripcion}</small>
          </div>
        </div>
      ),
    },
    {
      key: 'usuarios_count',
      label: 'Usuarios',
      render: (value) => (
        <div className="text-center">
          <h6 className="mb-0">{value}</h6>
          <small className="text-muted">usuarios</small>
        </div>
      ),
    },
    {
      key: 'permisos_count',
      label: 'Permisos',
      render: (value) => (
        <div className="text-center">
          <h6 className="mb-0">{value}</h6>
          <small className="text-muted">permisos</small>
        </div>
      ),
    },
    {
      key: 'estado',
      label: 'Estado',
      render: (value, item) => (
        <CBadge color={item.estado === 'Activo' ? 'success' : 'danger'}>{item.estado}</CBadge>
      ),
    },
    {
      key: 'actions',
      label: 'Acciones',
      sortable: false,
      render: (value, item) => (
        <div className="d-flex gap-2">
          <CButton
            color="warning"
            variant="outline"
            size="sm"
            onClick={() => handleManageRolePermissions(item)}
            title="Gestionar permisos"
          >
            <CIcon icon={cilSettings} size="sm" />
          </CButton>
          <CButton color="info" variant="outline" size="sm" title="Editar rol">
            <CIcon icon={cilPencil} size="sm" />
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

          <CTabs activeItemKey={activeTab} onActiveItemChange={setActiveTab}>
            <CTabList variant="tabs">
              <CTab itemKey="users">
                <CIcon icon={cilUser} className="me-2" />
                Usuarios y Roles
              </CTab>
              <CTab itemKey="roles">
                <CIcon icon={cilShield} className="me-2" />
                Gestión de Roles
              </CTab>
            </CTabList>

            <CTabContent>
              <CTabPanel itemKey="users">
                {/* User Filters */}
                <CCard className="mb-3">
                  <CCardBody>
                    <CRow>
                      <CCol md={3}>
                        <CFormSelect
                          value={filters.userRole}
                          onChange={(e) =>
                            setFilters((prev) => ({ ...prev, userRole: e.target.value }))
                          }
                        >
                          <option value="">Todos los roles</option>
                          {roles.map((role) => (
                            <option key={role.id} value={role.nombre}>
                              {role.nombre}
                            </option>
                          ))}
                        </CFormSelect>
                      </CCol>
                      <CCol md={3}>
                        <CFormSelect
                          value={filters.userStatus}
                          onChange={(e) =>
                            setFilters((prev) => ({ ...prev, userStatus: e.target.value }))
                          }
                        >
                          <option value="">Todos los estados</option>
                          <option value="Activo">Activo</option>
                          <option value="Inactivo">Inactivo</option>
                        </CFormSelect>
                      </CCol>
                      <CCol md={6}>
                        <CInputGroup>
                          <CInputGroupText>
                            <CIcon icon={cilSearch} />
                          </CInputGroupText>
                          <CFormInput
                            placeholder="Buscar usuarios..."
                            value={filters.search}
                            onChange={(e) =>
                              setFilters((prev) => ({ ...prev, search: e.target.value }))
                            }
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>

                <DataTable
                  data={filteredUsers}
                  columns={userColumns}
                  title="Usuarios y Asignación de Roles"
                  loading={loading}
                  searchable={false}
                  sortable={true}
                  paginated={true}
                  pageSize={15}
                />
              </CTabPanel>

              <CTabPanel itemKey="roles">
                <DataTable
                  data={roles}
                  columns={roleColumns}
                  title="Gestión de Roles y Permisos"
                  loading={loading}
                  searchable={true}
                  sortable={true}
                  paginated={true}
                  pageSize={10}
                  actions={
                    <CButton color="primary" className="d-flex align-items-center">
                      <CIcon icon={cilPlus} className="me-2" />
                      Nuevo Rol
                    </CButton>
                  }
                />
              </CTabPanel>
            </CTabContent>
          </CTabs>
        </CCol>
      </CRow>

      {/* User Roles Modal */}
      <CModal
        visible={userRoleModal.visible}
        onClose={() => setUserRoleModal({ visible: false, user: null })}
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>
            Gestionar Roles - {userRoleModal.user?.nombre} {userRoleModal.user?.apellido}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {userRoleModal.user && (
            <div>
              <div className="mb-3">
                <strong>Usuario:</strong> {userRoleModal.user.email}
              </div>
              <CListGroup>
                {roles.map((role) => {
                  const hasRole = userRoleModal.user.roles.some((r) => r.id === role.id)
                  return (
                    <CListGroupItem
                      key={role.id}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <CBadge color={role.color} className="me-2">
                          {role.nombre}
                        </CBadge>
                        <span>{role.descripcion}</span>
                      </div>
                      <CFormCheck
                        checked={hasRole}
                        onChange={() => toggleUserRole(userRoleModal.user.id, role.id)}
                      />
                    </CListGroupItem>
                  )
                })}
              </CListGroup>
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setUserRoleModal({ visible: false, user: null })}
          >
            Cancelar
          </CButton>
          <CButton color="primary" onClick={saveUserRoles} disabled={loading}>
            {loading ? (
              <>
                <CSpinner size="sm" className="me-2" />
                Guardando...
              </>
            ) : (
              <>
                <CIcon icon={cilSave} className="me-2" />
                Guardar Cambios
              </>
            )}
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Role Permissions Modal */}
      <CModal
        visible={rolePermissionModal.visible}
        onClose={() => setRolePermissionModal({ visible: false, role: null })}
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>Gestionar Permisos - {rolePermissionModal.role?.nombre}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {rolePermissionModal.role && (
            <div>
              <div className="mb-3">
                <CBadge color={rolePermissionModal.role.color} className="me-2">
                  {rolePermissionModal.role.nombre}
                </CBadge>
                <span>{rolePermissionModal.role.descripcion}</span>
              </div>

              {Object.entries(getPermissionsByModule()).map(([module, modulePermissions]) => (
                <div key={module} className="mb-4">
                  <h6 className="text-primary">{module}</h6>
                  <CListGroup>
                    {modulePermissions.map((permission) => {
                      const hasPermission = rolePermissions.some(
                        (rp) =>
                          rp.rol_id === rolePermissionModal.role.id &&
                          rp.permiso_id === permission.id,
                      )
                      return (
                        <CListGroupItem
                          key={permission.id}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <div>
                            <strong>{permission.nombre}</strong>
                            <div>
                              <small className="text-muted">{permission.descripcion}</small>
                            </div>
                          </div>
                          <CFormCheck
                            checked={hasPermission}
                            onChange={() =>
                              toggleRolePermission(rolePermissionModal.role.id, permission.id)
                            }
                          />
                        </CListGroupItem>
                      )
                    })}
                  </CListGroup>
                </div>
              ))}
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setRolePermissionModal({ visible: false, role: null })}
          >
            Cancelar
          </CButton>
          <CButton color="primary" onClick={saveRolePermissions} disabled={loading}>
            {loading ? (
              <>
                <CSpinner size="sm" className="me-2" />
                Guardando...
              </>
            ) : (
              <>
                <CIcon icon={cilSave} className="me-2" />
                Guardar Cambios
              </>
            )}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default UserRoleManager
