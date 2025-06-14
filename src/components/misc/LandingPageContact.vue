<template>
    <h1 class="mt-10 font-semibold text-2xl text-center">{{ t('contact_us') }}</h1>
    <p class="text-center">📞 +998 xx xxx xx xx</p>
    <div class="w-full overflow-hidden max-w-2xl mx-auto mt-4 rounded-xl">
        <a href="https://www.google.com/maps/place/%22Sitelabs%22+and+%22Datasite+Academy%22/@41.0045405,71.6693929,17z/data=!4m6!3m5!1s0x38bb4de2d8b58e0d:0xdecbb21511a65616!8m2!3d41.0035349!4d71.6743788!16s%2Fg%2F11pv76hswt?entry=ttu&g_ep=EgoyMDI1MDYxMC4xIKXMDSoASAFQAw%3D%3D">
            <img src="/address.png">
        </a>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
</script>