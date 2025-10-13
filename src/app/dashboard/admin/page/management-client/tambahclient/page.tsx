"use client";

import React, { useState } from 'react';

type TabType = 'client' | 'invitation' | 'receptionist';

const AVAILABLE_ADDONS = [
  { id: '1', name: 'Buku Tamu Digital' },
  { id: '2', name: 'Reservasi' },
  { id: '3', name: 'Donasi' },
  { id: '4', name: 'Gallery Video' },
  { id: '5', name: 'Gift' }
] as const;

type Addon = typeof AVAILABLE_ADDONS[number];

interface FormData {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  rentTime: number;
  theme: string;
  invitationType: 'standar' | 'premium';
  addons: string[];
}

interface TimelineItem {
  title: string;
  date: string;
  content: string;
}

interface MomentsItem {
  file: File | null;
  preview?: string;
}

interface RegistryItem {
  image: File | null;
  name: string;
  preview?: string;
}

interface InvitationData {
  // Informasi Pasangan
  maleName: string;
  femaleName: string;
  maleParents: string;
  femaleParents: string;
  
  // Foto Pasangan
  malePhoto: File | null;
  femalePhoto: File | null;
  backgroundPhoto: File | null;
  
  // Kata-kata Berkah
  wordsOfBlessingHead: string;
  wordsOfBlessingFoot: string;
  
  // Media Sosial
  socialMediaMale: string;
  socialMediaIconMale: string;
  socialMediaFemale: string;
  socialMediaIconFemale: string;
  
  // Timeline Perjalanan Cinta
  timeline: TimelineItem[];
  
  // Waktu Pernikahan
  timeWedding: string;
  
  // Detail Acara - Akad
  matrimonyDate: string;
  matrimonyHour: string;
  matrimonyMinute: string;
  matrimonyPeriod: string;
  matrimonyPalace: string;
  matrimonyGmaps: string;
  
  // Detail Acara - Resepsi
  receptionDate: string;
  receptionHour: string;
  receptionMinute: string;
  receptionPeriod: string;
  receptionPalace: string;
  receptionGmaps: string;
  
  // Dress Code
  color1: string;
  color2: string;
  
  // Momen Spesial
  momentsTag: string;
  moments: MomentsItem[];
  
  // Transfer Digital
  digitalTransfer1: string;
  digitalTransfer2: string;
  
  // Wedding Registry
  weddingRegistry: RegistryItem[];
  
  // Kirim Hadiah
  sendGiftAddress: string;
  sendGiftPhone: string;
  
  // Musik Background
  musicBackground: File | null;
}

interface ReceptionistData {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export default function TambahClientPage() {
  const [activeTab, setActiveTab] = useState<TabType>('client');
  const [formData, setFormData] = useState<FormData>({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    rentTime: 1,
    theme: '',
    invitationType: 'standar',
    addons: []
  });

  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [availableAddons, setAvailableAddons] = useState<Addon[]>([...AVAILABLE_ADDONS]);

  const [invitationData, setInvitationData] = useState<InvitationData>({
    // Informasi Pasangan
    maleName: '',
    femaleName: '',
    maleParents: '',
    femaleParents: '',
    
    // Foto Pasangan
    malePhoto: null,
    femalePhoto: null,
    backgroundPhoto: null,
    
    // Kata-kata Berkah
    wordsOfBlessingHead: '',
    wordsOfBlessingFoot: '',
    
    // Media Sosial
    socialMediaMale: '',
    socialMediaIconMale: '',
    socialMediaFemale: '',
    socialMediaIconFemale: '',
    
    // Timeline Perjalanan Cinta
    timeline: [{ title: '', date: '', content: '' }],
    
    // Waktu Pernikahan
    timeWedding: '',
    
    // Detail Acara - Akad
    matrimonyDate: '',
    matrimonyHour: '',
    matrimonyMinute: '',
    matrimonyPeriod: '',
    matrimonyPalace: '',
    matrimonyGmaps: '',
    
    // Detail Acara - Resepsi
    receptionDate: '',
    receptionHour: '',
    receptionMinute: '',
    receptionPeriod: '',
    receptionPalace: '',
    receptionGmaps: '',
    
    // Dress Code
    color1: '#ffffff',
    color2: '#ffffff',
    
    // Momen Spesial
    momentsTag: '',
    moments: [{ file: null }],
    
    // Transfer Digital
    digitalTransfer1: '',
    digitalTransfer2: '',
    
    // Wedding Registry
    weddingRegistry: [{ image: null, name: '' }],
    
    // Kirim Hadiah
    sendGiftAddress: '',
    sendGiftPhone: '',
    
    // Musik Background
    musicBackground: null
  });

