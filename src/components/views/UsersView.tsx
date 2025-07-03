'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Users, Plus } from 'lucide-react';

export const UsersView: React.FC = () => {
	const t = useTranslations();

	return (
		<div className="max-w-7xl mx-auto p-6">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					{t('navigation.users')}
				</h1>
				<p className="text-gray-600">User management and role assignment</p>
			</div>

			<div className="bg-white rounded-lg border border-gray-200 p-8">
				<div className="text-center">
					<Users size={48} className="mx-auto mb-4 text-gray-300" />
					<h3 className="text-lg font-medium text-gray-900 mb-2">
						User Management
					</h3>
					<p className="text-gray-600 mb-4">
						This feature will be implemented in Phase 5: Review System and Roles
					</p>
					<button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mx-auto">
						<Plus size={16} />
						Add User
					</button>
				</div>
			</div>
		</div>
	);
};
