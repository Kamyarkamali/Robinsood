import React from "react";
import AccountCard from "./AccountCard";
import type { Account } from "../../types/interfaces";

interface CardViewProps {
  accounts: Account[];
  selectedAccountNumber?: string | null;
  onSelectAccount?: (accountNumber: string) => void;
}

const CardView: React.FC<CardViewProps> = ({
  accounts,
  selectedAccountNumber = null,
  onSelectAccount,
}) => {
  return (
    <div className="space-y-3">
      {accounts.map((account) => (
        <AccountCard
          key={account.id}
          account={account}
          isSelected={selectedAccountNumber === account.accountNumber}
          onSelect={onSelectAccount}
        />
      ))}
    </div>
  );
};

export default CardView;
