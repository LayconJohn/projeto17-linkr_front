import styled from 'styled-components';
function Container(props) {
    return (
        <Conteudo display={props.display}>
            {props.children}
        </Conteudo>
    )
}


const Conteudo = styled.div`
	width: 45%;
    height: 100vh;
	background-color: #333333;
    display: ${props => props.display ? props.display : "flex"};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    form {
        width: 100%;
        max-width: 420px;
        padding: 0px 15px;
    }
    @media screen and (max-width: 900px){
    width: 100%;
    height: 492px;
    justify-content: flex-start;
    margin-top: 40px;
    form{
        min-width: 330px;
    }
}
`;




export default Container;