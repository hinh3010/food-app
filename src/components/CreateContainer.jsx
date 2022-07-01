import React, { useState } from "react";
import { motion } from "framer-motion";

import {
    MdCloudUpload,
    MdDelete,
    MdAttachMoney,
    MdAnnouncement,
    MdDescription,
} from "react-icons/md";

import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";

import { storage } from "../firebase.config";
import { getAllProducts, saveItem } from "../utils/firebaseFunctions";
import { categories } from "../utils/data";
import Loader from "./Loader";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const CreateContainer = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState(null);
    const [quantity, setQuantity] = useState("");

    const [fields, setFields] = useState(false);
    const [msg, setMsg] = useState(null);
    const [alertStatus, setAlertStatus] = useState("danger");

    // eslint-disable-next-line no-unused-vars
    const [{ foodItems }, dispatch] = useStateValue();

    const [imageAsset, setImageAsset] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const uploadImage = (e) => {
        setIsLoading(true);
        const imageFile = e.target.files[0];
        const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                return (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
                console.log(error);
                setFields(true);
                setMsg("Error while uploading : Try AGain 🙇");
                setAlertStatus("danger");
                setTimeout(() => {
                    setFields(false);
                    setIsLoading(false);
                }, 5000);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageAsset(downloadURL);
                    setIsLoading(false);
                    setFields(true);
                    setMsg("Image uploaded successfully 😊");
                    setAlertStatus("success");
                    setTimeout(() => {
                        setFields(false);
                    }, 5000);
                });
            }
        );
    };

    const deleteImage = () => {
        setIsLoading(true);
        const deleteRef = ref(storage, imageAsset);
        deleteObject(deleteRef).then(() => {
            setImageAsset(null);
            setIsLoading(false);
            setFields(true);
            setMsg("Image deleted successfully 😊");
            setAlertStatus("success");
            setTimeout(() => {
                setFields(false);
            }, 5000);
        });
    };

    const saveDetails = () => {
        setIsLoading(true);
        try {
            if (!title || !description || !imageAsset || !price || !category) {
                setFields(true);
                setMsg("Required fields can't be empty");
                setAlertStatus("danger");
                setTimeout(() => {
                    setFields(false);
                    setIsLoading(false);
                }, 4000);
            } else {
                const data = {
                    id: `${Date.now()}`,
                    title: title,
                    imageURL: imageAsset,
                    category: category,
                    description: description,
                    qty: quantity || 1,
                    price: price,
                };

                // luu vao firebase
                saveItem(data);

                setIsLoading(false);
                setFields(true);
                setMsg("Data Uploaded successfully 😊");
                setAlertStatus("success");
                setTimeout(() => {
                    setFields(false);
                }, 5000);

                // clear data 
                clearData();
            }
        } catch (error) {
            console.log(error);
            setFields(true);
            setMsg("Error while uploading : Try AGain 🙇");
            setAlertStatus("danger");
            setTimeout(() => {
                setFields(false);
                setIsLoading(false);
            }, 5000);
        }

        fetchData();
    };

    const clearData = () => {
        setTitle("");
        setImageAsset(null);
        setDescription("");
        setPrice("");
        setCategory("Select Category");
    };

    const fetchData = async () => {
        await getAllProducts().then((data) => {
            // console.log(data);
            dispatch({
                type: actionType.SET_PRODUCTS,
                products: data,
            });
        });
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="w-[90%] md:w-[50%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">

                {fields && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${alertStatus === "danger"
                            ? "bg-red-400 text-red-800"
                            : "bg-emerald-400 text-emerald-800"
                            }`}
                    >
                        {msg}
                    </motion.p>
                )}

                {/* title */}
                <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                    <MdAnnouncement className="text-xl text-gray-700" />
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Give me a title..."
                        className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                    />
                </div>

                {/* select category */}
                <div className="w-full">
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                    >
                        <option value="other" className="bg-white">
                            Select Category
                        </option>
                        {categories &&
                            categories.map((item) => (
                                <option
                                    key={item.id}
                                    className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                                    value={item.urlParamName}
                                >
                                    {item.name}
                                </option>
                            ))}
                    </select>
                </div>

                {/* image */}
                <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
                    {/* loading */}
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <>
                            {!imageAsset ? (
                                //  upload image
                                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                        <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                                        <p className="text-gray-500 hover:text-gray-700">
                                            Click here to upload
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        name="uploadimage"
                                        accept="image/*"
                                        onChange={uploadImage}
                                        className="w-0 h-0"
                                    />
                                </label>
                            ) : (
                                //  remove image
                                <div className="relative h-full">
                                    <img
                                        src={imageAsset}
                                        alt="uploaded img"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                                        onClick={deleteImage}
                                    >
                                        <MdDelete className="text-white" />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* description */}
                <div className="w-full flex flex-col md:flex-row items-center gap-3">
                    <MdDescription className="text-gray-700 text-2xl" />
                    <input
                        type="text"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                    />

                </div>

                {/* subtitle */}
                <div className="w-full flex flex-col md:flex-row items-center gap-3">
                    {/* quantity */}
                    <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                        <MdDescription className="text-gray-700 text-2xl" />
                        <input
                            type="text"
                            required
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="Quantity"
                            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                        />
                    </div>
                    {/* price */}
                    <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                        <MdAttachMoney className="text-gray-700 text-2xl" />
                        <input
                            type="text"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price"
                            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                        />
                    </div>
                </div>

                {/* save */}
                <div className="flex items-center w-full">
                    <button
                        type="button"
                        className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
                        onClick={saveDetails}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateContainer;
