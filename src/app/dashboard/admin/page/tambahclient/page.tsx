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

interface InvitationData {
  maleName: string;
  femaleName: string;
  maleParents: string;
  femaleParents: string;
  matrimonyDate: string;
  matrimonyTime: string;
  matrimonyPalace: string;
  matrimonyGmaps: string;
  receptionDate: string;
  receptionTime: string;
  receptionPalace: string;
  receptionGmaps: string;
  socialMediaMale: string;
  socialMediaFemale: string;
  wordsOfBlessingHead: string;
  wordsOfBlessingFoot: string;
  color1: string;
  color2: string;
  musicBackground: File | null;
  malePhoto: File | null;
  femalePhoto: File | null;
  backgroundPhoto: File | null;
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
    maleName: '',
    femaleName: '',
    maleParents: '',
    femaleParents: '',
    matrimonyDate: '',
    matrimonyTime: '',
    matrimonyPalace: '',
    matrimonyGmaps: '',
    receptionDate: '',
    receptionTime: '',
    receptionPalace: '',
    receptionGmaps: '',
    socialMediaMale: '',
    socialMediaFemale: '',
    wordsOfBlessingHead: '',
    wordsOfBlessingFoot: '',
    color1: '#ffffff',
    color2: '#ffffff',
    musicBackground: null,
    malePhoto: null,
    femalePhoto: null,
    backgroundPhoto: null
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
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="maleName" className="block text-sm font-medium text-gray-700">
                      Nama Mempelai Pria
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
                      Nama Mempelai Wanita
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
                      Nama Orang Tua Pria
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
                      Nama Orang Tua Wanita
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

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="matrimonyDate" className="block text-sm font-medium text-gray-700">
                      Tanggal Akad
                    </label>
                    <input
                      type="date"
                      id="matrimonyDate"
                      name="matrimonyDate"
                      value={invitationData.matrimonyDate}
                      onChange={handleInvitationInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="matrimonyTime" className="block text-sm font-medium text-gray-700">
                      Waktu Akad
                    </label>
                    <input
                      type="time"
                      id="matrimonyTime"
                      name="matrimonyTime"
                      value={invitationData.matrimonyTime}
                      onChange={handleInvitationInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="receptionDate" className="block text-sm font-medium text-gray-700">
                      Tanggal Resepsi
                    </label>
                    <input
                      type="date"
                      id="receptionDate"
                      name="receptionDate"
                      value={invitationData.receptionDate}
                      onChange={handleInvitationInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="receptionTime" className="block text-sm font-medium text-gray-700">
                      Waktu Resepsi
                    </label>
                    <input
                      type="time"
                      id="receptionTime"
                      name="receptionTime"
                      value={invitationData.receptionTime}
                      onChange={handleInvitationInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="matrimonyPalace" className="block text-sm font-medium text-gray-700">
                      Tempat Akad
                    </label>
                    <textarea
                      id="matrimonyPalace"
                      name="matrimonyPalace"
                      value={invitationData.matrimonyPalace}
                      onChange={handleInvitationInputChange}
                      rows={2}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="receptionPalace" className="block text-sm font-medium text-gray-700">
                      Tempat Resepsi
                    </label>
                    <textarea
                      id="receptionPalace"
                      name="receptionPalace"
                      value={invitationData.receptionPalace}
                      onChange={handleInvitationInputChange}
                      rows={2}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Media</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="malePhoto" className="block text-sm font-medium text-gray-700">
                        Foto Mempelai Pria
                      </label>
                      <input
                        type="file"
                        id="malePhoto"
                        name="malePhoto"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="mt-1 block w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                      />
                    </div>

                    <div>
                      <label htmlFor="femalePhoto" className="block text-sm font-medium text-gray-700">
                        Foto Mempelai Wanita
                      </label>
                      <input
                        type="file"
                        id="femalePhoto"
                        name="femalePhoto"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="mt-1 block w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                      />
                    </div>

                    <div>
                      <label htmlFor="backgroundPhoto" className="block text-sm font-medium text-gray-700">
                        Foto Background
                      </label>
                      <input
                        type="file"
                        id="backgroundPhoto"
                        name="backgroundPhoto"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="mt-1 block w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                      />
                    </div>

                    <div>
                      <label htmlFor="musicBackground" className="block text-sm font-medium text-gray-700">
                        Musik Background
                      </label>
                      <input
                        type="file"
                        id="musicBackground"
                        name="musicBackground"
                        onChange={handleFileChange}
                        accept="audio/*"
                        className="mt-1 block w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                      />
                    </div>
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