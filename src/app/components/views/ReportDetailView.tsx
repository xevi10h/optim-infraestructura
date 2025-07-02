'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Edit3, Download } from 'lucide-react';
import { useReports } from '@/contexts/ReportsContext';
import { generateMockReport } from '@/utils/reportGenerator';

interface ReportDetailViewProps {
	reportId: number;
}

export const ReportDetailView: React.FC<ReportDetailViewProps> = ({
	reportId,
}) => {
	const t = useTranslations();
	const { getReportById } = useReports();

	const report = getReportById(reportId);

	if (!report) {
		return (
			<div className="max-w-4xl mx-auto p-6">
				<div className="text-center py-12">
					<p className="text-gray-500 text-lg">
						{t('validation.reportNotFound')}
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto p-6">
			<div className="bg-white rounded-lg border border-gray-200 p-8">
				<div className="flex items-center justify-between mb-6">
					<div>
						<h1 className="text-2xl font-bold text-gray-900">{report.title}</h1>
						<p className="text-gray-600 mt-1">
							{t('report.referenceNumber')}: {report.referenceNumber}
						</p>
					</div>
					<div className="flex gap-2">
						<button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
							<Edit3 size={16} />
							{t('common.edit')}
						</button>
						<button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
							<Download size={16} />
							{t('common.download')}
						</button>
					</div>
				</div>

				<div className="prose max-w-none">
					<div className="whitespace-pre-wrap text-sm leading-relaxed">
						{report.content || generateMockReport('example')}
					</div>
				</div>
			</div>
		</div>
	);
};
