import personalImage1 from '../assets/ekene_logo.png';
import personalImage2 from '../assets/ekene_logo_red.png';
import dataanalysis from '../assets/data_chart.png';
import businessanalysis from '../assets/business_chart.png';
import computing from '../assets/computing.png';
import cloud from '../assets/cloud_computing.png';
import collaboration from '../assets/collaboration.png';
import machinelearning from '../assets/machine_data.png';
import { MdOutlineWhatsapp, MdOutlineEmail } from 'react-icons/md'


export const authorInfo = {
    name: "Ekene Emmanuel",
    email: "johndoe@gmail.com",
    number: "+1-23- 4567-8900",
    location: "lorem ipsum dolor sit",
    jobTitle1: "Data Scientist",
    jobTitle2: "Business Analyst",
    img: personalImage2,

}

export const authorDetails = {
    title: "PERSONAL DETAILS",
    personalDetail1: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Est, aliquam doloremque dolore rem doloribus voluptate velit asperiores,
    accusamus et, assumenda fugit quasi? Excepturi laborum reprehenderit voluptates ducimus harum veritatis corrupti!`,
    personalDetail2: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Est, aliquam doloremque dolore rem doloribus voluptate velit asperiores,
    accusamus et, assumenda fugit quasi? Excepturi laborum reprehenderit voluptates ducimus harum veritatis corrupti!`,

}

export const aboutAuthor = {
    title: "ABOUT ME",
    img: personalImage1,
    aboutMe1: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Est, aliquam doloremque dolore rem doloribus voluptate velit asperiores,
    accusamus et, assumenda fugit quasi? Excepturi laborum reprehenderit voluptates ducimus harum veritatis corrupti!`,
    aboutMe2: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Est, aliquam doloremque dolore rem doloribus voluptate velit asperiores,
    accusamus et, assumenda fugit quasi? Excepturi laborum reprehenderit voluptates ducimus harum veritatis corrupti!`,
    aboutMe3: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Est, aliquam doloremque dolore rem doloribus voluptate velit asperiores,
    accusamus et, assumenda fugit quasi? Excepturi laborum reprehenderit voluptates ducimus harum veritatis corrupti!`,
    aboutMe4: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Est, aliquam doloremque dolore rem doloribus voluptate velit asperiores,
    accusamus et, assumenda fugit quasi? Excepturi laborum reprehenderit voluptates ducimus harum veritatis corrupti!`,
    aboutMe5: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Est, aliquam doloremque dolore rem doloribus voluptate velit asperiores,
    accusamus et, assumenda fugit quasi? Excepturi laborum reprehenderit voluptates ducimus harum veritatis corrupti!`,
}

export const authorServices = [
    {
        id: "1",
        title: "Data Analytics",
        icon: dataanalysis,
        info: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
    },

    {
        id: "2",
        title: "Data Evaluation",
        icon: computing,
        info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. "
    },

    {
        id: "3",
        title: "Business Analysis",
        icon: businessanalysis,
        info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. "
    },
    {
        id: "4",
        title: "Cloud Computing",
        icon: cloud,
        info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. "
    },
    {
        id: "5",
        title: "Collaboration ",
        icon: collaboration,
        info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. "
    },
    {
        id: "6",
        title: "Machine Learning",
        icon: machinelearning,
        info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. "
    }

]

export const authorSkils = [
    {
        id: "1",
        title: "Data Analytics",
        skills1: "statistical methods",
        skills2: "Data Mining",
        skills3: "Visualization"
    },
    {
        id: "2",
        title: "Business Analytics",
        skills1: "Critical Thinking",
        skills2: "Stakeholder Engagement",
        skills3: "Expectation Management"
    },
    {
        id: "3",
        title: "Machine Learning",
        skills1: "Python",
        skills2: "TensorFlow",
        skills3: "statistical methods"
    },
    {
        id: "4",
        title: "Others",
        skills1: "Negotiation skills",
        skills2: "Team work",
        skills3: "Problem solving"
    },
]

export const socialsIcon = {
    emailIcon: <MdOutlineEmail className='socialIcons' />,
    whatsappIcon: <MdOutlineWhatsapp className='socialIcons' />,
}