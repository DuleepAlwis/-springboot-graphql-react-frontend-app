import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Typography,Button ,Grid} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {GRAPHQL_URL} from '../GlobalConfigurations';
import axios from "axios";
import TutorNavigation from "./TutorNavigation";

const TutorProfileComponent = ()=>{

    const navigate = useNavigate();

    const[inputText,setInputText]=React.useState({ 
            
        user:{},
        name:"",
        address:"",
        city:"",
        district:"",
        qualification:"",
        gender:""
    });

  React.useEffect(() => {
    
    let user = localStorage.getItem('user');
      if(user!=null){
        user = JSON.parse(user);
        if(user != null && user.responseStatus==true && user.user.role!='TUTOR'){
          navigate('/classroom');
          return;
        }
        axios
            .post(GRAPHQL_URL, {
            query: ` query GetTutorProfile($userId:Int!) {
                getTutorProfile(userId: $userId) {
                    id
                    name
                    address
                    city
                    district
                    country
                    gender
                    qualification
                }
            }`,
                variables: {
                            userId:user.user.id
                        }
                    })
            
            .then(res => {
                console.log(res);
                let tutor  = res.data.data.getTutorProfile
                setInputText({
                    user:{},
                name:tutor.name,
                address:tutor.address,
                city:tutor.city,
                district:tutor.district,
                qualification:tutor.qualification,
                gender:tutor.gender
            });
            })
            .catch(err => console.log(err))
      }else{
        navigate('/classroom');
        return;
      }
      
  }, []);

  

    const inputEvent=(event)=>{
        
        const name=event.target.name; 
        const value=event.target.value;
        console.log(name+" "+value);
        if(name!=undefined){
            setInputText((lastValue)=>{ 
                return{
                    ...lastValue,
                    [name]:value
                }
            }); 
        }

       
            
    } 

    const resetForm = ()=>{
        setInputText({
                user:{},
            name:"",
            address:"",
            city:"",
            district:"",
            qualification:"",
            gender:""
        });
    }

    const submitForm=(e)=>{
         
        
        const tutor = {...inputText,["user"]:JSON.parse(localStorage.getItem('user')).user};

        if(tutor.name.length>0 && tutor.user!=null){
            axios
            .post(GRAPHQL_URL, {
            query: `
                mutation createTutor($tutorObj:TutorModel){
                             createTutor(tutor:$tutorObj){
                               
                                    responseStatus
                                    responseMessage
                                
                             }
                        }`,
                        variables: {
                            tutorObj:tutor
                        }
                    })
            
            .then(res => {
                console.log(res);
                alert(res.data.data.createTutor.responseMessage);
            })
            .catch(err => console.log(err))
        }else{
            alert("Inputs fields can't be empty");
        }
        
    } 
    
    return (
        <div>
            <TutorNavigation/>
        <form>
            <Box display="flex" flexDirection={"column"} maxWidth={400} alignItems="center" justifyContent={'center'} margin="auto" marginTop={7}  padding={5} borderRadius={5} boxShadow={"5px 5px 10px #ccc"}>
                <Typography variant="h4" padding={3} textAlign="center">Create Profile</Typography>
                <TextField margin="normal" type={"text"} variant="outlined" label="Full name" value={inputText.name} onChange={inputEvent} name="name"/>
                <TextField margin="normal" type={"text"} variant="outlined" label="Address" value={inputText.address} onChange={inputEvent} name="address"/>
                <TextField margin="normal" type={"text"} variant="outlined" label="City" value={inputText.city} onChange={inputEvent} name="city"/>
                <TextField margin="normal" type={"text"} variant="outlined" label="District" value={inputText.district} onChange={inputEvent} name="district"/>
                <TextField margin="normal" type={"text"} variant="outlined" label="Qualification(Enter your degree details here)" value={inputText.qualification} onChange={inputEvent} name="qualification"/>

                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={inputText.gender.length>0?inputText.gender:"MALE"}
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="MALE" control={<Radio name="gender"/>} label="Male" onClick={inputEvent}/>
                        <FormControlLabel value="FEMALE" control={<Radio name="gender"/>} label="Female" onClick={inputEvent}/>
                    </RadioGroup>
                </FormControl>
                <Grid container spacing={1} align="center" direction="row">
                <Grid item xs={5} >
                    <Button id="login_btn" sx={{marginTop:3 ,marginLeft:7,borderRadius:3}} variant="contained" color="warning" onClick={submitForm}>Save</Button>

                </Grid>
                <Grid item xs={5}>
                    <Button id="reset_btn" sx={{marginTop:3 ,borderRadius:3, marginBottom:3}} variant="contained" color="warning" onClick={resetForm}>Cancel</Button>

                </Grid>
                </Grid>
            </Box>
        </form>
    </div>
    )
}

export default TutorProfileComponent;