// (auto-concat)
import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import PhoneMockup from '../../components/common/PhoneMockup';
import HomeButton from '../../components/common/HomeButton';
import Modal from '../../components/common/Modal';
// --- /src/screens/resident/ReservationScreen.js ---
const ReservationScreen = () => {
    const { showToast } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [reservations, setReservations] = useState([
        { id: 1, facility_id: 1, facility_name: 'Área de Barbacoa', start_time: '2025-08-15 18:00', end_time: '20:00', status: 'Aprobada' },
        { id: 2, facility_id: 3, facility_name: 'Sala de Reuniones', start_time: '2025-08-16 10:00', end_time: '11:00', status: 'Pendiente' },
    ]);

    const facilities = [
        { id: 1, name: 'Área de Barbacoa', description: 'Instalación al aire libre para barbacoas, con capacidad para 10 personas.' },
        { id: 2, name: 'Gimnasio', description: 'Espacio de entrenamiento con equipos modernos.' },
        { id: 3, name: 'Sala de Reuniones', description: 'Espacio para reuniones de hasta 8 personas, equipado con proyector.' },
    ];
    
    const handleReserveClick = (facility) => {
        setSelectedFacility(facility);
        setIsModalOpen(true);
    };

    const handleConfirmReservation = () => {
        const newReservation = {
            id: Date.now(),
            facility_id: selectedFacility.id,
            facility_name: selectedFacility.name,
            start_time: '2025-08-20 14:00', // This would come from form inputs
            end_time: '16:00',
            status: 'Pendiente'
        };
        setReservations(prev => [newReservation, ...prev]);
        setIsModalOpen(false);
        showToast(`La solicitud de reserva para ${selectedFacility.name} ha sido enviada.`);
    };
    
    const handleCancelReservation = (reservationId) => {
        setReservations(prev => prev.map(r => r.id === reservationId ? {...r, status: 'Cancelada'} : r));
        showToast("La reserva ha sido cancelada.");
    };

    const statusColor = { 'Aprobada': 'text-green-500', 'Pendiente': 'text-yellow-500', 'Rechazada': 'text-red-500', 'Cancelada': 'text-gray-500' };

    return (
        <>
            <PhoneMockup theme="light">
                <div className="relative h-[650px] flex flex-col">
                    <HomeButton />
                    <h3 className="text-xl font-bold text-center mb-4 flex-shrink-0">Reserva de Áreas Comunes</h3>
                    <div className="flex-grow overflow-y-auto space-y-4">
                        <div>
                            <h4 className="font-semibold mb-2">Instalaciones Disponibles</h4>
                            <div className="space-y-2">
                                {facilities.map(f => (
                                    <div key={f.id} className="bg-white p-3 rounded-lg shadow">
                                        <p className="font-bold">{f.name}</p>
                                        <p className="text-xs text-gray-500 mt-1">{f.description}</p>
                                        <button onClick={() => handleReserveClick(f)} className="w-full mt-2 text-sm p-2 rounded bg-teal-600 text-white hover:bg-teal-700">Reservar</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Mis Reservas</h4>
                            <div className="space-y-2">
                                {reservations.map(r => (
                                    <div key={r.id} className="bg-white p-3 rounded-lg shadow">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-bold">{r.facility_name}</p>
                                                <p className="text-xs text-gray-500">{r.start_time} ~ {r.end_time}</p>
                                            </div>
                                            <p className={`text-xs font-bold ${statusColor[r.status]}`}>{r.status}</p>
                                        </div>
                                        {(r.status === 'Pendiente' || r.status === 'Aprobada') && (
                                            <button onClick={() => handleCancelReservation(r.id)} className="w-full mt-2 text-xs p-1 rounded bg-red-500 text-white hover:bg-red-600">Cancelar Reserva</button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </PhoneMockup>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Reservar ${selectedFacility?.name}`}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Seleccionar Fecha</label>
                        <input type="date" className="w-full p-2 border rounded mt-1" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Seleccionar Hora</label>
                        <select className="w-full p-2 border rounded mt-1">
                            <option>10:00 - 12:00</option>
                            <option>14:00 - 16:00</option>
                            <option>18:00 - 20:00</option>
                        </select>
                    </div>
                    <button onClick={handleConfirmReservation} className="w-full p-2 rounded bg-teal-600 text-white hover:bg-teal-700">Solicitar Reserva</button>
                </div>
            </Modal>
        </>
    );
};
export default ReservationScreen;