import { useEffect } from 'react';
// import * as THREE from 'three';

export const SakuraCanvas = () => {

  // useEffect(() => {
  //   // Your script goes here
  //   console.log('Script executed on page load');

  //   // If you have an external script, you can create a script element and append it to the document
  //   const scriptElement = document.createElement('script');
  //   scriptElement.src = './sakura.js';
  //   document.head.appendChild(scriptElement);

  //   return () => {
  //     document.head.removeChild(scriptElement);
  //   };
  // }, []);

  return (
    <>
      <canvas id="sakura"></canvas>
      <div className="btnbg">
      </div>
    </>);
};

