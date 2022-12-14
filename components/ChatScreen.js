
import { Avatar, IconButton } from '@mui/material';
import { AttachFile} from '@mui/icons-material';
import { useRouter } from 'next/router';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth } from '../firebase';

function ChatScreen() {

  const [user] = useAuthState(auth);
  

  const router = useRouter();


  return (
    <Container>
        <Header>
          <Avatar />

          <HeaderInformation>
            <h3>Rec Email</h3>
            <p>Last Seen ...</p>
          </HeaderInformation>
          <HeaderIcons>
              <IconButton>
                  <AttachFile />
              </IconButton>
          </HeaderIcons>
        </Header>
    </Container>
  )
}

export default ChatScreen;


const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  background-color:white;
  z-index:100;
  top: 0;
  display: flex;
  padding:11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px  solid whitesmoke;  
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex:1;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size:14px;
    color: gray;
  }

`;

const HeaderIcons = styled.div``;
