import '@/styles/globals.css'
import '@/styles/reset.css'
import type { AppProps } from 'next/app'
import { Alumni_Sans, Quicksand } from '@next/font/google';
import MainLayout from '@/components/common/MainLayout';
import { NextPage } from 'next';
import BlankLayout from '@/components/common/BlankLayout';

const quicksand = Quicksand({
	subsets: ['vietnamese', 'latin'],
	weight: ['500', '700'],
	style: ['normal'],
	fallback: ['system-ui'],
});
const alumni = Alumni_Sans({
	subsets: ['vietnamese', 'latin'],
	weight: ['500', '700'],
	style: ['normal'],
	fallback: ['system-ui'],
});


export type NextPageWithLayout<T = any> = NextPage<T> & {
	getLayout?: any;
};

export type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const RootLayout = Component.getLayout ?? BlankLayout;

	return (
		<RootLayout>
			<Component {...pageProps} />

			<style jsx global>{`
				:root {
          --quicksand-font: ${quicksand.style.fontFamily};
					--alumniSans-font: ${alumni.style.fontFamily};
        }
      `}
			</style>
		</RootLayout>
	);
}
