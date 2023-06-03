import React from 'react'
import { authorProjects } from '../localStorage/db2';
import { authorInfo, socialsIcon } from '../localStorage/db'
import Card from 'react-bootstrap/Card';

const Archive = () => {
    return (
        <div className='portfolio'>
            <div className="portfolio_header">
                <h1>PORTFOLIO</h1>
                <div className='socios'>
                    <a href="mailto:johndoe@gmail">{socialsIcon.emailIcon} {authorInfo.email}</a> <br />
                    <a href="tel:+1234567890">{socialsIcon.whatsappIcon} {authorInfo.number}</a>
                </div>

            </div>
            <div className="article_list container">
                {authorProjects.map(project => (
                    <Card key={project.id} className='project_card'>
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
        </div>
    )
}

export default Archive