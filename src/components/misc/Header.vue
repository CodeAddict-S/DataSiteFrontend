<template>
    <header class="flex gap-4 items-center p-1 max-w-[1100px] mx-auto">
        <Logo/>

        <nav class="gap-1 hidden md:flex">
            <RouterLink to="/events">
                <Button variant="ghost">{{ t('events') }}</Button>
            </RouterLink>
            <RouterLink to="/courses">
                <Button variant="ghost">{{ t('courses') }}</Button>
            </RouterLink>
            <RouterLink to="/login">
                <Button variant="ghost">{{ t('i_am_member') }}</Button>
            </RouterLink>
        </nav>

        <div info="settings" class="ml-auto">
            <Button variant="ghost" class="h-auto aspect-square" @click="toggle">
                <SunIcon class="size-5 text-primary" v-if="isDark"/>
                <MoonIcon class="size-5 text-primary" v-else/>
            </Button>
        </div>
    </header>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import Button from '../ui/button/Button.vue';
import Logo from '../utils/Logo.vue';
import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue';

const { t } = useI18n()

const isDark = ref(true)
const toggle = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark')
}
</script>