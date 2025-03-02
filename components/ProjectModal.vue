<template>
  <div 
    class="fixed inset-0 z-[1001] bg-white"
    v-if="show"
    @keydown.esc="$emit('close')"
    tabindex="-1"
  >
  
    <!-- Close Button -->
    <button 
      @click="$emit('close')"
      class="fixed top-4 right-4 z-[1001] p-2 rounded-full bg-white/90 shadow-lg hover:rotate-90 transition-all duration-500"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" class="stroke-black/70">
        <path d="M18 6L6 18M6 6l12 12" stroke-width="1.5"/>
      </svg>
    </button>

    <!-- Mobile Layout -->
    <div class="flex flex-col h-screen md:hidden">
      <!-- Image Gallery -->
      <div class="relative flex-1 bg-white">
        <div class="relative w-full h-full flex items-center justify-center">
          <TransitionGroup name="slide" tag="div" class="relative w-full h-full">
            <img
              :key="currentImage"
              :src="currentImage"
              :alt="project.title || project.name"
              class="w-full h-full object-contain"
              @load="handleImageLoad"
            >
          </TransitionGroup>

          <!-- Loading State -->
          <div v-if="!imageLoaded" class="absolute inset-0 bg-white flex items-center justify-center">
            <div class="loading-spinner"></div>
          </div>

          <!-- Navigation Controls -->
          <div 
            v-if="hasMultipleImages" 
            class="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between"
          >
            <button 
              @click="previousImage"
              :disabled="currentImageIndex === 0"
              class="p-3 rounded-full bg-white/90 shadow-lg backdrop-blur-sm hover:bg-white transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 12H5M11 18l-6-6 6-6"/>
              </svg>
            </button>
            
            <button 
              @click="nextImage"
              :disabled="currentImageIndex === normalizedImages.length - 1"
              class="p-3 rounded-full bg-white/90 shadow-lg backdrop-blur-sm hover:bg-white transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14M13 18l6-6-6-6"/>
              </svg>
            </button>
          </div>

          <!-- Image Counter -->
          <div 
            v-if="hasMultipleImages"
            class="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center"
          >
            <div class="text-black/60 text-sm tracking-wider mb-2">
              {{ currentImageIndex + 1 }} / {{ normalizedImages.length }}
            </div>
            <div class="flex space-x-1">
              <button
                v-for="(_, index) in normalizedImages"
                :key="index"
                @click="setCurrentImage(index)"
                class="w-8 h-1 transition-all duration-300"
                :class="currentImageIndex === index ? 'bg-black' : 'bg-black/30 hover:bg-black/50'"
              ></button>
            </div>
          </div>
        </div>
      </div>

      <!-- Project Details -->
      <div class="bg-white p-6 border-t border-gray-100 overflow-y-auto max-h-[40vh]">
        <h2 class="text-xl font-light tracking-wide text-black mb-2">
          {{ project.title || project.name }}
        </h2>
        <div class="text-sm tracking-wider text-black/60 mb-4">
          {{ formatDate(project.date) }}
        </div>

        <div class="prose prose-sm">
          <div 
            v-html="formattedDescription"
            class="text-gray-600 leading-relaxed font-light"
          ></div>
        </div>

        <div class="mt-6 pt-4 border-t border-gray-100">
          <h3 class="text-sm uppercase tracking-wider text-black/60 mb-3">
            Explore Similar Projects
          </h3>
          <div class="flex flex-wrap gap-2">
            <button 
              v-if="project.category"
              @click="handleCategoryClick(project.category)"
              class="category-tag text-sm"
            >
              {{ project.category }}
            </button>
            <span 
              v-if="project.status"
              class="status-tag text-sm"
              :class="statusClass"
            >
              {{ project.status }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop Layout -->
    <div class="hidden md:flex h-screen">
      <!-- Image Gallery -->
      <div class="relative flex-1 bg-white">
        <div class="relative w-full h-full flex items-center justify-center">
          <TransitionGroup 
            name="slide" 
            tag="div" 
            class="relative w-full h-full"
          >
            <img
              :key="currentImage"
              :src="currentImage"
              :alt="project.title || project.name"
              class="w-full h-full object-contain"
              @load="handleImageLoad"
            >
          </TransitionGroup>

          <!-- Loading State -->
          <div 
            v-if="!imageLoaded" 
            class="absolute inset-0 bg-white flex items-center justify-center"
          >
            <div class="loading-spinner"></div>
          </div>

          <!-- Navigation Controls -->
          <div 
            v-if="hasMultipleImages" 
            class="absolute inset-x-4 md:inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none"
          >
            <button 
              @click="previousImage"
              :disabled="currentImageIndex === 0"
              class="p-4 rounded-full bg-white/95 shadow-xl backdrop-blur-md hover:bg-white 
                     transition-all duration-300 transform hover:scale-105 active:scale-95
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
                     pointer-events-auto group"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" class="stroke-black/70 group-hover:stroke-black transition-colors">
                <path d="M19 12H5M11 18l-6-6 6-6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            
            <button 
              @click="nextImage"
              :disabled="currentImageIndex === normalizedImages.length - 1"
              class="p-4 rounded-full bg-white/95 shadow-xl backdrop-blur-md hover:bg-white 
                     transition-all duration-300 transform hover:scale-105 active:scale-95
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
                     pointer-events-auto group"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" class="stroke-black/70 group-hover:stroke-black transition-colors">
                <path d="M5 12h14M13 18l6-6-6-6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div 
            v-if="hasMultipleImages"
            class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
          >
            <div class="text-black/60 text-sm tracking-wider mb-4">
              {{ currentImageIndex + 1 }} / {{ normalizedImages.length }}
            </div>
            <div class="flex space-x-2">
              <button
                v-for="(_, index) in normalizedImages"
                :key="index"
                @click="setCurrentImage(index)"
                class="w-12 h-1 transition-all duration-300"
                :class="currentImageIndex === index ? 'bg-black' : 'bg-black/30 hover:bg-black/50'"
              ></button>
            </div>
          </div>
        </div>
      </div>

      <!-- Project Details -->
      <div 
        class="w-[500px] bg-white h-full overflow-y-auto border-l border-gray-100"
        :class="{ 'details-panel-enter-active': show }"
      >
        <div class="p-12">
          <h2 class="text-2xl font-light tracking-wide text-black mb-2">
            {{ project.title || project.name }}
          </h2>
          <div class="text-sm tracking-wider text-black/60 mb-8">
            {{ formatDate(project.date) }}
          </div>

          <div class="prose prose-lg">
            <div 
              v-html="formattedDescription"
              class="text-gray-600 leading-relaxed font-light"
            ></div>
          </div>

          <div class="mt-12 pt-8 border-t border-gray-100">
            <h3 class="text-sm uppercase tracking-wider text-black/60 mb-4">
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
              <span 
                v-if="project.status"
                class="status-tag"
                :class="statusClass"
              >
                {{ project.status }}
              </span>
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
      currentImageIndex: 0
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
      return this.project.description
        .split('\n')
        .filter(para => para.trim())
        .map(para => `<p>${para}</p>`)
        .join('');
    },
    statusClass() {
      const status = this.project.status?.toLowerCase();
      return {
        'status-active': status === 'active',
        'status-completed': status === 'completed',
        'status-pending': status === 'pending'
      };
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden';
        this.currentImageIndex = 0;
      } else {
        document.body.style.overflow = 'auto';
        this.imageLoaded = false;
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyboard)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyboard)
    document.body.style.overflow = 'auto'
  },
  methods: {
    handleKeyboard(e) {
      if (!this.show) return
      
      switch(e.key) {
        case 'Escape':
          this.$emit('close')
          break
        case 'ArrowLeft':
          this.previousImage()
          break
        case 'ArrowRight':
          this.nextImage()
          break
      }
    },
    handleImageLoad() {
      this.imageLoaded = true
    },
    previousImage() {
      if (this.currentImageIndex === 0) {
        this.currentImageIndex = this.normalizedImages.length - 1;
      } else {
        this.currentImageIndex--;
      }
    },
    nextImage() {
      if (this.currentImageIndex === this.normalizedImages.length - 1) {
        this.currentImageIndex = 0;
      } else {
        this.currentImageIndex++;
      }
    },
    setCurrentImage(index) {
      this.currentImageIndex = index
      this.imageLoaded = false
    },
    formatDate(date) {
      if (!date) return ''
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    handleCategoryClick(category) {
      this.$emit('close');
      setTimeout(() => {
        this.$router.push({
          path: '/projects',
          query: { category }
        });
      }, 100);
    }
  },
}
</script>

