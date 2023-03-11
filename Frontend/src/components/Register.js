import React, { useState } from 'react'
import axios from "axios";
import { useHistory } from "react-router-dom";
import './form.css';
import GoggleLogo from './googleLogo.png';
import {Link} from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useHistory();

    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword
            });
            history.push("/");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (<div className="main-container">
        <form style={{maxWidth:"50vh"}}  onSubmit={Register} className="container">
           <h1>{msg}</h1>
           <input   type="text"   value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
           <input  type="email"  value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
           <input  type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
           <input  type="password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} placeholder='Password' />
           <Link to="/" className="link">Already have an account ? Login instead</Link>
           <button className='submit'>Submit</button>
           <div className="option">
            <span>OR</span>
           </div>
           <div className="formGoogle">
               <img src={GoggleLogo} alt="google logo"/>
               <button className="google" type='button'>Signup with Google</button>
           </div>
         
       </form>
    </div>
    )
}

export default Register
