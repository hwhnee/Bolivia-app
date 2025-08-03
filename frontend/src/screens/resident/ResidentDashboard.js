import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import PhoneMockup from '../../components/common/PhoneMockup';
// --- /src/screens/resident/ResidentDashboard.js ---
const ResidentDashboard = () => {
    const { navigateTo } = useAppContext();
    return (
        <PhoneMockup>
            <div className="flex justify-between items-center mb-4">
                <div><p className="text-gray-400">안녕하세요,</p><h3 className="text-xl font-bold">김주민님</h3></div>
                <div className="text-2xl">🔔</div>
            </div>
            <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-center"><p className="font-semibold">미납 관리비: ₩150,000</p></div>
            <div className="grid grid-cols-3 gap-2 text-center">
                <div onClick={() => navigateTo('payment')} className="bg-gray-600 p-3 rounded-lg cursor-pointer hover:bg-gray-500 transition-colors">💳<p className="mt-1 text-xs">결제 및 청구</p></div>
                <div onClick={() => navigateTo('reservation')} className="bg-gray-600 p-3 rounded-lg cursor-pointer hover:bg-gray-500 transition-colors">📅<p className="mt-1 text-xs">예약</p></div>
                <div onClick={() => navigateTo('maintenance')} className="bg-gray-600 p-3 rounded-lg cursor-pointer hover:bg-gray-500 transition-colors">🔧<p className="mt-1 text-xs">문제 신고</p></div>
                <div onClick={() => navigateTo('visitor')} className="bg-gray-600 p-3 rounded-lg cursor-pointer hover:bg-gray-500 transition-colors">👨‍👩‍👧‍👦<p className="mt-1 text-xs">방문자 초대</p></div>
                <div onClick={() => navigateTo('community')} className="bg-gray-600 p-3 rounded-lg cursor-pointer hover:bg-gray-500 transition-colors">��<p className="mt-1 text-xs">커뮤니티</p></div>
                <div onClick={() => navigateTo('profile')} className="bg-gray-600 p-3 rounded-lg cursor-pointer hover:bg-gray-500 transition-colors">👤<p className="mt-1 text-xs">프로필 설정</p></div>
            </div>
        </PhoneMockup>
    );
};
export default ResidentDashboard;
