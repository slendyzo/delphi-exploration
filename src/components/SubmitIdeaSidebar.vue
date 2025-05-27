<template>
    <aside :class="['sidebar', { open: isOpen }]" id="submitIdeaSidebar">
      <div class="sidebar-header">
        <h2>Submit Idea</h2>
        <button id="closeSubmitSidebarBtn" class="close-btn" @click="closeSidebar">×</button>
      </div>
      <div class="sidebar-content">
        <form id="submitIdeaForm" @submit.prevent="handleSubmitIdea">
          <div class="form-group">
            <label for="symbol">Symbol*</label>
            <input type="text" id="symbol" v-model="formData.symbol" required>
          </div>
          <div class="form-group">
            <label for="network">Network</label>
            <select id="network" v-model="formData.network">
              <option value="Ethereum">Ethereum</option>
              <option value="Solana">Solana</option>
              <option value="Bitcoin">Bitcoin</option>
              <option value="BSC">Binance Smart Chain</option>
              <option value="Polygon">Polygon</option>
              <option value="Celestia">Celestia</option>
              <option value="Kadena">Kadena</option>
            </select>
          </div>
          <div class="form-group">
            <label for="contractAddress">Contract Address</label>
            <input type="text" id="contractAddress" v-model="formData.contractAddress" placeholder="Help people find this asset">
          </div>
          <div class="form-group">
          <label>Position*</label>
          <div class="position-options">
            <button
              type="button"
              :class="['position-btn', { active: formData.position === 'Long' }]"
              data-value="Long"
              @click="formData.position = 'Long'"
            >
              Long
            </button>
            <button
              type="button"
              :class="['position-btn', { active: formData.position === 'Short' }]"
              data-value="Short"
              @click="formData.position = 'Short'"
            >
              Short
            </button>
          </div>
        </div>
          <div class="form-group">
            <label for="thesis">Thesis*</label>
            <textarea id="thesis" v-model="formData.thesis" rows="5" placeholder="What's your thesis behind this trade idea?" required></textarea>
          </div>
          <div class="form-group">
            <div class="sidebar-disclaimer submit-idea-form-disclaimer">
              <font-awesome-icon :icon="['fas', 'info-circle']" />
              <span>Making your idea public lets others view, like, bookmark or comment on it. It can't be modified or deleted once submitted.</span>
            </div>
          </div>
          <button type="submit" class="btn btn-primary btn-submit-form">Submit</button>
        </form>
      </div>
    </aside>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { useIdeasStore } from '@/stores/ideasStore';
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false
    }
  });
  
  const emit = defineEmits(['close']);
  
  const ideasStore = useIdeasStore();
  
  const initialFormData = {
    symbol: '',
    network: 'Ethereum', // Default value
    contractAddress: '',
    position: 'Long', // Default value
    thesis: ''
  };
  const formData = ref({ ...initialFormData });
  
  function closeSidebar() {
    emit('close');
  }
  
  function handleSubmitIdea() {
    // Basic validation (Vue's `required` attribute handles some)
    if (!formData.value.symbol || !formData.value.thesis || !formData.value.position) {
      alert('Please fill in all required fields (Symbol, Position, Thesis).');
      return;
    }
    ideasStore.addIdea({ ...formData.value });
    resetForm();
    closeSidebar();
  }
  
  function resetForm() {
    formData.value = { ...initialFormData };
  }
  
  // Watch for the sidebar closing to reset the form if it wasn't submitted
  watch(() => props.isOpen, (newVal, oldVal) => {
    if (!newVal && oldVal) { // If closing
      // Optional: Reset form only if it wasn't just submitted.
      // Current handleSubmitIdea already resets. This handles external close (e.g. overlay click)
      // setTimeout(resetForm, 300); // Delay to allow closing animation
    }
  });
  </script>
  
  <style scoped>
  /* Styles for .sidebar, .sidebar-header, .form-group etc. are in global.css
     Only add component-specific styles here if needed.
     The 'open' class toggling is handled by :class binding.
  */
  .sidebar { /* Ensure transition works, already in global.css but good to be aware */
      /* transition: right 0.3s ease-in-out; */
  }
  </style>