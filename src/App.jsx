export default function ToonMyPhotoWebsite() {
  const categories = [
    {
      title: 'Single Portraits',
      images: [
        'https://placehold.co/600x800?text=Single+Portrait+1',
        'https://placehold.co/600x800?text=Single+Portrait+2',
      ],
    },
    {
      title: 'Couples & Family',
      images: [
        'https://placehold.co/800x600?text=Family+Portrait+1',
        'https://placehold.co/800x600?text=Family+Portrait+2',
      ],
    },
    {
      title: 'Pets',
      images: [
        'https://placehold.co/700x700?text=Pet+Portrait+1',
        'https://placehold.co/700x700?text=Pet+Portrait+2',
      ],
    },
    {
      title: 'Artistic Portraits',
      images: [
        'https://placehold.co/800x1000?text=Artistic+Portrait+1',
        'https://placehold.co/800x1000?text=Artistic+Portrait+2',
      ],
    },
  ]

  const videos = [
    {
      title: 'Anime Transformation Demo',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700/20 via-pink-600/10 to-cyan-500/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            ToonMyPhoto
          </h1>

          <p className="mt-6 text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Turning your photos into unique cartoon and artistic portraits.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#portfolio"
              className="px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition"
            >
              View Portfolio
            </a>

            <a
              href="#contact"
              className="px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/10 transition"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-10 text-zinc-400 text-sm">
            Digital Artist & Character Designer — FuChen
          </div>
        </div>
      </section>

      {/* About */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">About Me</h2>

            <p className="text-zinc-300 leading-8 text-lg">
              Hi, I'm FuChen — a digital portrait artist specializing in
              AI-assisted cartoon portraits, anime-style illustrations,
              pet portraits, and artistic photo transformations.
            </p>

            <p className="text-zinc-400 leading-8 mt-6">
              I create custom artwork for individuals, couples, families,
              and pets with expressive character design and visual storytelling.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="https://placehold.co/900x700?text=Your+Best+Artwork"
              alt="Featured Artwork"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-12">Portfolio</h2>

        <div className="space-y-20">
          {categories.map((category, index) => (
            <div key={index}>
              <h3 className="text-2xl font-semibold mb-8">
                {category.title}
              </h3>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.images.map((image, i) => (
                  <div
                    key={i}
                    className="group rounded-3xl overflow-hidden border border-white/10 bg-zinc-900"
                  >
                    <img
                      src={image}
                      alt={category.title}
                      className="w-full h-80 object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Videos */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
        <h2 className="text-4xl font-bold mb-12">Video Showcase</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <div
              key={index}
              className="rounded-3xl overflow-hidden border border-white/10 bg-zinc-900"
            >
              <iframe
                className="w-full aspect-video"
                src={video.url}
                title={video.title}
                allowFullScreen
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
        <h2 className="text-4xl font-bold mb-12">Services</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Anime Portraits',
              desc: 'Transform your photos into anime-inspired artwork.',
            },
            {
              title: 'Family & Couples',
              desc: 'Beautiful stylized portraits for gifts and memories.',
            },
            {
              title: 'Pet Portraits',
              desc: 'Custom pet illustrations full of personality.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl bg-zinc-900 border border-white/10"
            >
              <h3 className="text-2xl font-semibold mb-4">
                {item.title}
              </h3>

              <p className="text-zinc-400 leading-7">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="max-w-4xl mx-auto px-6 py-24 text-center border-t border-white/10"
      >
        <h2 className="text-4xl font-bold">Contact</h2>

        <p className="text-zinc-400 mt-6 text-lg leading-8">
          Interested in a custom portrait or collaboration?
        </p>

        <div className="mt-10 space-y-3 text-lg">
          <p>Email: your@email.com</p>
          <p>Fiverr: @ToonMyPhoto</p>
          <p>Artist Name: FuChen</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-zinc-500 text-sm">
        © 2026 ToonMyPhoto — All Rights Reserved.
      </footer>
    </div>
  )
}