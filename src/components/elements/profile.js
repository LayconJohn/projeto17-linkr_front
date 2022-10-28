import axios from "axios"
import  { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import styled from "styled-components"

import Header from "../common/Header";
import PostSection from "../common/PostSection";

export default function ProfileId({user}){
    const { id } = useParams();
    const [ posts, setPosts ] = useState([])
    return(
        <>
            <Header />
            <UserPosts name={user.name} image={user.image} posts={posts} setPosts={setPosts} />
        </>
    )
}


function UserPosts({name, image, posts, setPosts}){
    useEffect(() => {
        const url = "http://localhost:5000/publications"
        const promise = axios.get(url)
        promise.then(response => {
            const {data} = response
            setPosts(data)
        })
        promise.catch((err) => {
            console.log(`Erro ${err.response.status}, ${err.data}`)
        })
    }, [])
    console.log(posts)
    return(
        <>
            <Username>
                <img src={image} alt="image" />
                <h1>{name}'s posts </h1>
            </Username>
            <Container>
                {posts.length === 0 ? "Esse usuário ainda não fez publicações" :
                    posts.map((post) => {
                        return <PostSection 
                            key={post.id}
                            username={post.username}
                            description={post.description}
                            link={post.link}
                            likes={post.likes}
                            publicationId={post.id}
                        />
                    })
                }
            </Container>
        </>
    )
}

const Username = styled.div`
    color: #FFF;
    font-size: 27px;
    font-weight: bold;
    
    width: 100%;
    margin-top: 125px;
    margin-left: 30%;

    img{
        border-radius: 26px;

        width: 50%;
        height: 50%;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 15vh;
    position: relative;
`;