<style scoped>
.nav-button {
  @apply p-4 transition-all duration-300 hover:scale-110 bg-white/90 rounded-full shadow-lg;
}

.category-tag {
  @apply px-4 py-2 text-sm tracking-wider bg-black text-white hover:bg-gray-900 transition-colors;
}

.status-tag {
  @apply px-4 py-2 text-sm tracking-wider text-white;
}

.status-active { @apply bg-black; }
.status-completed { @apply bg-gray-700; }
.status-pending { @apply bg-gray-500; }

.loading-spinner {
  @apply w-8 h-8 border-2 border-black/20 border-t-black/90 rounded-full animate-spin;
}

/* Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.category-tag {
  @apply px-6 py-2.5 text-sm tracking-wider bg-black text-white/90 
         hover:text-white transition-all duration-300 rounded-full
         hover:bg-black/90 hover:shadow-lg hover:scale-105
         active:scale-100 font-light uppercase;
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.details-panel-enter-active {
  animation: slideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Prose Customization */
.prose :deep(p) {
  margin-bottom: 1.5em;
  font-weight: 300;
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
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s ease;
  }

  .category-tag,
  .status-tag {
    @apply text-sm py-1.5 px-3;
  }

  .prose-sm {
    font-size: 0.925rem;
  }
}
</style>