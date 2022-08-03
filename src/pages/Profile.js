import Cookies from 'universal-cookie';
import React, {useState, useContext, useEffect } from 'react'
import { useNavigate } from "react-router";
import { UserContext } from "../App";
import Axios from 'axios'


import './Profile.css'
import InformationPic from "../images/News/Samsung.jpg";
import NavigationBar from "../components/NavigationBar"
import Footer from "../components/Footer"
import Items from "../components/Items"

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
        description:"",
    });

    const defaultImage = "https://res.cloudinary.com/dogmazon/image/upload/v1658731417/ybfjtslkd57bzlshfxop.jpg"

    const [uploadedProduct, setuploadedProduct] = useState([])
    const [purchasedProduct, setPurchasedProduct] = useState([])

    useEffect(() => {
        if(user) {
            Axios.get(`http://localhost:5000/userInfo/${user}`
                ).then((response) => {
                if (response.data){
                    setUserName(response.data[0]["username"]);
                    setUserEmail(response.data[1]["email"]);
                    }
                }) 
        Axios.get(`http://localhost:5000/Uploaded/${user}`
                ).then((response) => {
                    for(let i = 0;i < response.data.length; i++){
                        setuploadedProduct(uploadedProduct => [...uploadedProduct,{
                            id: i,
                            productname: response.data[i].productname,
                            price: response.data[i].price,
                            ratingCount: response.data[i]["rating count"],
                            ratingMean: response.data[i]["rating mean"],
                            productID: response.data[i]["productID"],
                            imageID: response.data[i]["imageID"]
                        }])
                    }
                    
                })
        Axios.get(`http://localhost:5000/Purchased/${user}`
                ).then((response) => {
                    for(let i = 0;i < response.data.length; i++){
                        setPurchasedProduct(purchasedProduct => [...purchasedProduct,{
                            id: i,
                            productname: response.data[i].productname,
                            price: response.data[i].price,
                            ratingCount: response.data[i]["rating count"],
                            ratingMean: response.data[i]["rating mean"],
                            productID: response.data[i]["productID"],
                            imageID: response.data[i]["imageID"]
                        }])
                    }
                    
                }) 
        } else {
            navigate('../login', { replace: true });
        }
      },[user])

    function logout(){
        cookies.remove('user');
        setUser("");
        navigate('../login', { replace: true });
    }

    
    const [img, setimg] = useState("")
    const [Preview, setPreview] = useState("")

    function handlefile(e){
        setimg(e.target.files[0])
        setPreview(URL.createObjectURL(e.target.files[0]))
    }



    const checkuploadProduct  = async (e) =>{
        e.preventDefault();

        const uploadImage = () =>{
            if(img){
                let file = img
                let formData = new FormData();
                formData.append("file",file)
                formData.append("upload_preset","Dogmazon")
    
                Axios.post("https://api.cloudinary.com/v1_1/dogmazon/image/upload",formData)
                .then((response) => {
                    ProductUpload(response.data.url)
                    
                })

            } else {
                ProductUpload(defaultImage)
            }
            
        }

        const ProductUpload = (image) =>{
            Axios.post("http://localhost:5000/add_products",{
                userID: user,
                productname: uploadProduct.productname,
                price: uploadProduct.price,
                description: uploadProduct.description,
                producttype: uploadProduct.producttype,
                imageID: image,
            }).then(() => {
                console.log("Uploaded")
            })
        }
        
        await uploadImage()
   

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
                            {(Preview)?
                                <img src={Preview} className="uploadPhoto" />:
                                <img src={TempImage} className="uploadPhoto" />
                            }
                                    <div>
                                    <label htmlFor="contained-button-file">
                                        <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={(e) => {handlefile(e)}}/>
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
                        (uploadedProduct.length !== 0)?
                        <div className='Uploaded-container' >
                            {uploadedProduct.map((uploadedProduct) => {
                                return (
                                <div key={uploadedProduct.id}>
                                <Items description ={uploadedProduct.productname}
                                dollor = {uploadedProduct.price}
                                number = {uploadedProduct.ratingCount}
                                rank = {uploadedProduct.ratingMean}
                                productID = {uploadedProduct.productID}
                                imageID = {uploadedProduct.imageID}
                                />
                                </div>
                                );
                            })}
                        </div>
                        :
                        <div className="UploadedFalse">
                            You have no products uploaded yet.
                        </div>
                        
                    
                    :
                    (purchasedProduct.length !== 0)?
                    <div className='Profile-Purchased' >
                        {purchasedProduct.map((purchasedProduct) => {
                            return (
                            <div key={purchasedProduct.id}>
                            <Items description ={purchasedProduct.productname}
                            dollor = {purchasedProduct.price}
                            number = {purchasedProduct.ratingCount}
                            rank = {purchasedProduct.ratingMean}
                            productID = {purchasedProduct.productID}
                            imageID = {purchasedProduct.imageID}
                            />
                            </div>
                            );
                        })}
                    </div>
                    :
                    <div className="PurchasedFalse">
                        You haven't bought anything yet.
                    </div>
                }
                </div>
            </div>


            



            

            


            <Footer/>
            
        </div>
    )
    }

export default Profile