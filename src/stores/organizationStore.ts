import { create } from 'zustand';
import type { Organization, OrganizationSettings } from '@/types';

interface OrganizationState {
	organization: Organization | null;
	settings: OrganizationSettings | null;
	isLoading: boolean;
}

interface OrganizationActions {
	fetchOrganization: (id: string) => Promise<void>;
	updateOrganization: (updates: Partial<Organization>) => Promise<void>;
	updateSettings: (settings: Partial<OrganizationSettings>) => Promise<void>;
	setOrganization: (organization: Organization) => void;
}

type OrganizationStore = OrganizationState & OrganizationActions;

export const useOrganizationStore = create<OrganizationStore>((set, get) => ({
	// Initial state
	organization: null,
	settings: null,
	isLoading: false,

	// Actions
	fetchOrganization: async (id) => {
		set({ isLoading: true });
		try {
			// Mock API call - implement in Phase 1
			const mockOrganization: Organization = {
				id: 'org-1',
				name: 'Ayuntamiento de Barcelona',
				code: 'AYT-BCN',
				type: 'municipal' as any,
				address: {
					street: 'Plaça de Sant Jaume, 1',
					city: 'Barcelona',
					postalCode: '08002',
					province: 'Barcelona',
					country: 'España',
				},
				contactInfo: {
					phone: '+34 933 42 70 00',
					email: 'info@bcn.cat',
					website: 'https://www.barcelona.cat',
				},
				settings: {
					reportTemplates: [],
					customFields: [
						{
							id: 'custom-1',
							name: 'Budget Code',
							type: 'text' as any,
							required: true,
							organizationId: 'org-1',
						},
						{
							id: 'custom-2',
							name: 'Project Phase',
							type: 'select' as any,
							required: false,
							organizationId: 'org-1',
						},
					],
					workflowEnabled: true,
					reviewRequired: true,
				},
				createdAt: new Date('2020-01-01'),
				updatedAt: new Date('2024-01-01'),
			};

			set({
				organization: mockOrganization,
				settings: mockOrganization.settings,
				isLoading: false,
			});
		} catch (error) {
			set({ isLoading: false });
			throw error;
		}
	},

	updateOrganization: async (updates) => {
		set({ isLoading: true });
		try {
			set((state) => {
				if (!state.organization) return state;

				const updatedOrg = {
					...state.organization,
					...updates,
					updatedAt: new Date(),
				};

				return {
					organization: updatedOrg,
					isLoading: false,
				};
			});
		} catch (error) {
			set({ isLoading: false });
			throw error;
		}
	},

	updateSettings: async (settingsUpdates) => {
		set({ isLoading: true });
		try {
			set((state) => {
				if (!state.organization || !state.settings) return state;

				const updatedSettings = {
					...state.settings,
					...settingsUpdates,
				};

				const updatedOrg = {
					...state.organization,
					settings: updatedSettings,
					updatedAt: new Date(),
				};

				return {
					organization: updatedOrg,
					settings: updatedSettings,
					isLoading: false,
				};
			});
		} catch (error) {
			set({ isLoading: false });
			throw error;
		}
	},

	setOrganization: (organization) => {
		set({
			organization,
			settings: organization.settings,
		});
	},
}));
