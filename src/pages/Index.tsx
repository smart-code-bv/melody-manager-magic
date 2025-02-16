
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

const Index = () => {
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
              Your Music Teaching,{" "}
              <span className="text-primary">Simplified</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Focus on what matters most - teaching music. Let our platform handle scheduling, 
              payments, and student management while you create beautiful music.
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
                Get Early Access
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
              Everything You Need to Teach Better
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform streamlines your teaching practice with powerful, 
              easy-to-use tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Calendar className="w-10 h-10 text-primary" />,
                title: "Smart Scheduling",
                description: "Intelligent calendar management with automated reminders and conflict resolution.",
                features: [
                  "Season-based planning",
                  "Multiple lesson types",
                  "Calendar sync",
                  "Make-up lesson tracking"
                ]
              },
              {
                icon: <DollarSign className="w-10 h-10 text-primary" />,
                title: "Automated Billing",
                description: "Seamless payment processing and invoice management integrated with Moneybird.",
                features: [
                  "Custom payment schedules",
                  "Automatic invoicing",
                  "Payment tracking",
                  "VAT calculation"
                ]
              },
              {
                icon: <Users className="w-10 h-10 text-primary" />,
                title: "Student Management",
                description: "Comprehensive student profiles with progress tracking and attendance history.",
                features: [
                  "Detailed profiles",
                  "Progress tracking",
                  "Attendance records",
                  "Family management"
                ]
              },
              {
                icon: <FileText className="w-10 h-10 text-primary" />,
                title: "Learning Materials",
                description: "Organize and share teaching resources efficiently with your students.",
                features: [
                  "File organization",
                  "Resource sharing",
                  "Practice tracking",
                  "YouTube integration"
                ]
              },
              {
                icon: <Bell className="w-10 h-10 text-primary" />,
                title: "Smart Notifications",
                description: "Keep everyone informed with automated, multi-channel notifications.",
                features: [
                  "Lesson reminders",
                  "Payment alerts",
                  "Schedule changes",
                  "Practice reminders"
                ]
              },
              {
                icon: <Gauge className="w-10 h-10 text-primary" />,
                title: "Analytics & Insights",
                description: "Track progress and optimize your teaching practice with detailed analytics.",
                features: [
                  "Student progress",
                  "Financial reports",
                  "Attendance analysis",
                  "Teaching metrics"
                ]
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

      {/* Communications Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold">
                Seamless Communication
              </h2>
              <p className="text-gray-600 text-lg">
                Keep everyone in the loop with our integrated communication system.
                Send updates, share materials, and manage conversations all in one place.
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: <Mail className="w-6 h-6 text-primary" />,
                    title: "Email Integration",
                    description: "Automated lesson reminders and updates"
                  },
                  {
                    icon: <MessageCircle className="w-6 h-6 text-primary" />,
                    title: "In-App Messaging",
                    description: "Direct communication with students and parents"
                  },
                  {
                    icon: <Youtube className="w-6 h-6 text-primary" />,
                    title: "Resource Sharing",
                    description: "Easy sharing of learning materials and videos"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-purple-100 rounded-2xl p-8">
                <div className="w-full h-full bg-white rounded-xl shadow-lg"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-2/3 aspect-square bg-gradient-to-br from-indigo-100 to-primary/20 rounded-2xl p-6">
                <div className="w-full h-full bg-white rounded-xl shadow-lg"></div>
              </div>
            </motion.div>
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
                Fair, Transparent Pricing
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We believe in making music education accessible. That's why our platform 
                is free for teachers and affordable for students.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <div className="p-8 bg-gradient-to-br from-primary/5 to-purple-50 rounded-2xl border border-primary/10">
              <h3 className="font-serif text-2xl font-bold mb-4">For Teachers</h3>
              <p className="text-5xl font-bold text-primary mb-4">€0</p>
              <p className="text-gray-600 mb-8">Forever free, no hidden costs</p>
              <ul className="space-y-4">
                {[
                  "Full access to all features",
                  "Unlimited students",
                  "Automated administration",
                  "Priority support",
                  "Regular platform updates",
                  "Data export options"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200">
              <h3 className="font-serif text-2xl font-bold mb-4">For Students</h3>
              <p className="text-5xl font-bold text-primary mb-4">€2</p>
              <p className="text-gray-600 mb-8">per month</p>
              <ul className="space-y-4">
                {[
                  "Easy lesson scheduling",
                  "Access to learning materials",
                  "Progress tracking",
                  "Family plans available",
                  "Direct communication",
                  "Mobile app access"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
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
                Join the Waitlist
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Be among the first to experience our platform. Sign up for early access 
                and get exclusive updates on our launch.
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
