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
  CProgress,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBook,
  cilPencil,
  cilSave,
  cilSearch,
  cilChartLine,
  cilCalculator,
  cilPrint,
  cilDownload,
} from '@coreui/icons'
import LoadingSpinner from '../../../components/common/LoadingSpinner'

const GradeBook = () => {
  const navigate = useNavigate()
  const [grades, setGrades] = useState([])
  const [students, setStudents] = useState([])
  const [subjects, setSubjects] = useState([])
  const [periods, setPeriods] = useState([])
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [filters, setFilters] = useState({
    periodo: '',
    asignatura: '',
    search: '',
  })
  const [editingGrades, setEditingGrades] = useState({})

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      // Simulate API calls
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data based on calificacion_periodo table structure
      const mockGrades = [
        {
          id: 1,
          usuario_id_estudiante: 1,
          estudiante: {
            nombre: 'Ana María García López',
            email: 'ana.garcia@estudiante.edu',
            documento: '1234567890',
          },
          asignatura_id: 1,
          asignatura: {
            nombre: 'Matemáticas',
            codigo: 'MAT-001',
          },
          periodo_academico_id: 1,
          periodo: {
            nombre: '2024-1',
            fecha_inicio: '2024-02-01',
            fecha_fin: '2024-06-30',
          },
          nota_periodo_1: 4.2,
          nota_periodo_2: 3.8,
          nota_periodo_3: 4.5,
          nota_final: 4.17,
          observaciones: 'Buen rendimiento académico',
          fecha_actualizacion: '2024-06-15T14:30:00',
        },
        {
          id: 2,
          usuario_id_estudiante: 1,
          estudiante: {
            nombre: 'Ana María García López',
            email: 'ana.garcia@estudiante.edu',
            documento: '1234567890',
          },
          asignatura_id: 2,
          asignatura: {
            nombre: 'Español',
            codigo: 'ESP-001',
          },
          periodo_academico_id: 1,
          periodo: {
            nombre: '2024-1',
            fecha_inicio: '2024-02-01',
            fecha_fin: '2024-06-30',
          },
          nota_periodo_1: 4.0,
          nota_periodo_2: 4.3,
          nota_periodo_3: 4.1,
          nota_final: 4.13,
          observaciones: null,
          fecha_actualizacion: '2024-06-15T14:30:00',
        },
        {
          id: 3,
          usuario_id_estudiante: 2,
          estudiante: {
            nombre: 'Carlos Eduardo Rodríguez Pérez',
            email: 'carlos.rodriguez@estudiante.edu',
            documento: '0987654321',
          },
          asignatura_id: 1,
          asignatura: {
            nombre: 'Matemáticas',
            codigo: 'MAT-001',
          },
          periodo_academico_id: 1,
          periodo: {
            nombre: '2024-1',
            fecha_inicio: '2024-02-01',
            fecha_fin: '2024-06-30',
          },
          nota_periodo_1: 3.5,
          nota_periodo_2: 3.2,
          nota_periodo_3: 3.8,
          nota_final: 3.5,
          observaciones: 'Requiere refuerzo en álgebra',
          fecha_actualizacion: '2024-06-15T14:30:00',
        },
      ]

      const mockSubjects = [
        { id: 1, nombre: 'Matemáticas', codigo: 'MAT-001' },
        { id: 2, nombre: 'Español', codigo: 'ESP-001' },
        { id: 3, nombre: 'Ciencias Naturales', codigo: 'CIE-001' },
        { id: 4, nombre: 'Ciencias Sociales', codigo: 'SOC-001' },
      ]

      const mockPeriods = [
        {
          id: 1,
          nombre: '2024-1',
          fecha_inicio: '2024-02-01',
          fecha_fin: '2024-06-30',
          estado: 'Activo',
        },
        {
          id: 2,
          nombre: '2024-2',
          fecha_inicio: '2024-07-01',
          fecha_fin: '2024-11-30',
          estado: 'Programado',
        },
      ]

      // Extract unique students from grades
      const uniqueStudents = mockGrades.reduce((acc, grade) => {
        const existing = acc.find((s) => s.id === grade.usuario_id_estudiante)
        if (!existing) {
          acc.push({
            id: grade.usuario_id_estudiante,
            nombre: grade.estudiante.nombre,
            email: grade.estudiante.email,
            documento: grade.estudiante.documento,
          })
        }
        return acc
      }, [])

      setGrades(mockGrades)
      setSubjects(mockSubjects)
      setPeriods(mockPeriods)
      setStudents(uniqueStudents)
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al cargar las calificaciones' })
    } finally {
      setLoading(false)
    }
  }

  const handleEditGrade = (gradeId, field, value) => {
    setEditingGrades((prev) => ({
      ...prev,
      [`${gradeId}_${field}`]: value,
    }))
  }

  const calculateFinalGrade = (p1, p2, p3) => {
    const grades = [p1, p2, p3].filter((g) => g !== null && g !== undefined && g !== '')
    if (grades.length === 0) return null
    const sum = grades.reduce((acc, grade) => acc + parseFloat(grade), 0)
    return (sum / grades.length).toFixed(2)
  }

  const saveGrades = async () => {
    try {
      setLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update grades with edited values
      const updatedGrades = grades.map((grade) => {
        const p1 = editingGrades[`${grade.id}_nota_periodo_1`] ?? grade.nota_periodo_1
        const p2 = editingGrades[`${grade.id}_nota_periodo_2`] ?? grade.nota_periodo_2
        const p3 = editingGrades[`${grade.id}_nota_periodo_3`] ?? grade.nota_periodo_3
        const finalGrade = calculateFinalGrade(p1, p2, p3)

        return {
          ...grade,
          nota_periodo_1: parseFloat(p1) || null,
          nota_periodo_2: parseFloat(p2) || null,
          nota_periodo_3: parseFloat(p3) || null,
          nota_final: parseFloat(finalGrade) || null,
          observaciones: editingGrades[`${grade.id}_observaciones`] ?? grade.observaciones,
        }
      })

      setGrades(updatedGrades)
      setEditingGrades({})
      setEditMode(false)
      setMessage({ type: 'success', text: 'Calificaciones guardadas exitosamente' })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al guardar las calificaciones' })
    } finally {
      setLoading(false)
    }
  }

  const getGradeColor = (grade) => {
    if (!grade || grade === '') return 'secondary'
    const numGrade = parseFloat(grade)
    if (numGrade >= 4.6) return 'success'
    if (numGrade >= 4.0) return 'info'
    if (numGrade >= 3.0) return 'warning'
    return 'danger'
  }

  const getGradeStatus = (grade) => {
    if (!grade || grade === '') return 'Sin calificar'
    const numGrade = parseFloat(grade)
    if (numGrade >= 3.0) return 'Aprobado'
    return 'Reprobado'
  }

  const filteredGrades = grades.filter((grade) => {
    return (
      (!filters.periodo || grade.periodo_academico_id.toString() === filters.periodo) &&
      (!filters.asignatura || grade.asignatura_id.toString() === filters.asignatura) &&
      (!filters.search ||
        grade.estudiante.nombre.toLowerCase().includes(filters.search.toLowerCase()) ||
        grade.estudiante.email.toLowerCase().includes(filters.search.toLowerCase()))
    )
  })

  // Group grades by student for better display
  const gradesByStudent = filteredGrades.reduce((acc, grade) => {
    const studentId = grade.usuario_id_estudiante
    if (!acc[studentId]) {
      acc[studentId] = {
        student: grade.estudiante,
        grades: [],
      }
    }
    acc[studentId].grades.push(grade)
    return acc
  }, {})

  if (loading && !editMode) {
    return <LoadingSpinner text="Cargando libro de calificaciones..." />
  }

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

          {/* Filters and Actions */}
          <CCard className="mb-3">
            <CCardBody>
              <CRow className="align-items-end">
                <CCol md={3}>
                  <CFormSelect
                    value={filters.periodo}
                    onChange={(e) => setFilters((prev) => ({ ...prev, periodo: e.target.value }))}
                  >
                    <option value="">Todos los períodos</option>
                    {periods.map((period) => (
                      <option key={period.id} value={period.id}>
                        {period.nombre}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={3}>
                  <CFormSelect
                    value={filters.asignatura}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, asignatura: e.target.value }))
                    }
                  >
                    <option value="">Todas las asignaturas</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.nombre}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={3}>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilSearch} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Buscar estudiante..."
                      value={filters.search}
                      onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                    />
                  </CInputGroup>
                </CCol>
                <CCol md={3}>
                  <div className="d-flex gap-2">
                    {editMode ? (
                      <>
                        <CButton
                          color="success"
                          onClick={saveGrades}
                          disabled={loading}
                          className="d-flex align-items-center"
                        >
                          {loading ? (
                            <CSpinner size="sm" className="me-2" />
                          ) : (
                            <CIcon icon={cilSave} className="me-2" />
                          )}
                          Guardar
                        </CButton>
                        <CButton
                          color="secondary"
                          onClick={() => {
                            setEditMode(false)
                            setEditingGrades({})
                          }}
                        >
                          Cancelar
                        </CButton>
                      </>
                    ) : (
                      <>
                        <CButton
                          color="primary"
                          onClick={() => setEditMode(true)}
                          className="d-flex align-items-center"
                        >
                          <CIcon icon={cilPencil} className="me-2" />
                          Editar
                        </CButton>
                        <CButton
                          color="info"
                          variant="outline"
                          className="d-flex align-items-center"
                        >
                          <CIcon icon={cilPrint} className="me-2" />
                          Imprimir
                        </CButton>
                      </>
                    )}
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>

          {/* Grades Table */}
          <CCard>
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <CIcon icon={cilBook} className="me-2" />
                <h4 className="mb-0">Libro de Calificaciones</h4>
              </div>
              <CBadge color="info">{Object.keys(gradesByStudent).length} estudiantes</CBadge>
            </CCardHeader>

            <CCardBody className="p-0">
              <div className="table-responsive">
                <CTable hover>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Estudiante</CTableHeaderCell>
                      <CTableHeaderCell>Asignatura</CTableHeaderCell>
                      <CTableHeaderCell>Período 1</CTableHeaderCell>
                      <CTableHeaderCell>Período 2</CTableHeaderCell>
                      <CTableHeaderCell>Período 3</CTableHeaderCell>
                      <CTableHeaderCell>Nota Final</CTableHeaderCell>
                      <CTableHeaderCell>Estado</CTableHeaderCell>
                      <CTableHeaderCell>Observaciones</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {filteredGrades.map((grade) => (
                      <CTableRow key={grade.id}>
                        <CTableDataCell>
                          <div>
                            <div className="fw-semibold">{grade.estudiante.nombre}</div>
                            <small className="text-muted">{grade.estudiante.email}</small>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>
                            <div className="fw-semibold">{grade.asignatura.nombre}</div>
                            <small className="text-muted">{grade.asignatura.codigo}</small>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell>
                          {editMode ? (
                            <CFormInput
                              type="number"
                              min="0"
                              max="5"
                              step="0.1"
                              size="sm"
                              value={
                                editingGrades[`${grade.id}_nota_periodo_1`] ??
                                grade.nota_periodo_1 ??
                                ''
                              }
                              onChange={(e) =>
                                handleEditGrade(grade.id, 'nota_periodo_1', e.target.value)
                              }
                            />
                          ) : (
                            <CBadge color={getGradeColor(grade.nota_periodo_1)}>
                              {grade.nota_periodo_1 ?? 'N/A'}
                            </CBadge>
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {editMode ? (
                            <CFormInput
                              type="number"
                              min="0"
                              max="5"
                              step="0.1"
                              size="sm"
                              value={
                                editingGrades[`${grade.id}_nota_periodo_2`] ??
                                grade.nota_periodo_2 ??
                                ''
                              }
                              onChange={(e) =>
                                handleEditGrade(grade.id, 'nota_periodo_2', e.target.value)
                              }
                            />
                          ) : (
                            <CBadge color={getGradeColor(grade.nota_periodo_2)}>
                              {grade.nota_periodo_2 ?? 'N/A'}
                            </CBadge>
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {editMode ? (
                            <CFormInput
                              type="number"
                              min="0"
                              max="5"
                              step="0.1"
                              size="sm"
                              value={
                                editingGrades[`${grade.id}_nota_periodo_3`] ??
                                grade.nota_periodo_3 ??
                                ''
                              }
                              onChange={(e) =>
                                handleEditGrade(grade.id, 'nota_periodo_3', e.target.value)
                              }
                            />
                          ) : (
                            <CBadge color={getGradeColor(grade.nota_periodo_3)}>
                              {grade.nota_periodo_3 ?? 'N/A'}
                            </CBadge>
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          <div className="fw-bold">
                            <CBadge color={getGradeColor(grade.nota_final)} size="lg">
                              {grade.nota_final ?? 'N/A'}
                            </CBadge>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CBadge
                            color={
                              getGradeStatus(grade.nota_final) === 'Aprobado' ? 'success' : 'danger'
                            }
                            variant="outline"
                          >
                            {getGradeStatus(grade.nota_final)}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell>
                          {editMode ? (
                            <CFormInput
                              size="sm"
                              placeholder="Observaciones..."
                              value={
                                editingGrades[`${grade.id}_observaciones`] ??
                                grade.observaciones ??
                                ''
                              }
                              onChange={(e) =>
                                handleEditGrade(grade.id, 'observaciones', e.target.value)
                              }
                            />
                          ) : (
                            <small className="text-muted">
                              {grade.observaciones || 'Sin observaciones'}
                            </small>
                          )}
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default GradeBook
