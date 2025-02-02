<template>
  <div class="modal-overlay" @click.self="$emit('close')" v-if="show">
    <div class="modal" :class="{ 'modal-open': show }">
      <!-- Header Section -->
      <div class="modal-header">
        <h2 class="title">{{ project.title || project.name }}</h2>
        <button class="close-button" @click="$emit('close')" aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Image Gallery Section -->
      <div class="gallery-container">
        <div class="image-wrapper">
          <img 
            :src="currentImage" 
            :alt="project.title || project.name"
            @load="handleImageLoad"
            :class="{ 'image-loaded': imageLoaded }"
            ref="currentImage"
          >
          <div class="image-skeleton" v-if="!imageLoaded"></div>
          
          <!-- Image Navigation -->
          <button 
            v-if="hasMultipleImages" 
            class="gallery-nav prev" 
            @click="previousImage"
            :disabled="currentImageIndex === 0"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button 
            v-if="hasMultipleImages" 
            class="gallery-nav next" 
            @click="nextImage"
            :disabled="currentImageIndex === normalizedImages.length - 1"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
        
        <!-- Thumbnail Navigation -->
        <div v-if="hasMultipleImages" class="thumbnail-container">
          <button 
            v-for="(image, index) in normalizedImages" 
            :key="index"
            class="thumbnail"
            :class="{ active: currentImageIndex === index }"
            @click="setCurrentImage(index)"
          >
            <img :src="image" :alt="`Thumbnail ${index + 1}`">
          </button>
        </div>
      </div>

      <!-- Content Section -->
      <div class="modal-content">
        <div class="description" v-html="formattedDescription"></div>
        <div class="metadata">
          <div class="badges">
            <NuxtLink 
              v-if="project.category"
              :to="`/projects?category=${encodeURIComponent(project.category)}`"
              class="badge category-badge"
            >
              {{ project.category }}
            </NuxtLink>
            <span 
              v-if="project.status" 
              class="badge status-badge"
              :class="statusClass"
            >
              {{ project.status }}
            </span>
          </div>
          <div v-if="project.date" class="project-date">
            {{ formatDate(project.date) }}
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
    
    // Combine mainImage and additionalImages into a single array
    const images = [
      this.project.mainImage,
      ...(this.project.additionalImages || [])
    ].filter(Boolean); // Remove any null/undefined values
    
    console.log('Combined images:', images); // Debug log
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
        .join('')
    },
    statusClass() {
      const status = this.project.status?.toLowerCase()
      return {
        'status-active': status === 'active',
        'status-completed': status === 'completed',
        'status-pending': status === 'pending'
      }
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden'
        this.currentImageIndex = 0
      } else {
        document.body.style.overflow = 'auto'
        this.imageLoaded = false
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
  },
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
  animation: fadeIn 0.3s ease-out;
}

.modal {
  background: #fff;
  border-radius: 16px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  transform: translateY(30px);
  opacity: 0;
  transition: all 0.3s ease-out;
}

.modal-open {
  transform: translateY(0);
  opacity: 1;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e0e0e0;
}

.title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #000;
  margin: 0;
}

.gallery-container {
  background: #f5f5f5;
  padding: 1.5rem;
}

.image-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  max-height: 500px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.image-wrapper img {
  max-width: 100%;
  max-height: 500px;
  width: auto;
  height: auto;
  object-fit: contain;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-loaded {
  opacity: 1 !important;
}

.image-skeleton {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.gallery-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 2;
}

.gallery-nav:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.prev {
  left: 1rem;
}

.next {
  right: 1rem;
}

.thumbnail-container {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  padding: 0.5rem;
  overflow-x: auto;
  scrollbar-width: none;
}

.thumbnail {
  width: 80px;
  height: 60px;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #fff;
}

.thumbnail.active {
  border-color: #000;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 1;
}

.modal-content {
  padding: 1.5rem;
}

.description {
  color: #333;
  line-height: 1.7;
  font-size: 1.125rem;
  margin-bottom: 2rem;
}

.metadata {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.badges {
  display: flex;
  gap: 0.75rem;
}

.badge {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.category-badge {
  background: #e0e0e0;
  color: #000;
  text-decoration: none;
}

.status-badge {
  color: #fff;
}

.status-active { background: #000; }
.status-completed { background: #555; }
.status-pending { background: #888; }

.project-date {
  color: #666;
  font-size: 0.875rem;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@media (max-width: 768px) {
  .modal {
    width: 95%;
    margin: 1rem;
  }

  .modal-header {
    padding: 1.25rem 1.5rem;
  }

  .gallery-container {
    padding: 1rem;
  }

  .image-wrapper {
    max-height: 400px;
  }

  .modal-content {
    padding: 1.5rem;
  }

  .metadata {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>