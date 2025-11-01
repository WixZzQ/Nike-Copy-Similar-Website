<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useToast } from 'vue-toastification'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const toast = useToast()

const product = ref(null)
const selectedSize = ref('')
const selectedColor = ref('')
const quantity = ref(1)
const activeImage = ref(0)
const loading = ref(false)

// Mock product data - replace with API call
const products = [
  {
    id: 1,
    name: "Nike Air Force 1 '07",
    price: 100,
    originalPrice: 110,
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500",
    images: [
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    ],
    category: "Lifestyle",
    description: "The radiance lives on in the Nike Air Force 1 '07. Crossing hardwood comfort with off-court flair, this hoops original puts a fresh spin on what you know best: crisp leather, bold colors and the perfect amount of flash to make you shine.",
    features: [
      "Leather and synthetic upper",
      "Perforations on the toe",
      "Rubber sole for traction", 
      "Padded collar for comfort",
      "Air-Sole unit for cushioning",
      "Classic design for everyday wear"
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: [
      { name: 'White', value: '#FFFFFF' },
      { name: 'Black', value: '#000000' },
      { name: 'Red', value: '#FF0000' }
    ],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 1247,
    releaseDate: '2024-01-15',
    tags: ['bestseller', 'new', 'limited'],
    specifications: {
      "Style": "CW2288-111",
      "Color": "White/White",
      "Material": "Leather & Synthetic",
      "Closure": "Lace-up",
      "Fit": "True to size"
    }
  },
  {
    id: 2,
    name: "Nike Dunk Low Retro",
    price: 110,
    originalPrice: 120,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500"
    ],
    category: "Lifestyle",
    description: "Created for the hardwood but taken to the streets, the Nike Dunk Low returns with classic colors and timeless style. Its padded, low-cut collar lets you take your game anywhere—in comfort.",
    features: [
      "Leather upper for durability",
      "Foam midsole for comfort",
      "Rubber sole for grip",
      "Padded collar for ankle support",
      "Classic Nike branding"
    ],
    sizes: ['7', '8', '9', '10', '11'],
    colors: [
      { name: 'Black/White', value: '#000000' },
      { name: 'University Blue', value: '#0066CC' },
      { name: 'Green', value: '#00AA00' }
    ],
    inStock: true,
    featured: true,
    rating: 4.6,
    reviewCount: 892,
    releaseDate: '2024-02-01',
    tags: ['retro', 'classic'],
    specifications: {
      "Style": "DD1391-100",
      "Color": "Black/White",
      "Material": "Leather",
      "Closure": "Lace-up", 
      "Fit": "True to size"
    }
  },
  {
    id: 3,
    name: "Nike Air Max 270",
    price: 150,
    originalPrice: 160,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500",
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500"
    ],
    category: "Running",
    description: "The Nike Air Max 270 delivers a comfortable fit and bold style that's perfect for your everyday look. The large Air Max unit provides lightweight cushioning for all-day comfort.",
    features: [
      "Large Air Max unit",
      "Breathable mesh upper", 
      "Lightweight design",
      "Comfortable fit for all-day wear",
      "Durable rubber outsole"
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'White', value: '#FFFFFF' },
      { name: 'Red', value: '#FF0000' }
    ],
    inStock: true,
    featured: true,
    rating: 4.4,
    reviewCount: 1563,
    releaseDate: '2024-01-20',
    tags: ['airmax', 'comfort'],
    specifications: {
      "Style": "AH8050-002",
      "Color": "Black/Photo Blue",
      "Material": "Mesh & Synthetic",
      "Closure": "Lace-up",
      "Fit": "True to size"
    }
  }
]

const relatedProducts = computed(() => {
  if (!product.value) return []
  return products.filter(p => p.id !== product.value.id && p.category === product.value.category).slice(0, 4)
})

const isInCart = computed(() => {
  if (!product.value) return false
  return cartStore.items.some(item => item.id === product.value.id)
})

onMounted(() => {
  loadProduct()
})

function loadProduct() {
  const productId = parseInt(route.params.id)
  product.value = products.find(p => p.id === productId)
  
  if (!product.value) {
    router.push('/')
    return
  }

  selectedSize.value = product.value.sizes[0]
  selectedColor.value = product.value.colors[0]
}

