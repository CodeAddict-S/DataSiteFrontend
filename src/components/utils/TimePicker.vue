<template>
    <div class="flex gap-[6px] border-[1px] items-center border-accent rounded-[10px]">
        <input type="number" v-model="hours" @input="correctTime($event,24)" class="w-full text-right px-[10px] py-[5px] outline-none">
        <p class="font-bold">:</p>
        <input type="number" v-model="minutes" @input="correctTime($event,60)" class="w-full px-[10px] py-[5px] outline-none">
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const hours = computed({
  get: () => props.modelValue.substring(0,2),
  set: (hours) => {
    if(hours < 0 || hours > 23){
        return 
    }
    const minutes = props.modelValue.split(':')[1]
    emit('update:modelValue', `${String(hours).padStart(2, '0')}:${minutes}:00`)
  }
})
const minutes = computed({
  get: () => props.modelValue.substring(3,5),
  set: (minutes) => {
    const hours = props.modelValue.split(':')[0]
    emit('update:modelValue', `${hours}:${String(minutes).padStart(2, '0')}`)
  }
})

const correctTime = (event, num) => {
    parseInt(event.target.value)>=num?event.target.value='0' : parseInt(event.target.value)<0?event.target.value=num:''
}
</script>

<style scoped>
input {
  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  -moz-appearance: textfield;
}
</style>