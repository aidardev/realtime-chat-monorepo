import AdminUsersPage from '@/pages/admin/AdminUsersPage';
import { LoginPage, RegisterPage } from '@/pages/auth';
import { DashboardLayout } from '@/pages/dashboard';
import { useAppSelector } from '@/shared/lib/hooks';
import { ChatEmpty, ChatWindow } from '@/widgets/chat-window';
import { Navigate, Outlet, Route, Routes } from 'react-router';

const PublicRoute = () => {
    const isAuth = useAppSelector((state) => state.session.isAuth);
    return !isAuth ? <Outlet /> : <Navigate to="/" replace />;
};

const PrivateRoute = () => {
    const isAuth = useAppSelector((state) => state.session.isAuth);
    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

const AdminRoute = () => {
    const user = useAppSelector((state) => state.session.user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!(user.role === 'ADMIN')) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export function AppRouter() {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>
            <Route element={<PrivateRoute />}>
                <Route path="/" element={<DashboardLayout />}>
                    <Route index element={<ChatEmpty />} />
                    <Route path="conversations/:conversationId" element={<ChatWindow />} />
                </Route>
            </Route>
            <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminUsersPage />} />
            </Route>
        </Routes>
    );
}
