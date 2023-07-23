import '@/styles/globals.css'
import '@/styles/reset.css'
import type { AppProps } from 'next/app'
import { Alumni_Sans, Quicksand } from '@next/font/google';
import MainLayout from '@/components/common/mainlayout';

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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />

      <style jsx global>{`
				:root {
          --quicksand-font: ${quicksand.style.fontFamily};
					--alumniSans-font: ${alumni.style.fontFamily};
        }
      `}
      </style>
    </MainLayout>
  );
}
