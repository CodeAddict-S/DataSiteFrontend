<template>
    <div class="relative">
        <Input v-model="value" :disabled="disabled" :placeholder="placeholder||t('password')" :type="!isVisible?'text':'password'" class="pr-[35px]"/>

        <component @click="isVisible=!isVisible" :is="isVisible ? EyeIcon : EyeSlashIcon" class="absolute cursor-pointer text-foreground size-5 right-[13px] top-1/2 -translate-y-1/2"></component>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import Input from '../ui/input/Input.vue';
import { computed, ref } from 'vue';
import { EyeSlashIcon, EyeIcon } from '@heroicons/vue/24/solid'

const props = defineProps(['modelValue', 'placeholder', 'disabled'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
})

const { t } = useI18n()

const isVisible = ref(true)
</script>