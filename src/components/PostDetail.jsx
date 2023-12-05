import { Avatar } from "@material-tailwind/react";
import "./PostDetail.css";
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');
import { Link } from "react-router-dom";
import { useAuthValue } from "../context/AuthContext";
import { getAuth } from "firebase/auth";
import { db } from "../firebase/config";
import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';


export const toggleLike = (liked, setLiked) => {
  setLiked(!liked);
};  
 

const LikeButton = ({ liked, setLiked }) => {
  return (
    <button className="hearticon" onClick={() => toggleLike(liked, setLiked)}>
      {liked ? (
        <HeartFilled />
      ) : (
        <HeartOutlined ></HeartOutlined>
      )}
    </button>
  );
};

const PostDetail = ({ post }) => {
  const [liked, setLiked] = useState(post.curtir);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [imageAvatar, setImageAvatar] = useState("");
  const auth = getAuth();
  const {user} = useAuthValue();

  const [userData, setUserData] = useState(null);

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

  async function curtir(id) {
    const curtidaRef = doc(db, "posts", id);

    await updateDoc(curtidaRef, {
      curtir: liked
    });
  }
  const setImageInAvatar = (url) => {
    if(url){
      setImageAvatar(url);
    } else {
      setImageAvatar("avatar.png");
    }
  } 


  function abrirModal(){
    setIsOpen(true);
  }

  function fecharModal(){
    setIsOpen(false);
  }

    return (
    <div className="detailpost">
      <div className="post-content">
        <Link onClick={abrirModal}>
        <div className="avatar-container">
          <Avatar 
            variant="circular"
            size="sm"
            className="border border-gray-900 p-0.5"
            src={post.urlPhotoUserLogged ? post.urlPhotoUserLogged : "avatar.png"}
          ></Avatar>
    <div className="nameuser">  
      <span>{post.creactedBy}</span>
    </div>
      </div>
      
      <div>
      <img className="detailimage" src={post.image} alt={post.body} />
      </div>
      </Link>
      <Modal className="containermodal"
      isOpen={modalIsOpen}
      onRequestClose={fecharModal}
      contentLabel="modal exemplo">
        <button type="button" className="buttonmodal" onClick={fecharModal}>{/*empty */}</button>
        <div className="detail">
          <span className="localization">
            {post.localization}
          </span>
        <img className="detailimagemodal" src={post.image}></img>
        </div>
        <div className="localization-container-modal">
          <h2 className="detaildescriptionmodal">{post.body}</h2>
        </div>
      </Modal>

        <div className="description-buton">
        <h2 className="detaildescription">{post.body}</h2>
        <LikeButton onClick={curtir(post.id)} liked={liked} setLiked={setLiked} />
        </div>       

        <div className="localization-container">
          <img id="imgpost"className="iconpost" src="iconlocalization.png" alt="Localization Icon" />          
          <p>{post.localization}</p>
        </div>

        <Link to={`/posts/${post.id}`} className="btn btn-outline"></Link>
      </div>
      </div>
      
  );
};

export default PostDetail;
