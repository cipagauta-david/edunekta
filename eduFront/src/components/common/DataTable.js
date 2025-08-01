import React, { useState, useMemo } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCard,
  CCardBody,
  CCardHeader,
  CInputGroup,
  CFormInput,
  CButton,
  CPagination,
  CPaginationItem,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilSortAscending, cilSortDescending, cilOptions } from '@coreui/icons'
import PropTypes from 'prop-types'
import LoadingSpinner from './LoadingSpinner'

const DataTable = ({
  data = [],
  columns = [],
  title,
  loading = false,
  searchable = true,
  sortable = true,
  paginated = true,
  pageSize = 10,
  actions,
  onRowClick,
  className = '',
  striped = true,
  hover = true,
  responsive = true,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(pageSize)

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data

    return data.filter((item) =>
      columns.some((column) => {
        const value = item[column.key]
        return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      }),
    )
  }, [data, searchTerm, columns])

  // Sort filtered data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })
  }, [filteredData, sortConfig])

  // Paginate sorted data
  const paginatedData = useMemo(() => {
    if (!paginated) return sortedData

    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedData.slice(startIndex, startIndex + itemsPerPage)
  }, [sortedData, currentPage, itemsPerPage, paginated])

  // Calculate pagination info
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const totalItems = sortedData.length

  const handleSort = (key) => {
    if (!sortable) return

    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const renderSortIcon = (columnKey) => {
    if (!sortable || sortConfig.key !== columnKey) return null

    return (
      <CIcon
        icon={sortConfig.direction === 'asc' ? cilSortAscending : cilSortDescending}
        className="ms-1"
        size="sm"
      />
    )
  }

  const renderCellContent = (item, column) => {
    const value = item[column.key]

    if (column.render) {
      return column.render(value, item)
    }

    if (column.type === 'badge') {
      const badgeColor = column.getBadgeColor ? column.getBadgeColor(value) : 'primary'
      return <CBadge color={badgeColor}>{value}</CBadge>
    }

    if (column.type === 'date') {
      return new Date(value).toLocaleDateString('es-ES')
    }

    return value
  }

  const renderPagination = () => {
    if (!paginated || totalPages <= 1) return null

    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <CPaginationItem key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
          {i}
        </CPaginationItem>,
      )
    }

    return (
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="text-muted small">
          Mostrando {(currentPage - 1) * itemsPerPage + 1} a{' '}
          {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems} resultados
        </div>
        <CPagination>
          <CPaginationItem
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Anterior
          </CPaginationItem>
          {pages}
          <CPaginationItem
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Siguiente
          </CPaginationItem>
        </CPagination>
      </div>
    )
  }

  if (loading) {
    return (
      <CCard className={className}>
        {title && (
          <CCardHeader>
            <h5 className="mb-0">{title}</h5>
          </CCardHeader>
        )}
        <CCardBody>
          <LoadingSpinner text="Cargando datos..." />
        </CCardBody>
      </CCard>
    )
  }

  return (
    <CCard className={className}>
      {(title || searchable || actions) && (
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <div>{title && <h5 className="mb-0">{title}</h5>}</div>
          <div className="d-flex gap-2">
            {searchable && (
              <CInputGroup style={{ width: '300px' }}>
                <CFormInput
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <CButton variant="outline" color="secondary">
                  <CIcon icon={cilSearch} />
                </CButton>
              </CInputGroup>
            )}
            {actions}
          </div>
        </CCardHeader>
      )}

      <CCardBody className="p-0">
        <CTable striped={striped} hover={hover} responsive={responsive} className="mb-0">
          <CTableHead>
            <CTableRow>
              {columns.map((column) => (
                <CTableHeaderCell
                  key={column.key}
                  className={
                    sortable && column.sortable !== false ? 'cursor-pointer user-select-none' : ''
                  }
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                  style={{ width: column.width }}
                >
                  <div className="d-flex align-items-center">
                    {column.label}
                    {renderSortIcon(column.key)}
                  </div>
                </CTableHeaderCell>
              ))}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {paginatedData.length === 0 ? (
              <CTableRow>
                <CTableDataCell colSpan={columns.length} className="text-center py-4">
                  <div className="text-muted">
                    {searchTerm ? 'No se encontraron resultados' : 'No hay datos disponibles'}
                  </div>
                </CTableDataCell>
              </CTableRow>
            ) : (
              paginatedData.map((item, index) => (
                <CTableRow
                  key={item.id || index}
                  className={onRowClick ? 'cursor-pointer' : ''}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {columns.map((column) => (
                    <CTableDataCell key={column.key}>
                      {renderCellContent(item, column)}
                    </CTableDataCell>
                  ))}
                </CTableRow>
              ))
            )}
          </CTableBody>
        </CTable>

        {renderPagination()}
      </CCardBody>
    </CCard>
  )
}

DataTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      width: PropTypes.string,
      type: PropTypes.oneOf(['text', 'badge', 'date']),
      render: PropTypes.func,
      getBadgeColor: PropTypes.func,
    }),
  ),
  title: PropTypes.string,
  loading: PropTypes.bool,
  searchable: PropTypes.bool,
  sortable: PropTypes.bool,
  paginated: PropTypes.bool,
  pageSize: PropTypes.number,
  actions: PropTypes.node,
  onRowClick: PropTypes.func,
  className: PropTypes.string,
  striped: PropTypes.bool,
  hover: PropTypes.bool,
  responsive: PropTypes.bool,
}

export default DataTable
