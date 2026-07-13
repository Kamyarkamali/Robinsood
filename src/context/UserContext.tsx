import { createContext, useState, type ReactNode } from "react";
import type { User } from "../types/type";

interface UserContextType {
  user: User;
  updateUser: (data: Partial<User>) => void;
}

export const UserContext = createContext<UserContextType | null>(null);

const defaultUser: User = {
  id: 1,
  name: localStorage.getItem("user-name") || "Kamyar Kamali",
  avatar: localStorage.getItem("avatar") || "https://i.pravatar.cc/150?img=12",
  online: true,
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(defaultUser);

  const updateUser = (data: Partial<User>) => {
    setUser((prev) => {
      const updated = {
        ...prev,
        ...data,
      };

      if (data.name) {
        localStorage.setItem("user-name", data.name);
      }

      if (data.avatar) {
        localStorage.setItem("avatar", data.avatar);
      }

      return updated;
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
