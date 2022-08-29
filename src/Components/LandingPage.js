import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import './landingPage.css';
import { context } from '../App';

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
    

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const search = (e) => {
        if(e.key==='Enter' || e.target.id === 'searchBtn'){
            let inpt = document.getElementById('searchBox').value;

            if(inpt !== ""){
                txt.setBook(inpt);
                navigate('/home');
            }
            else{
                alert('Not Found');
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
    </>
  )
}

export default LandingPage