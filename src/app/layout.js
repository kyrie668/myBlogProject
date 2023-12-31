import NavBar from '@/components/navbar/NavBar';
import './globals.css';
import 'antd/dist/antd.css';
import { Inter } from 'next/font/google';
import Footer from '@/components/footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'My Blog',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            {/* <body className={inter.className}> */}
            <body className={inter.className}>
                <div className="my-app">
                    <NavBar />
                    {children}
                    <Footer />
                </div>
            </body>
        </html>
    );
}
