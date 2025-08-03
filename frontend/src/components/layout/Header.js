import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
// --- /src/components/layout/Header.js ---
const Header = () => {
    const { persona, handlePersonaChange, setIsMenuOpen } = useAppContext();
    return (
        <header className="bg-white shadow-md sticky top-0 z-20">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <button onClick={() => setIsMenuOpen(true)} className="p-2 text-gray-600 hover:text-gray-900">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
                <div className="flex space-x-2">
                    <button onClick={() => handlePersonaChange('resident')} className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${persona === 'resident' ? 'bg-teal-600 text-white' : 'bg-white text-gray-700'}`}>주민용 앱</button>
                    <button onClick={() => handlePersonaChange('admin')} className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${persona === 'admin' ? 'bg-teal-600 text-white' : 'bg-white text-gray-700'}`}>관리자용 앱</button>
                </div>
            </div>
        </header>
    );
};
export default Header;
