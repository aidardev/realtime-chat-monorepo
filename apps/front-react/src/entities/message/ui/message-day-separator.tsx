export function MessageDaySeparator({ label }: { label: string }) {
    return (
        <div className="my-2 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="rounded-full bg-muted px-3 py-1 text-[11px] font-medium text-muted-foreground">
                {label}
            </span>
            <div className="h-px flex-1 bg-border" />
        </div>
    );
}
