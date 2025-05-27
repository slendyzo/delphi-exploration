import { createRouter, createWebHistory } from 'vue-router'
// Import the actual view components
import ShillView from '../views/ShillView.vue'
import FeatureOneView from '../views/FeatureOneView.vue'
import FeatureTwoView from '../views/FeatureTwoView.vue'

const routes = [
  {
    path: '/',
    name: 'Shill',
    component: ShillView // Use the actual component
  },
  {
    path: '/feature-one',
    name: 'FeatureOne',
    component: FeatureOneView // Use the actual component
  },
  {
    path: '/feature-two',
    name: 'FeatureTwo',
    component: FeatureTwoView // Use the actual component
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router