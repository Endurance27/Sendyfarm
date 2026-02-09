import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Save, Edit2, Lock } from 'lucide-react';

interface CustomerProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  preferences: {
    newsletter: boolean;
    promotions: boolean;
    orderUpdates: boolean;
  };
}

interface ProfilePageProps {
  initialProfile?: CustomerProfile;
  onSaveProfile?: (profile: CustomerProfile) => void;
}

export function ProfilePage({ initialProfile, onSaveProfile }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<CustomerProfile>(initialProfile || {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    preferences: {
      newsletter: true,
      promotions: true,
      orderUpdates: true,
    }
  });

  const [showSaveMessage, setShowSaveMessage] = useState(false);

  const handleSave = () => {
    if (onSaveProfile) {
      onSaveProfile(profile);
    }
    setIsEditing(false);
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (initialProfile) {
      setProfile(initialProfile);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="size-8 text-[#7b3306]" />
              <h1 className="text-4xl font-bold text-[#7b3306]">My Profile</h1>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-[#f0b100] hover:bg-[#d99d00] text-[#7b3306] px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <Edit2 className="size-4" />
                Edit Profile
              </button>
            )}
          </div>
          <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
        </div>

        {/* Success Message */}
        {showSaveMessage && (
          <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <span className="text-xl">✓</span>
            <span className="font-semibold">Profile updated successfully!</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Picture & Quick Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-[#973c00] to-[#f0b100] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="size-16 text-white" />
                </div>
                <h2 className="text-xl font-bold text-[#7b3306] mb-1">
                  {profile.name || 'Guest User'}
                </h2>
                <p className="text-sm text-gray-600">{profile.email || 'No email set'}</p>
              </div>

              <div className="border-t border-gray-200 pt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="size-5 text-[#973c00]" />
                  <span className="text-gray-700">{profile.email || 'Not provided'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="size-5 text-[#973c00]" />
                  <span className="text-gray-700">{profile.phone || 'Not provided'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="size-5 text-[#973c00]" />
                  <span className="text-gray-700">
                    {profile.city || 'Not provided'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
              <h3 className="text-xl font-bold text-[#7b3306] mb-6 flex items-center gap-2">
                <User className="size-5" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#7b3306] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0b100] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#7b3306] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0b100] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#7b3306] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0b100] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#7b3306] mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0b100] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Your City"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#7b3306] mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0b100] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="123 Main Street"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#7b3306] mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={profile.zipCode}
                    onChange={(e) => setProfile({ ...profile, zipCode: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0b100] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="12345"
                  />
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
              <h3 className="text-xl font-bold text-[#7b3306] mb-6 flex items-center gap-2">
                <Mail className="size-5" />
                Email Preferences
              </h3>
              
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.preferences.orderUpdates}
                    onChange={(e) => setProfile({
                      ...profile,
                      preferences: { ...profile.preferences, orderUpdates: e.target.checked }
                    })}
                    disabled={!isEditing}
                    className="w-5 h-5 text-[#f0b100] rounded focus:ring-[#f0b100] disabled:cursor-not-allowed"
                  />
                  <div>
                    <p className="font-semibold text-[#7b3306]">Order Updates</p>
                    <p className="text-sm text-gray-600">Receive notifications about your orders</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.preferences.newsletter}
                    onChange={(e) => setProfile({
                      ...profile,
                      preferences: { ...profile.preferences, newsletter: e.target.checked }
                    })}
                    disabled={!isEditing}
                    className="w-5 h-5 text-[#f0b100] rounded focus:ring-[#f0b100] disabled:cursor-not-allowed"
                  />
                  <div>
                    <p className="font-semibold text-[#7b3306]">Newsletter</p>
                    <p className="text-sm text-gray-600">Get farm updates and seasonal tips</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.preferences.promotions}
                    onChange={(e) => setProfile({
                      ...profile,
                      preferences: { ...profile.preferences, promotions: e.target.checked }
                    })}
                    disabled={!isEditing}
                    className="w-5 h-5 text-[#f0b100] rounded focus:ring-[#f0b100] disabled:cursor-not-allowed"
                  />
                  <div>
                    <p className="font-semibold text-[#7b3306]">Promotions & Offers</p>
                    <p className="text-sm text-gray-600">Special deals and discounts</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
              <h3 className="text-xl font-bold text-[#7b3306] mb-4 flex items-center gap-2">
                <Lock className="size-5" />
                Account Security
              </h3>
              <p className="text-gray-600 mb-4">
                Keep your account secure by updating your password regularly.
              </p>
              <button
                className="bg-gray-100 hover:bg-gray-200 text-[#7b3306] px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Change Password
              </button>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-[#f0b100] hover:bg-[#d99d00] text-[#7b3306] py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="size-5" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
