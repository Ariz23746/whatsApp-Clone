import React,{useState,useEffect} from 'react'
import './SideBar.css';
import { Avatar, IconButton } from "@material-ui/core"
// import SearchIcon from '@material-ui/icons/Search';
import { SearchOutlined } from '@material-ui/icons';
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SideBarChat from "./SideBarChat"

import db from "./Firebase";

function SideBar({ user }) {
	// IconButton is used for wobble effect

	const [rooms,setRooms] = useState([]);
	
	console.log('hello => 1')
	useEffect(() => {
		db.collection('rooms').onSnapshot(snapshot =>
			(
				setRooms(snapshot.docs.map(doc => {
				 	return {
						id: doc.id,
						data: doc.data(),
					}
				}))
			)
		)
		console.log('hello');
	},[])
	return (
		<div className="sidebar">
			<div className="sidebar__header">
				<Avatar src={user?.photoURL}/>
				<div className="sidebar__headerRight">
					<IconButton>
						<DonutLargeIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>
			<div className="sidebar__search">
				<div className="sidebar__SearchContainer">
					<SearchOutlined />
					<input type="text" placeholder="Search your Chat"/>
				</div>
			</div>
			<div className="sidebar__chats">
				<SideBarChat addNewChat/>
				{ rooms.map(room => {
					console.log('hello andar se')
					return <SideBarChat key={room.id} id={room.id} name={room.data.name}/>
					})
				}
			
			</div>
		</div>
	)
}

export default SideBar
