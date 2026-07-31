import React from "react";
import { Link } from "react-router-dom";
import {
  BsCheckCircleFill,
  BsHourglassSplit,
  BsXCircleFill,
} from "react-icons/bs";
import type { Account, StatusConfigMap } from "../../types/interfaces";
import i18next from "i18next";

const statusConfig: StatusConfigMap = {
  approved: {
    icon: BsCheckCircleFill,
    class:
      "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20",
  },
  reviewing: {
    icon: BsHourglassSplit,
    class:
      "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/20",
  },
  rejected: {
    icon: BsXCircleFill,
    class: "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-500/20",
  },
};

interface TableViewProps {
  accounts: Account[];
  selectedAccountNumber?: string | null;
  onSelectAccount?: (accountNumber: string) => void;
}

const TableView: React.FC<TableViewProps> = ({
  accounts,
  selectedAccountNumber = null,
}) => {
  const lang = i18next.language;

  return (
    <div className="overflow-x-auto -mx-3 sm:mx-0 dark:bg-[#2B2B2B]">
      <div className="min-w-150 sm:min-w-162.5 md:min-w-full">
        <table
          className="
            w-full
            text-[10px] sm:text-xs md:text-sm
            border-separate
            border-spacing-y-1 sm:border-spacing-y-1.5 md:border-spacing-y-3
          "
        >
          <thead>
            <tr
              className="
                text-gray-400
                dark:text-gray-500
                text-[8px] sm:text-[10px] md:text-xs
                font-semibold
                tracking-wider
                uppercase
              "
            >
              <th className="text-center px-2 sm:px-3 md:px-4 w-37.5 sm:w-45 md:w-65">
                {lang === "fa" ? "اکانت" : "Account"}
              </th>
              <th className="text-center px-1 sm:px-2 w-12.5 sm:w-17.5 md:w-30">
                {lang === "fa" ? "نوع" : "Type"}
              </th>
              <th className="text-center px-1 sm:px-2 w-15 sm:w-20 md:w-32.5">
                {lang === "fa" ? "سرمایه" : "Capital"}
              </th>
              <th className="text-center px-1 sm:px-2 w-17.5 sm:w-22.5 md:w-37.5">
                {lang === "fa" ? "مرحله" : "Step"}
              </th>
              <th className="text-center px-1 sm:px-2 w-20 sm:w-25 md:w-40">
                {lang === "fa" ? "وضعیت" : "Status"}
              </th>
              <th className="text-center px-1 sm:px-2 w-17.5 sm:w-22.5 md:w-35">
                {lang === "fa" ? "بالانس" : "Balance"}
              </th>
              <th className="text-center px-1 sm:px-2 w-15 sm:w-17.5 md:w-30">
                {lang === "fa" ? "شروع" : "Started"}
              </th>
              <th className="text-center px-1 sm:px-2 w-15 sm:w-20 md:w-30">
                {lang === "fa" ? "انتخاب" : "Select"}
              </th>
            </tr>
          </thead>

          <tbody>
            {accounts.map((account) => {
              const statusItem = statusConfig[account.tableStatus];
              const Icon = statusItem.icon;
              const isSelected =
                selectedAccountNumber === account.accountNumber;
              const cellBorderClass = isSelected
                ? "border-cyan-500 dark:border-cyan-400 ring-1 ring-cyan-500/30 dark:ring-cyan-400/30"
                : "border-gray-500";

              return (
                <tr
                  key={account.id}
                  className="
                    bg-white
                    dark:bg-[#2B2B2B]
                    hover:-translate-y-0.5 sm:hover:-translate-y-1
                    transition-all
                    duration-200
                    group
                  "
                >
                  <td
                    className={`
                      ${lang === "fa" ? "rounded-r-3xl" : "rounded-l-3xl"}
                      border
                      ${cellBorderClass}
                      px-2 sm:px-3 md:px-4
                      py-2 sm:py-2.5 md:py-4
                    `}
                  >
                    <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                      <img
                        src={account.icon}
                        className="
                          w-6 h-6
                          sm:w-7 sm:h-7
                          md:w-10 md:h-10
                          object-contain
                          shrink-0
                        "
                        alt={account.title.fa}
                      />
                      <div className="min-w-0">
                        <p
                          className="
                            font-semibold
                            text-gray-800
                            dark:text-white
                            text-[9px] sm:text-[10px] md:text-sm
                            truncate
                            max-w-20 sm:max-w-30 md:max-w-none
                          "
                        >
                          {lang === "fa"
                            ? account?.title?.fa
                            : account?.title?.en}
                        </p>
                        <div
                          className="
                            flex
                            gap-1 sm:gap-1.5 md:gap-3
                            text-[7px] sm:text-[8px] md:text-xs
                            text-gray-400
                            dark:text-gray-500
                            flex-wrap
                          "
                        >
                          <span className="text-gray-200 mt-1">
                            #{account.accountNumber}
                          </span>
                          <span className="text-gray-200 mt-1">
                            ${account.capital}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td
                    className={`text-center px-1 sm:px-2 border ${cellBorderClass}`}
                  >
                    <span
                      className="
                        text-[8px] sm:text-[9px] md:text-xs
                        font-semibold
                        text-gray-600
                        dark:text-gray-300
                        whitespace-nowrap
                      "
                    >
                      {lang === "fa"
                        ? account?.accountTypeLabel?.fa
                        : account?.accountTypeLabel?.en}
                    </span>
                  </td>

                  <td
                    className={`
                      text-center px-1 sm:px-2
                      border
                      ${cellBorderClass}
                      font-bold
                      text-[9px] sm:text-[10px] md:text-sm
                      whitespace-nowrap
                      font-mono
                      text-gray-700
                      dark:text-gray-200
                    `}
                  >
                    ${account.capital.toLocaleString()}
                  </td>

                  <td
                    className={`text-center px-1 sm:px-2 border ${cellBorderClass}`}
                  >
                    <div>
                      <span
                        className="
                          text-gray-700
                          dark:text-gray-200
                          font-normal
                          text-[8px] sm:text-[9px] md:text-sm
                          whitespace-nowrap
                        "
                      >
                        {lang === "fa" ? "مرحله" : "Step"}
                      </span>
                      <p
                        className="
                          text-[6px] sm:text-[7px] md:text-xs
                          text-gray-400
                          dark:text-gray-500
                        "
                      >
                        {lang === "fa"
                          ? account?.stageLabel?.fa
                          : account?.stageLabel?.en}
                      </p>
                    </div>
                  </td>

                  <td
                    className={`text-center px-1 sm:px-2 rounded-none border ${cellBorderClass}`}
                  >
                    <div
                      className={`
                        inline-flex
                        items-center
                        justify-center
                        gap-1 sm:gap-1.5 md:gap-2
                        px-1.5 sm:px-2 md:px-3
                        py-0.5 sm:py-1 md:py-2
                        rounded-lg sm:rounded-xl
                        text-[7px] sm:text-[8px] md:text-xs
                        font-bold
                        ${statusItem.class}
                        whitespace-nowrap
                        min-w-11.25 sm:min-w-13.74 md:min-w-20
                        transition-all
                        duration-200
                        hover:scale-105
                      `}
                    >
                      <Icon className="text-[7px] sm:text-[9px] md:text-sm" />
                      {lang === "fa"
                        ? account?.tableStatusLabel?.fa
                        : account?.tableStatusLabel?.en}
                    </div>
                  </td>

                  <td
                    className={`
                      border
                      ${cellBorderClass}
                      rounded-2xl
                      rounded-l-none
                      rounded-r-none
                      text-center px-1 sm:px-2
                      font-black
                      dark:text-gray-200
                      text-[9px] sm:text-[10px] md:text-sm
                      whitespace-nowrap
                      font-mono
                      text-gray-700
                    `}
                  >
                    ${account.balance.toLocaleString()}
                  </td>

                  <td
                    className={`text-center px-1 sm:px-2 border ${cellBorderClass}`}
                  >
                    <p
                      className="
                        text-gray-700
                        dark:text-gray-300
                        text-[7px] sm:text-[8px] md:text-sm
                        whitespace-nowrap
                        font-medium
                      "
                    >
                      {account.startDateJalali}
                    </p>
                    <span
                      className="
                        text-[6px] sm:text-[7px] md:text-xs
                        text-gray-400
                        dark:text-gray-500
                      "
                    >
                      {account.startTime}
                    </span>
                  </td>

                  <td
                    className={`text-center px-1 sm:px-2 border ${cellBorderClass} rounded-2xl rounded-r-none`}
                  >
                    <Link
                      to={`/account/${account.accountNumber}/details`}
                      className={`
                        inline-flex
                        items-center
                        justify-center
                        gap-1
                        px-2 sm:px-2.5 md:px-3
                        py-1 sm:py-1.5
                        rounded-lg sm:rounded-xl
                        text-[7px] sm:text-[8px] md:text-xs
                        font-bold
                        whitespace-nowrap
                        border
                        transition-all
                        duration-200
                        no-underline
                        ${
                          isSelected
                            ? "bg-cyan-500 border-cyan-500 text-white hover:bg-cyan-600"
                            : "bg-transparent border-gray-300 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-cyan-500 hover:text-cyan-600"
                        }
                      `}
                    >
                      <span className="hidden sm:inline">
                        {isSelected
                          ? lang === "fa"
                            ? "ورود به پنل"
                            : "View"
                          : lang === "fa"
                            ? "ورود به پنل آناالیز"
                            : "View"}
                      </span>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableView;
