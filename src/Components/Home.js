import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { context } from '../App'
import './Home.css'
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

var isbn;
const Home = () => {

    const navigate = useNavigate();

    const txt = useContext(context);
    let [ datas, setData ] = useState([]);
    
    useEffect(()=>{
        fetch(
            `https://openlibrary.org/search.json?q=${txt.book}&mode=ebooks&has_fulltext=true&limit=10`
        )
        .then((response) => response.json())
        .then((res) => {
            
            setData(res.docs)  
            txt.setLoading(false)
        })      
    },[]);

    const readMore = (event) =>{
        datas.map((item)=>{
           if (item.isbn!==undefined){
            isbn=item.isbn[0];
            txt.setBookData(isbn);
            navigate('/reader')
           }
           else{
            <h1>Book Not Found</h1>
           }

        })
    }
    
    
    return (
        <div className='mainContainer'>
        <div className='container'>
            <h1 className='searchResHead'>Search Result</h1>
               {
            (txt.isLoading === true) ? (
                
                <div className='overLay'>
                    <div>
                        <Box id='loader' sx={{ display: 'flex' }}>
                            <CircularProgress />
                            <div>Loading...</div>
                        </Box>
                    </div>
                </div>
            ) :
               ((datas!=='') ? (
                   datas.map((val, i)=>{
                                        
                    return(
                        <div key={i} className='card'>
                            <div className='card-image'>
                                <img src={`https://covers.openlibrary.org/b/olid/${val.cover_edition_key}.jpg`} width='100%' height='100%' alt='' />
                            </div>
                            <div className='card-content'>
                                <h4>{val.title}</h4>
                                <p ><b>by:</b> <span className='authorName'>{" " + val.author_name + " "}</span></p>

                                <span className='firstPublished'><b>First Published In:</b> {val.first_publish_year}</span><br />
                                <span>{val.edition_count} <b>editions</b></span>&nbsp;
                                <span>in {(val.language!==undefined)? (val.language.length) : '0'} <b>{(val.language!==undefined && val.language.length<2)?'language':'languages'}</b></span>

                                <span> -- {val.ebook_count_i} <b>previewables</b></span><br />
                                <span>
                                    {
                                        val.ia.map((src, ind)=>{
                                           
                                            if(ind < 10){
                                                return(
                                                    <img src={`https://archive.org/services/img/${src}`} alt='' width='8%'height='20%' />
                                                )
                                            }
                                            return "";
                                        })
                                    }
                                </span>
                            </div>

                            <div className='btnSet'>
                                <Button variant='contained' onClick={readMore} >Read More <ReadMoreIcon /></Button>
                            </div>
                        </div>
                    )
                })
               ) 
               : 
               (
                <div className='errorMsg'>
                    <h1>Sorry, Nothing to Show</h1>
                </div>
               ))
               }
        
        
    </div>
    </div>
  )
}

export default Home