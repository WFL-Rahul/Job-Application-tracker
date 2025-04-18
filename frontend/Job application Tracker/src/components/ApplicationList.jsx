import { useState } from 'react'

function ApplicationList({ applications }) {
  const [filters, setFilters] = useState({
    company: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  })

  const [appliedFilters, setAppliedFilters] = useState(filters)

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  const applyFilters = () => {
    setAppliedFilters(filters)
  }

  const resetFilters = () => {
    const reset = {
      company: '',
      status: '',
      dateFrom: '',
      dateTo: ''
    }
    setFilters(reset)
    setAppliedFilters(reset)
  }

  const filteredApplications = applications.filter(app => {
    const matchesCompany =
      appliedFilters.company === '' ||
      app.company.toLowerCase().includes(appliedFilters.company.toLowerCase())

    const matchesStatus =
      appliedFilters.status === '' || app.status === appliedFilters.status

    const appDate = new Date(app.dateApplied)
    const fromDate = appliedFilters.dateFrom ? new Date(appliedFilters.dateFrom) : null
    const toDate = appliedFilters.dateTo ? new Date(appliedFilters.dateTo) : null

    const matchesDateFrom = !fromDate || appDate >= fromDate
    const matchesDateTo = !toDate || appDate <= toDate

    return matchesCompany && matchesStatus && matchesDateFrom && matchesDateTo
  })

  return (
    <div className="applications-container">
      <div className="filter-section">
        <h2>Filter Applications</h2>
        <div className="filters">
          <div className="filter-group">
            <label>Company</label>
            <input
              type="text"
              name="company"
              placeholder="Filter by company"
              value={filters.company}
              onChange={handleFilterChange}
            />
          </div>

          <div className="filter-group">
            <label>Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">All statuses</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Date From</label>
            <input
              type="date"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={handleFilterChange}
            />
          </div>

          <div className="filter-group">
            <label>Date To</label>
            <input
              type="date"
              name="dateTo"
              value={filters.dateTo}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        <div className="filter-actions">
          <button className="reset-button" onClick={resetFilters}>Reset</button>
          <button className="apply-button" onClick={applyFilters}>Apply Filters</button>
        </div>
      </div>

      <div className="applications-table">
        <table>
          <thead>
            <tr>
              <th>Company <span className="sort-icon">▼</span></th>
              <th>Position <span className="sort-icon">▼</span></th>
              <th>Location</th>
              <th>Status <span className="sort-icon">▼</span></th>
              <th>Date Applied <span className="sort-icon">▼</span></th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map(app => (
                <tr key={app.id}>
                  <td>{app.company}</td>
                  <td>{app.position}</td>
                  <td>{app.location}</td>
                  <td>{app.status}</td>
                  <td>{app.dateApplied}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-message">No job applications found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ApplicationList
