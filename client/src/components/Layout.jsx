import { Outlet } from "react-router-dom";
import { Header, Footer } from ".";

export default function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
