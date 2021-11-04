import { useEffect, useState } from "react";

interface NavigatorWithScheduling extends Navigator {
  scheduling?: {
    isInputPending: () => boolean;
  };
}

declare var navigator: NavigatorWithScheduling;

const isInputPendingSupported =
  "scheduling" in navigator &&
  navigator.scheduling &&
  "isInputPending" in navigator.scheduling;
const tasks: Function[] = [];

const runTasks = () => {
  while (tasks.length > 0) {
    if (isInputPendingSupported) {
      if (navigator.scheduling?.isInputPending()) {
        setTimeout(runTasks);
        return;
      }

      const task = tasks.shift();
      task && task();
    } else {
      const task = tasks.shift();
      if (task) {
        window.requestIdleCallback(() => task());
      }
    }
  }
};

// TODO: admit options
// performance.now() >= DEADLINE
export const startTransition = (task: Function) => {
  tasks.push(task);
  runTasks();
};

export const useTransition = (): [boolean, Function] => {
  const [isPending, setIsPending] = useState(false);
  let resolver: Function = () => {};
  const promise = new Promise((resolve) => {
    resolver = resolve;
  });

  useEffect(() => {
    promise.then(() => {
      setIsPending(false);
    });
  });

  return [
    isPending,
    (task: Function) => {
      setIsPending(true);
      startTransition(() => {
        task();
        resolver();
      });
    },
  ];
};
