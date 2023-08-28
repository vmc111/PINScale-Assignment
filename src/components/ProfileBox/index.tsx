import useUserId from "../FetchUserId";

import "./index.css";
import LogoutBtn from "../LogoutBtn";

const ProfileBox = () => {
  const user = useUserId();
  return (
    <div className="user-profile">
    <div className="profile-box">
      <img
        src="https://res.cloudinary.com/reddyimgs/image/upload/v1687011162/Avatar_zhzj4v.png"
        alt="profile"
      />
      <div className="user-info">
        <h1 className="user-text">USER</h1>
        <p>{typeof user === "string" ? "" : user.username}</p>
      </div>   
    </div><LogoutBtn /></div>
  );
};

export default ProfileBox;
