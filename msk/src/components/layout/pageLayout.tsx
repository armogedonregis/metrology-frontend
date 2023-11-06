import { Montserrat, Open_Sans } from 'next/font/google';
import { Header } from '../header';
import { Footer } from '../footer';

type LayoutProps = {
  children: React.ReactNode;
};

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-sans' });

export default function Layout({ children }: LayoutProps) {
  const pageContainer = [
    'flex', 'flex-col', 'justify-between', 
    'h-full', 'items-center', 'w-screen', 
    'overflow-x-hidden', 
    'font-normal',
    'text-black',
    'font-montserrat',
  ];

  const fontStyle = [montserrat.variable, openSans.variable].join(' ');

  const componentPageContainer = pageContainer.join(' ');

  return (
    <div className={fontStyle}>
      <div className={componentPageContainer}>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
