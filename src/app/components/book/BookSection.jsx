"use client";
import React from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const dummyBooks = [
  { id: 1, title: "Pemrograman Dasar", author: "Ahmad", category: "Teknologi" },
  { id: 2, title: "Filsafat Hidup", author: "Raisa", category: "Filsafat" },
  { id: 3, title: "Sejarah Dunia", author: "Budi", category: "Sejarah" },
  { id: 4, title: "Ekonomi Modern", author: "Sari", category: "Ekonomi" },
];

export default function BookSection() {
  return (
    <section className="mt-20 z-10">
        <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-2">
            <BookOpen className="text-blue-400" size={32} />
            Koleksi Buku
        </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dummyBooks.map((book, index) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="bg-[#1e1e1e] p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300 group"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-[#292929] rounded-full mb-4 mx-auto group-hover:bg-blue-600 transition-colors">
              <BookOpen className="text-blue-400 group-hover:text-white" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-white text-center">{book.title}</h3>
            <p className="text-gray-400 text-sm text-center mt-1">Penulis: {book.author}</p>
            <p className="text-gray-500 text-xs text-center mt-1 italic">{book.category}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
