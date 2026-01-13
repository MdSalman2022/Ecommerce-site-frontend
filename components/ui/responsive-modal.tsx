'use client';

import React from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Drawer } from 'vaul';

interface ResponsiveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  trigger?: React.ReactNode;
}

export function ResponsiveModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  trigger,
}: ResponsiveModalProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return (
      <Drawer.Root open={open} onOpenChange={onOpenChange}>
        {trigger && <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>}
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 max-h-[96vh] rounded-t-[10px] bg-white z-50 focus:outline-none">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 my-4" />
            <div className="max-h-[90vh] overflow-y-auto">
              {(title || description) && (
                <div className="text-left px-4 pb-4">
                  {title && <Drawer.Title className="text-xl font-semibold">{title}</Drawer.Title>}
                  {description && (
                    <Drawer.Description className="text-sm text-muted-foreground mt-1">
                      {description}
                    </Drawer.Description>
                  )}
                </div>
              )}
              <div className="px-4 pb-4">{children}</div>
              {footer && <div className="px-4 pb-6">{footer}</div>}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        <div>{children}</div>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
