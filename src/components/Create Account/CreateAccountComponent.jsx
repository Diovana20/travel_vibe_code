import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuthentication } from '../../hooks/useAuthentication';
import { storage, db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp, setDoc, doc} from "firebase/firestore";
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { useAuthValue } from '../../context/AuthContext';


export function CreateAccountComponent(){
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [error, setError] = useState("");
    const [photoURL, setPhotoURL] = useState("");

const {user} = useAuthValue();
const {createUser, error: authError, loading} = useAuthentication();
const {insertDocument, response} = useInsertDocument("users");

const handlePhotoURLChange = (e) => {
    setPhotoURL(e.target.files[0]);
}
const handleSubmit = async (e) =>{
    e.preventDefault();
    setError("")
    const user = {
        displayName,
        email,
        password,
        photoURL
    }
    if(password !== confirmpassword){
        setError("As senhas precisam ser iguais!")
        return 
    }

    const res = await createUser(user);
   /* const docRef = await addDoc(collection(db, "users"), {
        name: displayName,
        email: email
    })*/

    console.log(res);

};
useEffect(() =>{

    if(authError){
        setError(authError);
    }
}, [authError])

return (
    <div className='container'>
    <form onSubmit={handleSubmit}>
        <div className='titulo' >
        <p>Criar conta</p>
        </div>
        <div className='inputContainer'>
        <label>
        <span>Nome</span>
        </label>
            <input 
            type='text' 
            name='displayName' 
            value={displayName} 
            onChange={(e) => setDisplayName(e.target.value)}  
            ></input>
        </div>
        <div className='inputContainer'>
        <label>
        <span>Email</span>
        </label>
            <input 
            type='email' 
            name='email'  
            placeholder='john@gmail.com'  
            value={email} 
            onChange={(e) => setEmail(e.target.value)}>
            </input>
        </div>

        <div className='inputContainer'>
            <label>
            <span>Senha</span>
            </label>
            <input 
            type='password' 
            name='password'  
            placeholder='********'  
            value={password} 
            onChange={(e) => setPassword(e.target.value)}>
            </input>
        </div>

        <div className='inputContainer'>
            <label>
            <span>Confirme sua senha</span>
            </label>
            <input 
            type='password' 
            name='confirmpassword' 
            placeholder='********'  
            value={confirmpassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}>
            </input>
        </div>

       
        {!loading && <button className='button'>Criar conta</button>}
        {loading && <button className='button' disabled>Aguarde... </button>}
        {error && <p className='error'>{error}</p>}
        <div className='footer'> 
        <p>Já possui uma conta?</p>
        <Link to="/login">Acesse aqui</Link>
        </div>
        <div className='privacidade'>
            <a href='https://docs.google.com/document/d/1wIBEfvM9RIq8n4g4iq2xQiVlIGGbh19LAflN0jIR1m4/edit?usp=sharing'>Política de Privacidade</a>
        </div>
    </form>
        

        </div>
    )
}