import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { context } from '../App'
import './Home.css'
import ReadMoreIcon from '@mui/icons-material/ReadMore';

const Home = () => {

    const txt = useContext(context);
   console.log(txt.book);
    let [ datas, setData ] = useState([]);
    
    useEffect(()=>{
        fetch(
            `https://openlibrary.org/search.json?q=${txt.book}&mode=ebooks&has_fulltext=true`
        )
        .then((response) => response.json())
        .then((res) => {
            setData(res.docs)  
        })       
    },[]);
    
    
    return (
        <div className='container'>
            
               {(datas!=='') ? (
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

                                <span> -- {val.ebook_count_i} <b>previewables</b></span>
                            </div>

                            <div className='btnSet'>
                                <Button variant='contained'>Read More <ReadMoreIcon /></Button>
                            </div>
                        </div>
                    )
                })
               ) 
               : ""}
        
        
    </div>
  )
}

export default Home