<template>
    <template v-if="data">
        <h1 class="text-center">{{ data.fullname }} • <span class="font-mono uppercase text-primary">{{ data.role }}</span></h1>
        <h2 class="text-center text-md font-bold mt-2">{{ t('your_courses') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-1 mt-4 lg:grid-cols-3" v-if="data.courses.length>0">
            <Course v-for="item in data.courses" :data="item"/>
        </div>
        <div v-else>
            <CloudIcon class="size-28 mx-auto mt-10"/>
            <p class="font-bold text-center mt-1">{{ t('nothing_found') }}</p>
        </div>
    </template>
    <template v-else>
        <div class="flex justify-center items-center gap-1">
            <Skeleton class="w-24 h-4"/>
            <Skeleton class="size-1 rounded-full"/>
            <Skeleton class="w-24 h-4"/>
        </div>
        <Skeleton class="w-36 h-5 mx-auto mt-4"/>
        <div class="grid gap-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3">
            <Skeleton class="w-full h-96" v-for="_ in 12"/>
        </div>
    </template>
</template>

<script setup>
import Skeleton from '@/components/ui/skeleton/Skeleton.vue';
import Course from '@/components/utils/Course.vue';
import { api } from '@/lib/api';
import { CloudIcon } from '@heroicons/vue/24/solid';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const data = ref(undefined)

const fetchRelated = () => {
    api('me').then(res => data.value = res.data)
}

onMounted(fetchRelated)
</script>
