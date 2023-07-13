<!-- === Randomly pick one ad from available Google or Amazon ads === -->
<script setup>
  import { onMounted } from 'vue';
  import AmazonBanner from './Amazon/Banner.vue';
  import GoogleAdSense from './Google/AdSense.vue';


  // === Data ===
  /**
   * Ad Types that could be displayed
   */
  const ads = {
    googleInFeed: {
      adFormat: 'fluid',
      adLayoutKey: '-fb+5w+4e-db+86',
      adSlot: 7471404401,
      adType: 'GoogleAdSense',
      displayRatio: 1,
    },
    amazonAudiblePlus: {
      adType: 'AmazonBanner',
      href: 'https://amzn.to/3DbXK1H',
      imagePath: 'Amazon/Minerva-Plus-Associate-300x250-V08.png',
      imageAltText: 'Amazon Audible Plus Offer',
      displayRatio: 1,
    },
    amazonPrimeStudent: {
      adType: 'AmazonBanner',
      href: 'https://amzn.to/3rplmNE',
      imagePath: 'Amazon/1028240_student_v5a_associate_300x250.jpg',
      imageAltText: 'Amazon Prime Student Offer',
      displayRatio: 1,
    },
    amazonPrime: {
      adType: 'AmazonBanner',
      href: 'https://amzn.to/43sUolr',
      imagePath: 'Amazon/AssocAds_GleasonSVOD_300x250.jpg',
      imageAltText: 'Amazon Prime Offer',
      displayRatio: 1,
    },
  };

  /**
   * Randomly pick an ad from `ads` considering displayRatio
   */
  const whichAdToShow = (() => {
    const adKeys = Object.keys(ads);
    // availableAds e.g. ['googleInFeed', 'googleInFeed', 'amazonPrimeStudent', ...]
    const availableAds = adKeys.flatMap(adKey => Array(ads[adKey].displayRatio).fill(adKey))
    const indexRandom = Math.floor(Math.random() * availableAds.length);
    // adKeySelected e.g. googleInFeed
    const adKeySelected = availableAds[indexRandom];
    return ads[adKeySelected];
  })();


  // === Methods ===
  const getImageUrl = (imagePath) => {
    // Note: Path must start with a static folder (e.g. ./images/) for Vite to process the image in Production build
    // https://vitejs.dev/guide/assets.html
    const result = new URL(`./images/${imagePath}`, import.meta.url).href;
    return result;
  }


  // === Lifecycle Hooks ===
  onMounted(() => {
    if (whichAdToShow.adType === 'GoogleAdSense') {
      // Dynamically add GoogleAdSense script
      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${import.meta.env.VITE_AD_CLIENT}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }
  });
</script>

<template>
  <!-- === Google AdSense === -->
  <GoogleAdSense
    v-if="whichAdToShow.adType === 'GoogleAdSense'"
    :adFormat="whichAdToShow.adFormat"
    :adLayoutKey="whichAdToShow.adLayoutKey"
    :adSlot="whichAdToShow.adSlot"
  />

  <!-- === Amazon Banner === -->
  <AmazonBanner
    v-if="whichAdToShow.adType === 'AmazonBanner'"
    :href="whichAdToShow.href"
    :image="getImageUrl(whichAdToShow.imagePath)"
    :imageAltText="whichAdToShow.imageAltText"
  />
</template>