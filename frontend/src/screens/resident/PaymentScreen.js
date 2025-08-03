import React, { useState } from 'react';
import PhoneMockup from '../../components/common/PhoneMockup';
import Modal from '../../components/common/Modal';
import HomeButton from '../../components/common/HomeButton';
// --- /src/screens/resident/PaymentScreen.js ---
const PaymentScreen = () => {
    const [isQrModalOpen, setIsQrModalOpen] = useState(false);
    return (
        <>
            <PhoneMockup>
                <div className="relative h-full flex flex-col">
                    <HomeButton />
                    <h3 className="text-xl font-bold text-center mb-4">결제 및 청구</h3>
                    <div className="bg-gray-600 p-4 rounded-lg flex-grow">
                        <p className="text-gray-400 text-sm">총 미납 요금</p><p className="text-3xl font-bold">₩150,000</p>
                    </div>
                    <button onClick={() => setIsQrModalOpen(true)} className="w-full mt-4 p-3 rounded bg-teal-600 hover:bg-teal-700 font-bold transition-colors">QR코드로 결제</button>
                </div>
            </PhoneMockup>
            <Modal isOpen={isQrModalOpen} onClose={() => setIsQrModalOpen(false)} title="QR코드 결제">
                <p className="text-center">결제 QR코드를 스캔하여 관리비를 납부하세요.</p>
                <img src="https://placehold.co/300x300/ffffff/000000?text=결제용+QR코드" alt="Payment QR Code" className="mx-auto mt-4 rounded-lg" />
            </Modal>
        </>
    );
};
export default PaymentScreen;
