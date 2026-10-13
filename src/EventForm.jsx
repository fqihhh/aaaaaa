import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function EventForm() {
  // State untuk mengontrol posisi langkah/step (1, 2, atau 3)
  const [step, setStep] = useState(1);

  // Inisialisasi React Hook Form
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      package: "",
      session: "",
      isAgreed: false,
    },
  });

  // Validasi input khusus step aktif sebelum lanjut ke step berikutnya
  const handleNext = async () => {
    let fieldsToValidate = [];
    if (step === 1) {
      fieldsToValidate = ["fullName", "email", "phone"];
    } else if (step === 2) {
      fieldsToValidate = ["package", "session"];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  // Kembali ke step sebelumnya
  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  // Callback ketika form berhasil disubmit di step 3
  const onSubmit = (data) => {
    console.log("Data Form Berhasil Dikirim:", data);
    alert("Pendaftaran Berhasil!");
  };

  // Mengambil data terisi saat ini untuk ringkasan di Langkah 3
  const formData = getValues();

  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-white rounded-xl shadow-md border border-gray-100 font-sans">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Form Pendaftaran Event
      </h2>

      {/* Indicator Step (1 -> 2 -> 3) */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                step === item
                  ? "bg-blue-600 text-white"
                  : step > item
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {item}
            </div>
            {item < 3 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  step > item ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* ==================== LANGKAH 1: INFORMASI PRIBADI ==================== */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Langkah 1: Informasi Pribadi
            </h3>

            {/* 1. Nama Lengkap (fullName) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.fullName
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
                placeholder="Masukkan nama lengkap"
                {...register("fullName", {
                  required: "Nama lengkap wajib diisi.",
                  minLength: {
                    value: 3,
                    message: "Nama lengkap minimal 3 karakter.",
                  },
                })}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* 2. Email Aktif (email) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Aktif
              </label>
              <input
                type="email"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
                placeholder="nama@email.com"
                {...register("email", {
                  required: "Email wajib diisi.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Format email tidak valid.",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* 3. Nomor WhatsApp (phone) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor WhatsApp
              </label>
              <input
                type="tel"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.phone
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
                placeholder="081234567890"
                {...register("phone", {
                  required: "Nomor WhatsApp wajib diisi.",
                  pattern: {
                    value: /^[0-9]{10,13}$/,
                    message:
                      "Nomor WhatsApp harus berupa angka dan bernilai 10-13 digit.",
                  },
                })}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ==================== LANGKAH 2: PILIHAN KURSUS & JADWAL ==================== */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Langkah 2: Pilihan Kursus & Jadwal
            </h3>

            {/* 4. Pilih Paket Belajar (package) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pilih Paket Belajar
              </label>
              <select
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.package
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
                {...register("package", {
                  required: "Silakan pilih salah satu paket belajar.",
                })}
              >
                <option value="">-- Pilih Paket --</option>
                <option value="frontend">Frontend Developer (Rp 500.000)</option>
                <option value="backend">Backend Developer (Rp 500.000)</option>
                <option value="fullstack">Fullstack Developer (Rp 900.000)</option>
              </select>
              {errors.package && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.package.message}
                </p>
              )}
            </div>

            {/* 5. Pilih Sesi Belajar (session) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih Sesi Belajar
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value="pagi"
                    className="text-blue-600 focus:ring-blue-500"
                    {...register("session", {
                      required: "Pilih salah satu sesi belajar.",
                    })}
                  />
                  <span className="text-sm text-gray-700">
                    Sesi Pagi (09.00 - 12.00 WIB)
                  </span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value="sore"
                    className="text-blue-600 focus:ring-blue-500"
                    {...register("session", {
                      required: "Pilih salah satu sesi belajar.",
                    })}
                  />
                  <span className="text-sm text-gray-700">
                    Sesi Sore (16.00 - 19.00 WIB)
                  </span>
                </label>
              </div>
              {errors.session && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.session.message}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ==================== LANGKAH 3: KONFIRMASI & PERSETUJUAN ==================== */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Langkah 3: Konfirmasi & Persetujuan
            </h3>

            {/* 6. Ringkasan Data (Menggunakan getValues()) */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm text-gray-700 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-2">Ringkasan Data:</h4>
              <p><span className="font-medium">Nama Lengkap:</span> {formData.fullName}</p>
              <p><span className="font-medium">Email:</span> {formData.email}</p>
              <p><span className="font-medium">WhatsApp:</span> {formData.phone}</p>
              <p>
                <span className="font-medium">Paket Belajar:</span>{" "}
                {formData.package === "frontend"
                  ? "Frontend Developer (Rp 500.000)"
                  : formData.package === "backend"
                  ? "Backend Developer (Rp 500.000)"
                  : formData.package === "fullstack"
                  ? "Fullstack Developer (Rp 900.000)"
                  : "-"}
              </p>
              <p>
                <span className="font-medium">Sesi Belajar:</span>{" "}
                {formData.session === "pagi"
                  ? "Sesi Pagi (09.00 - 12.00 WIB)"
                  : formData.session === "sore"
                  ? "Sesi Sore (16.00 - 19.00 WIB)"
                  : "-"}
              </p>
            </div>

            {/* 7. Persetujuan Syarat & Ketentuan (isAgreed) */}
            <div>
              <label className="flex items-start space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 text-blue-600 rounded focus:ring-blue-500"
                  {...register("isAgreed", {
                    required: "Anda harus menyetujui syarat dan ketentuan yang berlaku.",
                  })}
                />
                <span className="text-sm text-gray-600">
                  Saya menyetujui seluruh syarat dan ketentuan yang berlaku.
                </span>
              </label>
              {errors.isAgreed && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.isAgreed.message}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Tombol Navigasi Form */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
            >
              Kembali
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="ml-auto px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition cursor-pointer"
            >
              Lanjut
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto px-4 py-2 bg-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700 transition cursor-pointer"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}