<script setup>
import { useProductsStore } from '../stores/products'

const productsStore = useProductsStore()

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name' }
]
</script>

<template>
  <section class="py-8 bg-white border-b">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
        <!-- Search -->
        <div class="w-full md:w-64">
          <div class="relative">
            <input
              v-model="productsStore.searchQuery"
              type="text"
              placeholder="Search products..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nike-black focus:border-transparent transition-colors"
            >
            <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <!-- Category Filter -->
        <div class="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          <button
            v-for="category in productsStore.categoriesWithCount"
            :key="category.value"
            @click="productsStore.setCategory(category.value)"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
              productsStore.selectedCategory === category.value
                ? 'bg-nike-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ category.name }} ({{ category.count }})
          </button>
        </div>

        <!-- Sort -->
        <div class="w-full md:w-48">
          <select
            v-model="productsStore.sortBy"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nike-black focus:border-transparent bg-white"
          >
            <option v-for="option in sortOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>

      <!-- Active Filters -->
      <div v-if="productsStore.searchQuery || productsStore.selectedCategory !== 'all'" class="mt-4 flex items-center gap-2 flex-wrap">
        <span class="text-sm text-gray-600">Active filters:</span>
        
        <span 
          v-if="productsStore.searchQuery"
          class="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
        >
          Search: "{{ productsStore.searchQuery }}"
          <button @click="productsStore.searchQuery = ''" class="hover:text-blue-600">
            ×
          </button>
        </span>

        <span 
          v-if="productsStore.selectedCategory !== 'all'"
          class="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
        >
          Category: {{ productsStore.categoriesWithCount.find(c => c.value === productsStore.selectedCategory)?.name }}
          <button @click="productsStore.setCategory('all')" class="hover:text-green-600">
            ×
          </button>
        </span>

        <button 
          @click="productsStore.clearFilters()"
          class="text-sm text-red-600 hover:text-red-800 font-medium"
        >
          Clear all
        </button>
      </div>
    </div>
  </section>
</template>