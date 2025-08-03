import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { callGeminiAPI } from '../../services/geminiApi';
import PhoneMockup from '../../components/common/PhoneMockup';
import HomeButton from '../../components/common/HomeButton';
// --- /src/screens/resident/CommunityScreen.js ---
const CommunityScreen = () => {
    const { showToast } = useAppContext();
    const [prompt, setPrompt] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleGenerate = async () => {
        if (!prompt) { setStatus('게시물 주제를 입력해주세요.'); return; }
        setIsLoading(true);
        setStatus('✨ AI가 게시물을 작성 중입니다...');
        const fullPrompt = `친절하고 명확한 어조로 한국어 중고 장터 게시글 초안을 작성해줘. 사용자는 다음 항목을 팔고 싶어해: "${prompt}". 제목, 간단한 설명, 그리고 가격 및 상세 문의를 위해 연락달라는 내용을 포함해줘.`;
        const result = await callGeminiAPI(fullPrompt);
        setContent(result);
        setStatus('작성이 완료되었습니다!');
        setIsLoading(false);
    };
    const handlePost = () => {
        if (!content) {
            showToast("게시할 내용이 없습니다.");
            return;
        }
        showToast("게시글이 성공적으로 등록되었습니다.");
        setPrompt('');
        setContent('');
    };
    return (
        <PhoneMockup>
            <div className="relative space-y-4">
                <HomeButton />
                <h3 className="text-xl font-bold text-center">새 글 작성</h3>
                <input value={prompt} onChange={(e) => setPrompt(e.target.value)} type="text" placeholder="게시물 주제 또는 키워드 입력..." className="w-full p-3 rounded bg-gray-600 placeholder-gray-400 text-white border border-gray-500" />
                <button onClick={handleGenerate} disabled={isLoading} className="w-full p-3 rounded bg-gradient-to-r from-fuchsia-600 to-violet-500 hover:from-fuchsia-700 hover:to-violet-600 text-white font-bold transition-colors disabled:opacity-50">
                    {isLoading ? '작성 중...' : '✨ AI로 게시물 초안 작성'}
                </button>
                <div className="text-sm text-center text-fuchsia-300 h-4">{status}</div>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="AI가 생성한 게시물 내용이 여기에 표시됩니다." rows="6" className="w-full p-3 rounded bg-gray-800 border border-gray-500" />
                <button onClick={handlePost} className="w-full p-3 rounded bg-teal-600 hover:bg-teal-700 font-bold transition-colors">게시하기</button>
            </div>
        </PhoneMockup>
    );
};
export default CommunityScreen;
