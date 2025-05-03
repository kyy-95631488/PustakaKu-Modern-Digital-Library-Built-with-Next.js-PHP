"use client";
import { motion } from "framer-motion";
import { Book, Download, Library } from "lucide-react";

const dummyBooks = [
  {
    id: 1,
    title: "Belajar React untuk Pemula",
    thumbnail: "https://source.unsplash.com/160x240/?book,react",
    availableDigital: true,
    availableOffline: false,
  },
  {
    id: 2,
    title: "Mengenal Machine Learning",
    thumbnail: "https://source.unsplash.com/160x240/?book,ai",
    availableDigital: true,
    availableOffline: true,
  },
  {
    id: 3,
    title: "Dasar-Dasar Pemrograman",
    thumbnail: "https://source.unsplash.com/160x240/?book,coding",
    availableDigital: false,
    availableOffline: true,
  },
];

const ListBookSection = () => {
  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
        <Book className="w-8 h-8 text-white" /> Daftar Buku
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {dummyBooks.map((book, index) => (
          <motion.div
            key={book.id}
            className="bg-[#1e1e1e] rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <img
              src={book.thumbnail}
              alt={book.title}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-white">{book.title}</h3>
            <div className="mt-2 space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span
                  className={book.availableDigital ? "text-green-400" : "text-red-400"}
                >
                  {book.availableDigital ? "Tersedia Digital" : "Tidak tersedia Digital"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Library className="w-4 h-4" />
                <span
                  className={book.availableOffline ? "text-green-400" : "text-red-400"}
                >
                  {book.availableOffline ? "Tersedia di Perpustakaan" : "Tidak tersedia di Perpustakaan"}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ListBookSection;
