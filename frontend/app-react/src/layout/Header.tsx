import { NavLink } from "react-router-dom"

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <NavLink className="navbar-brand" to="/">
                    Mi Empresa
                </NavLink>

                <div className="navbar-nav">
                    <NavLink className="nav-link" to="/">
                        Inicio
                    </NavLink>
                    <NavLink className="nav-link" to="/contact">
                        Contacto
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}