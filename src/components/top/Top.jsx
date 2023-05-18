import React from 'react'
import './Top.css'
const Top = (props) => {
    
  return (
    <div className='cont' >

      <img  src={props.data.image} 
      
       className={props.data.id==props.active+1?" ":"gray-image"}
   
        onClick={()=>props.changeNext(props.index)}   
      />
    </div>
  )
}

export default Top