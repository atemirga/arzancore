import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Pricing from '../components/landing/Pricing';
import { Check, HelpCircle } from 'lucide-react';
import { CONTACTS } from '../lib/constants';

const faqs = [
  {
    q: 'Могу ли я изменить тариф в любое время?',
    a: 'Да, вы можете изменить тарифный план в любой момент. При переходе на более высокий тариф изменения вступают в силу сразу. При понижении тарифа изменения вступят в силу с начала следующего расчётного периода.',
  },
  {
    q: 'Есть ли бесплатный пробный период?',
    a: 'Да, мы предоставляем 14 дней бесплатного доступа ко всем функциям. Кредитная карта для регистрации не требуется.',
  },
  {
    q: 'Какие способы оплаты вы принимаете?',
    a: 'Мы принимаем оплату банковскими картами Visa, Mastercard, а также через Kaspi и банковским переводом для юридических лиц.',
  },
  {
    q: 'Можно ли получить скидку при оплате за год?',
    a: 'Да, при оплате за год вы получаете скидку 20%. Свяжитесь с нами для получения индивидуального предложения.',
  },
  {
    q: 'Что происходит с данными при отмене подписки?',
    a: 'После отмены подписки ваши данные хранятся 30 дней. В течение этого времени вы можете экспортировать данные или возобновить подписку.',
  },
  {
    q: 'Предоставляете ли вы обучение?',
    a: 'Да, для тарифов Business и Enterprise мы проводим бесплатное обучение вашей команды. Также доступна обширная база знаний и видеоуроки.',
  },
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
          <div className="container text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <span className="text-lg">💰</span>
              <span className="text-sm">Прозрачные цены</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Тарифные планы
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Выберите план, который подходит вашему бизнесу.
              Начните бесплатно, масштабируйтесь по мере роста.
            </p>
          </div>
        </section>

        {/* Pricing component */}
        <div className="-mt-16">
          <Pricing />
        </div>

        {/* Features comparison */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Что входит во все тарифы
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                'Неограниченные сделки',
                'Мобильное приложение',
                'Email уведомления',
                'SSL шифрование',
                'Ежедневные бэкапы',
                'API доступ (Business+)',
                'Техподдержка',
                'Обновления бесплатно',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-4 py-2 mb-4">
                <HelpCircle size={16} />
                <span className="text-sm font-medium">FAQ</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Часто задаваемые вопросы
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-3">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Остались вопросы?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Наши специалисты готовы помочь подобрать оптимальный тариф
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={CONTACTS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all"
              >
                Написать в WhatsApp
              </a>
              <a
                href={`tel:${CONTACTS.phones[0].replace(/\s/g, '')}`}
                className="bg-white/10 border border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all"
              >
                {CONTACTS.phones[0]}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
