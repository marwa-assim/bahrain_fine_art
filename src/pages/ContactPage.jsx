import React from "react";
import "./ContactPage.css";

const ContactPage = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>Feel free to reach out for inquiries, suggestions, or collaboration.</p>

      <form
        className="contact-form"
        action="mailto:marwa.assim@gmail.com"
        method="POST"
        encType="text/plain"
      >
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" rows="5" required />
        <button type="submit">Send Message</button>
      </form>

      <div className="contact-info">
        <div>
          <h3>Support Details</h3>
          <p><strong>Email:</strong> marwa.assim@gmail.com</p>
          <p><strong>Phone:</strong> +973 3330 2902</p>
        </div>
        <div>
          <h3>Social Media</h3>
          <p>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a> |{" "}
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a> |{" "}
            <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
          </p>
        </div>
      </div>

      <div className="map-container">
        <h1>Location</h1>
        <iframe
          title="Location"
          src="https://maps.google.com/maps?q=Kingdom University, Bahrain&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;
