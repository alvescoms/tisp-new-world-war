import Image from 'next/image'
import { Container, Logo } from './styles';

const HeaderComponent = () => {

    return (

        <Container>
            <Logo>
                <Image src="/images/logo.png" width={750} height={210} />
            </Logo>
        </Container>

    );

}

export default HeaderComponent;