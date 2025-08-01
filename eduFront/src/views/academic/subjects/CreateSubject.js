import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBook, cilUser, cilCalendar, cilPeople, cilArrowLeft, cilSave } from '@coreui/icons'

const CreateSubject = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    instructor: '',
    totalCapacity: '',
    startDate: '',
    endDate: '',
    prerequisites: '',
    objectives: '',
    syllabus: '',
    status: 'draft',
  })

  const categories = [
    { value: '', label: 'Seleccionar categoría' },
    { value: 'Ciencias Exactas', label: 'Ciencias Exactas' },
    { value: 'Ciencias Naturales', label: 'Ciencias Naturales' },
    { value: 'Humanidades', label: 'Humanidades' },
    { value: 'Tecnología', label: 'Tecnología' },
    { value: 'Arte y Cultura', label: 'Arte y Cultura' },
    { value: 'Deportes', label: 'Deportes' },
    { value: 'Idiomas', label: 'Idiomas' },
  ]

  const instructors = [
    { value: '', label: 'Seleccionar instructor' },
    { value: 'Dr. Juan Pérez', label: 'Dr. Juan Pérez' },
    { value: 'Prof. María García', label: 'Prof. María García' },
    { value: 'Dr. Carlos López', label: 'Dr. Carlos López' },
    { value: 'Prof. Ana Martínez', label: 'Prof. Ana Martínez' },
    { value: 'Ing. Roberto Silva', label: 'Ing. Roberto Silva' },
    { value: 'Dra. Laura Rodríguez', label: 'Dra. Laura Rodríguez' },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear message when user starts typing
    if (message.text) setMessage({ type: '', text: '' })
  }

  const validateForm = () => {
    const required = [
      'name',
      'description',
      'category',
      'instructor',
      'totalCapacity',
      'startDate',
      'endDate',
    ]
    const missing = required.filter((field) => !formData[field])

    if (missing.length > 0) {
      setMessage({ type: 'danger', text: 'Por favor, complete todos los campos obligatorios' })
      return false
    }

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      setMessage({ type: 'danger', text: 'La fecha de inicio debe ser anterior a la fecha de fin' })
      return false
    }

    if (parseInt(formData.totalCapacity) <= 0) {
      setMessage({ type: 'danger', text: 'La capacidad debe ser mayor a 0' })
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock success
      setMessage({ type: 'success', text: 'Asignatura creada exitosamente' })

      // Redirect after success
      setTimeout(() => {
        navigate('/academic/subjects')
      }, 1500)
    } catch (error) {
      setMessage({
        type: 'danger',
        text: 'Error al crear la asignatura. Por favor, intente nuevamente.',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAsDraft = async () => {
    setFormData((prev) => ({ ...prev, status: 'draft' }))
    handleSubmit()
  }

  const handlePublish = async () => {
    setFormData((prev) => ({ ...prev, status: 'active' }))
    handleSubmit()
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <CIcon icon={cilBook} className="me-2" />
              <h4 className="mb-0">Crear Nueva Asignatura</h4>
            </div>
            <CButton
              color="secondary"
              variant="outline"
              onClick={() => navigate('/academic/subjects')}
              className="d-flex align-items-center"
            >
              <CIcon icon={cilArrowLeft} className="me-2" />
              Volver
            </CButton>
          </CCardHeader>

          <CCardBody>
            {message.text && (
              <CAlert
                color={message.type}
                dismissible
                onClose={() => setMessage({ type: '', text: '' })}
                className="mb-4"
              >
                {message.text}
              </CAlert>
            )}

            <CForm onSubmit={handleSubmit}>
              <CRow>
                <CCol md={8}>
                  <CCard className="mb-4">
                    <CCardHeader>
                      <h5 className="mb-0">Información General</h5>
                    </CCardHeader>
                    <CCardBody>
                      <CRow>
                        <CCol md={12}>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilBook} />
                            </CInputGroupText>
                            <CFormInput
                              name="name"
                              placeholder="Nombre de la asignatura *"
                              value={formData.name}
                              onChange={handleInputChange}
                              disabled={loading}
                              required
                            />
                          </CInputGroup>
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol md={6}>
                          <CFormSelect
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            disabled={loading}
                            required
                            className="mb-3"
                          >
                            {categories.map((cat) => (
                              <option key={cat.value} value={cat.value}>
                                {cat.label}
                              </option>
                            ))}
                          </CFormSelect>
                        </CCol>
                        <CCol md={6}>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormSelect
                              name="instructor"
                              value={formData.instructor}
                              onChange={handleInputChange}
                              disabled={loading}
                              required
                            >
                              {instructors.map((inst) => (
                                <option key={inst.value} value={inst.value}>
                                  {inst.label}
                                </option>
                              ))}
                            </CFormSelect>
                          </CInputGroup>
                        </CCol>
                      </CRow>

                      <CFormTextarea
                        name="description"
                        placeholder="Descripción de la asignatura *"
                        rows={4}
                        value={formData.description}
                        onChange={handleInputChange}
                        disabled={loading}
                        required
                        className="mb-3"
                      />

                      <CFormTextarea
                        name="objectives"
                        placeholder="Objetivos de aprendizaje"
                        rows={3}
                        value={formData.objectives}
                        onChange={handleInputChange}
                        disabled={loading}
                        className="mb-3"
                      />

                      <CFormTextarea
                        name="syllabus"
                        placeholder="Temario del curso"
                        rows={4}
                        value={formData.syllabus}
                        onChange={handleInputChange}
                        disabled={loading}
                        className="mb-3"
                      />

                      <CFormTextarea
                        name="prerequisites"
                        placeholder="Prerrequisitos (opcional)"
                        rows={2}
                        value={formData.prerequisites}
                        onChange={handleInputChange}
                        disabled={loading}
                      />
                    </CCardBody>
                  </CCard>
                </CCol>

                <CCol md={4}>
                  <CCard className="mb-4">
                    <CCardHeader>
                      <h5 className="mb-0">Configuración</h5>
                    </CCardHeader>
                    <CCardBody>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilPeople} />
                        </CInputGroupText>
                        <CFormInput
                          name="totalCapacity"
                          type="number"
                          placeholder="Capacidad máxima *"
                          value={formData.totalCapacity}
                          onChange={handleInputChange}
                          disabled={loading}
                          required
                          min="1"
                        />
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilCalendar} />
                        </CInputGroupText>
                        <CFormInput
                          name="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={handleInputChange}
                          disabled={loading}
                          required
                        />
                      </CInputGroup>

                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilCalendar} />
                        </CInputGroupText>
                        <CFormInput
                          name="endDate"
                          type="date"
                          value={formData.endDate}
                          onChange={handleInputChange}
                          disabled={loading}
                          required
                        />
                      </CInputGroup>

                      <div className="d-grid gap-2">
                        <CButton
                          type="button"
                          color="success"
                          onClick={handlePublish}
                          disabled={loading}
                          className="d-flex align-items-center justify-content-center"
                        >
                          {loading ? (
                            <>
                              <CSpinner size="sm" className="me-2" />
                              Publicando...
                            </>
                          ) : (
                            <>
                              <CIcon icon={cilSave} className="me-2" />
                              Publicar Asignatura
                            </>
                          )}
                        </CButton>

                        <CButton
                          type="button"
                          color="secondary"
                          variant="outline"
                          onClick={handleSaveAsDraft}
                          disabled={loading}
                          className="d-flex align-items-center justify-content-center"
                        >
                          Guardar como Borrador
                        </CButton>
                      </div>
                    </CCardBody>
                  </CCard>

                  <CCard>
                    <CCardHeader>
                      <h5 className="mb-0">Ayuda</h5>
                    </CCardHeader>
                    <CCardBody>
                      <small className="text-muted">
                        <strong>Consejos:</strong>
                        <ul className="mt-2 ps-3">
                          <li>Use un nombre descriptivo y claro</li>
                          <li>Defina objetivos específicos y medibles</li>
                          <li>Establezca prerrequisitos si es necesario</li>
                          <li>Configure fechas realistas</li>
                        </ul>
                      </small>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CreateSubject
