<template>
  <div 
    class="fixed inset-0 z-[1001] bg-white/98 backdrop-blur-md"
    v-if="show"
    @keydown.esc="$emit('close')"
    tabindex="-1"
  >
    <!-- Close Button -->
    <button 
      @click="$emit('close')"
      class="fixed top-6 right-6 z-[1001] p-3 rounded-full bg-black/5 hover:bg-black/10 shadow-lg hover:shadow-xl 
             transform transition-all duration-500 hover:rotate-90 group"
      aria-label="Close modal"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" class="stroke-black/70 group-hover:stroke-black transition-colors">
        <path d="M18 6L6 18M6 6l12 12" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <!-- Mobile Layout -->
    <div class="flex flex-col h-screen md:hidden">
      <!-- Image Gallery -->
      <div class="relative flex-1 bg-white">
        <div class="relative w-full h-full flex items-center justify-center">
          <TransitionGroup name="fade-slide" tag="div" class="relative w-full h-full">
            <img
              :key="currentImage"
              :src="currentImage"
              :alt="project.title || project.name"
              class="w-full h-full object-contain transition-all duration-500 ease-out"
              :class="{ 'opacity-0': !imageLoaded }"
              @load="handleImageLoad"
            >
          </TransitionGroup>

          <!-- Loading State - Only show on initial load -->
          <div v-if="!imageLoaded && currentImageIndex === 0" class="absolute inset-0 bg-white flex items-center justify-center">
            <div class="loading-spinner"></div>
          </div>

          <!-- Image Counter -->
          <div 
            v-if="hasMultipleImages"
            class="absolute top-6 left-6 flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md"
          >
            <div class="text-black/80 text-xs font-medium tracking-widest">
              {{ currentImageIndex + 1 }} / {{ normalizedImages.length }}
            </div>
          </div>

          <!-- Navigation Controls -->
          <div 
            v-if="hasMultipleImages" 
            class="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between"
          >
            <button 
              @click="previousImage"
              :disabled="currentImageIndex === 0"
              class="p-3 rounded-full bg-white/90 shadow-md backdrop-blur-sm hover:bg-black/5 
                     transition-all duration-300 transform hover:scale-105 active:scale-95
                     disabled:opacity-0 disabled:cursor-not-allowed disabled:hover:scale-100 group"
              aria-label="Previous image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="stroke-black/60 group-hover:stroke-black transition-colors">
                <path d="M19 12H5M11 18l-6-6 6-6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            
            <button 
              @click="nextImage"
              :disabled="currentImageIndex === normalizedImages.length - 1"
              class="p-3 rounded-full bg-white/90 shadow-md backdrop-blur-sm hover:bg-black/5 
                     transition-all duration-300 transform hover:scale-105 active:scale-95
                     disabled:opacity-0 disabled:cursor-not-allowed disabled:hover:scale-100 group"
              aria-label="Next image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="stroke-black/60 group-hover:stroke-black transition-colors">
                <path d="M5 12h14M13 18l6-6-6-6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <!-- Image Indicators -->
          <div 
            v-if="hasMultipleImages"
            class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2"
          >
            <button
              v-for="(_, index) in normalizedImages"
              :key="index"
              @click="setCurrentImage(index)"
              class="w-2 h-2 rounded-full transition-all duration-300 transform"
              :class="currentImageIndex === index ? 'bg-black scale-125' : 'bg-black/30 hover:bg-black/50'"
              :aria-label="`Go to image ${index + 1}`"
            ></button>
          </div>
        </div>
      </div>

      <!-- Project Details -->
      <div class="bg-white p-6 border-t border-gray-100 overflow-y-auto max-h-[40vh]">
        <h2 class="text-xl font-light tracking-wider text-black mb-1">
          {{ project.title || project.name }}
        </h2>
        <div class="text-sm tracking-wider text-black/60 mb-4 font-light">
          {{ formatDate(project.date) }}
        </div>

        <div class="prose prose-sm">
          <div 
            v-html="formattedDescription"
            class="text-gray-600 leading-relaxed font-light"
          ></div>
        </div>

        <div class="mt-6 pt-4 border-t border-gray-100">
          <h3 class="text-xs uppercase tracking-wider text-black/60 mb-3 font-medium">
            Explore Similar Projects
          </h3>
          <div class="flex flex-wrap gap-3">
            <button 
              v-if="project.category"
              @click="handleCategoryClick(project.category)"
              class="category-tag"
            >
              {{ project.category }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop Layout -->
    <div class="hidden md:grid h-screen grid-cols-[1fr_450px]">
      <!-- Image Gallery -->
      <div class="relative bg-white/50">
        <div class="relative w-full h-full flex items-center justify-center">
          <TransitionGroup 
            name="fade-slide" 
            tag="div" 
            class="relative w-full h-full"
          >
            <img
              :key="currentImage"
              :src="currentImage"
              :alt="project.title || project.name"
              class="w-full h-full object-contain transition-all duration-500 ease-out"
              :class="{ 'opacity-0': !imageLoaded }"
              @load="handleImageLoad"
            >
          </TransitionGroup>

          <!-- Loading State - Only show on initial load -->
          <div v-if="!imageLoaded && currentImageIndex === 0" class="absolute inset-0 bg-white/50 flex items-center justify-center">
            <div class="loading-spinner"></div>
          </div>

          <!-- Image Counter -->
          <div 
            v-if="hasMultipleImages"
            class="absolute top-8 left-8 flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md"
          >
            <div class="text-black/80 text-xs font-medium tracking-widest">
              {{ currentImageIndex + 1 }} / {{ normalizedImages.length }}
            </div>
          </div>

          <!-- Navigation Controls -->
          <div 
            v-if="hasMultipleImages" 
            class="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none"
          >
            <button 
              @click="previousImage"
              :disabled="currentImageIndex === 0"
              class="p-4 rounded-full bg-white/95 shadow-xl backdrop-blur-md hover:bg-black/5 
                     transition-all duration-300 transform hover:scale-105 active:scale-95
                     disabled:opacity-0 disabled:cursor-not-allowed disabled:hover:scale-100
                     pointer-events-auto group"
              aria-label="Previous image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" class="stroke-black/70 group-hover:stroke-black transition-colors">
                <path d="M19 12H5M11 18l-6-6 6-6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            
            <button 
              @click="nextImage"
              :disabled="currentImageIndex === normalizedImages.length - 1"
              class="p-4 rounded-full bg-white/95 shadow-xl backdrop-blur-md hover:bg-black/5 
                     transition-all duration-300 transform hover:scale-105 active:scale-95
                     disabled:opacity-0 disabled:cursor-not-allowed disabled:hover:scale-100
                     pointer-events-auto group"
              aria-label="Next image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" class="stroke-black/70 group-hover:stroke-black transition-colors">
                <path d="M5 12h14M13 18l6-6-6-6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <!-- Image Indicators -->
          <div 
            v-if="hasMultipleImages"
            class="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3"
          >
            <button
              v-for="(_, index) in normalizedImages"
              :key="index"
              @click="setCurrentImage(index)"
              class="w-3 h-3 rounded-full transition-all duration-300 transform"
              :class="currentImageIndex === index ? 'bg-black scale-125' : 'bg-black/30 hover:bg-black/50'"
              :aria-label="`Go to image ${index + 1}`"
            ></button>
          </div>
        </div>
      </div>

      <!-- Project Details -->
      <div 
        class="bg-white h-full overflow-y-auto shadow-[-10px_0_15px_-5px_rgba(0,0,0,0.03)]"
        :class="{ 'details-panel-enter-active': show }"
      >
        <div class="p-12 max-w-md mx-auto">
          <div class="flex flex-col h-full justify-between">
            <div>
              <h2 class="text-2xl font-light tracking-wider text-black mb-1 fade-in">
                {{ project.title || project.name }}
              </h2>
              <div class="text-sm tracking-wider text-black/60 mb-8 font-light fade-in delay-100">
                {{ formatDate(project.date) }}
              </div>

              <div class="prose prose-lg fade-in delay-200">
                <div 
                  v-html="formattedDescription"
                  class="text-gray-600 leading-relaxed font-light"
                ></div>
              </div>
            </div>

            <div class="mt-12 pt-8 border-t border-gray-100 fade-in delay-300">
              <h3 class="text-xs uppercase tracking-wider text-black/60 mb-4 font-medium">
                Explore Similar Projects
              </h3>
              <div class="flex flex-wrap gap-3">
                <button 
                  v-if="project.category"
                  @click="handleCategoryClick(project.category)"
                  class="category-tag"
                >
                  {{ project.category }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';

export default {
  name: 'ProjectModal',
  props: {
    project: {
      type: Object,
      default: () => ({})
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Header
  },
  data() {
    return {
      imageLoaded: false,
      initialLoadComplete: false,
      currentImageIndex: 0,
      touchStartX: 0,
      touchEndX: 0
    }
  },
  computed: {
    normalizedImages() {
      if (!this.project) return [];
      const images = [
        this.project.mainImage,
        ...(this.project.additionalImages || [])
      ].filter(Boolean);
      return images;
    },
    currentImage() {
      return this.normalizedImages[this.currentImageIndex];
    },
    hasMultipleImages() {
      return this.normalizedImages.length > 1;
    },
    formattedDescription() {
      if (!this.project.description) return '';
      return this.project.description
        .split('\n')
        .filter(para => para.trim())
        .map(para => `<p>${para}</p>`)
        .join('');
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden';
        this.currentImageIndex = 0;
        this.imageLoaded = false;
        this.initialLoadComplete = false;
        // Enable focus trap when modal opens
        this.$nextTick(() => {
          this.$el.focus();
        });
      } else {
        document.body.style.overflow = 'auto';
      }
    },
    currentImageIndex() {
      // Don't reset loaded state when navigating between images
      // Only set to false on initial load
      if (!this.initialLoadComplete) {
        this.imageLoaded = false;
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyboard);
    this.$el.addEventListener('touchstart', this.handleTouchStart);
    this.$el.addEventListener('touchend', this.handleTouchEnd);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyboard);
    this.$el.removeEventListener('touchstart', this.handleTouchStart);
    this.$el.removeEventListener('touchend', this.handleTouchEnd);
    document.body.style.overflow = 'auto';
  },
  methods: {
    handleKeyboard(e) {
      if (!this.show) return;
      
      switch(e.key) {
        case 'Escape':
          this.$emit('close');
          break;
        case 'ArrowLeft':
          this.previousImage();
          break;
        case 'ArrowRight':
          this.nextImage();
          break;
      }
    },
    handleImageLoad() {
      // Add a slight delay to allow transitions to complete
      setTimeout(() => {
        this.imageLoaded = true;
        this.initialLoadComplete = true;
      }, 200);
    },
    previousImage() {
      if (this.currentImageIndex > 0) {
        setTimeout(() => {
          this.currentImageIndex--;
        }, 50);
      } else if (this.normalizedImages.length > 1) {
        // Optional: loop back to the end
        setTimeout(() => {
          this.currentImageIndex = this.normalizedImages.length - 1;
        }, 50);
      }
    },
    nextImage() {
      if (this.currentImageIndex < this.normalizedImages.length - 1) {
        setTimeout(() => {
          this.currentImageIndex++;
        }, 50);
      } else if (this.normalizedImages.length > 1) {
        // Optional: loop back to the beginning
        setTimeout(() => {
          this.currentImageIndex = 0;
        }, 50);
      }
    },
    setCurrentImage(index) {
      if (index !== this.currentImageIndex) {
        setTimeout(() => {
          this.currentImageIndex = index;
        }, 50);
      }
    },
    formatDate(date) {
      if (!date) return '';
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    handleCategoryClick(category) {
      this.$emit('close');
      setTimeout(() => {
        this.$router.push({
          path: '/projects',
          query: { category }
        });
      }, 300);
    },
    handleTouchStart(e) {
      this.touchStartX = e.changedTouches[0].screenX;
    },
    handleTouchEnd(e) {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    },
    handleSwipe() {
      // Only process swipes if we have multiple images
      if (!this.hasMultipleImages) return;
      
      const swipeDistance = this.touchEndX - this.touchStartX;
      const minSwipeDistance = 50; // Minimum distance for a swipe to register
      
      if (swipeDistance > minSwipeDistance) {
        // Swipe right (previous)
        this.previousImage();
      } else if (swipeDistance < -minSwipeDistance) {
        // Swipe left (next)
        this.nextImage();
      }
    }
  },
}
</script>

<style scoped>
.category-tag {
  @apply px-5 py-2 text-xs tracking-widest 
         transition-all duration-300 rounded-full
         font-light uppercase shadow-sm
         bg-black text-white
         hover:shadow-md hover:scale-105
         active:scale-100 transform;
}

.loading-spinner {
  @apply w-10 h-10 border-2 border-t-black border-black/10 rounded-full;
  animation: spin 1s cubic-bezier(0.76, 0.21, 0.24, 0.93) infinite;
}

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  position: absolute;
  width: 100%;
  height: 100%;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px) scale(0.95);
  filter: blur(5px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px) scale(0.95);
  filter: blur(5px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
  filter: blur(0);
}

.details-panel-enter-active {
  animation: slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideIn {
  from {
    transform: translateX(40px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Fade-in animations for content */
.fade-in {
  animation: fadeIn 0.8s ease-out forwards;
  opacity: 0;
}

.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}

.delay-300 {
  animation-delay: 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Prose Customization */
.prose :deep(p) {
  margin-bottom: 1.5em;
  font-weight: 300;
  line-height: 1.7;
}

.prose :deep(p:last-child) {
  margin-bottom: 0;
}

/* Custom Scrollbar */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #E5E7EB transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #E5E7EB;
  border-radius: 2px;
}

/* Additional mobile-specific styles */
@media (max-width: 768px) {
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .fade-slide-enter-from {
    transform: translateX(20px) scale(0.97);
    filter: blur(3px);
  }
  
  .fade-slide-leave-to {
    transform: translateX(-20px) scale(0.97);
    filter: blur(3px);
  }

  .category-tag {
    @apply text-xs py-1.5 px-4 shadow-sm;
  }

  .prose-sm {
    font-size: 0.925rem;
  }
}
</style>