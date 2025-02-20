<template>
  
  <div>
    <!-- Welcome Overlay -->
    <transition name="fade">
      <div v-if="!fadeOut" class="welcome-overlay" @click="fadeOutOverlay">
        <!-- Ensure entire div is clickable by moving @click here -->
        <img src="/logo.jpeg" alt="Company Logo" class="logo">
        <h1 class="company-name">JRD Architects</h1>
      </div>
    </transition>

    <!-- Main Components -->
    <Header v-if="fadeOut" />
    <Home v-if="fadeOut" />
    <ProjectsSection />
    <Prizes />
    <Clients />
    <ContactUs />
    <Footer />
    <FloatingContactButton />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import emailjs from 'emailjs-com';
import Header from '~/components/Header.vue';
import Home from '~/components/home.vue';
import ProjectsSection from '~/components/ProjectsSection.vue';
import Achievements from '../components/Prizes.vue';
import Prizes from '../components/Prizes.vue';
import Footer from '../components/Footer.vue';
import FloatingContactButton from '~/components/FloatingContactButton.vue';

const fadeOut = ref(false);
const showContactForm = ref(false);

const formData = reactive({
  name: '',
  email: '',
  message: '',
});

const toggleContactForm = () => {
  showContactForm.value = !showContactForm.value;
};

const fadeOutOverlay = () => {
  fadeOut.value = true;
  sessionStorage.setItem('welcomeShown', 'true');
};

const checkWelcomeOverlay = () => {
  if (sessionStorage.getItem('welcomeShown')) {
    fadeOut.value = true;
  }
};

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
    formData.name = '';
    formData.email = '';
    formData.message = '';
    toggleContactForm();
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to send message. Please try again.");
  }
};

onMounted(() => {
  checkWelcomeOverlay();
});

</script>

<style scoped>
/* Welcome Overlay Styles */

.welcome-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
  opacity: 1;
  transform: scale(1);
  transition: none;
}
h2 {
  text-align: center;
  margin-bottom: 50px;
  font-size: 2.5rem;
  color: #333;
  position: relative;
}
.logo {
  width: 30%;
  max-width: 200px;
  animation: logo-bounce 1.2s infinite;
}

.company-name {
  font-size: 2em;
  font-weight: bold;
  margin-top: 20px;
  animation: fade-in 1s ease-out forwards;
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.fade-enter {
  opacity: 0;
  transform: scale(0.95);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

/* Animations */
@keyframes logo-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Contact Form */
.contact-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.contact-form {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.contact-form .form-submit {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007BFF;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.contact-form .form-close {
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  background: #ccc;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Floating Button Styles */
.contact-fab {
  position: fixed;
  right: 20px;
  bottom: 20px;
  background-color: #007BFF;
  color: white;
  padding: 15px 20px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}
.contact-fab:hover {
  background-color: #0056b3;
}
@media (max-width: 768px) {
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.6s ease;
  }
  .fade-enter, .fade-leave-to {
    transform: none;
  }
}
</style>