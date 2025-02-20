<template>
  <div class="w-full min-h-screen bg-white">
    <div class="max-w-7xl mx-auto px-4 py-16">
      <h1 class="section-title">
      <span class="title-text">Prizes</span>
      <span class="title-line"></span>
    </h1>

      <!-- Prize Sections -->
      <div class="space-y-32">
        <div v-for="(prize, prizeIndex) in prizes" :key="prize.year" 
             class="prize-section"
             :class="{'md:flex-row-reverse': prizeIndex % 2 === 1}"
        >
          <!-- Text Content -->
          <div class="flex flex-col lg:flex-row gap-12 items-start">
            <div class="lg:w-1/3 space-y-8" :style="{ position: 'sticky', top: '100px' }">
              <div class="text-7xl font-bold text-black/5 mb-4">
                {{ prize.year }}
              </div>
              <h2 class="text-3xl font-semibold text-black mb-4">
                {{ prize.title }}
              </h2>
              <p class="text-gray-600 leading-relaxed mb-8">
                {{ prize.description }}
              </p>
              
              <!-- Navigation for current prize's images -->
              <div class="flex items-center gap-4">
                <button 
                  @click="prevImage(prizeIndex)"
                  class="p-2 border border-black/10 rounded-full hover:bg-black hover:text-white transition-colors"
                  :disabled="activeImageIndexes[prizeIndex] === 0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <span class="text-sm text-gray-500">
                  {{ activeImageIndexes[prizeIndex] + 1 }} / {{ prize.images.length }}
                </span>
                <button 
                  @click="nextImage(prizeIndex)"
                  class="p-2 border border-black/10 rounded-full hover:bg-black hover:text-white transition-colors"
                  :disabled="activeImageIndexes[prizeIndex] === prize.images.length - 1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Image Gallery -->
            <div class="lg:w-2/3">
              <div class="relative overflow-hidden rounded-xl">
                <div
                  ref="galleryTrack"
                  class="flex transition-transform duration-500 ease-out"
                  :style="{ transform: `translateX(-${activeImageIndexes[prizeIndex] * 100}%)` }"
                  @touchstart="handleTouchStart($event, prizeIndex)"
                  @touchmove="handleTouchMove($event, prizeIndex)"
                  @touchend="handleTouchEnd(prizeIndex)"
                  @mousedown="handleMouseDown($event, prizeIndex)"
                  @mousemove="handleMouseMove($event, prizeIndex)"
                  @mouseup="handleMouseUp"
                  @mouseleave="handleMouseUp"
                >
                  <div
                    v-for="(image, imageIndex) in prize.images"
                    :key="imageIndex"
                    class="flex-shrink-0 w-full"
                  >
                    <div class="relative group cursor-pointer" @click="openLightbox(prizeIndex, imageIndex)">
                      <img
                        :src="image"
                        :alt="`${prize.title} - Image ${imageIndex + 1}`"
                        class="w-full aspect-[4/3] object-cover rounded-lg shadow-lg"
                      />
                      <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-white">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Thumbnail Navigation -->
                <div class="mt-4 flex gap-2 overflow-x-auto pb-2">
                  <button
                    v-for="(image, thumbIndex) in prize.images"
                    :key="thumbIndex"
                    @click="setActiveImage(prizeIndex, thumbIndex)"
                    class="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden transition-all duration-300"
                    :class="{'ring-2 ring-black': activeImageIndexes[prizeIndex] === thumbIndex}"
                  >
                    <img
                      :src="image"
                      :alt="`Thumbnail ${thumbIndex + 1}`"
                      class="w-full h-full object-cover"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lightbox -->
      <div v-if="lightbox.show" 
           class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
           @click="closeLightbox"
      >
        <div class="relative max-w-7xl max-h-screen p-4">
          <img
            :src="prizes[lightbox.prizeIndex].images[lightbox.imageIndex]"
            :alt="prizes[lightbox.prizeIndex].title"
            class="max-w-full max-h-[90vh] object-contain"
            @click.stop
          />
          <button 
            class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            @click="closeLightbox"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onUnmounted } from 'vue'

