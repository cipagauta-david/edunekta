import React from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'
import PropTypes from 'prop-types'

const Modal = ({
  visible,
  onClose,
  title,
  children,
  size = 'md',
  backdrop = true,
  keyboard = true,
  showCloseButton = true,
  showFooter = true,
  footerContent,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  confirmColor = 'primary',
  cancelColor = 'secondary',
  loading = false,
}) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      onClose()
    }
  }

  return (
    <CModal visible={visible} onClose={onClose} size={size} backdrop={backdrop} keyboard={keyboard}>
      <CModalHeader closeButton={showCloseButton}>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>

      <CModalBody>{children}</CModalBody>

      {showFooter && (
        <CModalFooter>
          {footerContent || (
            <>
              <CButton color={cancelColor} onClick={handleCancel} disabled={loading}>
                {cancelText}
              </CButton>
              {onConfirm && (
                <CButton color={confirmColor} onClick={handleConfirm} disabled={loading}>
                  {loading ? 'Procesando...' : confirmText}
                </CButton>
              )}
            </>
          )}
        </CModalFooter>
      )}
    </CModal>
  )
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  backdrop: PropTypes.bool,
  keyboard: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  showFooter: PropTypes.bool,
  footerContent: PropTypes.node,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  confirmColor: PropTypes.string,
  cancelColor: PropTypes.string,
  loading: PropTypes.bool,
}

export default Modal
