'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Report, ChatMessage } from '@/types';

interface ReportsContextType {
	reports: Report[];
	addReport: (report: Omit<Report, 'id'>) => void;
	updateReport: (id: number, updates: Partial<Report>) => void;
	deleteReport: (id: number) => void;
	getReportById: (id: number) => Report | undefined;
	messages: ChatMessage[];
	addMessage: (message: Omit<ChatMessage, 'id'>) => void;
	clearMessages: () => void;
	isLoading: boolean;
	setIsLoading: (loading: boolean) => void;
}

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

const initialReports: Report[] = [
	{
		id: 1,
		referenceNumber: 'INF-2024-001',
		title: 'Suministro de Material Informático',
		creationDate: '2024-07-01',
		status: 'finished',
	},
	{
		id: 2,
		referenceNumber: 'INF-2024-002',
		title: 'Contratación Servicio de Limpieza',
		creationDate: '2024-06-28',
		status: 'draft',
	},
	{
		id: 3,
		referenceNumber: 'INF-2024-003',
		title: 'Obras de Mejora en Instalaciones',
		creationDate: '2024-06-25',
		status: 'finished',
	},
];

export const ReportsProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [reports, setReports] = useState<Report[]>(initialReports);
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const addReport = (report: Omit<Report, 'id'>) => {
		const newReport: Report = {
			...report,
			id: Date.now(),
		};
		setReports((prev) => [newReport, ...prev]);
	};

	const updateReport = (id: number, updates: Partial<Report>) => {
		setReports((prev) =>
			prev.map((report) =>
				report.id === id ? { ...report, ...updates } : report,
			),
		);
	};

	const deleteReport = (id: number) => {
		setReports((prev) => prev.filter((report) => report.id !== id));
	};

	const getReportById = (id: number) => {
		return reports.find((report) => report.id === id);
	};

	const addMessage = (message: Omit<ChatMessage, 'id'>) => {
		const newMessage: ChatMessage = {
			...message,
			id: Date.now(),
		};
		setMessages((prev) => [...prev, newMessage]);
	};

	const clearMessages = () => {
		setMessages([]);
	};

	const value: ReportsContextType = {
		reports,
		addReport,
		updateReport,
		deleteReport,
		getReportById,
		messages,
		addMessage,
		clearMessages,
		isLoading,
		setIsLoading,
	};

	return (
		<ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>
	);
};
