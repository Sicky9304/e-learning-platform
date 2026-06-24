import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { Toaster } from 'react-hot-toast';
import ScrollToTopButton from '../components/home/ScrollToTopButton';
import ChatBoat from './../components/chatboat/ChatBoat';

const AppLayout = () => {
  const location = useLocation();

  // Footer hide routes
  const hideFooterRoutes = [
    '/profile',
    '/dashboard',
    '/admin',
    '/my-courses',
    '/learn'
  ];

  const shouldHideFooter = hideFooterRoutes.some(
    (route) =>
      location.pathname === route ||
      location.pathname.startsWith(`${route}/`)
  );

  return (
    <>
      <Header />

      <main className="pt-16">
        <Outlet />
      </main>

      {!shouldHideFooter && <Footer />}

      <Toaster position="top-right" />

      <ScrollToTopButton />
      <ChatBoat/>
    </>
  );
};

export default AppLayout;
