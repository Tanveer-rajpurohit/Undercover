import { useState } from 'react';
import { Heart, Lightbulb, Book, Globe, Palette, Snowflake, Bell, Volume2, Music, Trash2, Instagram, Youtube, Share2, ShoppingBag } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { ListItem } from './ListItem';
import { ToggleSwitch } from './ToggleSwitch';
import { DiscordIcon } from './DiscordIcon';
import { DonateButton } from './DonateButton';
 

export default function WebSetting() {
  const [toggleStates, setToggleStates] = useState({
    snowfall: false,
    notifications: false,
    soundEffects: false,
    backgroundMusic: false,
  });

  const handleToggle = (key: keyof typeof toggleStates) => {
    setToggleStates(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleDonate = () => {
    // Implement donation logic here
    window.open('https://example.com/donate', '_blank');
  };


  return (
    <div className="h-full w-full">
      {/* Profile Section */}
      <section>
        <SectionHeader title="MY PROFILE" />
        <ListItem
          icon={
            <div className="px-3 py-1 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl">
              T
            </div>
          }
          title="Tanveer Sing."
          subtitle="Game Played: 1"
        />
      </section>

      {/* Feedback Section */}
      <section>
        <SectionHeader title="FEEDBACK" />
        <ListItem
          icon={<Heart className="w-6 h-6 text-red-500" />}
          title="Rate the app"
        />
        <ListItem
          icon={<Lightbulb className="w-6 h-6 text-yellow-400" />}
          title="Questions / Suggestions"
        />
      </section>

      {/* Words & Roles Section */}
      <section>
        <SectionHeader title="WORDS & ROLES" />
        <ListItem
          icon={<Book className="w-6 h-6 text-blue-500" />}
          title="Free library"
          subtitle="50 words"
        />
        <ListItem
          icon={<Book className="w-6 h-6 text-blue-600" />}
          title="Extended library"
          subtitle="0 / 2830 words"
          rightElement={
            <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-medium">
              Buy
            </button>
          }
        />
      </section>

      {/* General Section */}
      <section>
        <SectionHeader title="GENERAL" />
        <ListItem
          icon={<Globe className="w-6 h-6 text-emerald-500" />}
          title="Language"
          rightElement={<span className="text-blue-500">System</span>}
        />
        <ListItem
          icon={<Palette className="w-6 h-6 text-emerald-500" />}
          title="Appearance"
          rightElement={<span className="text-blue-500">System</span>}
        />
        <ListItem
          icon={<Snowflake className="w-6 h-6 text-emerald-500" />}
          title="Snowfall"
          rightElement={
            <ToggleSwitch
              checked={toggleStates.snowfall}
              onChange={() => handleToggle('snowfall')}
            />
          }
        />
        <ListItem
          icon={<Bell className="w-6 h-6 text-emerald-500" />}
          title="Push notifications"
          rightElement={
            <ToggleSwitch 
              checked={toggleStates.notifications}
              onChange={() => handleToggle('notifications')}
            />
          }
        />
        <ListItem
          icon={<Volume2 className="w-6 h-6 text-emerald-500" />}
          title="Sound effects"
          rightElement={
            <ToggleSwitch 
              checked={toggleStates.soundEffects}
              onChange={() => handleToggle('soundEffects')}
            />
          }
        />
        <ListItem
          icon={<Music className="w-6 h-6 text-emerald-500" />}
          title="Background music"
          rightElement={
            <ToggleSwitch 
              checked={toggleStates.backgroundMusic}
              onChange={() => handleToggle('backgroundMusic')}
            />
          }
        />
        <ListItem
          icon={<Trash2 className="w-6 h-6 text-emerald-500" />}
          title="Delete all players"
        />
      </section>

      {/* Follow Us Section */}
      <section>
        <SectionHeader title="FOLLOW US" />
        <ListItem
          icon={<Instagram className="w-6 h-6 text-pink-500" />}
          title="Instagram"
        />
        <ListItem
          icon={<Youtube className="w-6 h-6 text-red-500" />}
          title="YouTube"
        />
        <ListItem
          icon={<DiscordIcon className="w-6 h-6 text-indigo-500" />}
          title="Discord"
        />
        <ListItem
          icon={<Share2 className="w-6 h-6 text-orange-500" />}
          title="Share with friends"
        />
        <ListItem
          icon={<ShoppingBag className="w-6 h-6 text-yellow-500" />}
          title="Merch"
        />
      </section>

      {/* Donation Section */}
      <section className="mt-8 mb-8">
        <SectionHeader title="SUPPORT US" />
        <div className="px-4 py-6 mx-4 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-white">Support the Developers</h3>
            <p className="text-white/90">
              Help us continue making great content and improving the app
            </p>
            <div className="flex flex-col items-center gap-3">
              <DonateButton onClick={handleDonate} />
              <span className="text-sm text-white/80">Every contribution helps! ✨</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

