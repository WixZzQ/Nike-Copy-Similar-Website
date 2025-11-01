<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'

const router = useRouter()
const cartStore = useCartStore()
const isMenuOpen = ref(false)
const searchQuery = ref('')

const navItems = ['New Releases', 'Men', 'Women', 'Kids', 'Sale']
const cartItemCount = computed(() => cartStore.totalItems)

function navigateToCart() {
  router.push('/cart') // This should navigate to cart
}

function searchProducts() {
  if (searchQuery.value.trim()) {
    router.push(`/?search=${encodeURIComponent(searchQuery.value)}`)
    searchQuery.value = ''
  }
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-white shadow-sm">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="text-2xl font-bold text-nike-black">
            NIKE
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <a 
            v-for="item in navItems" 
            :key="item"
            href="#" 
            class="text-sm font-medium text-nike-black hover:text-nike-gray transition-colors"
          >
            {{ item }}
          </a>
        </nav>

        <!-- Right side icons -->
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <div class="relative hidden md:block">
            <input
              v-model="searchQuery"
              @keyup.enter="searchProducts"
              type="text"
              placeholder="Search..."
              class="w-48 pl-3 pr-8 py-1.5 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-nike-black focus:border-transparent"
            >
            <button 
              @click="searchProducts"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-nike-black"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          <!-- Cart with badge -->
          <button 
            @click="navigateToCart"
            class="relative p-2 hover:bg-nike-light-gray rounded-full transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span 
              v-if="cartItemCount > 0"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            >
              {{ cartItemCount }}
            </span>
          </button>

          <!-- Mobile menu button -->
          <button 
            @click="isMenuOpen = !isMenuOpen"
            class="md:hidden p-2 hover:bg-nike-light-gray rounded-full transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div 
        v-if="isMenuOpen" 
        class="md:hidden py-4 border-t border-nike-light-gray"
      >
        <div class="flex flex-col space-y-4">
          <a 
            v-for="item in navItems" 
            :key="item"
            href="#" 
            class="text-sm font-medium text-nike-black hover:text-nike-gray transition-colors py-2"
          >
            {{ item }}
          </a>
        </div>
        
        <!-- Mobile Search -->
        <div class="mt-4">
          <div class="relative">
            <input
              v-model="searchQuery"
              @keyup.enter="searchProducts"
              type="text"
              placeholder="Search products..."
              class="w-full pl-3 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-nike-black focus:border-transparent"
            >
            <button 
              @click="searchProducts"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-nike-black"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>