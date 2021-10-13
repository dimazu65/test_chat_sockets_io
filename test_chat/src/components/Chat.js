import React ,{useEffect , useState} from 'react'
import queryString from "query-string";
import io from "socket.io-client"
import "./Chat.css"
import InfoBar from './InfoBar.'
import Input from './Input';
import Messages from './Messages';


let socket;

function Chat({location}) {
  
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');  
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState('');

    
    const EndPoint = 'https://dima-test-chat01.herokuapp.com/';
   
    useEffect(()=> {
        const {name , room} = queryString.parse(location.search);
        
        socket = io(EndPoint);
        
        setName(name);
        setRoom(room);

        socket.emit("join",{name , room} ,()=> { });

        return ()=> {
            socket.emit('disconnect');
            socket.off();
        }

    },[EndPoint, location.search])
  

    useEffect(()=> {
        socket.on('message' , (message) => {
            setMessages([...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });


    } ,[messages])

    const sendMessage = (event) => {
        event.preventDefault();
    
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
      }

    console.log(messages)

//Function for sending messages

    return (
        <div className="outerContainer">
        <div className="container">
            <InfoBar room={room} users={users} />
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>

      </div>
    )
}

export default Chat
