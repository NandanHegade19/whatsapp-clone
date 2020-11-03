import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from '../firebase';
import '../Styles/SidebarContact.css';


function SidebarContact({addNewChat, id, name}) {

    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState('');


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 4050));
    }, [])

    useEffect(() => {
        if(id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => doc.data())))
        }
    }, [id])

    const createChat = () => {
        const newChatName = prompt("Please enter name for chat");
        if(newChatName){
            db.collection('rooms').add({
                name: newChatName
            })
        }
    }
    return !addNewChat ? (
        <Link to = {`/rooms/${id}`}>
            <div className = "sidebarcontact">
                <Avatar src = {`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className = "sidebarcontact__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
        
    ) : (<div onClick = {createChat} className = "sidebarcontact">
            <h2>Add new chat</h2>
        </div>)
}

export default SidebarContact;