<script setup>
import { onMounted, watch } from 'vue'
import { useProductsStore } from '../stores/products'
import Hero from '../components/Hero.vue'
import FeaturedProducts from '../components/FeaturedProducts.vue'
import Categories from '../components/Categories.vue'
import ProductFilters from '../components/ProductFilters.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const productsStore = useProductsStore()

onMounted(async () => {
  await Promise.all([
    productsStore.fetchProducts(),
    productsStore.fetchFeaturedProducts(),
    productsStore.fetchCategories()
  ])
})

// Watch for filter changes
watch(
  () => [productsStore.searchQuery, productsStore.selectedCategory, productsStore.sortBy],
  () => {
    productsStore.fetchProducts()
  }
)
</script>

<template>
  <div>
    <Hero />
    
    <!-- Search and Filter Section -->
    <ProductFilters />
    
    <!-- Loading State -->
    <LoadingSpinner v-if="productsStore.loading && !productsStore.products.length" />
    
    <!-- Error State -->
    <div v-else-if="productsStore.error" class="container mx-auto px-4 py-16 text-center">
      <div class="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
        <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <h3 class="text-lg font-semibold text-red-800 mb-2">Error Loading Products</h3>
        <p class="text-red-600 mb-4">{{ productsStore.error }}</p>
        <button 
          @click="productsStore.fetchProducts()"
          class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Content -->
    <template v-else>
      <FeaturedProducts 
        :products="productsStore.paginatedProducts"
        :loading="productsStore.loading"
        :total-products="productsStore.filteredProducts.length"
      />
      
      <!-- Pagination -->
      <div v-if="productsStore.totalPages > 1" class="container mx-auto px-4 py-8">
        <div class="flex justify-center items-center space-x-2">
          <button
            @click="productsStore.setPage(productsStore.currentPage - 1)"
            :disabled="productsStore.currentPage === 1"
            class="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          
          <span class="px-4 py-2 text-sm text-gray-600">
            Page {{ productsStore.currentPage }} of {{ productsStore.totalPages }}
          </span>
          
          <button
            @click="productsStore.setPage(productsStore.currentPage + 1)"
            :disabled="productsStore.currentPage === productsStore.totalPages"
            class="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>

      <Categories :categories="productsStore.categories" />
    </template>
  </div>
</template>