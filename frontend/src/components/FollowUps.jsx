import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";

const STATUS_OPTIONS = ['Pending', 'Completed', 'Not Completed'];
const TYPE_OPTIONS   = ['Task', 'Call', 'Meeting'];



const FollowUps = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [query, setQuery]         = useState(null);
  const [followUps, setFollowUps] = useState([]);
  const [newNote, setNewNote]     = useState('');
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [newStatus, setNewStatus] = useState('Pending');
  const [newType, setNewType]     = useState('Task');

  // For edit modal
  const [editFU, setEditFU]       = useState(null); // the followUp being edited
  const [form, setForm]           = useState({ content: '', status: '', type: '', date: '' });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [{ data: qData }, { data: fData }] = await Promise.all([
        axios.get(`http://localhost:8000/api/v1/client/get-query/${id}`),
        axios.get(`http://localhost:8000/api/v1/follow-up/${id}/get-followups`)
      ]);
      setQuery(qData.data);
      setFollowUps(fData.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { loadData() }, [loadData]);

  // Add new
  const handleAddNote = async () => {
    const content = newNote.trim();
    if (!content) return;
    try {
      const payload = { content, status: newStatus, type: newType, date: new Date().toISOString() };
      const res = await axios.post(
        `http://localhost:8000/api/v1/follow-up/${id}/add-followups`,
        payload
      );
      setFollowUps(fu => [...fu, res.data.data]);
      setNewNote('');
      setNewStatus('Pending');
      setNewType('Task');
    } catch (err) {
      console.error('Add failed', err);
      setError('Could not save follow-up');
    }
  };

  // Delete
  const handleDelete = async (fuId) => {
    if (!window.confirm('Delete this follow‑up?')) return;
    try {
      await axios.delete(`http://localhost:8000/api/v1/follow-up/${fuId}/delete`);
      setFollowUps(fu => fu.filter(x => x._id !== fuId));
    } catch (err) {
      console.error('Delete failed', err);
      setError('Could not delete');
    }
  };

  // Open edit modal
  const openEdit = (fu) => {
    setEditFU(fu);
    setForm({
      content: fu.content,
      status:  fu.status,
      type:    fu.type,
      // strip time to fit input type="datetime-local"
      date:    new Date(fu.date).toISOString().slice(0,16)
    });
  };

  // Submit edit
  const handleUpdate = async () => {
    try {
      const payload = {
        content: form.content,
        status:  form.status,
        type:    form.type,
        date:    new Date(form.date).toISOString()
      };
      const res = await axios.put(
        `http://localhost:8000/api/v1/follow-up/${editFU._id}/update-followup`,
        payload
      );
      setFollowUps(fu =>
        fu.map(x => x._id === editFU._id ? res.data.data : x)
      );
      setEditFU(null);
    } catch (err) {
      console.error('Update failed', err);
      setError('Could not update');
    }
  };

  if (loading) return <p className="p-4">Loading…</p>;
  if (error)   return <p className="p-4 text-red-600">{error}</p>;
  if (!query) return <p className="p-4 text-red-600">Query not found</p>;

  return (
    <div className="flex-1 flex flex-col p-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-5 mb-6">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline"
          >
            ← Back
          </button>
          <span className="text-sm text-gray-500">
            {new Date(query.DateOfInquiry).toLocaleDateString()}
          </span>
        </div>
        <h1 className="text-2xl font-semibold mb-2">
          {query.client.fullName} — {query.destination} trip
        </h1>
        <div className="flex flex-wrap text-sm text-gray-700 gap-4">
          <div>Status: <strong>{query.status}</strong></div>
          <div>Adults: {query.NoOfAdults}</div>
          <div>Children: {query.NoOfChildren}</div>
          <div>Under 5: {query.NoOfChildrenBelowFive}</div>
          <div>Duration: {query.TripDuration}</div>
          <div>Route: {query.StartingPoint} ↔ {query.EndingPoint}</div>
          <div>Hotel: {query.PreferredHotelCategory}</div>
          <div>Budget: ₹{query.Budget}</div>
          <div>
            Travel Date:{' '}
            {new Date(query.TravelDate).toLocaleDateString()}
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <div><strong>Contact:</strong> {query.client.contactNo}</div>
          {query.client.email && (
            <div><strong>Email:</strong> {query.client.email}</div>
          )}
        </div>
      </div>

      {/* Follow‑ups List */}
      <div className="bg-white rounded-lg shadow p-5 flex flex-col flex-1" style={{ minHeight: '300px' }}>
        <div className="flex-1 overflow-auto space-y-4 pb-4">
          {followUps.length
            ? followUps.map(fu => (
                <div
                  key={fu._id}
                  className={`border-l-4 p-3 rounded flex justify-between items-start ${
                    fu.status === 'Completed'
                      ? 'border-green-500 bg-green-50'
                      : fu.status === 'Pending'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-500 bg-gray-50'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="uppercase">{fu.status}</span>
                      <span className="text-xs text-gray-600">
                        {new Date(fu.date).toLocaleString('en-GB', {
                          day: 'numeric', month: 'short', year: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="text-sm mb-2">
                      <strong>{fu.type}</strong> – {fu.content}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <PencilAltIcon
                      className="h-5 w-5 text-blue-600 hover:text-blue-800 cursor-pointer"
                      onClick={() => openEdit(fu)}
                    />
                    <TrashIcon
                      className="h-5 w-5 text-red-600 hover:text-red-800 cursor-pointer"
                      onClick={() => handleDelete(fu._id)}
                    />
                  </div>
                </div>
              ))
            : <p className="text-gray-500 text-center mt-10">No follow‑ups yet.</p>
          }
        </div>

        {/* New Note Input + status/type selectors */}
        <div className="mt-4 flex gap-2 items-center">
          <input
            type="text"
            placeholder="New follow‑up…"
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
          />

          <select
            value={newStatus}
            onChange={e => setNewStatus(e.target.value)}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring"
          >
            {['Pending', 'Completed', 'Not Completed'].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={newType}
            onChange={e => setNewType(e.target.value)}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring"
          >
            {['Task', 'Call', 'Meeting'].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <button
            onClick={handleAddNote}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editFU && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4">Edit Follow‑up</h2>

            <label className="block mb-2 text-sm">Content</label>
            <textarea
              rows="3"
              value={form.content}
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              className="w-full border rounded p-2 mb-4 focus:outline-none"
            />

            <div className="flex gap-2 mb-4">
              <div className="flex-1">
                <label className="block mb-1 text-sm">Status</label>
                <select
                  value={form.status}
                  onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                  className="w-full border rounded px-2 py-1 focus:outline-none"
                >
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex-1">
                <label className="block mb-1 text-sm">Type</label>
                <select
                  value={form.type}
                  onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                  className="w-full border rounded px-2 py-1 focus:outline-none"
                >
                  {TYPE_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <label className="block mb-2 text-sm">Date &amp; Time</label>
            <input
              type="datetime-local"
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              className="w-full border rounded px-2 py-1 mb-4 focus:outline-none"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditFU(null)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default FollowUps;
