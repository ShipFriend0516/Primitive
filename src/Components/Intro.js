const Intro = () => {
  return (
    <div className="bg-white from-slate-400 to-gray-900 w-screen min-h-screen relative">
      <div className="w-full h-screen relative">
        <div className="absolute top-1/4 right-10 fade_in">
          <p className="text-9xl">PRIMITIVE</p>
          <p className="text-3xl">공주대학교 IT 창업동아리</p>
        </div>
        <div className="absolute top-2/4 left-10 ">
          <img
            className="w-1/4 fade_in"
            src="https://images.unsplash.com/photo-1570701123784-2d41777f5e93?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="imagea"
          />
        </div>
      </div>
      <div className="w-full h-screen bg-slate-50"></div>
    </div>
  );
};

export default Intro;
