<!-- === Randomly pick one ad from available Google or Amazon ads === -->
<script setup>
  import { onMounted } from 'vue';
  import AmazonBanner from './Amazon/Banner.vue';
  import GoogleAdSense from './Google/AdSense.vue';
  import MochaHostBanner from './MochaHost/Banner.vue';


  // === Data ===
  /**
   * Ad Types that could be displayed
   */
  const ads = {
    // === Amazon ===
    amazonAudiblePlus: {
      adType: 'AmazonBanner',
      href: 'https://www.amazon.com/dp/B00NB86OYE/?ref_=assoc_tag_ph_1485906643682&_encoding=UTF8&camp=1789&creative=9325&linkCode=pf4&tag=aimprove-20&linkId=837a9441c1d588564e1289af56177cff',
      imagePath: 'Amazon/Minerva-Plus-Associate-300x250-V08.png',
      imageAltText: 'Try Audible Premium Plus and Get Up to Two Free Audiobooks',
      displayRatio: 1,
    },
    amazonFamily: {
      adType: 'AmazonBanner',
      href: 'https://www.amazon.com/gp/family/signup/welcome?ie=UTF8&*Version*=1&*entries*=0&ref_=assoc_tag_ph_1457104784749&_encoding=UTF8&camp=1789&creative=9325&linkCode=pf4&tag=aimprove-20&linkId=20968e1f5b6ffc1c3bd5652f143047a9',
      imagePath: 'Amazon/33385_mom_ads_300x250_v2.png',
      imageAltText: 'Join Amazon Family 30-Day Free Trial',
      displayRatio: 2,
    },
    amazonFresh: {
      adType: 'AmazonBanner',
      href: 'https://www.amazon.com/fresh?ref_=assoc_tag_ph_1524254357421&_encoding=UTF8&camp=1789&creative=9325&linkCode=pf4&tag=aimprove-20&linkId=48b224a906b66a17d7bc2f4e0e9b7b01',
      imagePath: 'Amazon/AZUS23-100k-0603-Amazon-EBT-H2-AssociateBanners_Set1_300x250_V01.jpg',
      imageAltText: 'Try Amazon Fresh',
      displayRatio: 1,
    },
    amazonPrime: {
      adType: 'AmazonBanner',
      href: 'https://www.amazon.com/gp/video/primesignup?ref_=assoc_tag_ph_1402131641212&_encoding=UTF8&camp=1789&creative=9325&linkCode=pf4&tag=aimprove-20&linkId=98998df7a905a304cfc12dcfc2991a46',
      imagePath: 'Amazon/AssocAds_GleasonSVOD_300x250.jpg',
      imageAltText: 'Join Amazon Prime - Watch Thousands of Movies & TV Shows Anytime - Start Free Trial Now',
      displayRatio: 1,
    },
    amazonPrimeStudent: {
      adType: 'AmazonBanner',
      href: 'https://www.amazon.com/gp/student/signup/info/?ref_=assoc_tag_ph_1402130811706&_encoding=UTF8&camp=1789&creative=9325&linkCode=pf4&tag=aimprove-20&linkId=06890d150e8415a2ead6189b18a0f7ca',
      imagePath: 'Amazon/1028240_student_v5a_associate_300x250.jpg',
      imageAltText: 'Amazon Prime Student 6-month Trial',
      displayRatio: 1,
    },
    amazonWeddingRegistry: {
      adType: 'AmazonBanner',
      href: 'https://www.amazon.com/wedding/home?ref_=assoc_tag_ph_1524238801480&_encoding=UTF8&camp=1789&creative=9325&linkCode=pf4&tag=aimprove-20&linkId=4a99f2be4192accb32590c6ac3e1424c',
      imagePath: 'Amazon/AWR_Associate_Central-1.jpg',
      imageAltText: 'Create an Amazon Wedding Registry',
      displayRatio: 1,
    },
    // === Google AdSense ===
    googleInFeed: {
      adFormat: 'fluid',
      adLayoutKey: '-fb+5w+4e-db+86',
      adSlot: 7471404401,
      adType: 'GoogleAdSense',
      displayRatio: 1,
    },
    // === MochaHost ===
    mochaHost: {
      adType: 'MochaHostBanner',
      href: 'https://affiliates.mochahost.com/idevaffiliate.php?id=6756&tid1=vueads',
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
  <!-- === Amazon Banner === -->
  <AmazonBanner
    v-if="whichAdToShow.adType === 'AmazonBanner'"
    :href="whichAdToShow.href"
    :image="getImageUrl(whichAdToShow.imagePath)"
    :imageAltText="whichAdToShow.imageAltText"
  />

  <!-- === Google AdSense === -->
  <GoogleAdSense
    v-if="whichAdToShow.adType === 'GoogleAdSense'"
    :adFormat="whichAdToShow.adFormat"
    :adLayoutKey="whichAdToShow.adLayoutKey"
    :adSlot="whichAdToShow.adSlot"
  />

  <!-- === MochaHost === -->
  <MochaHostBanner
    v-if="whichAdToShow.adType === 'MochaHostBanner'"
    :href="whichAdToShow.href"
  />
</template>