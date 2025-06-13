<template>
    <RouterLink custom v-slot="{navigate}" to="/">
        <div @click="navigate" class="flex cursor-pointer gap-1 items-center">
            <img src="/logo.png" class="size-8">
            <p class="font-black text-primary">DATASITE</p>
        </div>
    </RouterLink>
</template>

<script setup></script>