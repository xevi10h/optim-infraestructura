import { create } from 'zustand';
import {
	Report,
	ReportFormData,
	ReportFilters,
	ReportStatus,
	ReportCategory,
	Priority,
} from '@/types'; // Remove 'type' from import

interface ReportsState {
	reports: Report[];
	currentReport: Report | null;
	isLoading: boolean;
	filters: ReportFilters;
	pagination: {
		page: number;
		limit: number;
		total: number;
	};
}

interface ReportsActions {
	// CRUD operations
	createReport: (data: ReportFormData) => Promise<Report>;
	updateReport: (id: string, updates: Partial<Report>) => Promise<void>;
	deleteReport: (id: string) => Promise<void>;
	getReport: (id: string) => Report | null; // Fix: make synchronous

	// List and search
	fetchReports: (filters?: ReportFilters, page?: number) => Promise<void>;
	searchReports: (query: string) => Promise<Report[]>;

	// Status management
	updateReportStatus: (id: string, status: ReportStatus) => Promise<void>;
	submitForReview: (id: string) => Promise<void>;

	// Filters and pagination
	setFilters: (filters: Partial<ReportFilters>) => void;
	clearFilters: () => void;
	setPage: (page: number) => void;

	// Local state
	setCurrentReport: (report: Report | null) => void;
	setLoading: (loading: boolean) => void;
}

type ReportsStore = ReportsState & ReportsActions;

export const useReportsStore = create<ReportsStore>((set, get) => ({
	// Initial state
	reports: [],
	currentReport: null,
	isLoading: false,
	filters: {},
	pagination: {
		page: 1,
		limit: 10,
		total: 0,
	},

	// Actions
	createReport: async (data: ReportFormData) => {
		set({ isLoading: true });
		try {
			// Mock API call
			const newReport: Report = {
				id: Date.now().toString(),
				referenceNumber: data.referenceNumber,
				title: data.title,
				content: data.customFields?.content || '',
				authorId: 'current-user-id',
				organizationId: 'current-org-id',
				status: ReportStatus.DRAFT,
				metadata: {
					category: data.category,
					priority: data.priority,
					estimatedBudget: data.estimatedBudget,
					department: data.department,
					relatedReports: [],
					attachments: [],
				},
				createdAt: new Date(),
				updatedAt: new Date(),
				version: 1,
			};

			set((state) => ({
				reports: [newReport, ...state.reports],
				currentReport: newReport,
				isLoading: false,
			}));

			return newReport;
		} catch (error) {
			set({ isLoading: false });
			throw error;
		}
	},

	updateReport: async (id: string, updates: Partial<Report>) => {
		set({ isLoading: true });
		try {
			set((state) => ({
				reports: state.reports.map((report) =>
					report.id === id
						? { ...report, ...updates, updatedAt: new Date() }
						: report,
				),
				currentReport:
					state.currentReport?.id === id
						? { ...state.currentReport, ...updates, updatedAt: new Date() }
						: state.currentReport,
				isLoading: false,
			}));
		} catch (error) {
			set({ isLoading: false });
			throw error;
		}
	},

	deleteReport: async (id: string) => {
		set({ isLoading: true });
		try {
			set((state) => ({
				reports: state.reports.filter((report) => report.id !== id),
				currentReport:
					state.currentReport?.id === id ? null : state.currentReport,
				isLoading: false,
			}));
		} catch (error) {
			set({ isLoading: false });
			throw error;
		}
	},

	getReport: (id: string) => {
		const { reports } = get();
		return reports.find((r) => r.id === id) || null;
	},

	fetchReports: async (filters?: ReportFilters, page = 1) => {
		set({ isLoading: true });
		try {
			// Mock API call with filters and pagination
			const mockReports: Report[] = [
				{
					id: '1',
					referenceNumber: 'INF-2024-001',
					title: 'Computer Equipment Procurement',
					content: 'Detailed justification for computer equipment purchase...',
					authorId: 'user-1',
					organizationId: 'org-1',
					status: ReportStatus.APPROVED,
					metadata: {
						category: ReportCategory.PROCUREMENT,
						priority: Priority.MEDIUM,
						department: 'IT Department',
						relatedReports: [],
						attachments: [],
					},
					createdAt: new Date('2024-01-15'),
					updatedAt: new Date('2024-01-20'),
					version: 2,
				},
				{
					id: '2',
					referenceNumber: 'INF-2024-002',
					title: 'Cleaning Services Contract',
					content: 'Justification for cleaning services contract...',
					authorId: 'user-1',
					organizationId: 'org-1',
					status: ReportStatus.DRAFT,
					metadata: {
						category: ReportCategory.SERVICES,
						priority: Priority.MEDIUM,
						department: 'Facility Management',
						relatedReports: [],
						attachments: [],
					},
					createdAt: new Date('2024-01-10'),
					updatedAt: new Date('2024-01-12'),
					version: 1,
				},
				{
					id: '3',
					referenceNumber: 'INF-2024-003',
					title: 'Infrastructure Improvement Works',
					content: 'Justification for infrastructure improvement works...',
					authorId: 'user-1',
					organizationId: 'org-1',
					status: ReportStatus.IN_REVIEW,
					metadata: {
						category: ReportCategory.INFRASTRUCTURE,
						priority: Priority.HIGH,
						department: 'Public Works',
						relatedReports: [],
						attachments: [],
					},
					createdAt: new Date('2024-01-08'),
					updatedAt: new Date('2024-01-10'),
					version: 1,
				},
			];

			set({
				reports: mockReports,
				filters: filters || {},
				pagination: {
					page,
					limit: 10,
					total: mockReports.length,
				},
				isLoading: false,
			});
		} catch (error) {
			set({ isLoading: false });
			throw error;
		}
	},

	searchReports: async (query: string) => {
		const { reports } = get();
		return reports.filter(
			(report) =>
				report.title.toLowerCase().includes(query.toLowerCase()) ||
				report.referenceNumber.toLowerCase().includes(query.toLowerCase()),
		);
	},

	updateReportStatus: async (id: string, status: ReportStatus) => {
		await get().updateReport(id, { status });
	},

	submitForReview: async (id: string) => {
		await get().updateReport(id, {
			status: ReportStatus.IN_REVIEW,
			reviewStatus: 'pending' as any,
		});
	},

	setFilters: (filters: Partial<ReportFilters>) => {
		set((state) => ({
			filters: { ...state.filters, ...filters },
		}));
	},

	clearFilters: () => {
		set({ filters: {} });
	},

	setPage: (page: number) => {
		set((state) => ({
			pagination: { ...state.pagination, page },
		}));
	},

	setCurrentReport: (report: Report | null) => {
		set({ currentReport: report });
	},

	setLoading: (loading: boolean) => {
		set({ isLoading: loading });
	},
}));
