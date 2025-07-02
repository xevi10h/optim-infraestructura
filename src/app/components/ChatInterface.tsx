'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Send, MessageSquare } from 'lucide-react';
import { useReports } from '@/contexts/ReportsContext';
import { generateMockReport } from '@/utils/reportGenerator';

interface ChatInterfaceProps {
	onContentGenerated: (content: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
	onContentGenerated,
}) => {
	const t = useTranslations();
	const { messages, addMessage, isLoading, setIsLoading } = useReports();
	const [inputMessage, setInputMessage] = useState('');
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSendMessage = async () => {
		if (!inputMessage.trim()) return;

		addMessage({
			type: 'user',
			content: inputMessage,
			timestamp: new Date(),
		});

		setInputMessage('');
		setIsLoading(true);

		// Simulate AI response
		setTimeout(() => {
			const generatedContent = generateMockReport(inputMessage);

			addMessage({
				type: 'assistant',
				content: generatedContent,
				timestamp: new Date(),
			});

			onContentGenerated(generatedContent);
			setIsLoading(false);
		}, 2000);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<div className="flex flex-col h-96 border border-gray-300 rounded-lg bg-white">
			<div className="flex-1 overflow-y-auto p-4">
				{messages.length === 0 && (
					<div className="text-center text-gray-500 mt-20">
						<MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
						<p className="text-lg font-medium mb-2">{t('chat.greeting')}</p>
						<p className="text-sm">{t('chat.description')}</p>
						<div className="mt-6 space-y-2">
							<div className="bg-gray-50 p-3 rounded-lg text-left">
								<p className="font-medium text-sm">{t('chat.examples')}</p>
								<ul className="text-xs text-gray-600 mt-2 space-y-1">
									{['exampleItems.0', 'exampleItems.1', 'exampleItems.2'].map(
										(key, index) => (
											<li key={index}>• {t(`chat.${key}`)}</li>
										),
									)}
								</ul>
							</div>
						</div>
					</div>
				)}

				{messages.map((message) => (
					<div
						key={message.id}
						className={`mb-4 flex ${
							message.type === 'user' ? 'justify-end' : 'justify-start'
						}`}
					>
						<div
							className={`max-w-3xl px-4 py-3 rounded-lg ${
								message.type === 'user'
									? 'bg-blue-500 text-white'
									: 'bg-gray-100 text-gray-800'
							}`}
						>
							<div className="whitespace-pre-wrap">{message.content}</div>
							<div className="text-xs opacity-70 mt-2">
								{message.timestamp.toLocaleTimeString('es-ES', {
									hour: '2-digit',
									minute: '2-digit',
								})}
							</div>
						</div>
					</div>
				))}

				{isLoading && (
					<div className="flex justify-start mb-4">
						<div className="bg-gray-100 px-4 py-3 rounded-lg">
							<div className="flex items-center gap-2">
								<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
								<span className="text-gray-600">{t('chat.generating')}</span>
							</div>
						</div>
					</div>
				)}

				<div ref={messagesEndRef} />
			</div>

			<div className="border-t border-gray-200 p-4">
				<div className="flex gap-2">
					<input
						type="text"
						value={inputMessage}
						onChange={(e) => setInputMessage(e.target.value)}
						onKeyPress={handleKeyPress}
						placeholder={t('report.placeholders.chatInput')}
						className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						disabled={isLoading}
					/>
					<button
						onClick={handleSendMessage}
						disabled={isLoading || !inputMessage.trim()}
						className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						<Send size={20} />
					</button>
				</div>
			</div>
		</div>
	);
};
