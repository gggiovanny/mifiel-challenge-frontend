import { Modal } from '@mantine/core';
import useIsMobile from 'hooks/useIsMobile';
import useMifielWidget from 'hooks/useMifielWidget';
import { useState } from 'react';

const containerId = 'mifiel-widget-container';

export type WidgetData = {
  widgetId: string;
  fileB64?: string;
};

type Props = {
  widgetData: WidgetData;
  onClose: VoidFunction;
};

export default function SignDocumentModal({ widgetData, onClose }: Props) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const { widgetId, fileB64 } = widgetData;

  function handleOpenWidget() {
    setIsOpen(true);
  }

  useMifielWidget({
    containerId,
    widgetId,
    isOnSandbox: true,
    onWidgetOpen: handleOpenWidget,
    fileB64,
  });

  return (
    <Modal
      title="Sign document"
      opened={isOpen}
      onClose={onClose}
      size="xl"
      fullScreen={isMobile}
      transition="slide-up"
    >
      <div id={containerId} />
    </Modal>
  );
}
