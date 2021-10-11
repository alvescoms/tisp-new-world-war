import styled from "styled-components";
import Image from "next/image";

export const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;    
`

export const Overlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    background: #00000094;
    z-index: 99998;
`

export const Main = styled.div`
    display: flex;
    padding: 25px;
    justify-content: center;
    align-items: center;
    background: #FFF;
    border-radius: 5px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    flex-direction: column;
    z-index: 99999;
`

export const ImageLoading = styled(Image)`
    margin: 50px;
    animation: loading 8s infinite;

    @keyframes loading {
        50% {
            transform: rotate(360deg);
        }
    }
`

export const TextLoading = styled.span`
    font-size: 22px;
`