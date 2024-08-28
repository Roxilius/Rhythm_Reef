import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { useState } from "react";
import Popup from "./components/Popup";

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
