import React from "react";
import AccountCard from "./AccountCard";
import type { Account } from "../../types/interfaces";

interface CardViewProps {
  accounts: Account[];
}

const CardView: React.FC<CardViewProps> = ({ accounts }) => {
  return (
    <div className="space-y-3">
      {accounts.map((account) => (
        <AccountCard key={account.id} account={account} />
      ))}
    </div>
  );
};

export default CardView;
