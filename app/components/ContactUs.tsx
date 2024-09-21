export default function ContactUs() {
    return (
      <section id="contact-us" className="min-h-screen bg-gray-50 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Contact Us</h2>
          <p className="text-base sm:text-lg text-gray-600 mt-2">
            Feel free to get in touch with us for any inquiries or support.
          </p>
        </div>
  
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-5">Our Contact Information</h3>
  
            <p className="text-gray-700 mb-4">
              <strong>Address:</strong> 123 Main Street, City, Country
            </p>
  
            <p className="text-gray-700 mb-4">
              <strong>Phone:</strong> (123) 456-7890
            </p>
  
            <p className="text-gray-700 mb-4">
              <strong>Email:</strong> info@example.com
            </p>
  
            <p className="text-gray-700 mb-4">
              <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM
            </p>
  
            <div className="mt-8">
              <h4 className="text-xl sm:text-2xl font-semibold text-gray-800">Follow Us</h4>
              <p className="text-gray-700">We are active on social media. Follow us to stay updated:</p>
              <div className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4 mt-4">
                {/* Social media icons */}
                <a href="ff" className="text-blue-600 hover:text-blue-800 mb-2 sm:mb-0">Facebook</a>
                <a href="dd" className="text-blue-400 hover:text-blue-600 mb-2 sm:mb-0">Twitter</a>
                <a href="ss" className="text-pink-600 hover:text-pink-800 mb-2 sm:mb-0">Instagram</a>
                <a href="asa" className="text-red-600 hover:text-red-800 mb-2 sm:mb-0">YouTube</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  