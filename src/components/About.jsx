import React from 'react';
import { Link } from 'react-router-dom';
import { aboutAuthor, authorDetails, authorInfo, socialsIcon } from '../localStorage/db';
import TimeLines from './TimeLines';

const About = () => {
    return (
        <div className='about'>
            <header>
                <div className="about_header">
                    <h1>ABOUT ME</h1>
                    <div className='socios'>
                        <a href="mailto:johndoe@gmail">{socialsIcon.emailIcon} {authorInfo.email}</a>
                        <a href="tel:+1234567890">{socialsIcon.whatsappIcon} {authorInfo.number}</a>
                    </div>
                </div>
            </header>

            <main className='about_main'>
                <div className='about_profile container'>
                    <img src={authorInfo.img} alt={authorInfo.name} fluid />

                    <div className="about_profile_text">
                        <h2>{authorDetails.title}</h2>
                        <p>" No great man lives in vain "</p>
                        <div className="read_more_div hide">
                            <span className='read_more'>
                                <Link className='read_more_link' to="/about">EXPERIENCE</Link>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="about_main-col container">
                    <div className="about_text">
                        <p>{aboutAuthor.aboutMe4}</p>
                        <p>{aboutAuthor.aboutMe5}</p>
                    </div>
                </div>
            </main>

            <article className='experience_col container'>
                <div className='experience_header'>
                    <h1>My Experience</h1>
                </div>

                <div className="timeline">
                    <TimeLines />
                </div>
            </article>
        </div>
    )
}

export default About