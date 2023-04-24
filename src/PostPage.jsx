import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from './client';
import './PostPage.css'


function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  
    useEffect(() => {
      async function fetchPost() {
        const { data, error } = await supabase
          .from('Posts')
          .select('*')
          .eq('id', postId)
          .single();
          setPost(data);
      }
      fetchPost();
    }, [postId, post]);
  
    async function addComment() {
      const newComment = {
        text: commentText,
        created_at: new Date().toISOString()
      };
      const updatedComments = Array.isArray(post.comments) ? [...post.comments, newComment] : [newComment];
      
      const { data } = await supabase
        .from('Posts')
        .update({ comments: updatedComments })
        .eq('id', postId)
        .single();
        setPost(data);
        setCommentText("");
    }
  
    async function updatePost() {
      const { data, error } = await supabase
        .from('Posts')
        .update({
          title: newTitle,
          description: newDescription
        })
        .eq('id', postId)
        .single();
      setPost(data);
      setIsEditMode(false);
    }


    if (!post) {
      return <div>Loading...</div>;
    }

  
    return (
      <div className="post-page">
        {isEditMode ? (
          <div className="post-editor">
            <input type="text" placeholder="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            <textarea placeholder="Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
            <button onClick={updatePost}>Save</button>
          </div>
        ) : (
            <div>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <div className="post-info">
          <div>Created at: {new Date(post.created_at).toLocaleString()}</div>
          <div>{post.likes} &#128151; Likes</div>
              </div>
              <button onClick={() => setIsEditMode(true)}>Edit</button>
            </div>
        )}


        <div className="comment-section">
        <h2>Comments</h2>
        <div className="comment-list">
          {post.comments && post.comments.map((comment, index) => (
            <div key={index} className="comment">
              <div className="comment-text">{comment.text}</div>
              <div className="comment-created">{new Date(comment.created_at).toLocaleString()}</div>
            </div>
          ))}
        </div>
        <div className="comment-input">
          <textarea
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button onClick={addComment}>Comment</button>
        </div>
        </div>
        <Link to="/">Go back to home page</Link>
      </div>
    );
  }
  
export default PostPage;



  
      // const handleUpdateCrewmate = async (crewmateId, updatedCrewmate) => {
    //     await supabase
    //       .from("Posts")
    //       .update(updatedCrewmate)
    //       .eq("id", crewmateId); 
    //     fetchCrewmates();
    // };
  