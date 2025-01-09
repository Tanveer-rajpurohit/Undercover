import Navbar from "../components/navbar/Navbar";
import UserProfile from "../components/profile/UserProfile";

const Profile = () => {
  return (
    <>
      <div className="w-full min-h-screen font-Quicksand flex flex-col bg-[#E9E8E4] ">
        <Navbar />
        <div className="w-full py-6 px-8 relative">
            <UserProfile />
        </div>
      </div>
    </>
  );
};
export default Profile;
