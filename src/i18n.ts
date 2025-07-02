import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Define supported locales as a const assertion for better type safety
const locales = ['es', 'ca'] as const;

export default getRequestConfig(async ({ locale }) => {
	// Use proper type checking instead of 'any'
	if (!locales.includes(locale as (typeof locales)[number])) {
		notFound();
	}

	return {
		messages: (await import(`./messages/${locale}.json`)).default,
	};
});

// Export locales for use in other parts of the application
export { locales };
