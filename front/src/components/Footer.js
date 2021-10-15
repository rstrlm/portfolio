import React from 'react'


// footer is where contact information is placed 
const Footer = () => {
    return (
      <footer className="footer">
          <section className="center">
            <article className="some">
              links to socialmedia
            </article>
            <article className="contact">
            email: <a href="mailto:email@email.com">email</a> 
            phone: <a href="tel:+3584012341234">+3584012341234</a>
            </article>
          
          </section>
      </footer>
    )
  }

export default Footer