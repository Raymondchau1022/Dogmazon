import Cookies from 'universal-cookie';
import React, {useState, useContext, useEffect } from 'react'
import { useNavigate } from "react-router";
import { UserContext } from "../App";
import Axios from 'axios'
import './Profile.css'
import InformationPic from "../images/News/Samsung.jpg";
import NavigationBar from "../components/NavigationBar"
import Footer from "../components/Footer"

const Profile = () => {

    const cookies = new Cookies();
    const { user, setUser } = useContext(UserContext);
    const [UserName, setUserName] = useState("");
    const [UserEmail, setUserEmail] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        const userid = cookies.get('user');
        if(!user) {
            Axios.get(`http://localhost:5000/loggedin/${userid}`
                ).then((response) => {
                if (response.data){
                    setUser(response.data);
                    } else{
                        logout();
                    }
                })
        }
        Axios.get(`http://localhost:5000/userInfo/${userid}`
                ).then((response) => {
                if (response.data){
                    setUserName(response.data[0]["username"]);
                    setUserEmail(response.data[1]["email"]);
                    }
                }) 
      },[])

    function logout(){
        cookies.remove('user');
        setUser("");
        navigate('../login', { replace: true });
    }

    

    const [uploadProduct, setuploadProduct] = useState({
        productname:"",
        price:"",
        tag:"",
        description:""
    });

    const image = new FormData();

    function handlefile(e){
        console.log(e.target.files[0])
        if(e.target ){
            image.append('file', e.target.files[0])
        }
    }


    const checkuploadProduct = (e) => {
        e.preventDefault();
        console.log(uploadProduct)
        Axios.post("http://localhost:5000/add_products",{
            username: user,
            productname: uploadProduct.productname,
            price: uploadProduct.price,
            description: uploadProduct.description,
            tag: uploadProduct.tag,
            image: image
           
        }).then((response) => {

        })
    }

    
    const [profileState, setprofileState] = useState(0)

    return (
        <div className="Profile">
            <NavigationBar/>
            <div className="Profile-container">
                <div className="Left-sidebar">
                    <div className='Profile-title'> Profile</div>
                    <div className="Profile-list">
                    {(profileState === 0)?<li className='Profile-choice-choosing'  onClick={() => {setprofileState(0)}}>User Information</li>:<li className='Profile-choice'  onClick={() => {setprofileState(0)}}>User Information</li>}
                    {(profileState === 1)?<li className='Profile-choice-choosing'  onClick={() => {setprofileState(1)}}>Upload</li>:<li className='Profile-choice'  onClick={() => {setprofileState(1)}}>Upload</li>}
                    {(profileState === 2)?<li className='Profile-choice-choosing'  onClick={() => {setprofileState(2)}}>Uploaded Items</li>:<li className='Profile-choice'  onClick={() => {setprofileState(2)}}>Uploaded Items</li>}
                    {(profileState === 3)?<li className='Profile-choice-choosing'  onClick={() => {setprofileState(3)}}>Purchased</li>:<li className='Profile-choice'  onClick={() => {setprofileState(3)}}>Purchased</li>}
                    </div>
                </div>

                
                <div className="Profile-result">

                {(profileState === 0)? 
                    <div className='Profile-Information'>
                        <div className='Information-title-container'>
                            <div className='Information-title'>User Information </div>
                            <div className="logout" onClick={logout}>logout</div>
                        </div>
                        <div className='Information-container'>
                            <div className='Information-user-container'>
                                <div className="Information-user-title">User Name:</div>
                                <div className='Information-user'>{UserName}<div className='Pen'><i className="fas fa-pen"></i></div></div>
                            </div>
                            <div className='Information-email-container'>
                                <div className="Information-email-title">Email:</div>
                                <div className='Information-email'>{UserEmail}<div className='Pen'><i className="fas fa-pen"></i></div></div>
                            </div>    
                            <div className="Information-password-title">Edit Password</div>
                        </div>
                        <div className='Information-picture'>
                            <img src={InformationPic} alt='Information'/>  
                        </div>
                    </div>
                :(profileState === 1)? 
                    <div className='Profile-Upload'>
                        <div className=' '>
                        <form onSubmit={checkuploadProduct}>
                            
                            <input type="text" placeholder="ProductName" className='uploadProductName' onChange={(e) => {setuploadProduct({...uploadProduct, productname: e.target.value});}}/>
                            <input type="number" placeholder="Price" className='uploadProductPrice' onChange={(e) => {setuploadProduct({...uploadProduct, price: e.target.value});}}/>
                            <input type="text" placeholder="Description" className='uploadProductDescription' onChange={(e) => {setuploadProduct({...uploadProduct, description: e.target.value});}}/>
                            <input type="file"  className='uploadProductImg' accept="image/*" onChange={handlefile}/>
                        
                           
                            
                            <button onClick={checkuploadProduct}>submit</button>
                        </form>
                        </div> 
                    </div>
                :(profileState === 2)? 
                    <div className='Profile-Uploaded_information'>
                        Uploaded_information
                    </div>
                :
                    <div className='Profile-Purchased'>
                        Purchased
                    </div>
                }
                </div>
            </div>


            



            

            


            <Footer/>
            
        </div>
    )
    }

export default Profile