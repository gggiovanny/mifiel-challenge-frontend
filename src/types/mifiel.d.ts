type WidgetConfig = {
  widgetId: string;
  appendTo: string;
  successBtnText?: string;
  onSuccess: {
    callToAction?: VoidFunction | string;
  };
  onError: {
    callToAction?: VoidFunction | string;
  };
  pdf?: string;
};

declare var mifiel:
  | undefined
  | {
      widget: (config: WidgetConfig) => void;
      push: (o: unknown) => void;
    };
