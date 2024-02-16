import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

const dbFunc = () => {
  const favouritesCollectionRef = collection(db, "favourites");

  //   Function to get users from the database
  const getFavourites = async () => {
    try {
      const data = await getDocs(favouritesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData, data);
    } catch (error) {
      console.log(error);
    }
  };

  const addFavourite = async (arg) => {
    try {
      await addDoc(favouritesCollectionRef, {
        id: arg.id,
        date: arg.date,
        popularity: arg.popularity,
        poster: arg.url,
        rating: arg.rating,
        title: arg.title,
        uid: arg.uid,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { getFavourites, addFavourite };
};

export default dbFunc;
