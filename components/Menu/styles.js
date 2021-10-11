import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
`

export const List = styled.ul`
    list-style: none;
    width: 460px;
    padding: 0;
`

export const Item = styled.li`
    cursor: pointer;
    border: 1px solid;
    padding: 20px;
    text-align: center;
    margin-top: 10px;
    border-radius: 40px;
    font-size: 20px;

    &:hover {
        background: #3a3a3a52;
        transition: 0.3s;
    }
`

export const Link = styled.a`
    text-decoration: none;
`