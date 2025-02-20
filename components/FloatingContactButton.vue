<template>
  <div>
    <!-- Floating Contact Button -->
    <button 
      @click="toggleContactForm" 
      class="fixed right-6 bottom-6 w-14 h-14 bg-black text-white rounded-full shadow-lg 
             hover:bg-gray-800 transition-all duration-300 flex items-center justify-center 
             group z-50"
    >
      <img 
        src="/icons/message-circle-icon.svg" 
        alt="Message Icon" 
        class="w-6 h-6 group-hover:scale-110 transition-transform duration-300" 
      />
    </button>

    <!-- Contact Form Modal -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="showContactForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white w-full max-w-md mx-4 rounded-lg shadow-xl">
          <!-- Form Header -->
          <div class="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900">Contact Us</h2>
            <button 
              @click="toggleContactForm"
              class="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <img 
                src="/icons/cross.svg" 
                alt="Close Icon" 
                class="w-5 h-5 text-gray-500" 
              />
            </button>
          </div>

          <!-- Form Content -->
          <form @submit.prevent="handleSubmit" class="p-4 space-y-4">
            <div class="relative">
              <img 
                src="/icons/user-icon.svg" 
                alt="User Icon" 
                class="absolute left-3 top-3 w-5 h-5 text-gray-400" 
              />
              <input
                v-model="formData.name"
                type="text"
                placeholder="Your Name"
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                       focus:ring-black focus:border-transparent outline-none transition-all duration-200"
                required
              />
            </div>
            <div class="relative">
              <img 
                src="/icons/account-icon.svg" 
                alt="Account Icon" 
                class="absolute left-3 top-3 w-5 h-5 text-gray-400" 
              />
              <input
                v-model="formData.email"
                type="email"
                placeholder="Your Email"
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                       focus:ring-black focus:border-transparent outline-none transition-all duration-200"
                required
              />
            </div>
            <div class="relative">
              <img 
                src="/icons/message-text-icon.svg" 
                alt="Message Text Icon" 
                class="absolute left-3 top-3 w-5 h-5 text-gray-400" 
              />
              <textarea
                v-model="formData.message"
                placeholder="Your Message"
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                       focus:ring-black focus:border-transparent outline-none transition-all duration-200 
                       min-h-[120px] resize-none"
                required
              />
            </div>
            <button
              type="submit"
              class="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 
                     transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <img 
                src="/icons/send-icon.svg" 
                alt="Send Icon" 
                class="w-5 h-5" 
              />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import emailjs from 'emailjs-com';

const showContactForm = ref(false);
const formData = reactive({
  name: '',
  email: '',
  message: '',
});

const toggleContactForm = () => {
  showContactForm.value = !showContactForm.value;
};

const handleSubmit = async () => {
  try {
    const serviceID = "service_1v20ook";
    const templateID = "template_xmavmga";
    const userID = "FrrVOmajsxXNPXg3a";

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    await emailjs.send(serviceID, templateID, templateParams, userID);
    alert("Message sent successfully!");
    formData.name = '';
    formData.email = '';
    formData.message = '';
    toggleContactForm();
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to send message. Please try again.");
  }
};
</script> 