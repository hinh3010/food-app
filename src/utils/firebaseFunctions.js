import {
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

// Saving new products
export const saveItem = async (data) => {
    // await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    await setDoc(doc(firestore, "products", `${Date.now()}`), data, {
        merge: true,
    });
};

// get all products
export const getAllProducts = async () => {
    const items = await getDocs(
        query(collection(firestore, "products"), orderBy("id", "desc"))
    );

    return items.docs.map((doc) => doc.data());
};



