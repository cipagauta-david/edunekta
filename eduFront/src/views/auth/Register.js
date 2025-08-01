import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilEducation, cilEnvelopeClosed, cilPeople } from '@coreui/icons'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear messages when user starts typing
    if (error) setError('')
    if (success) setSuccess('')
  }

  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('Por favor, complete todos los campos')
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return false
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, ingrese un email válido')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock registration logic
      setSuccess('¡Registro exitoso! Redirigiendo al login...')

      // Redirect to login after success
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      setError('Error al registrar usuario. Por favor, intente nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const roleOptions = [
    { value: 'student', label: 'Estudiante' },
    { value: 'teacher', label: 'Profesor' },
    { value: 'admin', label: 'Administrador' },
  ]

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8} lg={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <div className="text-center mb-4">
                    <CIcon icon={cilEducation} size="3xl" className="text-primary mb-3" />
                    <h1 className="text-primary">Registro</h1>
                    <p className="text-muted">Crear cuenta en Edunekta</p>
                  </div>

                  {error && (
                    <CAlert color="danger" className="mb-3">
                      {error}
                    </CAlert>
                  )}

                  {success && (
                    <CAlert color="success" className="mb-3">
                      {success}
                    </CAlert>
                  )}

                  <CRow>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          name="firstName"
                          placeholder="Nombre"
                          value={formData.firstName}
                          onChange={handleInputChange}
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
                          value={formData.lastName}
                          onChange={handleInputChange}
                          disabled={loading}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilEnvelopeClosed} />
                    </CInputGroupText>
                    <CFormInput
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={loading}
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      name="username"
                      placeholder="Nombre de usuario"
                      value={formData.username}
                      onChange={handleInputChange}
                      disabled={loading}
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPeople} />
                    </CInputGroupText>
                    <CFormSelect
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      disabled={loading}
                      required
                    >
                      {roleOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </CFormSelect>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name="password"
                      type="password"
                      placeholder="Contraseña"
                      value={formData.password}
                      onChange={handleInputChange}
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
                      placeholder="Confirmar contraseña"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      disabled={loading}
                      required
                    />
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton type="submit" color="primary" disabled={loading}>
                      {loading ? (
                        <>
                          <CSpinner size="sm" className="me-2" />
                          Registrando...
                        </>
                      ) : (
                        'Crear Cuenta'
                      )}
                    </CButton>
                  </div>

                  <hr className="my-4" />

                  <div className="text-center">
                    <p className="text-muted mb-0">¿Ya tiene una cuenta?</p>
                    <Link to="/login" className="text-decoration-none">
                      <CButton color="link" className="px-0">
                        Iniciar Sesión
                      </CButton>
                    </Link>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
