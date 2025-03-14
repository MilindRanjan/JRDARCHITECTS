<template>
  <section class="slideshow-section relative">
    <!-- Section Header -->
    <div class="absolute top-0 left-0 z-20 p-8 md:p-12 w-full">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-white text-xl md:text-2xl font-light tracking-widest uppercase">Featured Projects</h1>
      </div>
    </div>
    
    <div class="slideshow-container mt-20" :style="{ opacity: scrollOpacity }">
      
      <!-- Main Slideshow -->
      <div class="relative h-[80vh] overflow-hidden">
        <!-- Main Slides with Clean Fade Transitions -->
<div 
  v-for="(slide, index) in slides" 
  :key="slide.id"
  class="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
  :style="{ 
    opacity: currentSlide === index ? 1 : 0,
    // Remove the visibility property that causes abrupt changes
    zIndex: currentSlide === index ? 2 : 1
  }"
>
          <!-- Two-column layout for image and content -->
          <div class="relative w-full h-full flex flex-col md:flex-row">
            <!-- Image Container with Simple Fade Effect -->
            <div class="relative w-full md:w-3/4 h-3/4 md:h-full overflow-hidden">
              <div class="w-full h-full bg-black flex items-center justify-center">
                <img 
  :src="`/${slide.mainImage}`" 
  :alt="slide.name"
  class="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
  :style="{
    opacity: currentSlide === index ? 1 : 0
  }"
  @load="onImageLoad(index)"
