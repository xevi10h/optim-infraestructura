'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, FileText, Eye, Edit3, Trash2 } from 'lucide-react';
import { useReportsStore } from '@/stores/useReportsStore';

export const SearchReportsView: React.FC = () => {
	const t = useTranslations();
	const reports = useReportsStore((state) => state.reports);
	const [searchQuery, setSearchQuery] = useState('');

	const filteredReports = reports.filter(
		(report) =>
			report.referenceNumber
				.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			report.title.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const getStatusBadge = (status: 'draft' | 'finished') => {
		const statusText = t(`status.${status}`);
		const baseClasses = 'text-xs px-2 py-1 rounded-full font-medium';

		if (status === 'finished') {
			return `${baseClasses} bg-green-100 text-green-800`;
		}
		return `${baseClasses} bg-yellow-100 text-yellow-800`;
	};

	return (
		<div className="max-w-6xl mx-auto p-6">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					{t('search.title')}
				</h1>
				<p className="text-gray-600">{t('search.description')}</p>
			</div>

			<div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
				<div className="flex gap-4 mb-6">
					<div className="flex-1 relative">
						<Search
							className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
							size={20}
						/>
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder={t('search.placeholder')}
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>
				</div>

				<div className="space-y-3">
					{filteredReports.map((report) => (
						<div
							key={report.id}
							className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
						>
							<div className="flex items-center justify-between">
								<div className="flex-1">
									<div className="flex items-center gap-3 mb-2">
										<span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
											{report.referenceNumber}
										</span>
										<span className={getStatusBadge(report.status)}>
											{t(`status.${report.status}`)}
										</span>
									</div>
									<h3 className="font-semibold text-gray-900 mb-1">
										{report.title}
									</h3>
									<p className="text-sm text-gray-500">
										{t('search.createdOn')}{' '}
										{new Date(report.creationDate).toLocaleDateString()}
									</p>
								</div>

								<div className="flex gap-2">
									<button
										className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
										title={t('common.view')}
									>
										<Eye size={16} />
									</button>
									<button
										className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
										title={t('common.edit')}
									>
										<Edit3 size={16} />
									</button>
									<button
										className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
										title={t('common.delete')}
									>
										<Trash2 size={16} />
									</button>
								</div>
							</div>
						</div>
					))}

					{filteredReports.length === 0 && (
						<div className="text-center py-12">
							<FileText size={48} className="mx-auto mb-4 text-gray-300" />
							<p className="text-gray-500">
								{searchQuery ? t('search.noResults') : t('search.noReports')}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
