// (auto-concat)
import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
const UserManagementScreen = () => {
    const { showToast } = useAppContext();
    const [users, setUsers] = useState([
        {id: 1, displayName: 'Juan Residente', email: 'resident@example.com', aptCode: 'default', dong: '0000000101', ho: '0000001502', role: 'RESIDENT', status: 'ACTIVE'},
        {id: 2, displayName: 'Pedro Admin', email: 'admin@example.com', aptCode: 'management', dong: '0000000000', ho: '0000000000', role: 'ADMIN', status: 'ACTIVE'},
        {id: 3, displayName: 'Ana Solicitante', email: 'pending.user@example.com', aptCode: 'default', dong: '0000000102', ho: '0000000303', role: 'RESIDENT', status: 'PENDING'},
    ]);

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        displayName: '', email: '', aptCode: 'default', dong: '', ho: '', role: 'RESIDENT', status: 'PENDING'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData(user);
        setIsFormVisible(true);
        window.scrollTo(0, 0);
    };

    const handleDelete = (userId) => {
        if (window.confirm("¿Realmente desea eliminar este usuario?")) {
            setUsers(users.filter(user => user.id !== userId));
            showToast("El usuario ha sido eliminado.");
        }
    };

    const handleAddNew = () => {
        setEditingUser(null);
        setFormData({ displayName: '', email: '', aptCode: 'default', dong: '', ho: '', role: 'RESIDENT', status: 'PENDING' });
        setIsFormVisible(true);
        window.scrollTo(0, 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingUser) {
            setUsers(users.map(user => user.id === editingUser.id ? { ...user, ...formData } : user));
            showToast("La información del usuario ha sido actualizada.");
        } else {
            const newUser = { 
                ...formData, 
                id: Date.now(),
            };
            setUsers([newUser, ...users]);
            showToast("Se ha registrado un nuevo usuario.");
        }
        setIsFormVisible(false);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 text-gray-800">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-sky-700">Gestión de Usuarios</h2>
                {!isFormVisible && (
                    <button onClick={handleAddNew} className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors">
                        Nuevo Registro
                    </button>
                )}
            </div>

            {isFormVisible && (
                <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg mb-6 space-y-4 border border-gray-200">
                    <h3 className="text-lg font-semibold">{editingUser ? 'Editar Información de Usuario' : 'Registrar Nuevo Usuario'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="displayName" value={formData.displayName} onChange={handleInputChange} placeholder="Nombre (Ej: Juan Residente)" className="w-full p-2 border rounded" required />
                        <input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Correo Electrónico" className="w-full p-2 border rounded" required />
                        <input name="dong" value={formData.dong} onChange={handleInputChange} placeholder="Torre (Ej: 0000000101)" className="w-full p-2 border rounded" required />
                        <input name="ho" value={formData.ho} onChange={handleInputChange} placeholder="Apto (Ej: 0000001502)" className="w-full p-2 border rounded" required />
                        <select name="role" value={formData.role} onChange={handleInputChange} className="w-full p-2 border rounded bg-white">
                            <option value="RESIDENT">RESIDENT (Residente)</option>
                            <option value="ADMIN">ADMIN (Administrador)</option>
                        </select>
                        <select name="status" value={formData.status} onChange={handleInputChange} className="w-full p-2 border rounded bg-white">
                            <option value="PENDING">PENDING (Pendiente)</option>
                            <option value="ACTIVE">ACTIVE (Activo)</option>
                            <option value="LOCKED">LOCKED (Bloqueado)</option>
                        </select>
                    </div>
                    <div className="flex gap-2 pt-2">
                        <button type="submit" className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700">{editingUser ? 'Guardar Cambios' : 'Registrar'}</button>
                        <button type="button" onClick={() => setIsFormVisible(false)} className="w-full bg-gray-300 p-2 rounded hover:bg-gray-400">Cancelar</button>
                    </div>
                </form>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">Nombre</th>
                            <th className="p-3">ID de Sesión (autogenerado)</th>
                            <th className="p-3">Rol</th>
                            <th className="p-3">Estado</th>
                            <th className="p-3 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-semibold">{user.displayName}</td>
                                <td className="p-3 font-mono text-xs">{`${user.aptCode}-${user.dong}-${user.ho}`}</td>
                                <td className="p-3">{user.role}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                        user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                                        user.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="p-3 flex gap-4 justify-center">
                                    <button onClick={() => handleEdit(user)} className="text-blue-600 hover:underline">Editar</button>
                                    <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:underline">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default UserManagementScreen;