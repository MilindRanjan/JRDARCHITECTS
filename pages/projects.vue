<template>
  <div>
    <!-- Header -->
    <Header 
      :categories="categories" 
      @filter-category="filterProjects"
    />
    
    <!-- Filter Section -->
    <div class="container mx-auto px-4 mt-20"> <!-- Added margin-top -->
      <div class="flex flex-wrap justify-center gap-3 mb-12">
        <button
          v-for="category in categories"
          :key="category"
          @click="filterProjects(category)"
          :class="[
            'px-6 py-2 rounded-full transition-all duration-300',
            selectedCategory === category
              ? 'bg-black text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          {{ category }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="group cursor-pointer overflow-hidden border-0 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-white rounded-lg"
          @click="viewProjectDetails(project)"
        >
          <div class="relative aspect-video overflow-hidden">
            <img
              :src="project.image"
              :alt="project.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div class="p-6">
            <div class="flex items-start justify-between">
              <h3 class="text-xl font-semibold text-gray-900">
                {{ project.name }}
              </h3>
              <span class="inline-block px-3 py-1 text-xs font-medium bg-black text-white rounded-full">
                {{ project.category }}
              </span>
            </div>
            <p class="mt-3 text-gray-600 text-sm">
              {{ project.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Modal -->
    <ProjectModal
      v-if="showModal"
      :project="selectedProject"
      @close="showModal = false"
    />
  </div>
</template>

<script>
import ProjectModal from '../components/ProjectModal.vue';

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
          image: 'Projects/south elevation1.jpg',
          description: 'Contemporary architectural design with sustainable elements',
          category: 'RESIDENTIAL',
        },
        {
          id: 2,
          name: 'Modern Living',
          image: 'Projects/20140720_163258(2).jpg',
          description: 'Luxurious residential complex with modern amenities',
          category: 'COMMERCIAL',
        },
        {
          id: 3,
          name: 'Urban Design',
          image: 'Projects/ek-bihari3.jpg',
          description: 'Urban architectural marvel',
          category: 'INSTITUTIONAL',
        },
        {
          id: 4,
          name: 'Front Pergola',
          image: 'Projects/front pergola 28 10 24(4).jpg',
          description: 'Elegant outdoor living space',
          category: 'INTERIORS',
        },
        {
          id: 5,
          name: 'Rear View',
          image: 'Projects/rear view5.JPG',
          description: 'Stunning rear facade design',
          category: 'LANDSCAPE',
        },
        {
          id: 6,
          name: 'Modern Facade',
          image: 'Projects/f1(6).jpg',
          description: 'Contemporary facade treatment',
          category: 'INTERIORS',
        },
        {
          id: 7,
          name: 'Nursing Home',
          image: 'Projects/View nursing home TRIM copy7.jpg',
          description: 'Healthcare facility design',
          category: 'INSTITUTIONAL',
        },
        {
          id: 8,
          name: 'Yarpur View',
          image: 'Projects/yarpur_view (8).jpg',
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
      // Smooth scroll to the projects grid
      const projectsSection = document.querySelector('.container');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    },
    viewProjectDetails(project) {
      this.selectedProject = project;
      this.showModal = true;
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
</style>