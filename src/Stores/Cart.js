import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('nike-cart')) || [])
  
  // Persist cart to localStorage
  watch(items, (newItems) => {
    localStorage.setItem('nike-cart', JSON.stringify(newItems))
  }, { deep: true })

  const totalItems = computed(() => 
    items.value.reduce((total, item) => total + item.quantity, 0)
  )
  
  const totalPrice = computed(() =>
    items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  )

  const itemCount = computed(() => items.value.length)

  function addToCart(product, selectedSize, selectedColor, quantity = 1) {
    const existingItem = items.value.find(item => 
      item.id === product.id && 
      item.selectedSize === selectedSize && 
      item.selectedColor === selectedColor
    )
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({
        ...product,
        selectedSize,
        selectedColor,
        quantity,
        addedAt: new Date().toISOString()
      })
    }
  }

  function removeFromCart(productId) {
    const index = items.value.findIndex(item => item.id === productId)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  function updateQuantity(productId, quantity) {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  function clearCart() {
    items.value = []
  }

  function getCartItem(productId, size, color) {
    return items.value.find(item => 
      item.id === productId && 
      item.selectedSize === size && 
      item.selectedColor === color
    )
  }

  return {
    items,
    totalItems,
    totalPrice,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItem
  }
})