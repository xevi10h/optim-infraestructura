'use client';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Informes Justificatius IA',
	description:
		"Sistema intel·ligent per a la generación d'informes justificatius en l'administració pública",
};

interface LocaleLayoutProps {
	children: React.ReactNode;
	params: { locale: string };
}

const locales = ['es', 'ca'];

export default async function LocaleLayout({
	children,
	params: { locale },
}: LocaleLayoutProps) {
	// Validate that the incoming `locale` parameter is valid
	if (!locales.includes(locale)) {
		notFound();
	}

	// Providing all messages to the client
	// side is the easiest way to get started
	let messages;
	try {
		messages = await getMessages();
	} catch (error) {
		notFound();
	}

	return (
		<html lang={locale}>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<NextIntlClientProvider messages={messages}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