function addToCart() {
  if (!selectedSize.value) {
    toast.warning('Please select a size')
    return
  }

  loading.value = true

  const cartItem = {
    ...product.value,
    selectedSize: selectedSize.value,
    selectedColor: selectedColor.value.name,
    quantity: quantity.value
  }

  cartStore.addToCart(
    product.value,
    selectedSize.value,
    selectedColor.value.name,
    quantity.value
  )

  setTimeout(() => {
    loading.value = false
    toast.success('Added to cart!')
  }, 500)
}

function buyNow() {
  addToCart()
  router.push('/cart')
}

function setActiveImage(index) {
  activeImage.value = index
}

function navigateToProduct(productId) {
  router.push(`/product/${productId}`)
}
</script>

<template>
  <div v-if="product" class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <nav class="flex mb-8 text-sm text-gray-600">
      <router-link to="/" class="hover:text-nike-black">Home</router-link>
      <span class="mx-2">/</span>
      <span class="text-nike-black">{{ product.category }}</span>
      <span class="mx-2">/</span>
      <span class="text-nike-black font-medium">{{ product.name }}</span>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Product Images -->
      <div>
        <div class="bg-gray-100 rounded-lg overflow-hidden mb-4">
          <img 
            :src="product.images[activeImage]" 
            :alt="product.name"
            class="w-full h-96 object-cover"
          >
        </div>
        <div class="grid grid-cols-4 gap-4">
          <img 
            v-for="(img, index) in product.images" 
            :key="index"
            :src="img" 
            :alt="product.name"
            @click="setActiveImage(index)"
            :class="[
              'w-full h-24 object-cover rounded-lg cursor-pointer transition-all border-2',
              activeImage === index ? 'border-nike-black' : 'border-transparent hover:border-gray-300'
            ]"
          >
        </div>
      </div>

      <!-- Product Info -->
      <div>
        <!-- Product Header -->
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-nike-black mb-2">
            {{ product.name }}
          </h1>
          
          <!-- Rating -->
          <div class="flex items-center mb-4">
            <div class="flex items-center">
              <span class="text-yellow-400 mr-1">★</span>
              <span class="font-semibold">{{ product.rating }}</span>
            </div>
            <span class="mx-2 text-gray-300">•</span>
            <span class="text-gray-600">{{ product.reviewCount }} reviews</span>
            <span v-if="!product.inStock" class="ml-4 text-red-500 font-semibold">
              Out of Stock
            </span>
          </div>

          <!-- Price -->
          <div class="flex items-center mb-4">
            <p class="text-2xl font-bold text-nike-black mr-3">
              ${{ product.price }}
            </p>
            <p v-if="product.originalPrice" class="text-lg text-gray-500 line-through">
              ${{ product.originalPrice }}
            </p>
            <span 
              v-if="product.originalPrice"
              class="ml-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold"
            >
              Save ${{ product.originalPrice - product.price }}
            </span>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mb-4">
            <span 
              v-for="tag in product.tags" 
              :key="tag"
              class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium capitalize"
            >
              {{ tag }}
            </span>
          </div>
        </div>
        
        <p class="text-gray-600 mb-8 leading-relaxed">
          {{ product.description }}
        </p>

        <!-- Size Selection -->
        <div class="mb-6">
          <h3 class="font-semibold mb-3">Size</h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="size in product.sizes"
              :key="size"
              @click="selectedSize = size"
              :class="[
                'w-12 h-12 border rounded-lg font-medium transition-colors',
                selectedSize === size
                  ? 'bg-nike-black text-white border-nike-black'
                  : 'border-gray-300 hover:border-nike-black',
                !product.inStock ? 'opacity-50 cursor-not-allowed' : ''
              ]"
              :disabled="!product.inStock"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <!-- Color Selection -->
        <div class="mb-6">
          <h3 class="font-semibold mb-3">Color: {{ selectedColor.name }}</h3>
          <div class="flex gap-2">
            <button
              v-for="color in product.colors"
              :key="color.name"
              @click="selectedColor = color"
              :class="[
                'px-4 py-2 border rounded-lg font-medium transition-colors flex items-center gap-2',
                selectedColor.name === color.name
                  ? 'bg-nike-black text-white border-nike-black'
                  : 'border-gray-300 hover:border-nike-black',
                !product.inStock ? 'opacity-50 cursor-not-allowed' : ''
              ]"
              :disabled="!product.inStock"
            >
              <span 
                class="w-4 h-4 rounded-full border"
                :style="{ backgroundColor: color.value }"
              ></span>
              {{ color.name }}
            </button>
          </div>
        </div>

        <!-- Quantity -->
        <div class="mb-6">
          <h3 class="font-semibold mb-3">Quantity</h3>
          <div class="flex items-center gap-4">
            <button 
              @click="quantity > 1 ? quantity-- : null"
              :class="[
                'w-8 h-8 rounded-full border flex items-center justify-center transition-colors',
                quantity === 1 
                  ? 'text-gray-400 border-gray-300 cursor-not-allowed' 
                  : 'text-nike-black border-nike-black hover:bg-gray-50'
              ]"
              :disabled="quantity === 1"
            >
              -
            </button>
            <span class="font-semibold w-8 text-center">{{ quantity }}</span>
            <button 
              @click="quantity++"
              :class="[
                'w-8 h-8 rounded-full border flex items-center justify-center transition-colors',
                !product.inStock
                  ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                  : 'text-nike-black border-nike-black hover:bg-gray-50'
              ]"
              :disabled="!product.inStock"
            >
              +
            </button>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-4 mb-8">
          <button
            @click="addToCart"
            :disabled="loading || !product.inStock || isInCart"
            :class="[
              'flex-1 py-3 px-6 rounded-lg font-semibold transition-colors',
              isInCart
                ? 'bg-green-600 text-white cursor-not-allowed'
                : loading || !product.inStock
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-nike-black text-white hover:bg-gray-800'
            ]"
          >
            {{ 
              isInCart ? 'Added to Cart' :
              loading ? 'Adding...' :
              !product.inStock ? 'Out of Stock' :
              'Add to Cart'
            }}
          </button>
          <button
            @click="buyNow"
            :disabled="!product.inStock"
            :class="[
              'flex-1 border py-3 px-6 rounded-lg font-semibold transition-colors',
              !product.inStock
                ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                : 'border-nike-black text-nike-black hover:bg-nike-black hover:text-white'
            ]"
          >
            Buy Now
          </button>
        </div>

        <!-- Features -->
        <div class="border-t pt-6 mb-6">
          <h3 class="font-semibold mb-3 text-lg">Product Features</h3>
          <ul class="text-gray-600 space-y-2">
            <li v-for="feature in product.features" :key="feature" class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              {{ feature }}
            </li>
          </ul>
        </div>

        <!-- Specifications -->
        <div class="border-t pt-6">
          <h3 class="font-semibold mb-3 text-lg">Specifications</h3>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div v-for="(value, key) in product.specifications" :key="key" class="flex justify-between border-b pb-2">
              <span class="text-gray-600 font-medium">{{ key }}:</span>
              <span class="text-nike-black">{{ value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Products -->
    <section v-if="relatedProducts.length" class="mt-16">
      <h2 class="text-2xl font-bold mb-8">You Might Also Like</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="relatedProduct in relatedProducts" 
          :key="relatedProduct.id"
          class="group cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          @click="navigateToProduct(relatedProduct.id)"
        >
          <div class="bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img 
              :src="relatedProduct.image" 
              :alt="relatedProduct.name"
              class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            >
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-nike-black mb-1 hover:text-nike-gray transition-colors">
              {{ relatedProduct.name }}
            </h3>
            <p class="text-nike-gray font-medium">${{ relatedProduct.price }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- Loading State -->
  <div v-else class="container mx-auto px-4 py-16">
    <div class="animate-pulse">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div class="bg-gray-200 rounded-lg h-96 mb-4"></div>
          <div class="grid grid-cols-4 gap-4">
            <div v-for="i in 4" :key="i" class="bg-gray-200 rounded-lg h-24"></div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="bg-gray-200 rounded h-8 w-3/4"></div>
          <div class="bg-gray-200 rounded h-4 w-1/2"></div>
          <div class="bg-gray-200 rounded h-6 w-1/4"></div>
          <div class="space-y-2">
            <div class="bg-gray-200 rounded h-4 w-full"></div>
            <div class="bg-gray-200 rounded h-4 w-5/6"></div>
            <div class="bg-gray-200 rounded h-4 w-4/6"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>