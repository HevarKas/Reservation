export default function Services() {
  return (
    <section id="services" className="min-h-screen bg-white py-12">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800">Our Services</h2>
        <p className="text-lg text-gray-600 mt-2">
          We offer a wide range of services to meet your needs. Here are some of our top services.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {/* Service 1 */}
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Service One</h3>
          <p className="text-gray-600">
            We provide excellent service to help you achieve your goals. Our team is dedicated to ensuring your success.
          </p>
        </div>

        {/* Service 2 */}
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Service Two</h3>
          <p className="text-gray-600">
            With cutting-edge technology, we deliver results that exceed expectations. Let us help you innovate.
          </p>
        </div>

        {/* Service 3 */}
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Service Three</h3>
          <p className="text-gray-600">
            Our customer support is here to assist you 24/7, providing you with the best experience possible.
          </p>
        </div>
      </div>
    </section>
  );
}
