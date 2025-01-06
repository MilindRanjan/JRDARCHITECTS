<template>
  <header :class="{ 'mobile-open': isMenuOpen }">
    <!-- Logo and hamburger sections -->
    <div class="logo-container">
  <nuxt-link to="/" aria-label="Go to Home">
    <img src="/logo.jpeg" alt="Company Logo" class="logo" />
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
        <li v-for="(item, index) in menuItems" 
            :key="index"
            :class="{ 'has-dropdown': item.hasDropdown }"
            @mouseenter="handleMouseEnter(index)"
            @mouseleave="handleMouseLeave"
        >
          <nuxt-link 
            :to="item.path"
            @click="item.hasDropdown && isMobile ? toggleDropdown(index) : closeMenu"
            :class="{ 'active': $route.path === item.path }"
          >
            {{ item.name }}
            <span v-if="item.hasDropdown" class="dropdown-arrow">
              <svg 
                width="10" 
                height="6" 
                viewBox="0 0 10 6" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                :class="{ 'rotated': activeDropdown === index || hoveredIndex === index }"
              >
                <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </nuxt-link>
          <!-- Dropdown for Projects -->
          <transition name="fade">
            <ul v-show="item.hasDropdown && (activeDropdown === index || hoveredIndex === index)" 
                class="dropdown"
                :class="{ 'dropdown-mobile': isMobile }"
            >
              <li 
                v-for="category in defaultCategories" 
                :key="category"
                @click.stop="filterCategory(category)"
                class="dropdown-item"
              >
                {{ category }}
              </li>
            </ul>
          </transition>
        </li>
      </ul>
    </nav>

    <div 
      v-if="isMenuOpen" 
      class="mobile-overlay"
      @click="closeMenu"
    ></div>
  </header>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  
  data() {
    return {
      isMenuOpen: false,
      activeDropdown: null,
      hoveredIndex: null,
      isMobile: false,
      defaultCategories: ['All', 'RESIDENTIAL', 'COMMERCIAL', 'INSTITUTIONAL', 'INTERIORS', 'LANDSCAPE'], // Updated categories
      menuItems: [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects', hasDropdown: true },
        { name: 'About Us', path: '/about' },
        { name: 'Contact Me', path: '/contact' }
      ]
    };
  },
  
  watch: {
    categories: {
      handler(newCategories) {
        if (newCategories.length > 0) {
          this.defaultCategories = newCategories;
        }
      },
      immediate: true
    }
  },

  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    },
    
    closeMenu() {
      this.isMenuOpen = false;
      this.activeDropdown = null;
      document.body.style.overflow = '';
    },
    
    toggleDropdown(index) {
      if (this.isMobile) {
        this.activeDropdown = this.activeDropdown === index ? null : index;
      }
    },

    handleMouseEnter(index) {
      if (!this.isMobile) {
        this.hoveredIndex = index;
      }
    },

    handleMouseLeave() {
      if (!this.isMobile) {
        this.hoveredIndex = null;
      }
    },
    filterCategory(category) {
  this.$emit('filter-category', category);
  this.closeMenu();

  // Navigate to the projects page and pass the selected category
  this.$router.push({ path: '/projects', query: { category } });
},

    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    }
  },

  mounted() {
    this.checkMobile();
    
    window.addEventListener('resize', () => {
      this.checkMobile();
      if (!this.isMobile && this.isMenuOpen) {
        this.closeMenu();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMenu();
        this.hoveredIndex = null;
        this.activeDropdown = null;
      }
    });
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile);
    window.removeEventListener('keydown', this.closeMenu);
    document.body.style.overflow = '';
  }
};
</script>

<style scoped>
/* Updated Dropdown Styling */
.dropdown-arrow {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
  transition: transform 0.2s ease;
}

.dropdown-arrow svg {
  transition: transform 0.2s ease;
}

.dropdown-arrow svg.rotated {
  transform: rotate(180deg);
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px; /* Maintain rounded corners */
  list-style: none;
  padding: 0; /* Remove padding around the dropdown */
  margin: 0; /* Ensure no margin around the dropdown */
  min-width: 150px; /* Minimum width for dropdown */
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.dropdown-item {
  display: block;
  width: 100%; /* Ensure full width */
  padding: 8px 12px; /* Padding for each item */
  text-align: left;
  font-size: 14px; /* Font size */
  color: #333333;
  cursor: pointer;
  transition: background-color 0.2s ease; /* Smooth background color transition */
  border-bottom: 1px solid #eee; /* Divider between items */
  box-sizing: border-box; /* Include padding in width */
}

.dropdown-item:last-child {
  border-bottom: none; /* Remove border for the last item */
}

.dropdown-item:hover {
  background-color: #f8f9fa; /* Hover color */
  color: #000; /* Text color on hover */
  padding-left: 12px; /* Add padding to the left for hover effect */
}

/* Ensure the dropdown items align properly */
.dropdown {
  left: 0; /* Align to the left */
  right: auto; /* Prevent overflow */
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px); /* Slightly reduced translation */
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
  pointer-events: auto; /* Ensure header pointer-events aren't causing issues */
}

.logo-container {
  flex-grow: 0; /* Prevent it from growing */
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 50px; /* Match the logo height */
  max-width: 50px; /* Add a fixed width */
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
  .dropdown {
    position: static;
    transform: none;
    box-shadow: none;
    margin-top: 0;
    background: #f8f9fa;
    border-radius: 0;
    width: 100%;
  }

  .dropdown::before {
    display: none;
  }

  .dropdown-item {
    padding: 15px 30px;
    text-align: center;
    border-bottom: 1px solid #eee;
  }

  .dropdown-item:last-child {
    border-bottom: none;
  }
}
</style>