import { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import axios from "axios";
import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import { useScrapper } from "react-tiny-link";
import { TailSpin } from "react-loader-spinner";

import { BASE_URL } from "../../services/linkr";
import Header from "../common/Header";

export default function Timeline(){

    const [ publications, setPublications ] = useState(null);

    const [ loadingPublication, setLoadingPublication ] = useState(true);

    const [ newPublicationData, setNewPublicationData ] = useState({
        link: null, 
        description: null
    });

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(null);

     useEffect(() => {

        const promise = axios.get(`http://localhost:4000/timeline?page=1`);
        promise.then( res => {
            setLoadingPublication(false);
            setPublications(res.data.publications);
            setPage(res.data.page);
        });
        promise.catch( error => {

            console.log("ERROR")
            return(
                window.alert(
                    "An error occured while trying to fetch the posts, please refresh the page"
                )
            )
        });

     });

    async function sendPublication(event){

        event.preventDefault();

        const { link, description } = newPublicationData;

        if(link === null){
            return window.alert("o campo 'link' é obrigatório!");
        }

        const body = { link, description, userId: 1 };
        const config = {
            header: {
                "Authorization": `Bearer ${"token"}`
            }
        };

        try {
            /* await axios.post(`${BASE_URL}/timeline`, body, config); */

            await axios.post(`http://localhost:4000/timeline`, body, config);
            window.alert("Postagem feita com sucesso!");
        } catch (error) {
            console.log(error);
            return window.alert("Houve um erro ao publicar seu link.")
        }
    }

    function loadMorePublications() {
        setLoadingPublication(true);
        const promise = axios.get(`http://localhost:4000/timeline?page=${2}`);
        promise.then( res => {
            setLoadingPublication(false);
            setPublications(res.data.publications);
            setHasMore(res.data.isTheLast);
        });
        promise.catch( error => {

            console.log("ERROR")
            return(
                window.alert(
                    "An error occured while trying to fetch the posts, please refresh the page"
                )
            )
        })
    }

    //render
    return(
        <>
            <Header />
            <ScrollPage>
            <Container>
                <PublishSection>

                    <ProfilePicture>
                        <img src={''} alt={''} />
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
                                onChange={e => setNewPublicationData({...newPublicationData, link: e.target.value})}
                            />

                            <input 
                                type="text"
                                name="description"
                                placeholder="Awesome article about #javascript"
                                onChange={e => setNewPublicationData({...newPublicationData, description: e.target.value})}
                            />
                            <button type="onSubmit">Publish</button>
                        </Form>
                    </Publish>

                    
                </PublishSection>

                {
                    loadingPublication?

                    <TailSpin
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    />

                    :
                    publications?
                        
                    <PostsSections>
                        <InfiniteScroll
                            pageStart={page}
                            loadMore={loadMorePublications}
                            hasMore={hasMore}
                            loader={<TailSpin
                                height="80"
                                width="80"
                                color="#4fa94d"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                />}
                            useWindow={false}
                        >
                        {
                            publications.map( (publication, index) => {
    
    
                                const { username, link, description, whoLiked, profilePicture } = publication;
    
                                return(
                                    <Publication key={index}>
                                        <User>
                                            <ProfilePicture>
                                                <img src={profilePicture} alt={profilePicture} />
                                            </ProfilePicture>
                                            {
                                                whoLiked?
                                                <>
                                                    <AiOutlineHeart/>
                                                    <Likes>{whoLiked}</Likes>
                                                </>
                                                :
                                                <></>
                                            }
                                        </User>
    
                                        <PublicationContent key={index}>
                                            <PostInfos>
                                                <UserName>
                                                    <h2>{username}</h2>
                                                </UserName>
                                                <Description>
                                                    <h3>{description}</h3>
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
                                                    <h5>{link}</h5>
                                                </LinkInfos>
                                                <ImageLink>
    
                                                </ImageLink>
    
                                            </PostContent>
                                            
                                        </PublicationContent> 
                                    </Publication>     
                                )
                                
                            })
                        } 
                        </InfiniteScroll>

           
    
                    </PostsSections> 
                    :
                    <p>There are no posts yet</p>
                }             

            </Container>
            </ScrollPage>

        </>
    );
} 

const ScrollPage = styled.div`
    height:700px;
    overflow:auto;
`;

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 15vh;
    z-index: 1;
`;

const ProfilePicture = styled.div`
    height: 45px;
    width: 45px;
    img{
        height: 100%;
        width: 100%;
        border-radius: 100%;
    }
    
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
        border: none;
        border-radius: 5px;
        color: #FFFFFF;

        position: absolute;
        bottom: 0;
        right: 0;
    }
`;

// Posts

const PostsSections = styled.div`
    height: 100%;
    width: 40%;
    box-sizing: border-box;
    margin-bottom: 30px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    font-family: 'Lato', sans-serif;
    font-weight: 300;
    color: #FFFFFF;

`;

const Publication = styled.div`
    height: 250px;
    width: 100%;
    margin-bottom: 8%;
    padding: 20px;
    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    background: #171717;
    border-radius: 15px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    position: relative;

`;

const User = styled.div`
    height: 40%;
    width: 20%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    svg{
        font-size: 20px;
    }

`;

const Likes = styled.div`

`;

const PublicationContent = styled.div`
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    position: relative;
`;

const PostInfos = styled.div`

    width: 100%;

    display: grid;
    grid-template-rows: 1fr 4fr;
    
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: wrap;

    h3{
        color: #B7B7B7;
    }
`;
    
const UserName = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;

    font-size: 22px;
`;

const Description = styled.div`

    width: 100%;
    display: flex;
    align-items: center;
    font-size: 17px;
    flex-wrap: wrap;
    overflow: hidden;
`;

const PostContent = styled.div`
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

    padding: 20px 20px;
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
        line-height: 16px;
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
    border-radius: 0 8px  8px 0;
`;
