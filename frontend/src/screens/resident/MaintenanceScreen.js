import React, { useState } from 'react';
import { callGeminiAPI } from '../../services/geminiApi';
import PhoneMockup from '../../components/common/PhoneMockup';
import HomeButton from '../../components/common/HomeButton';
// --- /src/screens/resident/MaintenanceScreen.js ---
const MaintenanceScreen = () => {
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState('');
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleDiagnose = async () => {
        if (!prompt) { setStatus('문제 상황을 입력해주세요.'); return; }
        setIsLoading(true);
        setStatus('✨ AI가 문제를 진단 중입니다...');
        setResult('');
        const fullPrompt = `사용자가 아파트에서 겪는 문제를 설명하고 있습니다: "${prompt}". 이 설명을 바탕으로, 다음 세 가지 항목을 포함하는 답변을 한국어로, 명확하게 섹션을 나누어 마크다운 형식으로 생성해주세요:\n\n1. **예상 원인:** 가장 가능성 있는 문제 원인을 간단히 추측해주세요.\n2. **주민 조치사항:** 주민이 즉시 취할 수 있는 안전 조치를 제안해주세요 (예: '메인 밸브를 잠그세요').\n3. **관리실 신고서 초안:** 관리실에 보낼 공식적인 '문제 신고' 내용을 '문제 유형'과 '상세 설명' 형식으로 작성해주세요. 문제 유형은 '배관', '전기', '구조', '기타' 중 하나로 분류해주세요.`;
        const apiResult = await callGeminiAPI(fullPrompt);
        const htmlResult = apiResult.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />');
        setResult(htmlResult);
        setStatus('진단이 완료되었습니다!');
        setIsLoading(false);
    };
    return (
        <PhoneMockup>
            <div className="relative space-y-4">
                <HomeButton />
                <h3 className="text-xl font-bold text-center">✨ AI 유지보수 진단</h3>
                <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="문제 상황을 자유롭게 설명해주세요." rows="4" className="w-full p-3 rounded bg-gray-600 placeholder-gray-400 text-white border border-gray-500" />
                <button onClick={handleDiagnose} disabled={isLoading} className="w-full p-3 rounded bg-gradient-to-r from-fuchsia-600 to-violet-500 hover:from-fuchsia-700 hover:to-violet-600 text-white font-bold transition-colors disabled:opacity-50">
                    {isLoading ? '진단 중...' : '✨ AI로 문제 진단 및 신고서 작성'}
                </button>
                <div className="text-sm text-center text-fuchsia-300 h-4">{status}</div>
                {result && <div className="bg-gray-800 p-3 rounded-lg text-sm space-y-2" dangerouslySetInnerHTML={{ __html: result }} />}
            </div>
        </PhoneMockup>
    );
};
export default MaintenanceScreen;
