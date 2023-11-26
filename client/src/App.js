import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import './App.css'
import copy from './copy2.png'

export default function App() {
  const [url, setUrl] = useState('')
  const [slug, setSlug] = useState('')
  const [newurl, setNewurl] = useState('')
  const [alllink, setAlllinks] = useState([])
  const findnewul = async () => {
    try {
      const response = await axios.post('/links', {
        url: url,
        slug: slug
      })
      setNewurl(response?.data?.Link.link)
    }
    catch (error) {
      console.log(error)
    }
    loadalllinks();
  }
  const loadalllinks = async () => {
    const response = await axios.get('/api/links')
    setAlllinks(response?.data?.data)
  }
  useEffect(() => {
    loadalllinks();
  }, [])
  const copylink = () => {
    navigator.clipboard.writeText(newurl);
    alert('copy to clipboard')
  }
  return (
<div className='container'>
<div className='title'>
  URL Shortner

</div>
    <div className='main-contoiner'>
      <div className='firstrow'>
        
        <div className='input-container'>
        <div className='subheading'>Short Here Your Long URL</div>
        <input type='text' className='input-feild' placeholder='Enter The Link Here' value={url} onChange={(e) => {
          setUrl(e.target.value)
        }} />
        <input type='text' className='input-feild' placeholder='Enter The Slug Here (optional)' value={slug} onChange={(e) => {
          setSlug(e.target.value)
        }} />
      
          <input type='text' className='input-feild' value={newurl} placeholder='shortned url' disabled />
          <img src={copy} onClick={copylink} className='copyimg' />
      
        <button className='clickbtn' onClick={findnewul}>shortned</button>
        </div>
      </div>
      <div className='firstrow '>
        <div className='secondrow'>
        <div className='secondrowheading'>Your Shortned URL</div>
        {
    alllink.map((link,i)=>{
      const {clicks,url,slug}=link
      
      return (
        <div  className='ulr-card'>
          <p>URL: {url}</p>
          <p>Slug: {`http://localhost:5000/${slug}`}</p>
          <p>Click: {clicks}</p>
        </div>
      )
      

    })
  }
 </div>
      </div>

    </div>
    </div>
  )
}
