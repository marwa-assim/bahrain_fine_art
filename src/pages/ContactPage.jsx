import React, { useState } from "react";
import "./ContactPage.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", message: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev, [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! Thank you.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p className="contact-subtext">We’d love to hear from you! Reach us via the form or details below.</p>

      <div className="contact-grid">
        <div className="contact-info">
          <h3>Support</h3>
          <p><strong>Email:</strong> support@bahrainart.com</p>
          <p><strong>Phone:</strong> +973 1234 5678</p>
          <div className="contact-socials">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-x-twitter"></i></a>
          </div>
          <h3>Location</h3>
          <iframe
            title="KU Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.814048482038!2d50.54608287596407!3d26.20804017707222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49a4d392e88c0f%3A0x1c61a77de0d0a473!2sKingdom%20University!5e0!3m2!1sen!2sbh!4v1718123123123"
            width="100%" height="250" style={{ border: 0 }} allowFullScreen="" loading="lazy">
          </iframe>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" name="name" required value={formData.name} onChange={handleChange} />

          <label>Email</label>
          <input type="email" name="email" required value={formData.email} onChange={handleChange} />

          <label>Message</label>
          <textarea name="message" required rows="5" value={formData.message} onChange={handleChange}></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
