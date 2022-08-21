import useRequireAuth from "../../hooks/useRequireAuth";
import { Outlet, useOutletContext } from "react-router-dom";

export default function DashboardMain({styles}) {
  const auth = useRequireAuth();

    return (
      <main className={styles['layout__main']}>
          <Outlet context={auth?.user} />
      </main>
    )
}