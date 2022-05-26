import useRequireAuth from "../../hooks/useRequireAuth";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

import styles from './DashboardLayout.module.scss';

export default function DashboardLayout() {
    const auth = useRequireAuth();

    return (
    <div className={styles['layout']}>
        <Sidebar />
        <main>
            <Outlet context={auth?.user?.username} />
        </main>

    </div> 
    )
}