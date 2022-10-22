import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";

export default function Header(){
    return(
        <TopBar>
            <div>
                <h1>linkr</h1>
            </div>
            <div>
                <IoIosArrowDown/>
                <img src={''} alt={''}/>
            </div>
        </TopBar>
    );
}

const TopBar = styled.div`
    height: 10vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    index: 3;
    padding: 2%;
    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    font-family: 'Passion One';
    font-weight: 700;
    font-size: 50px;
    color: #FFFFFF;
    background-color: #151515;

    svg{
        font-size: 30px;
    }
`;
