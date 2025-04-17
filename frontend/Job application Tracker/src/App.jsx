import { useState } from 'react'
import './index.css'
import ApplicationList from './components/ApplicationList'
import ApplicationForm from './components/ApplicationForm'
import Navbar from './components/Navbar'

function App() {
  const [showForm, setShowForm] = useState(false)
  const [applications, setApplications] = useState([])

  const addApplication = (newApplication) => {
    setApplications([...applications, { ...newApplication, id: Date.now() }])
    setShowForm(false)
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

        <ApplicationList applications={applications} />
      </div>
      <footer>
        <p>© {new Date().getFullYear()} Job Application Tracker</p>
      </footer>
    </div>
  )
}

export default App
