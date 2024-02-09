import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { useGlobalContext } from "../context";

const dbFunc = () => {
  const collectionRef = collection(db, "users");

  //   Function to get users from the database
  const getUsers = async () => {
    try {
      const data = await getDocs(collectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData, data);
    } catch (error) {
      console.log(error);
    }
  };

  return { getUsers };
};

export default dbFunc;
