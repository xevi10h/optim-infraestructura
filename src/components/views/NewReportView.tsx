'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	FileText,
	MessageSquare,
	Eye,
	Save,
	Copy,
	Download,
} from 'lucide-react';
import { ChatInterface } from '../ChatInterface';
import { useReportsStore } from '@/stores/useReportsStore';

export const NewReportView: React.FC = () => {
	const t = useTranslations();
	const { addReport, clearMessages } = useReportsStore();
	const [referenceNumber, setReferenceNumber] = useState('');
	const [reportTitle, setReportTitle] = useState('');
	const [generatedContent, setGeneratedContent] = useState('');

	const handleSaveReport = () => {
		if (!referenceNumber || !reportTitle || !generatedContent) {
			alert(t('validation.completeFields'));
			return;
		}

		addReport({
			referenceNumber,
			title: reportTitle,
			creationDate: new Date().toISOString().split('T')[0],
			status: 'draft',
			content: generatedContent,
		});

		alert(t('validation.reportSaved'));

		// Clear form
		setReferenceNumber('');
		setReportTitle('');
		setGeneratedContent('');
		clearMessages();
	};

	const handleClearContent = () => {
		setGeneratedContent('');
		clearMessages();
	};

	return (
		<div className="max-w-7xl mx-auto p-6">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					{t('report.new')}
				</h1>
				<p className="text-gray-600">{t('report.description')}</p>
			</div>

			<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
				{/* Left Panel - Configuration */}
				<div className="space-y-6">
					<div className="bg-white rounded-lg border border-gray-200 p-6">
						<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
							<FileText className="text-blue-500" size={24} />
							{t('report.information')}
						</h2>

						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									{t('report.referenceNumber')} *
								</label>
								<input
									type="text"
									value={referenceNumber}
									onChange={(e) => setReferenceNumber(e.target.value)}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									placeholder={t('report.placeholders.referenceNumber')}
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									{t('report.reportTitle')} *
								</label>
								<input
									type="text"
									value={reportTitle}
									onChange={(e) => setReportTitle(e.target.value)}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									placeholder={t('report.placeholders.title')}
								/>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-lg border border-gray-200 p-6">
						<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
							<MessageSquare className="text-green-500" size={20} />
							{t('report.aiAssistant')}
						</h3>
						<ChatInterface onContentGenerated={setGeneratedContent} />
					</div>
				</div>

				{/* Right Panel - Preview */}
				<div className="space-y-6">
					<div className="bg-white rounded-lg border border-gray-200 p-6">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-xl font-semibold flex items-center gap-2">
								<Eye className="text-purple-500" size={24} />
								{t('report.preview')}
							</h2>

							{generatedContent && (
								<div className="flex gap-2">
									<button
										onClick={() =>
											navigator.clipboard.writeText(generatedContent)
										}
										className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
										title={t('common.copy')}
									>
										<Copy size={16} />
									</button>
									<button
										className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
										title={t('common.download')}
									>
										<Download size={16} />
									</button>
								</div>
							)}
						</div>

						<div className="border border-gray-200 rounded-lg p-4 bg-gray-50 min-h-96 max-h-96 overflow-y-auto">
							{generatedContent ? (
								<div className="whitespace-pre-wrap text-sm leading-relaxed font-mono">
									{generatedContent}
								</div>
							) : (
								<div className="flex items-center justify-center h-full text-gray-500">
									<div className="text-center">
										<FileText
											size={48}
											className="mx-auto mb-4 text-gray-300"
										/>
										<p className="text-lg font-medium">{t('report.content')}</p>
										<p className="text-sm">{t('report.useChat')}</p>
									</div>
								</div>
							)}
						</div>

						<div className="mt-6 flex gap-4">
							<button
								onClick={handleSaveReport}
								disabled={!generatedContent || !referenceNumber || !reportTitle}
								className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							>
								<Save size={20} />
								{t('report.saveReport')}
							</button>

							<button
								onClick={handleClearContent}
								className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
							>
								{t('common.clear')}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
