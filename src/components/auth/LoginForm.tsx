'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Lock, Eye, EyeOff, LogIn, Building } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

export const LoginForm: React.FC = () => {
	const t = useTranslations();
	const { login, isLoading } = useAuthStore();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		try {
			await login(formData.email, formData.password);
		} catch (err) {
			setError(t('auth.errors.invalidCredentials'));
		}
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div className="text-center">
					<div className="mx-auto h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center">
						<Building className="h-8 w-8 text-white" />
					</div>
					<h2 className="mt-6 text-3xl font-extrabold text-gray-900">
						{t('auth.login.title')}
					</h2>
					<p className="mt-2 text-sm text-gray-600">
						{t('auth.login.subtitle')}
					</p>
				</div>

				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="space-y-4">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								{t('auth.fields.email')}
							</label>
							<div className="mt-1 relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Mail className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									value={formData.email}
									onChange={(e) => handleInputChange('email', e.target.value)}
									className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									placeholder={t('auth.placeholders.email')}
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								{t('auth.fields.password')}
							</label>
							<div className="mt-1 relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="password"
									name="password"
									type={showPassword ? 'text' : 'password'}
									autoComplete="current-password"
									required
									value={formData.password}
									onChange={(e) =>
										handleInputChange('password', e.target.value)
									}
									className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									placeholder={t('auth.placeholders.password')}
								/>
								<button
									type="button"
									className="absolute inset-y-0 right-0 pr-3 flex items-center"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? (
										<EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
									) : (
										<Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
									)}
								</button>
							</div>
						</div>
					</div>

					{error && (
						<div className="bg-red-50 border border-red-200 rounded-lg p-3">
							<p className="text-sm text-red-600">{error}</p>
						</div>
					)}

					<button
						type="submit"
						disabled={isLoading}
						className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						{isLoading ? (
							<div className="flex items-center">
								<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
								{t('common.loading')}
							</div>
						) : (
							<div className="flex items-center">
								<LogIn className="h-4 w-4 mr-2" />
								{t('auth.login.submit')}
							</div>
						)}
					</button>

					<div className="text-center">
						<p className="text-xs text-gray-500">{t('auth.login.footer')}</p>
					</div>
				</form>
			</div>
		</div>
	);
};
