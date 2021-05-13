## What this Does

This is a proof of concept, do not use in production!

This module is designed to protect a subset of elements in a pre-rendered Angular app, to reference and re-insert the elements after Angular has bootstrapped in the browser instead of destroying and recreating them.

There are limitations to this approach:

- If there are iframes inside the protected element (such as ads), the iframes will reload once re-inserted into the DOM after bootstrapped in the browser.
- Angular Bindings inside the protected element won't work after bootstrap in the browser, but the element will have the values that were bound when the page was pre-rendered (Angular Elements are an exception)

## How to Use

These steps assume you already have pre-rendering set up.

### Step 1: Install

```sh
npm install angular-ssr-element-preserver
```

### Step 2: Update app.module.ts:

```ts
import { ElementPreserverModule } from 'angular-ssr-element-preserver';

@NgModule({
  ...
  imports: [
    ElementPreserverModule.forBrowser(),
    ...
  ],
  ...
})
export class AppModule {}
```

### Step 4: Update app.server.module.ts:

```ts
import { ElementPreserverModule } from 'angular-ssr-element-preserver';

@NgModule({
  imports: [
    ...
    ElementPreserverModule.forServer()
  ],
  ...
})
export class AppServerModule {}
```

### Step 4: Add this script before the closing </body> in src/index.html

It's important that this script ends up inserted after all the pre-rendered elements, but before the Angular script tags that the Angular builder inserts.

```html
<body>
  <myapp-root></myapp-root>
  <script type="text/javascript">
    if (!window.__preservedElementsMap__) {
      window.__preservedElementsMap__ = Array.prototype.reduce.call(
        document.querySelectorAll('preserve-elements'),
        (prev, curr, i) => {
          let key = curr.getAttribute('__elPreserveKey');
          return {
            ...prev,
            [key]: curr,
          };
        },
        {}
      );
    }
  </script>
</body>
```

### Step 5: Add the `PreserveElementsComponent` around Components to Preserve and Reinsert

You must provide a unique `key` to the component, which will be used to track the element internally.

```html
<preserve-elements [key]="'top-sidebar-recommendations'">
  <div>Hello, you, here are some recommendations!</div>
</preserve-elements>
```

### Step 6: Run the app (with pre-rendering enabled)
