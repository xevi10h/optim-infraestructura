import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ViewType } from '@/types';

interface Notification {
	id: string;
	type: 'success' | 'error' | 'warning' | 'info';
	title: string;
	message: string;
	autoClose?: boolean;
	duration?: number;
	read?: boolean;
}

interface Modal {
	deleteConfirm: boolean;
	userForm: boolean;
	templateForm: boolean;
	reportExport: boolean;
	settings: boolean;
}

interface UIState {
	currentView: ViewType;
	sidebarOpen: boolean;
	theme: 'light' | 'dark';
	notifications: Notification[];
	modals: Modal;
	loading: {
		global: boolean;
		reports: boolean;
		templates: boolean;
		users: boolean;
	};
}

interface UIActions {
	// Navigation
	setCurrentView: (view: ViewType) => void;
	goBack: () => void;

	// Sidebar
	toggleSidebar: () => void;
	setSidebarOpen: (open: boolean) => void;

	// Theme
	setTheme: (theme: 'light' | 'dark') => void;
	toggleTheme: () => void;

	// Notifications
	addNotification: (notification: Omit<Notification, 'id'>) => void;
	removeNotification: (id: string) => void;
	markNotificationAsRead: (id: string) => void;
	clearAllNotifications: () => void;

	// Modals
	openModal: (modal: keyof Modal) => void;
	closeModal: (modal: keyof Modal) => void;
	closeAllModals: () => void;

	// Loading states
	setLoading: (key: keyof UIState['loading'], loading: boolean) => void;
	setGlobalLoading: (loading: boolean) => void;
}

type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>()(
	persist(
		(set, get) => ({
			// Initial state
			currentView: 'dashboard',
			sidebarOpen: true,
			theme: 'light',
			notifications: [],
			modals: {
				deleteConfirm: false,
				userForm: false,
				templateForm: false,
				reportExport: false,
				settings: false,
			},
			loading: {
				global: false,
				reports: false,
				templates: false,
				users: false,
			},

			// Navigation actions
			setCurrentView: (view: ViewType) => {
				set({ currentView: view });
			},

			goBack: () => {
				// Simple back navigation - can be enhanced with history
				set({ currentView: 'dashboard' });
			},

			// Sidebar actions
			toggleSidebar: () => {
				set((state) => ({ sidebarOpen: !state.sidebarOpen }));
			},

			setSidebarOpen: (open: boolean) => {
				set({ sidebarOpen: open });
			},

			// Theme actions
			setTheme: (theme: 'light' | 'dark') => {
				set({ theme });
				// Apply theme to document
				if (typeof document !== 'undefined') {
					document.documentElement.classList.toggle('dark', theme === 'dark');
				}
			},

			toggleTheme: () => {
				const { theme, setTheme } = get();
				setTheme(theme === 'light' ? 'dark' : 'light');
			},

			// Notification actions
			addNotification: (notification: Omit<Notification, 'id'>) => {
				const newNotification: Notification = {
					...notification,
					id: Date.now().toString(),
					autoClose: notification.autoClose ?? true,
					duration: notification.duration ?? 5000,
					read: false,
				};

				set((state) => ({
					notifications: [...state.notifications, newNotification],
				}));

				// Auto-remove notification
				if (newNotification.autoClose) {
					setTimeout(() => {
						get().removeNotification(newNotification.id);
					}, newNotification.duration);
				}
			},

			removeNotification: (id: string) => {
				set((state) => ({
					notifications: state.notifications.filter((n) => n.id !== id),
				}));
			},

			markNotificationAsRead: (id: string) => {
				set((state) => ({
					notifications: state.notifications.map((n) =>
						n.id === id ? { ...n, read: true } : n,
					),
				}));
			},

			clearAllNotifications: () => {
				set({ notifications: [] });
			},

			// Modal actions
			openModal: (modal: keyof Modal) => {
				set((state) => ({
					modals: { ...state.modals, [modal]: true },
				}));
			},

			closeModal: (modal: keyof Modal) => {
				set((state) => ({
					modals: { ...state.modals, [modal]: false },
				}));
			},

			closeAllModals: () => {
				set((state) => ({
					modals: Object.keys(state.modals).reduce(
						(acc, key) => ({ ...acc, [key]: false }),
						{} as Modal,
					),
				}));
			},

			// Loading actions
			setLoading: (key: keyof UIState['loading'], loading: boolean) => {
				set((state) => ({
					loading: { ...state.loading, [key]: loading },
				}));
			},

			setGlobalLoading: (loading: boolean) => {
				set((state) => ({
					loading: { ...state.loading, global: loading },
				}));
			},
		}),
		{
			name: 'ui-storage',
			partialize: (state) => ({
				theme: state.theme,
				sidebarOpen: state.sidebarOpen,
				currentView: state.currentView,
			}),
		},
	),
);
