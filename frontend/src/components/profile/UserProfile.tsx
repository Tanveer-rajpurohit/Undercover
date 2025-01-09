
import { Camera, Check, ChevronRight, Edit2 } from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import { StatCard } from './StatCard';
import BackButton from '../utils/BackButton';

export default function UserProfile() {
  return (
    <div className="h-full w-full">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <div className="py-6 px-8 absolute left-0 top-0">
          <BackButton />
        </div>

        {/* Profile Section */}
        <div className="px-4 pb-6">
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-4xl font-semibold text-white">T</span>
              </div>
              <button 
                className="absolute bottom-0 right-0 bg-gray-900 rounded-full p-1.5"
                aria-label="Change profile picture"
              >
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">Tanveer Sing.</h1>
                <button>
                  <Edit2 className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="bg-sky-400 text-white px-3 py-0.5 rounded-full text-sm font-medium">
                  Lv0
                </span>
                <div className="w-32 h-2 bg-gray-200 rounded-full">
                  <div className="w-0 h-full bg-sky-400 rounded-full" />
                </div>
                <span className="text-sm text-gray-600">XP 0/2,000</span>
              </div>
            </div>
          </div>

          {/* Premium Feature */}
          <div className="mt-6">
            <button className="w-full bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-400 rounded-xl flex items-center justify-center">
                  <div className="w-6 h-6 bg-white/30 rounded-lg" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-green-500">Ad-Removal Elixir</h3>
                  <p className="text-sm text-gray-600">Remove ads for everyone</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <section className="px-4 pb-6">
          <SectionTitle>ONLINE STATS</SectionTitle>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <StatCard value={0} label="Games played" bgColor="bg-emerald-400" />
            <StatCard value={0} label="Games hosted" bgColor="bg-cyan-400" />
            <StatCard value="0%" label="Win rate" bgColor="bg-sky-400" />
            <StatCard value={0} label="Longest win streak" bgColor="bg-orange-300" />
            <StatCard value={0} label="Days played" bgColor="bg-pink-400" />
            <StatCard value={0} label="Special role games" bgColor="bg-purple-400" />
          </div>
        </section>

        {/* Linked Accounts Section */}
        <section className="px-4 pb-6">
          <SectionTitle>LINKED ACCOUNTS</SectionTitle>
          <div className="space-y-3 mt-4">
            
            <div className="w-full bg-white rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="font-medium">Google</span>
                <p className="text-sm text-gray-500">tanveerrajpurohit603@gmail.com</p>
              </div>
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </section>

        {/* General Section */}
        <section className="px-4 pb-6">
          <SectionTitle>GENERAL</SectionTitle>
          <div className="space-y-3 mt-4">
            <button className="w-full bg-white rounded-2xl p-4 flex items-center justify-between">
              <span className="font-medium">Privacy policy</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full bg-white rounded-2xl p-4 flex items-center justify-between">
              <span className="font-medium">Terms of use</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full bg-white rounded-2xl p-4 flex items-center justify-between">
              <span className="font-medium">Delete account</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </section>

        {/* Logout Button */}
        <div className="px-4 pb-8">
          <button className="w-full bg-white rounded-2xl p-4 text-red-500 font-medium">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

