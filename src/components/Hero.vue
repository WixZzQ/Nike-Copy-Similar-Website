<template>
  <section class="relative bg-nike-black text-white">
    <div class="container mx-auto px-4 py-20">
      <div class="max-w-2xl">
        <h1 class="text-5xl md:text-7xl font-bold mb-6">
          JUST DO IT.
        </h1>
        <p class="text-xl md:text-2xl mb-8 text-gray-300">
          Feel the unbeatable comfort and style in every step.
        </p>
        <div class="flex space-x-4">
          <button class="bg-white text-nike-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors">
            Shop Now
          </button>
          <button class="border border-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-nike-black transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
    
    <!-- Background pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="w-full h-full bg-gradient-to-r from-transparent to-nike-black"></div>
    </div>
  </section>
</template>