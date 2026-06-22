export default function NotificationBell({ hasNotification = false }: { hasNotification?: boolean }) {
  return (
    <button type="button" aria-label="알림" className="relative text-xl">
      🔔
      {hasNotification && (
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-brand" />
      )}
    </button>
  );
}
