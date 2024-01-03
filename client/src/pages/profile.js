import { auth } from "../server/firebaseConfig";
import { signOut } from "firebase/auth";

const Profile = () => {
  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("logout successful");
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
