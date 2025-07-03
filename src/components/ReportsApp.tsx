'use client';

import React, { useEffect } from 'react';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { NotificationSystem } from './ui/NotificationSystem';
import { DashboardView } from './views/DashboardView';
import { NewReportView } from './views/NewReportView';
import { SearchReportsView } from './views/SearchReportsView';
import { ReportDetailView } from './views/ReportDetailView';
import { TemplatesView } from './views/TemplatesView';
import { UsersView } from './views/UsersView';
import { SettingsView } from './views/SettingsView';
import { useUIStore } from '@/stores/uiStore';
import { useReportsStore } from '@/stores';

export const ReportsApp: React.FC = () => {
	const { currentView } = useUIStore();

	const { fetchReports } = useReportsStore();

	useEffect(() => {
		fetchReports();
	}, [fetchReports]);

	const renderCurrentView = () => {
		switch (currentView) {
			case 'dashboard':
				return <DashboardView />;
			case 'new-report':
				return <NewReportView />;
			case 'search-reports':
				return <SearchReportsView />;
			case 'templates':
				return <TemplatesView />;
			case 'users':
				return <UsersView />;
			case 'settings':
				return <SettingsView />;
			default:
				if (currentView.startsWith('report-')) {
					const reportId = currentView.split('-')[1];
					return <ReportDetailView reportId={reportId} />;
				}
				return <DashboardView />;
		}
	};

	return (
		<ProtectedRoute>
			<div className="flex h-screen bg-gray-50">
				<Sidebar />

				<div className="flex-1 flex flex-col overflow-hidden">
					<Header />
					<main className="flex-1 overflow-y-auto">{renderCurrentView()}</main>
				</div>

				<NotificationSystem />
			</div>
		</ProtectedRoute>
	);
};
