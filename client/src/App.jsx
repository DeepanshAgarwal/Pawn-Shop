import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
// import Profile from './pages/Profile';
import Sell from "./pages/Sell";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDescription from "./pages/ProductDescription";

const App = () => {
    const isLoggedIn = true; // temp, replace with actual auth state

    return (
        <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-gray-200 bg-gray-100 text-gray-800">
            <Navbar isLoggedIn={isLoggedIn} />

            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/login" element={<Login type="signup" />} />
                    <Route
                        path="/product/:id"
                        element={<ProductDescription />}
                    />
                    <Route path="/sell" element={<Sell />} />
                    {/* <Route path="/profile" element={<Profile />} /> */}
                </Routes>
            </main>

            <Footer />
        </div>
    );
};

export default App;
