import { Button, Icon } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./index.css";
import { useEffect, useState } from "react";

const Profile = () => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    getProfileDetails();
  }, []);

  const getProfileDetails = async () => {
    const url = "https://bursting-gelding-24.hasura.app/api/rest/profile";

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": "1",
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      setUserData(data.users[0]);
    }
  };

  return (
    <div className="profile">
      <div className="header">
        <h1>Profile</h1>
        <Button variant="contained" color="primary">
          <AddIcon />
          Add Transaction
        </Button>
      </div>
      <div className="page">
        <div className="profile-card">
          <div className="profile-image">
            <img
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlysovRqSseA4uUGlio_vESy9xFc5OS7jXOva3NlE&s"
              }
              alt="avatar"
            />
          </div>
          <div className="col">
            <label htmlFor="name" className="label">
              Name
            </label>
            <input type="text" className="input-ele" />
            <label htmlFor="name" className="label">
              Name
            </label>
            <input type="text" className="input-ele" />
            <label htmlFor="name" className="label">
              Name
            </label>
            <input type="text" className="input-ele" />
            <label htmlFor="name" className="label">
              Name
            </label>
            <input type="text" className="input-ele" />
            <label htmlFor="name" className="label">
              Name
            </label>
            <input type="text" className="input-ele" />
          </div>
          <div className="col">
            <label htmlFor="username" className="label">
              Name
            </label>
            <input
              id="userName"
              type="text"
              value={userData.name}
              className="input-ele"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
