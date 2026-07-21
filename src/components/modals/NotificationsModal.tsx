import React from "react";
import { HiOutlineBell, HiOutlineX, HiOutlinePhotograph } from "react-icons/hi";
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
  fullMessage: MultiLanguageText[]; // paragraphs shown inside the detail modal
  time: MultiLanguageText;
  date: MultiLanguageText;
  read: boolean;
  image?: string; // demo image shown in the detail modal
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
          fa: "حساب شما با موفقیت تایید شد",
          en: "Your account has been successfully verified.",
        },
        fullMessage: [
          {
            fa: "حساب کاربری شما پس از بررسی مدارک هویتی توسط تیم پشتیبانی، با موفقیت تایید شد",
            en: "Your account has been successfully verified after your identity documents were reviewed by our support team.",
          },
          {
            fa: "از این پس می‌توانید بدون محدودیت از تمامی امکانات پلتفرم از جمله برداشت وجه، معاملات با حجم بالاتر و دسترسی به ابزارهای پیشرفته استفاده کنید",
            en: "From now on, you can use all platform features without restriction, including withdrawals, higher-volume trades, and access to advanced tools.",
          },
          {
            fa: "در صورت بروز هرگونه سوال با پشتیبانی در تماس باشید",
            en: "Please contact support if you have any questions.",
          },
        ],
        time: { fa: "۲ دقیقه پیش", en: "2 minutes ago" },
        date: { fa: "۱۴۰۵/۰۴/۲۹, ۱۲:۰۸", en: "2026/07/21, 12:08" },
        read: false,
        image: "https://picsum.photos/seed/notif-account/600/300",
      },
      {
        id: 2,
        title: {
          fa: "پیام جدید",
          en: "New Message",
        },
        message: {
          fa: "شما یک پیام جدید از سمت پشتیبانی دریافت کردید",
          en: "You have received a new message from support.",
        },
        fullMessage: [
          {
            fa: "یک پیام جدید از تیم پشتیبانی برای شما ارسال شده است",
            en: "A new message has been sent to you by our support team.",
          },
          {
            fa: "این پیام شامل توضیحاتی درباره‌ی درخواست اخیر شما و مراحل بعدی است",
            en: "This message includes details about your recent request and the next steps.",
          },
          {
            fa: "توصیه می‌شود در اسرع وقت پیام را مطالعه و در صورت نیاز پاسخ دهید",
            en: "We recommend reading it as soon as possible and replying if needed.",
          },
        ],
        time: { fa: "۱ ساعت پیش", en: "1 hour ago" },
        date: { fa: "۱۴۰۵/۰۴/۲۹, ۱۱:۱۰", en: "2026/07/21, 11:10" },
        read: false,
        image: "https://picsum.photos/seed/notif-message/600/300",
      },
      {
        id: 3,
        title: {
          fa: "به‌روزرسانی سیستم",
          en: "System Update",
        },
        message: {
          fa: "سیستم در تاریخ ۱۴۰۴/۰۵/۰۱ به‌روزرسانی خواهد شد",
          en: "The system will be updated on 2025/07/23.",
        },
        fullMessage: [
          {
            fa: "به اطلاع می‌رساند سیستم در تاریخ ۱۴۰۴/۰۵/۰۱ جهت اعمال به‌روزرسانی‌های امنیتی و بهبود عملکرد، برای مدت کوتاهی در دسترس نخواهد بود",
            en: "Please note that the system will be temporarily unavailable on 2025/07/23 to apply security updates and performance improvements.",
          },
          {
            fa: "توصیه می‌شود معاملات باز خود را پیش از این تاریخ مدیریت کنید تا در طول فرآیند به‌روزرسانی با اختلال مواجه نشوید",
            en: "We recommend managing your open trades before this date to avoid any disruption during the update process.",
          },
        ],
        time: { fa: "۳ ساعت پیش", en: "3 hours ago" },
        date: { fa: "۱۴۰۵/۰۴/۲۹, ۰۹:۰۰", en: "2026/07/21, 09:00" },
        read: true,
        image: "https://picsum.photos/seed/notif-update/600/300",
      },
      {
        id: 4,
        title: {
          fa: "تغییر رمز عبور",
          en: "Password Changed",
        },
        message: {
          fa: "رمز عبور شما با موفقیت تغییر کرد",
          en: "Your password has been successfully changed.",
        },
        fullMessage: [
          {
            fa: "رمز عبور حساب کاربری شما با موفقیت تغییر یافت",
            en: "Your account password has been successfully changed.",
          },
          {
            fa: "اگر این تغییر توسط شما انجام نشده است، لطفا فورا با تیم پشتیبانی تماس بگیرید تا مراحل امنیتی لازم برای محافظت از حساب شما انجام شود",
            en: "If you did not make this change yourself, please contact our support team immediately so the necessary security steps can be taken to protect your account.",
          },
        ],
        time: { fa: "۵ ساعت پیش", en: "5 hours ago" },
        date: { fa: "۱۴۰۵/۰۴/۲۹, ۰۷:۰۰", en: "2026/07/21, 07:00" },
        read: true,
      },
    ],
    [],
  );

  const [notifications, setNotifications] =
    React.useState<Notification[]>(notificationsData);
  const [selectedNotification, setSelectedNotification] =
    React.useState<Notification | null>(null);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)),
    );
  };

  const handleOpenNotification = (notif: Notification) => {
    markAsRead(notif.id);
    setSelectedNotification(notif);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getText = (item: MultiLanguageText): string => {
    return lang === "fa" ? item.fa : item.en;
  };

  return (
    <div
      className="p-4 mr-2 max-h-[80vh] overflow-y-auto dark:bg-[#202020]"
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
              onClick={() => handleOpenNotification(notif)}
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

      {selectedNotification && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4"
          onClick={() => setSelectedNotification(null)}
        >
          <div
            dir={isRTL ? "ltr" : "rtl"}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-lg h-[92vh] sm:h-auto sm:max-h-[85vh] bg-[#141414] rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-3 shrink-0">
              <button
                onClick={() => setSelectedNotification(null)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors shrink-0"
              >
                <HiOutlineX size={22} className="text-white" />
              </button>

              <h2 className="flex-1 text-center text-lg sm:text-2xl font-medium text-white leading-snug">
                {getText(selectedNotification.title)}
              </h2>

              <div className="w-9 shrink-0" />
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 pb-24">
              {/* Demo image */}
              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-zinc-800 mb-5">
                {selectedNotification.image ? (
                  <img
                    src={selectedNotification.image}
                    alt={getText(selectedNotification.title)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <HiOutlinePhotograph size={40} className="text-zinc-600" />
                  </div>
                )}
              </div>

              <div className="space-y-5">
                {selectedNotification.fullMessage.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className={`${isRTL ? "text-right" : "text-left"}  text-sm sm:text-base leading-8 text-zinc-300 text-center`}
                  >
                    {getText(paragraph)}
                  </p>
                ))}
              </div>

              <p className="text-xs text-zinc-500 text-center sm:text-start mt-8">
                {getText(selectedNotification.date)}
              </p>
            </div>

            <div className="flex justify-end mb-4 mr-4 sm:w-auto">
              <button
                onClick={() => setSelectedNotification(null)}
                className="w-full sm:w-auto cursor-pointer sm:px-8 py-3 rounded-2xl bg-cyan-400 hover:bg-cyan-500 text-black font-medium text-sm transition-colors"
              >
                {isRTL ? "خوانده شد" : "It was read"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
