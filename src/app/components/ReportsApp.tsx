'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { NewReportView } from './views/NewReportView';
import { SearchReportsView } from './views/SearchReportsView';
import { ReportDetailView } from './views/ReportDetailView';
import { ReportsProvider } from '@/contexts/ReportsContext';
import type { ViewType } from '@/types';

export const ReportsApp: React.FC = () => {
	const [currentView, setCurrentView] = useState<ViewType>('new');
	const [sidebarOpen, setSidebarOpen] = useState(true);

	const renderCurrentView = () => {
		if (currentView === 'new') return <NewReportView />;
		if (currentView === 'search') return <SearchReportsView />;
		if (currentView.startsWith('report-')) {
			const reportId = parseInt(currentView.split('-')[1]);
			return <ReportDetailView reportId={reportId} />;
		}
		return <NewReportView />;
	};

	return (
		<ReportsProvider>
			<div className="flex h-screen bg-gray-50">
				<Sidebar
					currentView={currentView}
					onViewChange={setCurrentView}
					isOpen={sidebarOpen}
					onToggle={setSidebarOpen}
				/>

				<div className="flex-1 flex flex-col overflow-hidden">
					<Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

					<main className="flex-1 overflow-y-auto">{renderCurrentView()}</main>
				</div>
			</div>
		</ReportsProvider>
	);
};
