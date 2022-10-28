import { Link, useNavigate } from "react-router-dom";
import Container from "../common/Container";
import Inputs from "../common/Inputs";
import { useState } from "react";
import { LinkWrap } from "./SignUp";
import Cover from "../common/Cover";
import { Wrapper } from "./SignUp";
import axios from "axios";
import { BASE_URL } from "../../services/linkr";



function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [disable, setDisable] = useState(false)
    const [textButton, setTextButton] = useState("Log In")
    const [member, setMember] = useState('')

    const navigate = useNavigate();

    

    async function LogIn(e) {
        e.preventDefault();
        setDisable(true);
        setTextButton("...")

        const body = {
            email, password
        }

        try {
            const promise = await axios.post(`${BASE_URL}/sign-in`, body);
            console.log(promise.data);
            const memberSerializado = JSON.stringify({ ... promise.data })
            localStorage.setItem('linkr', memberSerializado)
            const memberStorage = JSON.parse(localStorage.getItem('linkr'));
            setMember(memberStorage)
            navigate("/timeline");

        } catch (error) {
            console.log(error.message);
            window.alert("Não foi possível realizar o login")
            window.location.reload(false);
        }

    }

    return (
        <>
            <Wrapper>
                <Cover />
                <Container>
                    <form onSubmit={LogIn}>
                        <Inputs>
                            <input required disabled={disable} type="email" placeholder="e-mail" value={email} onChange={e => setEmail(e.target.value)} />
                            <input required disabled={disable} type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                            <button type="submit">{textButton}</button>
                        </Inputs>
                    </form>
                    <Link to="/sign-up">
                        <LinkWrap>
                            First time? Create an account!
                        </LinkWrap>
                    </Link>
                </Container>
            </Wrapper>
        </>

    )
}

export default SignIn;