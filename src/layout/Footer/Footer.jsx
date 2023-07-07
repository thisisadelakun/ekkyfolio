import React from 'react';
import { authorInfo } from '../../localStorage/db';
import { socialsIcon } from '../../localStorage/db';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer_header_col'>
        <div className="footer_header container">
          <div className='footer_contact'>
            <h4>
              CONTACT
            </h4>
          </div>
          <div className='wondering'>
            <span>
              WONDERING HOW YOU CAN MAKE THE BEST DECISIONS USING YOUR DATA?
            </span>
          </div>
          <div className='mail_to'>
            <span >
              <a href="mailto:johndoe@gmail">Get in touch</a>
            </span>
          </div>
        </div>
      </div>

      <div className='footer_main'>
        <div className='author_infos-col'>
          <div className="author_info">
            <p>{authorInfo.name}</p>
            <a href="mailto:info@ekeneemanuel.com">{authorInfo.email}</a> <br />
          </div>
          <div className='social_media'>
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
        <div className="copyright">
          <span className="copyRight">&copy; {new Date().getFullYear()} {authorInfo.name}.</span>
        </div>
      </div>
    </div>
  )
}

export default Footer