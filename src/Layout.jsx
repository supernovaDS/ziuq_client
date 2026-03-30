import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "./index.css";

function Layout({ children, user, setUser }) {
    return (
        <>
            <Navbar user={user} setUser={setUser} />

            <div className="min-h-screen flex flex-col relative z-10 oracle-grid kinetic-grid">
                <div className="py-10 flex-1">
                    {children}
                </div>

                <ToastContainer
                    position="top-center"
                    theme="dark"
                    toastStyle={{
                        background: "#121212",
                        color: "#fff",
                        border: "1px solid rgba(168,85,247,0.3)"
                    }}
                    progressStyle={{
                        background: "#a855f7"
                    }}
                    style={{
                        zIndex: 20
                    }}
                    autoClose={2500}
                />
            </div>

            <Footer />
        </>
    );
}

export default Layout;