import * as React from 'react';
import { Box, TextField, Typography,Button} from "@mui/material";
import { identify } from 'sql-query-identifier';
//import { validate } from 'mysql-query-validator'

//import {SQLParser} from 'sql-parser';

const TestComponent = ()=>{

    const [query,setQuery] = React.useState();
    const [validateMessage,setValidateMessage] = React.useState();

    const inputEvent = (evt)=>{

        setQuery(evt.target.value);
    }

    const validateQuery = ()=>{
       
        setValidateMessage(query);
       
       /* let statements = identify(`
        INSERT INTO Persons (PersonID, Name) VALUES (1, 'Jack');
        SELECT ** FROM Persons;
      `);*/
     try{
        const statements = identify(query);
        console.log("Query validator");
        console.log(statements);
        setValidateMessage("Query is correct");
      }catch(e){
        console.log("error");
        
        setValidateMessage("Query is not correct");
        console.log(e);
      }
      //const statements = SQLParser.parse("Select * from user_tb");
      //console.log(statements);
      
    }

    return (
        <div>
            <Box display="flex" flexDirection={"column"} maxWidth={400} alignItems="center" justifyContent={'center'} margin="auto" marginTop={7}  padding={5} borderRadius={5} boxShadow={"5px 5px 10px #ccc"}>

            <TextField margin="normal" type={"text"} variant="outlined" label="Enter the sql query" value={query} onChange={inputEvent} name="name"/>
            <Button id="login_btn" sx={{marginTop:3 ,marginLeft:7,borderRadius:3}} variant="contained" color="info" onClick={validateQuery}>Validate</Button>
            <Typography variant="h4" padding={3} textAlign="center">{validateMessage}</Typography>
            </Box>
            
        </div>
    )

}

export default TestComponent;