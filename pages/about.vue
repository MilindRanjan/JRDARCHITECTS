
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
<section id="experience" class="py-24 bg-white overflow-hidden relative">
  <!-- Subtle Background Pattern -->
  <div class="absolute inset-0 opacity-[0.03] pointer-events-none">
    <div class="h-full w-full" style="background-image: linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px); background-size: 40px 40px;"></div>
  </div>
  
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Section Header -->
    <div class="text-center mb-20">
      <h2 class="text-3xl font-light tracking-[0.2em] text-black mb-4">PROFESSIONAL JOURNEY</h2>
      <div class="relative h-px w-24 bg-black/20 mx-auto">
        <div class="absolute -top-1 left-1/2 w-2 h-2 bg-black/30 rounded-full transform -translate-x-1/2"></div>
      </div>
    </div>
    
    <div class="relative timeline-wrapper">
      <!-- Continuous Vertical Line -->
      <div class="absolute left-16 top-0 bottom-0 w-px bg-black/30 timeline-line"></div>
      
      <!-- Experience Blocks -->
      <div class="space-y-16">
        <div v-for="(exp, index) in experience" :key="index" 
             class="relative experience-block group">
          
          <!-- Year Node -->
          <div class="absolute left-16 top-0 transform -translate-x-1/2 z-10">
            <div class="w-12 h-12 bg-white border-2 border-black/40 rounded-lg shadow-md
                      flex items-center justify-center year-node
                      group-hover:border-black group-hover:scale-110 transition-all duration-300">
              <span class="text-sm font-medium text-black/70">{{ exp.period.split('-')[0] }}</span>
            </div>
          </div>
          
          <!-- Experience Card -->
          <div class="ml-28 bg-white border border-black/10 rounded-lg shadow-md overflow-hidden
                      experience-card group-hover:border-black/30 group-hover:shadow-xl transition-all duration-500">
            <!-- Company Header Bar -->
            <div class="px-8 py-6 bg-black/[0.03] border-b border-black/10 flex flex-wrap items-center justify-between gap-4">
              <h3 class="text-2xl font-light tracking-wide text-black">{{ exp.company }}</h3>
              <span class="px-5 py-1.5 bg-black text-white text-sm tracking-wider rounded-full shadow-sm">
                {{ exp.period }}
              </span>
            </div>
            
            <!-- Role -->
            <div class="px-8 py-5 border-b border-black/5 bg-gradient-to-r from-white via-black/[0.01] to-white">
              <h4 class="text-lg font-medium text-black/80 flex items-center">
                <span class="inline-block w-4 h-px bg-black/40 mr-3"></span>
                {{ exp.role }}
                <span class="inline-block w-4 h-px bg-black/40 ml-3"></span>
              </h4>
            </div>
            
            <!-- Projects - Organized Grid -->
            <div class="p-8">
              <h5 class="text-sm uppercase tracking-wider text-black/50 mb-6 flex items-center">
                <span class="w-2 h-2 bg-black/20 mr-2"></span>
                Notable Projects
                <span class="ml-3 h-px flex-grow bg-black/10"></span>
              </h5>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div v-for="(project, pIndex) in exp.projects" :key="pIndex" 
                     class="flex items-start project-item group/project">
                  <div class="w-2 h-2 bg-black/30 mt-1.5 mr-3 rounded-sm flex-shrink-0 project-bullet
                            group-hover/project:bg-black group-hover/project:scale-125 transition-all duration-300"></div>
                  <span class="text-black/70 group-hover/project:text-black transition-colors duration-300">
                    {{ project }}
                  </span>
                </div>
              </div>
              
              <!-- Project Count Indicator -->
              <div class="mt-8 flex items-center justify-end">
                <div class="text-xs text-black/50 tracking-wider">
                  {{ exp.projects.length }} PROJECT{{ exp.projects.length > 1 ? 'S' : '' }}
                </div>
                <div class="ml-2 h-px w-12 bg-black/20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Timeline End - Educational Foundation -->
      <div class="relative pt-16 ml-28">
        <div class="absolute left-16 top-0 transform translate-y-6 -translate-x-1/2 z-10">
          <div class="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center year-node">
            <span class="text-sm font-medium text-black/70">1991</span>
          </div>
        </div>
        
        <div class="bg-white/90 border border-black/10 p-6 rounded-lg inline-block shadow-sm hover:shadow-md transition-all duration-300">
          <p class="text-black/80 font-medium">Beginning of Professional Journey</p>
          <p class="text-sm text-black/60 mt-2 italic">Foundation: Bachelor of Architecture</p>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Subtle Decorative Elements -->
  <div class="absolute -bottom-32 right-0 w-64 h-64 border border-black/5 rounded-full
              transform translate-x-1/3 opacity-70"></div>
</section>     
    <!-- Decorative Elements -->
    <section>
      <div class="absolute top-0 left-0 w-64 h-64 bg-black/[0.02] rounded-full 
                  transform -translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-black/[0.02] rounded-full 
                  transform translate-x-1/2 translate-y-1/2"></div>
    </section>
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
/* Basic styles only */
.bg-grid-pattern {
  background-image: radial-gradient(circle, #000 1px, transparent 1px);
  background-size: 30px 30px;
}

html {
  scroll-behavior: smooth;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

img {
  max-width: 100%;
  height: auto;
}

.projects-section {
  margin-top: 80px;
}

.relative.h-80vh {
  margin-top: 80px;
}

@media screen and (max-width: 768px) {
  .relative.h-80vh {
    margin-top: 60px;
  }
}
</style>