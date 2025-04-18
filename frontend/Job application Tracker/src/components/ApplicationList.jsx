import { useState, useMemo, useEffect } from 'react'

function ApplicationList({ applications }) {
  const [filters, setFilters] = useState({
    company: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  })
  useEffect(() => {
    setEditedApplications(applications)
  }, [applications])

  const [appliedFilters, setAppliedFilters] = useState(filters)
  const [editedApplications, setEditedApplications] = useState(applications)
  const [currentlyEditingId, setCurrentlyEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})

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

  const handleEdit = (app) => {
    setCurrentlyEditingId(app.id)
    setEditForm({ ...app })
  }

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    setEditedApplications(prev =>
      prev.map(app =>
        app.id === currentlyEditingId ? { ...editForm } : app
      )
    )
    setCurrentlyEditingId(null)
    setEditForm({})
  }

  const handleDelete = (app) => {
    const updatedList = editedApplications.filter(a => a.id !== app.id)
    setEditedApplications(updatedList)
  }

  const filteredApplications = useMemo(() => {
    return editedApplications.filter(app => {
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
  }, [editedApplications, appliedFilters])

  const summary = useMemo(() => {
    const stats = {
      total: filteredApplications.length,
      Applied: 0,
      Interview: 0,
      Offer: 0,
      Rejected: 0
    }

    filteredApplications.forEach(app => {
      if (stats[app.status] !== undefined) {
        stats[app.status]++
      }
    })

    return stats
  }, [filteredApplications])

  return (
    <div className="applications-container">
      {/* Filters Section */}
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

      {/* Applications Table */}
      <div className="applications-table">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Location</th>
              <th>Status</th>
              <th>Date Applied</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map(app => (
                <tr key={app.id}>
                  {currentlyEditingId === app.id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          name="company"
                          value={editForm.company}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="position"
                          value={editForm.position}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="location"
                          value={editForm.location}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>
                        <select
                          name="status"
                          value={editForm.status}
                          onChange={handleEditChange}
                        >
                          <option value="Applied">Applied</option>
                          <option value="Interview">Interview</option>
                          <option value="Offer">Offer</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="date"
                          name="dateApplied"
                          value={editForm.dateApplied}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>
                        <button onClick={handleSave}>Save</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{app.company}</td>
                      <td>{app.position}</td>
                      <td>{app.location}</td>
                      <td>{app.status}</td>
                      <td>{app.dateApplied}</td>
                      <td>
                        <button onClick={() => handleEdit(app)}>Edit</button>
                        <button onClick={() => handleDelete(app)}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-message">No job applications found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/*  Summary Stats Section ---- its working fine, noooo issues hereee */}
      <div className="summary-stats" style={{ marginTop: '2rem' }}>
        <h3>Application Summary</h3>
        <ul>
          <li><strong>Total:</strong> {summary.total}</li>
          <li><strong>Applied:</strong> {summary.Applied}</li>
          <li><strong>Interview:</strong> {summary.Interview}</li>
          <li><strong>Offer:</strong> {summary.Offer}</li>
          <li><strong>Rejected:</strong> {summary.Rejected}</li>
        </ul>
      </div>
    </div>
  )
}

export default ApplicationList