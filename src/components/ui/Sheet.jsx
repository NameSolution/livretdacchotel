import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useI18n } from '../../i18n';

/** Panneau modal : tiroir bas sur mobile, fenêtre centrée à partir de 640 px. Focus piégé et Échap gérés par Radix. */
export default function Sheet({ open, onOpenChange, title, description, children, hideTitle = false }) {
  const { t } = useI18n();
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="sheet-overlay fixed inset-0 z-40 bg-ink/45" />
        <Dialog.Content
          className="sheet-panel fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[90dvh] w-full max-w-lg flex-col rounded-t-lg bg-paper outline-none sm:inset-y-0 sm:my-auto sm:h-fit sm:rounded-lg"
        >
          <div className="flex items-start justify-between gap-4 px-5 pb-2 pt-4">
            <Dialog.Title className={hideTitle ? 'sr-only' : 'display h-section pt-1'}>{title}</Dialog.Title>
            <Dialog.Close
              className="-mr-2 grid h-11 w-11 shrink-0 place-items-center rounded-full text-ink hover:bg-paper-2"
              aria-label={t('guest.common.close')}
            >
              <X size={22} strokeWidth={1.75} aria-hidden />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">{description ?? title}</Dialog.Description>
          <div className="overflow-y-auto overscroll-contain px-5 pb-[calc(1.5rem+var(--safe-bottom))]">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
