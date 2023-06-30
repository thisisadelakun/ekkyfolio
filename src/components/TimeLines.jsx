import React from 'react';
import { Chrono } from 'react-chrono';

const experiences = [
    {
        cardDetailedText: `2 June 2020 to 8 July 2020`,
        cardTitle: "Business Analyst",
        cardSubtitle: 'Micro Ally Bank',
    },
    {

        cardTitle: "Business Analyst",
        cardSubtitle: "Micro Ally Bank",
        cardDetailedText: `2 June 2020 to 8 July 2020`,
    },
    {
        cardDetailedText: `2 June 2020 to 8 July 2020`,
        cardTitle: "Business Analyst",
        cardSubtitle: "Micro Ally Bank",
    },
]

const TimeLines = () => {
    return (
        <div>
            <div className='timeline-col' style={{ width: "100%", height: "100%" }}>
                <Chrono
                    items={experiences}
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
            </div>
        </div>
    )
}

export default TimeLines