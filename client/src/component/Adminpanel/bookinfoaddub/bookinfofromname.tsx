import React from "react";
import {useTypedSelector} from "../../../hooks/userTypedSelector";
import { useActions } from '../../../hooks/useActions';
import {InputSequential} from "../formdesign/formdesign";




export const Bookinfoformname:React.FC = ()=>{

    
    const {data} = useTypedSelector(state => state.book)

    const {setBookData} = useActions()

 


    return( 
        < >
        <InputSequential>
          <div className="admin-input-cantrol">
            <label>գրքի անուն:Am</label>
                <input
                type="text"
                required
                placeholder="գրքի անուն" 
                value={data.name_am || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBookData({...data,name_am:e.target.value})}
             />
             </div>
            
            <div className="admin-input-cantrol">
            <label>գրքի անուն:Ru</label>
                <input
                type="text"
                required
                placeholder="գրքի անուն" 
                value={data.name_ru || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBookData({...data,name_ru:e.target.value})}
             /> 
             </div>
            <div className="admin-input-cantrol">
            <label>գրքի անուն:En</label>
                <input
                type="text"
                required
                placeholder="գրքի անուն" 
                value={data.name_en || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBookData({...data,name_en:e.target.value})}
             />
             </div>
             </InputSequential>
        </>
    )
}