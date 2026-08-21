import { createRouter, createWebHistory } from 'vue-router'
import SearchPage from '../pages/SearchPage.vue'
import ArticleView from '../pages/ArticleView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'search',
      component: SearchPage,
    },
    {
      path: '/article/:title',
      name: 'article',
      component: ArticleView,
      props: true,
    },
  ],
})

export default router
