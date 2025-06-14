<template>
    <div>
        <Input 
            ref="input"
            type="text" 
            :placeholder="placeholder" 
            v-model="value"
            @keypress="validateNumberInput"
        /> 
    </div>
</template>

<script setup>
import { prettifyNum } from '@/lib/utils';
import Input from '../ui/input/Input.vue';
import { computed } from 'vue';
import { templateRef } from '@vueuse/core';

const input = templateRef('input')

const props = defineProps(['placeholder', 'modelValue'])
const emit = defineEmits(['update:modelValue'])

const validateNumberInput = (e) => {
    if(![0,1,2,3,4,5,6,7,8,9].includes(parseInt(e.key))){
        e.preventDefault()
    }
    input.value.$el.value = value.value
}

const value = computed({
    get: () => {
        return prettifyNum(props.modelValue || '')
    },
    set: (val) => {
        // Remove any non-digit characters that might sneak through (like pasted content)
        const numericValue = val.replace(/\D/g, '')
        emit('update:modelValue', parseInt(numericValue) || 0)
        console.log(parseInt(numericValue) || 0)
    }
})
</script>