import React from 'react'
import "./header.css"
import homeImg from "../assets/homepage.jpg"

export default function Header() {
  return (
    <div className='header'>
        <div className="headerTitles">
        <span className="headerTitleSm"> React and Node</span>
        <span className="headerTitleLg"> NOthing</span>

        </div>
        <img  className='headerImg' src={homeImg} alt="" />
        
        
    </div>
  )
}
