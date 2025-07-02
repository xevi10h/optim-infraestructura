import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
	locales: ['es', 'ca'],
	defaultLocale: 'es',
	localePrefix: 'always',
	pathnames: {
		'/': '/',
	},
});

export const config = {
	// Matcher ignoring `/_next/` and `/api/`
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
