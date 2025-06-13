import EventsManagementPage from "@/pages/EventsManagementPage.vue";
import EventsPage from "@/pages/EventsPage.vue";
import LandingPage from "@/pages/LandingPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import StudentsPage from "@/pages/StudentsPage.vue";
import TeachersPage from "@/pages/TeachersPage.vue";
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
            path: '/manage-events',
            name: 'manage_events',
            component: EventsManagementPage
        },
        {
            path: '/students',
            name: 'students',
            component: StudentsPage
        },
        {
            path: '/teachers',
            name: 'teachers',
            component: TeachersPage
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage
        },
        {
            path: '/:catchAll',
            name: '404_not_found',
            component: NotFoundPage
        }
    ]
})