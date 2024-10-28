import { mount } from 'svelte'
import App from './App.svelte'

const target = document.getElementById('app');
let app: ReturnType<typeof mount>;

if (target) {
  app = mount(App, {
    target: target
  })
} else {
  throw new Error("Target element not found");
}

export default app;