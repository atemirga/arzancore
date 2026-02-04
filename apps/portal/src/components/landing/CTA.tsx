import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { CONTACTS } from '../../lib/constants';

export default function CTA() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700" />

      {/* Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full filter blur-3xl" />

      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm">14 дней бесплатно</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Готовы автоматизировать свой бизнес?
          </h2>

          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Начните использовать ArzanCloud уже сегодня.
            Бесплатный период 14 дней, кредитная карта не требуется.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-black/20 transition-all flex items-center justify-center gap-2 group"
            >
              Начать бесплатно
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={CONTACTS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              Написать в WhatsApp
            </a>
          </div>

          {/* Contact info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-blue-100">
            <a href={`tel:${CONTACTS.phones[0].replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={18} />
              {CONTACTS.phones[0]}
            </a>
            <a href={`mailto:${CONTACTS.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
              <MessageCircle size={18} />
              {CONTACTS.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
