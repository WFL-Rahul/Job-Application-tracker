import { useState } from 'react'

function ApplicationList({ applications }) {
  const [filters, setFilters] = useState({
    company: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  })

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  const resetFilters = () => {
    setFilters({
      company: '',
      status: '',
      dateFrom: '',
      dateTo: ''
    })
  }

  // In a real app, this would filter based on the filters state
  const filteredApplications = applications

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
          <button className="apply-button">Apply Filters</button>
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
