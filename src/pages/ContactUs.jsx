import React, { useState, useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import './ContactUs.css';

const ContactUs = () => {
  const { language, translations } = useContext(LanguageContext);
  const [activeForm, setActiveForm] = useState('message');
  const [messageForm, setMessageForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [landmarkForm, setLandmarkForm] = useState({
    landmarkName: '',
    location: '',
    description: '',
    category: '',
    submitterName: '',
    submitterEmail: '',
    images: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const contactInfo = {
    en: {
      title: "Contact Us",
      subtitle: "Get in touch with us for any inquiries about Bahrain's heritage",
      messageFormTitle: "Send us a Message",
      landmarkFormTitle: "Suggest a New Landmark",
      contactInfoTitle: "Contact Information",
      locationTitle: "Our Location",
      followUsTitle: "Follow Us",
      phone: "+973 1234 5678",
      email: "info@bahrainheritage.com",
      address: "Manama, Kingdom of Bahrain",
      workingHours: "Sunday - Thursday: 8:00 AM - 5:00 PM",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      landmarkName: "Landmark Name",
      location: "Location",
      description: "Description",
      category: "Category",
      submitterName: "Your Name",
      submitterEmail: "Your Email",
      uploadImages: "Upload Images",
      sendMessage: "Send Message",
      suggestLandmark: "Suggest Landmark",
      sending: "Sending...",
      messageSent: "Message sent successfully!",
      landmarkSuggested: "Landmark suggestion submitted successfully!",
      error: "An error occurred. Please try again.",
      categories: {
        historical: "Historical",
        religious: "Religious",
        modern: "Modern",
        cultural: "Cultural",
        natural: "Natural",
        commercial: "Commercial"
      }
    },
    ar: {
      title: "اتصل بنا",
      subtitle: "تواصل معنا لأي استفسارات حول تراث البحرين",
      messageFormTitle: "أرسل لنا رسالة",
      landmarkFormTitle: "اقترح معلماً جديداً",
      contactInfoTitle: "معلومات الاتصال",
      locationTitle: "موقعنا",
      followUsTitle: "تابعنا",
      phone: "+973 1234 5678",
      email: "info@bahrainheritage.com",
      address: "المنامة، مملكة البحرين",
      workingHours: "الأحد - الخميس: 8:00 صباحاً - 5:00 مساءً",
      name: "الاسم",
      email: "البريد الإلكتروني",
      subject: "الموضوع",
      message: "الرسالة",
      landmarkName: "اسم المعلم",
      location: "الموقع",
      description: "الوصف",
      category: "الفئة",
      submitterName: "اسمك",
      submitterEmail: "بريدك الإلكتروني",
      uploadImages: "رفع الصور",
      sendMessage: "إرسال الرسالة",
      suggestLandmark: "اقتراح المعلم",
      sending: "جاري الإرسال...",
      messageSent: "تم إرسال الرسالة بنجاح!",
      landmarkSuggested: "تم تقديم اقتراح المعلم بنجاح!",
      error: "حدث خطأ. يرجى المحاولة مرة أخرى.",
      categories: {
        historical: "تاريخي",
        religious: "ديني",
        modern: "حديث",
        cultural: "ثقافي",
        natural: "طبيعي",
        commercial: "تجاري"
      }
    }
  };

  const t = contactInfo[language];

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate email sending (replace with actual email service)
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageForm),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setMessageForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    }
    
    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus(''), 3000);
  };

  const handleLandmarkSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      Object.keys(landmarkForm).forEach(key => {
        if (key === 'images') {
          landmarkForm.images.forEach(image => {
            formData.append('images', image);
          });
        } else {
          formData.append(key, landmarkForm[key]);
        }
      });
      
      // Simulate landmark suggestion submission
      const response = await fetch('/api/suggest-landmark', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        setSubmitStatus('landmark-success');
        setLandmarkForm({
          landmarkName: '',
          location: '',
          description: '',
          category: '',
          submitterName: '',
          submitterEmail: '',
          images: []
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error suggesting landmark:', error);
      setSubmitStatus('error');
    }
    
    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus(''), 3000);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setLandmarkForm(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index) => {
    setLandmarkForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className={`contact-us ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">{t.title}</h1>
            <p className="hero-subtitle">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="contact-container">
        {/* Form Toggle Buttons */}
        <div className="form-toggle">
          <button
            className={`toggle-btn ${activeForm === 'message' ? 'active' : ''}`}
            onClick={() => setActiveForm('message')}
          >
            <i className="fas fa-envelope"></i>
            {t.messageFormTitle}
          </button>
          <button
            className={`toggle-btn ${activeForm === 'landmark' ? 'active' : ''}`}
            onClick={() => setActiveForm('landmark')}
          >
            <i className="fas fa-map-marker-alt"></i>
            {t.landmarkFormTitle}
          </button>
        </div>

        <div className="contact-content">
          {/* Forms Section */}
          <div className="forms-section">
            {/* Message Form */}
            {activeForm === 'message' && (
              <div className="form-container message-form">
                <h2 className="form-title">
                  <i className="fas fa-envelope"></i>
                  {t.messageFormTitle}
                </h2>
                <form onSubmit={handleMessageSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">{t.name}</label>
                    <input
                      type="text"
                      id="name"
                      value={messageForm.name}
                      onChange={(e) => setMessageForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">{t.email}</label>
                    <input
                      type="email"
                      id="email"
                      value={messageForm.email}
                      onChange={(e) => setMessageForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">{t.subject}</label>
                    <input
                      type="text"
                      id="subject"
                      value={messageForm.subject}
                      onChange={(e) => setMessageForm(prev => ({ ...prev, subject: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">{t.message}</label>
                    <textarea
                      id="message"
                      rows="5"
                      value={messageForm.message}
                      onChange={(e) => setMessageForm(prev => ({ ...prev, message: e.target.value }))}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    <i className="fas fa-paper-plane"></i>
                    {isSubmitting ? t.sending : t.sendMessage}
                  </button>
                </form>
              </div>
            )}

            {/* Landmark Suggestion Form */}
            {activeForm === 'landmark' && (
              <div className="form-container landmark-form">
                <h2 className="form-title">
                  <i className="fas fa-map-marker-alt"></i>
                  {t.landmarkFormTitle}
                </h2>
                <form onSubmit={handleLandmarkSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="landmarkName">{t.landmarkName}</label>
                      <input
                        type="text"
                        id="landmarkName"
                        value={landmarkForm.landmarkName}
                        onChange={(e) => setLandmarkForm(prev => ({ ...prev, landmarkName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="location">{t.location}</label>
                      <input
                        type="text"
                        id="location"
                        value={landmarkForm.location}
                        onChange={(e) => setLandmarkForm(prev => ({ ...prev, location: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">{t.category}</label>
                    <select
                      id="category"
                      value={landmarkForm.category}
                      onChange={(e) => setLandmarkForm(prev => ({ ...prev, category: e.target.value }))}
                      required
                    >
                      <option value="">Select Category</option>
                      {Object.entries(t.categories).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">{t.description}</label>
                    <textarea
                      id="description"
                      rows="4"
                      value={landmarkForm.description}
                      onChange={(e) => setLandmarkForm(prev => ({ ...prev, description: e.target.value }))}
                      required
                    ></textarea>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="submitterName">{t.submitterName}</label>
                      <input
                        type="text"
                        id="submitterName"
                        value={landmarkForm.submitterName}
                        onChange={(e) => setLandmarkForm(prev => ({ ...prev, submitterName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="submitterEmail">{t.submitterEmail}</label>
                      <input
                        type="email"
                        id="submitterEmail"
                        value={landmarkForm.submitterEmail}
                        onChange={(e) => setLandmarkForm(prev => ({ ...prev, submitterEmail: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="images">{t.uploadImages}</label>
                    <div className="image-upload">
                      <input
                        type="file"
                        id="images"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      <div className="upload-area">
                        <i className="fas fa-cloud-upload-alt"></i>
                        <p>Click to upload or drag and drop images</p>
                      </div>
                    </div>
                    {landmarkForm.images.length > 0 && (
                      <div className="uploaded-images">
                        {landmarkForm.images.map((image, index) => (
                          <div key={index} className="uploaded-image">
                            <img src={URL.createObjectURL(image)} alt={`Upload ${index + 1}`} />
                            <button type="button" onClick={() => removeImage(index)}>
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    <i className="fas fa-plus"></i>
                    {isSubmitting ? t.sending : t.suggestLandmark}
                  </button>
                </form>
              </div>
            )}

            {/* Status Messages */}
            {submitStatus && (
              <div className={`status-message ${submitStatus.includes('success') ? 'success' : 'error'}`}>
                <i className={`fas ${submitStatus.includes('success') ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                {submitStatus === 'success' && t.messageSent}
                {submitStatus === 'landmark-success' && t.landmarkSuggested}
                {submitStatus === 'error' && t.error}
              </div>
            )}
          </div>

          {/* Contact Information Section */}
          <div className="contact-info-section">
            <div className="contact-info">
              <h3 className="info-title">
                <i className="fas fa-info-circle"></i>
                {t.contactInfoTitle}
              </h3>
              <div className="info-items">
                <div className="info-item">
                  <i className="fas fa-phone"></i>
                  <div>
                    <strong>Phone</strong>
                    <p>{t.phone}</p>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <strong>Email</strong>
                    <p>{t.email}</p>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <strong>Address</strong>
                    <p>{t.address}</p>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fas fa-clock"></i>
                  <div>
                    <strong>Working Hours</strong>
                    <p>{t.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="social-media">
              <h3 className="info-title">
                <i className="fas fa-share-alt"></i>
                {t.followUsTitle}
              </h3>
              <div className="social-links">
                <a href="https://facebook.com/bahrainheritage" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com/bahrainheritage" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://instagram.com/bahrainheritage" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://youtube.com/bahrainheritage" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="https://linkedin.com/company/bahrainheritage" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="map-section">
              <h3 className="info-title">
                <i className="fas fa-map"></i>
                {t.locationTitle}
              </h3>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115681.57953818712!2d50.47624073125!3d26.228516400000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49a5b5d5b5b5b5%3A0x5b5b5b5b5b5b5b5b!2sManama%2C%20Bahrain!5e0!3m2!1sen!2sus!4v1625097600000!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bahrain Heritage Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

