"use client";

import { useState } from "react";

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  story?: string;
}

interface RegistryItem {
  name: string;
  price: string;
  image?: string;
  link?: string;
}



interface Client {
  id: string;
  name: string;
  phone: string;
  subscription: string;
  theme: string;
  expiry: string;
  addons: string;
  hasReceptionist: boolean;
  active: boolean;
  // Extended properties for wedding details
  email?: string;
  weddingDate?: string;
  venue?: string;
  maleName?: string;
  femaleName?: string;
  maleParents?: string;
  femaleParents?: string;
  maleSocialMedia?: string;
  femaleSocialMedia?: string;
  openingWords?: string;
  closingWords?: string;
  ceremonyDate?: string;
  ceremonyTime?: string;
  ceremonyVenue?: string;
  ceremonyMaps?: string;
  receptionDate?: string;
  receptionTime?: string;
  receptionVenue?: string;
  receptionMaps?: string;
  dressCodeColor1?: string;
  dressCodeColor2?: string;
  backgroundMusic?: string;
  timeline?: TimelineItem[];
  registry?: RegistryItem[];
  photos?: string[];
  gallery?: string[];
  bankAccounts?: string[];
  giftAddress?: string;
  giftPhone?: string;
}

interface Props {
  client: Client;
  onClose: () => void;
}

export default function ClientInfoModal({ client, onClose }: Props) {
  const [activeTab, setActiveTab] = useState("couple");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold">Detail Undangan Digital</h2>
              <p className="text-sm opacity-90">Informasi lengkap undangan {client.name}</p>
            </div>
            <button onClick={onClose} className="text-white hover:text-gray-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mt-6">
            <TabButton
              active={activeTab === "couple"}
              onClick={() => setActiveTab("couple")}
              icon="💑"
              label="Informasi Pasangan"
            />
            <TabButton
              active={activeTab === "event"}
              onClick={() => setActiveTab("event")}
              icon="🎉"
              label="Detail Acara"
            />
            <TabButton
              active={activeTab === "media"}
              onClick={() => setActiveTab("media")}
              icon="📸"
              label="Foto & Media"
            />
            <TabButton
              active={activeTab === "registry"}
              onClick={() => setActiveTab("registry")}
              icon="🎁"
              label="Registry & Hadiah"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "couple" && (
            <div className="space-y-8">
              <Section title="Informasi Pasangan" icon="💑">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoGroup label="Nama Pria" value={client.maleName || "-"} />
                  <InfoGroup label="Nama Wanita" value={client.femaleName || "-"} />
                  <InfoGroup label="Putra dari" value={client.maleParents || "-"} />
                  <InfoGroup label="Putri dari" value={client.femaleParents || "-"} />
                </div>
              </Section>

              <Section title="Media Sosial" icon="📱">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoGroup label="Media Sosial Pria" value={client.maleSocialMedia || "-"} />
                  <InfoGroup label="Media Sosial Wanita" value={client.femaleSocialMedia || "-"} />
                </div>
              </Section>

              <Section title="Kata Pemberkatan" icon="✨">
                <div className="space-y-4">
                  <InfoGroup label="Kata Pembuka" value={client.openingWords || "-"} />
                  <InfoGroup label="Kata Penutup" value={client.closingWords || "-"} />
                </div>
              </Section>

              <Section title="Timeline Cinta" icon="❤️">
                {client.timeline?.map((item: TimelineItem, index: number) => (
                  <div key={index} className="relative pl-8 pb-8 last:pb-0">
                    <div className="absolute left-0 top-0 h-full w-0.5 bg-indigo-200">
                      <div className="absolute -left-1.5 top-2 h-4 w-4 rounded-full bg-indigo-600"></div>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                      <h4 className="font-medium text-lg">{item.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.date}</p>
                      <p className="mt-2">{item.story}</p>
                    </div>
                  </div>
                ))}
              </Section>
            </div>
          )}

          {activeTab === "event" && (
            <div className="space-y-8">
              <Section title="Akad Nikah" icon="📿">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoGroup label="Tanggal" value={client.ceremonyDate || "-"} />
                  <InfoGroup label="Waktu" value={client.ceremonyTime || "-"} />
                  <InfoGroup label="Tempat" value={client.ceremonyVenue || "-"} />
                  <InfoGroup label="Lokasi Maps" value={client.ceremonyMaps || "-"} isLink />
                </div>
              </Section>

              <Section title="Resepsi" icon="🎉">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoGroup label="Tanggal" value={client.receptionDate || "-"} />
                  <InfoGroup label="Waktu" value={client.receptionTime || "-"} />
                  <InfoGroup label="Tempat" value={client.receptionVenue || "-"} />
                  <InfoGroup label="Lokasi Maps" value={client.receptionMaps || "-"} isLink />
                </div>
              </Section>

              <Section title="Dress Code" icon="👔">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: client.dressCodeColor1 || '#ffffff' }}
                    />
                    <span>Warna 1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: client.dressCodeColor2 || '#ffffff' }}
                    />
                    <span>Warna 2</span>
                  </div>
                </div>
              </Section>
            </div>
          )}

          {activeTab === "media" && (
            <div className="space-y-8">
              <Section title="Foto Pasangan" icon="📸">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {client.photos?.map((photo: string, index: number) => (
                    <div key={index} className="aspect-square rounded-lg bg-gray-100 dark:bg-slate-700">
                      <img
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </Section>

              <Section title="Musik" icon="🎵">
                <InfoGroup label="Background Music" value={client.backgroundMusic || "-"} />
              </Section>

              <Section title="Gallery Momen" icon="📱">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {client.gallery?.map((photo: string, index: number) => (
                    <div key={index} className="aspect-square rounded-lg bg-gray-100 dark:bg-slate-700">
                      <img
                        src={photo}
                        alt={`Moment ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </Section>
            </div>
          )}

          {activeTab === "registry" && (
            <div className="space-y-8">
              <Section title="Transfer Digital" icon="💳">
                <div className="space-y-4">
                  {client.bankAccounts?.map((account: string, index: number) => (
                    <InfoGroup key={index} label={`Rekening ${index + 1}`} value={account} />
                  ))}
                </div>
              </Section>

              <Section title="Wedding Registry" icon="🎁">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {client.registry?.map((item: RegistryItem, index: number) => (
                    <div key={index} className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                      <div className="aspect-square rounded-lg bg-gray-100 dark:bg-slate-600 mb-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <p className="text-sm font-medium text-center">{item.name}</p>
                    </div>
                  ))}
                </div>
              </Section>

              <Section title="Alamat Pengiriman Hadiah" icon="📦">
                <div className="space-y-4">
                  <InfoGroup label="Alamat" value={client.giftAddress || "-"} />
                  <InfoGroup label="Nomor Telepon" value={client.giftPhone || "-"} />
                </div>
              </Section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: string; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors
        ${active 
          ? "bg-white/10 text-white" 
          : "text-white/70 hover:text-white hover:bg-white/5"
        }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border dark:border-slate-700 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 dark:bg-slate-700 border-b dark:border-slate-600">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <span>{icon}</span>
          <span>{title}</span>
        </h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function InfoGroup({ label, value, isLink = false }: { label: string; value: string; isLink?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
        {label}
      </label>
      {isLink ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          {value}
        </a>
      ) : (
        <p className="text-gray-900 dark:text-gray-100">{value}</p>
      )}
    </div>
  );
}