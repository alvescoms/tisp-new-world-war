import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import styled from "styled-components";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Panel from '../../components/Panel';

import { useAuth } from '../../contexts/auth';
import { showTurkeyValidation, showSuccess } from '../../utils/alert';

import api from '../../api/api';

const Main = styled.div`
    display: flex;
    flex-direction: column;
    background-image: url('/images/char-wallpaper.jpg');
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

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 65vw;
    height: 30vw;
`

const CharListContainer = styled.div`
    width: 30%;
    padding: 0 20px 0 0;
    overflow-y: scroll;
    overflow-x: hidden;
`

const CharDetailsContainer = styled.div`
    width: 70%;
    padding: 5px;
`

const ListChar = styled.ul`
    list-style: none;
    padding: 0;
`

const ItemChar = styled.li`
    display: flex;
    cursor: pointer;
    padding: 10px;
    margin-top: 10px;
    flex-direction: row;
    border-radius: 3px;
    background: #FFFFFF;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    &:hover {
        background: #f5f5f5;
        transition: 0.3s;
    }

`

const ItemCharTitle = styled.h3`
    margin: 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #919191;
`

const ItemCharImage = styled(Image)`
    
`

const ItemCharContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 10px;
`

const ItemCharName = styled.span`
    font-size: 22px;
`

const ItemCharLevel = styled.span`
    font-size: 14px;
`

const ItemCharServer = styled.span`
    font-size: 14px;
`

export default function Chars() {

    const router = useRouter()
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

                const response = await api.post('/users/create', formData)

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
        <Main>
            <Header />

            <Panel>
                <Container>
                    <CharListContainer>
                        <ItemCharTitle>Char List</ItemCharTitle>
                        <ListChar>
                            {/* {itens.map((item, index) => <Link key={index} href={item.link}><Item>{item.name}</Item></Link>)} */}
                            <Link href="">
                                <ItemChar>
                                    <ItemCharImage src="/images/loading.png" width={100} height={100} />
                                    <ItemCharContainer>
                                        <ItemCharName>Bilauzinho</ItemCharName>
                                        <ItemCharLevel>Level: 21</ItemCharLevel>
                                        <ItemCharServer>Server: TISPARALHO</ItemCharServer>
                                    </ItemCharContainer>
                                </ItemChar>
                            </Link>
                            <Link href="">
                                <ItemChar>
                                    <ItemCharImage src="/images/loading.png" width={100} height={100} />
                                    <ItemCharContainer>
                                        <ItemCharName>Bilauzinho</ItemCharName>
                                        <ItemCharLevel>Level: 21</ItemCharLevel>
                                        <ItemCharServer>Server: TISPARALHO</ItemCharServer>
                                    </ItemCharContainer>
                                </ItemChar>
                            </Link>
                            <Link href="">
                                <ItemChar>
                                    <ItemCharImage src="/images/loading.png" width={100} height={100} />
                                    <ItemCharContainer>
                                        <ItemCharName>Bilauzinho</ItemCharName>
                                        <ItemCharLevel>Level: 21</ItemCharLevel>
                                        <ItemCharServer>Server: TISPARALHO</ItemCharServer>
                                    </ItemCharContainer>
                                </ItemChar>
                            </Link>
                            <Link href="">
                                <ItemChar>
                                    <ItemCharImage src="/images/loading.png" width={100} height={100} />
                                    <ItemCharContainer>
                                        <ItemCharName>Bilauzinho</ItemCharName>
                                        <ItemCharLevel>Level: 21</ItemCharLevel>
                                        <ItemCharServer>Server: TISPARALHO</ItemCharServer>
                                    </ItemCharContainer>
                                </ItemChar>
                            </Link>
                            <Link href="">
                                <ItemChar>
                                    <ItemCharImage src="/images/loading.png" width={100} height={100} />
                                    <ItemCharContainer>
                                        <ItemCharName>Bilauzinho</ItemCharName>
                                        <ItemCharLevel>Level: 21</ItemCharLevel>
                                        <ItemCharServer>Server: TISPARALHO</ItemCharServer>
                                    </ItemCharContainer>
                                </ItemChar>
                            </Link>
                            <Link href="">
                                <ItemChar>
                                    <ItemCharImage src="/images/loading.png" width={100} height={100} />
                                    <ItemCharContainer>
                                        <ItemCharName>Bilauzinho</ItemCharName>
                                        <ItemCharLevel>Level: 21</ItemCharLevel>
                                        <ItemCharServer>Server: TISPARALHO</ItemCharServer>
                                    </ItemCharContainer>
                                </ItemChar>
                            </Link>
                            <Link href="">
                                <ItemChar>
                                    <ItemCharImage src="/images/loading.png" width={100} height={100} />
                                    <ItemCharContainer>
                                        <ItemCharName>Bilauzinho</ItemCharName>
                                        <ItemCharLevel>Level: 21</ItemCharLevel>
                                        <ItemCharServer>Server: TISPARALHO</ItemCharServer>
                                    </ItemCharContainer>
                                </ItemChar>
                            </Link>
                            <Link href="">
                                <ItemChar>
                                    <ItemCharImage src="/images/loading.png" width={100} height={100} />
                                    <ItemCharContainer>
                                        <ItemCharName>Bilauzinho</ItemCharName>
                                        <ItemCharLevel>Level: 21</ItemCharLevel>
                                        <ItemCharServer>Server: TISPARALHO</ItemCharServer>
                                    </ItemCharContainer>
                                </ItemChar>
                            </Link>
                            <Link href="">
                                <ItemChar>
                                    <ItemCharImage src="/images/loading.png" width={100} height={100} />
                                    <ItemCharContainer>
                                        <ItemCharName>Bilauzinho</ItemCharName>
                                        <ItemCharLevel>Level: 21</ItemCharLevel>
                                        <ItemCharServer>Server: TISPARALHO</ItemCharServer>
                                    </ItemCharContainer>
                                </ItemChar>
                            </Link>
                        </ListChar>
                    </CharListContainer>
                    <CharDetailsContainer>
                        a
                    </CharDetailsContainer>
                </Container>
            </Panel>

        {/* <Footer /> */}
        </Main>
    )
}
