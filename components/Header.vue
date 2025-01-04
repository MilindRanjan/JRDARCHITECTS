<template>
  <header :class="{ 'mobile-open': isMenuOpen }">
    <div class="logo-container">
      <nuxt-link to="/" aria-label="Go to Home">
        <img src="/logo.jpeg" alt="Company Logo" class="logo">
      </nuxt-link>
    </div>
    
    <button 
      class="hamburger" 
      @click="toggleMenu" 
      :aria-expanded="isMenuOpen" 
      aria-label="Toggle navigation menu"
    >
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>

    <nav :class="{ 'nav-open': isMenuOpen }">
      <ul>
        <li v-for="(item, index) in menuItems" :key="index">
          <nuxt-link 
            :to="item.path"
            @click="item.hasDropdown ? toggleDropdown(index) : closeMenu"
            :class="{ 'active': $route.path === item.path }"
          >
            {{ item.name }}
          </nuxt-link>
          <!-- Dropdown for Projects -->
          <ul v-if="item.hasDropdown && activeDropdown === index" class="dropdown">
            <li 
              v-for="category in categories" 
              :key="category"
              @click.stop="filterCategory(category)"
            >
              {{ category }}
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <!-- Overlay for mobile menu -->
    <div 
      v-if="isMenuOpen" 
      class="mobile-overlay"
      @click="closeMenu"
    ></div>
  </header>
</template>

<script>
export default {
  props: ['categories'], // Pass categories as a prop from parent
  data() {
    return {
      isMenuOpen: false,
      activeDropdown: null, // Track the active dropdown index
      menuItems: [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects', hasDropdown: true },
        { name: 'About Us', path: '/about' },
        { name: 'Contact Me', path: '/contact' }
      ]
    };
  },
  
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    },
    
    closeMenu() {
      this.isMenuOpen = false;
      document.body.style.overflow = '';
    },
    
    toggleDropdown(index) {
      this.activeDropdown = this.activeDropdown === index ? null : index;
    },

    filterCategory(category) {
      this.$emit('filter-category', category); // Emit selected category to parent
      this.closeMenu(); // Close the dropdown after selection
      this.activeDropdown = null; // Close the dropdown after selection
    }
  },

  mounted() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isMenuOpen) {
        this.closeMenu();
      }
    });
  },

  beforeDestroy() {
    window.removeEventListener('keydown', this.closeMenu);
    window.removeEventListener('resize', this.closeMenu);
    document.body.style.overflow = '';
  }
};
</script>

<style scoped>
.dropdown {
  position: absolute;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 10px 0;
  margin: 0;
  border-radius: 5px;
  z-index: 1000;
}

.dropdown li {
  padding: 10px 20px;
  cursor: pointer;
  white-space: nowrap;
}

.dropdown li:hover {
  background-color: #f0f0f0;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #ddd;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 70px;
}

.logo-container {
  flex-grow: 1;
}

.logo {
  height: 50px;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: flex-end;
  padding: 0;
  margin: 0;
}

nav li {
  margin: 0 15px;
  position: relative;
}

nav a {
  text-decoration: none;
  font-size: 16px;
  color: #000;
  transition: color 0.3s ease;
  padding: 5px 0;
  display: inline-block;
}

nav a:hover,
nav a.active {
  color: #555;
}

nav li::after {
  content: '';
  display: block;
  width: 0;
  height: 2px;
  background: #000;
  transition: width 0.3s ease;
  position: absolute;
  bottom: -5px;
  left: 0;
}

nav li:hover::after,
nav a.active + li::after {
  width: 100%;
}

.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1001;
}

.hamburger-line {
  display: block;
  width: 25px;
  height: 2px;
  background-color: #000;
  margin: 5px 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.mobile-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

@media (max-width: 768px) {
  .hamburger {
    display: block;
  }

  nav {
    position: fixed;
    top: 70px;
    left: 100%;
    width: 100%;
    height: calc(100vh - 70px);
    background: #fff;
    transition: transform 0.3s ease;
    z-index: 1000;
  }

  nav.nav-open {
    transform: translateX(-100%);
  }

  nav ul {
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
  }

  nav li {
    margin: 15px 0;
    width: 100%;
    text-align: center;
  }

  nav a {
    font-size: 18px;
    padding: 10px 20px;
    width: 100%;
    display: block;
  }

  .mobile-open .hamburger-line:first-child {
    transform: translateY(7px) rotate(45deg);
  }

  .mobile-open .hamburger-line:nth-child(2) {
    opacity: 0;
  }

  .mobile-open .hamburger-line:last-child {
    transform: translateY(-7px) rotate(-45deg);
  }

  .mobile-open .mobile-overlay {
    display: block;
  }
}
</style>