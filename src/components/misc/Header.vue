<template>
    <div class="backdrop-blur-sm fixed left-0 top-0 bg-background/10 dark:bg-background/50 dark:backdrop-blur-md z-40 dark:bg-gradient-to-b dark:from-primary/20 dark:to-transparent w-full">
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

            <div role="settings" class="ml-auto flex items-center gap-1">
                <Select v-model="model_locale">
                    <SelectTrigger>
                        <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="en">🇬🇧 EN</SelectItem>
                            <SelectItem value="uz">🇺🇿 UZ</SelectItem>
                            <SelectItem value="ru">🇷🇺 RU</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button variant="ghost" class="h-auto aspect-square" @click="toggle">
                    <SunIcon class="size-5 text-primary" v-if="isDark"/>
                    <MoonIcon class="size-5 text-primary" v-else/>
                </Button>
                <Button variant="ghost" class="h-auto aspect-square" @click="logout" v-if="auth.a11d">
                    <ArrowRightEndOnRectangleIcon/>
                </Button>
            </div>
        </header>
        <nav class="gap-1 flex md:hidden justify-center mb-2">
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
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import Button from '../ui/button/Button.vue';
import Logo from '../utils/Logo.vue';
import { ArrowRightEndOnRectangleIcon, MoonIcon, SunIcon } from '@heroicons/vue/24/solid'
import { computed, ref } from 'vue';
import Select from '../ui/select/Select.vue';
import SelectTrigger from '../ui/select/SelectTrigger.vue';
import SelectValue from '../ui/select/SelectValue.vue';
import SelectContent from '../ui/select/SelectContent.vue';
import SelectGroup from '../ui/select/SelectGroup.vue';
import SelectItem from '../ui/select/SelectItem.vue';
import { api } from '@/lib/api';
import { useAuthStore } from '@/lib/auth';

const auth = useAuthStore()
const { t, locale } = useI18n()

locale.value = localStorage.getItem('locale') || 'en'

const model_locale = computed({
    get: () => locale.value,
    set: (val) => {
        localStorage.setItem('locale', val)
        locale.value = val
    }
})

const isDark = ref(localStorage.getItem('dark')==='true'??true)
if(isDark.value){
    document.documentElement.classList.add('dark')
}
const toggle = () => {
    isDark.value = !isDark.value
    localStorage.setItem('dark', isDark.value)
    document.documentElement.classList.toggle('dark')
}

const logout = () => {
    api.defaults.headers.common.Authorization = ``
    localStorage.removeItem('tokens')
    auth.a11d = false
}
</script>