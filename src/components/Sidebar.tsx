'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import {
	Home,
	Plus,
	Search,
	FileText,
	Settings,
	Users,
	BookOpen,
	ChevronLeft,
	LogOut,
} from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { useAuthStore } from '@/stores/authStore';
import { useReportsStore } from '@/stores/reportsStore';
import type { ViewType } from '@/types';

export const Sidebar: React.FC = () => {
	const t = useTranslations();
	const { currentView, sidebarOpen, setCurrentView, setSidebarOpen } =
		useUIStore();
	const { user, logout, checkPermission } = useAuthStore();
	const { reports } = useReportsStore();

	const navigationItems = [
		{
			id: 'new-report',
			label: t('navigation.newReport'),
			icon: Plus,
			show: checkPermission('create_reports'),
		},
		{
			id: 'search-reports',
			label: t('navigation.searchReports'),
			icon: Search,
			show: true,
		},
		{
			id: 'templates',
			label: t('navigation.templates'),
			icon: BookOpen,
			show: checkPermission('manage_templates'),
		},
	];

	const recentReports = reports.slice(0, 5);

	return (
		<div
			className={`bg-gray-900 text-white h-screen transition-all duration-300 ${
				sidebarOpen ? 'w-64' : 'w-16'
			} overflow-hidden flex flex-col`}
		>
			{/* Header */}
			<div className="p-4 border-b border-gray-700">
				<div className="flex items-center justify-between">
					{sidebarOpen && (
						<h1 className="text-xl font-bold truncate">{t('report.title')}</h1>
					)}
					<button
						onClick={() => setSidebarOpen(!sidebarOpen)}
						className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
					>
						<ChevronLeft
							className={`transform transition-transform ${
								sidebarOpen ? 'rotate-0' : 'rotate-180'
							}`}
							size={20}
						/>
					</button>
				</div>
			</div>

			{/* Navigation */}
			<nav className="flex-1 p-4 space-y-2">
				{navigationItems.map((item) => {
					if (!item.show) return null;

					const Icon = item.icon;
					const isActive = currentView === item.id;

					return (
						<button
							key={item.id}
							onClick={() => setCurrentView(item.id as ViewType)}
							className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
								isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
							}`}
							title={!sidebarOpen ? item.label : undefined}
						>
							<Icon size={20} />
							{sidebarOpen && <span className="truncate">{item.label}</span>}
						</button>
					);
				})}

				{/* Recent Reports */}
				{sidebarOpen && recentReports.length > 0 && (
					<div className="mt-6 pt-4 border-t border-gray-700">
						<h3 className="text-sm font-semibold text-gray-400 mb-3">
							{t('navigation.recentReports')}
						</h3>
						<div className="space-y-1">
							{recentReports.map((report) => (
								<button
									key={report.id}
									onClick={() =>
										setCurrentView(`report-${report.id}` as ViewType)
									}
									className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 text-left"
								>
									<FileText size={16} />
									<div className="truncate flex-1">
										<div className="text-sm truncate">{report.title}</div>
										<div className="text-xs text-gray-400">
											{report.referenceNumber}
										</div>
									</div>
								</button>
							))}
						</div>
					</div>
				)}
			</nav>

			{/* User Profile */}
			<div className="p-4 border-t border-gray-700">
				{sidebarOpen && user && (
					<div className="space-y-2">
						<div className="flex items-center gap-3 p-2">
							<div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
								<span className="text-sm font-medium">
									{user.name.charAt(0).toUpperCase()}
								</span>
							</div>
							<div className="flex-1 truncate">
								<div className="text-sm font-medium truncate">{user.name}</div>
								<div className="text-xs text-gray-400">
									{t(`auth.roles.${user.role}`)}
								</div>
							</div>
						</div>
						<button
							onClick={logout}
							className="w-full flex items-center gap-3 p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
						>
							<LogOut size={16} />
							<span className="text-sm">{t('auth.logout')}</span>
						</button>
					</div>
				)}

				{!sidebarOpen && (
					<button
						onClick={logout}
						className="w-full p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
						title={t('auth.logout')}
					>
						<LogOut size={20} />
					</button>
				)}
			</div>
		</div>
	);
};
