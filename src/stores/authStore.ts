import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Organization, UserRole } from '@/types';

interface AuthState {
	user: User | null;
	organization: Organization | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	permissions: string[];
}

interface AuthActions {
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	setUser: (user: User) => void;
	setOrganization: (organization: Organization) => void;
	updateUserProfile: (updates: Partial<User>) => Promise<void>;
	checkPermission: (permission: string) => boolean;
	hasRole: (role: UserRole) => boolean;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
	persist(
		(set, get) => ({
			// Initial state
			user: null,
			organization: null,
			isAuthenticated: false,
			isLoading: false,
			permissions: [],

			// Actions
			login: async (email: string, password: string) => {
				set({ isLoading: true });
				try {
					// Mock authentication - replace with actual API call
					const mockUser: User = {
						id: '1',
						email,
						name: 'Xavier Huix',
						role: UserRole.ADMIN,
						organizationId: 'org-1',
						createdAt: new Date(),
						updatedAt: new Date(),
						isActive: true,
					};

					const mockOrganization: Organization = {
						id: 'org-1',
						name: 'Infraestructures.cat',
						code: 'AYT-BCN',
						type: 'municipal' as any,
						address: {
							street: 'Carrer dels Vergós 36-42',
							city: 'Barcelona',
							postalCode: '08017',
							province: 'Barcelona',
							country: 'España',
						},
						contactInfo: {
							phone: '+34 93 444 44 44',
							email: 'info@bcn.cat',
							website: 'https://infraestructures.gencat.cat/',
						},
						settings: {
							reportTemplates: [],
							customFields: [],
							workflowEnabled: true,
							reviewRequired: true,
						},
						createdAt: new Date(),
						updatedAt: new Date(),
					};

					set({
						user: mockUser,
						organization: mockOrganization,
						isAuthenticated: true,
						isLoading: false,
						permissions: [
							'create_reports',
							'edit_reports',
							'delete_reports',
							'manage_users',
							'manage_templates',
						],
					});
				} catch (error) {
					set({ isLoading: false });
					throw error;
				}
			},

			logout: () => {
				set({
					user: null,
					organization: null,
					isAuthenticated: false,
					permissions: [],
				});
			},

			setUser: (user: User) => {
				set({ user });
			},

			setOrganization: (organization: Organization) => {
				set({ organization });
			},

			updateUserProfile: async (updates: Partial<User>) => {
				const { user } = get();
				if (!user) return;

				set({
					user: { ...user, ...updates, updatedAt: new Date() },
				});
			},

			checkPermission: (permission: string) => {
				const { permissions } = get();
				return permissions.includes(permission);
			},

			hasRole: (role: UserRole) => {
				const { user } = get();
				return user?.role === role;
			},
		}),
		{
			name: 'auth-storage',
			partialize: (state) => ({
				user: state.user,
				organization: state.organization,
				isAuthenticated: state.isAuthenticated,
				permissions: state.permissions,
			}),
		},
	),
);
