import React,{useEffect,useState} from 'react';

import { Avatar } from "@material-ui/core";
import "./SideBarChat.css"
import db from "./Firebase";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function SideBarChat({ addNewChat, name, id, key }) {

	const [seed,setSeed] = useState("");
	const [messages,setMessage] = useState([]);
	

	useEffect(() => {

		if(id) {
			db.collection('rooms').doc(id).collection('messages').orderBy("timestamp","desc").onSnapshot(snapshot => {
				return setMessage(snapshot.docs.map(doc => {
						return doc.data();
					}))
				
			})
		}
	},[id])
	useEffect(() => {
		setSeed(Math.floor(Math.random() * 1000));
		
	},[])

	const createChat = () => {
		const roomName = prompt("Enter name for the chat room")
		if(roomName) {
			// we will do something
			db.collection("rooms").add({
				name: roomName,
			})
		}
	}
	return !addNewChat ? (
		<Link to={`/rooms/${id}`}>
			<div className="sideBarChat">
				<Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
				<div className="sideBarChat__info">
					<h2>{name}</h2>
					<p>{messages[0]?.message}</p>
				</div>
			</div>
		</Link>
	) : (
		<div onClick={createChat} className="sideBarChat">
			
			<div className="sideBarChat__info">
				<h2>Add New Chat</h2>
				
			</div>
		</div>
	)
}

export default SideBarChat
