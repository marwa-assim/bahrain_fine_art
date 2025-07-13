import React, { useState } from "react";
import { useLanguage } from '../contexts/LanguageContext';
import SuggestLandmark from '../components/SuggestLandmark';
import "./ContactPage.css";

const ContactPage = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    name: "", 
    email: "", 
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev, 
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Contact form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({ name: "", email: "", subject: "", message: "" });
      
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>{language === 'ar' ? 'تواصل معنا' : 'Contact Us'}</h1>
        <p className="contact-subtext">
          {language === 'ar' 
            ? 'نحن نحب أن نسمع منك! تواصل معنا عبر النموذج أو التفاصيل أدناه.'
            : 'We\'d love to hear from you! Reach us via the form or details below.'
          }
        </p>
      </div>

      <div className="contact-tabs">
        <button 
          className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
        </button>
        <button 
          className={`tab-btn ${activeTab === 'suggest' ? 'active' : ''}`}
          onClick={() => setActiveTab('suggest')}
        >
          {language === 'ar' ? 'اقترح معلماً' : 'Suggest Landmark'}
        </button>
      </div>

      {activeTab === 'contact' && (
        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-section">
              <h3>{language === 'ar' ? 'الدعم الفني' : 'Support'}</h3>
              <div className="info-item">
                <i className="fas fa-envelope"></i>
                <div>
                  <strong>{language === 'ar' ? 'البريد الإلكتروني:' : 'Email:'}</strong>
                  <span>support@bahrainheritage.com</span>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-phone"></i>
                <div>
                  <strong>{language === 'ar' ? 'الهاتف:' : 'Phone:'}</strong>
                  <span>+973 1234 5678</span>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-clock"></i>
                <div>
                  <strong>{language === 'ar' ? 'ساعات العمل:' : 'Working Hours:'}</strong>
                  <span>
                    {language === 'ar' 
                      ? 'الأحد - الخميس: 8:00 ص - 5:00 م'
                      : 'Sunday - Thursday: 8:00 AM - 5:00 PM'
                    }
                  </span>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>{language === 'ar' ? 'تابعنا' : 'Follow Us'}</h3>
              <div className="contact-socials">
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label="Twitter">
                  <i className="fab fa-x-twitter"></i>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>

            <div className="info-section">
              <h3>{language === 'ar' ? 'الموقع' : 'Location'}</h3>
              <iframe
                title="Bahrain Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.814048482038!2d50.54608287596407!3d26.20804017707222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49a4d392e88c0f%3A0x1c61a77de0d0a473!2sKingdom%20University!5e0!3m2!1sen!2sbh!4v1718123123123"
                width="100%" 
                height="250" 
                style={{ border: 0, borderRadius: '8px' }} 
                allowFullScreen="" 
                loading="lazy">
              </iframe>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>{language === 'ar' ? 'أرسل لنا رسالة' : 'Send us a Message'}</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">
                  {language === 'ar' ? 'الاسم *' : 'Name *'}
                </label>
                <input 
                  type="text" 
                  id="name"
                  name="name" 
                  required 
                  value={formData.name} 
                  onChange={handleChange}
                  placeholder={language === 'ar' ? 'اسمك الكامل' : 'Your full name'}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  {language === 'ar' ? 'البريد الإلكتروني *' : 'Email *'}
                </label>
                <input 
                  type="email" 
                  id="email"
                  name="email" 
                  required 
                  value={formData.email} 
                  onChange={handleChange}
                  placeholder={language === 'ar' ? 'your@email.com' : 'your@email.com'}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">
                {language === 'ar' ? 'الموضوع *' : 'Subject *'}
              </label>
              <input 
                type="text" 
                id="subject"
                name="subject" 
                required 
                value={formData.subject} 
                onChange={handleChange}
                placeholder={language === 'ar' ? 'موضوع رسالتك' : 'Subject of your message'}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">
                {language === 'ar' ? 'الرسالة *' : 'Message *'}
              </label>
              <textarea 
                id="message"
                name="message" 
                required 
                rows="6" 
                value={formData.message} 
                onChange={handleChange}
                placeholder={language === 'ar' 
                  ? 'اكتب رسالتك هنا...'
                  : 'Write your message here...'
                }
              />
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? (language === 'ar' ? 'جاري الإرسال...' : 'Sending...')
                : (language === 'ar' ? 'إرسال الرسالة' : 'Send Message')
              }
            </button>

            {submitStatus === 'success' && (
              <div className="status-message success">
                <i className="fas fa-check-circle"></i>
                <span>
                  {language === 'ar' 
                    ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.'
                    : 'Message sent successfully! We\'ll get back to you soon.'
                  }
                </span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="status-message error">
                <i className="fas fa-exclamation-circle"></i>
                <span>
                  {language === 'ar' 
                    ? 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.'
                    : 'Error sending message. Please try again.'
                  }
                </span>
              </div>
            )}
          </form>
        </div>
      )}

      {activeTab === 'suggest' && (
        <SuggestLandmark />
      )}
    </div>
  );
};

export default ContactPage;

