
import { motion } from "framer-motion";
import { ContactForm } from "@/components/ContactForm";
import { 
  Music, 
  Users, 
  Calendar, 
  DollarSign, 
  ArrowRight, 
  Youtube,
  MessageCircle,
  Mail,
  Bell,
  FileText,
  Gauge,
  ChevronRight
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/translations";

const Index = () => {
  const language = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Gradient */}
      <section className="relative px-6 pt-24 pb-32 md:pt-32 md:pb-40 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t.hero.subtitle}
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <a 
                href="#contact" 
                className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-full text-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
              >
                {t.hero.cta}
                <ChevronRight className="ml-2 w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-1/3 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              {t.features.title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t.features.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Calendar className="w-10 h-10 text-primary" />,
                title: t.features.scheduling.title,
                description: t.features.scheduling.description,
                features: t.features.scheduling.features
              },
              {
                icon: <DollarSign className="w-10 h-10 text-primary" />,
                title: t.features.billing.title,
                description: t.features.billing.description,
                features: t.features.billing.features
              },
              {
                icon: <Users className="w-10 h-10 text-primary" />,
                title: t.features.students.title,
                description: t.features.students.description,
                features: t.features.students.features
              },
              {
                icon: <FileText className="w-10 h-10 text-primary" />,
                title: t.features.materials.title,
                description: t.features.materials.description,
                features: t.features.materials.features
              },
              {
                icon: <Bell className="w-10 h-10 text-primary" />,
                title: t.features.notifications.title,
                description: t.features.notifications.description,
                features: t.features.notifications.features
              },
              {
                icon: <Gauge className="w-10 h-10 text-primary" />,
                title: t.features.analytics.title,
                description: t.features.analytics.description,
                features: t.features.analytics.features
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="p-3 bg-primary/5 rounded-xl w-fit">
                  {feature.icon}
                </div>
                <h3 className="mt-6 font-semibold text-2xl">{feature.title}</h3>
                <p className="mt-3 text-gray-600">{feature.description}</p>
                <ul className="mt-6 space-y-3">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center space-x-2 text-gray-600">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                {t.pricing.title}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t.pricing.subtitle}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="p-8 bg-gradient-to-br from-primary/5 to-purple-50 rounded-2xl border border-primary/10">
              <h3 className="font-serif text-2xl font-bold mb-2">{t.pricing.features.title}</h3>
              <p className="text-gray-600 mb-6">{t.pricing.features.description}</p>
              <ul className="space-y-4">
                {t.pricing.features.items.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                {t.contact.title}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t.contact.subtitle}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto max-w-6xl text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Music Teacher Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
