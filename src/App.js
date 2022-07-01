// lib
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
// file
import { CreateContainer, Header, MainContainer } from "./components";
import { useStateValue } from "./context/StateProvider";
import { getAllProducts } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";

const App = () => {
    // const [{ foodItems }, dispatch] = useStateValue();

    // eslint-disable-next-line no-unused-vars
    const [_, dispatch] = useStateValue();

    const fetchData = async () => {
        await getAllProducts().then((data) => {
            dispatch({
                type: actionType.SET_PRODUCTS,
                products: data,
            });
        });
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AnimatePresence exitBeforeEnter>
            <div className="w-screen h-auto flex flex-col bg-primary">
                <Header />

                {/* <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full"> */}
                <main className="mt-14 lg:mt-20 px-4 lg:px-16 py-4 w-full">
                    <Routes>
                        <Route path="/*" element={<MainContainer />} />
                        <Route path="/createItem" element={<CreateContainer />} />
                    </Routes>
                </main>
            </div>
        </AnimatePresence>
    );
};

export default App;
