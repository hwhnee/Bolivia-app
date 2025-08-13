// (auto-concat)
import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
// --- /src/screens/admin/ResidentManagementScreen.js ---

const ResidentManagementScreen = () => {
    const { showToast } = useAppContext();
    const [bills, setBills] = useState([
        { id: 1, household_id: 1, household_name: 'Torre 101 Apto 1502', bill_month: '2025-08', total_amount: 150000, status: 'Pendiente', due_date: '2025-08-31', items: [{ item_name: 'Cuota de administración', amount: 100000 }, { item_name: 'Consumo de agua', amount: 30000 }] },
        { id: 2, household_id: 2, household_name: 'Torre 102 Apto 303', bill_month: '2025-08', total_amount: 145000, status: 'Pagado', due_date: '2025-08-31', items: [] },
        { id: 3, household_id: 1, household_name: 'Torre 101 Apto 1502', bill_month: '2025-07', total_amount: 148000, status: 'Pagado', due_date: '2025-07-31', items: [] },
    ]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingBill, setEditingBill] = useState(null);
    const [formData, setFormData] = useState({ household_name: '', bill_month: '', total_amount: '', status: 'Pendiente', due_date: '' });

    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleEdit = (bill) => { setEditingBill(bill); setFormData(bill); setIsFormVisible(true); };
    const handleDelete = (billId) => { if (window.confirm("¿Realmente desea eliminar esta factura?")) { setBills(bills.filter(b => b.id !== billId)); showToast("La factura ha sido eliminada."); } };
    const handleAddNew = () => { setEditingBill(null); setFormData({ household_name: '', bill_month: '2025-09', total_amount: '', status: 'Pendiente', due_date: '' }); setIsFormVisible(true); };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingBill) {
            setBills(bills.map(b => b.id === editingBill.id ? { ...b, ...formData } : b));
            showToast("La información de la factura ha sido actualizada.");
        } else {
            setBills([{ ...formData, id: Date.now(), items: [] }, ...bills]);
            showToast("Se ha registrado una nueva factura.");
        }
        setIsFormVisible(false);
    };

    const statusColor = { 'Pendiente': 'text-red-500', 'Pagado': 'text-green-500', 'Pago Parcial': 'text-yellow-500' };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 text-gray-800">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-sky-700">Gestión de Pagos Pendientes (Facturas)</h2>
                {!isFormVisible && <button onClick={handleAddNew} className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700">Registrar Nueva Factura</button>}
            </div>

            {isFormVisible && (
                <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg mb-6 space-y-3 border">
                    <h3 className="text-lg font-semibold">{editingBill ? 'Editar Factura' : 'Registrar Nueva Factura'}</h3>
                    <input name="household_name" value={formData.household_name} onChange={handleInputChange} placeholder="Unidad (Ej: Torre 101 Apto 1502)" className="w-full p-2 border rounded" required />
                    <input name="bill_month" value={formData.bill_month} onChange={handleInputChange} placeholder="Mes de Facturación (AAAA-MM)" className="w-full p-2 border rounded" required />
                    <input name="total_amount" type="number" value={formData.total_amount} onChange={handleInputChange} placeholder="Monto Total" className="w-full p-2 border rounded" required />
                    <input name="due_date" type="date" value={formData.due_date} onChange={handleInputChange} className="w-full p-2 border rounded" required />
                    <select name="status" value={formData.status} onChange={handleInputChange} className="w-full p-2 border rounded bg-white">
                        <option value="Pendiente">Pendiente</option><option value="Pagado">Pagado</option><option value="Pago Parcial">Pago Parcial</option>
                    </select>
                    <div className="flex gap-2 pt-2">
                        <button type="submit" className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700">{editingBill ? 'Guardar Cambios' : 'Registrar'}</button>
                        <button type="button" onClick={() => setIsFormVisible(false)} className="w-full bg-gray-300 p-2 rounded hover:bg-gray-400">Cancelar</button>
                    </div>
                </form>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100"><tr><th className="p-3">Unidad</th><th className="p-3">Mes</th><th className="p-3">Monto</th><th className="p-3">Estado</th><th className="p-3 text-center">Acciones</th></tr></thead>
                    <tbody>
                        {bills.map(bill => (
                            <tr key={bill.id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-semibold">{bill.household_name}</td>
                                <td className="p-3">{bill.bill_month}</td>
                                <td className="p-3">{Number(bill.total_amount).toLocaleString()} $</td>
                                <td className="p-3"><span className={`font-bold ${statusColor[bill.status]}`}>{bill.status}</span></td>
                                <td className="p-3 flex gap-4 justify-center">
                                    <button onClick={() => handleEdit(bill)} className="text-blue-600 hover:underline">Editar</button>
                                    <button onClick={() => handleDelete(bill.id)} className="text-red-600 hover:underline">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default ResidentManagementScreen;