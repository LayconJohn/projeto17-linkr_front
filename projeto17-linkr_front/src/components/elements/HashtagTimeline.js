import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import PostSection from "../common/PostSection";

import Header from "../common/Header";
import Trending from "./Trending";

import { listPublicationsByHashtag } from "../../services/linkr";

export default function HashtagTimeline() {
    //state
    const [publications, setPublications] = useState([]);

    //hooks
    const {hashtag} = useParams();

    //logic
    useEffect(() => {
        //console.log(hashtag)
        listPublicationsByHashtag(hashtag)
            .then((res) => {
                console.log('Rota para: ' + hashtag)
                console.log(res.data)
                setPublications(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [hashtag])

    //render
    return (
        <>  
            <Header />
            <TitleHashtag>
                # {hashtag}
            </TitleHashtag>
            <Container>

                {publications.length === 0 ? "Não existem publicações com essa hashtag" :
                publications.map((publication) => {
                    return <PostSection 
                        username={publication.username}
                        description={publication.description}
                        link={publication.link}
                    />
                    })
                }

            <Trending />

            </Container>
            
        </>

    )
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 15vh;
    position: relative;
`;

const TitleHashtag = styled.div`
    width: 100%;
    font-size: 27px;
    font-weight: bold;
    color: #FFF;
    margin-top: 125px;
    margin-left: 30%;
`;

