import { Outlet } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      {/* <footer>
        <span>Trybe - todos os direitos reservados</span>
      </footer> */}
      <Footer />
    </>
  );
}

export default Layout;
