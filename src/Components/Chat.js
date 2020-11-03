import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import '../Styles/Chat.css';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import { useStateValue } from '../StateProvider';
import firebase from 'firebase';

function Chat() {

    const [seed, setSeed] = useState('');
    const [inputChat, setInputChat] = useState('');
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const {roomId} = useParams();
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 4050));
    }, [])

    const sendMsg = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: inputChat,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInputChat("");
    }

    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) => 
                setRoomName(snapshot.data().name));
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc')
            .onSnapshot(snapshot => (setMessages(snapshot.docs.map(doc => doc.data()))));
        }
    }, [roomId])

    return (
        <div className = "chat">
            <div className = "chat__header">
                <Avatar src = {`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className = "chat__headerInfo">
                    <h3> {roomName} </h3>
                    <p>last seen {new Date(messages[messages.lenght - 1]?.timestamp?.toDate()).toUTCString()} </p>
                </div>
                <div className = "chat__headerRight">
                    <IconButton>
                        <SearchOutlinedIcon/>
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className = "chat__body">
                {messages.map((message) => (
                    <p className = {`chat__message ${ 
                        message.name === user.displayName && "chat__receiver"}`}>
                    <span className = "chat__name">{message.name}</span>
                      {message.message}
                     <span className = "chat__timestamp"> {new Date(message.timestamp?.toDate()).toUTCString()} </span>
                    </p>
                ))}
            </div>
            <div className = "chat__footer">
                <InsertEmoticonIcon/>
                <form>
                    <input type = "text" onChange = {e => setInputChat(e.target.value)} placeholder = "Type a message"/>
                    <button type="submit" onClick = {sendMsg} >Send a message</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
