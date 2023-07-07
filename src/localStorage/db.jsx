import profilepic from '../assets/ekky_folio.jpg'
import dataanalysis from '../assets/data_chart.svg';
import businessanalysis from '../assets/businessanalysis.svg';
import computing from '../assets/computing.svg';
import cloud from '../assets/cloud_computing.svg';
import collaboration from '../assets/collaboration.svg';
import machinelearning from '../assets/machine_data.svg';
import logo1 from '../assets/ekenelogo1.svg'
import logo2 from '../assets/ekenelogo2.svg'
import { MdOutlineWhatsapp, MdOutlineEmail } from 'react-icons/md'
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import icon1 from '../assets/Icon1.svg'
import icon2 from '../assets/Icon2.svg'
import icon3 from '../assets/Icon3.svg'


export const authorInfo = {
    name: "Ekene Emmanuel",
    email: "info@ekeneemanuel.com",
    number: "+1-23- 4567-8900",
    location: "lorem ipsum dolor sit",
    jobTitle1: "Data Scientist",
    jobTitle2: "Business Analyst",
    jobDescription:"Unleashing Insights, Delivering Impactful Results, and Empowering Data-Driven Strategies.",
    img: profilepic,
    logo1: logo1,
    logo2: logo2,

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
    img: profilepic,
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
        skills1: "Statistical methods",
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
    linkedIn: <FaLinkedin className='socialIcons' />,
    instagram: <FaInstagram className='socialIcons' />,
    twitter: <FaTwitter className='socialIcons' />,
    icon1: icon1,
    icon2: icon2,
    icon3: icon3,
}