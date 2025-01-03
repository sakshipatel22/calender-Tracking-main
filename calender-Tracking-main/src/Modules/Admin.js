import React, { useState } from 'react'

// Mock data to simulate DB
const initialCompanies = [
  {
    id: 1,
    name: 'Example Company',
    location: 'New York',
    linkedIn: 'https://linkedin.com/company/example',
    emails: ['contact@example.com'],
    phoneNumbers: ['+1-555-1234'],
    comments: 'Preferred contact via email.',
    periodicity: '2 weeks',
  },
]

const initialMethods = [
  {
    id: 1,
    name: 'LinkedIn Post',
    description: 'Post on LinkedIn about them',
    sequence: 1,
    mandatory: true,
  },
  {
    id: 2,
    name: 'LinkedIn Message',
    description: 'Send direct message on LinkedIn',
    sequence: 2,
    mandatory: true,
  },
  {
    id: 3,
    name: 'Email',
    description: 'Send Email',
    sequence: 3,
    mandatory: true,
  },
  {
    id: 4,
    name: 'Phone Call',
    description: 'Call the company or representative',
    sequence: 4,
    mandatory: false,
  },
  {
    id: 5,
    name: 'Other',
    description: 'Any other communication method',
    sequence: 5,
    mandatory: false,
  },
]

function Admin() {
  const [companies, setCompanies] = useState(initialCompanies)
  const [methods, setMethods] = useState(initialMethods)

  // Company form
  const [newCompany, setNewCompany] = useState({
    name: '',
    location: '',
    linkedIn: '',
    emails: '',
    phoneNumbers: '',
    comments: '',
    periodicity: '',
  })

  const handleAddCompany = () => {
    setCompanies((prev) => [
      ...prev,
      {
        ...newCompany,
        id: Date.now(),
        emails: newCompany.emails.split(','),
        phoneNumbers: newCompany.phoneNumbers.split(','),
      },
    ])
    setNewCompany({
      name: '',
      location: '',
      linkedIn: '',
      emails: '',
      phoneNumbers: '',
      comments: '',
      periodicity: '',
    })
  }

  const handleDeleteCompany = (id) => {
    setCompanies((prev) => prev.filter((c) => c.id !== id))
  }

  // Method form
  const [newMethod, setNewMethod] = useState({
    name: '',
    description: '',
    sequence: '',
    mandatory: false,
  })

  const handleAddMethod = () => {
    setMethods((prev) => [
      ...prev,
      { ...newMethod, id: Date.now(), sequence: Number(newMethod.sequence) },
    ])
    setNewMethod({
      name: '',
      description: '',
      sequence: '',
      mandatory: false,
    })
  }

  const handleDeleteMethod = (id) => {
    setMethods((prev) => prev.filter((m) => m.id !== id))
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold mb-4">Company Management</h2>
        <div className="bg-white p-4 rounded-md shadow space-y-4 max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            <input
              className="border p-2 rounded"
              placeholder="Name"
              value={newCompany.name}
              onChange={(e) =>
                setNewCompany({ ...newCompany, name: e.target.value })
              }
            />
            <input
              className="border p-2 rounded"
              placeholder="Location"
              value={newCompany.location}
              onChange={(e) =>
                setNewCompany({ ...newCompany, location: e.target.value })
              }
            />
            <input
              className="border p-2 rounded col-span-2"
              placeholder="LinkedIn URL"
              value={newCompany.linkedIn}
              onChange={(e) =>
                setNewCompany({ ...newCompany, linkedIn: e.target.value })
              }
            />
            <input
              className="border p-2 rounded col-span-2"
              placeholder="Emails (comma-separated)"
              value={newCompany.emails}
              onChange={(e) =>
                setNewCompany({ ...newCompany, emails: e.target.value })
              }
            />
            <input
              className="border p-2 rounded col-span-2"
              placeholder="Phone Numbers (comma-separated)"
              value={newCompany.phoneNumbers}
              onChange={(e) =>
                setNewCompany({
                  ...newCompany,
                  phoneNumbers: e.target.value,
                })
              }
            />
            <input
              className="border p-2 rounded col-span-2"
              placeholder="Comments"
              value={newCompany.comments}
              onChange={(e) =>
                setNewCompany({ ...newCompany, comments: e.target.value })
              }
            />
            <input
              className="border p-2 rounded col-span-2"
              placeholder="Periodicity (e.g., '2 weeks')"
              value={newCompany.periodicity}
              onChange={(e) =>
                setNewCompany({
                  ...newCompany,
                  periodicity: e.target.value,
                })
              }
            />
          </div>
          <button
            onClick={handleAddCompany}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Add Company
          </button>
        </div>

        <ul className="mt-4 space-y-2">
          {companies.map((c) => (
            <li
              key={c.id}
              className="bg-white p-4 rounded shadow flex items-center justify-between"
            >
              <div>
                <strong>{c.name}</strong> — {c.location} (
                {c.periodicity || 'N/A'})
                <div className="text-gray-500 text-sm">
                  {c.emails.join(', ')} | {c.phoneNumbers.join(', ')}
                </div>
              </div>
              <button
                onClick={() => handleDeleteCompany(c.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">
          Communication Method Management
        </h2>
        <div className="bg-white p-4 rounded-md shadow space-y-4 max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            <input
              className="border p-2 rounded"
              placeholder="Method Name"
              value={newMethod.name}
              onChange={(e) =>
                setNewMethod({ ...newMethod, name: e.target.value })
              }
            />
            <input
              className="border p-2 rounded"
              placeholder="Sequence"
              type="number"
              value={newMethod.sequence}
              onChange={(e) =>
                setNewMethod({ ...newMethod, sequence: e.target.value })
              }
            />
            <input
              className="border p-2 rounded col-span-2"
              placeholder="Description"
              value={newMethod.description}
              onChange={(e) =>
                setNewMethod({ ...newMethod, description: e.target.value })
              }
            />
            <label className="flex items-center space-x-2 col-span-2">
              <input
                type="checkbox"
                checked={newMethod.mandatory}
                onChange={(e) =>
                  setNewMethod({ ...newMethod, mandatory: e.target.checked })
                }
              />
              <span>Mandatory</span>
            </label>
          </div>
          <button
            onClick={handleAddMethod}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Add Method
          </button>
        </div>

        <ul className="mt-4 space-y-2">
          {methods
            .sort((a, b) => a.sequence - b.sequence)
            .map((m) => (
              <li
                key={m.id}
                className="bg-white p-4 rounded shadow flex items-center justify-between"
              >
                <div>
                  <strong>{m.sequence}. {m.name}</strong> – {m.description}{' '}
                  {m.mandatory && (
                    <span className="ml-2 px-2 py-1 bg-red-100 text-red-500 text-sm rounded">
                      Mandatory
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteMethod(m.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </section>
    </div>
  )
}

export default Admin
