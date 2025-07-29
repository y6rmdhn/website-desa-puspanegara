import { type PropsWithChildren } from "react";
import Header from "../sections/header";
import Footer from "../sections/footer/Footer";

const MainLayouts = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayouts;
