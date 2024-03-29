import React, { useState, useEffect} from "react"
import ReactDom from 'react-dom'
import i18next from "i18next"
import axios from "axios"
import { CardShopList } from "../../../custom_types/index"
import { ClossIcon } from "../../cssatributes/cssicons"
import  Props  from './types/props'
import  PropTypes  from "./props"
import CSS from 'csstype'
import "./style.css"

interface FormType {
    names: string
    lastname: string
    email: string
    phone: string
    message: string
    order: CardShopList[]
}

// eslint-disable-next-line react/display-name
export const ShopForm:React.FC<Props> = React.memo(({data,clossClick,open})=>{
   
  const [formdata ,setFormdata] = useState<PropTypes>({
    names: "" ,
    lastname: "",
    email: "" ,
    phone: "",
    message: "",
    order: data
    })
  const [answer , setAnswer] = useState<string>("")
  const [Formcontainer] = React.useState<HTMLElement >(() => {
    const el = document.createElement('div')
    el.classList.add('root-form')
    return el
  })

  useEffect( () => {
    document.body.appendChild(Formcontainer)
    return () => {
      document.body.removeChild(Formcontainer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!open) return null  
 
  const SendOrder = async (e: React.FormEvent<HTMLFormElement>) => {
 
    e.preventDefault()
    const datas:FormType = formdata   

    try { 
      await axios.post("/api/v1/post/order", datas)
      .then(res=>setAnswer(res.data))
    // setTimeout(()=>{
    //   window.location.reload(); 
    // },3000)
     
     }catch(error){
    //  setFormerror(error.response.data);
    //  if(error.response.data.email && error.response.data.phone_number){
    //   dispatch(registrationform({...questionssend, phone_number:"" ,email:""}))  
    //  }else if(error.response.data.email){
    //   dispatch(registrationform({...questionssend, email:""}))
    //  }else if(error.response.data.phone_number){
    //   dispatch(registrationform({...questionssend, phone_number:""}))
    //  }          
    //  setTimeout(()=>{
    //     setFormerror("")  
    //  },[6000])
    }
  }

  return ReactDom.createPortal(
    <div className="shop-from-sec_" style={MODAL_STYLES}>
      <div className="form-cantrol-sec_" style={MODAL_CANTROL}>
        <div className="shop-form-title-sec">
          <h2>{i18next.t('order')}{answer}</h2>
            <div  className="closser">
              <ClossIcon onClick={clossClick} />
            </div>
        </div>
        <form onSubmit={SendOrder}>
          <div className="shop-form-input"> 
            <input
              type="text"
              placeholder={i18next.t('name')}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) =>
                 setFormdata({...formdata,names:e.target.value})} 
              />
          </div>
          <div className="shop-form-input">  
            <input
              type="text"
              placeholder={i18next.t('lastname')}
              onChange={ (e:React.ChangeEvent<HTMLInputElement>) => 
                setFormdata({...formdata, lastname: e.target.value})} />
          </div>
          <div className="shop-form-input"> 
            <input 
              type="text" 
              placeholder={i18next.t('email')}
              onChange={ (e:React.ChangeEvent<HTMLInputElement>) => 
                setFormdata({...formdata,email:e.target.value})} />
          </div>
          <div className="shop-form-input"> 
            <input
              type="text" 
              placeholder={i18next.t('phonenumber')}
              onChange={ (e:React.ChangeEvent<HTMLInputElement>) =>
                setFormdata({...formdata,phone:e.target.value})} />
          </div>
          <div className="shop-form-input">      
            <input 
              type="text" 
              placeholder={i18next.t('message')}
              onChange={ (e:React.ChangeEvent<HTMLInputElement>) =>
                setFormdata({...formdata, message:e.target.value })} 
             />
          </div>
          <button>{i18next.t('order')}</button>
        </form>
      </div>
    </div>, Formcontainer 
  )
})

const MODAL_CANTROL: CSS.Properties = {
  margin: "auto",
  width: "30%",
  minWidth: "280px",
  background: "white",
  padding: "10px"
}

const MODAL_STYLES:CSS.Properties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgb(255 255 255 / 50%)',
  padding: '50px',
  zIndex: 1000,
  width: "100%",
  height: "100vh"
}
