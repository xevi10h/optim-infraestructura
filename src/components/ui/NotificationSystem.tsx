'use client';

import React from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';

export const NotificationSystem: React.FC = () => {
	const { notifications, removeNotification } = useUIStore();

	const getNotificationIcon = (type: string) => {
		switch (type) {
			case 'success':
				return <CheckCircle className="h-5 w-5 text-green-500" />;
			case 'error':
				return <AlertCircle className="h-5 w-5 text-red-500" />;
			case 'warning':
				return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
			case 'info':
				return <Info className="h-5 w-5 text-blue-500" />;
			default:
				return <Info className="h-5 w-5 text-gray-500" />;
		}
	};

	const getNotificationStyles = (type: string) => {
		switch (type) {
			case 'success':
				return 'bg-green-50 border-green-200 text-green-800';
			case 'error':
				return 'bg-red-50 border-red-200 text-red-800';
			case 'warning':
				return 'bg-yellow-50 border-yellow-200 text-yellow-800';
			case 'info':
				return 'bg-blue-50 border-blue-200 text-blue-800';
			default:
				return 'bg-gray-50 border-gray-200 text-gray-800';
		}
	};

	if (notifications.length === 0) return null;

	return (
		<div className="fixed top-4 right-4 z-50 space-y-2">
			{notifications.map((notification) => (
				<div
					key={notification.id}
					className={`max-w-sm w-full border rounded-lg p-4 shadow-lg transition-all duration-300 ${getNotificationStyles(
						notification.type,
					)}`}
				>
					<div className="flex items-start">
						<div className="flex-shrink-0">
							{getNotificationIcon(notification.type)}
						</div>
						<div className="ml-3 flex-1">
							<p className="text-sm font-medium">{notification.title}</p>
							<p className="text-sm mt-1">{notification.message}</p>
						</div>
						<button
							onClick={() => removeNotification(notification.id)}
							className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600"
						>
							<X className="h-4 w-4" />
						</button>
					</div>
				</div>
			))}
		</div>
	);
};
