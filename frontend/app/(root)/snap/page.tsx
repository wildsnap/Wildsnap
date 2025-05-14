"use client";

import React, { useState } from "react";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/background/8-bit-forest.jpg')" }}
    >
      <div className="mb-8 w-full max-w-sm">
        <div className="border-4 border-white rounded-3xl">
          {image ? (
            <img
              src={image}
              alt="Uploaded"
              className="rounded-3xl border-4 border-[#005D0F] shadow-md w-full"
              style={{ height: "500px", objectFit: "cover" }}
            />
          ) : (
            <div className="w-full aspect-square bg-white/60 border-4 border-[#005D0F] rounded-3xl shadow-md flex items-center justify-center text-green-700 font-medium text-lg">
              No image uploaded
            </div>
          )}
        </div>
      </div>

      <label className="bg-yellow-300 hover:bg-yellow-400 text-green-900 font-semibold py-3 px-6 rounded-2xl shadow-lg cursor-pointer transition">
        SNAP !!
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
    </main>
  );
}
