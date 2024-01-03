import { auth } from "../server/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";

const Profile = () => {
  const navigateTo = useNavigate();
  const { setCurrentUser } = useGlobalContext();
  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("logout successful");
        setCurrentUser(null);
        navigateTo("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <main>
      <button onClick={() => logOut()}>Logout</button>
    </main>
  );
};

export default Profile;
