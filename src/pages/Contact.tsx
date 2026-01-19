import React from 'react';

const Contact: React.FC = () => {
  const WHATSAPP_PHONE = '255620400025';
  const DEFAULT_MESSAGE =
    'Hi Vertex Capital, I would like to discuss the portfolio and next steps.';

  const isMobile = () => {
    if (typeof navigator === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(DEFAULT_MESSAGE);
    const phone = encodeURIComponent(WHATSAPP_PHONE);
    const appLink = `whatsapp://send?phone=${phone}&text=${text}`;
    const webLink = `https://wa.me/${phone}?text=${text}`;

    const target = isMobile() ? appLink : webLink;
    window.open(target, '_blank', 'noopener,noreferrer');
  };

  const mailTo = () => {
    const subject = encodeURIComponent('Vertex Capital — Inquiry');
    const body = encodeURIComponent(DEFAULT_MESSAGE);
    window.location.href = `mailto:ibrahimndarifanye0025@gmail.com?subject=${subject}&body=${body}`;
  };

  const callNow = () => {
    window.location.href = `tel:+${WHATSAPP_PHONE}`;
  };

  return (
    <div className="p-6 md:p-8">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 p-6 md:p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Contact</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This application is a course project for <strong>Security Analysis and Portfolio Management</strong>. For questions related to the project or collaboration, use the contact information below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 dark:bg-gray-800 rounded p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Project Team</h2>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
              <li>
                • Email: <a className="underline" href="mailto:ibrahimndarifanye0025@gmail.com">ibrahimndarifanye0025@gmail.com</a>
              </li>
              <li>
                • Phone (Tanzania): <a className="underline" href={`tel:+${WHATSAPP_PHONE}`}>+{WHATSAPP_PHONE}</a>
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Course Context</h2>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
              <li>• Educational, not production use</li>
              <li>• Assumed portfolio data</li>
              <li>• Internal collaborators only</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Chat With Us</h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
            Prefer WhatsApp? Tap below to start a chat. We’ll get back promptly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={openWhatsApp}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            >
              <span>Open WhatsApp Chat</span>
            </button>
            <button
              type="button"
              onClick={callNow}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded bg-gray-900 text-white hover:bg-gray-700"
            >
              Call Us
            </button>
            <button
              type="button"
              onClick={mailTo}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Email Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
