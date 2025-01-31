import NavBar from "../Components/common/NavBar";
import AuthForm from "@/src/Components/auth/AuthForm";

const LoginPage = () => {
  return (
    <section className="flex flex-col   h-screen w-screen overflow-hidden">
      <NavBar />
      <div className="bg-gradient-to-tr from-emerald-950 to-indigo-950 w-full flex gradient flex-col justify-center items-center h-screen bollock ">
        <AuthForm />
      </div>
    </section>
  );
};

export default LoginPage;
