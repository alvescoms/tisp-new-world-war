import Link from 'next/link'
import { IconName } from "react-icons/fa";
import { Container, List, Item } from './styles';

const MenuComponent = ({itens}) => {

    return (

        <Container>
            <List>
                {itens.map((item, index) => <Link key={index} href={item.link}><Item>{item.name}</Item></Link>)}
            </List>
        </Container>

    );

}

export default MenuComponent;