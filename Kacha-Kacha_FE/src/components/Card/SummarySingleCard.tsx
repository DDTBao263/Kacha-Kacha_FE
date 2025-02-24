import React from "react";
import { CardProps } from "../../types/card";

const SummarySingleCard: React.FC<CardProps> = ({
  iconClass,
  title,
  value,
  description,
  percentageChange,
  isIncrease,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full"> 
      <div className="flex items-center gap-6"> 
        <div className="card__icon text-3xl text-gray-500"> 
          <i className={iconClass}></i>
        </div>
        <div className="card__title-wrap flex-grow"> 
          <h6 className="card__sub-title text-gray-600 font-medium text-sm mb-1">{title}</h6> 
          <div className="flex items-baseline gap-2"> 
            <h3 className="card__title text-2xl font-bold text-gray-800 mb-0">{value}</h3>
            {description && (
              <span className="card__desc text-sm text-gray-500"> 
                {percentageChange && (
                  <span
                    className={`ml-1 text-${isIncrease ? "green-500" : "red-500"}`} 
                  >
                    <i
                      className={`fa-light ${
                        isIncrease ? "fa-arrow-up" : "fa-arrow-down"
                      } mr-1`}
                    ></i>
                    {percentageChange}
                  </span>
                )}{" "}
                {description}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarySingleCard;