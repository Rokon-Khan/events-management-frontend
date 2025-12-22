"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, UserCheck, Database, Globe } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function PrivacyPolicyPage() {
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
            <Shield className="w-16 h-16 text-blue-600 mr-4" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how EventHub collects, uses, and protects your information.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Last updated: December 2024
          </p>
        </motion.div>

        {/* Quick Overview */}
        <motion.div variants={fadeInUp} className="mb-12">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4">Privacy at a Glance</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Lock className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-blue-700 dark:text-blue-300">Data Encryption</span>
              </div>
              <div className="flex items-center">
                <UserCheck className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-blue-700 dark:text-blue-300">User Control</span>
              </div>
              <div className="flex items-center">
                <Eye className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-blue-700 dark:text-blue-300">Transparency</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Information We Collect */}
          <motion.section variants={fadeInUp} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="flex items-center mb-6">
              <Database className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Information We Collect</h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Personal Information</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Name, email address, and profile information</li>
                  <li>Payment information for event transactions</li>
                  <li>Profile photos and event images you upload</li>
                  <li>Communication preferences and settings</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Usage Information</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Events you view, create, or participate in</li>
                  <li>Search queries and browsing behavior</li>
                  <li>Device information and IP address</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* How We Use Information */}
          <motion.section variants={fadeInUp} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="flex items-center mb-6">
              <Globe className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">How We Use Your Information</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Service Delivery</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Process event registrations and payments</li>
                  <li>Send event notifications and updates</li>
                  <li>Provide customer support</li>
                  <li>Facilitate host-participant communication</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Platform Improvement</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Personalize event recommendations</li>
                  <li>Analyze usage patterns and trends</li>
                  <li>Improve security and prevent fraud</li>
                  <li>Develop new features and services</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Data Protection */}
          <motion.section variants={fadeInUp} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="flex items-center mb-6">
              <Shield className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Data Protection & Security</h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                We implement industry-standard security measures to protect your personal information:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Technical Safeguards</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>SSL/TLS encryption for data transmission</li>
                    <li>Secure cloud storage with encryption at rest</li>
                    <li>Regular security audits and monitoring</li>
                  </ul>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Access Controls</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Role-based access to user data</li>
                    <li>Multi-factor authentication for staff</li>
                    <li>Regular access reviews and updates</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Your Rights */}
          <motion.section variants={fadeInUp} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="flex items-center mb-6">
              <UserCheck className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Your Privacy Rights</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-300">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Data Control</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Access your personal information</li>
                  <li>Update or correct your data</li>
                  <li>Delete your account and data</li>
                  <li>Export your data</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Communication Preferences</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Opt-out of marketing emails</li>
                  <li>Manage notification settings</li>
                  <li>Control data sharing preferences</li>
                  <li>Request data processing restrictions</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Contact Information */}
          <motion.section variants={fadeInUp} className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Questions About Privacy?</h2>
            <p className="mb-6 text-blue-100">
              We're here to help. Contact our privacy team for any questions or concerns.
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> privacy@eventhub.com</p>
              <p><strong>Address:</strong> EventHub Privacy Team, 123 Tech Street, Digital City, DC 12345</p>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
}
