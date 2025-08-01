import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilEducation } from '@coreui/icons'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock authentication logic
      if (formData.username && formData.password) {
        // Store user data in localStorage (in real app, use proper auth)
        localStorage.setItem(
          'edunekta_user',
          JSON.stringify({
            id: 1,
            username: formData.username,
            name: 'Usuario Demo',
            role: 'admin',
            email: `${formData.username}@edunekta.com`,
          }),
        )

        // Redirect to dashboard
        navigate('/dashboard')
      } else {
        setError('Por favor, complete todos los campos')
      }
    } catch (err) {
      setError('Error al iniciar sesión. Por favor, intente nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <div className="text-center mb-4">
                      <CIcon icon={cilEducation} size="3xl" className="text-primary mb-3" />
                      <h1 className="text-primary">Edunekta</h1>
                      <p className="text-muted">Plataforma Educativa</p>
                    </div>

                    {error && (
                      <CAlert color="danger" className="mb-3">
                        {error}
                      </CAlert>
                    )}

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="username"
                        placeholder="Usuario"
                        autoComplete="username"
                        value={formData.username}
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
                        name="password"
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleInputChange}
                        disabled={loading}
                        required
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4" disabled={loading}>
                          {loading ? (
                            <>
                              <CSpinner size="sm" className="me-2" />
                              Iniciando...
                            </>
                          ) : (
                            'Iniciar Sesión'
                          )}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-end">
                        <Link to="/forgot-password" className="text-decoration-none">
                          <CButton color="link" className="px-0">
                            ¿Olvidó su contraseña?
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>

                    <hr className="my-4" />

                    <div className="text-center">
                      <p className="text-muted mb-2">¿No tiene una cuenta?</p>
                      <Link to="/register" className="text-decoration-none">
                        <CButton color="outline-primary" className="px-4">
                          Registrarse
                        </CButton>
                      </Link>
                    </div>

                    <div className="text-center mt-4">
                      <small className="text-muted">Demo: use cualquier usuario y contraseña</small>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
