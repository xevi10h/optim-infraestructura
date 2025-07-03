import { create } from 'zustand';
import type { ReportTemplate } from '@/types';

interface TemplatesState {
	templates: ReportTemplate[];
	currentTemplate: ReportTemplate | null;
	isLoading: boolean;
}

interface TemplatesActions {
	fetchTemplates: () => Promise<void>;
	createTemplate: (template: Omit<ReportTemplate, 'id'>) => Promise<void>;
	updateTemplate: (
		id: string,
		updates: Partial<ReportTemplate>,
	) => Promise<void>;
	deleteTemplate: (id: string) => Promise<void>;
	setCurrentTemplate: (template: ReportTemplate | null) => void;
}

type TemplatesStore = TemplatesState & TemplatesActions;

export const useTemplatesStore = create<TemplatesStore>((set, get) => ({
	// Initial state
	templates: [],
	currentTemplate: null,
	isLoading: false,

	// Actions
	fetchTemplates: async () => {
		set({ isLoading: true });
		try {
			// Mock API call - implement in Phase 2
			const mockTemplates: ReportTemplate[] = [
				{
					id: 'template-1',
					name: 'Procurement Template',
					description:
						'Standard template for procurement justification reports',
					organizationId: 'org-1',
					category: 'procurement' as any,
					fields: [
						{
							id: 'field-1',
							name: 'Item Description',
							type: 'textarea' as any,
							required: true,
							placeholder: 'Describe the items to be procured...',
							validation: { minLength: 10, maxLength: 500 },
						},
						{
							id: 'field-2',
							name: 'Quantity',
							type: 'number' as any,
							required: true,
							defaultValue: 1,
						},
						{
							id: 'field-3',
							name: 'Unit Price',
							type: 'currency' as any,
							required: true,
						},
					],
					structure: {
						sections: [
							{
								id: 'section-1',
								title: 'Object Identification',
								order: 1,
								required: true,
								fieldIds: ['field-1'],
								description: 'Clearly identify what is being procured',
							},
							{
								id: 'section-2',
								title: 'Technical Justification',
								order: 2,
								required: true,
								fieldIds: ['field-2', 'field-3'],
								description: 'Provide technical reasons for the procurement',
							},
						],
						headerConfig: {
							showOrganizationLogo: true,
							showDate: true,
							showReferenceNumber: true,
							customText: 'PROCUREMENT JUSTIFICATION REPORT',
						},
						footerConfig: {
							showPageNumbers: true,
							showSignature: true,
							customText:
								'This document is confidential and for internal use only.',
						},
					},
					isActive: true,
					createdAt: new Date('2024-01-01'),
					updatedAt: new Date('2024-01-15'),
				},
			];

			set({ templates: mockTemplates, isLoading: false });
		} catch (error) {
			set({ isLoading: false });
			throw error;
		}
	},

	createTemplate: async (templateData) => {
		set({ isLoading: true });
		try {
			const newTemplate: ReportTemplate = {
				...templateData,
				id: `template-${Date.now()}`,
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			set((state) => ({
				templates: [newTemplate, ...state.templates],
				currentTemplate: newTemplate,
				isLoading: false,
			}));
		} catch (error) {
			set({ isLoading: false });
			throw error;
		}
	},

	updateTemplate: async (id, updates) => {
		set({ isLoading: true });
		try {
			set((state) => ({
				templates: state.templates.map((template) =>
					template.id === id
						? { ...template, ...updates, updatedAt: new Date() }
						: template,
				),
				currentTemplate:
					state.currentTemplate?.id === id
						? { ...state.currentTemplate, ...updates, updatedAt: new Date() }
						: state.currentTemplate,
				isLoading: false,
			}));
		} catch (error) {
			set({ isLoading: false });
			throw error;
		}
	},

	deleteTemplate: async (id) => {
		set({ isLoading: true });
		try {
			set((state) => ({
				templates: state.templates.filter((template) => template.id !== id),
				currentTemplate:
					state.currentTemplate?.id === id ? null : state.currentTemplate,
				isLoading: false,
			}));
		} catch (error) {
			set({ isLoading: false });
			throw error;
		}
	},

	setCurrentTemplate: (template) => {
		set({ currentTemplate: template });
	},
}));
