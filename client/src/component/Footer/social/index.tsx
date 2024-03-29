import React from "react"
import { useTypedSelector } from "../../../hooks/userTypedSelector"
import { SvgFacebook, SvgInstagram, SvgLocetion, SvgTelegram } from "../../svg"
import "./style.css" 

export const SocialMedia: React.FC = () => {
 
  const { getHomedata } = useTypedSelector(state => state.home)
  
  return (
    <ul className="social-media">
      <li>
        <a href={getHomedata[0] ? getHomedata[0].facebook_url : undefined }  >
          <SvgFacebook />
        </a></li>  
      <li>
        <a href={getHomedata[0] ? getHomedata[0].instagram_url : undefined } >
          <SvgInstagram />
        </a>
      </li>  
      <li>
        <a href={getHomedata[0] ? getHomedata[0].telegram_url : undefined } >
          <SvgTelegram />
        </a>
      </li>
      <li>
        <a href={getHomedata[0] ? getHomedata[0].addres : undefined }  >
          <SvgLocetion />
        </a>
      </li>        
    </ul>
  )
}