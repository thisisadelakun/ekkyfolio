import React, { useEffect } from 'react';
import { firestore } from '../hooks/Firebase/firebase';
import { useQuery, useQueryClient } from 'react-query';
import { socialsIcon } from '../localStorage/db'

import Loading from '../hooks/loading/Loading';

const Archive = () => {

    const queryClient = useQueryClient();

    const fetchAuthorProjects = async () => {
        // Fetch author projects
        const snapshot = await firestore.collection('authorProjects').get();
        const data = snapshot.docs.map((doc) => {
            const project = doc.data();
            project.id = doc.id;
            return project;
        });
        return data;
    };

    const { data: authorProjects, isLoading: authorProjectsLoading } = useQuery('authorProjects', fetchAuthorProjects, {
        enabled: false, // Disable auto-fetching
        staleTime: Infinity, // Disable auto-fetching
        refetchOnWindowFocus: false, // Disable refetch on window focus
    });

    const fetchAllData = () => {
        // Manually trigger data fetching
        queryClient.prefetchQuery('authorProjects');
    };

    useEffect(() => {
        fetchAllData(); // Fetch data when the component is mounted or page is refreshed
    }, []);



    return (
        <div className='portfolio'>
            <div className="portfolio_header">
                <h1>PORTFOLIO</h1>
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


            <div className="portfolio-main container">
                <div className='portfolio-main-heading'>
                    <div className="portfolio-intro">
                        <h2>Unlock the Power of Data</h2>
                        <p>
                            Welcome to my portfolio, where I demonstrate my expertise as a statistician, data analyst, and business
                            analyst. I specialize in extracting actionable insights from complex data sets to drive informed
                            decision-making and uncover valuable opportunities.
                        </p>

                        <p>
                            Explore the projects below to see how I've applied my analytical skills and domain knowledge to solve
                            challenging problems, optimize processes, and drive business outcomes.
                        </p>
                    </div>

                </div>
                {authorProjectsLoading || !authorProjects ? (
                    <div className=" container">
                        <Loading />
                    </div>
                ) : (
                    <div className="project_list_col container">
                        {authorProjects.map(project => (
                            <div key={project.id} className='project_list'>
                                <div className='project_list-left'>
                                    <img src={project.img} style={{ width: "150px", height: "150px" }} className='img-fluid rounded-circle' />
                                </div>
                                <div className='project_list-right'>
                                    <h4>{project.title}</h4>
                                    <p>{project.content}</p>
                                    <small>~ {project.author}</small>
                                </div>
                            </div>

                        ))}
                    </div>
                )}

                <div>
                    <p>
                        With a keen eye for detail and a passion for uncovering patterns, I utilize advanced statistical
                        techniques and cutting-edge analytical tools to transform data into meaningful narratives. From
                        exploratory data analysis to predictive modeling, my work empowers businesses to make data-driven decisions
                        that lead to growth and success.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Archive