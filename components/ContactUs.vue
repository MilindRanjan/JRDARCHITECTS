<template>
    <section class="contact-section">
      <div class="contact-container">
        <h1 class="section-title">Contact Us</h1>
        
        <div class="contact-wrapper">
          <!-- Contact Information -->
          <div class="contact-info">
            <div class="info-block">
              <h2>Location</h2>
              <p>123 Architecture </p>
              <p>Indrapuri</p>
              <p>Patna, Bihar</p>
            </div>
  
            <div class="info-block">
              <h2>Contact</h2>
              <p>+91 123456789</p>
              <div class="social-links">
                <a href="https://linkedin.com/company/jrd-architects" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </div>
            </div>
  
            <div class="info-block">
              <h2>Hours</h2>
              <p>Monday - Friday</p>
              <p>9:00 AM - 9:00 PM</p>
            </div>
          </div>
  
          <!-- Quick Navigation -->
          <div class="quick-nav">
            <h2>Navigation</h2>
            <nav>
              <a href='/'>Home</a>
              <a href='/projects'>Projects</a>
              <a href="/about">About Us</a>
            </nav>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'ContactSection'
  }
  </script>
  
  <style scoped>
  .contact-container h1{
    text-align: center;
    font-size: 2.5rem;
    color: #333;
    position: relative;
  }
  .contact-section {
    padding: 120px 24px;
    background-color: #ffffff;
  }
  
  .contact-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .section-title {
    font-size: 32px;
    font-weight: 300;
    letter-spacing: -0.5px;
    color: #000000;
    margin-bottom: 80px;
    text-align: center;
    margin-top: -110px;
  }
  
  .contact-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
  }
  
  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 48px;
  }
  
  .info-block {
    border-left: 1px solid #000000;
    padding-left: 24px;
  }
  
  .info-block h2 {
    font-size: 18px;
    font-weight: 500;
    color: #000000;
    margin-bottom: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .info-block p {
    font-size: 16px;
    line-height: 1.6;
    color: #333333;
    margin: 4px 0;
  }
  
  .social-links {
    margin-top: 16px;
  }
  
  .social-links a {
    display: inline-block;
    color: #000000;
    text-decoration: none;
    margin-right: 24px;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: opacity 0.3s ease;
  }
  
  .social-links a:hover {
    opacity: 0.7;
  }
  
  .quick-nav {
    border-left: 1px solid #000000;
    padding-left: 24px;
  }
  
  .quick-nav h2 {
    font-size: 18px;
    font-weight: 500;
    color: #000000;
    margin-bottom: 24px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .quick-nav nav {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .quick-nav a {
    color: #333333;
    text-decoration: none;
    font-size: 16px;
    transition: color 0.3s ease;
  }
  
  .quick-nav a:hover {
    color: #000000;
  }
  
  @media (max-width: 768px) {
    .contact-section {
      padding: 80px 24px;
    }
  
    .contact-wrapper {
      grid-template-columns: 1fr;
      gap: 48px;
    }
  
    .section-title {
      margin-bottom: 40px;
      font-size: 28px;
      margin-top: -80px;
    }
  }
  </style>