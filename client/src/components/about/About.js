import React from 'react';
import "./About.css";
import Daniel from '../../imgs/daniel.png';
import Jonathan from '../../imgs/jonathan.png';
import Eric from '../../imgs/eric.png';
import Tommy from '../../imgs/tommy.jpg';

const AboutUs = () => {
    return (
        <div>
            <h1>About Us</h1>
            <div class="about-text">
                <h2>Our Purpose</h2>
                <p> Bussin' Goods will be an e-commerce platform that start-ups can use to 
                    share their story and products. Our goal is to assist UW Foster's 
                    Entrepreneurship Program by building a platform for its student projects.
                </p>
                <br/>
                <p> Since our problem stems from the fact that start-ups often do not have
                    the same resources in comparison to larger businesses, we are hoping to 
                    provide a place for entrepreneurs to pursue their goal and have the 
                    support they need. As an information problem, we aim to provide a space 
                    for aspiring entrepreneurs to cultivate and grow their businesses and 
                    ideas with resources and support in order to assist in the growth of 
                    ideas. Not knowing the next steps or feeling lost can occur when being 
                    a startup, and this lack of resources and information is what we aim 
                    to help with. We want to provide a platform and community that allows 
                    anyone to prosper and grow their ideas into a reality. Specifically 
                    for the students in the entrepreneurship program, we hope to provide 
                    a community and to let underrepresented ideas prosper and create a 
                    space for diversity and growth.
                </p>
                <br/>

                <h2>The Team</h2>
                <div class="headshots">
                    <div class="headshot-text">
                        <img src={Daniel} alt="Daniel Pham" width = "200" height = "200"/>
                        <a href="https://www.linkedin.com/in/danieltpham/">Daniel Pham</a>
                    </div>
                    <div class="headshot-text">
                        <img src={Jonathan} alt="Jonathan Thomas" width = "200" height = "200"/>
                        <a href="https://www.linkedin.com/in/jonathan-jerry-thomas/">Jonathan Thomas</a>
                    </div>
                    <div class="headshot-text">
                        <img src={Eric} alt="Eric Le" width = "200" height = "200"/>
                        <a href="https://www.linkedin.com/in/eric-le-282591193/">Eric Le</a>
                    </div>
                    <div class="headshot-text">
                        <img src={Tommy} alt="Tommy Lam" width = "200" height = "200"/>
                        <a href="https://www.linkedin.com/in/tommy-h-lam/">Tommy Lam</a>
                    </div>
                </div>
            </div>
        </div>
        
    )
  }
  
  export default AboutUs;