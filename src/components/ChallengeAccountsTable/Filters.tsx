import React from "react";
import {
  BsSearch,
  BsPersonBadge,
  BsCheckCircle,
  BsLayers,
  BsChevronDown,
} from "react-icons/bs";

import type {
  FiltersProps,
  FilterStage,
  FilterStatus,
  FilterType,
} from "../../types/interfaces";
import i18next from "i18next";

const Filters: React.FC<FiltersProps> = ({
  search,
  setSearch,
  type,
  setType,
  status,
  setStatus,
  stage,
  setStage,
}) => {
  const selectClass = `
      w-full
  rounded-2xl
  appearance-none

  bg-[#343434]
  dark:bg-[#343434]

  border
  border-[#444]

  text-white
  placeholder:text-gray-400

  px-3
  py-3
  pr-10

  text-xs sm:text-sm

  outline-none
  transition-all
  duration-200

  shadow-[0_1px_2px_rgba(0,0,0,.35)]

  hover:border-[#5A5A5A]

  focus:border-[#3B82F6]
  focus:ring-2
  focus:ring-blue-500/20
  `;
  const lang = i18next.language;

  const iconClass =
    "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm";

  return (
    <div
      className="
      mb-5
      rounded-3xl
      bg-gray-50
      dark:bg-[#2B2B2B]
      p-3 sm:p-4
      space-y-4
      "
    >
      <div className="relative">
        <BsSearch
          className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-gray-400
          dark:text-gray-500
          "
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={lang === "fa" ? "جستوجوی اکانت" : "Search Account"}
          className="
          w-full
          rounded-2xl
          border
          border-gray-600
          bg-white
          dark:bg-[#2B2B2B]
          text-xs sm:text-sm
          text-gray-700
          dark:text-white

          pr-11
          py-3
          outline-none

          placeholder:text-gray-400

          shadow-[inset_2px_2px_6px_rgba(0,0,0,0.04),inset_-2px_-2px_6px_rgba(255,255,255,0.8)]

          dark:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.35),inset_-2px_-2px_6px_rgba(255,255,255,0.03)]

          focus:ring-1
          focus:ring-blue-500/30
          "
        />
      </div>

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-3
        gap-3
        "
      >
        <div className="relative ">
          <BsPersonBadge className={iconClass} />

          <select
            value={type}
            onChange={(e) => setType(e.target.value as FilterType)}
            className={selectClass}
          >
            <option className="" value="all">
              {lang === "fa" ? "همه نوع ها" : "All Types"}
            </option>

            <option value="challenge">
              {lang === "fa" ? "چالش" : "Challenge"}
            </option>

            <option value="real">{lang === "fa" ? "واقعی" : "Real"}</option>

            <option value="free">{lang === "fa" ? "رایگان" : "Free"}</option>
          </select>

          <BsChevronDown
            className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-gray-400
            pointer-events-none
            
            "
          />
        </div>

        <div className="relative">
          <BsCheckCircle className={iconClass} />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as FilterStatus)}
            className={selectClass}
          >
            <option value="all">
              {lang === "fa" ? "همه وضعیت ها" : "All situations"}
            </option>

            <option value="approved">
              {lang === "fa" ? "تایید شده " : "Approved"}
            </option>

            <option value="reviewing">
              {lang === "fa" ? "درحالی بررسی" : "Under review"}
            </option>

            <option value="rejected">
              {lang === "fa" ? "رد شده" : "Rejected"}
            </option>
          </select>

          <BsChevronDown
            className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-gray-400
            pointer-events-none
            "
          />
        </div>

        <div className="relative">
          <BsLayers className={iconClass} />

          <select
            value={stage}
            onChange={(e) => setStage(e.target.value as FilterStage)}
            className={selectClass}
          >
            <option value="all">
              {lang === "fa" ? "همه مراحل" : "All Steps"}
            </option>

            <option value="stage1">
              {lang === "fa" ? "مرحله اول" : "First stage"}
            </option>

            <option value="stage2">
              {lang === "fa" ? "مرحله دوم" : "Second stage"}
            </option>

            <option value="stage3">
              {lang === "fa" ? "مرحله سوم" : "Third stage"}
            </option>
          </select>

          <BsChevronDown
            className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-gray-400
            pointer-events-none
            "
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
