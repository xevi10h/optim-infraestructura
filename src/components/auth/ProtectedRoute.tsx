'use client';

import React, { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { LoginForm } from './LoginForm';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import type { UserRole } from '@/types';

interface ProtectedRouteProps {
	children: React.ReactNode;
	requiredRole?: UserRole;
	requiredPermission?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	children,
	requiredRole,
	requiredPermission,
}) => {
	const { isAuthenticated, user, isLoading, hasRole, checkPermission } =
		useAuthStore();

	useEffect(() => {
		// Auto-login for development - remove in production
		if (!isAuthenticated && !isLoading) {
			// This is for demo purposes only
		}
	}, [isAuthenticated, isLoading]);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (!isAuthenticated) {
		return <LoginForm />;
	}

	// Check role requirement
	if (requiredRole && !hasRole(requiredRole)) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">
						Access Denied
					</h2>
					<p className="text-gray-600">
						You don't have permission to access this page.
					</p>
				</div>
			</div>
		);
	}

	// Check permission requirement
	if (requiredPermission && !checkPermission(requiredPermission)) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">
						Access Denied
					</h2>
					<p className="text-gray-600">
						You don't have the required permission to access this page.
					</p>
				</div>
			</div>
		);
	}

	return <>{children}</>;
};
