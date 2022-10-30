import Head from 'next/head';
import React from 'react'
import styled from 'styled-components';

import ChatScreen from '../../components/ChatScreen';
import Sidebar from '../../components/Sidebar';


import { auth, provider, db } from '../../firebase';
import { collection , addDoc , getDocs, query, where , orderBy , doc , getDoc } from "firebase/firestore"; 
import { signOut } from 'firebase/auth';
import { useAuthState} from 'react-firebase-hooks/auth';
import { useCollection} from "react-firebase-hooks/firestore"
import { useRouter } from 'next/router';
import { jsonEval } from '@firebase/util';
import getRecipientEmail from '../../utils/getRecipientEmail';


function Chat({chat , messages}) {
  
    const [user] = useAuthState(auth)


    return (
    <Container>
        <Head>
            <title>Chat with {getRecipientEmail(chat.users,user)}</title>
        </Head>
        <Sidebar />
        <ChatContainer>
            <ChatScreen chat={chat} messages={messages} />
        </ChatContainer>
    </Container>
    )
}

export default Chat;

export async function getServerSideProps(context) {

    const chat_messages_ref = collection(db, "chats", context.query.id, "messages");

    const messageRes = await getDocs(
        query(
        chat_messages_ref,
        orderBy("timestamp", "asc")
        )
    );
    
    const messages = messageRes.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })).map(messages => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime()
    }))


    const chatRef = await getDoc(doc(db, "chats", context.query.id));

    const chat = {
        id: chatRef.id,
        ...chatRef.data(),
    }


    return  {
        props: {
            messages: JSON.stringify(messages),
            chat: chat,
        }
    }
}


const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
    flex: 1;
    overflow: scroll;
    height: 100vh;

    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`