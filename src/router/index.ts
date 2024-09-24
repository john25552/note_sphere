import { useAccountStore } from '@/stores/account';
import { computed } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("@/views/app/general_body.vue"),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/app/home.vue'),
          meta: {requireAuth: true}
        },
        {
          path: 'search/',
          name: 'search', 
          component: () => import('@/views/app/search.vue'),
          meta: {requireAuth: true}
        },
        {
          path: 'editor/',
          name: 'editor',
          component: () => import('@/views/app/editor.vue'),
          meta: {requireAuth: true}
        },
        {
          path: 'inbox/',
          name: 'inbox',
          component: () => import('@/views/app/inbox.vue'),
          meta: {requireAuth: true}
        },
        {
          path: 'library/',
          name: 'library',
          component: () => import('@/views/app/library.vue'),
          meta: {requireAuth: true}
        },
        {
          path: 'channels/',
          name: 'channels',
          component: () => import('@/views/app/channels.vue'),
          meta: {requireAuth: true}
        },
        {
          path:'settings/',
          name: 'settings',
          component: () => import('@/views/app/settings.vue'),
          meta: {requireAuth: true}
        },
        {
          path: 'profile/',
          name: 'profile',
          component: () => import('@/views/app/profile.vue'),
          meta: {requireAuth: true}
        },
        {
          path: 'create-media/',
          name:'create-media',
          component: () => import('@/views/app/camera.vue'),
          meta: {requireAuth: true}
        },
        {
          path: 'post/:id',
          name: 'post',
          component: () => import('@/views/app/postPreview.vue'),
          meta: {requireAuth: true}
        }
      ]
    },
    {
      path: '/landing_page',
      name: 'landing_page',
      children: [
        {
          path: 'auth/',
          name: 'auth',
          component: () => import('@/views/auth/index.vue')
        },
        {
          path: 'register/',
          name: 'register',
          component: () => import('@/views/auth/register.vue')
        },
        {
          path: 'login/',
          name: 'login',
          component: () => import('@/views/auth/login.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAccountStore();
  const user = computed(() => authStore.user);

  // Check if the route requires authentication
  if (to.meta.requireAuth) {
    // If user is not authenticated, redirect to the login page
    if (!user.value) {
      next({name: 'login'});  // Use `next()` instead of `router.push()`
    } else {
      next();  // Allow the user to proceed to the route
    }
  } else {
    next();  // If the route doesn't require authentication, allow access
  }
});

export default router
