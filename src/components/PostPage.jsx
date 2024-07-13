import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { editPost } from "../store/postsSlice";
import { api } from "../store/api";

const PostPage = ({ posts, handleDelete }) => {
    const [edit, setEdit] = useState(false);
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");

    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);
    const dispatch = useDispatch();

    useEffect(() => {
        if (post) {
            setPostTitle(post.title);
            setPostBody(post.body);  // Correctly set postBody here
        }
    }, [post]);  // Add post to dependency array

    const navigate = useNavigate();
     async function handaleEdit(){
        try {
            await api.put(`/posts/${post.id}`,{
                postTitle,
                postBody
            })
            dispatch(editPost({...post, postTitle, postBody}))
        } catch (error) {
            
        }
    }
    
    return (
        <main className="PostPage">
            <article className="post">
                {post ? (
                    <>
                        {edit ? (
                            <form>
                                <input 
                                    type="text" 
                                    name="postTitle" 
                                    value={postTitle} 
                                    onChange={e => setPostTitle(e.target.value)} 
                                />
                                <textarea 
                                    name="postBody"  
                                    rows="5" 
                                    value={postBody} 
                                    onChange={e => setPostBody(e.target.value)} 
                                />
                            </form>
                        ) : (
                            <>
                                <h2>{post.title}</h2>
                                <p className="postDate">{post.datetime}</p>
                                <p className="postBody">{post.body}</p>
                            </>
                        )}
                        <button className="danger" onClick={() => handleDelete(post.id)}>
                            Delete
                        </button>
                        <button onClick={() => {
                            if (edit) {
                               
                                
                            }
                            setEdit(!edit);
                        }}>
                            {edit ? "Save" : "Edit"}
                        </button>
                        <button onClick={() => navigate(-1)}>
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing.</p>
                        <p>
                            <Link to='/'>Visit Our Homepage</Link>
                        </p>
                    </>
                )}
            </article>
        </main>
    );
};

export default PostPage;
