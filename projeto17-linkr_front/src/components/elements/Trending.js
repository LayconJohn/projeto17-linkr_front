import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactHashtag from "@mdnm/react-hashtag";

import { listTrendingHashtags } from "../../services/linkr.js";

export default function Trending() {
    //state
    const [hashtags, sethashtags] = useState([]);

    //hooks
    const navigate = useNavigate();

    //logic
    useEffect(() => {
        listTrendingHashtags()
            .then((res) => {
                //console.log(res.data);
                sethashtags(res.data);
            })
            .catch((err) => {
                console.log("Error: Não foi possível carregar as trendings");
            })
    }, [])

    //render
    return (
        <TrendingSpace> 
            <h3>Trending</h3>
            <SeparatingEdge></SeparatingEdge>
            {hashtags.map((hashtag, index) => {
                return <p key={hashtag.id} onClick={(e) => navigate(`/hashtag/${hashtag.name}`)}>
                    # {hashtag.name}
                </p>
            })}
        </TrendingSpace>
    )
};

const TrendingSpace = styled.div`
    width: 301px;
    height: 406px;
    background-color: #171717;
    color: #FFFFFF;
    position: absolute;
    top: 4px;
    right: 100px;
    border-radius: 16px;

    h3 {
        font-size: bold;
        font-size: 27px;
        margin: 9px 0px 12px 16px;
    }

    p {
        font-size: bold;
        font-size: 20px; 
        margin: 5px 16px;
        scale: 0.9;
        cursor: pointer;
    }

    p:hover {
        scale: 1;
    }

    p:active {
        transform: translateY(1px);
    }
`;

const SeparatingEdge = styled.div`
    width: 302px;
    background-color: #484848;
    border: 1px solid #484848;
    margin-bottom: 22px;
`;