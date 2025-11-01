<script setup>
defineProps({
  categories: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <section class="py-16 bg-nike-light-gray">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-nike-black mb-4">
          Shop By Category
        </h2>
        <p class="text-nike-gray text-lg">
          Find the perfect shoes for your activities
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="category in categories" 
          :key="category.name"
          class="group cursor-pointer"
        >
          <div class="relative overflow-hidden rounded-lg bg-white shadow-sm">
            <img 
              :src="category.image" 
              :alt="category.name"
              class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
            
            <div class="p-6">
              <h3 class="text-xl font-bold text-nike-black mb-2">
                {{ category.name }}
              </h3>
              <p class="text-nike-gray">
                {{ category.description }}
              </p>
              <button class="mt-4 text-nike-black font-medium hover:underline">
                Shop {{ category.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>