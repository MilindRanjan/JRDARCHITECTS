<template>
    <div>
      <h1 class="section-title">
      <span class="title-text">Prizes</span>
      <span class="title-line"></span>
    </h1>
      <div class="prizes-container">
        <div class="prizes-section">
          <div v-for="(prize, index) in prizes" 
               :key="index" 
               class="prize-item" 
               @click="openModal(index)"
               :class="{ 'prize-hover': hover === index }"
               @mouseenter="hover = index" 
               @mouseleave="hover = null">
            <div class="trophy-wrapper">
              <img src="/cup.svg" :alt="prize.title" class="trophy-icon">
            </div>
            <div class="year-label">{{ prize.year }}</div>
            <p class="prize-description">{{ prize.description }}</p>
          </div>
        </div>
      </div>
  
      <!-- Certificate Modal -->
      <div v-if="selectedPrize !== null" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="close-button" @click="closeModal">&times;</button>
          <h2>{{ prizes[selectedPrize].description }}</h2>
          <div class="certificate-content">
            <img :src="prizes[selectedPrize].certificateImage" alt="Certificate" class="certificate-image">
            <div class="certificate-details">
              <p><strong>Awarded:</strong> {{ prizes[selectedPrize].year }}</p>
              <p><strong>Project:</strong> {{ prizes[selectedPrize].description }}</p>
              <p><strong>Recognition:</strong> {{ prizes[selectedPrize].recognition }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        hover: null,
        selectedPrize: null,
        prizes: [
          {
            year: "In 2010",
            description: "Bihar state guest house",
            recognition: "Excellence in Architectural Design",
            certificateImage: "/certificate.webp"
          },
          {
            year: "In 2015",
            description: "Seevusagur Ramgulam Chowk",
            recognition: "Outstanding Urban Development",
            certificateImage: "/certificate.webp"
          },
          {
            year: "In 2019",
            description: "Shri Krishna Nagar Apartment Competition",
            recognition: "Best Residential Complex Design",
            certificateImage: "/certificate.webp"
          }
        ]
      }
    },
    methods: {
      openModal(index) {
        this.selectedPrize = index;
        document.body.style.overflow = 'hidden';
      },
      closeModal() {
        this.selectedPrize = null;
        document.body.style.overflow = 'auto';
      }
    }
  }
  </script>
  
  <style scoped>
.section-title {
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
  
  .prizes-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    justify-content: center;
    padding: 2rem;
    background: linear-gradient(to bottom, #f8f9fa, #ffffff);
  }
  
  .prizes-section {
    display: flex;
    justify-content: center;
    gap: 4rem;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .prize-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 300px;
    padding: 2rem;
    border-radius: 12px;
    transition: all 0.3s ease;
    background: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    user-select: none;
  }
  
  .prize-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
  
  .trophy-wrapper {
    position: relative;
    margin-bottom: 1.5rem;
  }
  
  .trophy-icon {
    width: 120px;
    height: 120px;
    margin-bottom: 1rem;
    transition: transform 0.3s ease;
  }
  
  .prize-hover .trophy-icon {
    transform: scale(1.05);
  }
  
  .year-label {
    font-size: 1.2rem;
    color: #2d3748;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  .prize-description {
    font-size: 1.1rem;
    color: #4a5568;
    line-height: 1.4;
    margin: 0;
    font-weight: 500;
  }
  
  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    animation: fadeIn 0.3s ease forwards;
  }
  
  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    max-width: 800px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    transform: translateY(20px);
    opacity: 0;
    animation: slideUp 0.3s ease forwards;
  }
  
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
  
  @keyframes slideUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #4a5568;
    padding: 0.5rem;
    line-height: 1;
    transition: transform 0.2s ease;
  }
  
  .close-button:hover {
    transform: scale(1.1);
  }
  
  .certificate-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 1rem;
  }
  
  .certificate-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .certificate-details {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
  }
  
  .certificate-details p {
    margin: 0.5rem 0;
    color: #4a5568;
  }
  @media (max-width: 768px) {
  /* Add space between sections */
  .section-title{
    margin-bottom: auto;
    margin-top: auto;
  }
  .prizes-container {
    margin-top: 2.5rem; /* Ensure sufficient spacing from the previous section */
    padding: 1.5rem;
  }

  /* Adjust modal content for smaller screens */
  .modal-content {
    width: 95%; /* Fit within mobile screen */
    max-height: 80vh; /* Prevent it from being too tall */
    padding: 1rem; /* Reduce padding for better fit */
    overflow-y: auto; /* Allow scrolling if content overflows */
  }

  /* Adjust prize items layout for smaller screens */
  .prizes-section {
    gap: 2rem;
  }

  .prize-item {
    width: 100%; /* Stretch items to fit screen width */
    max-width: 280px; /* Ensure reasonable size */
  }

  /* Ensure the modal overlay covers the entire screen */
  .modal-overlay {
    z-index: 1000;
  }
}
  </style>