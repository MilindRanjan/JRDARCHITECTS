<template>
    <div class="modal-overlay">
      <div class="modal">
        <button class="close-button" @click="$emit('close')">X</button>
        <div class="modal-content">
          <h2>{{ project.name }}</h2>
          <img :src="project.image" :alt="project.name">
          <p>{{ project.description }}</p>
          <span class="badge">{{ project.category }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      project: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal {
    background: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 500px;
    width: 90%;
  }
  .close-button {
    float: right;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
  }
  .modal-content img {
    max-width: 100%;
    border-radius: 8px;
  }
  </style>