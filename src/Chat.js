import React, {useState,useEffect} from 'react';
import { Avatar, IconButton } from "@material-ui/core"
import './Chat.css';
import { AttachFile, InsertEmoticon, Mic } from '@material-ui/icons';
import { SearchOutlined } from '@material-ui/icons';
import { useParams } from "react-router-dom";
import MoreVert from '@material-ui/icons/MoreVert';
import db from "./Firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";
function Chat() {
	const [seed,setSeed] = useState("");
	const [input,setInput] = useState("");
	const [roomName, setRoomName] = useState("");
	const [messages, setMessage] = useState([]);
	const [{user},dispatch] = useStateValue();
	const { roomId } = useParams();
	useEffect(() => {
		setSeed(Math.floor(Math.random() * 1000));
	},[roomId])
	useEffect(() => {
		
		if(roomId) { 
			db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
				return setRoomName(snapshot.data().name);
			})

			db.collection('rooms').doc(roomId).collection('messages').orderBy("timestamp","asc").onSnapshot(snapshot => {
				return setMessage(snapshot.docs.map(doc => {
						return doc.data();
					}))
				
			})
		}

	},[roomId])

	const sendMessgae = (e) => {
		e.preventDefault();
		
		db.collection('rooms').doc(roomId).collection("messages").add({
			message: input,
			name: user.displayName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		})
		setInput("")
	}
	console.log(messages);
	return (
		
		<div className="chat">

			<div className="chat__header">
				<Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
				<div className="chat__headerInfo">
					<h3>{roomName}</h3>
					<p>{messages[messages.length - 1]?.timestamp?.toDate().toUTCString()}</p>
				</div>
				<div className="chat__headerRight">
				<IconButton>
						<SearchOutlined />
					</IconButton>
					<IconButton>
						<AttachFile />
					</IconButton>
					<IconButton>
						<MoreVert/>
					</IconButton>
				</div>
			</div>
			<div className="chat__body">
				{ messages.map((message) => {
					return (
						<p className={`chat__message ${message.name === user.displayName &&  "chat__reciever"}`}>
							{message.message}
							<span className="chat__name">{message.name}</span>
							<span className="chat__timeStamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
						</p>
					)
				})
				}
			
			</div>
			<div className="chat__footer">
				<InsertEmoticon />
				<form>
					<input value={input} type="text" placeholder="Type your message" onChange={(e) => {
						setInput(e.target.value)
					}}/>
					<button type="submit" onClick={sendMessgae}>Send Message</button>
				</form>
				<Mic />
			</div>
			
		</div>
	)
}

export default Chat
