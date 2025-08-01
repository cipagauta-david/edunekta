import React from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilWarning, cilCheckCircle, cilXCircle, cilInfo } from '@coreui/icons'
import PropTypes from 'prop-types'

const ConfirmDialog = ({
  visible,
  onClose,
  onConfirm,
  title = 'Confirmar acción',
  message = '¿Está seguro de que desea continuar?',
  type = 'warning',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  loading = false,
}) => {
  const typeConfig = {
    warning: {
      icon: cilWarning,
      color: 'warning',
      alertColor: 'warning',
    },
    danger: {
      icon: cilXCircle,
      color: 'danger',
      alertColor: 'danger',
    },
    success: {
      icon: cilCheckCircle,
      color: 'success',
      alertColor: 'success',
    },
    info: {
      icon: cilInfo,
      color: 'info',
      alertColor: 'info',
    },
  }

  const config = typeConfig[type] || typeConfig.warning

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
  }

  return (
    <CModal visible={visible} onClose={onClose} size="sm" backdrop="static" keyboard={false}>
      <CModalHeader closeButton>
        <CModalTitle className="d-flex align-items-center">
          <CIcon icon={config.icon} className={`me-2 text-${config.color}`} />
          {title}
        </CModalTitle>
      </CModalHeader>

      <CModalBody>
        <CAlert color={config.alertColor} className="d-flex align-items-center">
          <CIcon icon={config.icon} className="me-2" />
          <div>{message}</div>
        </CAlert>
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={onClose} disabled={loading}>
          {cancelText}
        </CButton>
        <CButton color={config.color} onClick={handleConfirm} disabled={loading}>
          {loading ? 'Procesando...' : confirmText}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

ConfirmDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.oneOf(['warning', 'danger', 'success', 'info']),
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  loading: PropTypes.bool,
}

export default ConfirmDialog
