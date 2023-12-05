import { useState, useEffect } from 'react';
import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
//context
import { AuthProvider } from './context/AuthContext';
//pages
import HomePage from './pages/Home/HomePage';
import AboutPage from './pages/About/AboutPage';
import LoginPage from './pages/Login/LoginPage';
import LoginComponent from './components/LoginPage/LoginComponent';
import CreateAccountPage from './pages/Create Account/CreateAccountPage';
import PostPage from './pages/Post/PostPage';
import NewNavBar from './components/NewNavBar';
//mapeia se a autenticação foi feita com sucesso
import { onAuthStateChanged  } from 'firebase/auth';
import { ComplexNavbar } from './components/NewNavBar';
import UserPage from './pages/User/UserPage';
import { useAuthentication } from './hooks/useAuthentication';
import { Switch } from 'antd';  


const DefaultContainer = () => (
    <div className='container'>
        <Route path='/about' element={<AboutPage></AboutPage>}></Route>
    </div>
);

function App() {
  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if(loadingUser){
    return <p>Carregando...</p>;
  }
  
  return (
    <>
      <div className='App'>
      <AuthProvider value={{user}}>
        <BrowserRouter>
        <ComplexNavbar></ComplexNavbar>
        <Routes>
        <Route path='/user' element={user ? <UserPage></UserPage> : <Navigate to="/login" ></Navigate>}></Route>
        <Route path='/post' element={user ? <PostPage></PostPage> : <Navigate to="/login"></Navigate>}></Route>
        <Route path='/' element={user ? <HomePage></HomePage> : <Navigate to="/login"></Navigate>}></Route>
        <Route path='/login' element={! user ?<LoginPage></LoginPage>: <Navigate to="/"></Navigate>}></Route>
        <Route path='/createaccount' element={! user ? <CreateAccountPage></CreateAccountPage> : <Navigate to="/"></Navigate>}></Route>
        <Route Component={DefaultContainer} />
        </Routes>
        </BrowserRouter>
      </AuthProvider>
      </div>
    </>
  )
}

export default App

