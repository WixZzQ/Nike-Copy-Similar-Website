<template>
  <footer class="bg-nike-black text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="col-span-1 md:col-span-2">
          <h3 class="text-2xl font-bold mb-4">NIKE</h3>
          <p class="text-gray-400 mb-4 max-w-md">
            Bringing inspiration and innovation to every athlete in the world.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <span class="sr-only">Facebook</span>
              <!-- Social icons would go here -->
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <span class="sr-only">Twitter</span>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <span class="sr-only">Instagram</span>
            </a>
          </div>
        </div>

        <!-- Links -->
        <div>
          <h4 class="font-semibold mb-4">Products</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="#" class="hover:text-white transition-colors">Shoes</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Clothing</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Accessories</a></li>
            <li><a href="#" class="hover:text-white transition-colors">New Releases</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold mb-4">Support</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="#" class="hover:text-white transition-colors">Help</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Returns</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Shipping</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2024 Nike Clone. This is a demo project for educational purposes.</p>
      </div>
    </div>
  </footer>
</template>