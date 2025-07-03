'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	User,
	Mail,
	Phone,
	MapPin,
	Calendar,
	LogOut,
	Edit3,
	Save,
	X,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

export const UserProfile: React.FC = () => {
	const t = useTranslations();
	const { user, organization, logout, updateUserProfile } = useAuthStore();
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		name: user?.name || '',
		email: user?.email || '',
	});

	if (!user || !organization) return null;

	const handleSave = async () => {
		try {
			await updateUserProfile(formData);
			setIsEditing(false);
		} catch (error) {
			console.error('Error updating profile:', error);
		}
	};

	const handleCancel = () => {
		setFormData({
			name: user.name,
			email: user.email,
		});
		setIsEditing(false);
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-xl font-semibold text-gray-900">
					{t('auth.profile.title')}
				</h2>
				{!isEditing ? (
					<button
						onClick={() => setIsEditing(true)}
						className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
					>
						<Edit3 size={16} />
						{t('common.edit')}
					</button>
				) : (
					<div className="flex gap-2">
						<button
							onClick={handleSave}
							className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
						>
							<Save size={16} />
							{t('common.save')}
						</button>
						<button
							onClick={handleCancel}
							className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
						>
							<X size={16} />
							{t('common.cancel')}
						</button>
					</div>
				)}
			</div>

			<div className="space-y-6">
				{/* User Information */}
				<div>
					<h3 className="text-lg font-medium text-gray-900 mb-4">
						{t('auth.profile.userInfo')}
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								{t('auth.fields.name')}
							</label>
							{isEditing ? (
								<input
									type="text"
									value={formData.name}
									onChange={(e) =>
										setFormData((prev) => ({ ...prev, name: e.target.value }))
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							) : (
								<div className="flex items-center gap-2 text-gray-900">
									<User size={16} />
									{user.name}
								</div>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								{t('auth.fields.email')}
							</label>
							{isEditing ? (
								<input
									type="email"
									value={formData.email}
									onChange={(e) =>
										setFormData((prev) => ({ ...prev, email: e.target.value }))
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							) : (
								<div className="flex items-center gap-2 text-gray-900">
									<Mail size={16} />
									{user.email}
								</div>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								{t('auth.fields.role')}
							</label>
							<div className="text-gray-900">
								<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
									{t(`auth.roles.${user.role}`)}
								</span>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								{t('auth.fields.memberSince')}
							</label>
							<div className="flex items-center gap-2 text-gray-900">
								<Calendar size={16} />
								{new Date(user.createdAt).toLocaleDateString()}
							</div>
						</div>
					</div>
				</div>

				{/* Organization Information */}
				<div>
					<h3 className="text-lg font-medium text-gray-900 mb-4">
						{t('auth.profile.organizationInfo')}
					</h3>
					<div className="bg-gray-50 rounded-lg p-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									{t('organization.name')}
								</label>
								<p className="text-gray-900">{organization.name}</p>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									{t('organization.code')}
								</label>
								<p className="text-gray-900">{organization.code}</p>
							</div>

							<div className="md:col-span-2">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									{t('organization.address')}
								</label>
								<div className="flex items-start gap-2 text-gray-900">
									<MapPin size={16} className="mt-0.5" />
									<div>
										<p>{organization.address.street}</p>
										<p>
											{organization.address.postalCode}{' '}
											{organization.address.city}
										</p>
										<p>
											{organization.address.province},{' '}
											{organization.address.country}
										</p>
									</div>
								</div>
							</div>

							{organization.contactInfo.phone && (
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										{t('organization.phone')}
									</label>
									<div className="flex items-center gap-2 text-gray-900">
										<Phone size={16} />
										{organization.contactInfo.phone}
									</div>
								</div>
							)}

							{organization.contactInfo.email && (
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										{t('organization.email')}
									</label>
									<div className="flex items-center gap-2 text-gray-900">
										<Mail size={16} />
										{organization.contactInfo.email}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Logout Button */}
				<div className="border-t border-gray-200 pt-6">
					<button
						onClick={logout}
						className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
					>
						<LogOut size={16} />
						{t('auth.logout')}
					</button>
				</div>
			</div>
		</div>
	);
};
