import Navbar from './navbar';
import Footer from './footer';
interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({children} : LayoutProps) => {

    return (
        <div className="flex flex-col min-h-screen  ">
        <Navbar />
        <div className='flex-1 bg-[#f0f0f4]'>{children}</div>
            <Footer />
        </div>
    )

}

export default Layout;