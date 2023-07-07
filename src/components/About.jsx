import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-scroll';
import Faq from './Faq';
import TimeLines from './TimeLines';
import { firestore } from '../hooks/Firebase/firebase';
import { socialsIcon, authorDetails } from '../localStorage/db';


import Skeleton from 'react-loading-skeleton';
import Loading from '../hooks/loading/Loading';


const About = () => {

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

    const { data: authorInfo, isLoading: authorInfoLoading } = useQuery('authorInfo', fetchAuthorInfo, {
        enabled: false, // Disable auto-fetching
        staleTime: Infinity, // Disable auto-fetching
        refetchOnWindowFocus: false, // Disable refetch on window focus
    });



    const fetchAllData = async () => {
        await queryClient.prefetchQuery('authorInfo');
    };

    useEffect(() => {
        fetchAllData(); // Fetch data when the component is mounted or page is refreshed
    }, []);

    return (
        <div className='about'>
            <header>
                <div className="about_header">
                    <div className="about_header_txt">
                        <h1>ABOUT ME</h1>
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
                    <div>
                        {authorInfoLoading || !authorInfo ? (
                            <div>
                                <Loading />
                            </div>
                        ) : (
                            <div>
                                <img src={authorInfo.profilePic} alt={authorInfo.firstName} className='img-fluid shadow' />
                            </div>
                        )}

                    </div>
                    <div className="about_profile_text">
                        <h2>{authorDetails.title}</h2>
                        <p>" No great man lives in vain "</p>
                        <div className="read_more_div ">
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

                {authorInfoLoading || !authorInfo ? (
                    <div>
                        <Skeleton height={500} width={450} />
                        <Skeleton height={500} width={450} />
                        <Skeleton height={500} width={450} />
                        <Skeleton height={500} width={450} />
                        <Skeleton height={500} width={450} />
                    </div>
                ) : (
                    <div className="about_main-col container">
                        <div className="about_text">
                            <p>{authorInfo.aboutPg1}</p>
                            <p>{authorInfo.aboutPg2}</p>
                            <p>{authorInfo.aboutPg3}</p>
                            <p>{authorInfo.aboutPg4}</p>
                            <p>{authorInfo.aboutPg5}</p>
                        </div>
                    </div>
                )}
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
                <Faq />
            </footer>
        </div>
    )
}

export default About