import { Button } from '@mui/material';
import Head from 'next/head';
import React from 'react'
import styled from 'styled-components';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { async } from '@firebase/util';


function Login() {

  const signIn = async () => {
    await signInWithPopup(auth,provider).catch(alert)
  }

  return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>

            <LoginContainer>
              <Logo src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" />
              <LoginButton onClick={signIn}>Sign in with Google</LoginButton>
            </LoginContainer>

        </Container>
  )
}

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
  color: black;
`;

const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 4px 14px -3px rgba(0,0,0,0.7);
  color: black;
`;

const Logo = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 50px;
`;

const LoginButton = styled(Button)`
    variant: outlined;
    outline-color: black;
    color : black;

    &&& {
      border: 0.5px solid lightgreen;
    }
`;

