<!-- === Randomly pick one ad from available Google or Amazon ads === -->
<script setup>
  import { ref } from 'vue';
  import AmazonBanner from './Amazon/Banner.vue';
  import GoogleAdSense from './Google/AdSense.vue';

  // === Ad Types that could be displayed ===
  const ads = {
    googleInFeed: {
      adFormat: 'fluid',
      adLayoutKey: '-fb+5w+4e-db+86',
      adSlot: '7471404401',
      adType: 'GoogleAdSense',
      displayRatio: 2,
    },
    amazonPrimeStudent: {
      adType: 'AmazonBanner',
      href: 'https://amzn.to/3rplmNE',
      image: '/images/Amazon/1028240_student_v5_associate_300x250.jpg',
      imageAltText: 'Amazon Prime Student Offer',
      displayRatio: 1,
    },
    amazonPrime: {
      adType: 'AmazonBanner',
      href: 'https://amzn.to/43sUolr',
      image: '/images/Amazon/AssocAds_GleasonSVOD_300x250.jpg',
      imageAltText: 'Amazon Prime Offer',
      displayRatio: 1,
    },
  };
  // const whichAdToShow = ref(Math.ceil(Math.random() * numberOfAvailableAds));
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
  console.log('remove: whichAdToShow', whichAdToShow);

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
    :image="whichAdToShow.image"
    :imageAltText="whichAdToShow.imageAltText"
  />
</template>