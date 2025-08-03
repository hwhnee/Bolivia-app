import React from 'react';
import { AppProvider, useAppContext } from './contexts/AppContext';
// Layout Components
import Header from './components/layout/Header';
import SlideOutMenu from './components/layout/SlideOutMenu';
import Footer from './components/layout/Footer';
import Toast from './components/common/Toast';
// Screen Components
import AuthScreen from './screens/AuthScreen';
import PlaceholderScreen from './screens/PlaceholderScreen';
// Resident Screens
import ResidentDashboard from './screens/resident/ResidentDashboard';
import PaymentScreen from './screens/resident/PaymentScreen';
import ReservationScreen from './screens/resident/ReservationScreen';
import MaintenanceScreen from './screens/resident/MaintenanceScreen';
import VisitorScreen from './screens/resident/VisitorScreen';
import CommunityScreen from './screens/resident/CommunityScreen';
import ProfileScreen from './screens/resident/ProfileScreen';
// Admin Screens
import AdminDashboard from './screens/admin/AdminDashboard';
import ResidentManagementScreen from './screens/admin/ResidentManagementScreen';
import FinanceScreen from './screens/admin/FinanceScreen';
import TaskScreen from './screens/admin/TaskScreen';
import ReservationApprovalScreen from './screens/admin/ReservationApprovalScreen';
import CommunicationScreen from './screens/admin/CommunicationScreen';
// --- /src/App.js ---
// 메인 앱 컴포넌트가 화면 렌더링을 담당합니다.
const AppContent = () => {
    const { isLoggedIn, persona, activeView } = useAppContext();
    const renderContent = () => {
        if (!isLoggedIn && activeView !== 'intro') {
            return <AuthScreen />;
        }
        if (persona === 'resident') {
            switch (activeView) {
                case 'intro': return <PlaceholderScreen screenName="소개" />;
                case 'auth': return <AuthScreen />;
                case 'dashboard': return <ResidentDashboard />;
                case 'payment': return <PaymentScreen />;
                case 'reservation': return <ReservationScreen />;
                case 'maintenance': return <MaintenanceScreen />;
                case 'visitor': return <VisitorScreen />;
                case 'community': return <CommunityScreen />;
                case 'profile': return <ProfileScreen />;
                default: return <ResidentDashboard />;
            }
        } else { // admin
            switch (activeView) {
                case 'intro': return <PlaceholderScreen screenName="소개" />;
                case 'auth': return <AuthScreen />;
                case 'dashboard': return <AdminDashboard />;
                case 'resident_management': return <ResidentManagementScreen />;
                case 'finance': return <FinanceScreen />;
                case 'task': return <TaskScreen />;
                case 'reservation_approval': return <ReservationApprovalScreen />;
                case 'communication': return <CommunicationScreen />;
                default: return <AdminDashboard />;
            }
        }
    };
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
            <Header />
            <SlideOutMenu />
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="w-full">{renderContent()}</div>
            </main>
            <Toast />
            <Footer />
        </div>
    );
};
// --- /src/index.js ---
// 최종적으로 AppProvider가 AppContent를 감싸서 앱 전체에 상태를 제공합니다.
export default function App() {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
}
