import { computed, onBeforeUnmount, onMounted, reactive } from "vue";


// === Data ===
const state = reactive({
  screenWidth: window.innerWidth,
});


// === Computed Fields ===
// Vuetify Breakpoints: https://vuetifyjs.com/en/features/display-and-platform
const mdAndUp = computed(() => {
  return state.screenWidth >= 960;
});

const smAndUp = computed(() => {
  return state.screenWidth >= 600;
});


// === Methods ===
const handleResize = () => {
  state.screenWidth = window.innerWidth;
};


export default () => {
  onMounted(() => window.addEventListener("resize", handleResize));
  onBeforeUnmount(() => window.removeEventListener("resize", handleResize));

  return {
    mdAndUp,
    smAndUp,
  }
};
