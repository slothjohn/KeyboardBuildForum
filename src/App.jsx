import { useState, useEffect } from 'react'
import { supabase } from './client';
import './App.css'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import PostPage from "./PostPage";

function App() {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostText, setNewPostText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  
    useEffect(() => {
      fetchPosts();
    }, [posts]);

  
    const fetchPosts = async () => {
      const {data} = await supabase
      .from('Posts')
      .select("*")
      .order('likes', { ascending: sortOrder === 'asc' });
      setPosts(data)
    }
  
    async function createPost() {
      const { data } = await supabase.from('Posts').insert({
        title: newPostTitle,
        description: newPostText,
        likes: 0,
      });
      if (data) {
        setPosts([...posts, data[0]]);
      }
      setNewPostTitle('');
      setNewPostText('');
    }
  
    async function likePost(postId) {
      await supabase
        .from('Posts')
        .update({ likes: posts.find((post) => post.id === postId).likes + 1 })
        .eq('id', postId);
      setPosts([...posts.filter((post) => post.id !== postId)]);
    }
  
    const handleDeletePost = async (postId) => {
        await supabase.from("Posts").delete().eq("id", postId); // delete crewmate
        setPosts(posts.filter((post) => post.id !== postId)); // remove the deleted crewmate
  };  

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    fetchPosts();
  }
  

  return (
      <div className="App">
      <h1>Keyboard Builds</h1>
      <div>
      <input type="text" placeholder="Search by title" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <div className="PostInput">
        <input type="text" placeholder="Title" value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)}/>
        <textarea placeholder="Decription" value={newPostText} onChange={(e) => setNewPostText(e.target.value)}/>
        <button onClick={createPost}>Post</button>
        </div>
        <div className="post-toolbar">
          <button onClick={handleSort}>
            Sort by Likes {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
        {filteredPosts.map((post) => (
          <div key={post.id} className="post-card">
          <Link to={`/post/${post.id}`} className="post-link">
            <h2 className="post-title">{post.title}</h2>
          </Link>
            <p className="post-created">Created {new Date(post.created_at).toLocaleString()}</p>
          <div className="post-likes">{post.likes} Likes</div>
          <button className="post-like-button" onClick={() => likePost(post.id)}>&#128151;</button>
          <button className="post-delete-button" onClick={() => handleDeletePost(post.id)}>&#128465;</button>
        </div>
        ))}
            </div>
    </div>
  )
}

export default App





// A previously created post can be edited from its post page
