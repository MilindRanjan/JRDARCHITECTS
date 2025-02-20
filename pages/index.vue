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
    <!-- Floating Contact Button -->
    <button 
      v-if="fadeOut" 
      @click="toggleContactForm" 
      class="fixed right-6 bottom-6 w-14 h-14 bg-black text-white rounded-full shadow-lg 
             hover:bg-gray-800 transition-all duration-300 flex items-center justify-center 
             group z-50"
    >
      <img 
        src="/icons/message-circle-icon.svg" 
        alt="Message Icon" 
        class="w-6 h-6 group-hover:scale-110 transition-transform duration-300" 
      />
    </button>

    <!-- Contact Form Modal -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="showContactForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white w-full max-w-md mx-4 rounded-lg shadow-xl">
          <!-- Form Header -->
          <div class="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900">Contact Us</h2>
            <button 
              @click="toggleContactForm"
              class="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <img 
                src="/icons/cross.svg" 
                alt="Close Icon" 
                class="w-5 h-5 text-gray-500" 
              />
            </button>
          </div>
          <!--ge-->

          <!-- Form Content -->
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
      </div>
    </Transition>
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