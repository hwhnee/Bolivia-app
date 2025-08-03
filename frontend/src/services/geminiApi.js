import { CONSTANTS } from '../constants';
// --- /src/services/geminiApi.js ---
// Gemini API 호출 로직을 별도의 서비스 함수로 분리합니다.
export const callGeminiAPI = async (prompt) => {
    const apiUrl = `${CONSTANTS.API_URL}?key=${CONSTANTS.API_KEY}`;
    const payload = { contents: [{ parts: [{ text: prompt }] }] };
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(`API responded with status: ${response.status}`);
        const data = await response.json();
        if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        }
        return "AI로부터 응답을 받지 못했습니다. 잠시 후 다시 시도해주세요.";
    } catch (error) {
        console.error("Gemini API call failed:", error);
        return "AI 호출 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.";
    }
};
