<template>
  <div>
    <!-- Welcome Overlay -->
    <transition name="fade">
      <div v-if="!fadeOut" class="welcome-overlay" @click="fadeOutOverlay">
        <div class="welcome-content">
          <img src="/logo.jpeg" alt="JRD Architects Logo" class="logo">
          <div class="company-name-container">
            <h1 class="company-name">JRD Architects</h1>
          </div>
          <div class="click-instruction-container">
            <div class="click-instruction">Click anywhere to continue</div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Main Components -->
    <Header v-if="fadeOut" />
    <ProjectSlideshow v-if="fadeOut" />
    <Home />
    <ProjectsSection />
    <Prizes />
    <Clients />
    <ContactUs />
    <Footer />
    <FloatingContactButton />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Header from '~/components/Header.vue';
import Home from '~/components/home.vue';
import ProjectsSection from '~/components/ProjectsSection.vue';
import Prizes from '../components/Prizes.vue';
import Footer from '../components/Footer.vue';
import FloatingContactButton from '~/components/FloatingContactButton.vue';
import ProjectSlideshow from '~/components/ProjectSlideshow.vue';

const fadeOut = ref(false);

const fadeOutOverlay = () => {
  fadeOut.value = true;
  sessionStorage.setItem('welcomeShown', 'true');
};

const checkWelcomeOverlay = () => {
  if (sessionStorage.getItem('welcomeShown')) {
    fadeOut.value = true;
  }
};
onMounted(() => {
  checkWelcomeOverlay();
});
</script>

<style scoped>
.welcome-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
  overflow: hidden;
}

.welcome-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.logo {
  width: 120px;
  height: auto;
  margin-bottom: 16px;
  animation: pulse 2s infinite alternate;
  filter: grayscale(100%);
}

.company-name-container {
  position: relative;
  text-align: center;
  margin-bottom: 24px;
}

.company-name {
  font-size: 36px;
  font-weight: 700;
  color: black;
  letter-spacing: 3px;
  animation: fadeInUp 1s ease-out;
  margin-bottom: 8px;
}

.name-underline {
  height: 2px;
  background-color: black;
  margin: 0 auto;
  transform-origin: center;
  animation: lineGrow 1.2s ease-out forwards;
  opacity: 0.7;
}

.click-instruction-container {
  position: absolute;
  bottom: -80px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.click-instruction {
  font-size: 14px;
  color: #777;
  opacity: 0;
  animation: fadeIn 1s ease-out 1.5s forwards, float 2s ease-in-out infinite;
}

.dot-left, .dot-right {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #777;
  opacity: 0;
  transform: scale(0);
  animation: dotFadeAndScale 1.5s ease-out 1.2s forwards;
}

@keyframes lineGrow {
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}

@keyframes dotFadeAndScale {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.7;
    transform: scale(1);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.05);
  }
}

@keyframes fadeInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* Rest of your existing styles */
h2 {
  text-align: center;
  margin-bottom: 50px;
  font-size: 2.5rem;
  color: #333;
  position: relative;
}
</style>