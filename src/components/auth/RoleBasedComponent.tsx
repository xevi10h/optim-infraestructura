'use client';

import React from 'react';
import { useAuthStore } from '@/stores/authStore';
import { UserRole } from '@/types';

interface RoleBasedComponentProps {
	allowedRoles: UserRole[];
	children: React.ReactNode;
	fallback?: React.ReactNode;
}

export const RoleBasedComponent: React.FC<RoleBasedComponentProps> = ({
	allowedRoles,
	children,
	fallback = null,
}) => {
	const { user, hasRole } = useAuthStore();

	if (!user) {
		return fallback;
	}

	const hasAllowedRole = allowedRoles.some((role) => hasRole(role));

	return hasAllowedRole ? <>{children}</> : fallback;
};
