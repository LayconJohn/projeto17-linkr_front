import styled from "styled-components"



function Cover() {
    return (
        <Title>
            <h1>linkr</h1>
            <h2>save, share and discover
                the best links on the web</h2>
        </Title>
    )
}



const Title = styled.div`

height: 100vh;
width: 55%;
display: flex;
flex-direction: column;
justify-content: center;
background-color: #151515;
padding-left: 10%;


h1{
    font-family: 'Passion One';
    font-weight: 700;
    font-size: 106px;
    line-height: 117px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
}
h2 {
    font-family: 'Oswald';
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    width: 442px;
    height: 128px;
    color: #FFFFFF;
}
@media screen and (max-width: 900px){
    width: 100%;
    align-items: center;
    padding: 20px 0px;
    height: 175px;
    h1{
        font-size: 76px;
        line-height: 84px;
    }
    h2{
        width: 237px;
        height: 68px;
        font-size: 23px;
        line-height: 34px;
    }
}


`;

export default Cover