<template>
    <header>
        <Tabs v-model="tab">
            <TabsList class="w-fit mx-auto flex gap-1">
                <TabsTrigger value="students">{{ t('students') }}</TabsTrigger>
                <TabsTrigger value="teachers">{{ t('teachers') }}</TabsTrigger>
                <TabsTrigger value="courses">{{ t('courses') }}</TabsTrigger>
            </TabsList>
        </Tabs>
    </header>
    <main class="mt-4">
        <AppStudents v-if="tab === 'students'"/>
        <AppTeachers v-else-if="tab === 'teachers'"/>
        <AppCourses v-else-if="tab === 'courses'"/>
    </main>
</template>

<script setup>
import AppCourses from '@/components/misc/AppCourses.vue';
import AppStudents from '@/components/misc/AppStudents.vue';
import AppTeachers from '@/components/misc/AppTeachers.vue';
import Tabs from '@/components/ui/tabs/Tabs.vue';
import TabsList from '@/components/ui/tabs/TabsList.vue';
import TabsTrigger from '@/components/ui/tabs/TabsTrigger.vue';
import { router } from '@/lib/router';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const { t } = useI18n()
const route = useRoute()

const tab = computed({
    get: () => {
        if(route.query.tab){
            return route.query.tab
        }else{
            router.push({query: {tab: 'students'}})
            return 'students'
        }
    },
    set: (tab) => router.push({query: {tab}})
})
</script>