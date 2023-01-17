import { Outlet, useOutletContext } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from './Dashboard.module.scss';

export default function DashboardLayout() {
    const user = useOutletContext();

    return (
        <div className={styles['layout']}>
            <Sidebar />
            <main className={styles['layout__main']}>
                <Outlet context={user} />
            </main>
        </div>
    )
}