import React, { useEffect, useState } from 'react'
import "./LoginComponent.css";
import { Link } from 'react-router-dom';
import { useAuthentication } from "../../hooks/useAuthentication";
import { button } from '@material-tailwind/react';

const Login = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login, error: authError, loading } = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const user = {
            email,
            password
        };

        const res = await login(user);

        console.log(res);
    };

    useEffect(() =>{
        console.log(authError);
        if(authError){
            setError(authError)
        }
    }, [authError]);

return (
    <div className='container'>
     <form onSubmit={handleSubmit}>
     <div className='titulo'>
     <p>Acessar o sistema</p>
    </div>
        <div className='inputContainer'>
        <label>
            <span>E-mail</span>
          <input
            type="email"
            name="email"
            required
            placeholder="john@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        </div>
        <div className='inputContainer'>
        <label>
            <span>Senha</span>
          <input
            type="password"
            name="password"
            required
            placeholder="*********"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        </div>
        {!loading && <button className='button'>Conectar</button>}
        {loading && (
            <button className='button' disabled>Aguarde...</button>
        )}
        <div className='footer'> 
        <p>Ainda não tem uma conta?</p>
        <Link to="/createaccount">Criar conta!</Link>
        </div>
    </form> 
        </div>
  )
}

export default Login;