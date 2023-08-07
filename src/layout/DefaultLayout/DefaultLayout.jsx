import Header from '@/Header';
import Footer from '@/Footer';

function DefaultLayout ({ children }){
    return (
        <>
            <Header />
         
            <div className="vw-100 overflow-hidden my-4">{children}</div>
            <Footer />
        </>
    );
};

export default DefaultLayout;
