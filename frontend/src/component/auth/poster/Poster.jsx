import React from 'react'
import "../poster/Poster.css"

const Poster = () => {
  return (
    <div style={{position: "absolute",paddingLeft:"2%", justifyContent:"center"}}>
      <h1 id='posterHeading'>Laundry Service</h1>
      <p id='posterSubheading'>Doorstep Wash & Dryclean Service</p>
      <p id="poster-q">Don't Have An Account?</p>
      <button id='poster-btn'> Register</button>
    </div>
  )
}

export default Poster
