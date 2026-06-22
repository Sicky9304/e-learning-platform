import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { Toaster } from 'react-hot-toast';

const AppLayout = () => {
  const shouldHideFooter =
    location.pathname === '/profile' || location.pathname.startsWith('/dashboard');

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      {!shouldHideFooter && <Footer />}
      <Toaster position="top-right" />
    </>
  );
};

export default AppLayout;
