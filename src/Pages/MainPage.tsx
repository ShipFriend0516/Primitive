import NavBar from "../Components/common/NavBar";
import Intro from "../Components/introduce/Intro";
import Footer from "../Components/common/Footer";
import FAQ from "../Components/common/FAQ";
const MainPage = () => {
  return (
    <section className="mainpage">
      <NavBar />
      <Intro />
      <FAQ />
      <Footer />
    </section>
  );
};

export default MainPage;
