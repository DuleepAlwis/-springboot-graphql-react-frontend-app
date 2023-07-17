import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeComponent from "./component/HomeComponent";
import SignupComponent from "./component/SignupComponent";
import TutorHome from "./component/TutorHomeComponent";
import TutorProfileComponent from "./component/TutorProfileComponent";
import TestComponent from "./component/TestComponent";

function Routers(){
    return(
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/classroom" element={
                        <HomeComponent/>
                    }/>
                    <Route path="/signup" element={
                        <SignupComponent/>
                    }/>
                    <Route path="/tutorHome" element={
                        <TutorHome/>
                    }/>
                    <Route path="/tutorProfile" element={
                        <TutorProfileComponent/>
                    }/>
                    <Route path="/test" element={
                        <TestComponent/>
                    }/>
                </Routes>
            </Router>
        </div>
    )
}

export default Routers;