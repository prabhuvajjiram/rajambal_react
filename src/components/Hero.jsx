function Hero() {
  return (
    <div className="relative h-[80vh] min-h-[500px] bg-gradient-to-r from-[#BE3A8E] to-[#9C2D73] flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Premium Cotton Products
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Experience comfort and quality with Rajambal Cottons
        </p>
        <a
          href="#products"
          className="bg-white text-[#BE3A8E] px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
        >
          Shop Now
        </a>
      </div>
    </div>
  );
}

export default Hero;