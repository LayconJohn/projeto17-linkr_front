import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import {DebounceInput} from 'react-debounce-input';

export default function Header(){
    return(
        <TopBar>
            <div>
                <h1>linkr</h1>
            </div>
            {/* <DebounceInput 
                minLength={3}
                debounceTimeout={300}
                onChange={event => this.setState({value: event.target.value})}/> */}
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
    z-index: 3;
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

// const DebounceInput = styled.div`
//     background-color: #FFFFFF;
//     color: #c6c6c6;
//     font-family: 'Lato', sans-serif;
//     font-size: 19px;
//     font-weight: 400;

//     display: flex;
//     align-items: center;

//     border-radius: 8px;

//     width: 563px;
//     height: 45px;
//     padding-left: 14px;
// `