const prizes = ref([
  {
    year: "2010",
    title: "Bipard, Gaya",
    description: "Excellence in Architectural Design for the innovative approach to sustainable state architecture, combining traditional elements with modern functionality.",
    images: [
      "/Projects/COMPETITIONS/BIPARD, GAYA/1.jpg",
      "/Projects/COMPETITIONS/BIPARD, GAYA/2.jpg",
      "/Projects/COMPETITIONS/BIPARD, GAYA/3.png",
      "/Projects/COMPETITIONS/BIPARD, GAYA/4.jpg",
      "/Projects/COMPETITIONS/BIPARD, GAYA/5.jpg",
      "/Projects/COMPETITIONS/BIPARD, GAYA/6.png",
      "/Projects/COMPETITIONS/BIPARD, GAYA/7.png",
    ]
  },
  {
    year: "2015",
    title: "State Guest House, Patna",
    description: "Outstanding Urban Development achievement for transforming public spaces into vibrant community centers while preserving cultural heritage.",
    images: [
      "/Projects/COMPETITIONS/Desh Ratna Marg/1.jpg",
      "/Projects/COMPETITIONS/Desh Ratna Marg/2.jpg",
      "/Projects/COMPETITIONS/Desh Ratna Marg/3.jpg",
      "/Projects/COMPETITIONS/Desh Ratna Marg/4.jpg",
    ]
  },
  {
    year: "2019",
    title: "Bal Bhawan",
    description: "Best Residential Complex Design award for creating sustainable, community-focused living spaces that redefine modern urban housing.",
    images: [
      'Projects/COMPETITIONS/Bal Bhawan Patna/1.jpg',
      'Projects/COMPETITIONS/Bal Bhawan Patna/2.jpg',
    ]
  }
])

// Track active image for each prize section
const activeImageIndexes = ref(prizes.value.map(() => 0))

// Touch and mouse tracking
const touchStart = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const startX = ref(0)
const currentPrizeIndex = ref(null)

// Lightbox state
const lightbox = reactive({
  show: false,
  prizeIndex: 0,
  imageIndex: 0
})

// Touch handlers
const handleTouchStart = (e, prizeIndex) => {
  touchStart.value = {
    x: e.touches[0].clientX,
    y: e.touches[0].clientY
  }
  currentPrizeIndex.value = prizeIndex
}

const handleTouchMove = (e, prizeIndex) => {
  if (!touchStart.value) return

  const xDiff = touchStart.value.x - e.touches[0].clientX
  
  if (Math.abs(xDiff) > 50) { // threshold for swipe
    if (xDiff > 0) {
      nextImage(prizeIndex)
    } else {
      prevImage(prizeIndex)
    }
    touchStart.value = null
  }
}

const handleTouchEnd = () => {
  touchStart.value = null
  currentPrizeIndex.value = null
}

// Mouse handlers
const handleMouseDown = (e, prizeIndex) => {
  isDragging.value = true
  startX.value = e.clientX
  currentPrizeIndex.value = prizeIndex
}

const handleMouseMove = (e, prizeIndex) => {
  if (!isDragging.value) return

  const xDiff = startX.value - e.clientX
  
  if (Math.abs(xDiff) > 50) { // threshold for swipe
    if (xDiff > 0) {
      nextImage(prizeIndex)
    } else {
      prevImage(prizeIndex)
    }
    isDragging.value = false
  }
}

const handleMouseUp = () => {
  isDragging.value = false
  currentPrizeIndex.value = null
}

const nextImage = (prizeIndex) => {
  if (activeImageIndexes.value[prizeIndex] < prizes.value[prizeIndex].images.length - 1) {
    activeImageIndexes.value = [...activeImageIndexes.value]
    activeImageIndexes.value[prizeIndex]++
  }
}

const prevImage = (prizeIndex) => {
  if (activeImageIndexes.value[prizeIndex] > 0) {
    activeImageIndexes.value = [...activeImageIndexes.value]
    activeImageIndexes.value[prizeIndex]--
  }
}

const setActiveImage = (prizeIndex, imageIndex) => {
  activeImageIndexes.value = [...activeImageIndexes.value]
  activeImageIndexes.value[prizeIndex] = imageIndex
}

const openLightbox = (prizeIndex, imageIndex) => {
  lightbox.prizeIndex = prizeIndex
  lightbox.imageIndex = imageIndex
  lightbox.show = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightbox.show = false
  document.body.style.overflow = 'auto'
}

// Clean up on component unmount
onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
</script>

<style scoped>
.prize-section {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.section-title {
  text-align: center;
  margin-bottom: 80px;
  position: relative;
  margin-top: -270px;
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

/* Stagger the animations */
.prize-section:nth-child(1) { animation-delay: 0.2s; }
.prize-section:nth-child(2) { animation-delay: 0.4s; }
.prize-section:nth-child(3) { animation-delay: 0.6s; }

.contact-section {
  padding: 40px 24px;
  background-color: #ffffff;
  overflow: hidden;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
}
@media (max-width: 768px) {
  .section-title {
    margin-top: auto;
  }
}
</style>