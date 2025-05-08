import React from "react";

const Footer = () => {
    return (
        <footer className="w-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10 mt-10 border-t border-gray-300 dark:border-gray-800 shadow-inner">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
                {/* About Section */}
                <div className="md:col-span-2">
                    <h3 className="text-lg font-bold mb-4">About PawnShop</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        PawnShop is your trusted platform for buying and selling
                        pre-owned items. We connect buyers and sellers in a
                        secure and user-friendly environment.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                        <li>
                            <a
                                href="/products"
                                className="hover:text-blue-600 dark:hover:text-gray-200 transition-all duration-300"
                            >
                                Products
                            </a>
                        </li>
                        <li>
                            <a
                                href="/profile"
                                className="hover:text-blue-600 dark:hover:text-gray-200 transition-all duration-300"
                            >
                                My Profile
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div>
                    <h3 className="text-lg font-bold mb-4">Contact</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Email 1:</span>{" "}
                        <a
                            href="mailto:support@pawnshop.com"
                            className="hover:text-blue-600 dark:hover:text-gray-200 transition-all duration-300 whitespace-nowrap"
                        >
                            f20230353@pilani.bits-pilani.ac.in
                        </a>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Email 2:</span>{" "}
                        <a
                            href="mailto:info@pawnshop.com"
                            className="hover:text-blue-600 dark:hover:text-gray-200 transition-all duration-300 whitespace-nowrap"
                        >
                            deepansh.agarwal.2234@gmail.com
                        </a>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Phone:</span>{" "}
                        <a
                            href="tel:+1234567890"
                            className="hover:text-blue-600 dark:hover:text-gray-200 transition-all duration-300 whitespace-nowrap"
                        >
                            +91 7302706320
                        </a>
                    </p>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-10 border-t border-gray-300 dark:border-gray-800 pt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    © {new Date().getFullYear()} PawnShop. All rights reserved.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Developed and maintained by{" "}
                    <span className="font-bold">Deepansh Agarwal</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