  const [receptionistData, setReceptionistData] = useState<ReceptionistData>({
    name: '',
    phone: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInvitationInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInvitationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setInvitationData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const handleReceptionistInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReceptionistData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddonSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (selectedId) {
      const addon = availableAddons.find(a => a.id === selectedId);
      if (addon) {
        setSelectedAddons(prev => [...prev, addon]);
        setAvailableAddons(prev => prev.filter(a => a.id !== selectedId));
      }
    }
  };

  const handleRemoveAddon = (addonToRemove: Addon) => {
    setSelectedAddons(prev => prev.filter(addon => addon.id !== addonToRemove.id));
    setAvailableAddons(prev => [...prev, addonToRemove].sort((a, b) => a.name.localeCompare(b.name)));
  };

  // Timeline handlers
  const addTimelineItem = () => {
    setInvitationData(prev => ({
      ...prev,
      timeline: [...prev.timeline, { title: '', date: '', content: '' }]
    }));
  };

  const removeTimelineItem = (index: number) => {
    if (invitationData.timeline.length > 1) {
      setInvitationData(prev => ({
        ...prev,
        timeline: prev.timeline.filter((_, i) => i !== index)
      }));
    }
  };

  const updateTimelineItem = (index: number, field: keyof TimelineItem, value: string) => {
    setInvitationData(prev => ({
      ...prev,
      timeline: prev.timeline.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  // Moments handlers
  const addMomentsItem = () => {
    setInvitationData(prev => ({
      ...prev,
      moments: [...prev.moments, { file: null }]
    }));
  };

  const removeMomentsItem = (index: number) => {
    if (invitationData.moments.length > 1) {
      setInvitationData(prev => ({
        ...prev,
        moments: prev.moments.filter((_, i) => i !== index)
      }));
    }
  };

  const updateMomentsItem = (index: number, file: File) => {
    setInvitationData(prev => ({
      ...prev,
      moments: prev.moments.map((item, i) => 
        i === index ? { ...item, file, preview: URL.createObjectURL(file) } : item
      )
    }));
  };

  // Registry handlers
  const addRegistryItem = () => {
    setInvitationData(prev => ({
      ...prev,
      weddingRegistry: [...prev.weddingRegistry, { image: null, name: '' }]
    }));
  };

  const removeRegistryItem = (index: number) => {
    setInvitationData(prev => ({
      ...prev,
      weddingRegistry: prev.weddingRegistry.filter((_, i) => i !== index)
    }));
  };

  const updateRegistryItem = (index: number, field: 'image' | 'name', value: File | string) => {
    setInvitationData(prev => ({
      ...prev,
      weddingRegistry: prev.weddingRegistry.map((item, i) => {
        if (i === index) {
          if (field === 'image' && value instanceof File) {
            return { ...item, [field]: value, preview: URL.createObjectURL(value) };
          }
          return { ...item, [field]: value };
        }
        return item;
      })
    }));
  };

  const handleSubmitAll = (e: React.FormEvent) => {
    e.preventDefault();
    const allData = {
      client: {
        ...formData,
        addons: selectedAddons.map(addon => addon.name)
      },
      invitation: invitationData,
      ...(formData.invitationType === 'premium' && { receptionist: receptionistData }),
      files: {
        malePhoto: invitationData.malePhoto,
        femalePhoto: invitationData.femalePhoto,
        backgroundPhoto: invitationData.backgroundPhoto,
        musicBackground: invitationData.musicBackground
      }
    };

    console.log('All data:', allData);
    // TODO: Implement API call
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Tabs */}
        <div className="flex mb-6 bg-white rounded-lg shadow-sm p-1">
          <button
            type="button"
            onClick={() => setActiveTab('client')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors
              ${activeTab === 'client'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-600 hover:text-gray-800'
              }`}
          >
            Data Client
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('invitation')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors
              ${activeTab === 'invitation'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-600 hover:text-gray-800'
              }`}
          >
            Data Undangan
          </button>
          {formData.invitationType === 'premium' && (
            <button
              type="button"
              onClick={() => setActiveTab('receptionist')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors
                ${activeTab === 'receptionist'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              Data Resepsionis
            </button>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {activeTab === 'client' && 'Data Client'}
              {activeTab === 'invitation' && 'Data Undangan'}
              {activeTab === 'receptionist' && 'Data Resepsionis'}
            </h2>
          </div>

          <form onSubmit={handleSubmitAll} className="space-y-6">
            {/* Client Data Tab */}
            {activeTab === 'client' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">
                    Nama Client
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    id="clientPhone"
                    name="clientPhone"
                    value={formData.clientPhone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="clientEmail"
                    name="clientEmail"
                    value={formData.clientEmail}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                    Tema Undangan
                  </label>
                  <input
                    type="text"
                    id="theme"
                    name="theme"
                    value={formData.theme}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="rentTime" className="block text-sm font-medium text-gray-700">
                    Waktu Sewa (+1 hari)
                  </label>
                  <input
                    type="number"
                    id="rentTime"
                    name="rentTime"
                    value={formData.rentTime}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="invitationType" className="block text-sm font-medium text-gray-700">
                    Tipe Undangan
                  </label>
                  <select
                    id="invitationType"
                    name="invitationType"
                    value={formData.invitationType}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="standar">Standar</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Addon Tersedia
                  </label>
                  <select
                    onChange={handleAddonSelect}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">Pilih addon...</option>
                    {availableAddons.map((addon) => (
                      <option key={addon.id} value={addon.id}>
                        {addon.name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedAddons.length > 0 && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Addon Terpilih
                    </label>
                    <div className="space-y-2">
                      {selectedAddons.map((addon) => (
                        <div
                          key={addon.id}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                        >
                          <span>{addon.name}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveAddon(addon)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Hapus
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Invitation Data Tab */}
            {activeTab === 'invitation' && (
              <div className="space-y-8 max-h-96 overflow-y-auto">
                {/* Informasi Pasangan */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">💍 Informasi Pasangan</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="maleName" className="block text-sm font-medium text-gray-700">
                        Nama Pria <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="maleName"
                        name="maleName"
                        value={invitationData.maleName}
                        onChange={handleInvitationInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="femaleName" className="block text-sm font-medium text-gray-700">
                        Nama Wanita <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="femaleName"
                        name="femaleName"
                        value={invitationData.femaleName}
                        onChange={handleInvitationInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="maleParents" className="block text-sm font-medium text-gray-700">
                        Putra dari <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="maleParents"
                        name="maleParents"
                        value={invitationData.maleParents}
                        onChange={handleInvitationInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="femaleParents" className="block text-sm font-medium text-gray-700">
                        Putri dari <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="femaleParents"
                        name="femaleParents"
                        value={invitationData.femaleParents}
                        onChange={handleInvitationInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Foto Pasangan */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">📸 Foto Pasangan</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Foto Pria <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="file"
                        name="malePhoto"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Foto Wanita <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="file"
                        name="femalePhoto"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Foto Background <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="file"
                        name="backgroundPhoto"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Kata-kata Berkah */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 Kata-kata Berkah</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="wordsOfBlessingHead" className="block text-sm font-medium text-gray-700">
                        Kata Pembuka <span className="text-gray-500">(Opsional)</span>
                      </label>
                      <textarea
                        id="wordsOfBlessingHead"
                        name="wordsOfBlessingHead"
                        value={invitationData.wordsOfBlessingHead}
                        onChange={handleInvitationInputChange}
                        rows={3}
                        placeholder="Kata pembuka undangan..."
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="wordsOfBlessingFoot" className="block text-sm font-medium text-gray-700">
                        Kata Penutup <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="wordsOfBlessingFoot"
                        name="wordsOfBlessingFoot"
                        value={invitationData.wordsOfBlessingFoot}
                        onChange={handleInvitationInputChange}
                        rows={3}
                        placeholder="Kata penutup undangan..."
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Media Sosial */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">📱 Media Sosial</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="socialMediaMale" className="block text-sm font-medium text-gray-700">
                        Media Sosial Pria <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="socialMediaMale"
                        name="socialMediaMale"
                        value={invitationData.socialMediaMale}
                        onChange={handleInvitationInputChange}
                        placeholder="@username atau link"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="socialMediaIconMale" className="block text-sm font-medium text-gray-700">
                        Icon Media Sosial Pria <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="socialMediaIconMale"
                        name="socialMediaIconMale"
                        value={invitationData.socialMediaIconMale}
                        onChange={handleInvitationInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        required
                      >
                        <option value="">Pilih Icon</option>
                        <option value="instagram">📷 Instagram</option>
                        <option value="facebook">📘 Facebook</option>
                        <option value="twitter">🐦 Twitter</option>
                        <option value="tiktok">🎵 TikTok</option>
                        <option value="whatsapp">💬 WhatsApp</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="socialMediaFemale" className="block text-sm font-medium text-gray-700">
                        Media Sosial Wanita <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="socialMediaFemale"
                        name="socialMediaFemale"
                        value={invitationData.socialMediaFemale}
                        onChange={handleInvitationInputChange}
                        placeholder="@username atau link"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="socialMediaIconFemale" className="block text-sm font-medium text-gray-700">
                        Icon Media Sosial Wanita <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="socialMediaIconFemale"
                        name="socialMediaIconFemale"
                        value={invitationData.socialMediaIconFemale}
                        onChange={handleInvitationInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        required
                      >
                        <option value="">Pilih Icon</option>
                        <option value="instagram">📷 Instagram</option>
                        <option value="facebook">📘 Facebook</option>
                        <option value="twitter">🐦 Twitter</option>
                        <option value="tiktok">🎵 TikTok</option>
                        <option value="whatsapp">💬 WhatsApp</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Timeline Perjalanan Cinta */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">💕 Timeline Perjalanan Cinta</h3>
                  {invitationData.timeline.map((item, index) => (
                    <div key={index} className="mb-4 p-4 bg-white rounded-lg border relative">
                      {invitationData.timeline.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTimelineItem(index)}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600"
                        >
                          ×
                        </button>
                      )}
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Judul <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updateTimelineItem(index, 'title', e.target.value)}
                            placeholder="Contoh: Pertama Bertemu"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Tanggal <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="datetime-local"
                            value={item.date}
                            onChange={(e) => updateTimelineItem(index, 'date', e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Cerita <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            value={item.content}
                            onChange={(e) => updateTimelineItem(index, 'content', e.target.value)}
                            rows={3}
                            placeholder="Ceritakan momen spesial..."
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addTimelineItem}
                    className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    + Tambah Timeline
                  </button>
                </div>

                {/* Waktu Pernikahan */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">💒 Waktu Pernikahan</h3>
                  <div>
                    <label htmlFor="timeWedding" className="block text-sm font-medium text-gray-700">
                      Waktu Pernikahan Utama <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      id="timeWedding"
                      name="timeWedding"
                      value={invitationData.timeWedding}
                      onChange={handleInvitationInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Detail Acara */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">🎊 Detail Acara</h3>
                  
                  {/* Akad Nikah */}
                  <div className="mb-6">
                    <h4 className="text-md font-medium text-indigo-600 mb-4">📿 Akad Nikah</h4>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="matrimonyDate" className="block text-sm font-medium text-gray-700">
                          Tanggal Akad <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="datetime-local"
                          id="matrimonyDate"
                          name="matrimonyDate"
                          value={invitationData.matrimonyDate}
                          onChange={handleInvitationInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Waktu Akad <span className="text-red-500">*</span>
                        </label>
                        <div className="flex space-x-2">
                          <select
                            name="matrimonyHour"
                            value={invitationData.matrimonyHour}
                            onChange={handleInvitationInputChange}
                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            required
                          >
                            <option value="">Jam</option>
                            {Array.from({length: 12}, (_, i) => (
                              <option key={i+1} value={i+1}>{i+1}</option>
                            ))}
                          </select>
                          <select
                            name="matrimonyMinute"
                            value={invitationData.matrimonyMinute}
                            onChange={handleInvitationInputChange}
                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            required
                          >
                            <option value="">Menit</option>
                            <option value="00">00</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="45">45</option>
                          </select>
                          <select
                            name="matrimonyPeriod"
                            value={invitationData.matrimonyPeriod}
                            onChange={handleInvitationInputChange}
                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            required
                          >
                            <option value="">AM/PM</option>
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="matrimonyPalace" className="block text-sm font-medium text-gray-700">
                          Tempat Akad <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="matrimonyPalace"
                          name="matrimonyPalace"
                          value={invitationData.matrimonyPalace}
                          onChange={handleInvitationInputChange}
                          placeholder="Nama tempat akad nikah"
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="matrimonyGmaps" className="block text-sm font-medium text-gray-700">
                          Link Google Maps Akad <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="url"
                          id="matrimonyGmaps"
                          name="matrimonyGmaps"
                          value={invitationData.matrimonyGmaps}
                          onChange={handleInvitationInputChange}
                          placeholder="https://maps.google.com/..."
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Resepsi */}
                  <div className="mb-4">
                    <h4 className="text-md font-medium text-indigo-600 mb-4">🎉 Resepsi</h4>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="receptionDate" className="block text-sm font-medium text-gray-700">
                          Tanggal Resepsi <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="datetime-local"
                          id="receptionDate"
                          name="receptionDate"
                          value={invitationData.receptionDate}
                          onChange={handleInvitationInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Waktu Resepsi <span className="text-red-500">*</span>
                        </label>
                        <div className="flex space-x-2">
                          <select
                            name="receptionHour"
                            value={invitationData.receptionHour}
                            onChange={handleInvitationInputChange}
                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            required
                          >
                            <option value="">Jam</option>
                            {Array.from({length: 12}, (_, i) => (
                              <option key={i+1} value={i+1}>{i+1}</option>
                            ))}
                          </select>
                          <select
                            name="receptionMinute"
                            value={invitationData.receptionMinute}
                            onChange={handleInvitationInputChange}
                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            required
                          >
                            <option value="">Menit</option>
                            <option value="00">00</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="45">45</option>
                          </select>
                          <select
                            name="receptionPeriod"
                            value={invitationData.receptionPeriod}
                            onChange={handleInvitationInputChange}
                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            required
                          >
                            <option value="">AM/PM</option>
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="receptionPalace" className="block text-sm font-medium text-gray-700">
                          Tempat Resepsi <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="receptionPalace"
                          name="receptionPalace"
                          value={invitationData.receptionPalace}
                          onChange={handleInvitationInputChange}
                          placeholder="Nama tempat resepsi"
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="receptionGmaps" className="block text-sm font-medium text-gray-700">
                          Link Google Maps Resepsi <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="url"
                          id="receptionGmaps"
                          name="receptionGmaps"
                          value={invitationData.receptionGmaps}
                          onChange={handleInvitationInputChange}
                          placeholder="https://maps.google.com/..."
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dress Code */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">👗 Dress Code</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="color1" className="block text-sm font-medium text-gray-700">
                        Warna 1 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="color"
                        id="color1"
                        name="color1"
                        value={invitationData.color1}
                        onChange={handleInvitationInputChange}
                        className="mt-1 block w-full h-10 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="color2" className="block text-sm font-medium text-gray-700">
                        Warna 2 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="color"
                        id="color2"
                        name="color2"
                        value={invitationData.color2}
                        onChange={handleInvitationInputChange}
                        className="mt-1 block w-full h-10 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Momen Spesial */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">📷 Momen Spesial</h3>
                  <div className="mb-4">
                    <label htmlFor="momentsTag" className="block text-sm font-medium text-gray-700">
                      Tag Momen <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="momentsTag"
                      name="momentsTag"
                      value={invitationData.momentsTag}
                      onChange={handleInvitationInputChange}
                      placeholder="Contoh: #OurMemories #LoveStory"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  {invitationData.moments.map((moment, index) => (
                    <div key={index} className="mb-4 p-4 bg-white rounded-lg border relative">
                      {invitationData.moments.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMomentsItem(index)}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600"
                        >
                          ×
                        </button>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Foto Momen <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              updateMomentsItem(index, e.target.files[0]);
                            }
                          }}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                          required
                        />
                        {moment.preview && (
                          <img src={moment.preview} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded" />
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addMomentsItem}
                    className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    + Tambah Foto Momen
                  </button>
                </div>

                {/* Transfer Digital */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">💳 Transfer Digital</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="digitalTransfer1" className="block text-sm font-medium text-gray-700">
                        Rekening 1 <span className="text-gray-500">(Opsional)</span>
                      </label>
                      <input
                        type="text"
                        id="digitalTransfer1"
                        name="digitalTransfer1"
                        value={invitationData.digitalTransfer1}
                        onChange={handleInvitationInputChange}
                        placeholder="Bank Name - No. Rekening - Nama Pemilik"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="digitalTransfer2" className="block text-sm font-medium text-gray-700">
                        Rekening 2 <span className="text-gray-500">(Opsional)</span>
                      </label>
                      <input
                        type="text"
                        id="digitalTransfer2"
                        name="digitalTransfer2"
                        value={invitationData.digitalTransfer2}
                        onChange={handleInvitationInputChange}
                        placeholder="Bank Name - No. Rekening - Nama Pemilik"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Wedding Registry */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">🎁 Wedding Registry</h3>
                  {invitationData.weddingRegistry.map((registry, index) => (
                    <div key={index} className="mb-4 p-4 bg-white rounded-lg border relative">
                      <button
                        type="button"
                        onClick={() => removeRegistryItem(index)}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Gambar Produk <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                updateRegistryItem(index, 'image', e.target.files[0]);
                              }
                            }}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            required
                          />
                          {registry.preview && (
                            <img src={registry.preview} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded" />
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Nama Produk <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={registry.name}
                            onChange={(e) => updateRegistryItem(index, 'name', e.target.value)}
                            placeholder="Nama produk registry"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addRegistryItem}
                    className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    + Tambah Registry
                  </button>
                </div>

                {/* Kirim Hadiah */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">🚚 Kirim Hadiah</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="sendGiftAddress" className="block text-sm font-medium text-gray-700">
                        Alamat <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="sendGiftAddress"
                        name="sendGiftAddress"
                        value={invitationData.sendGiftAddress}
                        onChange={handleInvitationInputChange}
                        rows={3}
                        placeholder="Alamat lengkap untuk pengiriman hadiah"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="sendGiftPhone" className="block text-sm font-medium text-gray-700">
                        Nomor Telepon <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="sendGiftPhone"
                        name="sendGiftPhone"
                        value={invitationData.sendGiftPhone}
                        onChange={handleInvitationInputChange}
                        placeholder="08xxxxxxxxxx"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Musik Background */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">🎵 Musik Background</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      File Musik Background <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name="musicBackground"
                      onChange={handleFileChange}
                      accept="audio/*"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                      required
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Format yang didukung: MP3, WAV, AAC, dll.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Receptionist Data Tab */}
            {activeTab === 'receptionist' && formData.invitationType === 'premium' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nama Resepsionis
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={receptionistData.name}
                    onChange={handleReceptionistInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={receptionistData.phone}
                    onChange={handleReceptionistInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={receptionistData.email}
                    onChange={handleReceptionistInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={receptionistData.password}
                    onChange={handleReceptionistInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-6">
              <button
                type="button"
                onClick={() => {
                  if (activeTab === 'client') {
                    setActiveTab('invitation');
                  } else if (activeTab === 'invitation') {
                    if (formData.invitationType === 'premium') {
                      setActiveTab('receptionist');
                    }
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {activeTab === 'client' ? 'Lanjut ke Data Undangan' : activeTab === 'invitation' && formData.invitationType === 'premium' ? 'Lanjut ke Data Resepsionis' : 'Simpan'}
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Simpan Semua Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}