import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
// import Signup from './pages/Signup';
// import Profile from './pages/Profile';
// import Listed from './pages/Listed';
// import ListProduct from './pages/ListProduct';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
                    {/* <Route path="/signup" element={<Signup />} /> */}
                    {/* <Route path="/profile" element={<Profile />} /> */}
                    {/* <Route path="/listed" element={<Listed />} /> */}
                    {/* <Route path="/list-product" element={<ListProduct />} /> */}
                </Routes>
            </main>

            <Footer />
        </div>
    );
};

export default App;
