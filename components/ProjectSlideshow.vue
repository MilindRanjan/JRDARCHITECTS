<template>
    <div class="slideshow-container mt-20" :style="{ opacity: scrollOpacity }">
      <!-- Main Slideshow -->
      <div class="relative h-[80vh] overflow-hidden">
        <!-- Slides with Preloading -->
        <div class="h-full">
          <div 
            v-for="(slide, index) in slides" 
            :key="slide.id"
            class="absolute inset-0 w-full h-full transition-opacity duration-1500 ease-in-out"
            :class="{ 'opacity-0': currentSlide !== index, 'opacity-100': currentSlide === index }"
          >
            <!-- Image with Enhanced Overlay -->
            <div class="relative w-full h-full">
              <img 
                :src="`/${slide.mainImage}`" 
                :alt="slide.name"
                class="w-full h-full object-cover transform scale-105 transition-transform duration-7000 ease-out"
                :class="{'scale-100': currentSlide === index}"
                @load="onImageLoad(index)"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              <!-- Enhanced Content Overlay with Staggered Animation -->
              <div class="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                <div class="max-w-7xl mx-auto">
                  <div class="transform transition-all duration-1000"
                      :class="[currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0']">
                    <div class="overflow-hidden mb-3">
                      <h2 class="text-3xl md:text-5xl font-light tracking-wide transform transition-transform duration-1000 delay-300"
                          :class="[currentSlide === index ? 'translate-y-0' : 'translate-y-full']">
                        {{ slide.name }}
                      </h2>
                    </div>
                    <div class="w-16 h-px bg-white mb-6 transform transition-transform duration-700 delay-500 origin-left"
                         :class="[currentSlide === index ? 'scale-x-100' : 'scale-x-0']"></div>
                    <p class="text-white/80 max-w-2xl mb-8 transform transition-all duration-1000 delay-700"
                       :class="[currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0']">
                      {{ slide.description }}
                    </p>
                    <div class="flex items-center gap-6 transform transition-all duration-1000 delay-900"
                         :class="[currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0']">
                      <button @click="viewProject(slide.id)" 
                              class="group px-8 py-3 bg-white text-black hover:bg-black border border-transparent hover:border-white hover:text-white transition-all duration-500 tracking-wider text-sm relative overflow-hidden">
                        <span class="relative z-10">View Project</span>
                        <span class="absolute inset-0 bg-black transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
                      </button>
                      <div class="text-sm tracking-widest text-white/70">
                        <span class="mr-2 text-xs">●</span>{{ slide.location }}
                      </div>
                    </div>
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
                    class="group w-12 h-12 flex items-center justify-center backdrop-blur-sm rounded-full border border-white/20 hover:border-white/60 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-white/70 group-hover:text-white transition-all duration-300 group-hover:-translate-x-0.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          </div>
          
          <div class="pointer-events-auto pr-4 md:pr-8">
            <button @click="nextSlide" 
                    class="group w-12 h-12 flex items-center justify-center backdrop-blur-sm rounded-full border border-white/20 hover:border-white/60 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-white/70 group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
  
        <!-- Improved Progress Indicators -->
        <div class="absolute z-10 bottom-36 right-8 md:right-12 flex flex-col gap-3">
          <div v-for="(slide, index) in slides" 
               :key="`indicator-${slide.id}`"
               @click="goToSlide(index)"
               class="cursor-pointer group flex items-center gap-3">
            <div class="relative h-px w-0 group-hover:w-12 bg-white/40 transition-all duration-500 ease-out"
                 :class="{ 'w-16 bg-white': currentSlide === index }">
              <div v-if="currentSlide === index && autoplayEnabled" 
                   class="absolute inset-0 h-full bg-white" 
                   :style="{ width: `${progressPercentage}%` }"></div>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-white/60 transition-all duration-300"
                   :class="{ 'w-2 h-2 bg-white': currentSlide === index }"></div>
              <span class="text-white/60 text-xs tracking-widest font-light group-hover:text-white/90 transition-colors duration-300"
                    :class="{ 'text-white': currentSlide === index }">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
            </div>
            <div v-if="currentSlide === index" 
                 class="text-xs text-white/40 absolute left-full ml-3 w-24 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {{ slide.name }}
            </div>
          </div>
        </div>
        
        <!-- Controls and Status Information -->
        <div class="absolute z-10 bottom-8 left-8 md:left-12 flex items-center gap-6">
          <!-- Autoplay Toggle -->
          <button @click="toggleAutoplay" 
                  class="text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-2 text-xs tracking-widest">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4" v-if="autoplayEnabled">
              <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clip-rule="evenodd" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4" v-else>
              <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
            </svg>
            {{ autoplayEnabled ? 'PAUSE' : 'PLAY' }}
          </button>
          
          <!-- Current Slide Info -->
          <div class="text-white/50 text-xs tracking-widest hidden md:block">
            {{ String(currentSlide + 1).padStart(2, '0') }} / {{ String(slides.length).padStart(2, '0') }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
  
  // Sample data - replace with your actual project data
  const slides = [
    {
      id: 2,
      name: 'Sadakat Ashram',
      mainImage: 'Projects/INSTITUTIONAL/Sadaqat Ashram, Kurji, Patna/1.jpg',
      description: 'Luxurious residential complex with modern amenities, preserving cultural heritage while integrating contemporary design elements.',
      location: 'Kurji, Patna',
      loaded: false
    },
    {
      id: 5,
      name: 'VISWA',
      mainImage: 'Projects/rear view5.JPG',
      description: 'Stunning architectural marvel featuring innovative facade design and sustainable building practices.',
      location: 'Ranchi, Jharkhand',
      loaded: false
    },
    {
      id: 6,
      name: 'Sports Complex',
      mainImage: 'Projects/INSTITUTIONAL/Sports Complex, Government of Bihar/f1.jpg',
      description: 'State-of-the-art sports facility with contemporary facade treatment and modern amenities.',
      location: 'Patna, Bihar',
      loaded: false
    },
    {
      id: 1,
      name: 'BIPARD',
      mainImage: 'Projects/COMPETITIONS/BIPARD, GAYA/1.jpg',
      description: 'Contemporary architectural design with sustainable elements, blending modern aesthetics with functional excellence.',
      location: 'Gaya, Bihar',
      loaded: false
    },
    {
      id: 3,
      name: 'Seevusagur Ramgulam Chowk',
      mainImage: 'Projects/LANDSCAPING/Seevusagur Ramgulam Chowk, Exhibition Road, Patna/1.jpg',
      description: 'Urban architectural marvel transforming public spaces with innovative landscape design.',
      location: 'Exhibition Road, Patna',
      loaded: false
    }
  ];
  
  const currentSlide = ref(0);
  const previousSlide = ref(0);
  const scrollOpacity = ref(1);
  const autoplayEnabled = ref(true);
  const slideInterval = ref(6000); // 6 seconds per slide
  const progressPercentage = ref(0);
  const touchStartX = ref(0);
  const touchEndX = ref(0);
  const isPreloadingActive = ref(true);
  let timerInterval;
  let progressInterval;
  
  // Track slide direction for animations
  const slideDirection = ref('next');
  
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
    });
  };
  
  const onImageLoad = (index) => {
    slides[index].loaded = true;
  };
  
  const nextSlide = () => {
    previousSlide.value = currentSlide.value;
    slideDirection.value = 'next';
    currentSlide.value = (currentSlide.value + 1) % slides.length;
    resetTimers();
  };
  
  const prevSlide = () => {
    previousSlide.value = currentSlide.value;
    slideDirection.value = 'prev';
    currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
    resetTimers();
  };
  
  const goToSlide = (index) => {
    if (index === currentSlide.value) return;
    previousSlide.value = currentSlide.value;
    slideDirection.value = index > currentSlide.value ? 'next' : 'prev';
    currentSlide.value = index;
    resetTimers();
  };
  
  const viewProject = (id) => {
    // Implement navigation to project detail page
    console.log(`Viewing project ${id}`);
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
    startAutoplay();
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
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
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
  
  onMounted(() => {
    preloadImages();
    startAutoplay();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    
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
  </script>
  
  <style scoped>
  .slideshow-container {
    position: relative;
    width: 100%;
    z-index: 0;
    transition: opacity 0.5s ease;
  }
  
  /* Subtle zoom effect */
  @keyframes subtle-zoom {
    from { transform: scale(1); }
    to { transform: scale(1.05); }
  }
  
  /* Ensure images load smoothly */
  img {
    transition: opacity 0.5s ease, transform 7s ease-out;
  }
  
  /* Transition durations */
  .duration-7000 {
    transition-duration: 7000ms;
  }
  
  /* Button hover effects */
  button:hover svg {
    transition: all 0.4s ease;
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