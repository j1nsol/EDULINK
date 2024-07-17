
import './App.css';

import * as React from "react";

function App() {
  return (
    <>
      <div className="div">
        <img
          loading="lazy"
          srcSet="..."
          className="img"
        />
        <div className="div-2">
          <button className="div-3">Home</button>
          <div className="div-4">Courses</div>
          <div className="div-5">About us</div>
          <div className="div-6">Sign up</div>
          <div className="div-7">
            <div className="div-8">Login</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .div {
          background-color: #05445e;
          display: flex;
          padding-right: 34px;
          gap: 20px;
          font-size: 20px;
          color: #fff;
          font-weight: 500;
          text-align: center;
          line-height: 160%;
          justify-content: space-between;
        }
        @media (max-width: 991px) {
          .div {
            flex-wrap: wrap;
            padding-right: 20px;
          }
        }
        .img {
          aspect-ratio: 4.35;
          object-fit: auto;
          object-position: center;
          width: 392px;
          margin-top: 5px;
        }
        .div-2 {
          display: flex;
          align-items: center;
          gap: 20px;
          justify-content: space-between;
          margin: auto 0;
          
          background: none;
          border: none;
          color: #fff;
          font-family: Poppins, sans-serif;
          margin: auto 0;
          cursor: pointer;
          text-align: center;
          line-height: 160%;
          font-size: 20px;
          font-weight: 500;
        }
        @media (max-width: 991px) {
          .div-2 {
            max-width: 100%;
            flex-wrap: wrap;
          }
        }
        .div-3 {
          background: none;
          border: none;
          color: #fff;
          font-family: Poppins, sans-serif;
          align-self: stretch;
          margin: auto 0;
          cursor: pointer;
          text-align: center;
          line-height: 160%;
          font-size: 20px;
          font-weight: 500;
        }
        .div-4 {
          font-family: Poppins, sans-serif;
          align-self: stretch;
          margin: auto 0;
        }
        .div-5 {
          color: var(--White, #fff);
          font-family: Poppins, sans-serif;
          align-self: stretch;
          margin: auto 0;
        }
        .div-6 {
          color: var(--White, #fff);
          font-family: Poppins, sans-serif;
          align-self: stretch;
          margin: auto 0;
        }
        .div-7 {
          border-radius: 15px;
          background-color: #fff;
          align-self: stretch;
          display: flex;
          flex-direction: column;
          color: #05445e;
          white-space: nowrap;
          justify-content: center;
        }
        @media (max-width: 991px) {
          .div-7 {
            white-space: initial;
          }
        }
        .div-8 {
          font-family: Poppins, sans-serif;
          border-radius: 15px;
          background-color: #fff;
          align-items: center;
          justify-content: center;
          padding: 10px 60px;
        }
        @media (max-width: 991px) {
          .div-8 {
            white-space: initial;
            padding: 0 20px;
          }
        }
      `}</style>
    </>
  );
}

export const SecondaryCta = () => {
  return (
    <a
      className="secondary-CTA"
      href="https://animaapp.com/?utm_source=figma-samples&amp;utm_campaign=figma-lp-pets&amp;utm_medium=figma-samples"
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="overlap-group">
        <div className="hover" />
        <div className="text-wrapper">CTA</div>
      </div>
    </a>
  );
};

export default App;
