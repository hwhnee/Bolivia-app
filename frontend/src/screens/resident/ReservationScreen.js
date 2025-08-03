import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import PhoneMockup from '../../components/common/PhoneMockup';
import HomeButton from '../../components/common/HomeButton';
// --- /src/screens/resident/ReservationScreen.js ---
const ReservationScreen = () => {
    const { showToast } = useAppContext();
    const handleReserve = (facility) => {
        showToast(`${facility} 예약이 완료되었습니다.`);
    };
    return (
        <PhoneMockup>
            <div className="relative">
                <HomeButton />
                <h3 className="text-xl font-bold text-center">시설 예약</h3>
                <div className="space-y-3 mt-4">
                    <div className="bg-gray-600 p-3 rounded-lg flex items-center justify-between"><div>🍖 바비큐장</div><button onClick={() => handleReserve('바비큐장')} className="text-xs bg-teal-600 px-3 py-1 rounded hover:bg-teal-700">예약</button></div>
                    <div className="bg-gray-600 p-3 rounded-lg flex items-center justify-between"><div>🏋️ 체육관</div><button onClick={() => handleReserve('체육관')} className="text-xs bg-teal-600 px-3 py-1 rounded hover:bg-teal-700">예약</button></div>
                    <div className="bg-gray-600 p-3 rounded-lg flex items-center justify-between"><div>👥 회의실</div><button onClick={() => handleReserve('회의실')} className="text-xs bg-teal-600 px-3 py-1 rounded hover:bg-teal-700">예약</button></div>
                </div>
                <div className="mt-6">
                    <h4 className="font-semibold mb-2">나의 예약 내역</h4>
                    <div className="bg-gray-800 p-3 rounded-lg text-sm"><p><strong>바비큐장</strong> - 2025년 7월 28일 18:00 ~ 20:00</p></div>
                </div>
            </div>
        </PhoneMockup>
    );
};
export default ReservationScreen;
