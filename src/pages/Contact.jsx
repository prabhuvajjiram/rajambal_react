import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { submitContact } from '../api';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: () => {
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#BE3A8E]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#BE3A8E]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#BE3A8E]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#BE3A8E] h-32"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#BE3A8E] to-[#9C2D73] text-white py-2 rounded-lg hover:opacity-90 transition-opacity"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="text-gray-600">37, Mettu Street, Kanchipuram</p>
              </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-gray-600">+91-9445069336</p>
                <p className="text-gray-600">+91-9443369336</p>
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600">sales@rajambalcottons.com</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold mb-4">Location</h3>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.0647748982713!2d79.70246931482038!3d12.835543990947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52c1df7e7c2c6d%3A0x5c0d8d688e5aea9f!2s37%2C%20Mettu%20St%2C%20Ennaikkaran%2C%20Kanchipuram%2C%20Tamil%20Nadu%20631501%2C%20India!5e0!3m2!1sen!2sus!4v1623344120978!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;