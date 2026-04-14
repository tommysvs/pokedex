import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';
export const Layout = () => {
    return (
        <div className="relative isolate flex min-h-screen flex-col overflow-x-hidden bg-slate-50">
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-32 left-[-8rem] h-[32rem] w-[32rem] rounded-full bg-blue-300/26 blur-3xl" />
                <div className="absolute top-24 right-[-10rem] h-[38rem] w-[38rem] rounded-full bg-slate-400/24 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/16 blur-3xl" />
            </div>
            <Header />
            <main className="relative z-10 flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;