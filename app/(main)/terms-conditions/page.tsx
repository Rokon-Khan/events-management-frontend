"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Calendar,
  CreditCard,
  FileText,
  Scale,
  ShieldAlert,
  UserCheck,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        className="container mx-auto px-4 py-16"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <FileText className="w-16 h-16 text-purple-600 mr-4" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Terms & Conditions
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            These Terms & Conditions govern your access to and use of the
            EventHub platform, services, and events.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Last updated: December 2024
          </p>
        </motion.div>

        {/* Agreement Notice */}
        <motion.div variants={fadeInUp} className="mb-12">
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-300 mb-4">
              Agreement to Terms
            </h2>
            <p className="text-purple-700 dark:text-purple-300">
              By accessing or using EventHub, you agree to be bound by these
              Terms & Conditions. If you do not agree, please discontinue use of
              the platform.
            </p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* User Responsibilities */}
          <motion.section
            variants={fadeInUp}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20"
          >
            <div className="flex items-center mb-6">
              <UserCheck className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                User Responsibilities
              </h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>Provide accurate and up-to-date account information</li>
              <li>Maintain the confidentiality of your login credentials</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Respect other users, hosts, and event organizers</li>
            </ul>
          </motion.section>

          {/* Event Listings & Participation */}
          <motion.section
            variants={fadeInUp}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20"
          >
            <div className="flex items-center mb-6">
              <Calendar className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Events & Participation
              </h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>Event details are provided by hosts and may change</li>
              <li>EventHub is not responsible for event cancellations</li>
              <li>Participants must follow host-specific rules</li>
              <li>Unauthorized resale of tickets is prohibited</li>
            </ul>
          </motion.section>

          {/* Payments & Refunds */}
          <motion.section
            variants={fadeInUp}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20"
          >
            <div className="flex items-center mb-6">
              <CreditCard className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Payments & Refunds
              </h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>All payments are processed through secure providers</li>
              <li>Refund policies are defined by event organizers</li>
              <li>Service fees may be non-refundable</li>
              <li>Fraudulent transactions may result in account suspension</li>
            </ul>
          </motion.section>

          {/* Prohibited Activities */}
          <motion.section
            variants={fadeInUp}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20"
          >
            <div className="flex items-center mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Prohibited Activities
              </h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>Posting false, misleading, or harmful content</li>
              <li>Attempting to disrupt platform functionality</li>
              <li>Unauthorized data scraping or automation</li>
              <li>Violating intellectual property rights</li>
            </ul>
          </motion.section>

          {/* Limitation of Liability */}
          <motion.section
            variants={fadeInUp}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20"
          >
            <div className="flex items-center mb-6">
              <ShieldAlert className="w-8 h-8 text-orange-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Limitation of Liability
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              EventHub is not liable for indirect, incidental, or consequential
              damages arising from your use of the platform or attendance at
              events. Use the platform at your own discretion.
            </p>
          </motion.section>

          {/* Governing Law */}
          <motion.section
            variants={fadeInUp}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20"
          >
            <div className="flex items-center mb-6">
              <Scale className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Governing Law
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              These Terms & Conditions are governed by and construed in
              accordance with applicable local laws. Any disputes shall be
              resolved through competent legal jurisdiction.
            </p>
          </motion.section>

          {/* Contact */}
          <motion.section
            variants={fadeInUp}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
          >
            <h2 className="text-2xl font-bold mb-4">
              Questions About These Terms?
            </h2>
            <p className="mb-6 text-blue-100">
              Contact our legal team if you need clarification regarding these
              Terms & Conditions.
            </p>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> legal@eventhub.com
              </p>
              <p>
                <strong>Address:</strong> EventHub Legal Team, 123 Tech Street,
                Digital City
              </p>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
}
