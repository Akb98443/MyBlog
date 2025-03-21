import "./singlePost.css"
import SinglepostImg from "../assets/post1.jpg"
import { useLocation } from "react-router"
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const PF = "https://myblog-backend-z8sl.onrender.com/images/";
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("https://myblog-backend-z8sl.onrender.com/api/posts/" + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }
        getPost();
    }, [path])

    const handleDelete = async () => {
        try {
            await axios.delete("https://myblog-backend-z8sl.onrender.com/api/posts/" + path, { data: { username: user.username } });
            window.location.replace("/");
        } catch (err) { }
    }

    const handleUpdate = async () => {
        try {
            await axios.put(`https://myblog-backend-z8sl.onrender.com/api/posts/${post._id}`, {
                username: user.username,
                title,
                desc,
            });
            setUpdateMode(false);
        } catch (err) {

        }

    }
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo &&
                    <img src={PF + post.photo} alt="" className="singlePostImg" />
                }

                {
                    updateMode ? <input
                        className="singlePostTitleInput"
                        type="text"
                        value={title}
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                    /> : (


                        <h1 className="singlePostTitle">
                            {title}
                            {post.username === user?.username && (
                                <div className="singlePostEdit">
                                    <i className=" singlPostIcon fa-regular fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                                    <i className=" singlPostIcon fa-solid fa-trash-can" onClick={handleDelete}></i>
                                </div>
                            )}
                        </h1>
                    )
                }
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">Author :
                        <Link className="link" to={`/?user=${post.username}`}>
                            <b>{post.username}</b>
                        </Link></span>
                    <span className="singlePostTime">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {
                    updateMode ? <textarea className="singlePostDescInput" value={desc} onChange={(e) => setDesc(e.target.value)} /> : (


                        <p className="singlePostDesc">
                            {desc}
                        </p>
                    )
                }
                {updateMode && <button className="singlePostButton" onClick={handleUpdate}>Update</button>}

            </div>
        </div>
    );
}
