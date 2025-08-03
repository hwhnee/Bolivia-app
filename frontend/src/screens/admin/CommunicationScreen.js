import React, { useState } from 'react';
import { callGeminiAPI } from '../../services/geminiApi';
// --- /src/screens/admin/CommunicationScreen.js ---
const CommunicationScreen = () => {
    const [prompt, setPrompt] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleGenerate = async () => {
        if (!prompt) { setStatus('공지사항 핵심 내용을 입력해주세요.'); return; }
        setIsLoading(true);
        setStatus('✨ AI가 공지사항을 작성 중입니다...');
        const fullPrompt = `다음 핵심 내용을 바탕으로 아파트 주민들을 위한 공식 공지사항을 한국어로 작성해줘. 어조는 정중하고 명확해야 해: "${prompt}". 제목, 목적, 일시, 주민 협조사항을 포함해줘.`;
        const result = await callGeminiAPI(fullPrompt);
        setContent(result);
        setStatus('작성이 완료되었습니다!');
        setIsLoading(false);
    };
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-sky-700">✨ AI 공지사항 작성</h2>
            <div className="space-y-4">
                <div><label htmlFor="announcement-prompt" className="font-semibold text-gray-700">공지사항 핵심 내용</label><input id="announcement-prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} type="text" placeholder="예: 8월 1일 엘리베이터 정기 점검" className="w-full mt-1 p-2 border rounded-md" /></div>
                <button onClick={handleGenerate} disabled={isLoading} className="w-full p-3 rounded bg-gradient-to-r from-fuchsia-600 to-violet-500 hover:from-fuchsia-700 hover:to-violet-600 text-white font-bold transition-colors disabled:opacity-50">{isLoading ? '작성 중...' : '✨ AI로 공지사항 초안 작성'}</button>
                <div className="text-sm text-center text-fuchsia-600 h-4">{status}</div>
                <div><label htmlFor="announcement-content" className="font-semibold text-gray-700">생성된 공지사항 초안</label><textarea id="announcement-content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="AI가 생성한 공지사항 내용이 여기에 표시됩니다." rows="8" className="w-full mt-1 p-2 border rounded-md bg-gray-50"></textarea></div>
                <button className="w-full p-3 rounded bg-sky-600 text-white hover:bg-sky-700 font-bold transition-colors">전체 주민에게 발송</button>
            </div>
        </div>
    );
};
export default CommunicationScreen;
