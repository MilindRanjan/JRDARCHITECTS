<template>
  <div 
    class="fixed inset-0 z-50 bg-white pt-24"
    v-if="show"
    @keydown.esc="$emit('close')"
    tabindex="-1"
  >
    <!-- Close Button -->
    <button 
      @click="$emit('close')"
      class="absolute top-32 right-8 z-50 group p-4 hover:rotate-90 transition-all duration-500"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" class="stroke-black/70 group-hover:stroke-black">
        <path d="M18 6L6 18M6 6l12 12" stroke-width="1.5"/>
      </svg>
    </button>

    <!-- Main Content -->
    <div class="flex h-[calc(100vh-6rem)]">
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
            class="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-12"
          >
            <button 
              @click="previousImage"
              :disabled="currentImageIndex === 0"
              class="nav-button group"
              :class="{ 'opacity-30 cursor-not-allowed': currentImageIndex === 0 }"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" class="stroke-black/70 group-hover:stroke-black">
                <path d="M15 18l-6-6 6-6" stroke-width="1.5"/>
              </svg>
            </button>
            
            <button 
              @click="nextImage"
              :disabled="currentImageIndex === normalizedImages.length - 1"
              class="nav-button group"
              :class="{ 'opacity-30 cursor-not-allowed': currentImageIndex === normalizedImages.length - 1 }"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" class="stroke-black/70 group-hover:stroke-black">
                <path d="M9 18l6-6-6-6" stroke-width="1.5"/>
              </svg>
            </button>
          </div>

          <!-- Image Counter -->
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
export default {
  name: 'ProjectModal',
  props: {
    project: {
      type: Object,
      required: true,
      default: () => ({
        title: '',
        name: '',
        mainImage: '',
        additionalImages: [],
        description: '',
        category: '',
        status: '',
        date: null
      })
    },
    show: {
      type: Boolean,
      default: false
    }
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
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--
        this.imageLoaded = false
      }
    },
    nextImage() {
      if (this.currentImageIndex < this.normalizedImages.length - 1) {
        this.currentImageIndex++
        this.imageLoaded = false
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
</style>