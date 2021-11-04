# react-start-transition
> React 18 startTransition polyfill

With the upcoming [startTransition](https://github.com/reactwg/react-18/discussions/65) primitive coming to React 18, I decided to create a lil polyfill to help developers transition to the new API and get some perf improvements already.

This lib won't have the same perf impact as the native `startTransition` will since it doesn't have access to React internals (more info [here](https://github.com/reactwg/react-18/discussions/41)) but it will use what's best available and only run the tasks when the browser is not busy doing other more critical stuff.

A combination of [isInputPending](https://web.dev/isinputpending/) and [requestIdleCallback](https://developers.google.com/web/updates/2015/08/using-requestidlecallback) browser API's will be used for that.
## Install

```
$ yarn add react-start-transition
```


## Usage

```
import * as React from "react";
import { useState } from "react";
import { useTransition } from 'react-start-transition'

const App = () => {
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState(5);
  const onChange = (value: number) => {
    startTransition(() => setInputValue(value));
  };
  
  return (
    <div>
      <Slider defaultValue={inputValue} onChange={onChange} />
      <div>{isPending && 'loading...'}</div>
      <div>{inputValue}</div>
    </div>
  );
};


```

### isPending

Notice that when you use the `isPending` from 

```
const [isPending, startTransition] = useTransition();
```

it will be coupled to the task that you run within the `startTransition` and will done whenever that task get ran by the internal scheduler.