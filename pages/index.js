import { useState } from 'react';
import Link from 'next/link';
import styled from "styled-components";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import Panel from '../components/Panel';
import Loading from '../components/Loading';

import { useAuth } from '../contexts/auth';
import { showTurkeyValidation, showSuccess } from '../utils/alert';

import api from '../api/api';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-image: url('/images/home-wallpaper.jpg');
    background-position: center center fixed;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 2s; /* Firefox < 16 */
        -ms-animation: fadein 2s; /* Internet Explorer */
         -o-animation: fadein 2s; /* Opera < 12.1 */
            animation: fadein 2s;

    @keyframes fadein {
        from { opacity: 0.8; }
        to   { opacity: 1; }
    }

    /* Firefox < 16 */
    @-moz-keyframes fadein {
        from { opacity: 0.8; }
        to   { opacity: 1; }
    }

    /* Safari, Chrome and Opera > 12.1 */
    @-webkit-keyframes fadein {
        from { opacity: 0.8; }
        to   { opacity: 1; }
    }

    /* Internet Explorer */
    @-ms-keyframes fadein {
        from { opacity: 0.8; }
        to   { opacity: 1; }
    }
`

const Title = styled.h2`
    align-self: center;
`

const FormLogin = styled.div`
    display: flex;
    flex-direction: column;
`

const InputLogin = styled.input`
    width: 300px;
    margin: 10px 0;
    height: 50px;
    padding: 0 20px;
    border-radius: 5px;
    border: 1px solid #888;

    &:focus{
        border: 1px solid #1041a7;
    }
`

const CreateAccount = styled(Link)`
    cursor: pointer;

    &:hover{
        text-decoration: underline;
    }
`

const ButtonLogin = styled.button`
    width: 300px;
    margin: 10px 0;
    height: 50px;
    padding: 0 20px;
    cursor: pointer;
    border: none;
    background: #1041a7;
    color: #FFF;
    font-size: 15px;
    border-radius: 50px;
    margin-top: 30px;
    transition: 0.3s;

    &:hover {
        background: #083c73;
    }
`

export default function Home() {
  
    const { signIn, loading } = useAuth()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const setInputValue = (key, value) => {

        setFormData({
            ...formData,
            [key]: value
        })

    }

    const handleLogin = async () => {

        signIn(formData.email, formData.password)

    }

    // const itens = [
    //     {
    //         name: 'Home',
    //         link: '/',
    //         icon: ''
    //     },
    //     {
    //         name: 'Login',
    //         link: '/login',
    //         icon: ''
    //     },
    //     {
    //         name: 'Register',
    //         link: '/register',
    //         icon: ''
    //     }
    // ]

    return (
        <Container>
            <Header />

            <Panel>
                <FormLogin>
                    <Title>Login</Title>

                    <InputLogin type="text" id="email" placeholder="E-mail" onChange={(event) => setInputValue('email', event.target.value)}/>
                    <InputLogin type="password" id="password"  placeholder="Password" onChange={(event) => setInputValue('password', event.target.value)}/>

                    <CreateAccount href="/register">Create new account.</CreateAccount>
                    <ButtonLogin onClick={handleLogin}>LOGIN</ButtonLogin>
                </FormLogin>
            </Panel>

            <Loading isLoading={loading}
                text="Loading..." />

        </Container>
    )
}
