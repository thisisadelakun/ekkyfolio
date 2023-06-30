import React from 'react';
import { aboutAuthor, authorDetails, authorInfo, socialsIcon } from '../localStorage/db';
import TimeLines from './TimeLines';

import { Link } from 'react-scroll';
import Faq from './Faq';

const About = () => {
    return (
        <div className='about'>
            <header>
                <div className="about_header">
                    <div className="about_header_txt">
                        <h1>About Me</h1>
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

            <main className='about_main container'>
                <div className='about_profile container'>
                    <img src={authorInfo.img} alt={authorInfo.name} className='img-fluid' />

                    <div className="about_profile_text">
                        <h2>{authorDetails.title}</h2>
                        <p>" No great man lives in vain "</p>
                        <div className="read_more_div hide">
                            <span className='read_more shadow'>
                                <Link
                                    style={{ cursor: "pointer" }}
                                    className='read_more_link'
                                    to="experience_col"
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={200}
                                >
                                    EXPERIENCE
                                </Link>

                            </span>
                        </div>
                    </div>
                </div>

                <div className="about_main-col container">
                    <div className="about_text">
                        <p>{aboutAuthor.aboutMe1}</p>
                        <p>{aboutAuthor.aboutMe2}</p>
                        <p>{aboutAuthor.aboutMe3}</p>
                        <p>{aboutAuthor.aboutMe4}</p>
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

            <footer>
                <Faq/>
            </footer>
        </div>
    )
}

export default About