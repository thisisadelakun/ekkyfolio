import React from 'react';
import { Link } from 'react-router-dom'
import { authorInfo, authorDetails, authorServices, authorSkils } from '../localStorage/db';
import '../styles/style.css';
import Card from 'react-bootstrap/Card';
import { authorProjects } from '../localStorage/db2';


const Home = () => {
  return (
    <div>
      <header className='header-home'>
        <div className="header-col container">
          <div className='header-text'>
            <span className='i_am'>Hi, I am</span>
            <h1>{authorInfo.name}</h1>
            <p>&mdash; a <span className='emphasis'>
              {authorInfo.jobTitle1}</span> and a <span className='emphasis'>{authorInfo.jobTitle2}</span>.
            </p>
            <div className='resume_button'>
              <a className='' href="/portfolio" >
                PORTFOLIO
              </a>
            </div>
          </div>

          <div className='header-image '>
            <img src={authorInfo.img} alt={authorInfo.name} fluid />
          </div>
        </div>
      </header>

      <main className='home_main'>
        <div className='main-col1 container'>
          <h2>{authorDetails.title}</h2>

          <div className='main-text-first-p'>
            <p>I am Ekene Emmanuel, {authorDetails.personalDetail1}</p>
            <p>{authorDetails.personalDetail2}</p>
          </div>

          <div className="read_more_div">
            <span className='shadow read_more'>
              <a className='read_more_link' href="/about-me">READ MORE</a>
            </span>
          </div>
        </div>

        <hr className='hr' />

        <div className='main-col2 container'>
          <div className='main-col2_text'>
            <h2>SERVICES</h2>
            <span>
              "I have a knack for analyzing complex data, business strategy and helping companies make smart, strategic decisions."
            </span>
          </div>

          <div className='service_col'>
            {authorServices.map(service => (
              <div key={service.id} className='service_list'>
                <img src={service.icon} alt={service.title} width={50} />
                <h5>{service.title}</h5>
                <p>{service.info}</p>
              </div>
            ))}
          </div>
        </div>
        <hr className='hr' />

        <div className='main-col2 container'>
          <div className='main-col2_text'>
            <h2>SKILLS</h2>
          </div>

          <div className='skills_col'>
            {authorSkils.map(skill => (
              <div key={skill.id} className='skills-list'>
                <h5>{skill.title}</h5>
                <p><span className='emphasis'>&mdash;</span> {skill.skills1}</p>
                <p><span className='emphasis'>&mdash;</span> {skill.skills2}</p>
                <p><span className='emphasis'>&mdash;</span> {skill.skills3}</p>
              </div>
            ))}
          </div>
        </div>
        <hr className='hr' />
      </main>

      <article>
        <div className='article_col container'>
          <div className="article_header">
            <h2>
              FEATURED WORKS
            </h2>
            <p>Take a tour through a curated collection of my exceptional featured works.</p>
          </div>

          <div className="article_list">
            {authorProjects.slice(0, 3).map(project => (
              <Card key={project.id} className='project_card shadow'>
                <Card.Img variant="top" src={project.img} height="230px" fluid />
                <hr className='hr' />
                <Card.Body>
                  <Card.Title>
                    <h2>{project.title}</h2>
                  </Card.Title>
                  <Card.Text>
                    <p>{project.content}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>

          <div className="read_more_div">
            <span className='read_more'>
              <Link className='read_more_link' to="/portfolio">SEE ALL</Link>
            </span>
          </div>
        </div>
      </article>
    </div>
  )
}

export default Home