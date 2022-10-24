import styled from "styled-components";


function Inputs ({children}){
    return (
        <InputsWrapper>
            {children}
        </InputsWrapper>

    )
}

const InputsWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;


input {
    width: 100%;
    height: 65px;
    background-color: #FFFFFF;
    border: 1px solid #333333;
    border-radius: 6px;
    padding-left: 15px;
    margin-bottom: 13px;
    &::placeholder {
        font-family: 'Oswald';
        font-weight: 700;
        font-size: 27px;
        color: #9F9F9F;
   }
}


button {
    
    width: 100%;
    height: 65px;
    background-color: #1877F2;
    border: 1px solid #333333;
    border-radius: 6px;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    margin-bottom: 24px;
    margin-top: 8px;

}

`;


export default Inputs;