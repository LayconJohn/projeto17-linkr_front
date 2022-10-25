import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

function Test() {

    const [ publicationData, setPublicationData ] = useState({
        link: null,
        description: null
    });

    async function sendPublication(event){

        event.preventDefault();

        const { link, description } = publicationData;

        if(link !== null){
            
            const body = { link, description };
            const config = {
                header: {
                    "Authorization": `Bearer ${"token"}`
                }
            };
            const promise = await axios.post("http://localhost:5000/publish", body, config);
            promise.then();
            promise.catch();
        }

    }

    return (
        <>
            <div>
            <h2>What are you going to share today?</h2>
            </div>

            <form onSubmit={sendPublication}>

                <input 
                    required
                    type="text"
                    name="link"
                    placeholder="http://..."
                    onChange={e => setPublicationData({
                        ...publicationData,
                        link: e.target.value
                    })}
                />

                <input 
                    type="text"
                    name="description"
                    placeholder="Awesome article about #javascript"
                    onChange={e => setPublicationData({
                        ...publicationData,
                        description: e.target.value
                    })}
                />

                <button type="onSubmit">Publish</button>
                
            </form>
        </>
    )
}

const Texto = styled.h1`
    font-size: 50px;
    color: green;
`;

export {Test};