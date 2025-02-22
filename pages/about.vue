<!-- components/EnhancedProfile.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <Header />
    
    <!-- Hero Section -->
    <div class="relative h-[80vh] overflow-hidden projects-section">
      <!-- Background Pattern -->
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <!-- Main Content -->
      <div class="relative max-w-7xl mx-auto h-full flex items-center px-4">
        <div class="grid grid-cols-12 gap-8 items-center w-full">
          <!-- Text Content -->
          <div class="col-span-7 space-y-8">
  <div class="space-y-3">
    <h4 class="text-base uppercase tracking-[0.2em] text-black/60">Founder & Principal Architect</h4>
    <h1 class="text-7xl font-light text-black leading-tight">
      Dr. Venkatesh
      <span class="block mt-2 relative">
        Raman
        <div class="absolute -bottom-4 left-0 w-24 h-[2px] bg-black/80"></div>
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
    <section class="py-24 bg-white border-t border-black/5">
      <div class="max-w-7xl mx-auto px-8">
        <!-- Section Header -->
        <div class="text-center mb-20">
          <h2 class="text-2xl font-light tracking-[0.2em] text-black/80 mb-4">EDUCATIONAL BACKGROUND</h2>
          <div class="w-24 h-px bg-black/20 mx-auto"></div>
        </div>
    
        <!-- Education Cards -->
        <div class="grid grid-cols-3 gap-8">
          <div v-for="(edu, index) in education" :key="index" class="group relative">
            <div class="p-8 bg-white border border-black/10 h-[200px] flex flex-col justify-between
                        transition-all duration-500 hover:border-black
                        shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
              <!-- Year -->
              <div class="text-5xl font-light text-black/20
                          group-hover:text-black/40 transition-colors duration-500">
                {{ edu.year }}
              </div>
              
              <!-- Degree -->
              <div class="relative">
                <div class="h-px w-12 bg-black/20 mb-4
                           group-hover:w-16 transition-all duration-500"></div>
                <h3 class="text-lg text-black/70 font-light leading-relaxed 
                           group-hover:text-black transition-colors duration-500">
                  {{ edu.degree }}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="py-32 bg-white relative overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      
      <div class="max-w-7xl mx-auto px-4">
        <!-- Section Header -->
        <div class="text-center mb-24">
          <h2 class="text-2xl font-light tracking-[0.2em] text-black/80 mb-4">PROFESSIONAL JOURNEY</h2>
          <div class="w-24 h-px bg-black/20 mx-auto"></div>
        </div>
    
        <!-- Timeline Experience -->
        <div class="relative">
          <!-- Center Line -->
          <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-black/10"></div>
    
          <div class="space-y-32">
            <div v-for="(exp, index) in experience" :key="index"
                 class="relative group">
              <!-- Experience Card -->
              <div :class="`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`">
                <div class="w-5/12 transform hover:translate-y-[-5px] transition-all duration-500">
                  <!-- Main Card -->
                  <div class="bg-white p-10 border border-black/5 relative
                              shadow-[0_20px_50px_rgba(0,0,0,0.08)] group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)]
                              transition-all duration-500">
                    <!-- Company Info -->
                    <div class="mb-8">
                      <span class="text-sm tracking-[0.2em] text-black/40 uppercase block mb-2">
                        {{ exp.period }}
                      </span>
                      <h3 class="text-3xl font-light text-black mb-3">{{ exp.company }}</h3>
                      <div class="inline-block px-4 py-1 border border-black/20 text-sm tracking-wider text-black/70">
                        {{ exp.role }}
                      </div>
                    </div>
    
                    <!-- Enhanced Project List -->
                    <div class="space-y-4">
                      <div v-for="(project, pIndex) in exp.projects" 
                           :key="pIndex"
                           class="group/item">
                        <div class="flex items-center p-4 hover:bg-black/[0.02] rounded-sm
                                  transform transition-all duration-300 hover:translate-x-2">
                          <!-- Project Marker -->
                          <div class="relative">
                            <div class="w-1.5 h-1.5 bg-black/40 group-hover/item:bg-black 
                                      transition-colors duration-300 mr-4"></div>
                            <div class="absolute -inset-2 border border-black/5 rounded-full scale-0 opacity-0
                                      group-hover/item:scale-100 group-hover/item:opacity-100 transition-all duration-300"></div>
                          </div>
                          <!-- Project Text -->
                          <span class="text-black/70 group-hover/item:text-black transition-colors duration-300">
                            {{ project }}
                          </span>
                        </div>
                      </div>
                    </div>
    
                    <!-- Achievement Badge -->
                    <div v-if="exp.achievements" 
                         class="absolute -right-4 -top-4 w-16 h-16 bg-black text-white
                                flex items-center justify-center transform rotate-12
                                group-hover:rotate-0 transition-all duration-500">
                      <span class="text-sm tracking-wider">{{ exp.achievements }}★</span>
                    </div>
                  </div>
                </div>
              </div>
    
              <!-- Enhanced Timeline Node -->
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div class="relative">
                  <!-- Inner Circle -->
                  <div class="w-3 h-3 bg-black rounded-full relative z-10"></div>
                  <!-- Outer Circle -->
                  <div class="absolute -inset-2 border-2 border-black/20 rounded-full
                             transform scale-0 opacity-0 group-hover:scale-100 
                             group-hover:opacity-100 transition-all duration-500"></div>
                  <!-- Year Label -->
                  <div class="absolute top-8 left-1/2 transform -translate-x-1/2 
                             text-sm text-black/60 whitespace-nowrap">
                    {{ exp.period }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Decorative Elements -->
    <section>
      <div class="absolute top-0 left-0 w-64 h-64 bg-black/[0.02] rounded-full 
                  transform -translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-black/[0.02] rounded-full 
                  transform translate-x-1/2 translate-y-1/2"></div>
    </section>


  <style scoped>
  /* Add these new styles */
  .experience-card {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .timeline-node {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  /* Enhanced Responsive Design */
  @media screen and (max-width: 768px) {
    .experience-section {
      padding: 4rem 1rem;
    }
  
    .timeline-container {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  
    .experience-card {
      width: 100%;
      margin-left: 0;
      margin-right: 0;
    }
  }
  </style>
    <Footer />
    <FloatingContactButton />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from '~/components/Header.vue';
import FloatingContactButton from '~/components/FloatingContactButton.vue';

const education = ref([
  { year: '2022', degree: 'PhD in Architecture' },
  { year: '2015', degree: 'Master in Urban & Regional Planning' },
  { year: '1991', degree: 'Bachelor of Architecture' }
]);

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

.projects-section {
  margin-top: 80px; /* Add margin to push content below header */
}

/* Hero Section adjustment */
.relative.h-[80vh] {
  margin-top: 80px; /* Add margin to push hero section below header */
}

/* For mobile responsiveness */
@media screen and (max-width: 768px) {
  .relative.h-[80vh] {
    margin-top: 60px; /* Slightly less margin on mobile if needed */
  }
}
</style>