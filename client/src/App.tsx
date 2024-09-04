import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Popup from "./components/FormPopup";
import { useState } from "react";

const App: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <Header onOpenPopup={handleOpenPopup} />
      <Outlet />
      <Popup isOpen={isPopupOpen} onClose={handleClosePopup} />
      <Footer />
    </>
  )
}

export default App
