import React from 'react'
import "./UserComponent.css";
import { useAuthentication } from '../../hooks/useAuthentication';
import { useState, useEffect } from 'react';

import { Link } from "react-router-dom";


//usuario
import { Avatar, Typography } from '@material-tailwind/react'
import { useAuthValue } from '../../context/AuthContext';
import PostDetail from '../PostDetail';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { storage, db } from '../../firebase/config';
import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const  UserComponent = ({users}) => {
  
  const {user} = useAuthValue();
  const auth = getAuth();
  const [progress, setProgress] = useState(0);
  const [imagemuser, setImagemUser] = useState("");
  const [imageAvatar, setImagemAvatar] = useState("");
  const {documents: posts} = useFetchDocuments("posts");


  useEffect(() => {
    const getUserDocument = async () => {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const image = userData.image ? userData.image : "avatar.png";
        setImageInAvatar(image);
      }
    }

    getUserDocument();

  });

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
    const storageImg = ref(storage, `images/${imagemuser.name}`);
    const uploadImg = uploadBytesResumable(storageImg, imagemuser);

    await uploadImg.on(
      
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        alert(error);
      },
      async () => {
        const urlImage = await getDownloadURL(uploadImg.snapshot.ref);
      
        const docRef = await setDoc(doc(db, "users", user.uid),{
          nome: user.displayName,
          email: user.email,
          image: urlImage
        });

        setImageInAvatar(urlImage);

        alert("Foto atualizada com sucesso!");
      }
    );
  } catch(error){
    console.error("Erro ao enviar formulario:", error);
};
}

const handleFileImageUser = (e) => {
  const file = e.target.files[0];
  if(file){
    setImagemUser(file);
  }
}

const setImageInAvatar = (url) => {
  if(url){
    setImagemAvatar(url);
  } else {
    setImagemAvatar("avatar.png");
  }
}
  

  return (
    <>
    <div className="containeruser">
      <div className="avatarUser">
        <Avatar
        variant="circular"
        size='xxl'
        className="border border-gray-900 p-0.5"
        src={imageAvatar}
        />
        <div className='userName'>
          <Typography variant='h6'>{user.displayName}</Typography>
          <Typography variant='paragraph'>{user.email}</Typography>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
        <input className='inputphoto' 
            type="file"
            accept="image/*"
            onChange={handleFileImageUser}
            />
            <div>
            <button className='botaofoto'>Alterar foto</button>
            </div>  
            </form>
        </div>
        
        <div className='biografia'>
          <input
          type='text'
          placeholder='Biografia'
          >
          </input>
        </div>
      </div>
    </div>

    <div className='publicacoesUser'>
      <div>
      <p>Minhas Publicações</p>
      <div></div>
      <div className='publipost'>
      {posts && posts.map((post) => (
        post.creactedBy === user.displayName && (
         <PostDetail key={post.id}post={post}/>
      )))}
      </div>
      </div>
      </div>
    </>
  )
}

export default UserComponent