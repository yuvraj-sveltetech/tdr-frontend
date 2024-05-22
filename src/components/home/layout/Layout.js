import { Header, Sidebar } from "../../utils/index";
import { useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();
  const pathname = ["/not-found"];

  return (
    <>
      {pathname.includes(location.pathname) ? (
        <main>{children}</main>
      ) : (
        <div className="position-realtive">
          <div className="dashboard container-fluid">
            <div className="row ">
              <Sidebar />
              <div className="dashpage col-md-10">
                <Header />
                <main>{children}</main>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Layout;
