// (auto-concat)
import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
// --- /src/screens/admin/ReservationApprovalScreen.js ---
const ReservationApprovalScreen = () => {
    const { showToast } = useAppContext();
    const [reservations, setReservations] = useState([
        { id: 1, user_name: 'Juan Residente (101-1502)', facility_name: 'Área de Barbacoa', start_time: '2025-08-15 18:00', status: 'Aprobada' },
        { id: 2, user_name: 'Ana Solicitante (102-303)', facility_name: 'Sala de Reuniones', start_time: '2025-08-16 10:00', status: 'Pendiente' },
        { id: 3, user_name: 'Carlos Vecino (103-101)', facility_name: 'Área de Barbacoa', start_time: '2025-08-16 18:00', status: 'Rechazada' },
        { id: 4, user_name: 'Diana Residente (104-505)', facility_name: 'Gimnasio', start_time: '2025-08-17 09:00', status: 'Cancelada' },
    ]);

    const handleStatusChange = (id, newStatus) => {
        setReservations(reservations.map(r => r.id === id ? { ...r, status: newStatus } : r));
        showToast(`La reserva ha sido marcada como ${newStatus.toLowerCase()}.`);
    };

    const statusText = { 'Aprobada': 'Aprobada', 'Pendiente': 'Pendiente', 'Rechazada': 'Rechazada', 'Cancelada': 'Cancelada' };
    const statusColor = { 'Aprobada': 'text-green-800 bg-green-100', 'Pendiente': 'text-yellow-800 bg-yellow-100', 'Rechazada': 'text-red-800 bg-red-100', 'Cancelada': 'text-gray-800 bg-gray-100' };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 text-gray-800">
            <h2 className="text-2xl font-bold text-sky-700 mb-6">Gestión de Aprobación de Reservas</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">Solicitante</th>
                            <th className="p-3">Instalación</th>
                            <th className="p-3">Fecha de Reserva</th>
                            <th className="p-3">Estado</th>
                            <th className="p-3 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(res => (
                            <tr key={res.id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-semibold">{res.user_name}</td>
                                <td className="p-3">{res.facility_name}</td>
                                <td className="p-3">{res.start_time}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${statusColor[res.status]}`}>
                                        {statusText[res.status]}
                                    </span>
                                </td>
                                <td className="p-3 text-center">
                                    {res.status === 'Pendiente' && (
                                        <div className="flex gap-2 justify-center">
                                            <button onClick={() => handleStatusChange(res.id, 'Aprobada')} className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Aprobar</button>
                                            <button onClick={() => handleStatusChange(res.id, 'Rechazada')} className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Rechazar</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default ReservationApprovalScreen;