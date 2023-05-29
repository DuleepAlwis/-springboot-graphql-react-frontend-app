import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { AccountCircle} from '@mui/icons-material';
import Logo from "../images/logo.jpeg";
import { useNavigate } from 'react-router-dom';

const pages = ['Courses', 'Enrolled Students'];
const settings = ['Profile', 'Change Password', 'Logout'];

const TutorNavigation=()=> {

  const [anchorElNav, setAnchorElNav] = React.useState();
  const [anchorElUser, setAnchorElUser] = React.useState();
  const navigate = useNavigate();
  let username = "";

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
    console.log(event.currentTarget.value);

  };

  const logOut = ()=>{
    localStorage.clear();
   

    navigate('/classroom', { replace: true });
  }

  const profile = ()=>{
    navigate('/tutorProfile', { replace: true });
  }

  const changePassword = ()=>{
    navigate('/changePassword', { replace: true });
  }

  const getUserName = () =>{
    let user = localStorage.getItem('user');
    let username = "";
    if(user!=null){
      user = JSON.parse(user);
      username = user.user.username;
    }
    return username;
  }

  const courses = ()=>{
    navigate('/tutorHome');
  }

  const enrolledStudents = ()=>{
    navigate('/course-tutor-students',{replace:true})
  }

  return (
    <div>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/*<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />*/}
          <Box
            component="img"
            sx={{
            height: 64,
            }}
            alt="Your logo."
            src={Logo}
        />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ClassRoom
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => page==='Courses'?(
                <MenuItem key={page} onClick={courses}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ):page==='Enrolled Students'?(
                <MenuItem key={page} onClick={enrolledStudents}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ):null
              )}
            </Menu>
          </Box>
          {/*<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
        </Typography>*/}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => page==='Courses'?(
              <Button
                key={page}
                onClick={courses}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ):page==='Enrolled Students'?(
                <Button
                key={page}
                onClick={enrolledStudents}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ):null
            )
        }
          </Box>

          <Box sx={{ flexGrow: 0 }}>
                <h3>{getUserName()}</h3>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/*<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />*/}
                <AccountCircle />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => setting==='Logout'? (
                <MenuItem key={setting} onClick={logOut}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ):
              setting==='Profile'?(<MenuItem key={setting} onClick={profile}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>):
              setting==='Change Password'?(<MenuItem key={setting} onClick={changePassword}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>):null
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <div>
        
    </div>
    </div>
   
  );
}
export default TutorNavigation;