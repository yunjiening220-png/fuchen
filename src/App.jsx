import React, { useState, useEffect } from 'react'

export default function ToonMyPhotoWebsite() {
  const [currentPage, setCurrentPage] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [products, setProducts] = useState({
    anime: [],
    poster: [],
    wallpaper: [],
  })
  const [formData, setFormData] = useState({
    category: 'anime',
    name: '',
    description: '',
    price: '',
    delivery: '',
    imageUrl: '',
  })
  const [editingId, setEditingId] = useState(null)
  const [contactInfo, setContactInfo] = useState({
    email: 'fuchen@example.com',
    fiverr: '@ToonMyPhoto',
    upwork: '@FuChen',
  })
  const [contactEditOpen, setContactEditOpen] = useState(false)

  useEffect(() => {
    const savedProducts = localStorage.getItem('portfolio_products')
    const savedContact = localStorage.getItem('contact_info')

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    }
    if (savedContact) {
      setContactInfo(JSON.parse(savedContact))
    }
  }, [])

  const saveProducts = (newProducts) => {
    setProducts(newProducts)
    localStorage.setItem('portfolio_products', JSON.stringify(newProducts))
  }

  const saveContactInfo = () => {
    localStorage.setItem('contact_info', JSON.stringify(contactInfo))
    setContactEditOpen(false)
  }

  const handleAddProduct = () => {
    if (!formData.name || !formData.price || !formData.delivery) {
      alert('请填写所有必填项')
      return
    }

    const newProduct = {
      id: editingId || Date.now(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      delivery: parseInt(formData.delivery),
      imageUrl: formData.imageUrl || 'https://placehold.co/600x800?text=' + encodeURIComponent(formData.name),
      createdAt: new Date().toISOString(),
    }

    const newProducts = { ...products }

    if (editingId) {
      newProducts[formData.category] = newProducts[formData.category].map(p =>
        p.id === editingId ? newProduct : p
      )
    } else {
      newProducts[formData.category].push(newProduct)
    }

    saveProducts(newProducts)
    resetForm()
    alert('✅ ' + (editingId ? '产品已更新' : '产品已添加'))
  }

  const handleDeleteProduct = (category, id) => {
    if (!confirm('确定要删除这个作品吗？')) return

    const newProducts = { ...products }
    newProducts[category] = newProducts[category].filter(p => p.id !== id)
    saveProducts(newProducts)
  }

  const handleEditProduct = (category, product) => {
    setFormData({
      category,
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      delivery: product.delivery.toString(),
      imageUrl: product.imageUrl,
    })
    setEditingId(product.id)
    setCurrentPage('manage')
  }

  const resetForm = () => {
    setFormData({
      category: 'anime',
      name: '',
      description: '',
      price: '',
      delivery: '',
      imageUrl: '',
    })
    setEditingId(null)
  }

  const handleOrderClick = (productName, price) => {
    const subject = `询问作品: ${productName}`
    const body = `您好，我对"${productName}"($${price})感兴趣，请告诉我更多信息。`
    window.location.href = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const ProductCard = ({ product, category }) => (
    <div className="group rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 hover:border-purple-500/50 transition">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
        />
      </div>
      <div className="p-6">
        <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
        <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{product.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="bg-zinc-800 rounded-lg p-2">
            <span className="text-zinc-400">交付时间</span>
            <p className="font-semibold">{product.delivery}天</p>
          </div>
          <div className="bg-zinc-800 rounded-lg p-2">
            <span className="text-zinc-400">价格</span>
            <p className="font-semibold text-purple-400">${product.price}</p>
          </div>
        </div>

        <button
          onClick={() => handleOrderClick(product.name, product.price)}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg py-2 font-semibold transition mb-2"
        >
          立即下单
        </button>

        {currentPage === 'manage' && (
          <div className="flex gap-2">
            <button
              onClick={() => handleEditProduct(category, product)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-lg py-1 text-sm transition"
            >
              ✎ 编辑
            </button>
            <button
              onClick={() => handleDeleteProduct(category, product.id)}
              className="flex-1 bg-red-600 hover:bg-red-700 rounded-lg py-1 text-sm transition"
            >
              🗑 删除
            </button>
          </div>
        )}
      </div>
    </div>
  )

  const CategorySection = ({ title, emoji, category, description }) => {
    const categoryProducts = products[category]

    return (
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-3">
            {emoji} {title}
          </h2>
          <p className="text-zinc-400 text-lg">{description}</p>
        </div>

        {categoryProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-400 text-lg">还没有作品，去管理页面添加吧！</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                category={category}
              />
            ))}
          </div>
        )}
      </section>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* 导航栏 */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            FuChen Studio
          </h1>

          <div className="hidden md:flex gap-6">
            {[
              { label: '首页', key: 'home' },
              { label: '🎌 动漫', key: 'anime' },
              { label: '📢 海报', key: 'poster' },
              { label: '🖼️ 壁纸', key: 'wallpaper' },
              { label: '⚙️ 管理', key: 'manage' },
            ].map(item => (
              <button
                key={item.key}
                onClick={() => setCurrentPage(item.key)}
                className={`transition ${
                  currentPage === item.key
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-2xl"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-zinc-900">
            {[
              { label: '首页', key: 'home' },
              { label: '🎌 动漫', key: 'anime' },
              { label: '📢 海报', key: 'poster' },
              { label: '🖼️ 壁纸', key: 'wallpaper' },
              { label: '⚙️ 管理', key: 'manage' },
            ].map(item => (
              <button
                key={item.key}
                onClick={() => {
                  setCurrentPage(item.key)
                  setMobileMenuOpen(false)
                }}
                className="block w-full text-left px-6 py-3 hover:bg-zinc-800 transition"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* 首页 */}
      {currentPage === 'home' && (
        <>
          <section className="relative overflow-hidden border-b border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-700/20 via-pink-600/10 to-cyan-500/10 blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                FuChen Studio
              </h1>

              <p className="mt-6 text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
                专业 AI 生成设计 — 动漫风格、商业海报、高质量壁纸
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setCurrentPage('anime')}
                  className="px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition"
                >
                  浏览作品
                </button>

                <button
                  onClick={() => setCurrentPage('manage')}
                  className="px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/10 transition"
                >
                  管理作品
                </button>
              </div>

              <div className="mt-10 text-zinc-400 text-sm">
                Digital Artist & AI Designer — FuChen
              </div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-6 py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">关于我</h2>

                <p className="text-zinc-300 leading-8 text-lg">
                  您好，我是 FuChen —— 专业的数字肖像艺术家，擅长 AI 辅助的动漫肖像、角色设计、宠物肖像和艺术照片转换。
                </p>

                <p className="text-zinc-400 leading-8 mt-6">
                  为个人、情侣、家庭和宠物创建个性化艺术作品，具有表达力强的角色设计和视觉叙述能力。
                </p>
              </div>

              <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="https://placehold.co/900x700?text=FuChen+Art+Studio"
                  alt="Featured Artwork"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
            <h2 className="text-4xl font-bold mb-12">服务</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: '动漫肖像',
                  desc: '将您的照片转换为动漫风格的艺术作品。',
                },
                {
                  title: '情侣&家庭',
                  desc: '为礼物和回忆创建美丽的风格化肖像。',
                },
                {
                  title: '宠物肖像',
                  desc: '个性十足的自定义宠物插图。',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-8 rounded-3xl bg-zinc-900 border border-white/10 hover:border-purple-500/50 transition"
                >
                  <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-zinc-400 leading-7">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-4xl mx-auto px-6 py-24 text-center border-t border-white/10">
            <h2 className="text-4xl font-bold">联系我</h2>

            <p className="text-zinc-400 mt-6 text-lg leading-8">
              对自定义肖像或合作感兴趣？
            </p>

            <div className="mt-10 space-y-3 text-lg">
              <p>
                📧 Email:{' '}
                <a href={`mailto:${contactInfo.email}`} className="text-purple-400 hover:text-purple-300">
                  {contactInfo.email}
                </a>
              </p>
              <p>💬 Fiverr: {contactInfo.fiverr}</p>
              <p>💼 Upwork: {contactInfo.upwork}</p>
            </div>
          </section>
        </>
      )}

      {currentPage === 'anime' && (
        <CategorySection
          title="动漫主题"
          emoji="🎌"
          category="anime"
          description="高质量 AI 生成的动漫风格作品"
        />
      )}

      {currentPage === 'poster' && (
        <CategorySection
          title="海报宣传"
          emoji="📢"
          category="poster"
          description="专业商业海报和宣传设计"
        />
      )}

      {currentPage === 'wallpaper' && (
        <CategorySection
          title="壁纸设计"
          emoji="🖼️"
          category="wallpaper"
          description="高分辨率壁纸定制服务"
        />
      )}

      {currentPage === 'manage' && (
        <section className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold mb-8">📝 管理作品</h2>

          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">联系信息</h3>
              <button
                onClick={() => setContactEditOpen(!contactEditOpen)}
                className="text-purple-400 hover:text-purple-300"
              >
                {contactEditOpen ? '保存' : '编辑'}
              </button>
            </div>

            {contactEditOpen ? (
              <div className="space-y-4">
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={e => setContactInfo({ ...contactInfo, email: e.target.value })}
                  placeholder="邮箱"
                  className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white"
                />
                <input
                  type="text"
                  value={contactInfo.fiverr}
                  onChange={e => setContactInfo({ ...contactInfo, fiverr: e.target.value })}
                  placeholder="Fiverr 用户名"
                  className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white"
                />
                <input
                  type="text"
                  value={contactInfo.upwork}
                  onChange={e => setContactInfo({ ...contactInfo, upwork: e.target.value })}
                  placeholder="Upwork 用户名"
                  className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white"
                />
                <button
                  onClick={saveContactInfo}
                  className="w-full bg-purple-600 hover:bg-purple-700 rounded-lg py-2 font-semibold transition"
                >
                  保存信息
                </button>
              </div>
            ) : (
              <div className="space-y-2 text-zinc-300">
                <p>📧 {contactInfo.email}</p>
                <p>💬 {contactInfo.fiverr}</p>
                <p>💼 {contactInfo.upwork}</p>
              </div>
            )}
          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 mb-8">
            <h3 className="text-2xl font-semibold mb-6">
              {editingId ? '编辑作品' : '添加新作品'}
            </h3>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">分类</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="anime">🎌 动漫主题</option>
                    <option value="poster">📢 海报宣传</option>
                    <option value="wallpaper">🖼️ 壁纸设计</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">作品名称 *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="例: 女性角色设计"
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">描述</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="描述这个作品的详细信息"
                  className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white min-h-24"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">价格 ($) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                    placeholder="30"
                    min="1"
                    step="0.01"
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">交付天数 *</label>
                  <input
                    type="number"
                    value={formData.delivery}
                    onChange={e => setFormData({ ...formData, delivery: e.target.value })}
                    placeholder="3"
                    min="1"
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">图片 URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddProduct}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 rounded-lg py-2 font-semibold transition"
                >
                  {editingId ? '更新作品' : '+ 添加作品'}
                </button>
                {editingId && (
                  <button
                    onClick={resetForm}
                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 rounded-lg py-2 font-semibold transition"
                  >
                    取消
                  </button>
                )}
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-6">已添加的作品</h3>

          {Object.entries(products).map(([category, categoryProducts]) => (
            categoryProducts.length > 0 && (
              <div key={category} className="mb-8">
                <h4 className="text-lg font-semibold text-purple-400 mb-4">
                  {category === 'anime'
                    ? '🎌 动漫主题'
                    : category === 'poster'
                      ? '📢 海报宣传'
                      : '🖼️ 壁纸设计'}
                </h4>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      category={category}
                    />
                  ))}
                </div>
              </div>
            )
          ))}

          {Object.values(products).every(arr => arr.length === 0) && (
            <div className="text-center py-12 bg-zinc-900 rounded-2xl border border-white/10">
              <p className="text-zinc-400 text-lg">还没有添加任何作品，快来添加第一个吧！</p>
            </div>
          )}
        </section>
      )}

      <footer className="border-t border-white/10 py-8 text-center text-zinc-500 text-sm">
        © 2026 FuChen Studio — All Rights Reserved.
      </footer>
    </div>
  )
}
