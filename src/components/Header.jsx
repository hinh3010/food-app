import React, { useState } from "react";
import { MdAdd, MdLogout, MdHome, MdMenu, MdUsbOff, MdDesignServices, MdShoppingCart, MdSensors } from "react-icons/md";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";

import images from '../img/index'
import Avatar from "../img/avatar.png";

import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

    const [isMenu, setIsMenu] = useState(false);

    const login = async () => {
        if (!user) {
            // const res = await signInWithPopup(firebaseAuth, provider);
            // console.log(res);
            const { user: { accessToken, refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider);
            console.log(refreshToken);
            console.log(accessToken);
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0],
            });
            localStorage.setItem("user", JSON.stringify(providerData[0]));

            // console.log(process.env.REACT_APP_EMAIL_ADMIN)
        } else {
            setIsMenu(!isMenu);
        }
    };

    // if (isMenu) {
    //     setTimeout(() => setIsMenu(false), [10000])
    // }

    const navigate = useNavigate()
    const logout = () => {
        setIsMenu(false);
        localStorage.clear();
        navigate('/')
        dispatch({
            type: actionType.SET_USER,
            user: null,
        });
    };

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        });
    };


    return (
        <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
            {/* desktop */}
            <div className="hidden lg:flex w-full h-full items-center justify-between">
                {/* logo */}
                {/* <Link to={"/"} className="flex items-center gap-2">
                    <img src={Logo} className="w-8 object-cover" alt="logo" />
                    <p className="text-headingColor text-xl font-bold"> City</p>
                </Link> */}
                <Link to={"/"} className="flex items-center gap-2">
                    <img src={images.logoShopee} className="w-32 object-cover" alt="logo" />
                </Link>

                {/* menu nav */}
                <div className="flex items-center gap-8">
                    {/* nav item */}
                    <motion.ul
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 200 }}
                        className="flex items-center gap-12 "
                    >
                        <Link to={"/"} className="flex items-center text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            <MdHome size="30" className=" mr-1" />
                            Home
                        </Link>
                        <li className="flex items-center text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            <MdMenu size="30" className=" mr-1" />
                            Menu
                        </li>
                        <li className="flex items-center text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            <MdUsbOff size="30" className=" mr-1" />
                            About Us
                        </li>
                        <li className="flex items-center text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            <MdDesignServices size="30" className=" mr-1" />
                            Service
                        </li>
                    </motion.ul>

                    {/* icon cart */}
                    <div
                        className="relative flex items-center justify-center"
                        onClick={showCart}
                    >
                        <MdShoppingCart size="30" className="text-textColor cursor-pointer" />
                        {cartItems && cartItems.length > 0 && (
                            <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                                <p className="text-xs text-white font-semibold">
                                    {cartItems.length}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* avatar */}
                    <div className="relative">
                        <motion.img
                            whileTap={{ scale: 0.6 }}
                            src={user ? user.photoURL : Avatar}
                            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                            alt="userprofile"
                            onClick={login}
                        />
                        {/* dropdown */}
                        {isMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className="w-40 overflow-hidden bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
                            >
                                {/* create product */}
                                {user && user.email === "hinh210288@hnet.edu.vn" && (
                                    <>
                                        <Link to={"/createItem"}>
                                            <p
                                                className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                                                onClick={() => setIsMenu(false)}
                                            >
                                                <MdAdd /> New Item
                                            </p>
                                        </Link>
                                        <hr />
                                    </>
                                )}

                                {/* logout */}
                                <p
                                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                                    onClick={logout}
                                >
                                    <MdLogout /> Logout
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* mobile & tablet */}
            <div className="flex items-center justify-between lg:hidden w-full h-full ">
                {/* icon cart */}
                <div
                    className="relative flex items-center justify-center"
                    onClick={showCart}
                >
                    <MdShoppingCart size="30" className="text-textColor text-2xl  cursor-pointer" />
                    {cartItems && cartItems.length > 0 && (
                        <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                            <p className="text-xs text-white font-semibold">
                                {cartItems.length}
                            </p>
                        </div>
                    )}
                </div>

                {/* logo */}
                {/* <Link to={"/"} className="flex items-center gap-2">
                    <img src={Logo} className="w-8 object-cover" alt="logo" />
                    <p className="text-headingColor text-xl font-bold"> City</p>
                </Link> */}
                <Link to={"/"} className="flex items-center gap-2">
                    <img src={images.logoShopee} className="w-32 object-cover" alt="logo" />
                </Link>

                {/* avatar */}
                <div className="relative">
                    <motion.img
                        whileTap={{ scale: 0.6 }}
                        src={user ? user.photoURL : Avatar}
                        className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                        alt="userprofile"
                        onClick={login}
                    />
                    {/* dropdown + menu nav */}
                    {isMenu && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            className="overflow-hidden w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
                        >
                            {/* create product */}
                            {user && user.email === "hinh210288@hnet.edu.vn" && (
                                <>
                                    <Link to={"/createItem"}>
                                        <p
                                            onClick={() => setIsMenu(false)}
                                            className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                                        >
                                            <MdAdd size="20" />New Item
                                        </p>
                                    </Link>
                                    <hr />
                                </>
                            )}

                            {/* menu nav */}
                            <ul className="flex flex-col ">
                                <Link to={"/"}
                                    className="flex items-center border-b-2 text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                                    onClick={() => setIsMenu(false)}
                                >
                                    <MdHome size="20" className="mr-3" /> Home
                                </Link>
                                <li
                                    className="flex items-center border-b-2 text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                                    onClick={() => setIsMenu(false)}
                                >
                                    <MdMenu size="20" className="mr-3" />Menu
                                </li>
                                <li
                                    className="flex items-center border-b-2 text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                                    onClick={() => setIsMenu(false)}
                                >
                                    <MdUsbOff size="20" className="mr-3" />About Us
                                </li>
                                <li
                                    className="flex items-center border-b-2 text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                                    onClick={() => setIsMenu(false)}
                                >
                                    <MdSensors size="20" className="mr-3" />Service
                                </li>
                            </ul>

                            {/* logout */}
                            <p
                                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
                                onClick={logout}
                            >
                                Logout <MdLogout />
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
