import type { AppProps } from 'next/app'
import '@/styles/mains.css'
import Layout from '@/components/layout/pageLayout'
import 'react-responsive-modal/styles.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
