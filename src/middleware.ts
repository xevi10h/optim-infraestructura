import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
	// A list of all locales that are supported
	locales: ['es', 'ca'],

	// Used when no locale matches
	defaultLocale: 'es',

	// Prefix for default locale
	localePrefix: 'always',
});

export const config = {
	// Match only internationalized pathnames
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
