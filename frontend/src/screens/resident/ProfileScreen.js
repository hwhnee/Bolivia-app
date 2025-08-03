import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import PhoneMockup from '../../components/common/PhoneMockup';
import HomeButton from '../../components/common/HomeButton';
// --- /src/screens/resident/ProfileScreen.js ---
const ProfileScreen = () => {
    const { showToast, handleLogout } = useAppContext();
    const [pushNotif, setPushNotif] = useState(true);
    const [bioAuth, setBioAuth] = useState(false);
    const Toggle = ({ isOn, handleToggle, label }) => (
        <div onClick={() => { handleToggle(); showToast(`${label}이(가) ${!isOn ? '활성화' : '비활성화'}되었습니다.`); }} className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${isOn ? 'bg-teal-600 justify-end' : 'bg-gray-600 justify-start'}`}>
            <div className="w-4 h-4 bg-white rounded-full shadow-md" />
        </div>
    );
    return (
        <PhoneMockup>
            <div className="relative space-y-6">
                <HomeButton />
                <h3 className="text-xl font-bold text-center">설정</h3>
                <div className="flex justify-between items-center bg-gray-600 p-3 rounded-lg"><p>푸시 알림</p><Toggle isOn={pushNotif} handleToggle={() => setPushNotif(!pushNotif)} label="푸시 알림" /></div>
                <div className="flex justify-between items-center bg-gray-600 p-3 rounded-lg"><p>생체 인증 사용</p><Toggle isOn={bioAuth} handleToggle={() => setBioAuth(!bioAuth)} label="생체 인증" /></div>
                <button onClick={handleLogout} className="w-full mt-4 text-center text-red-400 hover:text-red-300 font-semibold">로그아웃</button>
            </div>
        </PhoneMockup>
    );
};
export default ProfileScreen;
