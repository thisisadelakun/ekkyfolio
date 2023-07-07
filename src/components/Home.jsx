import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import '../styles/style.css';
import Card from 'react-bootstrap/Card';
import { firestore } from '../hooks/Firebase/firebase';


import { authorDetails } from '../localStorage/db';
import Skeleton from 'react-loading-skeleton';




const Home = ({ ...rest }) => {
  const queryClient = useQueryClient();

  const fetchAuthorInfo = async () => {
    // Fetch author info
    const docRef = firestore.collection('authorInfo').doc('authorInfos');
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      return docSnapshot.data();
    } else {
      throw new Error('Author info not found');
    }
  };

  const fetchAuthorSkills = async () => {
    // Fetch author skills
    const snapshot = await firestore.collection('authorSkills').get();
    const data = snapshot.docs.map((doc) => {
      const skill = doc.data();
      skill.id = doc.id;
      return skill;
    });
    return data.reverse();
  };

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

  const fetchAuthorServices = async () => {
    // Fetch author services
    const snapshot = await firestore.collection('authorServices').get();
    const data = snapshot.docs.map((doc) => {
      const service = doc.data();
      service.id = doc.id;
      return service;
    });
    return data;
  };

  const { data: authorInfo, isLoading: authorInfoLoading } = useQuery('authorInfo', fetchAuthorInfo, {
    enabled: false, // Disable auto-fetching
    staleTime: Infinity, // Disable auto-fetching
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });

  const { data: authorSkills, isLoading: authorSkillsLoading } = useQuery('authorSkills', fetchAuthorSkills, {
    enabled: false, // Disable auto-fetching
    staleTime: Infinity, // Disable auto-fetching
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });

  const { data: authorProjects, isLoading: authorProjectsLoading } = useQuery('authorProjects', fetchAuthorProjects, {
    enabled: false, // Disable auto-fetching
    staleTime: Infinity, // Disable auto-fetching
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });

  const { data: authorServices, isLoading: authorServicesLoading } = useQuery('authorServices', fetchAuthorServices, {
    enabled: false, // Disable auto-fetching
    staleTime: Infinity, // Disable auto-fetching
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });

  const fetchAllData = async () => {
    await queryClient.prefetchQuery('authorInfo');
    queryClient.prefetchQuery('authorSkills');
    queryClient.prefetchQuery('authorProjects');
    queryClient.prefetchQuery('authorServices');
  };

  useEffect(() => {
    fetchAllData(); // Fetch data when the component is mounted or page is refreshed
  }, []);


  return (
    <div>
      <header className='header-home'>
        <div className="header-col container">
          {authorInfoLoading || !authorInfo ? (
            <div className='header-text'>
              <Skeleton height={30} width={200} />
              <h1>
                <Skeleton width={150} />
              </h1>
              <p>
                <Skeleton count={2} />
              </p>
              <small className='header-small'>
                <Skeleton width={250} />
              </small>
              <div className='resume_button'>
                <a className='shadow' href="/portfolio" >
                  PORTFOLIO
                </a>
              </div>
            </div>
          ) : (
            <div className='header-text'>
              <span className='i_am'>I am</span>
              <h1>{authorInfo?.firstName} {authorInfo?.lastName}</h1>
              <p>
                &mdash; a
                <span className='emphasis'> {authorInfo?.jobTitle1}</span> and a <span className='emphasis'>
                  {authorInfo?.jobTitle2}
                </span>.
              </p>

              <small className='header-small'>
                {authorInfo.jobDescription}
              </small>
              <div className='resume_button'>
                <a className='shadow' href="/portfolio" >
                  PORTFOLIO
                </a>
              </div>

            </div>
          )}

          <div className='header-img-col'>
            <div className="header-image-replica "></div>
            {authorInfoLoading || !authorInfo ? (
              <div className='header-image '>
                <Skeleton height={500} width={450} />
              </div>
            ) : (

              <div className='header-image '>
                <img src={authorInfo?.profilePic} alt={authorInfo?.firstName} className='img-fluid shadow' />
              </div>
            )}
          </div>

        </div>
      </header >



      <main className='home_main'>
        <div className="main-colbgr">
        </div>

        {authorInfoLoading || !authorInfo ? (
          <div className='main-col1 container'>
            <div className="main-col1-text">
              <h2>{authorDetails.title}</h2>
              <div className='main-text-first-p'>
                <Skeleton height={30} width={200} />
                <Skeleton count={2} />
              </div>
              <div className="read_more_div">
                <Skeleton height={40} width={120} />
              </div>
            </div>
          </div>
        ) : (
          <div className='main-col1 container'>

            <div className="main-col1-text">
              <h2>{authorDetails.title}</h2>
              <div className='main-text-first-p'>
                <p>{authorInfo.aboutPg1}</p>
                <p>{authorInfo.aboutPg2}</p>
              </div>

              <div className="read_more_div">
                <span className='shadow read_more'>
                  <a className='read_more_link' href="/about-me">READ MORE</a>
                </span>
              </div>
            </div>
          </div>
        )
        }

        <hr className='hr' />

        <div className='main-col2 container'>
          <div className='main-col2_text'>
            <h2>SERVICES</h2>
            <span>
              "I have a knack for analyzing complex data, business strategy and helping companies make smart, strategic decisions."
            </span>
          </div>

          <div className='service_col'>
            {authorServicesLoading || !authorServices ? (
              <>
                <Skeleton height={100} width={100} />
                <Skeleton height={30} width={200} />
                <Skeleton count={2} />
              </>
            ) : (
              authorServices.map(service => (
                <div key={service.id} className='service_list'>
                  <img src={service.icon} alt={service.title} width={80} />
                  <h5>{service.title}</h5>
                  <p>{service.jobDescription}</p>
                </div>
              ))
            )}
          </div>
        </div>
        <hr className='hr' />

        <div className='main-col2 container'>
          <div className='main-col2_text'>
            <h2>SKILLS</h2>
          </div>

          <div className='skills_col'>
            {authorSkillsLoading || !authorSkills ? (
              <div className='skills_col'>
                <Skeleton height={30} width={200} />
                <Skeleton count={5} />
              </div>
            ) : (
              <div className='skills_col'>
                {authorSkills?.map(skill => (
                  <div key={skill.id} className='skills-list' style={{ width: "100%" }}>
                    <h5>{skill.title}</h5>
                    <ul>
                      <p style={{ width: "100%" }}><span className='emphasis'>&mdash;</span> {skill.skills1}</p>
                      <p style={{ width: "100%" }}><span className='emphasis'>&mdash;</span> {skill.skills2}</p>
                      <p style={{ width: "100%" }}><span className='emphasis'>&mdash;</span> {skill.skills3}</p>
                      <p style={{ width: "100%" }}><span className='emphasis'>&mdash;</span> {skill.skills4}</p>
                      <p style={{ width: "100%" }}><span className='emphasis'>&mdash;</span> {skill.skills5}</p>
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <hr className='hr' />
      </main >

      <article>
        <div className='article_col container'>
          <div className="article_header">
            <h2>
              FEATURED WORKS
            </h2>
            <p>
              Take a tour through a curated collection of my exceptional featured works.
            </p>
          </div>
          {authorProjectsLoading || !authorProjects ? (
            <div className="article_list">
              <Skeleton height={230} width={300} count={3} />
            </div>
          ) : (
            <div className="article_list">
              {authorProjects.slice(0, 3).map(project => (
                <Card key={project.id} className='project_card shadow'>
                  <Card.Img variant="top" src={project.img} height="230px" className='img-fluid' />
                  <hr className='hr' />
                  <Card.Body>
                    <Card.Title>
                      <h2>{project.title}</h2>
                    </Card.Title>
                    <Card.Text>
                      <span>{project.content}</span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}

          <div className="read_more_div">
            <span className='read_more shadow'>
              <Link className='read_more_link ' to="/portfolio">SEE ALL</Link>
            </span>
          </div>
        </div>
      </article>
    </div >
  )
}

export default Home