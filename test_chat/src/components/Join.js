import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

import "./Join.css"
function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

function handleName (event)
{ 
    setName(event.target.value);
}    
function handleRoom (event) 
{
    setRoom(event.target.value);
} 
  return (
    <div>
    <div className="login">
    
    <div className="login__container">
      
        <FontAwesomeIcon icon={faUsers} size="3x" className="icon" />
        
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="login__textBox"
            type="text"
            onChange={handleName}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="login__textBox"
            type="text"
            onChange={handleRoom}
          />
        </div>
        <Link
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className="login__btn" type="submit">
            Sign In
          </button>
          
        </Link>
        </div>  
    </div>
    </div>
  );
}

export default Join