import React from 'react'
import Loading from '../../hooks/loading/Loading'
import './Blog.css'

import { firestore } from '../../hooks/Firebase/firebase';
import { socialsIcon} from '../../localStorage/db';

const Blog = () => {
  return (
    <div className='blog'>
      <div className="blog_header">
        <h1>Blog</h1>
        <div className='socios'>
          <a href="https://www.linkedin.com/in/ekene-emmanuel-0b9167238" target="_blank" rel="noopener noreferrer">
            {socialsIcon.linkedIn}
          </a>
          <a href="https://twitter.com/ekky_boss" target="_blank" rel="noopener noreferrer">
            {socialsIcon.twitter}
          </a>
          <a href="https://www.instagram.com/ekky_boss" target="_blank" rel="noopener noreferrer">
            {socialsIcon.instagram}
          </a>
        </div>
      </div>

      <div className="blog-main container">
        <div>
          <h2>Welcome to my Blog</h2>
        </div>

        <div>
          <Loading />
        </div>
      </div>
    </div>
  )
}

export default Blog