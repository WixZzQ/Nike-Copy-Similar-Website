import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import NikeApiService from '../services/api'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const featuredProducts = ref([])
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)
  const currentProduct = ref(null)
  const relatedProducts = ref([])

  const searchQuery = ref('')
  const selectedCategory = ref('all')
  const sortBy = ref('newest')
  const currentPage = ref(1)
  const itemsPerPage = ref(12)

  const filteredProducts = computed(() => {
    let filtered = [...products.value]

    // Apply search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      )
    }

    // Apply category filter
    if (selectedCategory.value !== 'all') {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === selectedCategory.value.toLowerCase()
      )
    }

    // Apply sorting
    filtered = NikeApiService.sortProducts(filtered, sortBy.value)

    return filtered
  })

  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredProducts.value.slice(start, end)
  })

  const totalPages = computed(() => 
    Math.ceil(filteredProducts.value.length / itemsPerPage.value)
  )

  const categoriesWithCount = computed(() => {
    const categoryCounts = {}
    products.value.forEach(product => {
      categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1
    })

    return [
      { 
        name: 'All', 
        value: 'all', 
        count: products.value.length,
        slug: 'all'
      },
      ...categories.value.map(cat => ({
        ...cat,
        value: cat.slug,
        count: categoryCounts[cat.name] || 0
      }))
    ]
  })

  async function fetchProducts(filters = {}) {
    loading.value = true
    error.value = null
    
    try {
      const response = await NikeApiService.getProducts({
        category: selectedCategory.value,
        search: searchQuery.value,
        sort: sortBy.value,
        page: currentPage.value,
        limit: itemsPerPage.value,
        ...filters
      })
      products.value = response.data
    } catch (err) {
      error.value = err.message
      console.error('Error fetching products:', err)
    } finally {
      loading.value = false
    }
  }

  async function fetchFeaturedProducts() {
    loading.value = true
    try {
      const response = await NikeApiService.getFeaturedProducts()
      featuredProducts.value = response.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories() {
    loading.value = true
    try {
      const response = await NikeApiService.getCategories()
      categories.value = response.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function fetchProduct(id) {
    loading.value = true
    error.value = null
    try {
      const response = await NikeApiService.getProduct(id)
      currentProduct.value = response.data
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchRelatedProducts(productId, limit = 4) {
    try {
      const response = await NikeApiService.getRelatedProducts(productId, limit)
      relatedProducts.value = response.data
    } catch (err) {
      console.error('Error fetching related products:', err)
      relatedProducts.value = []
    }
  }

  async function searchProducts(query, filters = {}) {
    searchQuery.value = query
    return fetchProducts(filters)
  }

  function setCategory(category) {
    selectedCategory.value = category
    currentPage.value = 1
    fetchProducts()
  }

  function setSort(sort) {
    sortBy.value = sort
    fetchProducts()
  }

  function setPage(page) {
    currentPage.value = page
    fetchProducts()
  }

  function clearFilters() {
    searchQuery.value = ''
    selectedCategory.value = 'all'
    sortBy.value = 'newest'
    currentPage.value = 1
    fetchProducts()
  }

  return {
    // State
    products,
    featuredProducts,
    categories,
    loading,
    error,
    currentProduct,
    relatedProducts,
    searchQuery,
    selectedCategory,
    sortBy,
    currentPage,
    itemsPerPage,

    // Computed
    filteredProducts,
    paginatedProducts,
    totalPages,
    categoriesWithCount,

    // Actions
    fetchProducts,
    fetchFeaturedProducts,
    fetchCategories,
    fetchProduct,
    fetchRelatedProducts,
    searchProducts,
    setCategory,
    setSort,
    setPage,
    clearFilters
  }
})