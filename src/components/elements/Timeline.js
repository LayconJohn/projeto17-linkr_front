import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import styled from "styled-components";

import Modal from "react-modal";
import { AiOutlineHeart } from "react-icons/ai";
import { IoTrashSharp } from "react-icons/io5";
import { TailSpin } from "react-loader-spinner";

import { BASE_URL } from "../../services/linkr";
import Header from "../common/Header";

export default function Timeline(){

    const [ publications, setPublications ] = useState(null);

    const [ publishing, setPublishing ] = useState("");

    const [ deletingPublication, setDeletingPublication ] = useState(false);

    const [ loadingPublication, setLoadingPublication ] = useState(true);

    const [ newPublicationData, setNewPublicationData ] = useState({
        link: "", 
        description: ""
    });

    const [modalIsOpen, setIsOpen] = useState(false);


    function openModal() {
        setIsOpen(true);
        setDeletingPublication(true)
    }

    function closeModal() {
        setIsOpen(false);
        setDeletingPublication(false)
    }

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '30px',
          height: "300px",
          width: "450px",
          
        },
      };

     useEffect(() => {

        const promise = axios.get(`http://localhost:4000/timeline`);

        promise.then( res => {
            setPublications(res.data);
            setLoadingPublication(false);
            
        });

        promise.catch( error => {
            return(
                window.alert(
                    "An error occured while trying to fetch the posts, please refresh the page"
                )
            )
        });

     }, [publications]);

    function sendPublication(event){

        event.preventDefault();

        setPublishing("disabled");

        const { link, description } = newPublicationData;

        if(link === ""){
            return window.alert("o campo 'link' é obrigatório!");
        }

        const expression =  /^https?:\/\/(?:www.)?[-a-zA-Z0-9@:%.+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%+.~#?&/=]*)/;
        const regex = new RegExp(expression);

        if (!link.match(regex)) {
            setPublishing("");
            return alert("O campo 'http://...' deve ser preenchido com um link!");
        };


        const body = { link, description, userId: 1 };
        const config = {
            header: {
                "Authorization": `Bearer ${"token"}`
            }
        };

        const promise = axios.post(`http://localhost:4000/timeline`, body, config);

        promise.then( res => {
            setPublishing("");
            window.alert("Postagem feita com sucesso!");
            setNewPublicationData({link: "", description: ""});
        });

        promise.catch( res => {
            setPublishing("");
            return window.alert("Houve um erro ao publicar seu link.")
        });
    }

    async function deletePublication(id){

        const body = {id: id};

        try {

            await axios.delete(`http://localhost:4000/timeline/publication/${id}`, body);
            window.alert("Publicação deletada com sucesso!");

        } catch (error) {
            console.log(error);
            window.alert("Houve um erro ao publicar seu link.");
        }
        setIsOpen(false);
        setDeletingPublication(false);
        return;
    }

    async function checkIfImageExists(image, callback){

        const img = new Image();
        img.src = image;

        if (img.complete) {
            callback(true);
        } else {
            img.onload = () => {
                callback(true);
            };
            
            img.onerror = () => {
                callback(false);
            };
        }
    }

    return(
        <>
            <TransparentSkin deletingPublication={deletingPublication}/>
            <Header />
            <Container>
                <PublishSection>

                    <ProfilePicture>
                        <img src={''} alt={''} />
                    </ProfilePicture>

                    <Publish disabled={publishing}> 

                        <PublicationLabel>
                            <h2>What are you going to share today?</h2>
                        </PublicationLabel>

                        <Form onSubmit={sendPublication}>

                            <input 
                                required
                                type="text"
                                name="link"
                                value={newPublicationData.link}
                                placeholder="http://..."
                                onChange={e => setNewPublicationData({...newPublicationData, link: e.target.value})}
                            />

                            <input 
                                type="text"
                                name="description"
                                value={newPublicationData.description}
                                placeholder="Awesome article about #javascript"
                                onChange={e => setNewPublicationData({...newPublicationData, description: e.target.value})}
                            />
                            <button type="onSubmit">{publishing? "Publishing" : "Publish"}</button>
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

                        {
                            publications.map( (publication, index) => {
    
                                const { id, username, description, whoLiked, profilePicture, metadata } = publication;
                                const { title, descriptionLink, image, url } = metadata[0];

                                checkIfImageExists(image, (exists) => {
                                        return publication = {...publication, isValidImage: exists};
                                });

                                return(
                                    <>
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
                                        
                                        <PublicationContent>
                                            <PostInfos>
                                                <UserName>
                                                    <h2>{username}</h2>
                                                    <IoTrashSharp onClick={ () => openModal()}/>

                                                </UserName>
                                                <Description>
                                                    <h3>{description}</h3>
                                                </Description>
                                            </PostInfos>
                                           
                                                <PostContent onClick={() => window.open(url, title)}>
        
                                                    <LinkInfos>
                                                        <h3>{title}</h3>
                                                        <h4>{descriptionLink}</h4>
                                                        <h5>{url}</h5>
                                                    </LinkInfos>
                                                    <ImageLink>
                                                        <img 
                                                            src={
                                                                publication.isValidImage?
                                                                image
                                                                :
                                                                "https://www.abopr.org.br/site/wp-content/themes/abopr/assets/images/noimg.jpg"
                                                            } alt={image}/>                                                    
                                                    </ImageLink>
        
                                                </PostContent>
                                            
                                        </PublicationContent> 
                                    </Publication>    
                                    {

                                        deletingPublication?
                        
                                        <div>
                                            <Modal
                                                isOpen={modalIsOpen}
                                                onRequestClose={closeModal}
                                                style={customStyles}
                                                contentLabel="Example Modal"
                                            >
                                                <div>Are you sure you want to delete this post?</div>
                                                <button onClick={() => deletePublication(id)}>Yes, delete it</button>
                                                <button onClick={closeModal}>No, go back</button>
                                            </Modal>
                                        </div>
                                        :
                                        <></>
                                    }
                                    </>
                                     
                                )

                                
                                
                            })
                        }            
    
                    </PostsSections> 
                    :
                    <p>There are no posts yet</p>
                }
            </Container>
        </>
    );
} 

const TransparentSkin = styled.div`
    height: 100%;
    width: 100%;
    z-index: 4;
    background-color: rgba(255,255,255,0.8);
    display: ${(props) => props.deletingPublication? "none" : ""};
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

const Publish = styled.fieldset`
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
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    font-size: 22px;

    svg{
        font-size: 20px;
        color: #FFFFFF;
    }
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
    cursor: pointer;

    a{
        width: 100%;
        border-radius: 10px;
    }
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
    img{
        height: 100%;
        width: 100%;
        border-radius: 0 6px  6px 0;
    }
`;
