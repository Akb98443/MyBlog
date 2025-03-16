import "./sidebar.css"
import sidebarImg from "../assets/sidebarImg.jpg"
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function SideBar() {
  const [cats, setCats] = useState([])
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("https://myblog-backend-z8sl.onrender.com/api/categories");
      setCats(res.data);
    }
    getCats();
  }, [])
  return (
    <div className="sidebar">
      <div className="sideBarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img className="sidebarImg" src={sidebarImg} alt="" />

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Numquam officiis tenetur recusandae ratione perferendis consectetur
          iste mollitia illo, possimus facilis deserunt nam? Ab aut cupiditate tempora
          rem minima porro quis?
        </p>
      </div>
      <div className="sideBarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sideBarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
              <li className="sideBarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>

      </div>
      <div className="sideBarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sideBarSocial">
          <i className="sideBarIcon fa-brands fa-square-facebook"></i>
          <i className="sideBarIcon fa-brands fa-square-instagram"></i>
          <i className="sideBarIcon fa-brands fa-linkedin"></i>
          <i className="sideBarIcon fa-brands fa-square-github"></i>
        </div>

      </div>

    </div>
  )
}
