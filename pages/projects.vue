<template>
  <div class="min-h-screen bg-white">
    <Header 
      :categories="categories" 
      @filter-category="filterProjects"
    />
    
    <div class="container mx-auto px-4 mt-24 max-w-7xl">
      <div class="text-center mb-12">
  <h1 class="text-5xl font-normal text-gray-900 mb-4">Our Projects</h1>
</div>

      <div class="flex flex-wrap justify-center gap-4 mb-16">
        <button
  v-for="category in categories"
  :key="category"
  @click="filterProjects(category)"
  :class="[
    'px-6 py-2.5 rounded-full transition-all duration-300 text-sm font-normal',
    selectedCategory === category
      ? 'bg-black text-white shadow-md transform scale-105'
      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-sm'
  ]"
>
  {{ category }}
</button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="group relative cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          @click="viewProjectDetails(project)"
        >
          <div class="relative aspect-[4/3] overflow-hidden">
            <img
            :src="project.mainImage"
    :alt="project.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p class="text-sm font-medium">View Project</p>
              </div>
            </div>
          </div>

          <div class="p-6">
  <div class="flex items-start justify-between mb-3">
    <h3 class="text-lg font-normal text-gray-900 group-hover:text-black">
      {{ project.name }}
    </h3>
    <span class="inline-block px-3 py-1 text-xs font-light bg-black text-white rounded-full">
      {{ project.category }}
    </span>
  </div>
  <p class="text-gray-500 text-sm leading-relaxed font-light">
    {{ project.description }}
  </p>
</div>
        </div>
      </div>
    </div>

    <ProjectModal 
      :project="selectedProject"
      :show="showModal"
      @close="showModal = false"
    />
  </div>
</template>

<script>
import ProjectModal from '../components/ProjectModal.vue';
import { ref } from 'vue';

export default {
  components: {
    ProjectModal,
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
          name: 'ZP',
          mainImage: 'Projects/COMMERCIAL/ZP.jpg',
          additionalImages: [
            'Projects/COMMERCIAL/ZP2.jpg',
            'Projects/COMMERCIAL/ZP11.jpg',
            'Projects/COMMERCIAL/zp beg.jpg',
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
</style>