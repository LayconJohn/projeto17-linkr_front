import { useState } from "react";

import axios from "axios";
import styled from "styled-components";
import Header from "../common/Header";

import { AiOutlineHeart } from "react-icons/ai";

export default function Timeline(){

    const [ publicationData, setPublicationData ] = useState({
        link: null, 
        description: null
    });

    async function sendPublication(event){

        event.preventDefault();

        const { link, description } = publicationData;

        if(link === null){
            return window.alert("o campo 'link' é obrigatório!");
        }

        const body = { link, description };
        const config = {
            header: {
                "Authorization": `Bearer ${"token"}`
            }
        };

        try {
            await axios.post("http://localhost:5000/publish", body, config);
            window.alert("Postagem feita com sucesso!");
        } catch (error) {
            console.log(error);
            return window.alert(error.message)
        }

    }

    return(
        <>
            <Header/>
            <Container>
                <PublishSection>

                    <ProfilePicture>

                    </ProfilePicture>

                    <Publish>

                        <PublicationLabel>
                            <h2>What are you going to share today?</h2>
                        </PublicationLabel>

                        <Form onSubmit={sendPublication}>

                            <input 
                                required
                                type="text"
                                name="link"
                                placeholder="http://..."
                                onChange={e => setPublicationData({...publicationData, link: e.target.value})}
                            />

                            <input 
                                type="text"
                                name="description"
                                placeholder="Awesome article about #javascript"
                                onChange={e => setPublicationData({...publicationData, description: e.target.value})}
                            />
                            <button type="onSubmit">Publish</button>
                        </Form>
                    </Publish>

                    
                </PublishSection>

                <PostsSections>

                    <ProfilePicture>
                        <AiOutlineHeart/>
                    </ProfilePicture>


                    <Post>
                        <PostInfos>
                            <UserName>
                                <h2>Nome do Usuário</h2>
                            </UserName>
                            <Description>
                                <h3>Muito maneiro esse tutorial de Material UI com React, deem uma olhada! #react #material</h3>
                            </Description>
                        </PostInfos>
                        
                        <PostContent>

                            <LinkInfos>
                                <h3>Como aplicar o Material UI em um projeto React</h3>
                                <h4>
                                    Hey! I have moved this tutorial to my personal blog. 
                                    Same content, new location. 
                                    Sorry about making you click through to another page.
                                </h4>
                                <h5>https://medium.com/@pshrmn/a-simple-react-router</h5>
                            </LinkInfos>
                            <ImageLink>

                            </ImageLink>

                        </PostContent>
                        
                    </Post>              
                </PostsSections>

                
            </Container>
        </>
    );
} 

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 15vh;
`;

const ProfilePicture = styled.div`
    height: 100%;
    width: 60px;
    background-color: #876525;
`;

const PublishSection = styled.div`
    height: 270px;
    width: 40%;
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 40px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    font-family: 'Lato', sans-serif;
    font-weight: 300;
    color: #707070;

    background-color: #FFFFFF;
    border-radius: 15px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Publish = styled.div`
    height: 100%;
    width: 100%;
    padding-left: 8%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;

    position: relative;
`;

const PublicationLabel = styled.div`
    height: 24%;
    font-size: 22px;
`;

const Form = styled.form`
    height: 75%;
    width: 100%;
    padding-bottom: 50px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    input{
        height: 50px;
        width: 100%;

        padding: 10px;
        box-sizing: border-box;
        border: none;
        border-radius: 5px;

        font-size: 15px;
        color: #949494;
        background: #EFEFEF;
    }
    button{
        height: 35px;
        width: 150px; 

        background: #1877F2;
        border-radius: 5px;
        color: #FFFFFF;

        position: absolute;
        bottom: 0;
        right: 0;
    }
`;

// Posts

const PostsSections = styled.div`
    height: 330px;
    width: 40%;
    padding: 20px;
    box-sizing: border-box;
    ]margin-bottom: 30px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    font-family: 'Lato', sans-serif;
    font-weight: 300;
    color: #FFFFFF;

    background: #171717;
    border-radius: 15px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Post = styled.div`
    height: 100%;
    width: 100%;
    padding-left: 8%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    position: relative;
`;

const PostInfos = styled.div`
    height: 35%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;

    h3{
        color: #B7B7B7;
    }
`;
    
const UserName = styled.div`
    height: 35%;
    font-size: 22px;
`;

const Description = styled.div`
    height: 60%;
    font-size: 22px;
`;

const PostContent = styled.div`
    height: 60%;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    border: 1px solid #4D4D4D;
    border-radius: 10px;
`;

const LinkInfos = styled.div`
    height: 100%;
    width: 70%;

    padding: 25px 20px;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h3{
        font-size: 18px;
        color: #CECECE;
        line-height: 19px;
    }
    h4{
        color: #9B9595;
        line-height: 15px;
    }
    h4, h5{
        font-size: 12px;
        color: #CECECE;
    }
`;

const ImageLink = styled.div`
    height: 100%;
    width: 30%;
    background-color: blue;
`;