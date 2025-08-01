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
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CProgress,
  CButtonGroup,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilCalendar,
  cilPeople,
  cilCheck,
  cilX,
  cilClock,
  cilSearch,
  cilChartLine,
  cilSave,
  cilPrint,
} from '@coreui/icons'
import LoadingSpinner from '../../../components/common/LoadingSpinner'

const AttendanceTracker = () => {
  const navigate = useNavigate()
  const [attendance, setAttendance] = useState([])
  const [students, setStudents] = useState([])
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedClass, setSelectedClass] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [attendanceChanges, setAttendanceChanges] = useState({})
  const [statsModal, setStatsModal] = useState({ visible: false, student: null })

  useEffect(() => {
    loadData()
  }, [selectedDate, selectedClass])

  const loadData = async () => {
    setLoading(true)
    try {
      // Simulate API calls
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data based on asistencia and asistencia_clase tables
      const mockAttendance = [
        {
          id: 1,
          usuario_id: 1,
          estudiante: {
            nombre: 'Ana María García López',
            email: 'ana.garcia@estudiante.edu',
            documento: '1234567890',
          },
          fecha: '2024-07-30',
          estado_asistencia_id: 1,
          estado: 'Presente',
          observaciones: null,
          clases: [
            {
              clase_id: 1,
              asignatura: 'Matemáticas',
              hora_inicio: '08:00',
              hora_fin: '09:30',
              estado: 'Presente',
            },
            {
              clase_id: 2,
              asignatura: 'Español',
              hora_inicio: '09:45',
              hora_fin: '11:15',
              estado: 'Presente',
            },
            {
              clase_id: 3,
              asignatura: 'Ciencias',
              hora_inicio: '11:30',
              hora_fin: '13:00',
              estado: 'Tardanza',
            },
          ],
        },
        {
          id: 2,
          usuario_id: 2,
          estudiante: {
            nombre: 'Carlos Eduardo Rodríguez Pérez',
            email: 'carlos.rodriguez@estudiante.edu',
            documento: '0987654321',
          },
          fecha: '2024-07-30',
          estado_asistencia_id: 2,
          estado: 'Tardanza',
          observaciones: 'Llegó 15 minutos tarde',
          clases: [
            {
              clase_id: 1,
              asignatura: 'Matemáticas',
              hora_inicio: '08:00',
              hora_fin: '09:30',
              estado: 'Tardanza',
            },
            {
              clase_id: 2,
              asignatura: 'Español',
              hora_inicio: '09:45',
              hora_fin: '11:15',
              estado: 'Presente',
            },
            {
              clase_id: 3,
              asignatura: 'Ciencias',
              hora_inicio: '11:30',
              hora_fin: '13:00',
              estado: 'Presente',
            },
          ],
        },
        {
          id: 3,
          usuario_id: 3,
          estudiante: {
            nombre: 'María Fernanda Martínez Silva',
            email: 'maria.martinez@estudiante.edu',
            documento: '1122334455',
          },
          fecha: '2024-07-30',
          estado_asistencia_id: 3,
          estado: 'Ausente',
          observaciones: 'Ausencia justificada - cita médica',
          clases: [
            {
              clase_id: 1,
              asignatura: 'Matemáticas',
              hora_inicio: '08:00',
              hora_fin: '09:30',
              estado: 'Ausente',
            },
            {
              clase_id: 2,
              asignatura: 'Español',
              hora_inicio: '09:45',
              hora_fin: '11:15',
              estado: 'Ausente',
            },
            {
              clase_id: 3,
              asignatura: 'Ciencias',
              hora_inicio: '11:30',
              hora_fin: '13:00',
              estado: 'Ausente',
            },
          ],
        },
      ]

      const mockClasses = [
        {
          id: 1,
          asignatura: 'Matemáticas',
          hora_inicio: '08:00',
          hora_fin: '09:30',
          aula: 'A-101',
        },
        { id: 2, asignatura: 'Español', hora_inicio: '09:45', hora_fin: '11:15', aula: 'A-102' },
        { id: 3, asignatura: 'Ciencias', hora_inicio: '11:30', hora_fin: '13:00', aula: 'Lab-1' },
        { id: 4, asignatura: 'Sociales', hora_inicio: '14:00', hora_fin: '15:30', aula: 'A-103' },
      ]

      // Extract unique students
      const uniqueStudents = mockAttendance.map((att) => ({
        id: att.usuario_id,
        nombre: att.estudiante.nombre,
        email: att.estudiante.email,
        documento: att.estudiante.documento,
      }))

      setAttendance(mockAttendance)
      setClasses(mockClasses)
      setStudents(uniqueStudents)
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al cargar la asistencia' })
    } finally {
      setLoading(false)
    }
  }

  const handleAttendanceChange = (studentId, classId, status) => {
    const key = `${studentId}_${classId}`
    setAttendanceChanges((prev) => ({
      ...prev,
      [key]: status,
    }))
  }

  const saveAttendance = async () => {
    try {
      setLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update attendance with changes
      const updatedAttendance = attendance.map((att) => ({
        ...att,
        clases: att.clases.map((clase) => {
          const key = `${att.usuario_id}_${clase.clase_id}`
          return {
            ...clase,
            estado: attendanceChanges[key] || clase.estado,
          }
        }),
      }))

      setAttendance(updatedAttendance)
      setAttendanceChanges({})
      setEditMode(false)
      setMessage({ type: 'success', text: 'Asistencia guardada exitosamente' })
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al guardar la asistencia' })
    } finally {
      setLoading(false)
    }
  }

  const getAttendanceColor = (status) => {
    const statusColors = {
      Presente: 'success',
      Tardanza: 'warning',
      Ausente: 'danger',
      Justificado: 'info',
    }
    return statusColors[status] || 'secondary'
  }

  const getAttendanceIcon = (status) => {
    const statusIcons = {
      Presente: cilCheck,
      Tardanza: cilClock,
      Ausente: cilX,
      Justificado: cilCheck,
    }
    return statusIcons[status] || cilClock
  }

  const calculateAttendanceStats = (studentAttendance) => {
    const total = studentAttendance.clases.length
    const presente = studentAttendance.clases.filter((c) => c.estado === 'Presente').length
    const tardanza = studentAttendance.clases.filter((c) => c.estado === 'Tardanza').length
    const ausente = studentAttendance.clases.filter((c) => c.estado === 'Ausente').length

    return {
      total,
      presente,
      tardanza,
      ausente,
      percentage: total > 0 ? (((presente + tardanza * 0.5) / total) * 100).toFixed(1) : 0,
    }
  }

  const filteredClasses = selectedClass
    ? classes.filter((c) => c.id.toString() === selectedClass)
    : classes

  if (loading && !editMode) {
    return <LoadingSpinner text="Cargando registro de asistencia..." />
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

          {/* Controls */}
          <CCard className="mb-3">
            <CCardBody>
              <CRow className="align-items-end">
                <CCol md={3}>
                  <label className="form-label">Fecha</label>
                  <CFormInput
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </CCol>
                <CCol md={3}>
                  <label className="form-label">Clase</label>
                  <CFormSelect
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                  >
                    <option value="">Todas las clases</option>
                    {classes.map((clase) => (
                      <option key={clase.id} value={clase.id}>
                        {clase.asignatura} ({clase.hora_inicio} - {clase.hora_fin})
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={3}>
                  <div className="d-flex gap-2">
                    {editMode ? (
                      <>
                        <CButton
                          color="success"
                          onClick={saveAttendance}
                          disabled={loading}
                          className="d-flex align-items-center"
                        >
                          <CIcon icon={cilSave} className="me-2" />
                          Guardar
                        </CButton>
                        <CButton
                          color="secondary"
                          onClick={() => {
                            setEditMode(false)
                            setAttendanceChanges({})
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
                          <CIcon icon={cilPeople} className="me-2" />
                          Tomar Asistencia
                        </CButton>
                        <CButton
                          color="info"
                          variant="outline"
                          className="d-flex align-items-center"
                        >
                          <CIcon icon={cilPrint} className="me-2" />
                          Reporte
                        </CButton>
                      </>
                    )}
                  </div>
                </CCol>
                <CCol md={3}>
                  <div className="text-end">
                    <CBadge color="info" className="fs-6">
                      {new Date(selectedDate).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </CBadge>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>

          {/* Attendance Table */}
          <CCard>
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <CIcon icon={cilCalendar} className="me-2" />
                <h4 className="mb-0">Registro de Asistencia</h4>
              </div>
              <CBadge color="info">{attendance.length} estudiantes</CBadge>
            </CCardHeader>

            <CCardBody className="p-0">
              <div className="table-responsive">
                <CTable hover>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Estudiante</CTableHeaderCell>
                      {filteredClasses.map((clase) => (
                        <CTableHeaderCell key={clase.id} className="text-center">
                          <div>{clase.asignatura}</div>
                          <small className="text-muted">
                            {clase.hora_inicio} - {clase.hora_fin}
                          </small>
                        </CTableHeaderCell>
                      ))}
                      <CTableHeaderCell className="text-center">Estado General</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">% Asistencia</CTableHeaderCell>
                      <CTableHeaderCell>Observaciones</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {attendance.map((studentAttendance) => {
                      const stats = calculateAttendanceStats(studentAttendance)
                      return (
                        <CTableRow key={studentAttendance.id}>
                          <CTableDataCell>
                            <div>
                              <div className="fw-semibold">
                                {studentAttendance.estudiante.nombre}
                              </div>
                              <small className="text-muted">
                                {studentAttendance.estudiante.email}
                              </small>
                            </div>
                          </CTableDataCell>
                          {filteredClasses.map((clase) => {
                            const claseAttendance = studentAttendance.clases.find(
                              (c) => c.clase_id === clase.id,
                            )
                            const currentStatus =
                              attendanceChanges[`${studentAttendance.usuario_id}_${clase.id}`] ||
                              claseAttendance?.estado ||
                              'Ausente'

                            return (
                              <CTableDataCell key={clase.id} className="text-center">
                                {editMode ? (
                                  <CButtonGroup size="sm">
                                    <CButton
                                      color={
                                        currentStatus === 'Presente' ? 'success' : 'outline-success'
                                      }
                                      onClick={() =>
                                        handleAttendanceChange(
                                          studentAttendance.usuario_id,
                                          clase.id,
                                          'Presente',
                                        )
                                      }
                                    >
                                      <CIcon icon={cilCheck} />
                                    </CButton>
                                    <CButton
                                      color={
                                        currentStatus === 'Tardanza' ? 'warning' : 'outline-warning'
                                      }
                                      onClick={() =>
                                        handleAttendanceChange(
                                          studentAttendance.usuario_id,
                                          clase.id,
                                          'Tardanza',
                                        )
                                      }
                                    >
                                      <CIcon icon={cilClock} />
                                    </CButton>
                                    <CButton
                                      color={
                                        currentStatus === 'Ausente' ? 'danger' : 'outline-danger'
                                      }
                                      onClick={() =>
                                        handleAttendanceChange(
                                          studentAttendance.usuario_id,
                                          clase.id,
                                          'Ausente',
                                        )
                                      }
                                    >
                                      <CIcon icon={cilX} />
                                    </CButton>
                                  </CButtonGroup>
                                ) : (
                                  <CBadge color={getAttendanceColor(currentStatus)}>
                                    <CIcon
                                      icon={getAttendanceIcon(currentStatus)}
                                      className="me-1"
                                    />
                                    {currentStatus}
                                  </CBadge>
                                )}
                              </CTableDataCell>
                            )
                          })}
                          <CTableDataCell className="text-center">
                            <CBadge color={getAttendanceColor(studentAttendance.estado)}>
                              {studentAttendance.estado}
                            </CBadge>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div className="d-flex align-items-center justify-content-center">
                              <CProgress
                                value={stats.percentage}
                                className="me-2"
                                style={{ width: '60px' }}
                                color={
                                  stats.percentage >= 80
                                    ? 'success'
                                    : stats.percentage >= 60
                                      ? 'warning'
                                      : 'danger'
                                }
                              />
                              <span className="fw-semibold">{stats.percentage}%</span>
                            </div>
                            <CButton
                              color="link"
                              size="sm"
                              onClick={() =>
                                setStatsModal({ visible: true, student: studentAttendance })
                              }
                            >
                              <CIcon icon={cilChartLine} />
                            </CButton>
                          </CTableDataCell>
                          <CTableDataCell>
                            <small className="text-muted">
                              {studentAttendance.observaciones || 'Sin observaciones'}
                            </small>
                          </CTableDataCell>
                        </CTableRow>
                      )
                    })}
                  </CTableBody>
                </CTable>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Statistics Modal */}
      <CModal
        visible={statsModal.visible}
        onClose={() => setStatsModal({ visible: false, student: null })}
      >
        <CModalHeader>
          <CModalTitle>
            Estadísticas de Asistencia - {statsModal.student?.estudiante.nombre}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {statsModal.student && (
            <div>
              <CRow className="mb-3">
                <CCol md={6}>
                  <div className="text-center">
                    <h5 className="text-success">
                      {calculateAttendanceStats(statsModal.student).presente}
                    </h5>
                    <small>Presente</small>
                  </div>
                </CCol>
                <CCol md={6}>
                  <div className="text-center">
                    <h5 className="text-warning">
                      {calculateAttendanceStats(statsModal.student).tardanza}
                    </h5>
                    <small>Tardanzas</small>
                  </div>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={6}>
                  <div className="text-center">
                    <h5 className="text-danger">
                      {calculateAttendanceStats(statsModal.student).ausente}
                    </h5>
                    <small>Ausente</small>
                  </div>
                </CCol>
                <CCol md={6}>
                  <div className="text-center">
                    <h5 className="text-info">
                      {calculateAttendanceStats(statsModal.student).percentage}%
                    </h5>
                    <small>Asistencia</small>
                  </div>
                </CCol>
              </CRow>
              <div className="mt-3">
                <h6>Detalle por Clase:</h6>
                {statsModal.student.clases.map((clase) => (
                  <div
                    key={clase.clase_id}
                    className="d-flex justify-content-between align-items-center mb-2"
                  >
                    <span>{clase.asignatura}</span>
                    <CBadge color={getAttendanceColor(clase.estado)}>{clase.estado}</CBadge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setStatsModal({ visible: false, student: null })}
          >
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default AttendanceTracker
