import React from 'react';
// --- /src/screens/admin/TaskScreen.js ---
const TaskScreen = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-4 text-sky-700">작업 및 유지보수 이슈 관리</h2>
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">미처리 이슈 목록</h3>
            <div className="space-y-3">
                <div className="border p-3 rounded-md"><p className="font-semibold">501호 누수 신고</p><p className="text-sm text-gray-500">접수: 1시간 전 / 상태: 신규</p><div className="mt-2 flex space-x-2"><button className="text-xs bg-sky-600 text-white px-2 py-1 rounded">담당자 배정</button></div></div>
                <div className="border p-3 rounded-md"><p className="font-semibold">공동현관 전등 교체 요청</p><p className="text-sm text-gray-500">접수: 1일 전 / 상태: 신규</p><div className="mt-2 flex space-x-2"><button className="text-xs bg-sky-600 text-white px-2 py-1 rounded">담당자 배정</button></div></div>
            </div>
        </div>
    </div>
);
export default TaskScreen;
