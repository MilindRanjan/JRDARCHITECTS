<!-- components/EnhancedProfile.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <Header />
    
    <!-- Hero Section -->
    <div class="relative h-[80vh] overflow-hidden projects-section">
      <!-- Blueprint Grid Background -->
      <div class="absolute inset-0 opacity-5 pointer-events-none">
        <div class="h-full w-full" style="background-image: linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px); background-size: 20px 20px;"></div>
      </div>
      
      <!-- Main Content -->
      <div class="relative max-w-7xl mx-auto h-full flex items-center px-4">
        <div class="grid grid-cols-12 gap-8 items-center w-full">
          <!-- Text Content -->
          <div class="col-span-7 space-y-8">
            <div class="space-y-3 relative">
              <!-- Architectural decorative elements -->
              <div class="absolute -top-6 -left-6 w-12 h-12 opacity-10 border-t border-l border-black/60"></div>
              
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
                      transform hover:scale-105 transition-all duration-300 relative overflow-hidden group">
                <span class="relative z-10">View Projects</span>
                <!-- Blueprint overlay animation -->
                <div class="absolute inset-0 w-full h-full bg-grid-pattern opacity-0 group-hover:opacity-10 
                          transition-opacity duration-500"></div>
              </button>
              <button 
                @click="scrollToSection('experience')"
                class="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-full 
                      hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 relative overflow-hidden group">
                <span class="relative z-10">Experience</span>
                <!-- Blueprint overlay animation -->
                <div class="absolute inset-0 w-full h-full bg-grid-pattern opacity-0 group-hover:opacity-10 
                          transition-opacity duration-500"></div>
              </button>
            </div>
          </div>
          
          <!-- Profile Image -->
          <div class="col-span-5 relative">
            <!-- Background decorative elements -->
            <div class="absolute -bottom-8 -right-8 w-16 h-16 opacity-10 border-b border-r border-black/60"></div>
            
            <div class="relative w-full aspect-[3/4] rounded-2xl overflow-hidden 
                        transform hover:scale-105 transition-all duration-500">
              <!-- Blueprint frame -->
              <div class="absolute inset-0 border border-black/10 z-10 pointer-events-none"></div>
              <div class="absolute top-0 left-0 w-4 h-4 border-t border-l border-black/20 z-20"></div>
              <div class="absolute top-0 right-0 w-4 h-4 border-t border-r border-black/20 z-20"></div>
              <div class="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-black/20 z-20"></div>
              <div class="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-black/20 z-20"></div>
              
              <img src="/venk.jpeg" alt="Dr. Venkatesh Raman" 
                   class="absolute inset-0 w-full h-full object-cover object-center" />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
            </div>
            
            <!-- Floating Stats in Blueprint Style -->
            <div class="absolute -left-24 top-1/4 bg-white rounded-xl shadow-xl p-4 
                        transform hover:scale-110 transition-all duration-300 border border-black/5">
              <!-- Blueprint decoration -->
              <div class="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-black/20"></div>
              
              <div class="text-center">
                <div class="text-3xl font-light text-gray-900">20+</div>
                <div class="text-sm text-gray-600 tracking-wider">Years Experience</div>
              </div>
              
              <!-- Blueprint circle -->
              <div class="absolute -bottom-3 -right-3 w-6 h-6 rounded-full border border-dashed border-black/20 opacity-30"></div>
            </div>
            
            <div class="absolute -right-12 bottom-1/4 bg-white rounded-xl shadow-xl p-4 
                        transform hover:scale-110 transition-all duration-300 border border-black/5">
              <!-- Blueprint decoration -->
              <div class="absolute -top-2 -right-2 w-4 h-4 border-t border-r border-black/20"></div>
              
              <div class="text-center">
                <div class="text-3xl font-light text-gray-900">50+</div>
                <div class="text-sm text-gray-600 tracking-wider">Major Projects</div>
              </div>
              
              <!-- Blueprint circle -->
              <div class="absolute -bottom-3 -left-3 w-6 h-6 rounded-full border border-dashed border-black/20 opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Education Timeline -->
    <section class="py-24 bg-white border-t border-black/5 relative overflow-hidden">
      <!-- Blueprint Grid Background -->
      <div class="absolute inset-0 opacity-5 pointer-events-none">
        <div class="h-full w-full" style="background-image: linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px); background-size: 20px 20px;"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-8 relative">
        <!-- Architectural decorative elements -->
        <div class="absolute top-0 left-8 w-16 h-16 opacity-5 border-t border-l border-black/60"></div>
        <div class="absolute bottom-0 right-8 w-16 h-16 opacity-5 border-b border-r border-black/60"></div>
        
        <!-- Section Header - Blueprint Style -->
        <div class="text-center mb-20 relative">
          <h2 class="text-2xl font-light tracking-[0.2em] text-black/80 mb-4">EDUCATIONAL BACKGROUND</h2>
          <div class="relative h-px w-24 bg-black/20 mx-auto">
            <div class="absolute -top-1 left-1/2 w-2 h-2 bg-black/30 rounded-full transform -translate-x-1/2"></div>
          </div>
        </div>
    
        <!-- Education Cards - Blueprint Style -->
        <div class="grid grid-cols-3 gap-8">
          <div v-for="(edu, index) in education" :key="index" class="group relative">
            <!-- Blueprint Grid for Card Background -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none">
              <div class="h-full w-full" style="background-image: linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px); background-size: 10px 10px;"></div>
            </div>
            
            <div class="p-8 bg-white border border-black/10 h-[200px] flex flex-col justify-between
                        transition-all duration-500 hover:border-black
                        shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]
                        relative">
              <!-- Architectural Corner Elements -->
              <div class="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-black/20 opacity-0 
                          group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-black/20 opacity-0 
                          group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <!-- Blueprint Circle -->
              <div class="absolute top-1/2 right-4 w-8 h-8 rounded-full border border-dashed border-black/10
                          opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                          
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
    <section id="experience" class="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-20">
          <h2 class="text-3xl font-light tracking-[0.2em] text-black/80 mb-4">CAREER TIMELINE</h2>
          <div class="relative h-px w-24 bg-black/20 mx-auto">
            <div class="absolute -top-1 left-1/2 w-2 h-2 bg-black/30 rounded-full transform -translate-x-1/2"></div>
          </div>
        </div>
        
        <!-- Architectural Blueprint Timeline -->
        <div class="relative">
          <!-- Blueprint Grid Background -->
          <div class="absolute inset-0 opacity-5 pointer-events-none">
            <div class="h-full w-full" style="background-image: linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px); background-size: 20px 20px;"></div>
          </div>
          
          <!-- Timeline Container -->
          <div class="relative">
            <!-- Experience Items -->
            <div class="space-y-16">
              <div v-for="(exp, index) in experience" :key="index" class="group">
                <!-- Experience Card -->
                <div class="relative bg-white border border-black/5 shadow-lg rounded-none 
                           hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  
                  <!-- Card Header with Architectural Motif -->
                  <div class="h-1 w-full bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
                  
                  <div class="grid md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-black/5">
                    <!-- Left Column - Timeline & Company Details -->
                    <div class="md:col-span-4 p-8 relative bg-gray-50/80">
                      <!-- Timeline Marker -->
                      <div class="absolute top-0 left-0 h-full w-1 bg-black/5 transform origin-top 
                                 scale-y-0 group-hover:scale-y-100 transition-transform duration-700"></div>
                      
                      <!-- Blueprint Circle -->
                      <div class="absolute -bottom-6 -right-6 w-12 h-12 rounded-full border border-dashed border-black/20
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <!-- Period Badge -->
                      <div class="inline-block px-3 py-1 rounded border border-black/10 text-xs 
                                 tracking-wider uppercase text-black/50 mb-4">
                        {{ exp.period }}
                      </div>
                      
                      <h3 class="text-2xl font-light tracking-wide text-black mb-1">{{ exp.company }}</h3>
                      <p class="text-black/70 italic mb-6">{{ exp.role }}</p>
                      
                      <!-- Blueprint Technical Drawing -->
                      <div class="relative my-4 h-20 w-full opacity-20 hidden md:block">
                        <!-- Architectural drawing elements -->
                        <div class="absolute top-1/2 left-0 right-0 h-px bg-black/30"></div>
                        <div class="absolute top-0 bottom-0 left-1/4 w-px bg-black/30"></div>
                        <div class="absolute top-0 bottom-0 left-2/3 w-px bg-black/30"></div>
                        <div class="absolute bottom-0 left-1/4 w-10 h-10 border border-black/30 rounded-full"></div>
                        <div class="absolute top-0 right-0 w-6 h-6 border border-black/30"></div>
                        <!-- Dimension lines -->
                        <div class="absolute left-1/2 -translate-x-1/2 top-3/4 w-3/4 flex justify-between">
                          <div class="w-px h-3 bg-black/30"></div>
                          <div class="w-px h-3 bg-black/30"></div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Right Column - Projects -->
                    <div class="md:col-span-8 p-8 relative">
                      <!-- Background decorative elements -->
                      <div class="absolute bottom-0 right-0 w-32 h-32 opacity-5 border-t border-l 
                                 border-black/30 transform rotate-45 translate-x-16 translate-y-16"></div>
                      
                      <h4 class="text-lg font-medium text-black/80 mb-6 flex items-center">
                        <span class="inline-block w-6 h-px bg-black/30 mr-2"></span>
                        Notable Projects
                      </h4>
                      
                      <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        <li v-for="(project, pIndex) in exp.projects" :key="pIndex" 
                            class="relative group/item">
                          <div class="absolute top-0 left-0 w-px h-full bg-black/10 
                                     group-hover/item:bg-black/30 transition-colors duration-300"></div>
                          <div class="pl-4 transform group-hover/item:translate-x-1 transition-transform duration-300">
                            <div class="absolute top-1/2 left-0 w-2 h-2 border border-black/20 rounded-full 
                                       transform -translate-y-1/2
                                       group-hover/item:border-black group-hover/item:scale-150 
                                       transition-all duration-300"></div>
                            <span class="text-black/80 group-hover/item:text-black transition-colors duration-300">
                              {{ project }}
                            </span>
                          </div>
                        </li>
                      </ul>
                      
                      <!-- Project count indicator -->
                      <div class="mt-8 flex items-center justify-end">
                        <div class="text-xs text-black/50 tracking-wider">
                          {{ exp.projects.length }} PROJECT{{ exp.projects.length > 1 ? 'S' : '' }}
                        </div>
                        <div class="ml-2 h-px w-8 bg-black/20 flex-shrink-0"></div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Experience Year Watermark -->
                  <div class="absolute bottom-0 right-0 p-6 opacity-5 pointer-events-none">
                    <div class="text-8xl font-thin text-black tracking-widest transform translate-y-1/4">
                      {{ exp.period.split('-')[0] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Experience Summary -->
        <div class="mt-20 relative">
          <div class="max-w-3xl mx-auto bg-white border border-black/5 shadow-xl p-10 
                      transform hover:-translate-y-1 transition-all duration-500">
            <div class="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-black/30"></div>
            <div class="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-black/30"></div>
            
            <div class="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10 text-center">
              <div class="p-6">
                <div class="text-xs uppercase tracking-widest text-black/50 mb-1">Career Span</div>
                <div class="text-4xl font-light text-black">30+ Years</div>
              </div>
              <div class="p-6">
                <div class="text-xs uppercase tracking-widest text-black/50 mb-1">Projects Completed</div>
                <div class="text-4xl font-light text-black">50+</div>
              </div>
              <div class="p-6">
                <div class="text-xs uppercase tracking-widest text-black/50 mb-1">Companies</div>
                <div class="text-4xl font-light text-black">{{ experience.length }}</div>
              </div>
            </div>
            
            <div class="mt-6 h-px w-full bg-black/5"></div>
            
            <div class="mt-6 text-center">
              <p class="text-black/70 italic">
                "Architecture is the learned game, correct and magnificent, of forms assembled in the light."
              </p>
              <div class="mt-2 text-xs uppercase tracking-widest text-black/40">Le Corbusier</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Achievement & Publications Section (New) -->
    <section class="py-24 bg-white border-t border-black/5 relative overflow-hidden">
      <!-- Blueprint Grid Background -->
      <div class="absolute inset-0 opacity-5 pointer-events-none">
        <div class="h-full w-full" style="background-image: linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px); background-size: 20px 20px;"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <!-- Section Header -->
        <div class="text-center mb-20">
          <h2 class="text-3xl font-light tracking-[0.2em] text-black/80 mb-4">ACHIEVEMENTS</h2>
          <div class="relative h-px w-24 bg-black/20 mx-auto">
            <div class="absolute -top-1 left-1/2 w-2 h-2 bg-black/30 rounded-full transform -translate-x-1/2"></div>
          </div>
        </div>
        
        <!-- Achievements Grid -->
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Left column - Awards -->
          <div class="bg-white border border-black/5 shadow-lg p-8 relative">
            <div class="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-black/30"></div>
            
            <h3 class="text-2xl font-light tracking-wide text-black mb-6 flex items-center">
              <span class="inline-block w-6 h-px bg-black/30 mr-2"></span>
              Awards & Recognition
            </h3>
            
            <ul class="space-y-6">
              <li v-for="(award, index) in [
                { year: '2022', title: 'Excellence in Commercial Architecture', org: 'Indian Institute of Architects' },
                { year: '2019', title: 'Green Building Initiative Award', org: 'Environmental Design Council' },
                { year: '2015', title: 'Urban Planning Achievement', org: 'National Planning Commission' }
              ]" :key="index" class="group relative">
                <div class="pl-8 relative">
                  <!-- Blueprint dot -->
                  <div class="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 border border-black/30 rounded-full
                              group-hover:scale-150 transition-transform duration-300"></div>
                  
                  <div class="text-sm text-black/50 tracking-wider mb-1">{{ award.year }}</div>
                  <div class="text-lg text-black/80 font-light group-hover:text-black transition-colors duration-300">
                    {{ award.title }}
                  </div>
                  <div class="text-sm text-black/60 italic">{{ award.org }}</div>
                </div>
              </li>
            </ul>
            
            <!-- Blueprint decoration -->
            <div class="absolute bottom-4 right-4 w-16 h-16 opacity-10">
              <div class="absolute top-0 left-0 w-full h-full border-l border-t border-black/40 rounded-tl-lg"></div>
              <div class="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-black/40 rounded-br-lg"></div>
            </div>
          </div>
          
          <!-- Right column - Publications -->
          <div class="bg-white border border-black/5 shadow-lg p-8 relative">
            <div class="absolute -top-3 -right-3 w-6 h-6 border-t border-r border-black/30"></div>
            
            <h3 class="text-2xl font-light tracking-wide text-black mb-6 flex items-center">
              <span class="inline-block w-6 h-px bg-black/30 mr-2"></span>
              Publications & Research
            </h3>
            
            <ul class="space-y-6">
              <li v-for="(pub, index) in [
                { year: '2023', title: 'Sustainable Urban Planning in Developing Cities', journal: 'Journal of Urban Architecture' },
                { year: '2020', title: 'The Evolution of Residential Spaces Post-Pandemic', journal: 'Architecture Today' },
                { year: '2018', title: 'Cultural Influences in Modern Indian Architecture', journal: 'Design & Culture' }
              ]" :key="index" class="group relative">
                <div class="pl-8 relative">
                  <!-- Technical drawing elements -->
                  <div class="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 border border-black/30
                              group-hover:border-black transition-colors duration-300"></div>
                  
                  <div class="text-sm text-black/50 tracking-wider mb-1">{{ pub.year }}</div>
                  <div class="text-lg text-black/80 font-light group-hover:text-black transition-colors duration-300">
                    {{ pub.title }}
                  </div>
                  <div class="text-sm text-black/60 italic">{{ pub.journal }}</div>
                </div>
              </li>
            </ul>
            
            <!-- Blueprint decoration -->
            <div class="absolute bottom-4 left-4 w-16 h-16 opacity-10">
              <div class="absolute top-0 right-0 w-full h-full border-r border-t border-black/40 rounded-tr-lg"></div>
              <div class="absolute bottom-0 left-0 w-8 h-8 border-l border-b border-black/40 rounded-bl-lg"></div>
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

    <Footer />
    <FloatingContactButton />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
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

@keyframes fadeGrid {
  0%, 100% { opacity: 0.03; }
  50% { opacity: 0.07; }
}

/* Enhanced responsive design */
@media screen and (max-width: 768px) {
  /* Ensure proper spacing on mobile */
  .p-8 {
    padding: 1.5rem;
  }
  
  /* Adjust text sizes for mobile */
  .text-7xl {
    font-size: 3rem;
  }
  
  .text-3xl {
    font-size: 1.5rem;
  }
  
  .text-2xl {
    font-size: 1.25rem;
  }
  
  /* Adjust column layout for mobile */
  .grid-cols-12 {
    grid-template-columns: 1fr;
  }
  
  .col-span-7, .col-span-5 {
    grid-column: span 1;
  }
  
  .grid-cols-3 {
    grid-template-columns: 1fr;
  }
  
  /* Hide some decorative elements on mobile */
  .opacity-5.pointer-events-none {
    display: none;
  }
}

/* Printer-style dot animation */
@keyframes printerDots {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Better focus states for accessibility */
:focus-visible {
  outline: 2px solid black;
  outline-offset: 2px;
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
.relative.h-screen {
  height: 100vh;
}
</style>