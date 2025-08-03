import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import PhoneMockup from '../../components/common/PhoneMockup';
import HomeButton from '../../components/common/HomeButton';
// --- /src/screens/resident/VisitorScreen.js ---
const VisitorScreen = () => {
    const { showToast } = useAppContext();
    const handleShare = () => {
        showToast("방문자 초대 링크가 복사되었습니다.");
    };
    return (
        <PhoneMockup>
            <div className="relative text-center">
                <HomeButton />
                <h3 className="text-xl font-bold">방문자 초대</h3>
                <div className="bg-white p-4 rounded-lg my-4"><img src="https://placehold.co/200x200/ffffff/000000?text=QR" alt="QR Code" className="mx-auto" /></div>
                <p className="font-semibold">초대 대상: 홍길동</p>
                <button onClick={handleShare} className="w-full mt-4 p-3 rounded bg-teal-600 hover:bg-teal-700 font-bold transition-colors">공유하기</button>
            </div>
        </PhoneMockup>
    );
};
export default VisitorScreen;
