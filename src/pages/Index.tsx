
import { motion } from "framer-motion";
import { ContactForm } from "@/components/ContactForm";
import { Music, Users, Calendar, DollarSign, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Simplify Your Music Teaching Practice
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Focus on what matters most - teaching music. Let us handle the rest.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-secondary">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Calendar className="w-8 h-8 text-primary" />,
                title: "Smart Scheduling",
                description: "Effortlessly manage lessons and handle cancellations",
              },
              {
                icon: <DollarSign className="w-8 h-8 text-primary" />,
                title: "Automated Billing",
                description: "Streamlined invoicing and payment tracking",
              },
              {
                icon: <Users className="w-8 h-8 text-primary" />,
                title: "Student Management",
                description: "Keep track of progress and materials",
              },
              {
                icon: <Music className="w-8 h-8 text-primary" />,
                title: "Learning Materials",
                description: "Organize and share teaching resources",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                {feature.icon}
                <h3 className="mt-4 font-semibold text-xl">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Simple, Fair Pricing
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Free for teachers, affordable for students. Our innovative pricing model ensures everyone benefits.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <div className="p-8 bg-secondary rounded-xl">
              <h3 className="font-serif text-2xl font-bold mb-4">For Teachers</h3>
              <p className="text-4xl font-bold text-primary mb-4">€0</p>
              <p className="text-gray-600 mb-6">Forever free, no hidden costs</p>
              <ul className="space-y-3">
                {[
                  "Full access to all features",
                  "Unlimited students",
                  "Automated administration",
                  "Priority support",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 bg-secondary rounded-xl">
              <h3 className="font-serif text-2xl font-bold mb-4">For Students</h3>
              <p className="text-4xl font-bold text-primary mb-4">€2</p>
              <p className="text-gray-600 mb-6">per month</p>
              <ul className="space-y-3">
                {[
                  "Easy lesson scheduling",
                  "Access to learning materials",
                  "Progress tracking",
                  "Family plans available",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 py-20 bg-secondary">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Join the Waitlist
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Be among the first to experience our platform. Sign up for early access and updates.
            </p>
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
      <footer className="px-6 py-12 bg-white">
        <div className="container mx-auto max-w-6xl text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Music Teacher Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
