import DashboardSidebar from "./DashboardSidebar";
import DashboardMain from "./DashboardMain";

import styles from './Dashboard.module.scss';

export default function DashboardLayout() {
    return (
        <div className={styles['layout']}>
            <DashboardSidebar styles={styles} />
            <DashboardMain styles={styles} />
        </div> 
    )
}