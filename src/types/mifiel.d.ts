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
};

declare var mifiel:
  | undefined
  | {
      widget: (config: WidgetConfig) => void;
      push: (o: unknown) => void;
    };
