import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "./index.css";

function Layout({ children, token, setToken }) {
  return (
    <>
      <Navbar token={token} setToken={setToken} />

      <div className="pt-20 min-h-screen flex flex-col relative z-10 oracle-grid kinetic-grid">
        <div className="flex-1">
          {children}
        </div>

        <ToastContainer
          position="top-right"
          theme="dark"
          toastStyle={{
            background: "#121212",
            color: "#fff",
            border: "1px solid rgba(168,85,247,0.3)"
          }}
          progressStyle={{
            background: "#a855f7"
          }}
        />
      </div>

      <Footer />
    </>
  );
}

export default Layout;