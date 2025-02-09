<!-- components/EnhancedProfile.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <Header />
    
    <!-- Hero Section -->
    <div class="relative h-[80vh] overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <!-- Main Content -->
      <div class="relative max-w-7xl mx-auto h-full flex items-center px-4">
        <div class="grid grid-cols-12 gap-8 items-center w-full">
          <!-- Text Content -->
          <div class="col-span-7 space-y-6">
            <div class="space-y-2">
              <h4 class="text-lg text-gray-600 tracking-wider">FOUNDER & PRINCIPAL ARCHITECT</h4>
              <h1 class="text-6xl font-bold text-gray-900 leading-tight">
                Dr. Venkatesh
                <span class="block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                  Raman
                </span>
              </h1>
            </div>
            
            <p class="text-xl text-gray-700 leading-relaxed max-w-2xl">
              Transforming architectural visions into reality with over two decades of expertise in
              creating award-winning residential and commercial spaces.
            </p>
            
            <div class="flex space-x-6">
              <button 
  @click="$router.push('/projects')" 
  class="px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 
         transform hover:scale-105 transition-all duration-300">
  View Projects
</button>
              <button @click="scrollToSection('experience')"
                      class="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-full 
                             hover:bg-gray-100 transform hover:scale-105 transition-all duration-300">
                Experience
              </button>
            </div>
          </div>
          
          <!-- Profile Image -->
          <div class="col-span-5 relative">
            <div class="relative w-full aspect-[3/4] rounded-2xl overflow-hidden 
                        transform hover:scale-105 transition-all duration-500">
              <img src="/venk.jpeg" alt="Dr. Venkatesh Raman" 
                   class="absolute inset-0 w-full h-full object-cover object-center" />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
            </div>
            
            <!-- Floating Stats -->
            <div class="absolute -left-24 top-1/4 bg-white rounded-xl shadow-xl p-4 
                        transform hover:scale-110 transition-all duration-300">
              <div class="text-center">
                <div class="text-3xl font-bold text-gray-900">20+</div>
                <div class="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
            
            <div class="absolute -right-12 bottom-1/4 bg-white rounded-xl shadow-xl p-4 
                        transform hover:scale-110 transition-all duration-300">
              <div class="text-center">
                <div class="text-3xl font-bold text-gray-900">50+</div>
                <div class="text-sm text-gray-600">Major Projects</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Education Timeline -->
    <section class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center space-x-8">
          <div v-for="(edu, index) in education" :key="index"
               class="flex-1 group">
            <div class="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
              <div class="text-xl font-bold text-gray-900">{{ edu.degree }}</div>
              <div class="text-gray-600">{{ edu.year }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-4xl font-bold text-gray-900 mb-12">Professional Journey</h2>
        
        <!-- 3D Timeline -->
        <div class="relative">
          <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-gray-200 via-gray-400 to-gray-200"></div>
          
          <div class="space-y-24">
            <div v-for="(exp, index) in experience" :key="index"
                 class="relative group">
              <!-- Experience Card -->
              <div :class="`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`">
                <div class="w-5/12 transform hover:scale-105 transition-all duration-300">
                  <div class="bg-white rounded-xl shadow-xl p-8 relative">
                    <!-- Company Info -->
                    <div class="mb-6">
                      <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ exp.company }}</h3>
                      <div class="flex justify-between items-center">
                        <span class="text-lg text-gray-600">{{ exp.role }}</span>
                        <span class="px-4 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                          {{ exp.period }}
                        </span>
                      </div>
                    </div>

                    <!-- Animated Project List -->
                    <div class="space-y-3">
                      <div v-for="(project, pIndex) in exp.projects" 
                           :key="pIndex"
                           class="transform transition-all duration-300 hover:translate-x-2">
                        <div class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                          <div class="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                          <span class="text-gray-700">{{ project }}</span>
                        </div>
                      </div>
                    </div>

                    <!-- Achievement Indicators -->
                    <div v-if="exp.achievements" 
                         class="absolute -right-4 -top-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                      <span class="text-sm font-bold text-gray-900">{{ exp.achievements }}★</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Timeline Node -->
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div class="w-6 h-6 bg-white rounded-full border-4 border-gray-400 group-hover:border-gray-900 transition-colors duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from '~/components/Header.vue';

const education = [
  { year: '2022', degree: 'PhD in Architecture' },
  { year: '2015', degree: 'Master in Urban & Regional Planning' },
  { year: '1991', degree: 'Bachelor of Architecture' }
];

const experience = [
  {
    company: 'JRD ARCHITECTS',
    period: '2000-Present',
    role: 'Principal Architect & Proprietor',
    projects: [
      'VISWA, Ranchi',
      'Sadaqat Ashram, Patna',
      'State Guest House, Patna (1st Prize)',
      'Naveen Chandra Ramgulam, Patna (1st Prize)',
      'Shri Krishna Nagar Aapartment, Patna (1st Prize)'
    ]
  },
  {
    company: 'Lall & Associates',
    period: '1996-2000',
    role: 'Senior Architect',
    projects: [
      'CIPET, Haldia',
      'CIPET, Hajipur',
      'POWERGRID Township'
    ]
  },
  {
    company: 'JAYPEE Group',
    period: '1992-1996',
    role: 'Senior Field Architect',
    projects: ['Jaypee Palace Hotel & Convention Centre, Agra']
  },
  {
    company: 'Design-O-Group',
    period: '1991-1992',
    role: 'Architect',
    projects: ['Commercial Complex, Agra']
  }
];

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  element?.scrollIntoView({ behavior: 'smooth' });
};
</script>

<style scoped>
.bg-grid-pattern {
  background-image: radial-gradient(circle, #000 1px, transparent 1px);
  background-size: 30px 30px;
}

/* Add smooth scrolling to the whole page */
html {
  scroll-behavior: smooth;
}

/* Custom transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Ensure images don't exceed container */
img {
  max-width: 100%;
  height: auto;
}
</style>