"use client";

import React, { useState } from 'react';

const AVAILABLE_ADDONS = [
  { id: '1', name: 'Buku Tamu Digital' },
  { id: '2', name: 'Reservasi' },
  { id: '3', name: 'Donasi' },
  { id: '4', name: 'Gallery Video' },
  { id: '5', name: 'Gift' }
] as const;

interface FormData {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  rentTime: number;
  theme: string;
  invitationType: 'standar' | 'premium';
  addons: string[];
}

export default function TambahClientPage() {
  const [formData, setFormData] = useState<FormData>({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    rentTime: 1,
    theme: '',
    invitationType: 'standar',
    addons: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Nama client wajib diisi';
    }

    if (!formData.clientPhone.trim()) {
      newErrors.clientPhone = 'Nomor telepon wajib diisi';
    }

    if (!formData.clientEmail.trim()) {
      newErrors.clientEmail = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.clientEmail)) {
      newErrors.clientEmail = 'Format email tidak valid';
    }

    if (!formData.theme) {
      newErrors.theme = 'Tema wajib dipilih';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFormData({
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        rentTime: 1,
        theme: '',
        invitationType: 'standar',
        addons: []
      });
      
      alert('Client berhasil ditambahkan!');
    } catch (error) {
      alert('Gagal menambahkan client. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Tambah Client Baru
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Tambahkan data client baru. Data undangan dapat dikelola setelah client dibuat.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">
              Data Client
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Nama Client *
                </label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                  placeholder="Masukkan nama client"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Nomor Telepon *
                </label>
                <input
                  type="tel"
                  value={formData.clientPhone}
                  onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                  placeholder="08xxxxxxxxxx"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                  placeholder="client@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Lama Sewa (Bulan)
                </label>
                <select
                  value={formData.rentTime}
                  onChange={(e) => handleInputChange('rentTime', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                >
                  <option value={1}>1 Bulan</option>
                  <option value={3}>3 Bulan</option>
                  <option value={6}>6 Bulan</option>
                  <option value={12}>1 Tahun</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">
              Paket & Tema
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Jenis Undangan
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="standar"
                      checked={formData.invitationType === 'standar'}
                      onChange={(e) => handleInputChange('invitationType', e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-slate-700 dark:text-slate-300">Standar</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="premium"
                      checked={formData.invitationType === 'premium'}
                      onChange={(e) => handleInputChange('invitationType', e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-slate-700 dark:text-slate-300">Premium</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Tema *
                </label>
                <select
                  value={formData.theme}
                  onChange={(e) => handleInputChange('theme', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                >
                  <option value="">Pilih Tema</option>
                  <option value="classic">Classic</option>
                  <option value="modern">Modern</option>
                  <option value="elegant">Elegant</option>
                  <option value="rustic">Rustic</option>
                  <option value="floral">Floral</option>
                </select>
              </div>
            </div>
          </div>

          {/* Add-ons */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">
              Add-ons (Opsional)
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {AVAILABLE_ADDONS.map((addon) => (
                <label key={addon.id} className="flex items-center p-3 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.addons.includes(addon.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleInputChange('addons', [...formData.addons, addon.id]);
                      } else {
                        handleInputChange('addons', formData.addons.filter(id => id !== addon.id));
                      }
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{addon.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-slate-200 dark:border-slate-700">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Menyimpan...' : 'Tambah Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
