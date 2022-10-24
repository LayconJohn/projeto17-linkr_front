import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../common/Container";
import Inputs from "../common/Inputs";
import styled from "styled-components";
import { postSignUp } from "../../services/linkr";
import Cover from "../common/Cover";




function SignUp() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [image, setImage] = useState('')
    const [disable, setDisable] = useState(false)
    const [textButton, setTextButton] = useState("Sign Up")

    const navigate = useNavigate();



    function handleCadastrar(e) {
        e.preventDefault();
        setDisable(true);
        setTextButton("...")

        const body = {
            email, username, password, image
        }


        postSignUp(body).then(response => {
            console.log(response)
            navigate("/sign-in");
        })

        postSignUp(body).catch(() => {
            alert("Não foi possível realizar o cadastro")
            window.location.reload(false)
        })


    }






    return (

        <>
            <Wrapper>
                <Cover />
                <Container>
                    <form onSubmit={handleCadastrar}>
                        <Inputs>
                            <input disabled={disable} type="email" placeholder="e-mail" value={email} onChange={e => setEmail(e.target.value)} />
                            <input disabled={disable} type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                            <input disabled={disable} type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />


                            <input disabled={disable} type="text" placeholder="picture url" value={image} onChange={e => setImage(e.target.value)} />
                            <button disabled={disable} type="submit">{textButton}</button>
                        </Inputs>
                    </form>

                    <Link to="/sign-in">
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