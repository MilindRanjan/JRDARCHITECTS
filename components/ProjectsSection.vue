<template>
  <section class="projects-section">
    <h1 class="projects-heading text-center">Our Projects</h1>
    
    <div class="gallery-container">
      <div
        v-for="(project, index) in projects"
        :key="project.id"
        :class="['project-item', `item-${index + 1}`]"
        @click="openModal(project)"
      >
        <div class="image-wrapper">
          <div v-if="!project.mainImage" class="image-placeholder">
            <span>{{ project.name }}</span>
          </div>
          
          <img
            :src="project.mainImage"
            :alt="project.name"
            class="project-image"
            @error="handleImageError(project)"
          />
        </div>
        <div class="project-overlay">
          <h3 class="project-title">{{ project.name }}</h3>
          <p class="project-description">{{ project.description }}</p>
        </div>
      </div>
    </div>

    <!-- Project Modal -->
    <ProjectModal 
    :project="selectedProject"
    :show="showModal"
    @close="showModal = false"

    />
  </section>
</template>

<script setup>
import { ref } from 'vue';
import ProjectModal from '@/components/ProjectModal.vue'; // Adjust the path as needed

const selectedProject = ref(null);

// Updated projects with proper image paths
const projects = ref([
  {
    id: 1,
    name: 'South Elevation',
    mainImage: 'Projects/south elevation1.jpg',
    additionalImages: [
      'Projects/south elevation1.jpg',
      'Projects/south elevation1.jpg'
    ],
    description: 'Contemporary architectural design with sustainable elements',
    category: 'COMMERCIAL',
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
  }
]);


const handleImageError = (project) => {
  project.mainImage = ''; // Clear image if it fails to load
  console.error(`Failed to load image for ${project.name}`);
};

const openModal = (project) => {
  // Combine main image with additional images for the modal view
  selectedProject.value = {
    ...project,
    images: [project.mainImage, ...(project.additionalImages || [])].filter(Boolean)
  };
  showModal.value = true;
  document.body.style.overflow = 'hidden';
};

const showModal = ref(false);

const closeModal = () => {
  selectedProject.value = null; // Hide modal
  showModal.value = false; // Hide modal
  document.body.style.overflow = ''; // Re-enable background scrolling
};

</script>

<style scoped>
.projects-section {
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  padding: 2rem;

}

.projects-heading {
  text-align: center;
  margin-bottom: 5rem;
  font-size: 2.5rem;
  font-weight: normal;
  color: #1a1a1a;
  letter-spacing: -0.5px;
}

.gallery-container {
  position: relative;
  width: 100%;
  margin: 0 auto;
  /* Remove fixed height to allow content to dictate height */
  height: 1200px; /* Change to auto to remove extra space */
  padding-bottom: 0; /* Ensure no padding is added at the bottom */
}


.project-item {
  position: absolute;
  overflow: hidden;
  border-radius: 4px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  background-color: #f5f5f5;
  height: auto; /* Keep height auto to fit content */
}

.project-image {
  width: 100%;
  height: 100%; /* Ensure the image takes full height of the parent */
  object-fit: cover; /* Maintain aspect ratio */
  display: block; /* Remove inline space */
}

/* Adjust padding of the overlay */
.project-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem; /* Ensure padding does not push content out */
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Adjust hover effects */
.project-item:hover .project-overlay {
  transform: translateY(0);
}

.project-title {
  color: white;
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.project-description {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  line-height: 1.4;
}

/* Hover effects */
.project-item:hover {
  transform: scale(1.02);
  z-index: 10;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Exact positioning for each item */
.item-1 {
  top: 60px;
  left: 6.5%;
  width: 25%;
  height: fit-content;
}

.item-2 {
  top: -40px;
  left: 33%;
  width: 32%;
  height: fit-content;
  background-size: cover;
}

.item-3 {
  top: 30px;
  right: 11.5%;
  width: 22%;
  height: fit-content;
}

.item-4 {
  top: 320px;
  left: 3.5%;
  width: 20%;
  height: fit-content;
}

.item-5 {
  top: 310px;
  left: 25%;
  width: 50%;
  height: fit-content;
}

.item-6 {
  top: 320px;
  right: 3.5%;
  width: 20%;
  height: fit-content;
}

.item-7 {
  bottom: 370px;
  left: 20%;
  width: 32%;
  height: fit-content;
}

.item-8 {
  bottom: 430px;
  right: 27%;
  width: 20%;
  height: fit-content;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  max-width: 800px;
  max-height: 90%;
  overflow-y: auto;
  position: relative;
  padding: 1rem;
}

.modal-close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
}

.modal-image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.modal-image {
  max-width: 100%;
  max-height: 400px;
  object-fit: cover;
}

.modal-info {
  padding: 1rem;
}

.modal-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.modal-description {
  margin-bottom: 0.5rem;
}

.modal-details {
  font-size: 0.875rem;
}
/* For Mobile View */
@media screen and (max-width: 768px) {
  .projects-section {
    position: relative;
    padding: 1.5rem 0; /* Space around the section */
    overflow: hidden; /* Prevent content spillover */
  }
  .projects-heading{
    margin-bottom: 2rem;
  }

  .gallery-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Two columns for grid layout */
    gap: 1rem; /* Space between items */
    padding: 0 1rem; /* Padding for spacing within the container */
    height: auto; /* Adjust height based on content */
  }

  .project-item {
    position: relative; /* Allow dynamic positioning */
    width: 100%; /* Adjust item width for grid layout */
    height: auto; /* Ensure it resizes to fit content */
    margin-bottom: 1rem; /* Add spacing between rows */
  }

  .project-image {
    width: 100%; /* Make the image responsive */
    height: auto; /* Maintain aspect ratio */
    object-fit: cover; /* Ensure image fits nicely */
  }

  /* Remove individual item styles for mobile */
  .item-1,
  .item-2,
  .item-3,
  .item-4,
  .item-5,
  .item-6,
  .item-7,
  .item-8 {
    top: auto;
    left: auto;
    right: auto;
    bottom: auto;
  }

  /* Overlay adjustments */
  .project-overlay {
    display: none; /* Hide overlay in mobile */
  }
  .other-section {
  margin-bottom: 20rem; /* Space below the section */
  }
}
</style>