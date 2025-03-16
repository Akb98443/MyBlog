import React,{useState , useEffect} from 'react';
import Header from '../../components/header/Header';
import SideBar from '../../components/sidebar/SideBar';
import Posts from '../../components/posts/Posts';
import "./home.css";
import axios from 'axios';
import { useLocation } from 'react-router';

export default function Home() {
  const [posts , setPosts] = useState([]);
const {search} = useLocation();

  useEffect(()=>{
const fetchPosts = async ()=>{
const res = await axios.get("https://myblog-backend-z8sl.onrender.com/api/posts" + search);
setPosts(res.data);
}
fetchPosts();
  }, [search])
  return (
    <>

        <Header/>
        <div className='home'>
        <Posts posts = {posts}/>

            <SideBar/>
        </div>
    </>
  )
}
