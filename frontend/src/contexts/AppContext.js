import React, { useState, createContext, useContext } from 'react';
import { CONSTANTS } from '../constants';
// --- /src/contexts/AppContext.js ---
// 전역 상태 관리를 위한 React Context를 생성합니다.
const AppContext = createContext(null);
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === null) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
export const AppProvider = ({ children }) => {
    const [persona, setPersona] = useState('resident');
    const [activeView, setActiveView] = useState('auth');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [toast, setToast] = useState({ message: '', isVisible: false });
    const showToast = (message) => {
        setToast({ message, isVisible: true });
        setTimeout(() => setToast({ message: '', isVisible: false }), 3000);
    };
    const navigateTo = (viewId) => {
        setActiveView(viewId);
        setIsMenuOpen(false);
    };
    const handlePersonaChange = (newPersona) => {
        setPersona(newPersona);
        setIsLoggedIn(false);
        setActiveView('auth');
    };
    const handleLoginSuccess = (loggedInPersona) => {
        if(loggedInPersona === persona) {
            setIsLoggedIn(true);
            setActiveView('dashboard');
        }
    };
    const handleLogout = () => {
        setIsLoggedIn(false);
        setActiveView('auth');
        showToast("로그아웃되었습니다.");
    };
    const value = {
        persona,
        activeView,
        isLoggedIn,
        isMenuOpen,
        contentData: CONSTANTS.CONTENT_DATA,
        toast,
        navigateTo,
        handlePersonaChange,
        handleLoginSuccess,
        handleLogout,
        showToast,
        setIsMenuOpen,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
