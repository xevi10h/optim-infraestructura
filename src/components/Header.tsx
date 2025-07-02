'use client';

import React from 'react';
import { Menu } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
	onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
	return (
		<header className="bg-white border-b border-gray-200 px-6 py-4">
			<div className="flex items-center justify-between">
				<button
					onClick={onToggleSidebar}
					className="text-gray-600 hover:text-gray-900"
				>
					<Menu size={24} />
				</button>

				<div className="flex items-center gap-4">
					<LanguageSwitcher />
					<div className="text-sm text-gray-600">
						Administració Pública Digital
					</div>
				</div>
			</div>
		</header>
	);
};
