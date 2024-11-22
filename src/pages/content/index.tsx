import { createRoot } from 'react-dom/client';
import './style.css'
const div = document.createElement('div');
div.id = '__root';
document.body.appendChild(div);
import { SessionProvider } from '@src/context/SessionContext';

import Content from '@pages/content/Content';

const rootContainer = document.querySelector('#__root');
if (!rootContainer) throw new Error("Can't find Content root element");
const root = createRoot(rootContainer);
root.render(
  <SessionProvider>
    <Content />
  </SessionProvider>
);

try {
  console.log('content script loaded');
} catch (e) {
  console.error(e);
}
