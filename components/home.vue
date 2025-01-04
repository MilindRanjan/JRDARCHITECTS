<template>
  <div class="portfolio-content">
    <!-- Logo, Name, and Motto -->
    <section class="hero">
      <div class="logo-container">
        <img src="/logo.jpeg" alt="Company Logo" class="logo">
      </div>
      <div class="hero-text">
        <h1>Janaki Raman Designs</h1>
        <p class="motto">Where architecture meets purpose and innovation</p>
      </div>
    </section>
  
    <!-- About Us Section -->
    <section class="about-us">
      <p>
        Established in <strong>2000</strong>, Janaki Raman Designs has grown into a name synonymous with excellence in architectural design.
        With a legacy of crafting impactful spaces, we specialize in designing structures that blend functionality with aesthetic appeal.
      </p>
    </section>
  
    <!-- Achievements Timeline -->
    <section class="achievements">
      <h2>Achievements Timeline</h2>
      <div class="timeline-container">
        <div class="timeline-item" v-for="achievement in achievements" :key="achievement.year">
          <div class="timeline-content">
            <div class="timeline-date">{{ achievement.year }}</div>
            <div class="timeline-body">
              <h3>{{ achievement.title }}</h3>
              <p>{{ achievement.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      achievements: [
        { year: "2001", title: "Commercial Complex", description: "Designed for Zila Parishad, Begusarai, Bihar." },
        { year: "2004", title: "Vishwesaraiya Institute", description: "Conceptualized the Institute of Sanitation & Water Academy, Ranchi, Jharkhand." },
        { year: "2006", title: "City Bus Terminus", description: "Transformed transit experience in Munger, Bihar." },
        { year: "2008", title: "Seevusagar Ramgulam Statue", description: "First Prize in the Government of Bihar Design Competition." },
        { year: "2010", title: "Shri Krishna Nagar Housing", description: "First Prize in Housing Design Competition." },
        { year: "2012", title: "Bihar State Guest House", description: "First Prize in Design Competition." },
      ]
    };
  },
  mounted() {
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.2 });

    // Observe all timeline items
    const items = this.$el.querySelectorAll(".timeline-item");
    items.forEach((item) => observer.observe(item));
  },
};
</script>

<style scoped>
.portfolio-content {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.hero {
  display: flex;
  align-items: center;
  height: 50vh;
  margin-bottom: 40px;
}

.logo-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  max-width: 200px;
  width: 100%;
}

.hero-text {
  flex: 2;
  text-align: left;
}

.hero-text h1 {
  font-size: 48px;
  margin: 0;
  color: #333;
}

.hero-text .motto {
  font-size: 24px;
  color: #666;
  margin-top: 10px;
}

.about-us p {
  font-size: 22px;
  line-height: 1.6;
  color: #555;
  margin-bottom: 20px;
}

.achievements {
  padding: 60px 0;
  background-color: #fafafa;
}

.achievements h2 {
  text-align: center;
  margin-bottom: 50px;
  font-size: 2.5rem;
  color: #333;
  position: relative;
}

.achievements h2:after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: #333;
}

.timeline-container {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  padding: 20px 0;
}

.timeline-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background-color: #ddd;
}

.timeline-item {
  margin-bottom: 60px;
  position: relative;
  width: 100%;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.timeline-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.timeline-item:nth-child(odd) .timeline-content {
  margin-left: 50%;
  padding-left: 40px;
}

.timeline-item:nth-child(even) .timeline-content {
  margin-right: 50%;
  padding-right: 40px;
  text-align: right;
}

.timeline-content {
  position: relative;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.timeline-content:hover {
  transform: translateY(-5px);
}

.timeline-date {
  display: inline-block;
  padding: 8px 16px;
  background: #333;
  color: #fff;
  font-weight: bold;
  border-radius: 3px;
  margin-bottom: 15px;
}

.timeline-body h3 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1.2rem;
}

.timeline-body p {
  margin: 0;
  color: #666;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .hero {
    display: flex;
    flex-direction: column; /* Stack logo and text vertically */
    align-items: center; /* Center align all content */
    justify-content: center; /* Vertically center content */
    padding: 20px; /* Add some padding for spacing */
    text-align: center; /* Center text alignment */
    background-color: #f9f9f9; /* Soft background color for better contrast */
  }

  .logo-container img {
    margin-top: 40px;
    max-width: 80%; /* Scale down the logo for smaller screens */
    height: auto; /* Maintain aspect ratio */
    margin-bottom: 20px; /* Space below the logo */
  }

  .hero-text h1 {
    text-align: center;
    font-size: 24px; /* Slightly smaller heading */
    font-weight: bold; /* Emphasize the title */
    margin: 10px 0; /* Add margin for spacing */
    color: #333; /* Dark text for better readability */
  }

  .hero-text .motto {
    text-align: center;
    font-size: 16px; /* Reduce font size for the motto */
    color: #555; /* Softer tone for the motto */
    margin: 0; /* Align text properly */
    line-height: 1.4; /* Improve readability */
  }

  .timeline-container::before {
    left: 30px;
  }

  .timeline-item::before {
    left: 20px;
  }

  .timeline-item:nth-child(odd) .timeline-content,
  .timeline-item:nth-child(even) .timeline-content {
    margin: 0 0 0 70px;
    padding: 20px;
    text-align: left;
  }
}
</style>