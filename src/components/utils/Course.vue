<template>
    <Card class="gap-y-3 transition-colors hover:bg-accent">
        <CardHeader>
            <div class="flex flex-wrap gap-1" v-if="data.starts_monday">
                <div class="rounded-xl px-2 py-1 text-sm bg-primary text-primary-foreground w-fit">{{ t('monday') }}</div>
                <div class="rounded-xl px-2 py-1 text-sm bg-primary text-primary-foreground w-fit">{{ t('wednesday') }}</div>
                <div class="rounded-xl px-2 py-1 text-sm bg-primary text-primary-foreground w-fit">{{ t('friday') }}</div>
            </div>
            <div class="flex flex-wrap gap-1" v-else>
                <div class="rounded-xl px-2 py-1 text-sm bg-primary text-primary-foreground w-fit">{{ t('tuesday') }}</div>
                <div class="rounded-xl px-2 py-1 text-sm bg-primary text-primary-foreground w-fit">{{ t('thursday') }}</div>
                <div class="rounded-xl px-2 py-1 text-sm bg-primary text-primary-foreground w-fit">{{ t('saturday') }}</div>
            </div>
            <CardTitle class="text-xl font-bold">{{ data.name }}</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col gap-1">
            <p class="font-semibold">🕒 {{ data.start_time.substring(0,5) }} - {{ data.end_time.substring(0,5) }}</p>
            <p>{{ prettifyNum(data.price) }} <span class="font-semibold">so'm</span></p>
        </CardContent>
    </Card>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import Card from '../ui/card/Card.vue';
import CardContent from '../ui/card/CardContent.vue';
import CardHeader from '../ui/card/CardHeader.vue';
import CardTitle from '../ui/card/CardTitle.vue';
import { prettifyNum } from '@/lib/utils';

const { t } = useI18n()

const props = defineProps(['data'])
</script>