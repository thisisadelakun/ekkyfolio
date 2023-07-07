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
    jobDescription: "Unleashing Insights, Delivering Impactful Results, and Empowering Data-Driven Strategies.",
    logo1: logo1,
    logo2: logo2,

}

export const authorDetails = {
    title: "PERSONAL DETAILS",
}



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