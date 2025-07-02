import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
	locales: ['es', 'ca'],
	defaultLocale: 'es',
	localePrefix: 'always',
});

export const config = {
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
