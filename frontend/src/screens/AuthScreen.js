// (auto-concat)
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { CONSTANTS } from '../constants';
import PhoneMockup from '../components/common/PhoneMockup';
// --- /src/screens/AuthScreen.js ---
const AuthScreen = () => {
    const { handleLoginSuccess } = useAppContext();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const { resident, admin } = CONSTANTS.USERS;
        if (id === resident.email && password === resident.password) handleLoginSuccess('resident');
        else if (id === admin.email && password === admin.password) handleLoginSuccess('admin');
        else setError("El ID de usuario o la contraseña no son correctos.");
        setIsLoading(false);
    };

    return (
        <PhoneMockup theme="dark">
            <form onSubmit={handleLogin} className="text-center space-y-6">
                <div className="text-4xl">🏢</div>
                <h3 className="text-2xl font-bold">Bienvenido a Apt</h3>
                {error && <div className="p-3 bg-red-500/50 text-white rounded-lg">{error}</div>}
                <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="ID de usuario (resident o admin)" className="w-full p-3 rounded bg-gray-600 placeholder-gray-400 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña (1)" className="w-full p-3 rounded bg-gray-600 placeholder-gray-400 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                <button type="submit" disabled={isLoading} className="w-full p-3 rounded bg-teal-600 hover:bg-teal-700 font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>
            </form>
        </PhoneMockup>
    );
};
export default AuthScreen;