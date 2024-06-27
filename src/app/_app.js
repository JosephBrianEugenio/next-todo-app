// pages/_app.js
import { useRouter } from 'next/navigation';
import useAuthenticationStore from './store/authentication/auth';
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const {isAuthenticated} = useAuthenticationStore();

  useEffect(() => {
    if (!isAuthenticated && router.pathname !== '/') {
      router.push('/'); // Redirect to login if not authenticated
    } else {
        router.push('/home')
    }
  }, [isAuthenticated, router]);

  return <Component {...pageProps} />;
}

export default MyApp;
