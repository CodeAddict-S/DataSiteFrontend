import AppView from "@/pages/AppView.vue";
import CoursesPage from "@/pages/CoursesPage.vue";
import EventsPage from "@/pages/EventsPage.vue";
import LandingPage from "@/pages/LandingPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import MemberView from "@/pages/MemberView.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'landing_page',
            component: LandingPage
        },
        {
            path: '/events',
            name: 'events',
            component: EventsPage
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage
        },
        {
            path: '/courses',
            name: 'courses',
            component: CoursesPage
        },
        {
            path: '/app',
            name: 'app',
            component: AppView
        },
        {
            path: '/member',
            name: 'member',
            component: MemberView
        },
        {
            path: '/:catchAll',
            name: '404_not_found',
            component: NotFoundPage
        }
    ]
})
