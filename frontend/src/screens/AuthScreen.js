import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { CONSTANTS } from '../constants';
import PhoneMockup from '../components/common/PhoneMockup';
// --- /src/screens/AuthScreen.js ---
const AuthScreen = () => {
    const { handleLoginSuccess, persona } = useAppContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const userCredentials = CONSTANTS.USERS[persona];
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (email === userCredentials.email && password === userCredentials.password) {
            handleLoginSuccess(persona);
        } else {
            setError("이메일 또는 비밀번호가 올바르지 않습니다.");
        }
        setIsLoading(false);
    };
    return (
        <PhoneMockup>
            <form onSubmit={handleLogin} className="text-center space-y-6">
                <div className="text-4xl">🏠</div>
                <h3 className="text-2xl font-bold">Bolivia {persona === 'resident' ? '주민용' : '관리자용'}</h3>
                {error && <div className="p-3 bg-red-500/50 text-white rounded-lg">{error}</div>}
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={`이메일 (${userCredentials.email})`} className="w-full p-3 rounded bg-gray-600 placeholder-gray-400 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호 (password)" className="w-full p-3 rounded bg-gray-600 placeholder-gray-400 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                <button type="submit" disabled={isLoading} className="w-full p-3 rounded bg-teal-600 hover:bg-teal-700 font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading ? '로그인 중...' : '로그인'}
                </button>
            </form>
        </PhoneMockup>
    );
};
export default AuthScreen;
