import Image from 'next/image'
import { Container, Footer, Logo } from './styles';

const FooterComponent = () => {

    return (

        <Container>
            <Footer>
                <a href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" target="_blank" rel="noreferrer">
                    Powered by{' '}
                    <Logo>
                        <Image src="/vercel.svg" alt="TISP - This is Sparta" width={72} height={16} />
                    </Logo>
                </a>
            </Footer>
        </Container>

    );

}

export default FooterComponent;