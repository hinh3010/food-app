import React from "react";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import { topProducts } from "../utils/data";

const HomeContainer = () => {
    return (
        <section
            className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
            id="home"
        >
            {/* left */}
            <div className="md:py-8 lg:py-2 py-2 flex-1 flex flex-col items-start justify-center gap-6">
                <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
                    <p className="text-base text-orange-500 font-semibold">
                        Express Delivery
                    </p>
                    <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
                        <img
                            src={Delivery}
                            className="w-full h-full object-contain"
                            alt="delivery"
                        />
                    </div>
                </div>

                <p className="text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-bold tracking-wide text-headingColor">
                    <span className="text-orange-600 text-[3rem] md:text-[4rem] lg:text-[4.5rem]">
                        100% &nbsp;
                    </span>
                    Genuine Product
                </p>
                {/* <p className="text-[2.5rem] lg:text-[3.5rem] font-bold tracking-wide text-headingColor">
                    The Fastest Delivery in
                    <span className="text-orange-600 text-[3rem] lg:text-[5rem]">
                        Your City
                    </span>
                </p> */}

                <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima velit
                    eaque fugit distinctio est nam voluptatum architecto, porro iusto
                    deserunt recusandae ipsa minus eos sunt, dolores illo repellat facere
                    suscipit!
                </p>

                <button
                    type="button"
                    className="text-orange-600 bg-gradient-to-br font-bold from-orange-100 to-orange-300 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
                >
                    Order Now
                </button>
            </div>

            {/* right */}
            <div className="md:py-8 lg:py-2 py-2 flex-1 flex items-center relative">
                {/* background-image */}
                <img
                    src={HeroBg}
                    // className=" ml-auto h-420 w-full lg:w-auto lg:h-650"
                    className=" h-420 w-full lg:w-100% lg:h-650"
                    alt="hero-bg"
                />

                {/* <div className=" w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-32  py-4 gap-4 flex-wrap"> */}
                <div className="overflow-y-scroll px-3 w-full h-full absolute top-0 left-0 grid grid-cols-2 items-center justify-center lg:px-8 md:px-4 py-4 gap-4 flex-wrap">
                    {topProducts &&
                        topProducts.map((n) => (
                            <div
                                key={n.id}
                                className="lg:w-100% p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
                            >
                                <img
                                    src={n.imageSrc}
                                    className="w-20 lg:w-40 -mt-10 lg:-mt-20 "
                                    alt="I1"
                                />
                                <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                                    {n.name}
                                </p>

                                <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
                                    {n.decp}
                                </p>

                                <p className="text-sm font-semibold text-headingColor">
                                    <span className="text-xs text-red-600">$</span> {n.price}
                                </p>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default HomeContainer;
