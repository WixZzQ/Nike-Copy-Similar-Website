import axios from 'axios'

const API_BASE_URL = 'https://api.nike.com' // Replace with your actual API
const MOCK_API_DELAY = 500 // Simulate API delay

// Mock data service - Replace with real API calls
class NikeApiService {
  async getProducts(filters = {}) {
    await this.delay(MOCK_API_DELAY)
    
    let products = [...this.mockProducts]
    
    // Apply filters
    if (filters.category && filters.category !== 'all') {
      products = products.filter(p => 
        p.category.toLowerCase() === filters.category.toLowerCase()
      )
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
      )
    }
    
    if (filters.sort) {
      products = this.sortProducts(products, filters.sort)
    }
    
    return {
      data: products,
      total: products.length,
      page: filters.page || 1,
      limit: filters.limit || 12
    }
  }

  async getProduct(id) {
    await this.delay(MOCK_API_DELAY)
    const product = this.mockProducts.find(p => p.id === parseInt(id))
    
    if (!product) {
      throw new Error('Product not found')
    }
    
    return { data: product }
  }

  async getCategories() {
    await this.delay(MOCK_API_DELAY)
    return { data: this.mockCategories }
  }

  async getFeaturedProducts() {
    await this.delay(MOCK_API_DELAY)
    const featured = this.mockProducts.filter(p => p.featured)
    return { data: featured }
  }

  async searchProducts(query, filters = {}) {
    return this.getProducts({ search: query, ...filters })
  }

  async getRelatedProducts(productId, limit = 4) {
    await this.delay(MOCK_API_DELAY)
    const product = this.mockProducts.find(p => p.id === parseInt(productId))
    if (!product) return { data: [] }

    const related = this.mockProducts
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, limit)

    return { data: related }
  }

  sortProducts(products, sortBy) {
    const sorted = [...products]
    
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price)
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price)
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case 'newest':
        return sorted.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
      default:
        return sorted
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  mockCategories = [
    {
      id: 1,
      name: "Running",
      slug: "running",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
      description: "Lightweight and responsive running shoes",
      productCount: 8
    },
    {
      id: 2,
      name: "Basketball",
      slug: "basketball",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400",
      description: "High-performance hoops shoes",
      productCount: 6
    },
    {
      id: 3,
      name: "Lifestyle",
      slug: "lifestyle",
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400",
      description: "Comfort meets style",
      productCount: 12
    },
    {
      id: 4,
      name: "Training",
      slug: "training",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
      description: "For gym and cross-training",
      productCount: 5
    }
  ]

  mockProducts = [
    {
      id: 1,
      name: "Nike Air Force 1 '07",
      price: 100,
      originalPrice: 110,
      image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500",
      images: [
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500",
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500"
      ],
      category: "Lifestyle",
      description: "The radiance lives on in the Nike Air Force 1 '07. Crossing hardwood comfort with off-court flair, this hoops original puts a fresh spin on what you know best: crisp leather, bold colors and the perfect amount of flash to make you shine.",
      features: ["Leather and synthetic upper", "Perforations on the toe", "Rubber sole for traction", "Padded collar for comfort"],
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
      tags: ['bestseller', 'new', 'limited']
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
      description: "Created for the hardwood but taken to the streets, the Nike Dunk Low returns with classic colors and timeless style.",
      features: ["Leather upper", "Rubber sole", "Padded collar", "Classic design"],
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
      tags: ['retro', 'classic']
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
      description: "The Nike Air Max 270 delivers a comfortable fit and bold style that's perfect for your everyday look.",
      features: ["Air Max unit", "Breathable mesh", "Lightweight design", "Comfortable fit"],
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
      tags: ['airmax', 'comfort']
    },
    {
      id: 4,
      name: "Nike Blazer Mid '77",
      price: 105,
      originalPrice: 115,
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
      images: [
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500"
      ],
      category: "Lifestyle",
      description: "The Nike Blazer Mid '77 Vintage harnesses the old-school look of Nike Basketball with a vintage midsole finish.",
      features: ["Leather upper", "Vintage finish", "Rubber sole", "Classic design"],
      sizes: ['7', '8', '9', '10', '11'],
      colors: [
        { name: 'White', value: '#FFFFFF' },
        { name: 'Black', value: '#000000' },
        { name: 'Sail', value: '#F5F5DC' }
      ],
      inStock: true,
      featured: false,
      rating: 4.3,
      reviewCount: 734,
      releaseDate: '2024-01-10',
      tags: ['vintage', 'classic']
    },
    {
      id: 5,
      name: "Nike React Infinity Run Flyknit",
      price: 160,
      originalPrice: 170,
      image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500",
      images: [
        "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500"
      ],
      category: "Running",
      description: "The Nike React Infinity Run Flyknit is designed to help reduce injury and keep you running.",
      features: ["React foam", "Flyknit upper", "Wide platform", "Secure fit"],
      sizes: ['7', '8', '9', '10', '11', '12'],
      colors: [
        { name: 'Black', value: '#000000' },
        { name: 'White', value: '#FFFFFF' },
        { name: 'Blue', value: '#0000FF' }
      ],
      inStock: true,
      featured: true,
      rating: 4.7,
      reviewCount: 2104,
      releaseDate: '2024-02-15',
      tags: ['react', 'flyknit', 'running']
    },
    {
      id: 6,
      name: "Air Jordan 1 High OG",
      price: 170,
      originalPrice: 180,
      image: "https://images.unsplash.com/photo-1584735175097-719d848f8449?w=500",
      images: [
        "https://images.unsplash.com/photo-1584735175097-719d848f8449?w=500",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
      ],
      category: "Basketball",
      description: "The Air Jordan 1 High OG shatters the barriers between fashion, music and sport wherever it goes.",
      features: ["Leather upper", "Air-Sole unit", "High-top design", "Classic colors"],
      sizes: ['7', '8', '9', '10', '11', '12', '13'],
      colors: [
        { name: 'Chicago', value: '#CC0000' },
        { name: 'Black/Red', value: '#000000' },
        { name: 'Royal Blue', value: '#0000CC' }
      ],
      inStock: false,
      featured: true,
      rating: 4.9,
      reviewCount: 3125,
      releaseDate: '2024-02-20',
      tags: ['jordan', 'bestseller', 'limited']
    },
    {
      id: 7,
      name: "Nike Metcon 8",
      price: 130,
      originalPrice: 140,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
      images: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500"
      ],
      category: "Training",
      description: "The Nike Metcon 8 is our most trusted shoe for training. Even more durable than previous versions, it can withstand your toughest workouts.",
      features: ["Durable design", "Stable platform", "Breathable mesh", "Secure fit"],
      sizes: ['6', '7', '8', '9', '10', '11'],
      colors: [
        { name: 'Black', value: '#000000' },
        { name: 'White', value: '#FFFFFF' },
        { name: 'Red', value: '#FF0000' }
      ],
      inStock: true,
      featured: false,
      rating: 4.5,
      reviewCount: 867,
      releaseDate: '2024-01-25',
      tags: ['training', 'crossfit']
    },
    {
      id: 8,
      name: "Nike Pegasus 40",
      price: 120,
      originalPrice: 130,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
      images: [
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500"
      ],
      category: "Running",
      description: "The Nike Pegasus 40 continues to be a great shoe for daily running with responsive cushioning and a comfortable fit.",
      features: ["Responsive foam", "Breathable upper", "Durable outsole", "Comfortable fit"],
      sizes: ['6', '7', '8', '9', '10', '11', '12'],
      colors: [
        { name: 'Blue', value: '#0000FF' },
        { name: 'Black', value: '#000000' },
        { name: 'Green', value: '#00AA00' }
      ],
      inStock: true,
      featured: true,
      rating: 4.6,
      reviewCount: 1890,
      releaseDate: '2024-02-10',
      tags: ['pegasus', 'running', 'daily']
    }
  ]
}

export default new NikeApiService()