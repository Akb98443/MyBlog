import "./settings.css"
import profileImg from "../../components/assets/logo.png"
import SideBar from "../../components/sidebar/SideBar"
import { useContext, useState } from "react"
import { Context } from './../../context/Context';
import axios from "axios";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "https://myblog-backend-z8sl.onrender.com/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("https://myblog-backend-z8sl.onrender.com/api/upload", data);
      } catch (err) {

      }

    }
    try {
      const res = await axios.put("https://myblog-backend-z8sl.onrender.com/api/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });

    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });

    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update your Profile</span>
          <span className="settingsDeleteTitle">Delete your Profile</span>

        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label htmlFor="">Profile Picture</label>
          <div className="settingsProfilePic">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt=""
            />

            <label htmlFor="fileInput">
              <i class="settingProfilePicIcon fa-regular fa-circle-user"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="settingsUpdateBtn" type="submit">Update</button>
          {success && <span style={{ color: "green", marginTop: "15px", textAlign: "center" }}>
            Profile has been updated.....
          </span>}
        </form>
      </div>
      <SideBar />
    </div>
  )
}
