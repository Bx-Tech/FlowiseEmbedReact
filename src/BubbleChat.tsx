import { useCallback, useEffect, useRef, useState } from "react";
import type { BubbleProps } from "@bxtech/flowise-embed";

type Props = BubbleProps & {
  onSendMessage?: (
    sendMessage: (
      message: string | object,
      action?: any,
      humanInput?: any
    ) => Promise<void>
  ) => void;
  onBotMount?: (
    sendMessage: (
      message: string | object,
      action?: any,
      humanInput?: any
    ) => Promise<void>,
    getChatId: () => string,
    injectMessage: (message: string, type?: string) => void
  ) => void;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "flowise-chatbot": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

type BubbleElement = HTMLElement & Props;

export const BubbleChat = (props: Props) => {
  const ref = useRef<BubbleElement | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const sendMessageFn = useRef<undefined | ((...args: any[]) => Promise<void>)>(
    undefined
  );
  useEffect(() => {
    (async () => {
      await import("@bxtech/flowise-embed/dist/web.js");
      setIsInitialized(true);
    })();
    return () => {
      ref.current?.remove();
    };
  }, []);

  const attachBubbleToDom = useCallback((props: Props) => {
    const bubbleElement = document.createElement(
      "flowise-chatbot"
    ) as BubbleElement;
    injectPropsToElement(bubbleElement, props);
    document.body.append(bubbleElement);
    ref.current = bubbleElement;
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    if (!ref.current) attachBubbleToDom(props);
    injectPropsToElement(ref.current as BubbleElement, props);
  }, [attachBubbleToDom, isInitialized, props]);

  const injectPropsToElement = (element: BubbleElement, props: Props) => {
    (element as any).onBotMount = (
      fn: typeof sendMessageFn.current,
      getChatId?: () => string,
      injectMessage?: (message: string, type?: string) => void
    ) => {
      sendMessageFn.current = fn;
      if (
        typeof props.onSendMessage === "function" &&
        typeof fn === "function"
      ) {
        props.onSendMessage(fn);
      }
      if (
        typeof props.onBotMount === "function" &&
        typeof fn === "function" &&
        typeof getChatId === "function" &&
        typeof injectMessage === "function"
      ) {
        props.onBotMount(fn, getChatId, injectMessage);
      }
    };
    Object.assign(element, props);
  };

  return null;
};
