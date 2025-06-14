<template>
    <div class="max-w-[700px] mx-auto">
        <h1 class="text-2xl mb-2 mt-5 font-semibold text-center">{{ t('events') }}</h1>
        <div v-if="events">
            <article class="flex flex-col gap-4 w-full">
                <Event v-for="item in events" :data="item"/>
            </article>
        </div>
        <div v-else>
            <Skeleton class="h-96 w-full"/>
        </div>
    </div>
</template>

<script setup>
import Skeleton from '@/components/ui/skeleton/Skeleton.vue';
import Event from '@/components/utils/Event.vue';
import { api } from '@/lib/api';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const events = ref(undefined)

const fetchRelated = () => {
    api('events/').then(res => events.value = res.data)
}

onMounted(fetchRelated)
</script>