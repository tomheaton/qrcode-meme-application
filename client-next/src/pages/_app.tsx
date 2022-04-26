import '@styles/globals.css';
import {AppProps} from 'next/app';
import {Toaster} from "react-hot-toast";

const App = ({Component, pageProps}: AppProps) => {

    return (
        <>
            <Toaster />
            <Component {...pageProps} />
        </>
    );
}

export default App;
