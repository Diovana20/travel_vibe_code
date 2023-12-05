import React from 'react'
import UserComponent from '../../components/User/UserComponent'
import "./UserPage.css"

const UserPage = () => {
     
    return (
        <div className='usercontainer'>
            <div className='usuario'>
            <UserComponent></UserComponent>
        </div>
        </div>
    )
}

export default UserPage