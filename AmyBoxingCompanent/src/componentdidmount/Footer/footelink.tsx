import React from "react"
import { Link } from "react-router-dom"
import { Footer } from "./footer"



interface Footerlink{
    footerdata:typeshref[],
}

interface typeshref{
    footerhref:string,
    footername:string
}
export const Footerlink:React.FC<Footerlink> = (props) =>{
    console.log(props.footerdata)
    console.log(props.footerdata.map(data=>data.footerhref))


    return(
     <ul>
         {
        props.footerdata.map((data,index)=>
        <li key={index}>
            <Link to={`/${data.footerhref}`}>{data.footername}</Link>
        </li>         
           )}
     </ul>
    )
}