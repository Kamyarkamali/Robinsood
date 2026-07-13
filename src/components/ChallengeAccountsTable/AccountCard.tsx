import React from "react";
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

interface AccountCardProps {
  account: Account;
}

const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
  const statusItem = statusConfig[account.tableStatus];
  const Icon = statusItem.icon;

  const lang = i18next.language;

  return (
    <div
      className="
        rounded-2xl
        p-4
        bg-white
        dark:bg-[#2B2B2B]
        border-2
        border-gray-200/50
        dark:border-white/5
        transition-all
        duration-200
        hover:-translate-y-0.5
      "
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={account?.icon}
            className="w-10 h-10 object-contain"
            alt={account?.title?.fa}
          />
          <div>
            <h3 className="font-bold text-gray-800 dark:text-white text-sm">
              {lang === "fa" ? account?.title?.fa : account?.title?.en}
            </h3>
            <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono">
              #{account?.accountNumber}
            </span>
          </div>
        </div>
        <div
          className={`
            inline-flex
            items-center
            gap-1.5
            px-2.5
            py-1
            rounded-xl
            text-[10px]
            font-bold
            ${statusItem.class}
          `}
        >
          <Icon className="text-[10px]" />
          {lang === "fa"
            ? account?.tableStatusLabel?.fa
            : account?.tableStatusLabel?.en}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-slate-50 dark:bg-white/5 p-2.5 rounded-xl">
          <p className="text-[9px] text-gray-400 dark:text-gray-500">
            {lang === "fa" ? "سرمایه" : "Capital"}
          </p>
          <p className="text-sm font-bold text-gray-800 dark:text-white font-mono">
            ${account.capital.toLocaleString()}
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-white/5 p-2.5 rounded-xl">
          <p className="text-[9px] text-gray-400 dark:text-gray-500">
            {lang === "fa" ? "بالانس" : "Balance"}
          </p>
          <p className="text-sm font-bold text-gray-800 dark:text-white font-mono">
            ${account.balance.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-200/50 dark:border-white/5">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-[8px] text-center text-gray-400 dark:text-gray-500">
              {lang === "fa" ? "نوع" : "Type"}
            </p>
            <p className="text-[10px] font-semibold text-gray-700 dark:text-gray-300">
              {lang === "fa"
                ? account?.accountTypeLabel?.fa
                : account?.accountTypeLabel?.en}
            </p>
          </div>
          <div>
            <p className="text-[8px] text-center text-gray-400 dark:text-gray-500">
              {lang === "fa" ? "مرحله" : "Step"}
            </p>
            <p className="text-[10px] font-semibold text-gray-700 dark:text-gray-300">
              {lang === "fa"
                ? account?.stageLabel?.fa
                : account?.stageLabel?.en}
            </p>
          </div>
        </div>
        <div className="text-left">
          <p className="text-[8px] text-center text-gray-400 dark:text-gray-500">
            {lang === "fa" ? "شروع" : "Started"}
          </p>
          <p className="text-[9px] font-medium text-gray-700 dark:text-gray-300">
            {account.startDateJalali}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
