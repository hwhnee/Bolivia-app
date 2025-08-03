// --- /src/constants.js ---
// 실제 프로젝트에서는 이 부분을 별도의 파일로 분리하여 관리합니다.
export const CONSTANTS = {
    API_KEY: "",
    API_URL: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
    USERS: {
        resident: { email: "resident@bolivia.com", password: "password" },
        admin: { email: "admin@bolivia.com", password: "password" },
    },
    CONTENT_DATA: {
        resident: {
            title: "주민용 앱",
            nav: [
                { id: 'intro', name: '소개' },
                { id: 'auth', name: '인증 및 온보딩' },
                { id: 'dashboard', name: '홈 대시보드' },
                { id: 'payment', name: '결제 및 청구' },
                { id: 'reservation', name: '공용 공간 예약' },
                { id: 'maintenance', name: '유지보수' },
                { id: 'visitor', name: '방문자 초대' },
                { id: 'community', name: '커뮤니티' },
                { id: 'profile', name: '프로필 및 설정' },
            ],
        },
        admin: {
            title: "관리자용 앱",
            nav: [
                { id: 'intro', name: '소개' },
                { id: 'auth', name: '인증 및 온보딩' },
                { id: 'dashboard', name: '관리자 대시보드' },
                { id: 'resident_management', name: '주민 및 세대 관리' },
                { id: 'finance', name: '재무 관리 및 보고서' },
                { id: 'task', name: '작업 및 유지보수' },
                { id: 'reservation_approval', name: '예약 승인' },
                { id: 'communication', name: '✨ AI 공지사항 작성' },
            ],
        }
    }
};
