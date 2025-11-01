<script setup>
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const cartStore = useCartStore()
const router = useRouter()
const toast = useToast()

function updateQuantity(productId, quantity) {
  cartStore.updateQuantity(productId, quantity)
}

function removeItem(productId) {
  cartStore.removeFromCart(productId)
  toast.success('Item removed from cart')
}

function proceedToCheckout() {
  if (cartStore.items.length === 0) {
    toast.warning('Your cart is empty')
    return
  }
  toast.success('Proceeding to checkout!')
  // In real app: router.push('/checkout')
}

function continueShopping() {
  router.push('/')
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Shopping Cart</h1>

    <div v-if="cartStore.items.length === 0" class="text-center py-12">
      <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <h2 class="text-2xl font-semibold mb-4">Your cart is empty</h2>
      <p class="text-gray-600 mb-6">Start shopping to add items to your cart</p>
      <button 
        @click="continueShopping"
        class="bg-nike-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
      >
        Continue Shopping
      </button>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cart Items -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-sm border">
          <div 
            v-for="item in cartStore.items" 
            :key="`${item.id}-${item.selectedSize}-${item.selectedColor}`"
            class="flex items-center p-6 border-b last:border-b-0"
          >
            <img 
              :src="item.image" 
              :alt="item.name"
              class="w-20 h-20 object-cover rounded-lg"
            >
            
            <div class="flex-1 ml-4">
              <h3 class="font-semibold text-lg hover:text-nike-gray cursor-pointer" @click="router.push(`/product/${item.id}`)">
                {{ item.name }}
              </h3>
              <p class="text-gray-600">Size: {{ item.selectedSize }}</p>
              <p class="text-gray-600">Color: {{ item.selectedColor }}</p>
              <p class="text-nike-black font-bold mt-1">${{ item.price }}</p>
            </div>

            <!-- Quantity Controls -->
            <div class="flex items-center gap-3 mr-6">
              <button 
                @click="updateQuantity(item.id, item.quantity - 1)"
                class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-nike-black transition-colors"
              >
                -
              </button>
              <span class="font-semibold w-8 text-center">{{ item.quantity }}</span>
              <button 
                @click="updateQuantity(item.id, item.quantity + 1)"
                class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-nike-black transition-colors"
              >
                +
              </button>
            </div>

            <!-- Price -->
            <div class="text-right mr-6">
              <p class="font-bold text-lg">${{ (item.price * item.quantity).toFixed(2) }}</p>
            </div>

            <!-- Remove Button -->
            <button 
              @click="removeItem(item.id)"
              class="text-red-500 hover:text-red-700 transition-colors p-2"
              title="Remove item"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="bg-gray-50 rounded-lg p-6 sticky top-8">
          <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div class="space-y-3 mb-6">
            <div class="flex justify-between text-gray-600">
              <span>Items ({{ cartStore.totalItems }})</span>
              <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span class="text-green-600">Free</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>${{ (cartStore.totalPrice * 0.08).toFixed(2) }}</span>
            </div>
            <div class="border-t pt-3 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span class="text-nike-black">${{ (cartStore.totalPrice * 1.08).toFixed(2) }}</span>
            </div>
          </div>

          <button 
            @click="proceedToCheckout"
            class="w-full bg-nike-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors mb-4"
          >
            Proceed to Checkout
          </button>

          <button 
            @click="continueShopping"
            class="w-full border border-nike-black text-nike-black py-3 rounded-lg font-semibold hover:bg-nike-black hover:text-white transition-colors"
          >
            Continue Shopping
          </button>

          <!-- Security Badges -->
          <div class="mt-6 pt-6 border-t border-gray-200">
            <div class="flex items-center justify-center space-x-4 text-gray-500">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span class="text-sm">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>