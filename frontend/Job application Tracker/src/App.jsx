import { useState, useEffect } from 'react'
import './index.css'
import ApplicationList from './components/ApplicationList'
import ApplicationForm from './components/ApplicationForm'
import Navbar from './components/Navbar'

function App() {
  const [showForm, setShowForm] = useState(false)
  const [applications, setApplications] = useState([])

  //  Fetchingg data from backend on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/applications') // noteee---my backend is running on port 5000, 
      .then(res => res.json())
      .then(data => setApplications(data))
      .catch(err => console.error('Error fetching applications:', err))
  }, [])

  // 2. Add new application
  const addApplication = (newApplication) => {
    fetch('http://localhost:5000/api/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newApplication)
    })
      .then(res => res.json())
      .then(savedApp => {
        setApplications(prev => [...prev, savedApp])
        setShowForm(false)
      })
      .catch(err => console.error('Error saving application:', err))
  }

  // 3. Update application
  const updateApplication = (id, updatedData) => {
    fetch(`http://localhost:5000/api/applications/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    })
      .then(() => {
        setApplications(prev =>
          prev.map(app => (app.id === id ? { ...updatedData, id } : app))
        )
      })
      .catch(err => console.error('Error updating application:', err))
  }

  // 4. Delete application
  const deleteApplication = (id) => {
    fetch(`http://localhost:5000/api/applications/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setApplications(prev => prev.filter(app => app.id !== id))
      })
      .catch(err => console.error('Error deleting application:', err))
  }

  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <div className="applications-header">
          <h1>Job Applications</h1>
          <button className="add-button" onClick={() => setShowForm(true)}>
            + Add Application
          </button>
        </div>

        {showForm && (
          <ApplicationForm
            onSave={addApplication}
            onCancel={() => setShowForm(false)}
          />
        )}

        <ApplicationList
          applications={applications}
          onUpdate={updateApplication}
          onDelete={deleteApplication}
        />
      </div>
      <footer>
        <p>© {new Date().getFullYear()} Job Application Tracker</p>
      </footer>
    </div>
  )
}

export default App
