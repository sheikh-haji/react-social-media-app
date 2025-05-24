import { Link,Routes ,Route,useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Post from "./Post";
import { format } from 'date-fns';
import PostLayout from "./PostLayout";
import api from "./api/posts"
import EditPost from "./EditPost";
import useWindowSize from "./customhook/useWindowSize";
import useAxiosFetch from "./customhook/useAxiosFetch";

function App() {
        const [search,setSearch]=useState('');
        const navigate = useNavigate(); 
const [posts, setPosts] = useState([]);
const [searchResults,setSearchResults]=useState([]);
const[postTitle,setPostTitle]=useState('');
const [postBody,setPostBody]=useState('');
const[editTitle,setEditTitle]=useState('');
const [editBody,setEditBody]=useState('');
const {width}=useWindowSize()

const handleSubmit =async( e)=>{
        e.preventDefault();
        const id=posts.length?posts[posts.length-1].id+1:1;
        const datetime=format(new Date(),'MMMM dd, yyyy pp');
        const newPost={id,title:postTitle,datetime,body:postBody};
        const response=await api.post("/posts",newPost);
        console.log(response)
        const allPosts=[...posts,newPost];
        setPosts(allPosts);
        setPostTitle('');
        setPostBody('');
         navigate("/");
}

 useEffect(
      ()=>{
        const filteredResults=posts.filter((post)=>
        ((post.body).toLowerCase()).includes(search.toLowerCase())
|| ((post.title).toLowerCase()).includes(search.toLowerCase()));
       setSearchResults(filteredResults.reverse());
      }  
 ,[posts,search])
 const {data,fetchError,isLoading}=useAxiosFetch("https://683164ce6205ab0d6c3c206c.mockapi.io/posts");
 useEffect(()=>{
        setPosts(data);
 },[data]);
// useEffect(()=>{
//         const fetchPost=async()=>{
//                 try{
//                         const response=await api.get('/posts');
//                         setPosts(response.data);
                       

//                 }catch(err){
//                         if(err.response){
//                                 console.log(err.response.data);
//                                 console.log(err.response.status)
//                                 console.log(err.response.Header);

//                         }else{
//                                 console.log(`Error:${err.message}`);

//                         }
//                 }
//         }
//         fetchPost();
// },[])
const handleDelete=async (id)=>{
     try{
        await api.delete(`posts/${id}`);
        const postsList=posts.filter(post=>post.id!==id);
     setPosts(postsList);
     navigate("/");
     }
     catch(err){
        console.log(`Error: ${err.message}`);
     }
    
}
const handleEdit=async(id)=> {
        const datetime=format(new Date(),'MMMM dd, yyyy pp');
        const updatedPost={id,title:editTitle,datetime,body:editBody};
        try{
                const response=await api.put(`/posts/${id}`,updatedPost);
                setPosts(posts.map(post=>post.id===id?{updatedPost}:post));
                setEditTitle('');
                setEditBody('');
                navigate('/');

        }
        catch(err){
                  console.log(`Error: ${err.message}`);
        }
}

return(
       <div className="App">
                                                       
                <Header title="Blog Website" width={width}/>
                <Nav 
                        search={search}
                        setSearch={setSearch}/> 
                
                <Routes>
                       <Route path="/" element={<Home posts={searchResults}/>}/>
                        
                                <Route path="/post"  element={<NewPost 
                                        handleSubmit={handleSubmit}
                                        postTitle={postTitle}
                                        setPostTitle={setPostTitle}
                                        postBody={postBody}
                                        setPostBody={setPostBody}/>}/>
                                <Route path="post/:id" element={<PostPage posts={posts} handleDelete={handleDelete}/>}/>
                         <Route path="/edit/:id" element={<EditPost
                                posts={posts}
                                handleEdit={handleEdit}
                                editBody={editBody}
                                setEditBody={setEditBody}
                                editTitle={editTitle}
                                setEditTitle={setEditTitle}
                        /> }/>
                        <Route path="about" element={<About />}/>
                        <Route path="*" element={<Missing />}/>
                </Routes>
               
                <Footer />
        </div>
        )
}
export default App;