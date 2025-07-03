import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
	// A list of all locales that are supported
	locales: ['es', 'ca'],

	// Used when no locale matches
	defaultLocale: 'es',

	// The `pathnames` object holds pairs of internal and
	// external paths. Based on the locale, the external
	// paths are rewritten to the shared, internal ones.
	pathnames: {
		// If all locales use the same pathname, a single
		// string or a template string can be provided.
		// Template strings are particularly useful to
		// interpolate a value based on a segment in the pathname.
		'/': '/',
		'/dashboard': '/dashboard',
		'/new-report': '/new-report',
		'/search-reports': '/search-reports',
		'/templates': '/templates',
		'/users': '/users',
		'/settings': '/settings',
	},
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
	createNavigation(routing);
