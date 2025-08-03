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
                    labels: ['납부 완료 (135 세대)', '미납 (15 세대)'],
                    datasets: [{ data: [135, 15], backgroundColor: ['#059669', '#dc2626'], borderColor: '#ffffff', borderWidth: 2 }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' }, title: { display: true, text: '수납률: 90%', font: { size: 16 } } } }
            });
        }
        return () => { if (chartInstance.current) chartInstance.current.destroy(); };
    }, []);
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-sky-700">재무 관리 및 보고서</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div><h3 className="text-lg font-semibold mb-2">2025년 7월 관리비 수납 현황</h3><p>전체 150세대 중 135세대가 납부를 완료하여 90%의 수납률을 보이고 있습니다.</p></div>
                <div className="relative h-64 md:h-80"><canvas ref={chartContainer}></canvas></div>
            </div>
        </div>
    );
};
export default FinanceScreen;
