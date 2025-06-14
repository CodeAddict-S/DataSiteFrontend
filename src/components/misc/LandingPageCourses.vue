<template>
    <h1 class="text-2xl font-semibold text-center mt-10 mb-4">{{ t('quality_courses') }}</h1>
    <div v-if="courses">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Course v-for="item in courses.slice(0,limit)" :data="item"/>
        </div>
        <Button class="mx-auto block h-auto w-auto mt-4 text-md px-5 py-3" variant="secondary" @click="limit=courses.length" v-if="courses.length!==limit">{{ t('see_more') }}</Button>
    </div>
    <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-1">
            <Skeleton class="h-48" v-for="i in 6"/>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import Course from '../utils/Course.vue';
import { api } from '@/lib/api';
import { onMounted, ref } from 'vue';
import Button from '../ui/button/Button.vue';
import Skeleton from '../ui/skeleton/Skeleton.vue';

const { t } = useI18n()

const courses = ref(undefined)
const limit = ref(6)

const fetchRelated = () => {
    api('courses/').then(res => courses.value = res.data)
}

onMounted(fetchRelated)
</script>