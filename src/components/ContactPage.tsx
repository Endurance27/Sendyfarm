import React, { useState } from 'react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-stone-900 mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div>
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Get In Touch</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-2xl">📍</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">123 Farm Road, Countryside, ST 12345</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">📞</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">(555) 123-4567</p>
                  <a 
                    href="tel:5551234567"
                    className="text-stone-700 hover:text-stone-800 text-sm"
                  >
                    Call us now →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">📧</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">info@sendyfarm.com</p>
                  <a 
                    href="mailto:info@sendyfarm.com"
                    className="text-stone-700 hover:text-stone-800 text-sm"
                  >
                    Send email →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">💬</div>
                <div>
                  <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                  <p className="text-gray-600">(555) 123-4567</p>
                  <a 
                    href="https://wa.me/5551234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-700 hover:text-stone-800 text-sm"
                  >
                    Chat on WhatsApp →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-amber-50 rounded-xl p-6">
            <h3 className="font-bold text-stone-900 mb-4">Business Hours</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span className="font-semibold">7:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span className="font-semibold">8:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-semibold">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-stone-900 mb-6">Send Us a Message</h2>
          
          {submitted ? (
            <div className="bg-amber-50 border-2 border-amber-500 rounded-lg p-6 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Message Sent!</h3>
              <p className="text-gray-700">
                Thank you for contacting us. We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-600 text-white hover:bg-amber-700 py-3 rounded-lg font-semibold transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-green-100 h-96 flex items-center justify-center">
          <div className="text-center text-gray-600">
            <div className="text-6xl mb-4">🗺️</div>
            <p className="text-lg">Map View</p>
            <p className="text-sm">123 Farm Road, Countryside, ST 12345</p>
          </div>
        </div>
      </div>
    </div>
  );
}