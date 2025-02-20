<template>
  <header :class="{ 'mobile-open': isMenuOpen }">
    <!-- Logo and hamburger sections -->
    <div class="logo-container">
        <nuxt-link to="/" aria-label="Go to Home">
          <img src="/logo.jpeg" alt="Company Logo" class="logo" />
        </nuxt-link>
      </div>

    <button
        class="md:hidden w-8 h-8 flex flex-col justify-center items-center"
        @click="toggleMenu"
        aria-label="Toggle Menu"
      >
        <span class="block w-6 h-0.5 bg-black mb-1.5"></span>
        <span class="block w-6 h-0.5 bg-black mb-1.5"></span>
        <span class="block w-6 h-0.5 bg-black"></span>
      </button>

    <nav :class="{ 'nav-open': isMenuOpen }">
      <ul>
        <li
          v-for="(item, index) in menuItems"
          :key="index"
          :class="{ 'has-dropdown': item.hasDropdown }"
          @mouseenter="handleMouseEnter(index)"
          @mouseleave="handleMouseLeave"
        >
          <nuxt-link
            :to="item.path"
            @click="item.hasDropdown && isMobile ? toggleDropdown(index) : closeMenu"
            :class="{ active: $route.path === item.path }"
          >
            {{ item.name }}
            <span v-if="item.hasDropdown" class="dropdown-arrow">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                :class="{ rotated: activeDropdown === index || hoveredIndex === index }"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </nuxt-link>
          <!-- Dropdown for Projects -->
          <transition name="fade">
            <ul
              v-show="item.hasDropdown && (activeDropdown === index || hoveredIndex === index)"
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

    <div v-if="isMenuOpen" class="mobile-overlay" @click="closeMenu"></div>
  </header>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      isMenuOpen: false,
      activeDropdown: null,
      hoveredIndex: null,
      isMobile: false,
      defaultCategories: [
        'All',
        'HOUSING',
        'COMMERCIAL',
        'INSTITUTIONAL',
        'LANDSCAPE',
        'LIASONING',
        'NURSING HOME',
      ],
      menuItems: [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects', hasDropdown: true },
        { name: 'About', path: '/about' },
      ],
    };
  },

  watch: {
    categories: {
      handler(newCategories) {
        if (newCategories.length > 0) {
          this.defaultCategories = newCategories;
        }
      },
      immediate: true,
    },
  },

  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
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
      this.$router.push({ path: '/projects', query: { category } });
    },

    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
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
  },
};
</script>

<style scoped>
/* General Styles */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 2rem;
  background: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 80px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.logo-container {
  flex-grow: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: auto;
  position: relative;
  overflow: visible;
}

.logo {
  height: 60px;
  width: auto;
  object-fit: contain;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
  gap: 2rem;
}

nav li {
  margin: 0;
  position: relative;
}

nav a {
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  color: #000000;
  transition: all 0.3s ease;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  letter-spacing: 0.3px;
}

nav a:hover,
nav a.active {
  color: #000000;
  background-color: rgba(0, 0, 0, 0.05);
}

nav li::after {
  content: '';
  display: block;
  width: 0;
  height: 2px;
  background: #000000;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
}

nav li:hover::after,
nav a.active + li::after {
  width: 70%;
}

/* Dropdown Styles */
.dropdown-arrow {
  display: inline-flex;
  align-items: center;
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
}

.dropdown-arrow svg {
  transition: transform 0.3s ease;
  stroke-width: 2px;
  stroke: #000000;
}

.dropdown-arrow svg.rotated {
  transform: rotate(180deg);
}

.dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 50%;
  transform: translateX(-50%) translateY(-10px);
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  list-style: none;
  padding: 0.5rem;
  margin: 0;
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

nav li:hover .dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.dropdown-item {
  display: block;
  padding: 0.75rem 1rem;
  color: #333;
  font-size: 0.9rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  text-align: left;
  white-space: nowrap;
}

.dropdown-item:hover {
  background: rgba(0, 0, 0, 0.03);
  color: #000;
  transform: translateX(4px);
}

.dropdown-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 2px;
  background: linear-gradient(to bottom, #000, #333);
  transform: scaleY(0);
  transition: transform 0.2s ease;
}

.dropdown-item:hover::before {
  transform: scaleY(1);
}

/* Mobile Dropdown Styles */
@media (max-width: 768px) {
  .dropdown {
    position: static;
    box-shadow: none;
    padding: 0;
    margin-top: 0.5rem;
    margin-left: 1rem;
    opacity: 1;
    visibility: visible;
    transform: none;
    background: transparent;
    min-width: auto;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .dropdown-item {
    padding: 0.75rem 1rem;
    border-left: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 0;
    font-size: 1rem;
    text-align: left;
  }

  .logo-container {
    height: 50px;
  }

  .logo {
    height: 50px;
  }
}

/* Fade transition for dropdown */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-10px);
}

/* Mobile Styles */
@media (max-width: 768px) {
  header {
    padding: 1rem 1.5rem;
  }

  nav {
    position: fixed;
    top: 80px;
    left: 100%;
    width: 100%;
    height: calc(100vh - 80px);
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
    padding: 1.5rem;
  }

  nav.nav-open {
    transform: translateX(-100%);
  }

  nav ul {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  nav li {
    width: 100%;
    text-align: center;
  }

  nav a {
    font-size: 1.125rem;
    padding: 1rem;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.03);
    border-radius: 8px;
  }

  .dropdown {
    position: static;
    transform: none;
    box-shadow: none;
    background: transparent;
    width: 100%;
    margin-top: 0.5rem;
    padding: 0;
  }

  .dropdown-mobile {
    position: relative;
    left: 0;
    transform: none;
    width: 100%;
    margin-top: 1rem;
    background: rgba(0, 0, 0, 0.02);
    border-radius: 8px;
  }

  .dropdown-item {
    text-align: center;
    background-color: white;
    margin: 0.5rem;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .dropdown-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .mobile-overlay {
    position: fixed;
    top: 80px;
    left: 0;
    width: 100%;
    height: calc(100vh - 80px);
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
  }

  .mobile-overlay.show {
    opacity: 1;
    visibility: visible;
  }

  /* Hamburger Button Styles */
  button {
    padding: 0.5rem;
    border-radius: 8px;
    transition: background-color 0.2s ease;
  }

  button:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  button span {
    transition: all 0.3s ease;
    background-color: #000000;
  }

  .mobile-open button span:first-child {
    transform: translateY(6px) rotate(45deg);
  }

  .mobile-open button span:nth-child(2) {
    opacity: 0;
  }

  .mobile-open button span:last-child {
    transform: translateY(-6px) rotate(-45deg);
  }
}
</style>