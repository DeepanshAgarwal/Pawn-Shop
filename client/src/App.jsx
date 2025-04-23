import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Sell from "./pages/Sell";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDescription from "./pages/ProductDescription";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    return (
        <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-gray-200 bg-gray-100 text-gray-800">
            <Navbar />

            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/product/:id"
                        element={<ProductDescription />}
                    />
                    <Route
                        path="/sell"
                        element={
                            <ProtectedRoute>
                                <Sell />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>

            <Footer />
            <ToastContainer />
        </div>
    );
};

export default App;
