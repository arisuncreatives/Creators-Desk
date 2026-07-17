import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Simulate sending message
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <main className="min-h-[calc(100vh-89px)] bg-creator-white text-creator-black max-w-[1440px] mx-auto flex flex-col md:flex-row">
      
      {/* Left Side: Info */}
      <aside className="w-full md:w-1/3 shrink-0 border-b md:border-b-0 md:border-r border-creator-border p-8 md:p-12 lg:p-16 flex flex-col">
        <h1 className="text-3xl font-light tracking-tight mb-8">Get in Touch</h1>
        <p className="text-sm text-creator-muted leading-relaxed mb-12">
          Whether you have a question about our materials, need help with an existing order, or want to inquire about bulk purchases for your studio, we are here to help.
        </p>

        <div className="space-y-8 mt-auto">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-2">Email</h3>
            <a href="mailto:support@creatorsdesk.com" className="text-sm hover:text-creator-muted transition-colors">
              support@creatorsdesk.com
            </a>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-2">Studio Hours</h3>
            <p className="text-sm text-creator-muted">
              Monday - Friday<br />
              9:00 AM - 6:00 PM (EST)
            </p>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-2">Headquarters</h3>
            <p className="text-sm text-creator-muted">
              123 Creative Blvd<br />
              Austin, TX 78701
            </p>
          </div>
        </div>
      </aside>

      {/* Right Side: Form */}
      <div className="flex-1 p-8 md:p-12 lg:p-24 flex items-center justify-center">
        <div className="w-full max-w-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block">
                <span className="block text-xs uppercase tracking-widest text-creator-muted mb-2">Name</span>
                <input 
                  required 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="w-full border border-creator-border p-4 text-sm outline-none focus:border-creator-black transition-colors bg-transparent" 
                />
              </label>
              <label className="block">
                <span className="block text-xs uppercase tracking-widest text-creator-muted mb-2">Email</span>
                <input 
                  required 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  className="w-full border border-creator-border p-4 text-sm outline-none focus:border-creator-black transition-colors bg-transparent" 
                />
              </label>
            </div>
            
            <label className="block">
              <span className="block text-xs uppercase tracking-widest text-creator-muted mb-2">Subject</span>
              <input 
                required 
                type="text" 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
                className="w-full border border-creator-border p-4 text-sm outline-none focus:border-creator-black transition-colors bg-transparent" 
              />
            </label>
            
            <label className="block">
              <span className="block text-xs uppercase tracking-widest text-creator-muted mb-2">Message</span>
              <textarea 
                required 
                name="message" 
                rows="6" 
                value={formData.message} 
                onChange={handleChange} 
                className="w-full border border-creator-border p-4 text-sm outline-none focus:border-creator-black transition-colors bg-transparent resize-none" 
              />
            </label>
            
            <button 
              type="submit" 
              className={`w-full py-5 text-sm uppercase tracking-widest transition-colors ${
                isSubmitted ? 'bg-green-600 text-white' : 'bg-creator-black text-creator-white hover:bg-gray-900'
              }`}
            >
              {isSubmitted ? 'Message Sent' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

    </main>
  );
};

export default Contact;