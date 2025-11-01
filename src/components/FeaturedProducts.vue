<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useToast } from 'vue-toastification'

const router = useRouter()
const cartStore = useCartStore()
const toast = useToast()

defineProps({
  products: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  totalProducts: {
    type: Number,
    default: 0
  }
})

function viewProduct(productId) {
  router.push(`/product/${productId}`)
}

function quickAddToCart(product, event) {
  event.stopPropagation()
  
  if (!product.inStock) {
    toast.warning('This product is out of stock')
    return
  }

  cartStore.addToCart(
    product,
    product.sizes?.[0] || 'M',
    product.colors?.[0]?.name || 'Default',
    1
  )
  
  toast.success('Added to cart!')
}
</script>

<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-nike-black mb-4">
          Featured Products
        </h2>
        <p class="text-nike-gray text-lg">
          Discover the latest innovations from Nike
        </p>
        <p v-if="totalProducts > 0" class="text-sm text-gray-500 mt-2">
          Showing {{ products.length }} of {{ totalProducts }} products
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="i in 8" :key="i" class="animate-pulse">
          <div class="bg-gray-200 rounded-lg h-64 mb-4"></div>
          <div class="bg-gray-200 rounded h-4 w-3/4 mb-2"></div>
          <div class="bg-gray-200 rounded h-4 w-1/2"></div>
        </div>
      </div>

      <!-- No results message -->
      <div v-else-if="products.length === 0" class="text-center py-12">
        <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
        <p class="text-gray-500">Try adjusting your search or filter criteria</p>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="product in products" 
          :key="product.id"
          class="group cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          @click="viewProduct(product.id)"
        >
          <div class="relative overflow-hidden rounded-t-lg bg-nike-light-gray">
            <img 
              :src="product.image" 
              :alt="product.name"
              class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            <!-- Product Badges -->
            <div class="absolute top-3 right-3 flex flex-col gap-2">
              <span 
                v-if="product.featured"
                class="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold"
              >
                Featured
              </span>
              <span 
                v-if="!product.inStock"
                class="bg-gray-500 text-white px-2 py-1 rounded text-xs font-semibold"
              >
                Out of Stock
              </span>
              <span 
                v-if="product.originalPrice"
                class="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold"
              >
                Sale
              </span>
            </div>
            
            <!-- Quick Add Button -->
            <button
              v-if="product.inStock"
              @click="quickAddToCart(product, $event)"
              class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-nike-black text-white px-6 py-2 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-800 shadow-lg"
            >
              Quick Add
            </button>
          </div>
          
          <div class="p-4">
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-semibold text-nike-black group-hover:text-nike-gray transition-colors line-clamp-2">
                {{ product.name }}
              </h3>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <p class="text-nike-gray font-bold text-lg">
                  ${{ product.price }}
                </p>
                <p v-if="product.originalPrice" class="text-gray-400 line-through text-sm">
                  ${{ product.originalPrice }}
                </p>
              </div>
              
              <!-- Rating -->
              <div class="flex items-center text-sm text-gray-600">
                <span class="text-yellow-400">★</span>
                <span class="ml-1">{{ product.rating }}</span>
              </div>
            </div>
            
            <p class="text-xs text-gray-500 mt-2 capitalize">
              {{ product.category }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>