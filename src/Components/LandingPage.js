import { Alert, Button, Modal, Snackbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import './landingPage.css';
import { context } from '../App';
import MuiAlert from '@mui/material/Alert';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    backgroundColor:'white',
    textAlign:'center'
  };


const LandingPage = () => {
    const txt = useContext(context);
    const navigate = useNavigate();
    
    const [open2, setOpen2] = React.useState(false);  //snackbar state
    
    const [open, setOpen] = React.useState(false);  //Modal State


    //Functions for SignUp form Modal
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



  // FUnctuions for snackbar
    const handleClick = () => {
      setOpen2(true);
    }
  
    const handleClose2 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen2(false);
    }


    // Function for searching the book

    const search = (e) => {
        if(e.key==='Enter' || e.target.id === 'searchBtn'){
            let inpt = document.getElementById('searchBox').value;

            if(inpt !== ""){
                txt.setBook(inpt);
                txt.setLoading(true);
                navigate('/home');
            }
            else{
                handleClick();
            }
        }
       
    }

  return (
    <>
    <div className='landingPage'>
        <div className='nav'>
            <div className='logo'>
                BookIt
            </div>

            <div className='signBtn'>
                <button onClick={handleOpen}>Sign Up</button>
            </div>
        </div>
        <div className='content'>
            <div className='introText'>
                <span className='heading'>Online Library</span><br ></br>
                <p id='para'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                </p><br /><br />

                <span className='searchContainer' style={{width:'90%'}}>
                    <input className='searchBook' id='searchBox' type={'text'} placeholder='Search your book...' onKeyPress={search} autoFocus autoComplete='on' />
                    <button id='searchBtn' onClick={search}>Search Book</button>
                </span>
            </div>
            <div className='imgDiv'></div>
        </div>

    </div>


{/* ------------Sign Up Form Modal-------- */}
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Create Your Account
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input type={'text'} placeholder='Full Name' className='signUpform' />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input type={'email'} placeholder='E-mail' className='signUpform' />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input type={'password'} placeholder='Password' className='signUpform' />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input type={'password'} placeholder='Confirm Password' className='signUpform' />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span style={{display:'flex'}}><span style={{fontWeight:'bold'}}><input type='checkbox' /> Remember me</span>
            <span style={{color:'dodgerblue', marginLeft:'auto', cursor:'pointer'}} >Forget Password?</span>
            </span>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button variant='contained' id='submitBtn'>Submit</Button>

            <span className='sideLine'>OR</span>

            <Button variant='contained' id='fbBtn'>Login with FaceBook</Button>
          </Typography>
          
        </Box>
      </Modal>
    </div>

    {/* ----SnackBar------- */}
    
    <Snackbar id='snackbar' open={open2} autoHideDuration={3000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity="error" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </>
  )
}

export default LandingPage