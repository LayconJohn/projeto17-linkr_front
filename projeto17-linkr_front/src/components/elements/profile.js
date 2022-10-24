// import axios from "axios"
// import  { useNavigate, useParams } from "react-router-dom"
// import { useEffect, useState } from "react"
// import styled from "styled-components"

// import Header from "../common/Header";

// export default function ProfileId(){
//     const { id } = useParams();
//     const [ posts, setPosts ] = useState([])
//     return(
//         <>
//             <Header />
//             <UsernamePost />
//             <UserPosts posts={posts} setPosts={setPosts} />
//         </>
//     )
// }

// function UsernamePost(){
//     useEffect(() => {
//         const url = "http://localhost:5000/users"
//         const promise = axios.get(url)
//         promise.then(resposnse => {
//             const {data} = resposnse
//         })
//     }, [])
//     return(
//         <>
//             <Username>
//                 <img src={data.username} alt="foto" />
//                 <p>Admin's posts</p>
//             </Username>
//         </>
//     )
// }

// function UserPosts({posts, setPosts}){
//     useEffect(() => {
//         const url = "http://localhost:5000/publications"
//         const promise = axios.get(url)
//         promise.then(response => {
//             const {data} = response
//             setPosts(data)
//         })
//         promise.catch((err) => {
//             console.log(`Erro ${err.response.status}, ${err.data}`)
//         })
//     }, [])
//     console.log(posts)
//     return(
//         <>
//             {/* <ListPosts> */}
//                 {/* {posts.map((post) => <Posts   />)} */}
//             {/* </ListPosts> */}
//         </>
//     )
// }

// // function Posts()

// const Username = styled.div`
//     img{
//         border-radius: 27px;

//         width: 50px;
//         height: 50px;
//     }
// `