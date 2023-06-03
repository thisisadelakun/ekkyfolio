import React from 'react';
import { authorInfo } from '../localStorage/db';
import email from '../assets/email_icon.png';
import twitter from '../assets/twitter_icon.png';
import linkedin from '../assets/linkedin_icon.png'

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
            </span></div>
          <div className='mail_to'>
            <span>
              <a href="mailto:johndoe@gmail">Get in touch</a>
            </span>
          </div>
        </div>
      </div>

      <div className='footer_main'>
        <div className='author_infos-col'>
          <div className="author_info">
            <p>{authorInfo.name}</p>
            <a href="mailto:johndoe@gmail">{authorInfo.email}</a> <br />
            <a href="tel:+1234567890">{authorInfo.number}</a>
          </div>
          <div className='social_media'>
            <a href="mailto:johndoe@gmail" target='_blank'><img src={linkedin} alt="email" width="32px" fluid /></a>
            <a href="www.linkedin.com"><img src={email} alt="email" width="30px" fluid /></a>
            <a href="www.twitter.com" target='_blank'><img src={twitter} alt="email" width="32px" fluid /></a>
          </div>
        </div>
        <div className="copyright">
          <span>© 2023 {authorInfo.name}</span>
        </div>
      </div>
    </div>
  )
}

export default Footer