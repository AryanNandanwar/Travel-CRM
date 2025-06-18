import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FollowUps = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState(null);
  const [followUps, setFollowUps] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const qRes = await axios.get(
        `http://localhost:8000/api/v1/client/get-query/${id}`
      );
      const fRes = await axios.get(
        `http://localhost:8000/api/v1/follow-up/${id}/get-followups`
      );

      setQuery(qRes.data.data);
      setFollowUps(fRes.data.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAddNote = async () => {
    const content = newNote.trim();
    if (!content) return;

    try {
      const payload = {
        content,
        status: 'Pending',
        type: 'Task',
        date: new Date().toISOString(),
      };
      const res = await axios.post(
        `http://localhost:8000/api/v1/follow-up/${id}/add-followups`,
        payload
      );
      setFollowUps((prev) => [...prev, res.data.data]);
      setNewNote('');
    } catch (err) {
      console.error('Failed to save follow-up:', err);
      setError('Could not save follow-up');
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') handleAddNote();
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-600">Loading follow‑ups…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-red-100 text-red-800 p-4 rounded shadow">
          <h2 className="font-bold mb-2">Error</h2>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-red-600">Query not found</p>
      </div>
    );
  }

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
          #{query._id} — {query.destination} trip
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
      <div
        className="bg-white rounded-lg shadow p-5 flex flex-col flex-1"
        style={{ minHeight: '300px' }}
      >
        <div className="flex-1 overflow-auto space-y-4 pb-4">
          {followUps.length > 0 ? (
            followUps.map((fu) => (
              <div
                key={fu._id}
                className={`border-l-4 p-3 rounded ${
                  fu.status === 'Completed'
                    ? 'border-green-500 bg-green-50'
                    : fu.status === 'Pending'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-500 bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="uppercase">{fu.status}</span>
                  <span>
                    {new Date(fu.date).toLocaleString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className="text-sm">
                  <strong>{fu.type}</strong> – {fu.content}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-10">
              No follow‑ups yet.
            </p>
          )}
        </div>

        {/* New Note Input */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Type a follow‑up and hit Enter…"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={onKeyDown}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>
      </div>
    </div>
  );
};

export default FollowUps;
