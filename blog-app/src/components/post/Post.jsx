import "./post.css";
import {Link} from "react-router-dom";
import postImg from "../assets/post1.jpg";

export default function Post({post}) {
  const PF = "http://localhost:5000/images/"
  return (
    <div className="post">
      {post.photo && 
       ( <img className="postImg" src={PF + post.photo} alt="" />)
      }
      <div className="postInfo">
        <div className="postCats">
          {
post.categories && post.categories.map((c)=>(
  <span className="postCat">{c.name}</span>
)) }
 </div>
 <Link to = {`/post/${post._id}`} className="link">
        <span className="postTitle">
            <p>{post.title}</p>
        </span>
        </Link>
        <hr />
        <span className="postTime">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
    {post.desc}
      </p>
    </div>
  )
}
