import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../common/Container";
import Inputs from "../common/Inputs";
import styled from "styled-components";
import Cover from "../common/Cover";
import axios from "axios";
import { BASE_URL } from "../../services/linkr";




function SignUp() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [image, setImage] = useState('')
    const [disable, setDisable] = useState(false)
    const [textButton, setTextButton] = useState("Sign Up")

    const navigate = useNavigate();



    async function handleCadastrar(e) {
        e.preventDefault();
        setDisable(true);
        setTextButton("...")

        const body = {
            email, username, password, image
        }

        try {
            const promise = await axios.post(`${BASE_URL}/sign-up`, body);
            console.log(promise)
            navigate("/");
        }
        catch (error) {
            console.log(error);
            window.alert("Não foi possível cadastrar seu usuário")

        }
    }

    return (

        <>
            <Wrapper>
                <Cover />
                <Container>
                    <form onSubmit={handleCadastrar}>
                        <Inputs>
                            <input required disabled={disable} type="email" placeholder="e-mail" value={email} onChange={e => setEmail(e.target.value)} />
                            <input required disabled={disable} type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                            <input required disabled={disable} type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
                            <input required disabled={disable} type="text" placeholder="picture url" value={image} onChange={e => setImage(e.target.value)} />
                            <button disabled={disable} type="submit">{textButton}</button>
                        </Inputs>
                    </form>

                    <Link to="/">
                        <LinkWrap>
                            Switch back to log in
                        </LinkWrap>
                    </Link>

                </Container>
            </Wrapper>


        </>





    )
}

export default SignUp;


export const LinkWrap = styled.div`
	text-decoration-line: underline;
    color: #FFFFFF;
`;

export const Wrapper = styled.div`
width: 100%;
height: 100%;
display: flex;

@media screen and (max-width: 900px){
    flex-direction: column;
}


`;