import React from 'react'
import "../Login/LoginPage.css";
import { CreateAccountComponent } from '../../components/Create Account/CreateAccountComponent'
function CreateAccountPage() {
  return (
    <>
    <div className='container'>
            <img src='imglogins.png' alt='imglogin'></img>
           <CreateAccountComponent></CreateAccountComponent>
    </div>
    </>
  )
}

export default CreateAccountPage