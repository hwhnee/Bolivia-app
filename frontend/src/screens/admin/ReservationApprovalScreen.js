import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
// --- /src/screens/admin/ReservationApprovalScreen.js ---
const ReservationApprovalScreen = () => {
    const { showToast } = useAppContext();
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-sky-700">예약 승인</h2>
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">예약 승인 대기열</h3>
                <div className="space-y-3">
                    <div className="border p-3 rounded-md"><p className="font-semibold">바비큐장 예약 요청</p><p className="text-sm text-gray-500">요청자: 304호 김주민 / 시간: 8월 5일 18:00-21:00</p><div className="mt-2 flex space-x-2"><button onClick={() => showToast("예약을 승인했습니다.")} className="text-xs bg-green-500 text-white px-3 py-1 rounded">승인</button><button onClick={() => showToast("예약을 거부했습니다.")} className="text-xs bg-red-500 text-white px-3 py-1 rounded">거부</button></div></div>
                </div>
            </div>
        </div>
    );
};
export default ReservationApprovalScreen;
