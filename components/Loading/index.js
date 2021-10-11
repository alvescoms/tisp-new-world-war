import React from 'react';
// import Image from 'next/image'
import loadingImage from '../../public/images/loading.png'

import { Container, Overlay, ImageLoading, Main, TextLoading } from './styles';

const Loading = ({ text, isLoading, ...rest }) => {

    return (

        isLoading && (

            <Container>
                <Overlay />
                <Main>
                    <ImageLoading src={loadingImage} />
                    <TextLoading>
                        {((text) ? text : '')}
                    </TextLoading>
                </Main>
            </Container>

        )

    );

};


export default Loading;