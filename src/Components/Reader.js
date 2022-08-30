import React, { useContext, useEffect } from 'react'
import { context } from '../App'

const Reader = () => {

  let txt = useContext(context);
  console.log(txt.bookData);

  useEffect(()=>{
    fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${txt.bookData}&jscmd=details&format=json`)
    .then(response => response.json())
    .then(data => {
      txt.setDetail(Object.values(data)[0])
    })

  }, [ txt.bookData ])
  return (
    <div>
      
    </div>
  )
}

export default Reader