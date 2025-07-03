'use client';

import React from 'react';
import { useAuthStore } from '@/stores/authStore';
import { UserRole } from '@/types';

interface AuthGuardProps {
	children: React.ReactNode;
	allowedRoles?: UserRole[];
	requiredPermissions?: string[];
	fallback?: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
	children,
	allowedRoles = [],
	requiredPermissions = [],
	fallback = null,
}) => {
	const { user, hasRole, checkPermission } = useAuthStore();

	if (!user) {
		return fallback;
	}

	// Check roles
	if (allowedRoles.length > 0) {
		const hasAllowedRole = allowedRoles.some((role) => hasRole(role));
		if (!hasAllowedRole) {
			return fallback;
		}
	}

	// Check permissions
	if (requiredPermissions.length > 0) {
		const hasAllPermissions = requiredPermissions.every((permission) =>
			checkPermission(permission),
		);
		if (!hasAllPermissions) {
			return fallback;
		}
	}

	return <>{children}</>;
};
