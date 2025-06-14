<!-- markdownlint-disable MD030 -->

# Flowise Embed React

React library to display flowise chatbot on your website

![Flowise](https://github.com/FlowiseAI/FlowiseChatEmbed/blob/main/images/ChatEmbed.gif?raw=true)

## Install

```bash
npm install @bxtech/flowise-embed @bxtech/flowise-embed-react
```

or

```bash
yarn add @bxtech/flowise-embed @bxtech/flowise-embed-react
```

## Import

Full Page Chat

```tsx
import { FullPageChat } from "@bxtech/flowise-embed-react";

const App = () => {
  return (
    <FullPageChat
      chatflowid="your-chatflow-id"
      apiHost="http://localhost:3000"
    />
  );
};
```

Popup Chat

```tsx
import { BubbleChat } from "@bxtech/flowise-embed-react";

const App = () => {
  return (
    <BubbleChat chatflowid="your-chatflow-id" apiHost="http://localhost:3000" />
  );
};
```
