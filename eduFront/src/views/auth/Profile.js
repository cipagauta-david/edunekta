import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CButton,
  CAlert,
  CSpinner,
  CAvatar,
  CTabs,
  CTabList,
  CTab,
  CTabContent,
  CTabPanel,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilUser,
  cilEnvelopeClosed,
  cilPhone,
  cilLocationPin,
  cilLockLocked,
  cilCamera,
} from '@coreui/icons'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const [profileData, setProfileData] = useState({
    firstName: 'Usuario',
    lastName: 'Demo',
    email: 'usuario@edunekta.com',
    username: 'usuario_demo',
    phone: '',
    address: '',
    bio: '',
    role: 'student',
    avatar: '',
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  useEffect(() => {
    // Load user data from localStorage or API
    const userData = localStorage.getItem('edunekta_user')
    if (userData) {
      const user = JSON.parse(userData)
      setProfileData((prev) => ({
        ...prev,
        ...user,
      }))
    }
  }, [])

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (message.text) setMessage({ type: '', text: '' })
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (message.text) setMessage({ type: '', text: '' })
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update localStorage
      const currentUser = JSON.parse(localStorage.getItem('edunekta_user') || '{}')
      const updatedUser = { ...currentUser, ...profileData }
      localStorage.setItem('edunekta_user', JSON.stringify(updatedUser))

      setMessage({ type: 'success', text: 'Perfil actualizado exitosamente' })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al actualizar perfil' })
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    // Validate passwords
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setMessage({ type: 'danger', text: 'Por favor, complete todos los campos' })
      setLoading(false)
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'danger', text: 'Las contraseñas no coinciden' })
      setLoading(false)
      return
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'danger', text: 'La nueva contraseña debe tener al menos 6 caracteres' })
      setLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setMessage({ type: 'success', text: 'Contraseña actualizada exitosamente' })
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al actualizar contraseña' })
    } finally {
      setLoading(false)
    }
  }

  const roleLabels = {
    student: 'Estudiante',
    teacher: 'Profesor',
    admin: 'Administrador',
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <div className="d-flex align-items-center">
              <CAvatar
                size="lg"
                src={
                  profileData.avatar ||
                  `https://ui-avatars.com/api/?name=${profileData.firstName}+${profileData.lastName}&background=0d6efd&color=fff`
                }
                className="me-3"
              />
              <div>
                <h4 className="mb-0">
                  {profileData.firstName} {profileData.lastName}
                </h4>
                <small className="text-muted">{roleLabels[profileData.role]}</small>
              </div>
            </div>
          </CCardHeader>

          <CCardBody>
            {message.text && (
              <CAlert color={message.type} className="mb-3">
                {message.text}
              </CAlert>
            )}

            <CTabs activeTab={activeTab} onActiveTabChange={setActiveTab}>
              <CTabList variant="tabs">
                <CTab tabKey="profile">Información Personal</CTab>
                <CTab tabKey="password">Cambiar Contraseña</CTab>
              </CTabList>

              <CTabContent>
                <CTabPanel tabKey="profile">
                  <CForm onSubmit={handleProfileSubmit}>
                    <CRow>
                      <CCol md={6}>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput
                            name="firstName"
                            placeholder="Nombre"
                            value={profileData.firstName}
                            onChange={handleProfileChange}
                            disabled={loading}
                            required
                          />
                        </CInputGroup>
                      </CCol>
                      <CCol md={6}>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput
                            name="lastName"
                            placeholder="Apellido"
                            value={profileData.lastName}
                            onChange={handleProfileChange}
                            disabled={loading}
                            required
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol md={6}>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilEnvelopeClosed} />
                          </CInputGroupText>
                          <CFormInput
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={profileData.email}
                            onChange={handleProfileChange}
                            disabled={loading}
                            required
                          />
                        </CInputGroup>
                      </CCol>
                      <CCol md={6}>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput
                            name="username"
                            placeholder="Nombre de usuario"
                            value={profileData.username}
                            onChange={handleProfileChange}
                            disabled={loading}
                            required
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol md={6}>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilPhone} />
                          </CInputGroupText>
                          <CFormInput
                            name="phone"
                            placeholder="Teléfono"
                            value={profileData.phone}
                            onChange={handleProfileChange}
                            disabled={loading}
                          />
                        </CInputGroup>
                      </CCol>
                      <CCol md={6}>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilLocationPin} />
                          </CInputGroupText>
                          <CFormInput
                            name="address"
                            placeholder="Dirección"
                            value={profileData.address}
                            onChange={handleProfileChange}
                            disabled={loading}
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>

                    <CFormTextarea
                      name="bio"
                      placeholder="Biografía"
                      rows={3}
                      value={profileData.bio}
                      onChange={handleProfileChange}
                      disabled={loading}
                      className="mb-3"
                    />

                    <div className="d-flex justify-content-end">
                      <CButton type="submit" color="primary" disabled={loading}>
                        {loading ? (
                          <>
                            <CSpinner size="sm" className="me-2" />
                            Guardando...
                          </>
                        ) : (
                          'Guardar Cambios'
                        )}
                      </CButton>
                    </div>
                  </CForm>
                </CTabPanel>

                <CTabPanel tabKey="password">
                  <CForm onSubmit={handlePasswordSubmit}>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="currentPassword"
                        type="password"
                        placeholder="Contraseña actual"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        disabled={loading}
                        required
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="newPassword"
                        type="password"
                        placeholder="Nueva contraseña"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        disabled={loading}
                        required
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirmar nueva contraseña"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        disabled={loading}
                        required
                      />
                    </CInputGroup>

                    <div className="d-flex justify-content-end">
                      <CButton type="submit" color="primary" disabled={loading}>
                        {loading ? (
                          <>
                            <CSpinner size="sm" className="me-2" />
                            Actualizando...
                          </>
                        ) : (
                          'Cambiar Contraseña'
                        )}
                      </CButton>
                    </div>
                  </CForm>
                </CTabPanel>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Profile
