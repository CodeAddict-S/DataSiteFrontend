<template>
	<div class="w-full">
		<Popover>
			<PopoverTrigger as-child>
				<Button variant="outline" class="w-full h-auto justify-start hover:bg-gray-50">
					<template v-if="selectedOptions.length">
						<div class="flex flex-wrap h-auto gap-1">
							<Badge v-for="option in selectedOptions" :key="option.value" variant="secondary">
								{{ option.label }}
							</Badge>
						</div>
					</template>
					<template v-else>
						<p class="text-muted-foreground font-normal">{{ placeholder ?? 'Select...' }}</p>
					</template>
				</Button>
			</PopoverTrigger>
			<PopoverContent class="w-64 max-h-64 overflow-y-auto">
				<h1 class="font-semibold">{{ placeholder ?? 'Select' }}</h1>
				<div class="mt-[5px]">
					<div v-for="option in options" :key="option.value"
						class="flex items-center gap-2 hover:bg-accent/50 px-2 py-1 rounded"
						@click="toggle(option.value)">
						<Checkbox :modelValue="modelValue.includes(option.value)"/>
						<label>{{ option.label }}</label>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import Checkbox from '../ui/checkbox/Checkbox.vue'

const props = defineProps(['modelValue', 'options', 'placeholder'])

const emit = defineEmits(['update:modelValue'])

const selectedOptions = computed(() => {
	if(props.modelValue){
		return props.options.filter((opt) => props.modelValue.includes(opt.value))
	}else{
		emit('update:modelValue', [])
		return []
	}
})

function toggle(value) {
	const current = [...props.modelValue]
	const index = current.indexOf(value)
	if (index === -1) {
		current.push(value)
	} else {
		current.splice(index, 1)
	}
	emit('update:modelValue', current)
}
</script>
