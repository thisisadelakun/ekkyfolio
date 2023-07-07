import React from 'react'
import AuthorSkillsForm from './AuthorSkillsForm'
import AuthorServicesForm from './AuthorServicesForm'
import AuthorsInfoForm from './AuthorsInfoForm'
import AuthorExperienceForm from './AuthorExperienceForm'
import AuthorProjectForm from './AuthorProjectForm'
import ContactFormUI from './ContactFormUI'

const AdminForms = () => {
    return (
        <div
            style={{
                background: "inherit", width: "90%",
                margin: "auto", padding: "2rem 0",
                fontFamily: "'Montserrat', sans-serif",

            }}>
            <div>
                <h3
                    style={{
                        textAlign: "center"
                    }}>
                    Welcome Admin!
                </h3>

                <h5>Please note</h5>
                <ul>
                    <li
                        style={{
                            textTransform: "capitalize", fontFamily: "'Montserrat', sans-serif", margin: "0.3rem 0"
                        }}>You can edit, update and delete the information(s) below
                    </li>
                    <li
                        style={{
                            textTransform: "capitalize", fontFamily: "'Montserrat', sans-serif", margin: "0.3rem 0"
                        }}>When any actions is performed here, it will affect the front-end UI
                    </li>
                    <li
                        style={{
                            textTransform: "capitalize", fontFamily: "'Montserrat', sans-serif", margin: "0.3rem 0"
                        }}>Any actions performed here takes few seconds to show in your front-end UI
                    </li>
                    <li
                        style={{
                            textTransform: "capitalize", fontFamily: "'Montserrat', sans-serif", margin: "0.3rem 0"
                        }}>Use the "Refresh" buttton to fetch your data, this is done to prevent some unneccessary data fetching and saves
                        you from reads limits
                    </li>
                    <li
                        style={{
                            textTransform: "capitalize", fontFamily: "'Montserrat', sans-serif", margin: "0.3rem 0"
                        }}>
                        Your storage has a limit, so you do not need to come and edit everytime, once in 14 days is recommended else,
                        it will affect the way your project is been fetched(Exceeding Qouta)
                    </li>
                    <li
                        style={{
                            textTransform: "capitalize", fontFamily: "'Montserrat', sans-serif", margin: "0.3rem 0"
                        }}>Scroll horizontally if you are unable to see the full form</li>
                    <li
                        style={{
                            textTransform: "capitalize", fontFamily: "'Montserrat', sans-serif", margin: "0.3rem 0"
                        }}>Please make sure you logout when not in use. Thanks and enjoy!
                    </li> <br />
                </ul>
            </div>
            <AuthorsInfoForm />
            <AuthorServicesForm />
            <AuthorSkillsForm />
            <AuthorExperienceForm />
            <AuthorProjectForm />
            <ContactFormUI />
        </div>
    )
}

export default AdminForms