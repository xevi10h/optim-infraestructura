'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { BookOpen, Plus } from 'lucide-react';

export const TemplatesView: React.FC = () => {
	const t = useTranslations();

	return (
		<div className="max-w-7xl mx-auto p-6">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					{t('templates.title')}
				</h1>
				<p className="text-gray-600">{t('templates.description')}</p>
			</div>

			<div className="bg-white rounded-lg border border-gray-200 p-8">
				<div className="text-center">
					<BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
					<h3 className="text-lg font-medium text-gray-900 mb-2">
						Templates Management
					</h3>
					<p className="text-gray-600 mb-4">
						This feature will be implemented in Phase 2: Report Templates and
						Management
					</p>
					<button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mx-auto">
						<Plus size={16} />
						{t('templates.new')}
					</button>
				</div>
			</div>
		</div>
	);
};
