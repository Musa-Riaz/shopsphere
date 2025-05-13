import Navbar from './navbar';
import Footer from './footer';
import SearchFilters from './search-filters';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import {Category } from "../../../payload-types";
import { CustomCateogory } from './types';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = async ({children} : LayoutProps) => {

    const payload = await getPayload({
        config: configPromise
    });
    const data = await payload.find({
        collection: 'categories',
        pagination: false,
        depth: 1,
        where: {
            parent: {
                exists: false
            }
        }
    })

    const formattedData : CustomCateogory[] = data.docs.map((doc) => ({
        ...doc,
        subcategories: (doc.subcategories?.docs ?? []).map((doc) =>({
            ...(doc as Category),
            subcategories: undefined
        }))
    }))

    return (
        <div className="flex flex-col min-h-screen  ">
        <Navbar />
        <SearchFilters data={formattedData} />
        <div className='flex-1 bg-[#f0f0f4]'>{children}</div>
            <Footer />
        </div>
    )

}

export default Layout;