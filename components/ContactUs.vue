<template>
  <section class="contact-section">
    <div class="contact-container">
      <!-- Section Title -->
      <h1 class="section-title">
        <span class="title-text">Contact Us</span>
        <span class="title-line"></span>
      </h1>

      <!-- Contact Content -->
      <div class="contact-content">
        <!-- Left Side: Contact Form -->
        <div class="contact-form">
          <h2>Get in Touch</h2>
          <form @submit.prevent="handleSubmit" class="p-4 space-y-4">
            <div class="relative">
              <img 
                src="/icons/user-icon.svg" 
                alt="User Icon" 
                class="absolute left-3 top-3 w-5 h-5 text-gray-400" 
              />
              <input
                v-model="formData.name"
                type="text"
                placeholder="Your Name"
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                       focus:ring-black focus:border-transparent outline-none transition-all duration-200"
                required
              />
            </div>
            <div class="relative">
              <img 
                src="/icons/account-icon.svg" 
                alt="Account Icon" 
                class="absolute left-3 top-3 w-5 h-5 text-gray-400" 
              />
              <input
                v-model="formData.email"
                type="email"
                placeholder="Your Email"
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                       focus:ring-black focus:border-transparent outline-none transition-all duration-200"
                required
              />
            </div>
            <div class="relative">
              <img 
                src="/icons/message-text-icon.svg" 
                alt="Message Text Icon" 
                class="absolute left-3 top-3 w-5 h-5 text-gray-400" 
              />
              <textarea
                v-model="formData.message"
                placeholder="Your Message"
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                       focus:ring-black focus:border-transparent outline-none transition-all duration-200 
                       min-h-[120px] resize-none"
                required
              />
            </div>
            <button
              type="submit"
              class="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 
                     transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <img 
                src="/icons/send-icon.svg" 
                alt="Send Icon" 
                class="w-5 h-5" 
              />
              <span>Send Message</span>
            </button>
          </form>
        </div>

        <!-- Right Side: Info Sections -->
        <div class="contact-details">
          <!-- Location and Contact Row -->
          <div class="info-row">
            <div class="info-block">
              <h2>Location</h2>
              <p>Road no 8/8A, Indrapuri</p>
              <p>P.O. Keshri Nagar</p>
              <p>Patna-800024, Bihar</p>
            </div>
            <div class="info-block">
              <h2>Contact</h2>
              <p>+91 8709413556</p>
              <p>+91 9431623579</p>
            </div>
          </div>

          <!-- Hours and Nav Links Row -->
          <div class="info-row">
            <div class="info-block">
              <h2>Hours</h2>
              <p>Everyday</p>
              <p>9:00 AM - 9:00 PM</p>
            </div>
            <div class="info-block">
              <h2>Quick Links</h2>
              <nav>
                <a href="/">Home</a>
                <a href="/projects">Projects</a>
                <a href="/about">About</a>
              </nav>
            </div>
          </div>

          <!-- Social Media Buttons -->
          <div class="social-buttons">
            <a 
              href="https://www.linkedin.com/company/jrd-architects/" 
              target="_blank" 
              rel="noopener noreferrer"
              class="social-button linkedin"
            >
              <img src="@/static/linkedin.svg" alt="LinkedIn" class="social-icon" />
              <span>LinkedIn</span>
            </a>
            <a 
  href="https://wa.me/+918709413556" 
  target="_blank" 
  rel="noopener noreferrer"
  class="social-button whatsapp"
>
  <img src="@/static/whatsapp.svg" alt="WhatsApp" class="social-icon" />
  <span>WhatsApp</span>
</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue';
import emailjs from 'emailjs-com';
import Header from '~/components/Header.vue';

const formData = reactive({
  name: '',
  email: '',
  message: '',
});

const handleSubmit = async () => {
  try {
    const serviceID = "service_1v20ook";
    const templateID = "template_xmavmga";
    const userID = "FrrVOmajsxXNPXg3a";

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    await emailjs.send(serviceID, templateID, templateParams, userID);
    alert("Message sent successfully!");
    // Reset form
    formData.name = '';
    formData.email = '';
    formData.message = '';
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to send message. Please try again.");
  }
};
</script>

<style scoped>
.contact-section {
  padding: 120px 24px;
  background-color: #ffffff;
  overflow: hidden;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Section Title */
.section-title {
  text-align: center;
  margin-bottom: 80px;
  position: relative;
}

.title-text {
  font-size: 3rem;
  font-weight: 700;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 4px;
  display: inline-block;
}

.title-line {
  display: block;
  width: 100px;
  height: 4px;
  background-color: #000000;
  margin: 16px auto 0;
  animation: lineGrow 1.5s ease-in-out infinite alternate;
}

@keyframes lineGrow {
  0% { transform: scaleX(0.5); }
  100% { transform: scaleX(1); }
}

/* Contact Content Layout */
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
}

/* Contact Form */
.contact-form {
  background-color: #f9f9f9;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.contact-form h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 24px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.form-group {
  margin-bottom: 20px;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  color: #333333;
  transition: border-color 0.3s ease;
}
.form-group input:focus,
.form-group textarea:focus {
  border-color: #000000;
  outline: none;
}

.form-group textarea {
  resize: vertical;
}
button[type="submit"] {
  background-color: #000000;
  color: #ffffff;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #333333;
}
/* Contact Details */
.contact-details {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

.info-block {
  flex: 1;
  padding: 20px;
  border-left: 2px solid #000000;
  transition: transform 0.3s ease;
}

.info-block:hover {
  transform: translateX(10px);
}

.info-block h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.info-block p {
  font-size: 1rem;
  color: #333333;
  margin: 4px 0;
}

.info-block nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-block nav a {
  color: #333333;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.info-block nav a:hover {
  color: #000000;
}

/* Social Media Buttons */
.social-buttons {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.social-button {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* Space between icon and text */
  padding: 15px 30px;
  border: 2px solid #000000;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  border-radius: 100px;
}

.social-icon {
  width: 24px;
  height: 24px;
}

.social-button.linkedin {
  background-color: #000000;
  color: #ffffff;
}

.social-button.linkedin .social-icon {
  filter: brightness(0) invert(1); /* Makes LinkedIn icon white */
}

.social-button.linkedin:hover {
  background-color: #ffffff;
  border-color: #000000;
  color: #000000;
}

.social-button.linkedin:hover .social-icon {
  filter: brightness(0); /* Makes LinkedIn icon black on hover */
}
.social-button.whatsapp:hover .social-icon {
  filter: brightness(0) invert(1); /* Makes WhatsApp icon white on hover */
}

.social-button.whatsapp {
  background-color: #ffffff;
  color: #000000;
}

.social-button.whatsapp:hover {
  background-color: #000000;
  color: #ffffff;
}

.social-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
  }

  .info-row {
    flex-direction: column;
    gap: 20px;
  }

  .section-title .title-text {
    font-size: 2rem;
  }

  .title-line {
    width: 80px;
  }

  .social-buttons {
    flex-direction: column;
  }
}
</style>