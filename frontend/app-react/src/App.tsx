import { BrowserRouter, Routes, Route } from "react-router-dom"

// LAYOUT
import AppLayout from "./layout/AppLayout"

// PAGES
import Home from "./pages/Home"
import Contact from "./pages/Contact"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
