import React from "react";
import { HiOutlineBell } from "react-icons/hi";
import i18next from "i18next";

interface NotificationsModalProps {
  onClose: () => void;
}

interface MultiLanguageText {
  fa: string;
  en: string;
}

interface Notification {
  id: number;
  title: MultiLanguageText;
  message: MultiLanguageText;
  time: MultiLanguageText;
  read: boolean;
}

export default function NotificationsModal({
  onClose,
}: NotificationsModalProps) {
  const lang = i18next.language;
  const isRTL = lang === "fa";

  const notificationsData: Notification[] = React.useMemo(
    () => [
      {
        id: 1,
        title: {
          fa: "تغییر وضعیت حساب",
          en: "Account Status Changed",
        },
        message: {
          fa: "حساب شما با موفقیت تایید شد.",
          en: "Your account has been successfully verified.",
        },
        time: {
          fa: "۲ دقیقه پیش",
          en: "2 minutes ago",
        },
        read: false,
      },
      {
        id: 2,
        title: {
          fa: "پیام جدید",
          en: "New Message",
        },
        message: {
          fa: "شما یک پیام جدید از سمت پشتیبانی دریافت کردید.",
          en: "You have received a new message from support.",
        },
        time: {
          fa: "۱ ساعت پیش",
          en: "1 hour ago",
        },
        read: false,
      },
      {
        id: 3,
        title: {
          fa: "به‌روزرسانی سیستم",
          en: "System Update",
        },
        message: {
          fa: "سیستم در تاریخ ۱۴۰۴/۰۵/۰۱ به‌روزرسانی خواهد شد.",
          en: "The system will be updated on 2025/07/23.",
        },
        time: {
          fa: "۳ ساعت پیش",
          en: "3 hours ago",
        },
        read: true,
      },
      {
        id: 4,
        title: {
          fa: "تغییر رمز عبور",
          en: "Password Changed",
        },
        message: {
          fa: "رمز عبور شما با موفقیت تغییر کرد.",
          en: "Your password has been successfully changed.",
        },
        time: {
          fa: "۵ ساعت پیش",
          en: "5 hours ago",
        },
        read: true,
      },
    ],
    [],
  );

  const [notifications, setNotifications] =
    React.useState<Notification[]>(notificationsData);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)),
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getText = (item: MultiLanguageText): string => {
    return lang === "fa" ? item.fa : item.en;
  };

  return (
    <div
      className="p-4 max-h-[80vh] overflow-y-auto dark:bg-[#202020]"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <HiOutlineBell size={24} className="text-blue-500" />
          <h2 className="text-xl font-normal dark:text-white text-gray-500">
            {isRTL ? "اعلان ها" : "Notifications"}
          </h2>
          {unreadCount > 0 && (
            <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
              {isRTL ? `${unreadCount} جدید` : `${unreadCount} new`}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="p-1 hover:bg-zinc-700 rounded-lg transition-colors"
          ></button>
        </div>
      </div>

      <div className="space-y-2">
        {notifications.length === 0 ? (
          <div className="text-center text-zinc-500 py-8">
            <HiOutlineBell size={48} className="mx-auto mb-2 opacity-50" />
            <p className="font-normal dark:text-white text-gray-500">
              {isRTL ? "هیچ اعلانی وجود ندارد" : "No notifications"}
            </p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={`
                p-3 rounded-xl transition-all cursor-pointer
                ${
                  notif.read
                    ? "bg-zinc-800/30 hover:bg-zinc-800/50"
                    : "bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20"
                }
                ${isRTL ? "text-right" : "text-left"}
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-normal dark:text-white text-gray-500">
                      {getText(notif.title)}
                    </h3>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    )}
                  </div>
                  <p className="text-sm text-zinc-400 mt-1">
                    {getText(notif.message)}
                  </p>
                  <span className="text-xs text-zinc-500 mt-2 block">
                    {getText(notif.time)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
