// (auto-concat)
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
// --- /src/screens/admin/FinanceScreen.js ---
const FinanceScreen = () => {
    const chartContainer = useRef(null);
    const chartInstance = useRef(null);
    useEffect(() => {
        if (chartContainer.current) {
            if (chartInstance.current) chartInstance.current.destroy();
            const ctx = chartContainer.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Pagado (135 Unidades)', 'Pendiente (15 Unidades)'],
                    datasets: [{ data: [135, 15], backgroundColor: ['#059669', '#dc2626'], borderColor: '#ffffff', borderWidth: 2 }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' }, title: { display: true, text: 'Tasa de Cobranza: 90%', font: { size: 16 } } } }
            });
        }
        return () => { if (chartInstance.current) chartInstance.current.destroy(); };
    }, []);
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-sky-700">Finanzas e Informes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div><h3 className="text-lg font-semibold mb-2">Estado de Cobranza de Cuotas de Julio 2025</h3><p>De un total de 150 unidades, 135 han completado el pago, resultando en una tasa de cobranza del 90%.</p></div>
                <div className="relative h-64 md:h-80"><canvas ref={chartContainer}></canvas></div>
            </div>
        </div>
    );
};
export default FinanceScreen;