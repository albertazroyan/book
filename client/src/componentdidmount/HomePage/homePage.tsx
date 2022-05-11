import axios from "axios"
import { useEffect, useState } from "react"
import {Carusel} from "../CaruselScreen/carusel";
import {Card} from "../card/card";
import "./homePage.css";
import { CardJson } from "../InterFace/card";
import {Caruseldata} from "../InterFace/carusel";
import { useActions } from "../../hooks/useActions";
import {
   BookinformationCard ,
   FilesHref
  } from "../InterFace/bookPageInterface";






export const Home:React.FC = ()=>{


   

    const [carueseldb , setCaruseldb] = useState<Caruseldata[]>([])
    const [bookinfo , setBookinfo] = useState<CardJson[]>([])
    const {setViewLoader} = useActions()


    
      useEffect(()=>{
         setViewLoader(false)
         axios.get('/api/v1/gethomecarusel')
         .then(res=>{
            setCaruseldb(res.data)
            setViewLoader(true)
         })
      },[])
     
       useEffect(()=>{
        setViewLoader(false)
        axios.get("/api/v1/getbookinfo")
        .then(res=>{setBookinfo(res.data.map((data:BookinformationCard)=>{
             return{
              cardname_am:data.name_am,
              cardname_ru:data.name_ru,
              cardname_en:data.name_en,
              cardisisavailabe:data.ցategory,
              cardauthor_am:data.author_am ,
              cardauthor_ru:data.author_ru ,
              cardauthor_en:data.author_en ,
              cardprice:data.price,
              carddiscount:data.discount,
              cardlanguage:data.Language_am,
              cardurl:data.get_absolute_url,
              cardgetgoti:data.ցategory,
              id:data._id,
              cardfile:data.files.map((filterfile:FilesHref)=> filterfile.fileHreaf)
             };
             })
        )
        setViewLoader(true)
      })
      },[])
  
   
      
    return( 
         <div className="home-page" >
            <Carusel dataall={carueseldb}   />
            <Card carddata={bookinfo} />
         </div>
    )
}