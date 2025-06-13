<template>
    <div class="mt-5">
        <p class="text-muted-foreground font-semibold text-sm text-center">📍 {{ t('address') }}</p>
        <h1 class="text-center font-bold text-2xl">{{ t('title') }}</h1>
    </div>

    <div>
        <Carousel @init-api="onInit" class="mt-6 mx-auto relative" :opts="{ align: 'center', loop: true }">
            <CarouselContent>
                <CarouselItem
                    v-for="(link, index) in images"
                    :key="index"
                    class="md:basis-[70%] basis-3/4 aspect-video"
                >
                    <div class="w-full h-full flex items-center justify-center">
                        <img 
                            :src="`/${link}`" 
                            class="object-cover transition-all rounded-xl"
                            :style="{ width: currentIndex !== index ? '90%' : '100%', height: currentIndex !== index ? '90%' : '100%' }"
                        />
                    </div>
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel'
import { useI18n } from 'vue-i18n'

/* Carousel API to track the current index */
const currentIndex = ref(0)
function onInit(api) {
    // Bind to select event once the API is ready
    api.on('select', () => {
        currentIndex.value = api.selectedScrollSnap()
    })
    // Initialize the index immediately
    currentIndex.value = api.selectedScrollSnap()
    /* Autoplay */
    setInterval(() => {
        api.scrollNext()
    }, 2000)
}

const { t } = useI18n()

const images = ['image1.png','image2.png','image3.png','image4.png','image5.png']
</script>