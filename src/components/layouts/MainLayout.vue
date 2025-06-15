<template>
    <Header/>
    <div class="max-w-[1100px] mt-28  md:mt-14 px-2 mx-auto w-full">
        <slot/>
    </div>
    <Footer/>
</template>

<script setup>
import Footer from '../misc/Footer.vue';
import Header from '../misc/Header.vue';

</script>
