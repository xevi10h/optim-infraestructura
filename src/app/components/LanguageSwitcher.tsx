'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

export const LanguageSwitcher: React.FC = () => {
	const router = useRouter();
	const pathname = usePathname();
	const currentLocale = useLocale();

	const handleLanguageChange = (newLocale: string) => {
		// Remove the current locale from the pathname and add the new one
		const segments = pathname.split('/');
		segments[1] = newLocale;
		const newPath = segments.join('/');
		router.push(newPath);
	};

	return (
		<div className="flex items-center gap-2">
			<button
				onClick={() => handleLanguageChange('es')}
				className={`px-2 py-1 text-sm rounded ${
					currentLocale === 'es'
						? 'bg-blue-500 text-white'
						: 'text-gray-600 hover:bg-gray-100'
				}`}
			>
				ES
			</button>
			<button
				onClick={() => handleLanguageChange('ca')}
				className={`px-2 py-1 text-sm rounded ${
					currentLocale === 'ca'
						? 'bg-blue-500 text-white'
						: 'text-gray-600 hover:bg-gray-100'
				}`}
			>
				CA
			</button>
		</div>
	);
};
