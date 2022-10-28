import styled from "styled-components";
import { BiRefresh } from "react-icons/bi";

export default function newPostsAdvice({ newPosts }) {
    return (
        <Advice>
            <span>{newPosts} new posts, load more </span> <div> <BiRefresh /> </div>
        </Advice>
    )
}

const Advice = styled.div`
    width: 611px;
    height: 61px;
    border-radius: 16px;
    background-color: #1877F2;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 17px;

    span {
        font-size: 16px;
        color: #FFF;
        opacity: 0.9;
    }
`;