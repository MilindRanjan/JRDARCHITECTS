<template>
    <div class="clients-section">
        <h1 class="title mb-20">Our Proud Clients</h1>

      <div class="clients-grid">
        <!-- First Row -->
        <div class="row first-row">
          <div v-for="(client, index) in firstRow" 
               :key="client.name" 
               class="client-item"
               :class="{ 'middle-item': index === 1 }">
            <div class="client-card">
              <img :src="client.logo" :alt="client.name" class="client-logo" />
              <h3 class="client-name">{{ client.name }}</h3>
            </div>
          </div>
        </div>
        
        <!-- Second Row -->
        <div class="row second-row">
          <div v-for="client in secondRow" 
               :key="client.name" 
               class="client-item">
            <div class="client-card">
              <img :src="client.logo" :alt="client.name" class="client-logo" />
              <h3 class="client-name">{{ client.name }}</h3>
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
        firstRow: [
          { name: 'Punjeb National Bank', logo: '/clients/pnb.svg' },
          { name: 'Government of Bihar', logo: '/clients/govtofbihar.png' },
          { name: 'Government of Jharkhand', logo: '/clients/govtofjhar.svg' },
        ],
        secondRow: [
          { name: 'UNICEF', logo: '/clients/unicef.png' },
          { name: 'Red Cross Society', logo: '/clients/rcs.svg' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .clients-section {
    padding: 6rem 2rem;
    background-color: #ffffff;
    position: relative;
    overflow: hidden;
  }

  .clients-section h1{
    text-align: center;
    font-size: 2.5rem;
    color: #333;
    position: relative;
    font-weight: normal;

  }
  
  .title {
    font-size: 2.5rem;
    font-weight: 600;
    margin-top: 0.5rem;
    text-align: center;
    color: #1a1a1a;
    letter-spacing: -0.5px;
  }
  
  .clients-grid {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .row {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-bottom: 3rem;
  }
  
  .first-row {
    margin-bottom: 4rem;
  }
  
  .client-item {
    flex: 0 1 300px;
    transition: transform 0.3s ease;
  }
  
  .client-card {
    background: #ffffff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 200px;
    justify-content: space-between;
  }
  
  .client-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12);
  }
  
  .client-logo {
    max-width: 180px;
    height: auto;
    max-height: 100px;
    object-fit: contain;
    filter: grayscale(100%);
    transition: filter 0.3s ease;
    margin-bottom: 1.5rem;
  }
  
  .client-card:hover .client-logo {
    filter: grayscale(0%);
  }
  
  .client-name {
    font-size: 1.1rem;
    color: #333;
    margin: 0;
    font-weight: 500;
    text-align: center;
  }
  
  .middle-item {
    transform: translateY(-20px);
  }
  
  /* Responsive Design */
  @media (max-width: 1024px) {
    .client-item {
      flex: 0 1 250px;
    }
    
    .row {
      gap: 2rem;
    }
  }
  
  @media (max-width: 768px) {
    .clients-section {
      padding: 4rem 1rem;
    }
  
    .row {
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }
  
    .client-item {
      width: 100%;
      max-width: 300px;
    }
  
    .middle-item {
      transform: none;
    }
  
    .first-row {
      margin-bottom: 2rem;
    }
  
    .title {
      font-size: 2rem;
      margin-top: 3rem;
    }
  }
  </style>