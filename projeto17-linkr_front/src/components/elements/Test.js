import styled from "styled-components";

function Test() {
    return (
        <>
            <Texto>Rodando..</Texto>
        </>
    )
}

const Texto = styled.h1`
    font-size: 50px;
    color: green;
`;

export {Test};