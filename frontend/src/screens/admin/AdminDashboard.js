import React, { useState } from 'react';
import { callGeminiAPI } from '../../services/geminiApi';
import Modal from '../../components/common/Modal';
// --- /src/screens/admin/AdminDashboard.js ---
const AdminDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const handleOpenModal = async () => {
        setIsModalOpen(true);
        setModalContent('<p>AI가 오늘 처리해야 할 업무를 분석하고 있습니다...</p>');
        const taskList = "1. 501호 누수 신고 (1시간 전 접수) 2. 공동현관 전등 교체 요청 (1일 전 접수) 3. 304호 바비큐장 예약 승인 요청 (내일 저녁) 4. 월간 재무 보고서 작성 (마감일 3일 후)";
        const prompt = `다음은 오늘 처리해야 할 아파트 관리자 업무 및 주민 민원 목록입니다: "${taskList}". 이 목록을 분석하여, 1. 긴급성(누수, 안전 문제 등)과 중요도를 기준으로 처리 우선순위를 1순위부터 정렬하여 알려주세요. 2. 오늘 반드시 처리해야 할 가장 중요한 3가지 업무를 요약해서 알려주세요. 답변은 한국어로, 전문가적인 어조로, 마크다운 형식을 사용하여 작성해주세요.`;
        const result = await callGeminiAPI(prompt);
        const htmlResult = result.replace(/\*\*(.*?)\*\*/g, '<strong class="text-sky-800">$1</strong>').replace(/(\d\.)/g, '<br><strong class="text-gray-700">$1</strong>').replace(/(\d순위:)/g, '<br><strong class="text-gray-700">$1</strong>');
        setModalContent(htmlResult);
    };
    return (
        <>
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-4 text-sky-700">관리자 대시보드</h2>
                <p className="mb-6">핵심 지표를 한눈에 파악하고, ✨AI 업무 요약 기능으로 오늘 할 일의 우선순위를 정할 수 있습니다.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="bg-gray-50 p-4 rounded-lg shadow"><p className="text-3xl font-bold text-red-600">5</p><p className="text-gray-600 mt-1">미납 세대</p></div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow"><p className="text-3xl font-bold text-yellow-600">2</p><p className="text-gray-600 mt-1">미처리 유지보수</p></div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow"><p className="text-3xl font-bold text-blue-600">3</p><p className="text-gray-600 mt-1">오늘의 예약</p></div>
                </div>
                <div className="mt-8">
                    <button onClick={handleOpenModal} className="w-full p-3 rounded bg-gradient-to-r from-fuchsia-600 to-violet-500 text-white font-bold">✨ 오늘 업무 요약</button>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="✨ AI 업무 요약">
                <div dangerouslySetInnerHTML={{ __html: modalContent }} />
            </Modal>
        </>
    );
};
export default AdminDashboard;
