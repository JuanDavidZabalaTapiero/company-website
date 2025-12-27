import { Outlet } from "react-router-dom"
import Header from "./Header"

export default function AppLayout() {
    return (
        <div className="d-flex flex-column min-vh-100">
            {/* HEADER */}
            <Header />

            {/* BODY */}
            <main className="container py-4 flex-grow-1">
                <Outlet />
            </main>
        </div>
    )
}