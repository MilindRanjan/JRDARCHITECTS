<template>
  <div>
    <Header 
      :categories="categories" 
      @filter-category="filterProjects"
    />
    
    <div class="filter-container mt-20">
      <button 
        v-for="category in categories" 
        :key="category" 
        :class="{ active: selectedCategory === category }"
        @click="filterProjects(category)"
      >
        {{ category }}
      </button>
    </div>
    
    <div class="projects-container">
      <div class="project-images">
        <div 
          v-for="project in filteredProjects" 
          :key="project.id" 
          class="project-item"
        >
          <img :src="project.image" :alt="project.name">
          <p>{{ project.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'; // Import your Header component

export default {
  components: {
    Header,
  },
  data() {
    return {
      selectedCategory: 'All',
      categories: ['All', 'RESIDENTIAL', 'COMMERCIAL', 'INSTITUTIONAL', 'INTERIORS', 'LANDSCAPE'],
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
      ],
    };
  },
  computed: {
    filteredProjects() {
      if (this.selectedCategory === 'All') {
        return this.projects;
      }
      return this.projects.filter((project) => project.category === this.selectedCategory);
    },
  },
  methods: {
    filterProjects(category) {
      this.selectedCategory = category;
    },
  },
};
</script>

<style>
.filter-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.filter-container button {
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #f0f0f0;
  color: #333;
  transition: background-color 0.3s ease;
}

.filter-container button.active {
  background-color: #007bff;
  color: white;
}

.projects-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.project-images {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.project-item {
  text-align: center;
}

.project-item img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.project-item:hover img {
  transform: scale(1.05);
}
</style>