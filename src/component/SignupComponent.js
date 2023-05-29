import { Component } from "react";
import { Link } from "react-router-dom";
import { Box, TextField, Typography,Button ,Grid} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {GRAPHQL_URL} from '../GlobalConfigurations';
import axios from "axios";


class SignupComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            user:{
                username:props.username,
                email:props.email,
                password:props.password,
                role:props.role
            }
        }
    }

    saveUser(){
        
        let user = this.state.user;

        axios
            .post(GRAPHQL_URL, {
            query: `
                mutation createUser($userObj:UserModel){
                             createUser(user:$userObj){
                               
                                    responseStatus
                                    responseMessage
                                
                             }
                        }`,
                        variables: {
                            userObj:user
                        }
                    })
            
            .then(res => {
                console.log(res)
               
                    alert(res.data.data.createUser.responseMessage);
                
            })
            .catch(err => {
                console.log(err)
                alert(err);
            })
        
    }


    userNameHandler(evt){
        let user = this.state.user;
        user.username = evt.target.value;
        this.state.user = user;
    }

    passwordHandler(evt){
        let user = this.state.user;
        user.password = evt.target.value;
        this.state.user = user;
    }

    emailHandler(evt){
        let user = this.state.user;
        user.email = evt.target.value;
        this.state.user = user;
    }



    roleSelected(evt){
        let user = this.state.user;
        user.role = evt.target.value;
        this.state.user = user;
    }

    getAllUsers(){
        //         fetch(GRAPHQL_URL, {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({
        //         query: `{
        //             getAllUsers {
        //                 username
        //                 email
        //                 activeStatus
        //             }
        //         }`
        //     })
        // })
        //     .then(res => res.json())
        //     .then(res => console.log(res.data));

        const options = {
            method: 'POST',
            url: GRAPHQL_URL,
            headers: {
                'content-type': 'application/json'
            },
            data: {
                query: `{
                    getAllUsers {
                        username
                        email
                        activeStatus
                    }
          }`
            }
        };

            axios.request(options)
            .then(function (res) {
               console.log(res.data) // Response received from the API
            })
            .catch(function (err) {
                console.error(err);
            });
    }

    render(){
        return (
            <div>
            <form>
                <Box display="flex" flexDirection={"column"} maxWidth={400} alignItems="center" justifyContent={'center'} margin="auto" marginTop={15}  padding={5} borderRadius={5} boxShadow={"5px 5px 10px #ccc"}>
                    <Typography variant="h2" padding={3} textAlign="center">ClassRoom</Typography>
                    <Typography variant="h4" padding={3} textAlign="center">SignUp Form</Typography>
                    <TextField margin="normal" type={"text"} variant="outlined" label="User name" value={this.state.user.username} onChange={this.userNameHandler.bind(this)}/>
                    <TextField margin="normal" type={"email"} variant="outlined" label="Email" value={this.state.user.email} onChange={this.emailHandler.bind(this)}/>
                    <TextField margin="normal" type={"password"} variant="outlined" label="Password" value={this.state.user.password} onChange={this.passwordHandler.bind(this)}/>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">User Type</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="Tutor"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="TUTOR" control={<Radio />} label="Tutor" onClick={this.roleSelected.bind(this)}/>
                            <FormControlLabel value="STUDENT" control={<Radio />} label="Student" onClick={this.roleSelected.bind(this)}/>
                        </RadioGroup>
                    </FormControl>
                    <Grid container spacing={1} align="center" direction="row">
                    <Grid item xs={5} >
                        <Button id="login_btn" sx={{marginTop:3 ,marginLeft:7,borderRadius:3}} variant="contained" color="warning" onClick={this.saveUser.bind(this)}>Save</Button>

                    </Grid>
                    <Grid item xs={5}>
                        <Button id="login_btn" sx={{marginTop:3 ,borderRadius:3, marginBottom:3}} variant="contained" color="warning" type="reset">Cancel</Button>

                    </Grid>
                    </Grid>
                    
                    <Link to="/classroom">Already have an account?</Link>
                </Box>
            </form>
    </div>
        )
    }
}

export default SignupComponent;