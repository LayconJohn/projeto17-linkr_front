import { Link, useNavigate } from "react-router-dom";
import Container from "../common/Container";
import Inputs from "../common/Inputs";
import { useState } from "react";
import { LinkWrap } from "./SignUp";
import Cover from "../common/Cover";
import { Wrapper } from "./SignUp";
import { postSignIn } from "../../services/linkr";



function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [disable, setDisable] = useState(false)
    const [textButton, setTextButton] = useState("Log In")
    const [member, setMember] = useState('')

    const navigate = useNavigate();


    function LogIn(e) {
        e.preventDefault();
        setDisable(true);
        setTextButton("...")

        const body = {
            email, password
        }


        postSignIn(body).then(response => {
            const { data } = response
            console.log(data)
            const memberSerializado = JSON.stringify({ ...data })
            localStorage.setItem('linkr', memberSerializado)
            const memberStorage = JSON.parse(localStorage.getItem('linkr'));
            setMember(memberStorage)
            navigate("/");

        })
        postSignIn(body).catch(response => {
            const { data } = response
            console.log(data);
            alert("Usuário não encontrado")
            window.location.reload(false);
        })

    }



    return (
        <>
            <Wrapper>
                <Cover />
                <Container>
                    <form onSubmit={LogIn}>
                        <Inputs>
                            <input disabled={disable} type="email" placeholder="e-mail" value={email} onChange={e => setEmail(e.target.value)} />
                            <input disabled={disable} type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
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