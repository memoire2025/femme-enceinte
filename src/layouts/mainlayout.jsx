import React from "react";
import MainDesign from "./../composants/header/header";
import Footer from "./../composants/footer/footer";

function MainLayout({children}) {
  return (
    <>
      <MainDesign>
        {children}
      </MainDesign>
      <Footer />
    </>
  );
}

export default MainLayout;