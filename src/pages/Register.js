import React, {useState, useContext, useEffect} from 'react'
import { useNavigate } from "react-router";
import Cookies from 'universal-cookie';

import NavigationBar from "../components/NavigationBar"
import Footer from "../components/Footer"
import blackground from "../images/blackground2.jpg"
import Axios from 'axios'

import { UserContext } from "../App";

import './login.css'

const Register = () => {

    const [mask2, setMask2] = useState(false);
    const [mask3, setMask3] = useState(false);

    const [usernameReg, setUsernameReg] = useState("");
    const [emailReg, setEmailReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [regErrorMsg, setRegErrorMsg] = useState('')

    const usernameRegex = /^[a-zA-Z0-9 ]+$/
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const cookies = new Cookies();

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!user) {
            const username = cookies.get('user');
            Axios.get(`http://localhost:5000/loggedin/${username}`
                ).then((response) => {
                if (response.data){
                    setUser(response.data);
                    navigate('../Profile', { replace: true });
                }     
                })
        } else {
            navigate('../Profile', { replace: true });
        }
      },[])

    function PasswordToggle2 (){
        setMask2(!mask2)
    }
    function PasswordToggle3 (){
        setMask3(!mask3)
    }

    const checkReg = (e) => {
        setRegErrorMsg("")
        e.preventDefault();

        if (!usernameReg){
            setRegErrorMsg("Name is required.")}
        if(!passwordReg){
            setRegErrorMsg("Password is required.")}
        if (!emailReg){
            setRegErrorMsg("Email Adress is required.")}
        if (confirmPassword !== passwordReg){
            setRegErrorMsg("Password and Cofirm Password does not match.")}
        if (!emailRegex.test(emailReg)){
            setRegErrorMsg("Email Address is invalid.")}
        if (passwordReg.length < 8 || !usernameRegex.test(usernameReg)){
            setRegErrorMsg("Failed to meet account registration requirement.")}


        if (passwordReg.length >= 8 && emailRegex.test(emailReg) && usernameRegex.test(usernameReg) && confirmPassword === passwordReg){
            check_existed_account();
        }
    }

    const check_existed_account = () =>{
        Axios.get(`http://localhost:5000/read_accounts/${usernameReg}/${emailReg}`
        ).then((response) => {
            setRegErrorMsg(response.data)
            if (!response.data){
                register_account()
            }
            
        })
 
     }

    const register_account = () =>{

       Axios.post("http://localhost:5000/create_accounts",{
           username: usernameReg,
           email: emailReg,
           password: passwordReg
       }).then(() => {
           navigate('../login', { replace: true });
       })
    }

 
    
    return (
        <div className='register'>
            <NavigationBar/>
            <img src= {blackground} alt="loginBlackground" className='loginBackground'></img>
        <div className='registerContainer'>
            <div className='loginForm'>
                <form id="loginform" onSubmit={checkReg}>
                    <div className='loginTitle'>Register</div>
                    <input type="text" placeholder="Username" className='UserNameField' onChange={(e) => {setUsernameReg(e.target.value);}}/>
                    <input type="text" placeholder="Email Address" className='loginEmailField' onChange={(e) => {setEmailReg(e.target.value);}}/>
                    <div className='passwordLogin'>
                        <input type={mask2 ? "text" : "password"} placeholder="Password" className='loginPasswordField' onChange={(e) => {setPasswordReg(e.target.value);}}/>
                        <span className={mask2 ? "far fa-eye-slash" : "far fa-eye"} onClick={PasswordToggle2}/>
                    </div>
                    <div className='passwordLogin'>
                        <input type={mask3 ? "text" : "password"} placeholder="Confirm Password" className='loginPasswordField' onChange={(e) => {setConfirmPassword(e.target.value);}}/>
                        <span className={mask3 ? "far fa-eye-slash" : "far fa-eye"} onClick={PasswordToggle3}/>
                    </div>
                    <div className='regErrorMsg'>
                        {regErrorMsg ? regErrorMsg : ""}
                    </div>
                    <button className='submitLogin' onClick={checkReg}>Register <i className="fa-solid fa-right-to-bracket"></i></button>
                    
                    <div className='loginFormBottom'>
                    <a className='goregister' href='/login'>Already have an Account?</a>
                    </div>
                    <div className='passwordRequirement'>
                        <div className='passwordRequirement1'>
                            <i className="fas fa-info-circle"></i>
                        </div>
                        <div className='passwordRequirement2'>
                        Username should not contain any special characters<br/>
                        Password should be at least 8 characters long
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <footer>
            <Footer/>
        </footer>
    </div>
    )
}

export default Register;