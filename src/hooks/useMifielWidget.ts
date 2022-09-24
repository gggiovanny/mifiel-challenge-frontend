import { useTimeout } from '@mantine/hooks';
import { useCallback, useEffect } from 'react';

type Props = {
  widgetId: string;
  fileB64?: string;
  containerId: string;
  isOnSandbox?: boolean;
  successButtonText?: string;
  onSuccess?: VoidFunction;
  onError?: VoidFunction;
  onWidgetOpen?: VoidFunction;
};

export default function ({
  widgetId,
  fileB64,
  containerId,
  isOnSandbox,
  successButtonText = 'Proceed to next step',
  onError,
  onSuccess,
  onWidgetOpen,
}: Props) {
  const openWidget = useCallback(() => {
    if (window.mifiel) {
      window.mifiel.widget({
        widgetId,
        appendTo: containerId,
        successBtnText: successButtonText,
        onSuccess: { callToAction: onSuccess },
        onError: { callToAction: onError },
        // TODO: pass fileB64
      });
    }
    onWidgetOpen && onWidgetOpen();
  }, [containerId, onError, onSuccess, onWidgetOpen, successButtonText, widgetId]);

  const { start, clear } = useTimeout(openWidget, 100);

  useEffect(() => {
    // @ts-expect-error
    window.mifiel = window.mifiel || [];
    for (
      var e = ['widget'],
        i = function (e: string) {
          return function () {
            window?.mifiel?.push([e].concat(Array.prototype.slice.call(arguments, 0)));
          };
        },
        t = 0;
      t < e.length;
      t++
    ) {
      var n = e[t];
      // @ts-expect-error
      window.mifiel[n] || (window.mifiel[n] = i(n));
    }
    if (!document.getElementById('mifiel-js')) {
      var c = document.createElement('script');
      var o = document.getElementsByTagName('script')[0];
      c.type = 'text/javascript';
      c.id = 'mifiel-js';
      c.async = !0;
      c.src = isOnSandbox
        ? 'https://sandbox.mifiel.com/sign-widget-v1.0.0.js'
        : 'https://www.mifiel.com/sign-widget-v1.0.0.js';
      o.parentNode?.insertBefore(c, o);
    }
    start();

    return () => {
      clear();
    };
  }, [clear, isOnSandbox, start]);
}
