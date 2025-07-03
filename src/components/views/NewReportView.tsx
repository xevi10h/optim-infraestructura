'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
	FileText,
	MessageSquare,
	Eye,
	Save,
	Copy,
	Download,
	Send,
	Sparkles,
	AlertCircle,
	CheckCircle,
	X,
	Tag,
	DollarSign,
	Building,
} from 'lucide-react';
import { useReportsStore } from '@/stores/reportsStore';
import { useChatStore } from '@/stores/chatStore';
import { useUIStore } from '@/stores/uiStore';
import { ReportCategory, Priority, ReportFormData } from '@/types';

export const NewReportView: React.FC = () => {
	const t = useTranslations();
	const { createReport, isLoading: reportLoading } = useReportsStore();
	const {
		conversations,
		currentConversationId,
		isGenerating,
		extractedData,
		addMessage,
		generateResponse,
		setCurrentConversation,
		setExtractedData,
	} = useChatStore();
	const { addNotification } = useUIStore();

	const [formData, setFormData] = useState<ReportFormData>({
		referenceNumber: '',
		title: '',
		category: ReportCategory.OTHER,
		priority: Priority.MEDIUM,
		department: '',
		estimatedBudget: undefined,
		templateId: undefined,
		customFields: {},
	});

	const [chatInput, setChatInput] = useState('');
	const [generatedContent, setGeneratedContent] = useState('');
	const [tagInput, setTagInput] = useState('');
	const [validationErrors, setValidationErrors] = useState<string[]>([]);

	const conversationId = 'new-report';
	const messages = conversations[conversationId] || [];

	useEffect(() => {
		setCurrentConversation(conversationId);
	}, [setCurrentConversation]);

	// Update form with extracted data from AI
	useEffect(() => {
		if (extractedData) {
			setFormData((prev) => ({
				...prev,
				title: extractedData.title || prev.title,
				category: extractedData.category || prev.category,
				department: extractedData.department || prev.department,
				estimatedBudget: extractedData.estimatedBudget || prev.estimatedBudget,
			}));
		}
	}, [extractedData]);

	const handleInputChange = (field: keyof ReportFormData, value: any) => {
		setFormData((prev) => ({ ...prev, [field]: value }));

		// Clear validation errors when user starts typing
		if (validationErrors.length > 0) {
			setValidationErrors([]);
		}
	};

	const handleSendMessage = async () => {
		if (!chatInput.trim()) return;

		setChatInput('');
		await generateResponse(conversationId, chatInput);

		// Extract content from the latest AI response
		const updatedMessages = conversations[conversationId] || [];
		const lastMessage = updatedMessages[updatedMessages.length - 1];

		if (lastMessage && lastMessage.type === 'assistant') {
			setGeneratedContent(lastMessage.content);
		}
	};

	const validateForm = (): boolean => {
		const errors: string[] = [];

		if (!formData.referenceNumber) errors.push(t('validation.required'));
		if (!formData.title) errors.push(t('validation.required'));
		if (!formData.department) errors.push(t('validation.required'));
		if (!generatedContent) errors.push('Generated content is required');

		setValidationErrors(errors);
		return errors.length === 0;
	};

	const handleSaveReport = async () => {
		if (!validateForm()) {
			addNotification({
				type: 'error',
				title: t('validation.error'),
				message: t('validation.completeFields'),
			});
			return;
		}

		try {
			const report = await createReport({
				...formData,
				customFields: { content: generatedContent },
			});

			addNotification({
				type: 'success',
				title: t('notifications.reportCreated'),
				message: `Report ${report.referenceNumber} created successfully`,
			});

			// Reset form
			setFormData({
				referenceNumber: '',
				title: '',
				category: ReportCategory.OTHER,
				priority: Priority.MEDIUM,
				department: '',
				estimatedBudget: undefined,
				templateId: undefined,
				customFields: {},
			});
			setGeneratedContent('');
			setExtractedData(null);
		} catch (error) {
			addNotification({
				type: 'error',
				title: t('notifications.error'),
				message: 'Failed to create report',
			});
		}
	};

	const handleCopyContent = () => {
		navigator.clipboard.writeText(generatedContent);
		addNotification({
			type: 'success',
			title: t('common.copy'),
			message: 'Content copied to clipboard',
		});
	};

	const handleClearAll = () => {
		setGeneratedContent('');
		setExtractedData(null);
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
				{/* Left Panel - Form Configuration */}
				<div className="space-y-6">
					{/* Basic Information */}
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
									value={formData.referenceNumber}
									onChange={(e) =>
										handleInputChange('referenceNumber', e.target.value)
									}
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
									value={formData.title}
									onChange={(e) => handleInputChange('title', e.target.value)}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									placeholder={t('report.placeholders.title')}
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										{t('report.category')}
									</label>
									<select
										value={formData.category}
										onChange={(e) =>
											handleInputChange(
												'category',
												e.target.value as ReportCategory,
											)
										}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									>
										{Object.values(ReportCategory).map((category) => (
											<option key={category} value={category}>
												{t(`report.categories.${category}`)}
											</option>
										))}
									</select>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										{t('report.priority')}
									</label>
									<select
										value={formData.priority}
										onChange={(e) =>
											handleInputChange('priority', e.target.value as Priority)
										}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									>
										{Object.values(Priority).map((priority) => (
											<option key={priority} value={priority}>
												{t(`report.priorities.${priority}`)}
											</option>
										))}
									</select>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									{t('report.department')} *
								</label>
								<div className="relative">
									<Building
										className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
										size={20}
									/>
									<input
										type="text"
										value={formData.department}
										onChange={(e) =>
											handleInputChange('department', e.target.value)
										}
										className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										placeholder={t('report.placeholders.department')}
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									{t('report.estimatedBudget')}
								</label>
								<div className="relative">
									<DollarSign
										className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
										size={20}
									/>
									<input
										type="number"
										value={formData.estimatedBudget || ''}
										onChange={(e) =>
											handleInputChange(
												'estimatedBudget',
												parseFloat(e.target.value) || undefined,
											)
										}
										className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										placeholder="0.00"
									/>
								</div>
							</div>
						</div>
					</div>

					{/* AI Assistant */}
					<div className="bg-white rounded-lg border border-gray-200 p-6">
						<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
							<MessageSquare className="text-green-500" size={20} />
							{t('report.aiAssistant')}
						</h3>

						<div className="border border-gray-200 rounded-lg h-64 flex flex-col">
							<div className="flex-1 overflow-y-auto p-4">
								{messages.length === 0 ? (
									<div className="text-center text-gray-500 mt-8">
										<Sparkles
											size={48}
											className="mx-auto mb-4 text-gray-300"
										/>
										<p className="text-lg font-medium mb-2">
											{t('chat.greeting')}
										</p>
										<p className="text-sm">{t('chat.description')}</p>
									</div>
								) : (
									<div className="space-y-4">
										{messages.map((message) => (
											<div
												key={message.id}
												className={`flex ${
													message.type === 'user'
														? 'justify-end'
														: 'justify-start'
												}`}
											>
												<div
													className={`max-w-3xl px-4 py-2 rounded-lg ${
														message.type === 'user'
															? 'bg-blue-500 text-white'
															: 'bg-gray-100 text-gray-800'
													}`}
												>
													<div className="whitespace-pre-wrap text-sm">
														{message.content}
													</div>
												</div>
											</div>
										))}
									</div>
								)}

								{isGenerating && (
									<div className="flex justify-start">
										<div className="bg-gray-100 px-4 py-2 rounded-lg">
											<div className="flex items-center gap-2">
												<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
												<span className="text-gray-600">
													{t('chat.generating')}
												</span>
											</div>
										</div>
									</div>
								)}
							</div>

							<div className="border-t border-gray-200 p-4">
								<div className="flex gap-2">
									<input
										type="text"
										value={chatInput}
										onChange={(e) => setChatInput(e.target.value)}
										onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
										placeholder={t('report.placeholders.chatInput')}
										className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										disabled={isGenerating}
									/>
									<button
										onClick={handleSendMessage}
										disabled={isGenerating || !chatInput.trim()}
										className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
									>
										<Send size={20} />
									</button>
								</div>
							</div>
						</div>
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
										onClick={handleCopyContent}
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
								<div className="whitespace-pre-wrap text-sm leading-relaxed">
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

						{/* Validation Errors */}
						{validationErrors.length > 0 && (
							<div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
								<div className="flex items-center gap-2 text-red-800">
									<AlertCircle size={16} />
									<span className="font-medium">Validation Errors:</span>
								</div>
								<ul className="mt-2 text-sm text-red-700">
									{validationErrors.map((error, index) => (
										<li key={index}>• {error}</li>
									))}
								</ul>
							</div>
						)}

						{/* Action Buttons */}
						<div className="mt-6 flex gap-4">
							<button
								onClick={handleSaveReport}
								disabled={reportLoading || !generatedContent}
								className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							>
								{reportLoading ? (
									<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
								) : (
									<Save size={20} />
								)}
								{t('report.saveReport')}
							</button>

							<button
								onClick={handleClearAll}
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
