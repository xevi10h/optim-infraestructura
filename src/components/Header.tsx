'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Bell, User } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';

export const Header: React.FC = () => {
	const t = useTranslations();
	const { user, organization } = useAuthStore();
	const { notifications } = useUIStore();

	const unreadNotifications = notifications.filter((n) => !n.read).length;

	return (
		<header className="bg-white border-b border-gray-200 px-6 py-4">
			<div className="flex items-center justify-between">
				{/* Organization Info */}
				<div className="flex items-center gap-4">
					<div className="text-sm text-gray-600">
						{organization?.name || 'Digital Public Administration'}
					</div>
				</div>

				{/* Right Side */}
				<div className="flex items-center gap-4">
					<LanguageSwitcher />

					{/* Notifications */}
					<button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
						<Bell size={20} />
						{unreadNotifications > 0 && (
							<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
								{unreadNotifications}
							</span>
						)}
					</button>

					{/* User Menu */}
					<div className="flex items-center gap-3">
						<div className="text-right">
							<div className="text-sm font-medium text-gray-900">
								{user?.name}
							</div>
							<div className="text-xs text-gray-500">
								{t(`auth.roles.${user?.role}`)}
							</div>
						</div>
						<button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
							<User size={20} />
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};
