<template>
    <footer class="text-[var(--footer-foreground)] bg-[var(--footer-background)]">
        <div class="mt-10 w-full max-w-[1100px] mx-auto py-5 gap-5 flex flex-col px-2">
            <div class="flex flex-col gap-5 w-full">
                <Logo/>
                <div class="flex flex-col justify-between">
                    <RouterLink class="hover:underline w-fit" to="/events">{{ t('events') }}</RouterLink>
                    <RouterLink class="hover:underline w-fit" to="/courses">{{ t('courses') }}</RouterLink>
                    <RouterLink class="hover:underline w-fit" to="/login">{{ t('i_am_member') }}</RouterLink>
                </div>
            </div>
            <p class="text-muted-foreground text-sm">(c) Copyright</p>
        </div>    
    </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import Logo from '../utils/Logo.vue';

const { t } = useI18n()
</script>