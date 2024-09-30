import { FC } from 'react';

export const ContainerLoader: FC = () => {


  return (
    <div className="loader flex justify-center items-center">
      <div>
        <div className="box box-1">
          <div className="side-left"></div>
          <div className="side-right"></div>
          <div className="side-top"></div>
        </div>
        <div className="box box-2">
          <div className="side-left"></div>
          <div className="side-right"></div>
          <div className="side-top"></div>
        </div>
        <div className="box box-3">
          <div className="side-left"></div>
          <div className="side-right"></div>
          <div className="side-top"></div>
        </div>
        <div className="box box-4">
          <div className="side-left"></div>
          <div className="side-right"></div>
          <div className="side-top"></div>
        </div>
      </div>
    </div>
  );
};


export const PageLoader = () => {

  return (
    <div className="text-center h-screen flex flex-col justify-center items-center">
      <div
        className="w-24 h-24 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"
      ></div>
      <h2 className="text-zinc-900 text-xl dark:text-white mt-4">Loading...</h2>
      <p className="text-red-600 text-lg dark:text-red-400">
        Your adventure is about to begin
      </p>
    </div>
  )
}
