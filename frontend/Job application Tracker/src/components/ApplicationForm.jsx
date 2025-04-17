import { useState } from 'react'

function ApplicationForm({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    status: 'Applied',
    dateApplied: new Date().toISOString().split('T')[0],
    salary: '',
    contactPerson: '',
    contactEmail: '',
    jobLink: '',
    notes: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Job Application</h2>
          <button className="close-button" onClick={onCancel}>×</button>
        </div>
        <p className="modal-description">Fill in the details of your new job application.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="company">Company*</label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="Company name"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="position">Position*</label>
              <input
                type="text"
                id="position"
                name="position"
                placeholder="Job title"
                value={formData.position}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Location*</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="City, State or Remote"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status*</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dateApplied">Date Applied*</label>
              <input
                type="date"
                id="dateApplied"
                name="dateApplied"
                value={formData.dateApplied}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="salary">Salary (Expected/Offered)</label>
              <input
                type="text"
                id="salary"
                name="salary"
                placeholder="e.g. $80,000"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contactPerson">Contact Person</label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                placeholder="Contact person"
                value={formData.contactPerson}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactEmail">Contact Email</label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                placeholder="contact@example.com"
                value={formData.contactEmail}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="jobLink">Job Link</label>
            <input
              type="url"
              id="jobLink"
              name="jobLink"
              placeholder="https://example.com/job"
              value={formData.jobLink}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Any additional notes about the application"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ApplicationForm
