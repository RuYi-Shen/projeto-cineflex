import styled from "styled-components";
import { useNavigate, useLocation } from 'react-router-dom';
import backIcon from "../../assets/back-icon.png";

export default function Header() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <Title>
            { pathname !== "/" ?
                <button onClick={()=>navigate(-1)}>
                    <img src={backIcon} alt="back-icon" />
                </button> 
                :
                <></>
            }
            <h1>CINEFLEX</h1>
        </Title>
    );
}

const Title = styled.header`
    
    position: fixed;
    width: 100vw;
    height: 67px;
    left: 0px;
    top: 0px;
    
    display: flex;
    align-items: center;
    justify-content: center;

    background: #C3CFD9;

    z-index: 1;

    button {
        position: absolute;
        top: calc(67px/2 - 20px);
        left: 10px;
        background: none;
        border: none;
        
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }

    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 34px;
        line-height: 40px;
        display: flex;
        align-items: center;
        text-align: center;

        color: #E8833A;
    }  
`;