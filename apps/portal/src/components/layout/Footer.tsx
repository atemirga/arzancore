import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Send } from 'lucide-react';
import { CONTACTS, COMPANY, PRODUCTS } from '../../lib/constants';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      {/* Main footer */}
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                A
              </div>
              <div>
                <span className="font-bold text-xl text-white">{COMPANY.name}</span>
                <div className="text-xs text-gray-500">{COMPANY.tagline}</div>
              </div>
            </Link>
            <p className="text-sm mb-6 leading-relaxed">
              {COMPANY.description}
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              <a
                href={CONTACTS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 transition-all"
              >
                <Instagram size={18} className="text-white" />
              </a>
              <a
                href={CONTACTS.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-all"
              >
                <Send size={18} className="text-white" />
              </a>
              <a
                href={CONTACTS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-500 transition-all"
              >
                <Phone size={18} className="text-white" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-white mb-6">Продукты</h4>
            <ul className="space-y-3 text-sm">
              {PRODUCTS.map((product) => (
                <li key={product.id}>
                  <Link to={`/products/${product.id}`} className="hover:text-white flex items-center gap-2 transition-colors">
                    <span>{product.icon}</span>
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-6">Компания</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">О нас</a></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Тарифы</Link></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Отзывы</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Блог</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Партнёрам</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Вакансии</a></li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-semibold text-white mb-6">Контакты</h4>
            <ul className="space-y-4 text-sm">
              {CONTACTS.phones.map((phone) => (
                <li key={phone}>
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-3 hover:text-white transition-colors">
                    <Phone size={16} className="text-blue-500" />
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${CONTACTS.email}`} className="flex items-center gap-3 hover:text-white transition-colors">
                  <Mail size={16} className="text-blue-500" />
                  {CONTACTS.email}
                </a>
              </li>
              <li>
                <a href={CONTACTS.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                  <Instagram size={16} className="text-blue-500" />
                  {CONTACTS.instagram}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-blue-500 mt-0.5" />
                <span>{CONTACTS.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm">
              © {new Date().getFullYear()} {COMPANY.name}. Все права защищены.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Условия использования</a>
              <a href="#" className="hover:text-white transition-colors">Оферта</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
