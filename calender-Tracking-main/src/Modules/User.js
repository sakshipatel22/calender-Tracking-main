import React, { useState } from 'react'

const initialCompanies = [
  {
    id: 1,
    name: 'Example Company',
    lastCommunications: [
      { type: 'LinkedIn Post', date: '2024-12-01', notes: 'Posted an article' },
      { type: 'LinkedIn Message', date: '2024-12-10', notes: 'Follow-up DM' },
      { type: 'Email', date: '2024-12-20', notes: 'Sent holiday wishes' },
    ],
    nextCommunication: { type: 'Phone Call', date: '2025-01-05' },
  },
  {
    id: 2,
    name: 'Another Company',
    lastCommunications: [
      { type: 'Email', date: '2024-11-28', notes: 'Intro email' },
      { type: 'Phone Call', date: '2024-12-05', notes: 'Scheduled a meeting' },
    ],
    nextCommunication: { type: 'LinkedIn Message', date: '2025-01-02' },
  },
]

function User() {
  const [companies, setCompanies] = useState(initialCompanies)
  const [selectedCompanies, setSelectedCompanies] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [newCommunication, setNewCommunication] = useState({
    type: '',
    date: '',
    notes: '',
  })

  const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD

  const handleSelectCompany = (id) => {
    if (selectedCompanies.includes(id)) {
      setSelectedCompanies(selectedCompanies.filter((cid) => cid !== id))
    } else {
      setSelectedCompanies([...selectedCompanies, id])
    }
  }

  const handlePerformCommunication = () => {
    // For each selected company, add the new communication
    setCompanies((prev) =>
      prev.map((c) => {
        if (selectedCompanies.includes(c.id)) {
          return {
            ...c,
            lastCommunications: [
              { ...newCommunication },
              ...c.lastCommunications,
            ].slice(0, 5), // keep only last 5
            nextCommunication: null, // reset next communication (demo only)
          }
        }
        return c
      })
    )
    // Clear selections and form
    setSelectedCompanies([])
    setShowModal(false)
    setNewCommunication({ type: '', date: '', notes: '' })
  }

  const overdueCompanies = companies.filter((c) => {
    if (!c.nextCommunication) return false
    return c.nextCommunication.date < today
  })
  const dueTodayCompanies = companies.filter((c) => {
    if (!c.nextCommunication) return false
    return c.nextCommunication.date === today
  })

  return (
    <div className="space-y-6">
      {/* Notifications */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
        <div className="bg-white p-4 rounded shadow">
          <div className="mb-2">
            <strong>Overdue ({overdueCompanies.length}): </strong>
            {overdueCompanies.map((c) => c.name).join(', ') || 'None'}
          </div>
          <div>
            <strong>Due Today ({dueTodayCompanies.length}): </strong>
            {dueTodayCompanies.map((c) => c.name).join(', ') || 'None'}
          </div>
        </div>
      </section>

      {/* Companies Table */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Company Communications</h2>
        <div className="bg-white p-4 rounded shadow">
          <table className="min-w-full table-auto">
            <thead className="border-b">
              <tr className="bg-gray-100">
                <th className="px-3 py-2 text-left">Select</th>
                <th className="px-3 py-2 text-left">Company Name</th>
                <th className="px-3 py-2 text-left">Last Five Communications</th>
                <th className="px-3 py-2 text-left">
                  Next Scheduled Communication
                </th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c) => {
                const isOverdue =
                  c.nextCommunication && c.nextCommunication.date < today
                const isDueToday =
                  c.nextCommunication && c.nextCommunication.date === today

                const rowColor = isOverdue
                  ? 'bg-red-100'
                  : isDueToday
                  ? 'bg-yellow-100'
                  : ''

                return (
                  <tr key={c.id} className={`${rowColor} border-b`}>
                    <td className="px-3 py-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        checked={selectedCompanies.includes(c.id)}
                        onChange={() => handleSelectCompany(c.id)}
                      />
                    </td>
                    <td className="px-3 py-2">{c.name}</td>
                    <td className="px-3 py-2 space-x-2">
                      {c.lastCommunications.slice(0, 5).map((comm, index) => (
                        <span
                          key={index}
                          className="inline-block underline decoration-dotted text-blue-600 cursor-pointer"
                          title={comm.notes}
                        >
                          {comm.type} (
                          {new Date(comm.date).toLocaleDateString()})
                        </span>
                      ))}
                    </td>
                    <td className="px-3 py-2">
                      {c.nextCommunication ? (
                        <span>
                          {c.nextCommunication.type} (
                          {new Date(c.nextCommunication.date).toLocaleDateString()}
                          )
                        </span>
                      ) : (
                        <span className="text-gray-500">No upcoming</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <div className="mt-4">
            <button
              onClick={() => setShowModal(true)}
              disabled={!selectedCompanies.length}
              className={`px-4 py-2 rounded text-white ${
                selectedCompanies.length
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Log New Communication
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
          <div className="bg-white rounded shadow p-6 w-full max-w-md relative">
            <h3 className="text-lg font-semibold mb-4">New Communication</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Type</label>
                <select
                  className="border p-2 w-full rounded"
                  value={newCommunication.type}
                  onChange={(e) =>
                    setNewCommunication({
                      ...newCommunication,
                      type: e.target.value,
                    })
                  }
                >
                  <option value="">Select</option>
                  <option value="LinkedIn Post">LinkedIn Post</option>
                  <option value="LinkedIn Message">LinkedIn Message</option>
                  <option value="Email">Email</option>
                  <option value="Phone Call">Phone Call</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Date</label>
                <input
                  type="date"
                  className="border p-2 w-full rounded"
                  value={newCommunication.date}
                  onChange={(e) =>
                    setNewCommunication({
                      ...newCommunication,
                      date: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block mb-1">Notes</label>
                <textarea
                  className="border p-2 w-full rounded"
                  rows="3"
                  value={newCommunication.notes}
                  onChange={(e) =>
                    setNewCommunication({
                      ...newCommunication,
                      notes: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={handlePerformCommunication}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Submit
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default User
