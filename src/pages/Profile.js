import Cookies from 'universal-cookie';
import React, {useState, useContext, useEffect } from 'react'
import { useNavigate } from "react-router";
import { UserContext } from "../App";
import Axios from 'axios'
import './Profile.css'
import InformationPic from "../images/News/Samsung.jpg";
import NavigationBar from "../components/NavigationBar"
import Footer from "../components/Footer"

import DefaultImage from "../images/DefaultImage.jpg"
import TempImage from "../images/blackground1.png"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const Profile = () => {

    const cookies = new Cookies();
    const { user, setUser } = useContext(UserContext);
    const [UserName, setUserName] = useState("");
    const [UserEmail, setUserEmail] = useState("")
    const navigate = useNavigate();

    const [uploadProduct, setuploadProduct] = useState({
        productname:"",
        price:"",
        producttype:"",
        description:""
    });

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

    



    //const image = new FormData();

    // function handlefile(e){
    //     console.log(e.target.files[0])
    //     if(e.target ){
    //         image.append('file', e.target.files[0])
    //     }
    // }


    const checkuploadProduct = (e) => {
        e.preventDefault();
        console.log(uploadProduct)
        Axios.post("http://localhost:5000/add_products",{
            username: user,
            productname: uploadProduct.productname,
            price: uploadProduct.price,
            description: uploadProduct.description,
            producttype: uploadProduct.producttype,
            image: DefaultImage
        }).then((response) => {
            console.log(response.data)
        })
    }

    
    const [profileState, setprofileState] = useState(0)

    const [productType, setProductType]=useState('')

    const Input = styled('input')({
        display: 'none',
      });

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
                        <div className="Profile-Upload-Title">Upload</div>
                        <form className='Profile-Upload-Container' onSubmit={checkuploadProduct}>
                        <div className="Form-Left">
                                    <img src={TempImage} className="uploadPhoto" />
                                    <div>
                                    <label htmlFor="contained-button-file">
                                        <Input accept="image/*" id="contained-button-file" multiple type="file" />
                                        <Button variant="contained" component="span">
                                        Upload
                                        </Button>
                                    </label> 
                                    </div>
                                </div>

                                <div className="Form-Right">
                                    <div className="Product-Price-Container">
                                        <div> <TextField margin="normal" type="text" id="ProductName" label="ProductName" variant="standard" required onChange={(e) => {setuploadProduct({...uploadProduct, productname: e.target.value});}}/></div>
                                        <div><TextField margin="normal" type="number" id="Price" label="Price" variant="standard" required onChange={(e) => {setuploadProduct({...uploadProduct, price: e.target.value});}}/></div>
                                    </div>
                                    
                                    <TextField type="text" id="Description" margin="normal" rows={8} label="Description" variant="filled" required multiline onChange={(e) => {setuploadProduct({...uploadProduct, description: e.target.value});}}/>
                                                   
                                    <div className='ProductType-Container'>
                                        <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Choose a ProductType...</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={productType}
                                                label="DEFAULT"
                                                onChange={(e) => {setuploadProduct({...uploadProduct, producttype: e.target.value}); setProductType(e.target.value);}}
                                                >
                                                <MenuItem value="Electronics">Electronics</MenuItem>
                                                <MenuItem value="Fashion">Fashion</MenuItem>
                                                <MenuItem value="Toys">Toys</MenuItem>
                                                <MenuItem value="Foods">Foods</MenuItem>
                                                <MenuItem value="Sports">Sports</MenuItem>
                                                <MenuItem value="Books">Books</MenuItem>
                                                <MenuItem value="Others">Others</MenuItem>
                                            </Select>                                        
                                        </FormControl>
                                    </div>
                                    
                                    

                                    <div className='Submit-Container'><Button variant="contained" endIcon={<SendIcon/>} onClick={checkuploadProduct}>Submit</Button></div>
                                </div>
                        </form>
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