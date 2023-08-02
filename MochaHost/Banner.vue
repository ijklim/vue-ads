<script setup>
  import { computed } from 'vue';
  import { useDisplay } from 'vuetify';


  // === Composables ===
  const display = useDisplay();


  // === Props ===
  defineProps({
    href: {
      type: String,
      required: true,
    },
  });


  // === Computed ===
  /**
   * Determine banner image based on screen width
   *
   * Note: Available banners can be found on https://affiliates.mochahost.com/account.php?page=7
   */
  const imageSrc = computed(() => {
    if (display.mdAndUp.value) {
      return 'https://affiliates.mochahost.com/media/banners/mshared728x90.gif';
    }

    if (display.smAndUp.value) {
      return 'https://affiliates.mochahost.com/media/banners/mshared468x60.gif';
    }

    return 'https://affiliates.mochahost.com/media/banners/mshared200x200.gif';
  });
</script>

<template>
  <a
    target="_blank"
    :href="href"
  >
    <img
      alt="MochaHost Web Hosting with Green Servers"
      :src="imageSrc"
    />
  </a>
</template>
