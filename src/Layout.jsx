import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "./index.css";

function Layout({ children, user, setUser }) {
    return (
        <>
            <Navbar user={user} setUser={setUser} />

            <div className="min-h-screen flex flex-col relative z-10 bg-black">
                <div className="py-10 flex-1">
                    {children}
                </div>

                <ToastContainer
                    position="bottom-left"
                    theme="dark"
                    toastStyle={{
                        background: "#111",
                        color: "#fff",
                        border: "1px solid rgba(37,99,235,0.3)"
                    }}
                    progressStyle={{
                        background: "#2563eb"
                    }}
                    style={{
                        zIndex: 60
                    }}
                    autoClose={2500}
                />
            </div>

            <Footer />
        </>
    );
}

export default Layout;