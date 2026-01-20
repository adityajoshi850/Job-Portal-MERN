import React from 'react'

const About = (props) => {
    console.log(props);
    return (
        <div>
            <h1>My name is {props.name}</h1>
            This is About Page
        </div>
    )
}

export default About
