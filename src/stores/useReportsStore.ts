import { create } from 'zustand';
import type { Report, ChatMessage } from '@/types';

interface ReportsState {
	reports: Report[];
	messages: ChatMessage[];
	isLoading: boolean;
}

interface ReportsActions {
	addReport: (report: Omit<Report, 'id'>) => void;
	updateReport: (id: number, updates: Partial<Report>) => void;
	deleteReport: (id: number) => void;
	getReportById: (id: number) => Report | undefined;
	addMessage: (message: Omit<ChatMessage, 'id'>) => void;
	clearMessages: () => void;
	setIsLoading: (loading: boolean) => void;
}

type ReportsStore = ReportsState & ReportsActions;

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

export const useReportsStore = create<ReportsStore>((set, get) => ({
	// Estado inicial
	reports: initialReports,
	messages: [],
	isLoading: false,

	// Acciones para reportes
	addReport: (report) => {
		const newReport: Report = {
			...report,
			id: Date.now(),
		};
		set((state) => ({
			reports: [newReport, ...state.reports],
		}));
	},

	updateReport: (id, updates) => {
		set((state) => ({
			reports: state.reports.map((report) =>
				report.id === id ? { ...report, ...updates } : report,
			),
		}));
	},

	deleteReport: (id) => {
		set((state) => ({
			reports: state.reports.filter((report) => report.id !== id),
		}));
	},

	getReportById: (id) => {
		return get().reports.find((report) => report.id === id);
	},

	// Acciones para mensajes del chat
	addMessage: (message) => {
		const newMessage: ChatMessage = {
			...message,
			id: Date.now(),
		};
		set((state) => ({
			messages: [...state.messages, newMessage],
		}));
	},

	clearMessages: () => {
		set({ messages: [] });
	},

	// Acción para loading
	setIsLoading: (loading) => {
		set({ isLoading: loading });
	},
}));
