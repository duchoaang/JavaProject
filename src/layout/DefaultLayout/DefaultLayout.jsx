import Header from '@/Header';
import Footer from '@/Footer';

function DefaultLayout ({ children }){
    return (
        <>
            <Header />
         
            <div className="vw-100 overflow-hidden">{children}</div>
            <Footer />
        </>
    );
};

export default DefaultLayout;
