import "./write.css"
import writeImg from "../assets/post1.jpg";
import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc
    }
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("https://myblog-backend-z8sl.onrender.com/api/upload", data);
      } catch (err) {

      }

    }
    try {
      const res = await axios.post("https://myblog-backend-z8sl.onrender.com/api/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {

    }
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}

      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className=" writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])} />

          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoCorrect={true}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            type="text"
            placeholder="Tell your story......."
            onChange={e => setDesc(e.target.value)}

          ></textarea>
        </div>
        <button className="writeBtn" type="submit">Publish</button>
      </form>

    </div>
  )
}
