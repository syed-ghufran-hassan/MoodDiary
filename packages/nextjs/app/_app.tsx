import '../styles/globals.css'; // Import global styles
import { AppProps } from 'next/app';
import Format from '../components/Format'; // Import your layout component


function MyApp({ Component, pageProps }: AppProps) {
    // You can add global context providers here if needed
  
    return (
      <Format>
        <Component {...pageProps} />
        </Format>
    );
  }
  
  export default MyApp;