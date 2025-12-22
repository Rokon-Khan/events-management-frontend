"use client";

import { motion } from "framer-motion";
import { Users, Target, Heart, Award, Calendar, MapPin } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div 
        className="container mx-auto px-4 py-16"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Hero Section */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            About EventHub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Connecting communities through unforgettable experiences. We're more than just an event platform – 
            we're your gateway to discovering, creating, and sharing moments that matter.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div variants={fadeInUp} className="mb-20">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
            <div className="flex items-center justify-center mb-6">
              <Target className="w-12 h-12 text-blue-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Our Mission</h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-4xl mx-auto leading-relaxed">
              To democratize event discovery and creation, making it effortless for people to find their tribe, 
              share their passions, and build lasting connections through meaningful experiences.
            </p>
          </div>
        </motion.div>

        {/* Values Grid */}
        <motion.div variants={fadeInUp} className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Community First</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Building authentic connections and fostering inclusive communities where everyone belongs.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Heart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Passion Driven</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Empowering people to pursue their interests and share their expertise with like-minded individuals.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Excellence</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Delivering exceptional experiences through innovative technology and thoughtful design.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div variants={fadeInUp} className="mb-20">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
            <h2 className="text-3xl font-bold text-center mb-12">EventHub by Numbers</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Calendar className="w-12 h-12 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">10,000+</div>
                <div className="text-blue-100">Events Created</div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Users className="w-12 h-12 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">50,000+</div>
                <div className="text-blue-100">Active Users</div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <MapPin className="w-12 h-12 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">100+</div>
                <div className="text-blue-100">Cities Covered</div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart className="w-12 h-12 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-blue-100">Satisfaction Rate</div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Story Section */}
        <motion.div variants={fadeInUp} className="text-center">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Our Story</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-6">
              Founded with the vision of bringing people together, EventHub started as a simple idea: 
              what if discovering and attending local events was as easy as scrolling through your favorite social media?
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Today, we're proud to be the platform where communities thrive, friendships are formed, 
              and unforgettable memories are created. Join us in building a more connected world, one event at a time.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
