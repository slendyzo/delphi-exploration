import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router' // We'll create this next
import './assets/global.css' // Import global styles

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import {
    faBars, faSearch, faListUl, faThLarge, faFilter, faHeart as fasHeart,
    faComment as fasComment, faBookmark as fasBookmark, faEllipsisH, faShareAlt,
    faInfoCircle, faCoins, faTimes // faTimes for close button
} from '@fortawesome/free-solid-svg-icons'
import {
    faHeart as farHeart,
    faComment as farComment
    // faBookmark as farBookmark // if you use a regular bookmark elsewhere
} from '@fortawesome/free-regular-svg-icons'
import {
    faEthereum, faBtc, // Assuming faSolana might be faBrandsSolana
} from '@fortawesome/free-brands-svg-icons'
// If you used a specific Solana icon for brands, like 'fa-brands fa-solana'
// You might need to search for its exact name in free-brands-svg-icons or install it separately if it's custom.
// For now, I'll assume you'll use a generic coin icon or find the specific brand icon later.
// Example if you find it: import { faSolana } from '@fortawesome/free-brands-svg-icons'


/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* add icons to the library */
// Solid
library.add(faBars, faSearch, faListUl, faThLarge, faFilter, fasHeart, fasComment, fasBookmark, faEllipsisH, faShareAlt, faInfoCircle, faCoins, faTimes);
// Regular
library.add(farHeart, farComment);
// Brands
library.add(faEthereum, faBtc); // Add faSolana here if you import it

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon) // Register FontAwesomeIcon globally

app.mount('#app')