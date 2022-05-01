import React,{useEffect ,useState} from "react";
import axios from "axios" ; 
import {changelenguage} from "../helpers/auth";
import {CardJson} from "../InterFace/card";
import {SvgBasket} from "../svgicon/svg";
import {productdatas , orderDataCount} from "../helpers/auth";
import { BookinformationCard } from "../InterFace/bookPageInterface";
import {useTypedSelector} from "../../hooks/userTypedSelector";
import { useActions } from "../../hooks/useActions";
import "./card.css";







interface CardInfo {
  carddata:CardJson[]
}

interface ShopData{
  name:string,
  count:string
}

 
export const Card:React.FC<CardInfo> = ({carddata}) =>{



  const {quantity} = useTypedSelector(state => state.home)
  const {setChangequantity} = useActions()
  let array:string[] = productdatas()
  

 
   
  //  useEffect(()=>{
  //    axios.get('http://localhost:8080/api/v1/getbookinfo')
  //    .then(res=>{
  //      var map = array.reduce(function(prev:any, cur:any) {
  //       prev[cur] = (prev[cur]  || 0 ) + 1 ;
  //       return prev
      
  //      }, {});
  //    let shopdata:any = []
  //    for (const property in map) {
  //     let exav =  res.data.filter((filter:BookinformationCard)=>{return filter._id  === property}).map((data:ShopData)=>{
  //       return{
  //         name:changelenguage(data,"name"),
  //         count:map[property]
  //       }
  //     })  
  //        shopdata =  [...shopdata , ...exav]   
  //     }
 
  //   })
  //  },[])


      

    return(
      <div className="page-product-card-wrapper" >
   
       <div style={{background:""}} className="page-product-card-bottom-cantrol">
      {
         carddata.map((data,index)=>{
         return(
           
        <div 
          key={index}
          className="page-product-card-wrapper-cantrol">
           <div className="page-product-card-is-savaliabe">
            <span 
            style={{ 
              background: data.cardgetgoti === "Limited" ? "linear-gradient(to bottom, #cac531, #f3f9a7)" : undefined ||
              data.cardgetgoti === "In stock"  ? "linear-gradient(to bottom, #1d976c, #93f9b9)" : undefined ||
              data.cardgetgoti === "out of stock"  ? "linear-gradient(to bottom, #d31027, #ea384d)" : undefined || 
              data.cardgetgoti === "New"  ? "linear-gradient(to bottom, #1d976c, #93f9b9)" : undefined 
            }}
        
            >{"data.cardisavailabe"}</span>
            <div className="page-product-card-is-savalibe-flag" 
             style={{
               backgroundImage: data.cardlanguage === "Armenian" ? "url(/svgfolder/flagarm.svg)" : undefined ||
               data.cardlanguage === "Russian" ? "url(/svgfolder/flagrus.svg)" : undefined ||
               data.cardlanguage === "English" ? "url(/svgfolder/flaguse.svg)" : undefined 
              
              }}
             >
             </div>
            </div>
            <div  className="page-product-card-head-settings">
            <div className="page-product-card-top-cantrol">
            <a className="page-product-card-hrefA" target="_blank" href={ data.cardurl  + data.id}>  
            <span className="page-product-cards-linkimg-witdh" style={{backgroundImage:`url(${data.cardfile[0]})`}}></span>  
            </a>    
            <div className="page-product-card-link-information"><a href={"/home/techniquenav/product/"}>{changelenguage(data , 'cardauthor') }</a>  <span>
                </span></div>
            </div>    
            <div className="page-product-cards-bottom-cantrol-info">         
            <h4>{changelenguage(data , 'cardname')}</h4>
            <div className="page-product-cards-bottom">
            <b>{data.cardprice}AMD</b>
          </div> 
        <div className="page-product-cards-shop-info"> 
        <div className="card-button-head">
         <button disabled={ orderDataCount(array)[data.id] >= 10 ? true : false } style={{
             background:data.cardgetgoti === "out of stock" || 
             data.cardgetgoti === "Առկա չէ" ? "linear-gradient(to bottom, #d31027, #ea384d)" : undefined
        ,    opacity:data.cardgetgoti === "Առկա չէ" || quantity === 10 ? "0.6" : undefined
        }}
          onClick={()=>{
            array !== null ? 
            localStorage.setItem("productdata" , JSON.stringify([...array ,data.id]))
            : localStorage.setItem('productdata'  , JSON.stringify([data.id]))
             setChangequantity(quantity + 1)
            }}
          // disabled={data.cardisavailabe === "Առկա չէ" || btnquantity === 10 }
           >
         <SvgBasket />
         </button>
         </div>
         </div>
         </div>
         </div>
          </div>
           )
          })
   
          
         }

    </div> 

     </div>
    )
}

