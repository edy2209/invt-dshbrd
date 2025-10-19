"use client";

import { useState } from "react";

interface TimelineItem {
  title: string;
  date: string;
  story: string;
}

interface RegistryItem {
  name: string;
  price: string;
  image?: File | null;
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
  
  // Media Sosial
  maleSocialMedia: string;
  femaleSocialMedia: string;
  
  // Kata-kata
  openingWords: string;
  closingWords: string;
  
  // Detail Acara
  ceremonyDate: string;
  ceremonyTime: string;
  ceremonyVenue: string;
  ceremonyMaps: string;
  receptionDate: string;
  receptionTime: string;
  receptionVenue: string;
  receptionMaps: string;
  
  // Dress Code
  dressCodeColor1: string;
  dressCodeColor2: string;
  
  // Timeline
  timeline: TimelineItem[];
  
  // Registry
  registry: RegistryItem[];
  
  // Gallery
  photos: File[];
  
  // Transfer Bank
  bankAccounts: string[];
  
  // Gift Address
  giftAddress: string;
  giftPhone: string;
  
  // Background Music
  backgroundMusic: string;
}

interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

interface Props {
  client: Client;
  onClose: () => void;
  onSave: (data: InvitationData) => void;
}

export default function ManageInvitationModal({ client, onClose, onSave }: Props) {
  const [currentTab, setCurrentTab] = useState('couple');
  const [formData, setFormData] = useState<InvitationData>({
    maleName: '',
    femaleName: '',
    maleParents: '',
    femaleParents: '',
    malePhoto: null,
    femalePhoto: null,
    maleSocialMedia: '',
    femaleSocialMedia: '',
    openingWords: '',
    closingWords: '',
    ceremonyDate: '',
    ceremonyTime: '',
    ceremonyVenue: '',
    ceremonyMaps: '',
    receptionDate: '',
    receptionTime: '',
    receptionVenue: '',
    receptionMaps: '',
    dressCodeColor1: '#ffffff',
    dressCodeColor2: '#ffffff',
    timeline: [{ title: '', date: '', story: '' }],
    registry: [{ name: '', price: '', image: null }],
    photos: [],
    bankAccounts: [''],
    giftAddress: '',
    giftPhone: '',
    backgroundMusic: ''
  });

  const tabs = [
    { id: 'couple', label: 'Data Pasangan' },
    { id: 'event', label: 'Detail Acara' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'registry', label: 'Registry' },
    { id: 'other', label: 'Lainnya' }
  ];

  const handleInputChange = (field: keyof InvitationData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: keyof InvitationData, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const addTimelineItem = () => {
    setFormData(prev => ({
      ...prev,
      timeline: [...prev.timeline, { title: '', date: '', story: '' }]
    }));
  };

  const removeTimelineItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      timeline: prev.timeline.filter((_, i) => i !== index)
    }));
  };

  const updateTimelineItem = (index: number, field: keyof TimelineItem, value: string) => {
    setFormData(prev => ({
      ...prev,
      timeline: prev.timeline.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addRegistryItem = () => {
    setFormData(prev => ({
      ...prev,
      registry: [...prev.registry, { name: '', price: '', image: null }]
    }));
  };

  const removeRegistryItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      registry: prev.registry.filter((_, i) => i !== index)
    }));
  };

  const updateRegistryItem = (index: number, field: keyof RegistryItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      registry: prev.registry.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addBankAccount = () => {
    setFormData(prev => ({
      ...prev,
      bankAccounts: [...prev.bankAccounts, '']
    }));
  };

  const removeBankAccount = (index: number) => {
    setFormData(prev => ({
      ...prev,
      bankAccounts: prev.bankAccounts.filter((_, i) => i !== index)
    }));
  };

  const updateBankAccount = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      bankAccounts: prev.bankAccounts.map((account, i) => 
        i === index ? value : account
      )
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case 'couple':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Nama Mempelai Pria
                </label>
                <input
                  type="text"
                  value={formData.maleName}
                  onChange={(e) => handleInputChange('maleName', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Nama Mempelai Wanita
                </label>
                <input
                  type="text"
                  value={formData.femaleName}
                  onChange={(e) => handleInputChange('femaleName', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Orang Tua Pria
                </label>
                <input
                  type="text"
                  value={formData.maleParents}
                  onChange={(e) => handleInputChange('maleParents', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Orang Tua Wanita
                </label>
                <input
                  type="text"
                  value={formData.femaleParents}
                  onChange={(e) => handleInputChange('femaleParents', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Foto Mempelai Pria
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange('malePhoto', e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Foto Mempelai Wanita
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange('femalePhoto', e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Social Media Pria
                </label>
                <input
                  type="text"
                  value={formData.maleSocialMedia}
                  onChange={(e) => handleInputChange('maleSocialMedia', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                  placeholder="@username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Social Media Wanita
                </label>
                <input
                  type="text"
                  value={formData.femaleSocialMedia}
                  onChange={(e) => handleInputChange('femaleSocialMedia', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                  placeholder="@username"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Kata Pembuka
                </label>
                <textarea
                  value={formData.openingWords}
                  onChange={(e) => handleInputChange('openingWords', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Kata Penutup
                </label>
                <textarea
                  value={formData.closingWords}
                  onChange={(e) => handleInputChange('closingWords', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 'event':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Akad Nikah</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    value={formData.ceremonyDate}
                    onChange={(e) => handleInputChange('ceremonyDate', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Waktu
                  </label>
                  <input
                    type="time"
                    value={formData.ceremonyTime}
                    onChange={(e) => handleInputChange('ceremonyTime', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Tempat
                  </label>
                  <input
                    type="text"
                    value={formData.ceremonyVenue}
                    onChange={(e) => handleInputChange('ceremonyVenue', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Link Maps
                  </label>
                  <input
                    type="url"
                    value={formData.ceremonyMaps}
                    onChange={(e) => handleInputChange('ceremonyMaps', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Resepsi</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    value={formData.receptionDate}
                    onChange={(e) => handleInputChange('receptionDate', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Waktu
                  </label>
                  <input
                    type="time"
                    value={formData.receptionTime}
                    onChange={(e) => handleInputChange('receptionTime', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Tempat
                  </label>
                  <input
                    type="text"
                    value={formData.receptionVenue}
                    onChange={(e) => handleInputChange('receptionVenue', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Link Maps
                  </label>
                  <input
                    type="url"
                    value={formData.receptionMaps}
                    onChange={(e) => handleInputChange('receptionMaps', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Dress Code</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Warna 1
                  </label>
                  <input
                    type="color"
                    value={formData.dressCodeColor1}
                    onChange={(e) => handleInputChange('dressCodeColor1', e.target.value)}
                    className="w-full h-10 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Warna 2
                  </label>
                  <input
                    type="color"
                    value={formData.dressCodeColor2}
                    onChange={(e) => handleInputChange('dressCodeColor2', e.target.value)}
                    className="w-full h-10 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Timeline Cinta</h3>
              <button
                onClick={addTimelineItem}
                className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
              >
                Tambah Timeline
              </button>
            </div>
            
            {formData.timeline.map((item, index) => (
              <div key={index} className="border border-slate-300 dark:border-slate-600 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Timeline {index + 1}
                  </span>
                  {formData.timeline.length > 1 && (
                    <button
                      onClick={() => removeTimelineItem(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Judul
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateTimelineItem(index, 'title', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Tanggal
                    </label>
                    <input
                      type="date"
                      value={item.date}
                      onChange={(e) => updateTimelineItem(index, 'date', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white text-sm"
                    />
                  </div>
                </div>
                
                <div className="mt-3">
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Cerita
                  </label>
                  <textarea
                    value={item.story}
                    onChange={(e) => updateTimelineItem(index, 'story', e.target.value)}
                    className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white text-sm"
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case 'gallery':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Upload Foto Gallery
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setFormData(prev => ({ ...prev, photos: [...prev.photos, ...files] }));
                }}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
              />
            </div>
            
            {formData.photos.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Foto yang Diupload ({formData.photos.length})
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <div className="aspect-square bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-slate-500 dark:text-slate-400">{photo.name}</span>
                      </div>
                      <button
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            photos: prev.photos.filter((_, i) => i !== index)
                          }));
                        }}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'registry':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Wedding Registry</h3>
              <button
                onClick={addRegistryItem}
                className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
              >
                Tambah Item
              </button>
            </div>
            
            {formData.registry.map((item, index) => (
              <div key={index} className="border border-slate-300 dark:border-slate-600 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Item {index + 1}
                  </span>
                  {formData.registry.length > 1 && (
                    <button
                      onClick={() => removeRegistryItem(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Nama Item
                    </label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateRegistryItem(index, 'name', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Harga
                    </label>
                    <input
                      type="text"
                      value={item.price}
                      onChange={(e) => updateRegistryItem(index, 'price', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white text-sm"
                      placeholder="Rp 000.000"
                    />
                  </div>
                </div>
                
                <div className="mt-3">
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Foto Item
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => updateRegistryItem(index, 'image', e.target.files?.[0] || null)}
                    className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case 'other':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Transfer Bank</h3>
              <div className="space-y-3">
                {formData.bankAccounts.map((account, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={account}
                      onChange={(e) => updateBankAccount(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                      placeholder="Bank Name - Account Number - Account Name"
                    />
                    {formData.bankAccounts.length > 1 && (
                      <button
                        onClick={() => removeBankAccount(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addBankAccount}
                  className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
                >
                  Tambah Rekening
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Alamat Kado</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Alamat
                  </label>
                  <textarea
                    value={formData.giftAddress}
                    onChange={(e) => handleInputChange('giftAddress', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    value={formData.giftPhone}
                    onChange={(e) => handleInputChange('giftPhone', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Background Music (URL)
              </label>
              <input
                type="url"
                value={formData.backgroundMusic}
                onChange={(e) => handleInputChange('backgroundMusic', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
                placeholder="https://..."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Manage Invitation - {client.name}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Kelola data undangan untuk client {client.name}
          </p>
        </div>

        <div className="flex">
          {/* Tabs */}
          <div className="w-48 border-r border-slate-200 dark:border-slate-700 p-4">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    currentTab === tab.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {renderTabContent()}
          </div>
        </div>

        <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Simpan Invitation
          </button>
        </div>
      </div>
    </div>
  );
}