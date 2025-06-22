import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from '../components/forms/UsersForm';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';

export default function UsersPage() {
  const [users, setUsers]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  
  // NEW: explicit modal open flag
  const [isModalOpen, setModalOpen]     = useState(false);
  // holds the user object when editing, or null when creating
  const [editingUser, setEditingUser]   = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8000/api/v1/admin/users', { withCredentials: true });
      setUsers(res.data.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await axios.delete(`http://localhost:8000/api/v1/admin/users/${id}`, { withCredentials: true });
      setUsers(u => u.filter(x => x._id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete');
    }
  };

  // Open the form in "create" mode
  const openCreate = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  // Open the form in "edit" mode
  const openEdit = (user) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Users</h1>
        <button
          onClick={openCreate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create User
        </button>
      </div>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      {loading ? (
        <p>Loading…</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            {/* ... your table header ... */}
            <tbody>
              {users.map(u => (
                <tr key={u._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{u.fullName}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2">{u.ContactNo}</td>
                  <td className="px-4 py-2 capitalize">{u.role}</td>
                  <td className="px-4 py-2 flex space-x-2 justify-center">
                    <PencilAltIcon
                      className="h-5 w-5 text-blue-600 cursor-pointer"
                      onClick={() => openEdit(u)}
                    />
                    <TrashIcon
                      className="h-5 w-5 text-red-600 cursor-pointer"
                      onClick={() => handleDelete(u._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Only render the form when isModalOpen is true */}
      {isModalOpen && (
        <UserForm
          userId={editingUser?._id}
          initialData={editingUser || {}}
          onSaved={() => {
            closeModal();
            fetchUsers();
          }}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
