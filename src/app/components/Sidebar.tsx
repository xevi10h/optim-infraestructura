'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Plus, Search, FileText, X } from 'lucide-react';
import { useReports } from '@/contexts/ReportsContext';
import type { ViewType } from '@/types';

interface SidebarProps {
	currentView: ViewType;
	onViewChange: (view: ViewType) => void;
	isOpen: boolean;
	onToggle: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
	currentView,
	onViewChange,
	isOpen,
	onToggle,
}) => {
	const t = useTranslations();
	const { reports } = useReports();

	return (
		<div
			className={`bg-gray-900 text-white h-screen transition-all duration-300 ${
				isOpen ? 'w-64' : 'w-0'
			} overflow-hidden flex flex-col`}
		>
			<div className="p-4 border-b border-gray-700">
				<div className="flex items-center justify-between">
					<h1 className="text-xl font-bold">{t('report.title')}</h1>
					<button
						onClick={() => onToggle(false)}
						className="lg:hidden text-gray-400 hover:text-white"
					>
						<X size={20} />
					</button>
				</div>
			</div>

			<nav className="flex-1 p-4">
				<button
					onClick={() => onViewChange('new')}
					className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
						currentView === 'new' ? 'bg-blue-600' : 'hover:bg-gray-800'
					}`}
				>
					<Plus size={20} />
					{t('navigation.newReport')}
				</button>

				<button
					onClick={() => onViewChange('search')}
					className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
						currentView === 'search' ? 'bg-blue-600' : 'hover:bg-gray-800'
					}`}
				>
					<Search size={20} />
					{t('navigation.searchReports')}
				</button>

				<div className="mt-6">
					<h3 className="text-sm font-semibold text-gray-400 mb-3">
						{t('navigation.recentReports')}
					</h3>
					{reports.slice(0, 5).map((report) => (
						<button
							key={report.id}
							onClick={() => onViewChange(`report-${report.id}` as ViewType)}
							className="w-full flex items-center gap-3 p-2 rounded-lg mb-1 hover:bg-gray-800 text-left"
						>
							<FileText size={16} />
							<div className="truncate">
								<div className="text-sm truncate">{report.title}</div>
								<div className="text-xs text-gray-400">
									{report.referenceNumber}
								</div>
							</div>
						</button>
					))}
				</div>
			</nav>
		</div>
	);
};
