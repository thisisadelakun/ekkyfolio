import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Chrono } from 'react-chrono';
import { firestore } from '../hooks/Firebase/firebase';

import Skeleton from 'react-loading-skeleton';


const TimeLines = () => {

    const queryClient = useQueryClient();

    const fetchAuthorExperience = async () => {
        // Fetch author skills
        const snapshot = await firestore.collection('authorExperience').get();
        const data = snapshot.docs.map((doc) => {
            const experience = doc.data();
            experience.id = doc.id;
            return experience;
        });
        return data;
    };

    const { data: authorExperience, isLoading: authorExperienceLoading } = useQuery('authorExperience', fetchAuthorExperience, {
        enabled: false, // Disable auto-fetching
        staleTime: Infinity, // Disable auto-fetching
        refetchOnWindowFocus: false, // Disable refetch on window focus
    });

    const fetchAllData = async () => {
        queryClient.prefetchQuery('authorExperience');
    };

    useEffect(() => {
        fetchAllData(); // Fetch data when the component is mounted or page is refreshed
    }, []);

    return (
        <div>
            <div className='timeline-col' style={{ width: "100%", height: "100%" }}>
                {authorExperienceLoading || !authorExperience ? (
                    <Skeleton height={150} count={3} />
                ) : (
                    <Chrono
                        items={authorExperience}
                        mode="VERTICAL_ALTERNATING"
                        cardHeight={150}
                        cardWidth={300}
                        activeItemIndex={false}
                        hideControls={true}
                        theme={{
                            cardDetailsColor: 'rgba(0, 0, 0, 0.664)',
                            primary: 'blue',
                            titleColor: 'black',
                            cardTitleColor: 'black',
                            cardSubtitleColor: 'rgba(0, 0, 0, 0.664)',
                            detailsColor: "red"
                        }}


                    />
                )}
            </div>
        </div>
    )
}

export default TimeLines