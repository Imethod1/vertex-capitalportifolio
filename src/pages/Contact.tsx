import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Thank you for your message. We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Get in touch with us for questions about the Portfolio Management System
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">
                  <a href="mailto:support@vertexcapital.com" className="text-blue-600 hover:text-blue-800">
                    support@vertexcapital.com
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-600">
                  <a href="tel:+255123456789" className="text-blue-600 hover:text-blue-800">
                    +255 123 456 789
                  </a>
                </p>
                <p className="text-sm text-gray-500 mt-1">(Tanzania)</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                <p className="text-gray-600">
                  Dar es Salaam, Tanzania
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Course Project</h3>
                <p className="text-gray-600">
                  Security Analysis and Portfolio Management
                </p>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Office Hours</h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>Monday - Friday: 9:00 AM - 5:00 PM</li>
                  <li>Saturday - Sunday: Closed</li>
                  <li>Response time: Within 24 hours</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please provide details about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I access the admin panel?</h3>
              <p className="text-gray-600">
                Only collaborators on the GitHub repository have access to the admin panel. 
                Contact your project administrator for access.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How often is data updated?</h3>
              <p className="text-gray-600">
                Portfolio data is updated through the Decap CMS admin panel. Changes appear 
                in the public dashboard within 1-2 minutes.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is the Investment Policy Statement (IPS)?</h3>
              <p className="text-gray-600">
                The IPS defines the investment strategy, allocation targets, risk limits, and 
                compliance rules for the portfolio. All allocations must comply with IPS limits.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How is security ensured?</h3>
              <p className="text-gray-600">
                We use GitHub OAuth for authentication, maintain comprehensive audit trails, 
                and enforce role-based access control. All data is encrypted in transit and at rest.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What if I find a bug or security issue?</h3>
              <p className="text-gray-600">
                Please report security issues directly to us via email. Include detailed information 
                about the issue and steps to reproduce it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
