<template>
  <div class="min-h-screen bg-white flex flex-col">
    <Header />
    
    <!-- Categories Navigation - Wider width -->
    <div class="fixed left-8 top-1/2 transform -translate-y-1/2 z-40 w-48">
      <div class="flex flex-col space-y-4">
        <button
          v-for="category in categories"
          :key="category"
          @click="filterProjects(category)"
          :class="[
            'px-8 py-3 text-sm tracking-[0.2em] transition-all duration-500 relative overflow-hidden group w-full',
            selectedCategory === category
              ? 'text-white'
              : 'text-black hover:text-white'
          ]"
        >
          <!-- Background layer -->
          <div 
            :class="[
              'absolute inset-0 transition-all duration-500',
              selectedCategory === category
                ? 'bg-black'
                : 'bg-black w-0 group-hover:w-full'
            ]"
          ></div>
          <!-- Text layer -->
          <span class="relative z-10">{{ category }}</span>
          <!-- Line indicator -->
          <div 
            :class="[
              'absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-black transition-all duration-300',
              selectedCategory === category ? 'h-full' : 'group-hover:h-full'
            ]"
          ></div>
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 mt-32 max-w-[1920px] flex-grow">


      <!-- Enhanced Projects Grid with proper spacing -->
      <TransitionGroup
        name="projects"
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 pl-56"
      >
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="group relative"
          @click="viewProjectDetails(project)"
        >
          <!-- Project Card -->
          <div class="relative aspect-[4/5] overflow-hidden cursor-pointer rounded-sm">
            <!-- Background Image with Gradient -->
            <div class="absolute inset-0 bg-black/10">
              <img
                :src="project.mainImage"
                :alt="project.name"
                class="w-full h-full object-cover transition-all duration-1000 ease-out transform group-hover:scale-110"
              />
            </div>

            <!-- Hover Overlay with Gradient -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div class="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
                <p class="text-white/90 text-sm leading-relaxed mb-6 font-light">
                  {{ project.description }}
                </p>
                <div class="flex items-center space-x-3">
                  <span class="w-10 h-[0.5px] bg-white/70"></span>
                  <span class="text-white/70 text-xs tracking-[0.3em] uppercase">Explore</span>
                </div>
              </div>
            </div>

            <!-- Project Info -->
            <div class="absolute top-0 left-0 right-0 p-8">
              <div class="space-y-3 transform group-hover:-translate-y-1 transition-transform duration-500">
                <h3 class="text-white text-xl font-light tracking-wide">
                  {{ project.name }}
                </h3>
                <div class="flex items-center space-x-4">
                  <span class="inline-block px-4 py-1 text-[10px] tracking-[0.2em] border border-white/30 text-white/70 uppercase">
                    {{ project.category }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Shadow -->
          <div class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </TransitionGroup>
    </div>

    <!-- Project Modal -->
    <ProjectModal 
      :show="showModal"
      :project="selectedProject"
      @close="closeModal"
    />

    <FloatingContactButton />

    <Footer class="mt-auto" />
  </div>
</template>

<script>
import ProjectModal from '../components/ProjectModal.vue';
import { ref } from 'vue';
import FloatingContactButton from '~/components/FloatingContactButton.vue';

export default {
  components: {
    ProjectModal,
    FloatingContactButton,
  },
  data() {
    return {
      selectedCategory: 'All',
      showModal: false,
      selectedProject: null,
      categories: [
        'All',
        'HOUSING',
        'COMMERCIAL',
        'INSTITUTIONAL',
        'LANDSCAPE',
        'LIASONING',
        'NURSING HOME',
      ],
      projects: [
        {
          id: 1,
          name: 'Maa Tara Housing',
          mainImage: 'Projects/HOUSING/Maa Tara Housing, Patna/Maa Tara Housing.jpg',
          additionalImages: [
            'Projects/HOUSING/Maa Tara Housing, Patna/Maa Tara Housing1.jpg',
            'Projects/HOUSING/Maa Tara Housing, Patna/Maa Tara Housing2.jpg',
            'Projects/HOUSING/Maa Tara Housing, Patna/Maa Tara Housing3.jpg',
            'Projects/HOUSING/Maa Tara Housing, Patna/Maa Tara Housing4.jpg',
            'Projects/HOUSING/Maa Tara Housing, Patna/Maa Tara Housing5.jpg',
            'Projects/HOUSING/Maa Tara Housing, Patna/Maa Tara Housing6.jpg',
            'Projects/HOUSING/Maa Tara Housing, Patna/Maa Tara Housing7.jpg',
            'Projects/HOUSING/Maa Tara Housing, Patna/Maa Tara Housing8.jpg',
          ],
          description: 'Contemporary architectural design with sustainable elements',
          category: 'HOUSING',
        },
        {
          id: 2,
          name: 'Sadakat Ashram',
          mainImage: 'Projects/INSTITUTIONAL/Sadaqat Ashram, Kurji, Patna/1.jpg',
          additionalImages: [
            'Projects/INSTITUTIONAL/Sadaqat Ashram, Kurji, Patna/2.jpg',
            'Projects/INSTITUTIONAL/Sadaqat Ashram, Kurji, Patna/3.jpg',
            'Projects/INSTITUTIONAL/Sadaqat Ashram, Kurji, Patna/4.jpg',
            'Projects/INSTITUTIONAL/Sadaqat Ashram, Kurji, Patna/5.jpg',
            'Projects/INSTITUTIONAL/Sadaqat Ashram, Kurji, Patna/6.jpg',
            'Projects/INSTITUTIONAL/Sadaqat Ashram, Kurji, Patna/7.jpg',
            'Projects/INSTITUTIONAL/Sadaqat Ashram, Kurji, Patna/8.jpg',
          ],
          description: 'Luxurious residential complex with modern amenities',
          category: 'INSTITUTIONAL',
        },
        {
          id: 3,
          name: 'Seevusagur Ramgulam Chowk',
          mainImage: 'Projects/LANDSCAPING/Seevusagur Ramgulam Chowk, Exhibition Road, Patna/1.jpg',
          additionalImages: [
            'Projects/LANDSCAPING/Seevusagur Ramgulam Chowk, Exhibition Road, Patna/2.jpg',
            'Projects/LANDSCAPING/Seevusagur Ramgulam Chowk, Exhibition Road, Patna/3.jpg',
            'Projects/LANDSCAPING/Seevusagur Ramgulam Chowk, Exhibition Road, Patna/4.jpg'
          ],
          description: 'Urban architectural marvel',
          category: 'LANDSCAPE',
        },
        {
          id: 4,
          name: 'Mixed use Project Madhubani',
          mainImage: 'Projects/COMMERCIAL/Mixed Use Project, Madhubani 1.jpg',
          additionalImages: [
            'Projects/COMMERCIAL/Mixed Use Project, Madhubani.jpg',
          ],
          description: 'Elegant outdoor living space',
          category: 'COMMERCIAL',
        },
        {
          id: 5,
          name: 'VISWA',
          mainImage: 'Projects/rear view5.JPG',
          description: 'Stunning rear facade design',
          category: 'INSTITUTIONAL',
        },
        {
          id: 6,
          name: 'Sports Complex',
          mainImage: 'Projects/INSTITUTIONAL/Sports Complex, Government of Bihar/f1.jpg',
          additionalImages: [
            'Projects/INSTITUTIONAL/Sports Complex, Government of Bihar/f11.jpg',
            'Projects/INSTITUTIONAL/Sports Complex, Government of Bihar/f22.jpg'
          ],
          description: 'Contemporary facade treatment',
          category: 'INSTITUTIONAL',
        },
        {
          id: 15,
          name: 'Police Building',
          mainImage: 'Projects/LIASONING/police building.png',
          description: 'Stunning rear facade design',
          category: 'LIASONING',
        },
        {
          id: 7,
          name: 'Nursing Home',
          mainImage: 'Projects/NURSING HOMES/1.jpg',
          additionalImages: [
            'Projects/NURSING HOMES/2.jpg',
            'Projects/NURSING HOMES/3.png',
            'Projects/NURSING HOMES/4.jpg',
            'Projects/NURSING HOMES/5.jpg',
          ],
          description: 'Healthcare facility design',
          category: 'NURSING HOME',
        },
        {
          id: 8,
          name: 'Apartment, Patna',
          mainImage: 'Projects/HOUSING/Apartment, Patna.jpg',
          description: 'Panoramic residential project',
          category: 'HOUSING',
        },
        {
          id: 14,
          name: 'Samrat Ashok Convention Centre',
          mainImage: 'Projects/LIASONING/samrat ashok cconvention centree.png',
          description: 'Stunning rear facade design',
          category: 'LIASONING',
        },
        {
          id: 9,
          name: 'Zila Parishad, Begusarai',
          mainImage: 'Projects/COMMERCIAL/zp begu3.jpg',
          additionalImages: [
            'Projects/COMMERCIAL/zp begu5.jpg',
            'Projects/COMMERCIAL/zp beg.JPG',
          ],
          description: 'Elegant outdoor living space',
          category: 'COMMERCIAL',
        },
        {
          id: 13,
          name: 'IGIMS Hospital',
          mainImage: 'Projects/LIASONING/IGIMS HOS.png',
          description: 'Stunning rear facade design',
          category: 'LIASONING',
        },
        {
          id: 10,
          name: 'RN Institute of Urology',
          mainImage: 'Projects/INSTITUTIONAL/RN INTITUTE OF UROLOGY.jpg',
          description: 'Stunning rear facade design',
          category: 'INSTITUTIONAL',
        },
        {
          id: 11,
          name: 'Swaminandan Golumbar',
          mainImage: 'Projects/LANDSCAPING/Swaminandan Golumbar, Patna.jpg',
          description: 'Stunning rear facade design',
          category: 'LANDSCAPE',
        },
        {
          id: 12,
          name: 'Sardar Patel Bhawan',
          mainImage: 'Projects/LIASONING/BIHAR POLICE.jpg',
          description: 'Stunning rear facade design',
          category: 'LIASONING',
        },
      ]
    }
  },
  computed: {
    filteredProjects() {
      return this.selectedCategory === 'All'
        ? this.projects
        : this.projects.filter(
            (project) => project.category === this.selectedCategory
          );
    },
  },
  watch: {
    '$route.query.category': {
      immediate: true,
      handler(newCategory) {
        this.filterProjects(newCategory || 'All');
        this.scrollToProjects();
      },
    },
  },
  methods: {
    filterProjects(category) {
      this.selectedCategory = category;
    },
    scrollToProjects() {
      // Only run on client-side
      if (process.client) {
        const projectsSection = document.querySelector('.container');
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    viewProjectDetails(project) {
      this.selectedProject = project;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
  watch: {
    '$route.query.category': {
      immediate: true,
      handler(newCategory) {
        this.filterProjects(newCategory || 'All');
        // Only scroll after component is mounted
        this.$nextTick(() => {
          this.scrollToProjects();
        });
      },
    },
  },
};
</script>

<style scoped>
/* Base Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.section-title {
  margin-top: auto;
  text-align: center;
  margin-bottom: 80px;
  position: relative;
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

/* Print Styles */
@media print {
  .filter-container {
    display: none;
  }
  
  .project-item {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}

/* Additional Global Styles */
html {
  scroll-behavior: smooth;
}

.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.75);
}

.min-h-screen {
  display: flex;
  flex-direction: column;
}

.container {
  flex: 1;
  padding-bottom: 2rem;
  margin-top: 80px;
  width: 100%;
}

.grid {
  width: calc(100% - 14rem);
  margin-left: auto;
  margin-right: auto;
}

@media screen and (max-width: 1536px) {
  .container {
    max-width: 1536px;
  }
  
  .grid {
    width: calc(100% - 12rem);
  }
}

@media screen and (max-width: 768px) {
  .container {
    margin-top: 60px;
    padding: 0 1rem;
  }
  
  .grid {
    width: 100%;
    padding-left: 1rem;
  }
  
  .fixed.left-8 {
    position: static;
    width: 100%;
    transform: none;
    margin: 1rem 0 2rem;
  }
  
  .fixed.left-8 .flex-col {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    padding: 0 1rem;
  }

  .title-text {
    font-size: 2rem;
  }
}

/* Enhanced Grid Transitions */
.projects-move {
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.projects-enter-active,
.projects-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.projects-enter-from,
.projects-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* Hover Effects */
.group:hover .project-image {
  filter: brightness(1.1);
}

/* Mobile Responsiveness */
@media screen and (max-width: 768px) {
  .container {
    margin-top: 60px;
    padding: 0 1rem;
  }
  
  .fixed.left-8 {
    position: static;
    transform: none;
    margin: 1rem 0 2rem;
  }
  
  .fixed.left-8 .flex-col {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    padding: 0 1rem;
  }

  .title-text {
    font-size: 2rem;
  }
}
</style>