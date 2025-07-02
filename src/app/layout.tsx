import { redirect } from 'next/navigation';

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	// This layout is only used for the root page redirect
	return children;
}
