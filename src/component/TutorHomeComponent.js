import * as React from 'react';
import {Button,TextField,Dialog,DialogContent,DialogActions,DialogContentText,DialogTitle,Typography,Table,TableBody,
  TableCell,TableContainer,TableHead,TableRow,Paper} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TutorNavigation from "./TutorNavigation";
import axios from "axios";
import {GRAPHQL_URL} from '../GlobalConfigurations';


/*let courses = [
  {}
];*/

const TutorHomeComponent = ()=>{

  const navigate = useNavigate();
 
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
            query: ` query GetCoursesByTutorId($userId:Int!) {
                getCoursesByUserId(userId: $userId) {
                   id
                   name
                   description
                   price
                   discount
                   rating
                }
            }`,
                variables: {
                            userId:user.user.id
                        }
                    })
            
            .then(res => {
                
                 let data  = res.data.data.getCoursesByUserId;
                 setCourses(data);
                 console.log(data);
                
            })
            .catch(err => console.log(err))
      }else{
        navigate('/classroom');
        return;
      }

      
  }, []);

  const [open,setOpen] = React.useState();
  const [inputText, setInputText] = React.useState({ 
   
    userId:"",
    name:"",
    description:"",
    price:0.0,
    discount:0.0
});

const [courses,setCourses] = React.useState([
  {}
])

  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
   setOpen(false);
  };

  const inputEvent = (event)=>{
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
    setInputText((lastValue)=>{ 
      return{
          ...lastValue,
          name:"",
          description:"",
          price:0.0,
          discount:0.0
      }
    }); 
    handleClose();
  }

  const loadCourses = ()=>{
    let user = localStorage.getItem('user');
    if(user!=null){
      user = JSON.parse(user);
      axios
              .post(GRAPHQL_URL, {
              query: ` query GetCoursesByTutorId($userId:Int!) {
                  getCoursesByUserId(userId: $userId) {
                    id
                    name
                    description
                    price
                    discount
                    rating
                  }
              }`,
                  variables: {
                              userId:user.user.id
                          }
                      })
              
              .then(res => {
                  
                  let data  = res.data.data.getCoursesByUserId;
                  setCourses(data);
                  
                  
              })
              
              .catch(err => console.log(err))
            }
  }

  const submitForm = ()=>{
    

    const course = {...inputText,["userId"]:JSON.parse(localStorage.getItem('user')).user.id};
    console.log(course);
        if(course.name.length>0 && course.userId!=null){
            axios
            .post(GRAPHQL_URL, {
            query: `
                mutation createCourse($courseObj:CourseModel){
                             createCourse(course:$courseObj){
                               
                                    responseStatus
                                    responseMessage
                                
                             }
                        }`,
                        variables: {
                            courseObj:course
                        }
                    })
            
            .then(res => {
                console.log(res);
                alert(res.data.data.createTutor.responseMessage);
                resetForm();
                handleClose();
                loadCourses();
            })
            .catch(err => console.log(err))
        }else{
            alert("Inputs fields can't be empty");
        }
        
  }

  return (
    <div>
      <TutorNavigation/>
      <Typography variant="h4" padding={3} textAlign="center">Courses</Typography>

      <Button variant="outlined" onClick={handleClickOpen}>
        Create Course
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Course Details</DialogTitle>
        <DialogContent>
          <TextField
            
            margin="dense"
            id="name"
            name="name"
            label="Course Name"
            type="text"
            fullWidth
            variant="standard"
            value={inputText.name}
            onChange={inputEvent}
          />
          <TextField
            
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={inputText.description}
            onChange={inputEvent}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={resetForm}>Cancel</Button>
          <Button onClick={submitForm}>Save</Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Course Name</TableCell>
            <TableCell align="right"> Description</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Discount</TableCell>
            <TableCell align="right">Rating</TableCell>

            <TableCell align="right">#</TableCell>
            <TableCell align="right">#</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses!=null?courses.map((course) => (
            <TableRow
              key={course.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {course.name}
              </TableCell>
              <TableCell align="right">{course.description}</TableCell>
              <TableCell align="right">{course.price}</TableCell>
              <TableCell align="right">{course.discount}</TableCell>
              <TableCell align="right">{course.rating}</TableCell>
            </TableRow>
          )):null}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default TutorHomeComponent;