/>
              </div>
              <!-- Simple Gradient Overlay -->
              <div 
                class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-black/20 md:to-black/90 transition-opacity duration-1000"
                :class="{
                  'opacity-100': currentSlide === index,
                  'opacity-0': currentSlide !== index
                }"
              ></div>
            </div>
            
            <!-- Content Container with Staggered Animations -->
            <div class="absolute md:relative bottom-0 left-0 right-0 md:bottom-auto md:left-auto md:right-auto p-8 md:p-12 text-white md:w-1/4 md:h-full bg-black/80 md:bg-black flex items-end md:items-center">
              <div class="w-full">
                <!-- Staggered Animation Container -->
                <div class="space-y-6">
                  <!-- Project Title with Reveal Animation -->
                  <div class="overflow-hidden">
                    <h2 
                      class="text-3xl md:text-4xl font-light tracking-wide transform transition-all duration-1000 ease-out"
                      :class="{
                        'translate-y-0 opacity-100': currentSlide === index,
                        'translate-y-full opacity-0': currentSlide !== index
                      }"
                      :style="{
                        transitionDelay: currentSlide === index ? '300ms' : '0ms'
                      }"
                    >
                      {{ slide.name }}
                    </h2>
                  </div>
                  
                  <!-- Animated Divider Line -->
                  <div 
                    class="w-16 h-px bg-white transform transition-all duration-700 origin-left ease-out"
                    :class="{
                      'scale-x-100 opacity-100': currentSlide === index,
                      'scale-x-0 opacity-0': currentSlide !== index
                    }"
                    :style="{
                      transitionDelay: currentSlide === index ? '500ms' : '0ms'
                    }"
                  ></div>
                  
                  <!-- Project Description with Fade-up Animation -->
                  <p 
                    class="text-white/80 transform transition-all duration-1000 ease-out"
                    :class="{
                      'translate-y-0 opacity-100': currentSlide === index,
                      'translate-y-8 opacity-0': currentSlide !== index
                    }"
                    :style="{
                      transitionDelay: currentSlide === index ? '700ms' : '0ms'
                    }"
                  >
                    {{ slide.description }}
                  </p>
                  
                  <!-- Action Buttons with Delayed Appearance -->
                  <div 
                    class="flex items-center gap-6 transform transition-all duration-1000 ease-out"
                    :class="{
                      'translate-y-0 opacity-100': currentSlide === index,
                      'translate-y-8 opacity-0': currentSlide !== index
                    }"
                    :style="{
                      transitionDelay: currentSlide === index ? '900ms' : '0ms'
                    }"
                  >
                    <button 
                      @click="viewProject(slide)" 
                      class="group px-8 py-3 bg-white text-black hover:bg-black border border-transparent hover:border-white hover:text-white transition-all duration-500 tracking-wider text-sm relative overflow-hidden"
                    >
                      <span class="relative z-10">View Project</span>
                      <span class="absolute inset-0 bg-black transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Enhanced Navigation Controls -->
        <div class="absolute z-10 inset-x-0 bottom-0 top-0 flex items-center justify-between pointer-events-none">
          <div class="pointer-events-auto pl-4 md:pl-8">
            <button @click="prevSlide" 
                    class="group w-12 h-12 flex items-center justify-center backdrop-blur-sm bg-black/20 rounded-full border border-white/20 hover:border-white/60 hover:bg-black/40 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-white/70 group-hover:text-white transition-all duration-300 transform group-hover:-translate-x-0.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          </div>
          
          <div class="pointer-events-auto pr-4 md:pr-8">
            <button @click="nextSlide" 
                    class="group w-12 h-12 flex items-center justify-center backdrop-blur-sm bg-black/20 rounded-full border border-white/20 hover:border-white/60 hover:bg-black/40 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-white/70 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-0.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Controls and Status Information -->
        <div class="absolute z-10 bottom-8 left-8 md:left-12 flex items-center gap-6">
          <!-- Autoplay Toggle - Icon Only -->
          <button @click="toggleAutoplay" 
                  class="text-white/60 hover:text-white transition-colors duration-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5" v-if="autoplayEnabled">
              <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clip-rule="evenodd" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5" v-else>
              <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
            </svg>
          </button>
          
          <!-- Current Slide Info -->
          <div class="text-white/50 text-xs tracking-widest hidden md:block">
            {{ String(currentSlide + 1).padStart(2, '0') }} / {{ String(slides.length).padStart(2, '0') }}
          </div>
        </div>
        
        <!-- Relocated Progress Indicators to Bottom -->
        <div class="absolute z-10 bottom-8 left-0 right-0 flex justify-center">
          <div class="flex items-center gap-3">
            <div v-for="(slide, index) in slides" 
                 :key="slide.id"
                 @click="goToSlide(index)"
                 class="cursor-pointer group flex flex-col items-center">
              <div class="relative h-1 w-10 bg-white/20 overflow-hidden rounded-full transition-all duration-300"
                   :class="{ 'w-16 bg-white/40': currentSlide === index }">
                <div v-if="currentSlide === index && autoplayEnabled" 
                     class="absolute inset-0 h-full bg-white rounded-full" 
                     :style="{ width: `${progressPercentage}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Scroll to Home Button -->
    <div class="flex justify-center mt-8" :style="{ opacity: scrollOpacity }">
      <button 
        @click="scrollToHome" 
        class="group w-12 h-12 flex items-center justify-center bg-black/70 rounded-full border border-white/20 hover:border-white/60 hover:bg-black/90 transition-all duration-300 animate-bounce"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-white/70 group-hover:text-white transition-all duration-300">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
        </svg>
      </button>
    </div>

    <!-- Project Modal -->
    <ProjectModal 
      :show="isModalVisible" 
      :project="selectedProject" 
      @close="closeModal" 
    />
  </section>
</template>
  
<script>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import ProjectModal from './ProjectModal.vue';

