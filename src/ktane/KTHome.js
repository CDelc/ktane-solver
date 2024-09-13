import EdgeworkBar from "./edgework/EdgeworkBar";
import { Outlet } from 'react-router-dom';
import './styles/edgework.css'
import EdgeworkProvider from "./EdgeworkProvider";

function KTHome() {
    return (
        <EdgeworkProvider>
            <EdgeworkBar />
            <Outlet />
        </EdgeworkProvider>
    );
}

export default KTHome;