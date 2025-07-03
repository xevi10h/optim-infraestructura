'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
	const router = useRouter();
	const pathname = usePathname();
	const currentLocale = useLocale();

	const handleLanguageChange = (newLocale: string) => {
		const segments = pathname.split('/');
		segments[1] = newLocale;
		const newPath = segments.join('/');
		router.push(newPath);
	};

	return (
		<div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
			<Globe size={16} className="text-gray-500" />
			<button
				onClick={() => handleLanguageChange('es')}
				className={`px-3 py-1 text-sm rounded-md transition-colors ${
					currentLocale === 'es'
						? 'bg-white text-blue-600 shadow-sm'
						: 'text-gray-600 hover:text-gray-900'
				}`}
			>
				ES
			</button>
			<button
				onClick={() => handleLanguageChange('ca')}
				className={`px-3 py-1 text-sm rounded-md transition-colors ${
					currentLocale === 'ca'
						? 'bg-white text-blue-600 shadow-sm'
						: 'text-gray-600 hover:text-gray-900'
				}`}
			>
				CA
			</button>
		</div>
	);
};
