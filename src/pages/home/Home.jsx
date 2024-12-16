// import { request } from '@/api'
import Products from "@/components/Products";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import logo from "../../assets/images/logo.svg";
import icons from "../../assets/images/Icons.png";
import hero from "../../assets/images/hero.png";
import brand from "../../assets/images/brands.png";
import dots from "../../assets/images/dots.png";
import clothe1 from "../../assets/images/clothe1.png";
import clothe2 from "../../assets/images/clothe2.png";
import clothe3 from "../../assets/images/clothe3.png";
import clothe4 from "../../assets/images/clothe4.png";
import star from "../../assets/images/star.png";

const Home = () => {
  return (
    <div>
      <div className=" container mx-auto px-10">
        <div className="flex justify-between mb-5 mt-5">
          <div>
            <img src={logo} alt="logo" />
          </div>
          <div>
            <ul className="flex gap-10">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Shop</a>
              </li>
              <li>
                <a href="#">Product</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
          <div>
            <img src={icons} alt="" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div>
          <img src={hero} alt="" />
        </div>
        <div className="bg-[#171D28]">
          <h1 className="text-[72px] text-white w-[400px] mt-[40%] ml-32 leading-[72px] mb-8">
            Bring the warmth.
          </h1>
          <p className="text-white ml-32 w-[350px] text-[20px] mb-8">
            Everyone needs a good winter jacket. Find yours with our collection
            and more.
          </p>
          <button className="bg-[#377DFF] ml-32 text-white px-10 py-3 rounded-md">
            Shopping Now
          </button>
        </div>
      </div>

      <div className="  container mx-auto px-10">
        <p className="mt-5 flex justify-center font-semibold">
          Trending Brands
        </p>
        <img className="mb-5" src={brand} alt="" />
      </div>

      <div className=" container mx-auto px-10">
        <div className="flex flex-row justify-between">
          <h1 className="text-[40px]">Just In</h1>
          <img className="w-[64px] h-[16px] mt-5" src={dots} alt="" />
        </div>
      </div>

      <div className=" container mx-auto px-10 flex gap-10">
      <div >
            <img src={clothe1} alt="clothe" />
            <img src={star} alt="star" />
            <p>96 Nuptse Dip Dye Korea Puffers Jacket</p>
            <p>$400.00</p>
          </div>
          <div>
            <img src={clothe2} alt="clothe" />
            <img src={star} alt="star" />
            <p>96 Nuptse Dip Dye Korea Puffers Jacket</p>
            <p>$349.99</p>
          </div>
          <div>
            <img src={clothe3} alt="clothe" />
            <img src={star} alt="star" />
            <p>96 Nuptse Dip Dye Korea Puffers Jacket</p>
            <p>$149.99</p>
          </div>
          <div>
            <img src={clothe4} alt="clothe" />
            <img src={star} alt="star" />
            <p>96 Nuptse Dip Dye Korea Puffers Jacket</p>
            <p>$400.00</p>
          </div>
      </div>
    </div>
  );
};

export default Home;
