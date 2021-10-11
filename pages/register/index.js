import { useRouter } from 'next/router';
import { useState } from 'react';

import styled from "styled-components";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Panel from '../../components/Panel';
import Loading from '../../components/Loading';

import { showTurkeyValidation, showSuccess } from '../../utils/alert';

import api from '../../api/api';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-image: url('/images/register-wallpaper.jpg');
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

const ButtonRegister = styled.button`
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

const ButtonBack = styled.button`
    width: 300px;
    margin: 10px 0;
    height: 50px;
    padding: 0 20px;
    cursor: pointer;
    border: none;
    color: #1041a7;
    font-size: 15px;
    border-radius: 50px;
    margin-top: 5px;
    border: 1px solid #1041a7;
    background: #FFF;
    transition: 0.3s;

    &:hover {
        background: #f5f4f4;
    }

`

export default function Home() {

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })
  
    const setInputValue = (key, value) => {

        setFormData({
            ...formData,
            [key]: value
        })

    }

    const handleRegister = async () => {

        if (!formData.name) {
            
            showTurkeyValidation({
                text: 'Inform your name.'
            })

        }
        else if (!formData.email) {
            
            showTurkeyValidation({
                text: 'Inform your e-mail.'
            })

        }
        else if (!formData.password) {
            
            showTurkeyValidation({
                text: 'Inform your password.'
            })

        }
        else if (!formData.passwordConfirm) {
            
            showTurkeyValidation({
                text: 'Inform your name confirm password.'
            })

        }
        else if (formData.password != formData.passwordConfirm) {
            
            showTurkeyValidation({
                text: 'Password doest match.'
            })

        }
        else {

            try {

                setLoading(true)

                const response = await api.post('/users/create', formData)

                setLoading(false)

                if (response.data.success) {

                    showSuccess({
                        text: response.data.message
                    }, () => {

                        router.push('/')

                    })

                }
                else {

                    showTurkeyValidation({
                        text: response.data.message
                    })

                }
                
            }
            catch (exception) {

                showTurkeyValidation({
                    text: 'Error to insert new user, please try again.'
                })

            }            

        }

    }

    return (
        <Container>
            <Header />

            <Panel>
                <FormLogin>
                    <Title>Register</Title>

                    <InputLogin type="text" id="name" placeholder="Name" onChange={(event) => setInputValue('name', event.target.value)} />
                    <InputLogin type="text" id="email" placeholder="E-mail" onChange={(event) => setInputValue('email', event.target.value)} />
                    <InputLogin type="password" id="password" placeholder="Password" onChange={(event) => setInputValue('password', event.target.value)} />
                    <InputLogin type="password" id="passwordConfirm" placeholder="Confirm password" onChange={(event) => setInputValue('passwordConfirm', event.target.value)} />

                    <ButtonRegister onClick={handleRegister}>Register</ButtonRegister>
                    <ButtonBack onClick={() => router.push('/')}>Back</ButtonBack>
                </FormLogin>
            </Panel>

            <Loading isLoading={loading}
                text="Loading..." />

        </Container>
    )
}
