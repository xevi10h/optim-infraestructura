'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Settings, Save } from 'lucide-react';
import { UserProfile } from '../auth/UserProfile';

export const SettingsView: React.FC = () => {
	const t = useTranslations();

	return (
		<div className="max-w-4xl mx-auto p-6 space-y-6">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					{t('navigation.settings')}
				</h1>
				<p className="text-gray-600">
					Manage your account and application settings
				</p>
			</div>

			<UserProfile />

			<div className="bg-white rounded-lg border border-gray-200 p-6">
				<h2 className="text-xl font-semibold text-gray-900 mb-4">
					Application Settings
				</h2>
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium text-gray-900">Email Notifications</h3>
							<p className="text-sm text-gray-600">
								Receive notifications about report updates
							</p>
						</div>
						<label className="relative inline-flex items-center cursor-pointer">
							<input type="checkbox" className="sr-only peer" defaultChecked />
							<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
						</label>
					</div>

					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium text-gray-900">Auto-save Drafts</h3>
							<p className="text-sm text-gray-600">
								Automatically save drafts while editing
							</p>
						</div>
						<label className="relative inline-flex items-center cursor-pointer">
							<input type="checkbox" className="sr-only peer" defaultChecked />
							<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
						</label>
					</div>
				</div>

				<div className="mt-6 pt-4 border-t border-gray-200">
					<button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
						<Save size={16} />
						{t('common.save')}
					</button>
				</div>
			</div>
		</div>
	);
};
