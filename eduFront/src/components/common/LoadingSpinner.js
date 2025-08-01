import React from 'react'
import { CSpinner } from '@coreui/react'
import PropTypes from 'prop-types'

const LoadingSpinner = ({
  size = 'md',
  color = 'primary',
  variant = 'border',
  className = '',
  text = 'Cargando...',
}) => {
  const sizeMap = {
    sm: { width: '1rem', height: '1rem' },
    md: { width: '2rem', height: '2rem' },
    lg: { width: '3rem', height: '3rem' },
  }

  return (
    <div
      className={`d-flex flex-column align-items-center justify-content-center p-3 ${className}`}
    >
      <CSpinner color={color} variant={variant} style={sizeMap[size]} />
      {text && <div className="mt-2 text-muted small">{text}</div>}
    </div>
  )
}

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.string,
  variant: PropTypes.oneOf(['border', 'grow']),
  className: PropTypes.string,
  text: PropTypes.string,
}

export default LoadingSpinner
