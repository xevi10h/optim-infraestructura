// src/components/views/DashboardView.tsx - Main dashboard
'use client';

import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
	FileText,
	Plus,
	Search,
	BookOpen,
	TrendingUp,
	Clock,
	CheckCircle,
	AlertCircle,
	Users,
	Calendar,
	Activity,
} from 'lucide-react';
import { useReportsStore } from '@/stores/reportsStore';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { ReportStatus, ReportCategory } from '@/types';

export const DashboardView: React.FC = () => {
	const t = useTranslations();
	const { reports, fetchReports } = useReportsStore();
	const { user, organization } = useAuthStore();
	const { setCurrentView } = useUIStore();

	useEffect(() => {
		fetchReports();
	}, [fetchReports]);

	// Calculate statistics
	const stats = {
		total: reports.length,
		draft: reports.filter((r) => r.status === ReportStatus.DRAFT).length,
		inReview: reports.filter((r) => r.status === ReportStatus.IN_REVIEW).length,
		approved: reports.filter((r) => r.status === ReportStatus.APPROVED).length,
		published: reports.filter((r) => r.status === ReportStatus.PUBLISHED)
			.length,
	};

	// Recent reports (last 5)
	const recentReports = reports
		.sort(
			(a, b) =>
				new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
		)
		.slice(0, 5);

	// Reports by category
	const reportsByCategory = Object.values(ReportCategory).map((category) => ({
		category,
		count: reports.filter((r) => r.metadata.category === category).length,
	}));

	const getStatusColor = (status: ReportStatus) => {
		switch (status) {
			case ReportStatus.DRAFT:
				return 'bg-yellow-100 text-yellow-800';
			case ReportStatus.IN_REVIEW:
				return 'bg-blue-100 text-blue-800';
			case ReportStatus.APPROVED:
				return 'bg-green-100 text-green-800';
			case ReportStatus.PUBLISHED:
				return 'bg-purple-100 text-purple-800';
			case ReportStatus.REJECTED:
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	return (
		<div className="max-w-7xl mx-auto p-6 space-y-6">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">
					{t('dashboard.title')}
				</h1>
				<p className="text-gray-600 mt-2">{t('dashboard.subtitle')}</p>
				<div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
					<Calendar size={16} />
					<span>{new Date().toLocaleDateString()}</span>
					<span className="mx-2">•</span>
					<span>{organization?.name}</span>
				</div>
			</div>

			{/* Statistics Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">
								{t('dashboard.stats.totalReports')}
							</p>
							<p className="text-2xl font-bold text-gray-900">{stats.total}</p>
						</div>
						<div className="p-3 bg-blue-100 rounded-full">
							<FileText className="h-6 w-6 text-blue-600" />
						</div>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">
								{t('dashboard.stats.draftReports')}
							</p>
							<p className="text-2xl font-bold text-gray-900">{stats.draft}</p>
						</div>
						<div className="p-3 bg-yellow-100 rounded-full">
							<Clock className="h-6 w-6 text-yellow-600" />
						</div>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">
								{t('dashboard.stats.pendingReview')}
							</p>
							<p className="text-2xl font-bold text-gray-900">
								{stats.inReview}
							</p>
						</div>
						<div className="p-3 bg-orange-100 rounded-full">
							<AlertCircle className="h-6 w-6 text-orange-600" />
						</div>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">
								{t('dashboard.stats.completedReports')}
							</p>
							<p className="text-2xl font-bold text-gray-900">
								{stats.approved + stats.published}
							</p>
						</div>
						<div className="p-3 bg-green-100 rounded-full">
							<CheckCircle className="h-6 w-6 text-green-600" />
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Quick Actions */}
				<div className="lg:col-span-1">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<h2 className="text-lg font-semibold text-gray-900 mb-4">
							{t('dashboard.quickActions.title')}
						</h2>
						<div className="space-y-3">
							<button
								onClick={() => setCurrentView('new-report')}
								className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left"
							>
								<Plus className="h-5 w-5 text-blue-600" />
								<span className="text-blue-700 font-medium">
									{t('dashboard.quickActions.createReport')}
								</span>
							</button>

							<button
								onClick={() => setCurrentView('search-reports')}
								className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
							>
								<Search className="h-5 w-5 text-gray-600" />
								<span className="text-gray-700 font-medium">
									{t('dashboard.quickActions.searchReports')}
								</span>
							</button>

							<button
								onClick={() => setCurrentView('templates')}
								className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
							>
								<BookOpen className="h-5 w-5 text-gray-600" />
								<span className="text-gray-700 font-medium">
									{t('dashboard.quickActions.manageTemplates')}
								</span>
							</button>
						</div>
					</div>

					{/* Reports by Category */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
						<h2 className="text-lg font-semibold text-gray-900 mb-4">
							Reports by Category
						</h2>
						<div className="space-y-3">
							{reportsByCategory.map(({ category, count }) => (
								<div
									key={category}
									className="flex items-center justify-between"
								>
									<span className="text-sm text-gray-600">
										{t(`report.categories.${category}`)}
									</span>
									<span className="text-sm font-medium text-gray-900">
										{count}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Recent Activity */}
				<div className="lg:col-span-2">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-lg font-semibold text-gray-900">
								{t('dashboard.recentActivity.title')}
							</h2>
							<Activity className="h-5 w-5 text-gray-400" />
						</div>

						{recentReports.length > 0 ? (
							<div className="space-y-4">
								{recentReports.map((report) => (
									<div
										key={report.id}
										className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
										onClick={() => setCurrentView(`report-${report.id}`)}
									>
										<div className="flex items-center gap-3">
											<div className="p-2 bg-blue-100 rounded-lg">
												<FileText className="h-4 w-4 text-blue-600" />
											</div>
											<div>
												<h3 className="font-medium text-gray-900">
													{report.title}
												</h3>
												<p className="text-sm text-gray-500">
													{report.referenceNumber}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-3">
											<span
												className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
													report.status,
												)}`}
											>
												{t(`status.${report.status}`)}
											</span>
											<span className="text-sm text-gray-500">
												{new Date(report.updatedAt).toLocaleDateString()}
											</span>
										</div>
									</div>
								))}
							</div>
						) : (
							<div className="text-center py-8 text-gray-500">
								<FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
								<p className="text-lg font-medium">
									{t('dashboard.recentActivity.noActivity')}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Weekly Overview Chart */}
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
				<h2 className="text-lg font-semibold text-gray-900 mb-4">
					Weekly Report Activity
				</h2>
				<div className="h-64 flex items-end justify-center space-x-4">
					{/* Simple bar chart representation */}
					{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
						(day, index) => {
							const height = Math.floor(Math.random() * 200) + 20;
							return (
								<div key={day} className="flex flex-col items-center">
									<div
										className="w-8 bg-blue-500 rounded-t-sm"
										style={{ height: `${height}px` }}
									></div>
									<span className="text-xs text-gray-500 mt-2">{day}</span>
								</div>
							);
						},
					)}
				</div>
			</div>
		</div>
	);
};
