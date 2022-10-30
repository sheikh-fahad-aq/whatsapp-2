import React from 'react'
import styled from 'styled-components';

import * as EmailValidator from 'email-validator';

import { Avatar, Button, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Email } from '@mui/icons-material';


import { auth, provider, db } from '../firebase';
import { collection , addDoc , getDocs, query, where } from "firebase/firestore"; 
import { signOut } from 'firebase/auth';
import { useAuthState} from 'react-firebase-hooks/auth';
import { useCollection} from "react-firebase-hooks/firestore"

import Chat from './Chat';
import { useRouter } from 'next/router';



function Sidebar() {

    const [user] = useAuthState(auth);
    
    const router = useRouter();

    const userChatRef = query(collection(db, "chats"), where('users','array-contains',user.email));

    const [chatSnaptshots] = useCollection(userChatRef)

    // const getUserEmails = async ()=>  {
    //     const getUserEmailsSnapshot = await getDocs(userChatRef)
        
    //     const data = getUserEmailsSnapshot?.docs.find(
    //         (chat) => chat.data().users.find((user) => user === "test@test.com").length > 0 
    //     );
    //     console.log(data);
    // }

    const chatAlreadyExists = (recipientEmail) => 
        !!chatSnaptshots?.docs.find(
            (chat) => chat.data().users.find((user) => user === recipientEmail)?.length > 0 
        );
    
    const createChat = () => {

        const input = prompt(
            "Please enter an email address for the you wish to chat with"
        )

        if (!input) {
            return;
        }

        if (EmailValidator.validate(input) &&
                !chatAlreadyExists(input) &&  
                input !== user.email ){
            // We need to add the chat into the DB 'chats' collection
            
            addDoc(collection(db, 'chats'), {
                users: [user.email,input],
              });
        }
    };


    const LogoutUser = () =>{
        
        auth.signOut().then(function(){
            router.push(`/`)
        })
        
    }
   return (
    <Container>
        <Header>
            <UserAvatar src={user.photoURL} onClick={LogoutUser} />

            <IconsContainer>
                <IconButton>
                    <ChatIcon />    
                </IconButton>
                <IconButton>
                    <MoreVertIcon />        
                </IconButton>
                
            </IconsContainer>
        </Header>

        <Search>
            <SearchIcon />
            <SearchInput placeholder='Search in chats'/>
        </Search>

        {/* List of Chats */}
        

        

        <SidebarButton onClick={createChat}>START A NEW CHAT</SidebarButton>

        {
            chatSnaptshots?.docs.map((chat) => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))
        }
        
    </Container>
  )
}

export default Sidebar;


const Container = styled.div``;


const Search = styled.div`
    display: flex;
    align-items: center;
    paddding: 20px;
    border-radius: 2px;
`;


const SidebarButton = styled(Button)`
    width:100%;
    
    &&& {
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }
`;


const SearchInput = styled.input`
    outline-width: 0;
    border: none;
    flex: 1;
`;





const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    justify-content:space-between;
    align-items: center;
    paddding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover  { 
        opacity: 0.8
    }
`;

const IconsContainer = styled.div``;