export default {
  name: 'ProjectSlideshow',
  components: {
    ProjectModal
  },
  setup() {
    // Sample data - replace with your actual project data
    const slides = [
    {
        id: 1,
        name: 'BIPARD',
    mainImage: 'Projects/COMPETITIONS/BIPARD, GAYA/1.jpg',
    additionalImages: [
      'Projects/COMPETITIONS/BIPARD, GAYA/2.jpg',
      'Projects/COMPETITIONS/BIPARD, GAYA/3.png',
      'Projects/COMPETITIONS/BIPARD, GAYA/4.jpg',
      'Projects/COMPETITIONS/BIPARD, GAYA/5.jpg',
      'Projects/COMPETITIONS/BIPARD, GAYA/6.png',
    ],
    description: 'Contemporary architectural design with sustainable elements',
    category: 'COMMERCIAL',
      },
      {
        id: 2,
        name: "State Guest House, Patna",
    mainImage: 'Projects/COMPETITIONS/Desh Ratna Marg/1.jpg',
    additionalImages: [
      'Projects/COMPETITIONS/Desh Ratna Marg/2.jpg',
      'Projects/COMPETITIONS/Desh Ratna Marg/3.jpg',
      'Projects/COMPETITIONS/Desh Ratna Marg/4.jpg',
    ],
    description: "Outstanding Urban Development achievement for transforming public spaces into vibrant community centers while preserving cultural heritage.",
    category: 'COMMERCIAL',
      },
      {
        id: 3,
        name: "Bal Bhawan",
    mainImage: 'Projects/COMPETITIONS/Bal Bhawan Patna/1.jpg',
    additionalImages: [
      'Projects/COMPETITIONS/Bal Bhawan Patna/2.jpg',
    ],
    description: "Best Residential Complex Design award for creating sustainable, community-focused living spaces that redefine modern urban housing.",
    category: 'COMMERCIAL',
      }
    ];

    // Modal state
    const selectedProject = ref(null);
    const isModalVisible = ref(false);

    // Slideshow state
    const currentSlide = ref(0);
    const previousSlide = ref(0);
    const scrollOpacity = ref(1);
    const autoplayEnabled = ref(true);
    const slideInterval = ref(6000); // 4 seconds per slide
    const progressPercentage = ref(0);
    const touchStartX = ref(0);
    const touchEndX = ref(0);
    const isPreloadingActive = ref(true);
    let timerInterval;
    let progressInterval;

    // Track slide direction for animations
    const slideDirection = ref('next');

    // Modal functions
    const viewProject = (slide) => {
      // Structure the project data to match ProjectModal's expected format
      selectedProject.value = {
        title: slide.name,
        name: slide.name,
        mainImage: slide.mainImage,
        additionalImages: slide.additionalImages || [],
        description: slide.description,
        category: slide.category || '',
        date: slide.date || new Date().toISOString(),
        location: slide.location || ''
      };
      
      // Show the modal
      isModalVisible.value = true;
    };

    const closeModal = () => {
      isModalVisible.value = false;
      
      // Resume autoplay when modal is closed
      if (autoplayEnabled.value) {
        startAutoplay();
      }
    };

    // Touch handling for mobile users
    const handleTouchStart = (e) => {
      touchStartX.value = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      touchEndX.value = e.changedTouches[0].clientX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const SWIPE_THRESHOLD = 50;
      if (touchStartX.value - touchEndX.value > SWIPE_THRESHOLD) {
        nextSlide();
      } else if (touchEndX.value - touchStartX.value > SWIPE_THRESHOLD) {
        prevSlide();
      }
    };

    // Image preloading
    const preloadImages = () => {
      slides.forEach((slide, index) => {
        const img = new Image();
        img.src = `/${slide.mainImage}`;
        img.onload = () => {
          slides[index].loaded = true;
        };
        
        // Also preload additionalImages for modal
        if (slide.additionalImages && slide.additionalImages.length > 0) {
          slide.additionalImages.forEach(imgSrc => {
            const additionalImg = new Image();
            additionalImg.src = `/${imgSrc}`;
          });
        }
      });
    };

    const onImageLoad = (index) => {
      slides[index].loaded = true;
    };
    const nextSlide = () => {
  previousSlide.value = currentSlide.value;
  slideDirection.value = 'next';
  
  // Simplified transition - just update the slide index
  currentSlide.value = (currentSlide.value + 1) % slides.length;
  resetTimers();
};

const prevSlide = () => {
  previousSlide.value = currentSlide.value;
  slideDirection.value = 'prev';
  
  // Simplified transition - just update the slide index
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
  resetTimers();
};

    const goToSlide = (index) => {
      if (index === currentSlide.value) return;
      previousSlide.value = currentSlide.value;
      slideDirection.value = index > currentSlide.value ? 'next' : 'prev';
      
      // Add fade-out effect
      const slidesElements = document.querySelectorAll('.slideshow-container img');
      if (slidesElements[currentSlide.value]) {
        slidesElements[currentSlide.value].style.opacity = '0';
      }
      
      // Change slide after short delay
      setTimeout(() => {
        currentSlide.value = index;
        
        // Fade in the new slide
        setTimeout(() => {
          if (slidesElements[currentSlide.value]) {
            slidesElements[currentSlide.value].style.opacity = '1';
          }
        }, 50);
        
        resetTimers();
      }, 300);
    };

    const toggleAutoplay = () => {
      autoplayEnabled.value = !autoplayEnabled.value;
      if (autoplayEnabled.value) {
        startAutoplay();
      } else {
        clearInterval(timerInterval);
        clearInterval(progressInterval);
      }
    };

    const startAutoplay = () => {
      if (autoplayEnabled.value) {
        timerInterval = setInterval(() => {
          nextSlide();
        }, slideInterval.value);
        
        // Progress bar
        progressPercentage.value = 0;
        const step = 16; // Update every 16ms for smoother animation
        progressInterval = setInterval(() => {
          progressPercentage.value += (step / slideInterval.value) * 100;
          if (progressPercentage.value >= 100) {
            progressPercentage.value = 100;
          }
        }, step);
      }
    };

    const resetTimers = () => {
      clearInterval(timerInterval);
      clearInterval(progressInterval);
      progressPercentage.value = 0;
      if (autoplayEnabled.value && !isModalVisible.value) {
        startAutoplay();
      }
    };

    // Enhanced scroll handler with easing
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const fadeStart = 0;
      const fadeEnd = window.innerHeight * 0.4;
      const opacity = 1 - Math.min(Math.max((scrollPosition - fadeStart) / (fadeEnd - fadeStart), 0), 1);
      scrollOpacity.value = opacity;
    };

    // Keyboard navigation
    const handleKeyDown = (e) => {
      if (isModalVisible.value) return; // Don't handle slideshow keys when modal is open
      
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    // Ensure modal component is properly registered
    const checkComponents = () => {
      if (!ProjectModal) {
        console.error('ProjectModal component is not properly imported');
      }
    };

    // Preload next slide when current slide changes
    watch(currentSlide, (newVal) => {
      const nextIndex = (newVal + 1) % slides.length;
      if (!slides[nextIndex].loaded) {
        const img = new Image();
        img.src = `/${slides[nextIndex].mainImage}`;
        img.onload = () => {
          slides[nextIndex].loaded = true;
        };
      }
    });

    const scrollToHome = () => {
      const homeElement = document.querySelector('#home') || document.querySelector('.home-section');
      if (homeElement) {
        homeElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Fallback if no specific element is found - scroll down one viewport height
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      }
    };

    onMounted(() => {
      checkComponents();
      preloadImages();
      startAutoplay();
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchend', handleTouchEnd);
      
      // Make sure all images start with opacity 1
      setTimeout(() => {
        const slidesElements = document.querySelectorAll('.slideshow-container img');
        slidesElements.forEach(img => {
          img.style.opacity = '1';
        });
      }, 300);
      
      // Disable preloading after initial load
      setTimeout(() => {
        isPreloadingActive.value = false;
      }, 2000);
    });

    onUnmounted(() => {
      clearInterval(timerInterval);
      clearInterval(progressInterval);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    });

    return {
      slides,
      currentSlide,
      previousSlide,
      scrollOpacity,
      autoplayEnabled,
      progressPercentage,
      slideDirection,
      selectedProject,
      isModalVisible,
      onImageLoad,
      nextSlide,
      prevSlide,
      goToSlide,
      viewProject,
      closeModal,
      toggleAutoplay,
      scrollToHome
    };
  }
};
</script>

<style scoped>
.slideshow-section {
  position: relative;
  width: 100%;
}

.slideshow-container {
  position: relative;
  width: 100%;
  z-index: 0;
  transition: opacity 0.5s ease;
}

/* Clean, simple image transitions */
img {
  transition: opacity 1000ms ease-in-out;
}

/* Button hover effects */
button svg {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

button:hover svg {
  transform: scale(1.1);
}

/* Optimize transitions with hardware acceleration */
.transform {
  will-change: transform, opacity;
}

/* Custom scrollbar for the slideshow */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.4);
}
</style>