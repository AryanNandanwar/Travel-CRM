import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ROLE_OPTIONS = ['admin', 'user'];

export default function UserForm({ userId, initialData = {}, onSaved, onClose }) {
  const isEdit = Boolean(userId);
  const [form, setForm] = useState({
    fullName:     '',
    email:        '',
    ContactNo:    '',
    password:     '',
    role:         'user',
    ...initialData
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.patch(
          `http://localhost:8000/api/v1/admin/users/${userId}`,
          form,
          { withCredentials: true }
        );
      } else {
        await axios.post(
          'http://localhost:8000/api/v1/admin/register',
          form,
          { withCredentials: true }
        );
      }
      onSaved();
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        'Failed to save user'
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? 'Edit User' : 'Create User'}
        </h2>
        {error && (
          <div className="mb-4 text-red-600 text-sm">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Full Name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Contact No.</label>
            <input
              name="ContactNo"
              value={form.ContactNo}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
          {!isEdit && (
            <div>
              <label className="block text-sm">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            >
              {ROLE_OPTIONS.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {isEdit ? 'Save' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
