<template>
    <Card>
        <CardContent>
            <Carousel class="aspect-video">
                <CarouselContent>
                    <CarouselItem class="w-full h-full aspect-video" v-if="data.video">
                        <VuePlyr>
                            <video playsinline controls preload="metadata" :poster="data.thumbnail">
                                <source :src="data.video" type="video/mp4" />
                            </video>
                        </VuePlyr>
                    </CarouselItem>
                    <CarouselItem class="w-full h-full aspect-video" v-if="data.thumbnail">
                        <img :src="data.thumbnail" class="w-full h-full object-cover">
                    </CarouselItem>
                    <CarouselItem v-for="item in data.images" class="w-full h-full aspect-video">
                        <img :src="item.image" class="w-full h-full object-cover">
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </CardContent>
        <CardHeader>
            <p class="text-muted-foreground text-sm">{{ ISOtoReadable(data.created_at) }}</p>
            <CardTitle>{{ data.title }}</CardTitle>
            <CardDescription class="text-md">{{ data.description }}</CardDescription>
        </CardHeader>
    </Card>
</template>

<script setup>
import { ISOtoReadable } from '@/lib/utils';
import Card from '../ui/card/Card.vue';
import CardContent from '../ui/card/CardContent.vue';
import CardDescription from '../ui/card/CardDescription.vue';
import CardFooter from '../ui/card/CardFooter.vue';
import CardHeader from '../ui/card/CardHeader.vue';
import CardTitle from '../ui/card/CardTitle.vue';
import Carousel from '../ui/carousel/Carousel.vue';
import CarouselContent from '../ui/carousel/CarouselContent.vue';
import CarouselItem from '../ui/carousel/CarouselItem.vue';
import CarouselNext from '../ui/carousel/CarouselNext.vue';
import CarouselPrevious from '../ui/carousel/CarouselPrevious.vue';
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

const props = defineProps(['data'])
</script>