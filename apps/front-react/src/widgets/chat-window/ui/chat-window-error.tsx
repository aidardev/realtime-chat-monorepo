import { Button } from '@/shared/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

export function ChatWindowError({ onRetry }: { onRetry: () => void }) {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle className="size-8 text-destructive" />
            </div>
            <div>
                <h3 className="font-semibold">Не удалось загрузить чат</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                    Попробуйте обновить данные ещё раз.
                </p>
            </div>
            <Button variant="outline" onClick={onRetry}>
                <RefreshCw className="mr-2 size-4" />
                Повторить
            </Button>
        </div>
    );
}
