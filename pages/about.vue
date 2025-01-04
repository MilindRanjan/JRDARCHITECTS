<!-- components/AboutUs.vue -->
<template>
  <div>
    <Header />
    <div class="max-w-6xl mx-auto px-4 py-16 bg-white">
      <h1 class="text-4xl font-bold text-center mb-16 text-gray-900 mt-12">Our Team</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div 
          v-for="member in teamMembers" 
          :key="member.id"
          class="group relative bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          <div class="aspect-w-3 aspect-h-4 mb-6">
            <img
              :src="member.image"
              :alt="member.name"
              class="w-full h-64 object-cover rounded-t-lg grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ member.name }}</h2>
            <p class="text-lg font-medium text-gray-700 mb-4">{{ member.role }}</p>
            <p class="text-gray-600 mb-6">{{ member.shortDescription }}</p>

            <button
              v-if="member.education.length > 0"
              @click="toggleMember(member.id)"
              class="flex items-center justify-between w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              <span class="font-medium text-gray-900">View Full Profile</span>
              <Icon
                name="heroicons:chevron-down"
                class="w-5 h-5 transform transition-transform duration-200"
                :class="{ 'rotate-180': expandedMembers.includes(member.id) }"
              />
            </button>

            <Transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="transform -translate-y-4 opacity-0"
              enter-to-class="transform translate-y-0 opacity-100"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="transform translate-y-0 opacity-100"
              leave-to-class="transform -translate-y-4 opacity-0"
            >
              <div v-if="expandedMembers.includes(member.id)" class="mt-6 space-y-6">
                <div v-if="member.education.length">
                  <h3 class="text-xl font-bold text-gray-900 mb-4">Education</h3>
                  <ul class="space-y-2">
                    <li 
                      v-for="(edu, index) in member.education" 
                      :key="index"
                      class="text-gray-700"
                    >
                      <span class="font-medium">{{ edu.year }}</span> - {{ edu.degree }}
                    </li>
                  </ul>
                </div>

                <div v-if="member.experience.length" class="experience-section">
                  <h3 class="text-xl font-bold text-gray-900 mb-4">Professional Experience</h3>
                  <div class="spiral-timeline">
                    <div 
                      v-for="(exp, index) in member.experience" 
                      :key="index"
                      class="timeline-item"
                      :class="{ 'active': activeExperience === index }"
                      @mouseenter="activeExperience = index"
                      @mouseleave="activeExperience = null"
                    >
                      <div class="timeline-content">
                        <div class="timeline-header">
                          <h4 class="company-name">{{ exp.company }}</h4>
                          <span class="period">{{ exp.period }}</span>
                        </div>
                        <div class="role">{{ exp.role }}</div>
                        <div class="projects-container" :class="{ 'show': activeExperience === index }">
                          <h5 class="projects-title">Key Projects:</h5>
                          <ul class="projects-list">
                            <li 
                              v-for="(project, idx) in exp.projects" 
                              :key="idx"
                              class="project-item"
                            >
                              {{ project }}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from '~/components/Header.vue';

const expandedMembers = ref([]);
const activeExperience = ref(null);

// Team members data remains the same as in your original code
const teamMembers = ref([
  {
    id: 1,
    name: 'Dr. Venkatesh Raman',
    role: 'Founder & Architect',
    image: '/venk.jpeg',
    shortDescription: 'Principal Architect with over 20 years of experience in architectural design, specializing in residential and commercial projects.',
    education: [
      { year: '1991', degree: 'Bachelor of Architecture' },
      { year: '2015', degree: 'Master in Urban & Regional Planning' },
      { year: '2022', degree: 'PhD' }
    ],
    experience: [
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
        projects: [
          'Jaypee Palace Hotel & Convention Centre, Agra'
        ]
      },
      {
        company: 'Design-O-Group',
        period: '1991-1992',
        role: 'Architect',
        projects: [
          'Commercial Complex, Agra'
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Varadraj',
    role: 'Co-Founder & Interior Designer',
    image: '/varad.jpeg',
    shortDescription: 'Creative interior designer with expertise in transforming spaces into beautifully functional environments.',
    education: [
      { year: '2023', degree: 'Bachelor of Architecture' }
    ],
    experience: [
      {
        company: 'Sangath Vastushilpa Consultants',
        period: '2023-2024',
        role: 'Architect',
        projects: [
          'Shiv Nadar School Chennai',
          'Anant National University, Ahmedabad',
          'Banaras Hindu University, Varanasi (Girls Hostel)'
        ]
      },
      {
        company: 'Arcop Associates',
        period: '2022',
        role: 'Intern',
        projects: [
          'DLF Independent Floors, Gurugram',
          'Airtel Bharti, Aerocity, Delhi'
        ]
      }
    ]
  }
]);
const toggleMember = (id) => {
  if (expandedMembers.value.includes(id)) {
    expandedMembers.value = expandedMembers.value.filter(memberId => memberId !== id);
  } else {
    expandedMembers.value.push(id);
  }
};
</script>

<style scoped>
.aspect-w-3 {
  position: relative;
  padding-bottom: calc(4 / 3 * 100%);
}

.aspect-w-3 > img {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  object-fit: cover;
  object-position: center;
}

.experience-section {
  position: relative;
  padding: 2rem 0;
}

.spiral-timeline {
  position: relative;
  padding-left: 2rem;
}

.spiral-timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, transparent, #000, transparent);
}

.timeline-item {
  position: relative;
  padding: 1.5rem 0;
  margin-left: 1.5rem;
  transition: all 0.3s ease;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -2.5rem;
  top: 50%;
  width: 1rem;
  height: 1rem;
  background: #fff;
  border: 2px solid #000;
  border-radius: 50%;
  transform: translateY(-50%) scale(0.8);
  transition: all 0.3s ease;
}

.timeline-item.active::before {
  transform: translateY(-50%) scale(1.2);
  background: #000;
}

.timeline-content {
  background: #f8f8f8;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transform: translateX(0);
  transition: all 0.3s ease;
}

.timeline-item.active .timeline-content {
  transform: translateX(0.5rem);
  background: #f3f4f6;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.company-name {
  font-weight: bold;
  color: #1a1a1a;
  font-size: 1.1rem;
}

.period {
  color: #666;
  font-size: 0.9rem;
}

.role {
  color: #4a5568;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.projects-container {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s ease;
}

.projects-container.show {
  opacity: 1;
  max-height: 500px;
}

.projects-title {
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.projects-list {
  list-style: none;
  padding: 0;
}

.project-item {
  padding: 0.5rem 0;
  font-size: 0.95rem;
  color: #4a5568;
  position: relative;
  padding-left: 1rem;
}

.project-item::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #000;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.timeline-item {
  animation: fadeIn 0.5s ease forwards;
  animation-delay: calc(var(--index) * 0.1s);
}
</style>