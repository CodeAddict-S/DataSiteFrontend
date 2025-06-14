<template>
    <header class="flex gap-1 mb-2">
        <div class="relative">
            <Input :placeholder="t('search')" v-model="search" class="max-w-96 pl-8"/>
            <MagnifyingGlassIcon class="size-5 absolute top-1/2 -translate-1/2 left-4 text-muted-foreground"/>
        </div>
        <Popover>
            <PopoverTrigger>
                <Button variant="outline">
                    <FunnelIcon/>
                </Button>
            </PopoverTrigger>
            <PopoverContent class="flex flex-col gap-1">
                <Select v-model="days">
                    <SelectTrigger class="w-full">
                        <SelectValue class="w-full"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem :value="null">{{ t('any_day') }}</SelectItem>
                            <SelectItem :value="true">{{ t('monday_days') }}</SelectItem>
                            <SelectItem :value="false">{{ t('tuesday_days') }}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div class="flex items-center">
                    <TimePicker v-model="start_time"/>
                    <div class="bg-accent w-8 h-[1px]"></div>
                    <TimePicker v-model="end_time"/>
                </div>
            </PopoverContent>
        </Popover> 
    </header>
    <div v-if="courses">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Course v-for="item in filteredCourses.slice(0,limit)" :data="item"/>
        </div>
        <Button class="mx-auto block h-auto w-auto mt-4 text-md px-5 py-3" variant="secondary" @click="limit=courses.length" v-if="filteredCourses.length>limit">{{ t('see_more') }}</Button>
    </div>
    <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-1">
            <Skeleton class="h-48" v-for="i in 6"/>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { api } from '@/lib/api';
import { onMounted, ref, watch } from 'vue';
import Skeleton from '@/components/ui/skeleton/Skeleton.vue';
import Course from '@/components/utils/Course.vue';
import Button from '@/components/ui/button/Button.vue';
import Select from '@/components/ui/select/Select.vue';
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue';
import SelectValue from '@/components/ui/select/SelectValue.vue';
import SelectContent from '@/components/ui/select/SelectContent.vue';
import SelectGroup from '@/components/ui/select/SelectGroup.vue';
import SelectItem from '@/components/ui/select/SelectItem.vue';
import Input from '@/components/ui/input/Input.vue';
import { FunnelIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import Popover from '@/components/ui/popover/Popover.vue';
import PopoverTrigger from '@/components/ui/popover/PopoverTrigger.vue';
import PopoverContent from '@/components/ui/popover/PopoverContent.vue';
import TimePicker from '@/components/utils/TimePicker.vue';

const { t } = useI18n()

const courses = ref(undefined)
const limit = ref(6)

const days = ref(null)
const search = ref(null)
const start_time = ref('00:00')
const end_time = ref('23:59')

const isLater = (time1, time2, default_) => {
    let time1_split = time1.split(':')
    let time2_split = time2.split(':')
    // compare hours
    if(parseInt(time1_split[0]) > parseInt(time2_split[0])){
        return true
    }
    else if(parseInt(time1_split[0]) < parseInt(time2_split[0])){
        return false
    }
    else {
        if(parseInt(time1_split[1]) > parseInt(time2_split[1])){
            return true
        }
        else if(parseInt(time1_split[1]) < parseInt(time2_split[1])){
            return false
        } else {
            return default_
        }
    }
}

const filteredCourses = ref(null)
watch([days, search, start_time, end_time, courses], ([d, s, st, en, c], [oldD, oldS, oldSt, oldEn, oldC]) => {
    if (courses.value) {
        filteredCourses.value = courses.value.filter(c => {
            return (
                (s === null || c.name.toLowerCase().match(s.toLowerCase())) &&
                (d === null || c.starts_monday === d) &&
                (st === null || isLater(c.start_time, st, true)) &&
                (en === null || !isLater(c.end_time, en, false))
            )
        })
    }
}, {immediate: true})

const fetchRelated = () => {
    api('courses/').then(res => courses.value = res.data)
}

onMounted(fetchRelated)
</script>