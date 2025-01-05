<template>
    <footer class="footer">
        <p>&copy; {{ currentYear }} JRD Architects. All rights reserved.</p>
    </footer>
  </template>
  
  <script>
  export default {
    name: "Footer",
    computed: {
      currentYear() {
        return new Date().getFullYear();
      }
    }
  };
  </script>
  
  <style scoped>
  .footer {
    background: #1a1a1a;
    color: #f8f9fa;
    padding: 1rem 2rem 1rem;
    text-align: center;
  }
  </style>