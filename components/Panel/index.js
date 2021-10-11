import { Container } from './styles';

const PanelComponent = ({children}) => {

    return (

        <Container>
            {children}
        </Container>

    );

}

export default PanelComponent;