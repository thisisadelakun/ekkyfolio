import React from 'react';
import ContactForm from '../../hooks/Forms/ContactForm';
import './Contact.css'

import { socialsIcon } from '../../localStorage/db';

const ContactPage = () => {
  return (
    <div className='contact-page'>
      <header>
        <div className="contact-page-header">
          <div className="contact-page-header-txt">
            <h1>Reach Out</h1>
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
        </div>

      </header>

      <main className='contact-page-main container'>
        <div>
          <h3>Let's work together</h3>
        </div>

        <div className='shadow contact-form'>
          <ContactForm />
        </div>
      </main>

    </div>
  );
};

export default ContactPage;
