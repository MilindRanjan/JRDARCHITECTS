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
        'RESIDENTIAL',
        'COMMERCIAL',
        'INSTITUTIONAL',
        'INTERIORS',
        'LANDSCAPE',
      ],
      projects: [
        {
          id: 1,
          name: 'South Elevation',
          mainImage: 'Projects/south elevation1.jpg',
          additionalImages: [
            'Projects/south elevation1.jpg',
            'Projects/south elevation1.jpg',
            'Projects/south elevation1.jpg'
          ],
          description: 'Contemporary architectural design with sustainable elements',
          category: 'RESIDENTIAL',
        },
        {
          id: 2,
          name: 'Modern Living',
          mainImage: 'Projects/20140720_163258(2).jpg',
          additionalImages: [
            'Projects/20140720_163258(2).jpg',
            'Projects/20140720_163258(2).jpg',
            'Projects/20140720_163258(2).jpg'
          ],
          description: 'Luxurious residential complex with modern amenities',
          category: 'COMMERCIAL',
        },
        {
          id: 3,
          name: 'Urban Design',
          mainImage: 'Projects/ek-bihari3.jpg',
          additionalImages: [
            'Projects/ek-bihari3.jpg',
            'Projects/ek-bihari3.jpg',
            'Projects/ek-bihari3.jpg'
          ],
          description: 'Urban architectural marvel',
          category: 'INSTITUTIONAL',
        },
        {
          id: 4,
          name: 'Front Pergola',
          mainImage: 'Projects/front pergola 28 10 24(4).jpg',
          additionalImages: [
            'Projects/ek-bihari3.jpg',
            'Projects/rear view5.JPG',
            'Projects/yarpur_view (8).jpg'
          ],
          description: 'Elegant outdoor living space',
          category: 'INTERIORS',
        },
        {
          id: 5,
          name: 'Rear View',
          mainImage: 'Projects/rear view5.JPG',
          additionalImages: [
            'Projects/rear view5.JPG',
            'Projects/rear view5.JPG',
            'Projects/rear view5.JPG'
          ],
          description: 'Stunning rear facade design',
          category: 'LANDSCAPE',
        },
        {
          id: 6,
          name: 'Modern Facade',
          mainImage: 'Projects/f1(6).jpg',
          additionalImages: [
            'Projects/f1(6).jpg',
            'Projects/f1(6).jpg',
            'Projects/f1(6).jpg'
          ],
          description: 'Contemporary facade treatment',
          category: 'INTERIORS',
        },
        {
          id: 7,
          name: 'Nursing Home',
          mainImage: 'Projects/View nursing home TRIM copy7.jpg',
          additionalImages: [
            'Projects/View nursing home TRIM copy7.jpg',
            'Projects/View nursing home TRIM copy7.jpg',
            'Projects/View nursing home TRIM copy7.jpg'
          ],
          description: 'Healthcare facility design',
          category: 'INSTITUTIONAL',
        },
        {
          id: 8,
          name: 'Yarpur View',
          mainImage: 'Projects/yarpur_view (8).jpg',
          additionalImages: [
            'Projects/yarpur_view (8).jpg',
            'Projects/yarpur_view (8).jpg',
            'Projects/yarpur_view (8).jpg'
          ],
          description: 'Panoramic residential project',
          category: 'RESIDENTIAL',
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