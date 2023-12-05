import React from 'react'
import LoginComponent from '../../components/LoginPage/LoginComponent'
import "./HomePage.css";
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import PostDetail from '../../components/PostDetail';

const HomePage = () => {
  const {documents: posts, loading} = useFetchDocuments("posts");

return (

    <div className='homecontainer'>
      <div className='posthome'>
        {loading && <p>Carregando...</p> }
        {posts && posts.map((post) => (
         <PostDetail key={post.id}post={post}/>
))}
      </div>
    </div>
  )
}

export default HomePage