import {CaruselFoto} from "./caruselimg";
import {HomeAddres} from "./contact";
import {HomeSocialMedia} from "./socialmedia";
import {useTypedSelector} from "../../../hooks/userTypedSelector";
import { useActions } from '../../../hooks/useActions';
import { useState } from "react";
import axios from "axios";


export const Homeinfo  = ()=>{
    

    const [uploadPercentage, setUploadPercentage] = useState<number>(0);
    const {data} = useTypedSelector(state => state.home)

    const {setHomePage} = useActions()
     
   
    const caruselsubmit = async(event: React.FormEvent<HTMLFormElement>)=>{
          event.preventDefault();

          const {
            file ,
            absalute_url,
            phone_number,
            phone_number2,
            email,
            addres,
            facebook_url,
            instagram_url,
            telegram_url,
            copyright_column
          } = data

          const formData = new FormData();

        //  file.forEach((element:string) => {
        //      formData.append('files', element)
        //  });

          for (let i = 0; i < file.length; i++) {
            formData.append('file', file[i]);            
          }
          // formData.append('file' , file)
          formData.append('absolute_url' , absalute_url)
          formData.append('phone_number' , phone_number)
          formData.append('phone_number1' , phone_number2)
          formData.append('email' , email) 
          formData.append('addres' , addres)
          formData.append('pfacebook_url' , facebook_url)
          formData.append('instagram_url' , instagram_url)
          formData.append('telegram_url' , telegram_url)
          formData.append('copyright_column' , copyright_column)

          try{
        
            const res = await axios.post('/api/v1/caruselphotos/upload' , formData ,{
                   
               headers:{
                   'Content-Type': "multipart/form-data"
               },
               onUploadProgress: progressEvent => {
   
   
                  setUploadPercentage(+Math.round((progressEvent.loaded * 100) / progressEvent.total));
                }
            })
            setTimeout(() => setUploadPercentage(0), 10000);

            window.location
           
            window.location.reload();
           //  const { fileName , filePath} = res.data
   
            // setMessage(res.data);
   
           //  setUploadedFile({fileName, filePath}) 
   
          }catch(error){
             console.log(error)
          }

    }

    return(
        <div className="carusel-wrapper">
            <form onSubmit={caruselsubmit}>
              <CaruselFoto />
              <HomeAddres />
              <HomeSocialMedia />
             <button>Send</button>
            </form>
        </div>
    )
}