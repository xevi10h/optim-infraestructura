'use client';

import React from 'react';

export const LoadingSpinner: React.FC = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="text-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
				<p className="mt-4 text-gray-600">Loading...</p>
			</div>
		</div>
	);
};
