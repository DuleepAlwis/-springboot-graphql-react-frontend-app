import { Box, TextField, Typography,Button } from "@mui/material";
import { Component } from "react";
import { withRouter } from "./withRouter";
import {GRAPHQL_URL} from '../GlobalConfigurations';
import axios from "axios";

class HomeComponent extends Component{

    constructor(props) {
        super(props);
        this.state = {
            user:{
                email:props.email,
                password:props.password
            }
        }
      }
    
    reset(){
        this.state = {
            email:"",
            password:""
        }
      }

    componentDidMount() {
        /*document.body.style.backgroundColor = "#3246a8"*/
    }

    routeToSignUp(){
        this.props.navigate('/signup')
    }

    login(){
        axios
            .post(GRAPHQL_URL, {
            query: `
                mutation login($email:String,$password:String){
                    login(email:$email,password:$password){
                               
                                    
                                        token
                                        user{
                                            id
                                            role
                                            username
                                            email
                                        }
                                        responseMessage
                                        responseStatus
                                    
                                
                             }
                        }`,
                        variables: {
                            email:this.state.user.email,
                            password:this.state.user.password
                        }
                    })
            
            .then(res => {
                let user = res.data.data.login;
                
                if(user!=null && user.responseStatus==true){
                    localStorage.setItem('user',JSON.stringify(user));
                    this.props.navigate('/tutorHome')
                }else{
                    alert(user.responseMessage);
                }
               

            })
            .catch(err => console.log(err))
    }

    emailChangeHandler(evt){
        let user = this.state.user;
        user.email = evt.target.value;
        this.setState({user:user});
    }

    passwordChangeHandler(evt){
        let user = this.state.user;
        user.password = evt.target.value;
        this.setState({user:user});
    }

    render(){
        return (
            <div>
                    <form>
                        <Box display="flex" flexDirection={"column"} maxWidth={400} alignItems="center" justifyContent={'center'} margin="auto" marginTop={15}  padding={5} borderRadius={5} boxShadow={"5px 5px 10px #ccc"}>
                            <Typography variant="h2" padding={3} textAlign="center">ClassRoom</Typography>
                            <Typography variant="h3" padding={3} textAlign="center">Login</Typography>
                            <TextField id="email_id" margin="normal" type={"email"} variant="outlined" label="Email" value={this.state.user.email} onChange={this.emailChangeHandler.bind(this)}/>
                            <TextField id="password_id" margin="normal" type={"password"} variant="outlined" label="Password" value={this.state.user.password} onChange={this.passwordChangeHandler.bind(this)}/>
                            <Button id="login_btn" sx={{marginTop:3 ,borderRadius:3}} variant="contained" color="warning" onClick={this.login.bind(this)}>Login</Button>
                            <Button id="signup_btn" sx={{marginTop:3 ,borderRadius:3}} variant="contained" color="info" onClick={this.routeToSignUp.bind(this)}>Sign Up</Button>
                        </Box>
                    </form>
            </div>
        )
    }
}

export default withRouter(HomeComponent);