function About() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12">About Rajambal Cottons</h1>
        
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <img
              src="/images/about.jpg"
              alt="About Rajambal Cottons"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Rajambal Cottons has been a trusted name in premium cotton products for over 15 years.
              Our commitment to quality and sustainability sets us apart in the textile industry.
            </p>
            <p className="text-gray-600">
              We source the finest cotton and use eco-friendly production methods to create
              comfortable, durable, and stylish clothing for our customers.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Quality</h3>
            <p className="text-gray-600">
              Premium materials and expert craftsmanship in every product
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Tradition</h3>
            <p className="text-gray-600">
              Preserving traditional techniques while embracing modern styles
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
            <p className="text-gray-600">
              Eco-friendly practices and responsible production methods
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;