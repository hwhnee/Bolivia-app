import React from 'react';
// --- /src/screens/admin/ResidentManagementScreen.js ---
const ResidentManagementScreen = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-4 text-sky-700">주민 및 세대 관리</h2>
        <div className="bg-white p-4 rounded-lg shadow">
            <input type="text" placeholder="주민 이름 또는 동/호수 검색..." className="w-full p-2 border rounded-md mb-4" />
            <ul className="space-y-2">
                <li className="flex justify-between items-center p-2 border-b"><span>101동 101호 - 김주민</span><span className="text-green-600 font-semibold">완납</span></li>
                <li className="flex justify-between items-center p-2 border-b"><span>101동 102호 - 박관리</span><span className="text-red-600 font-semibold">미납</span></li>
                <li className="flex justify-between items-center p-2"><span>101동 201호 - 이주민</span><span className="text-green-600 font-semibold">완납</span></li>
            </ul>
        </div>
    </div>
);
export default ResidentManagementScreen;
