import * as React from "react";
import { useState, FC, ChangeEvent } from "react";
import { GHCorner } from "react-gh-corner";
import { useTransition } from "../src";
import { AppWrapper, GlobalStyles } from "./styled";

const repoUrl = "https://github.com/react-start-transition";

const App = () => {
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState(50);
  const onChange = (value: number) => {
    startTransition(() => {
      setInputValue(value);
    });
  };
  const content = (new Array(inputValue) as any).fill(undefined).map((_: any, index: number) => {
    return (
      <div key={index} style={{ border: "1px solid", display: "inline-block" }}>
        {index}
      </div>
    );
  });
  return (
    <AppWrapper>
      <GlobalStyles />
      <GHCorner openInNewTab href={repoUrl} />
      <Slider onChange={onChange} />
      <div>isPending: {`${isPending}`}</div>
      <div>{inputValue}</div>
      <div>{content}</div>
    </AppWrapper>
  );
};

interface SliderProps {
  onChange: (value: number) => void;
}

const Slider: FC<SliderProps> = ({ onChange }) => {
  const [inputValue, setInputValue] = useState(50);
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setInputValue(value);

    onChange(value);
  };

  return (
    <input
      style={{ width: 500 }}
      type="range"
      min="0"
      max="100"
      value={inputValue}
      step="1"
      onChange={onInputChange}
    />
  );
};

// TODO: use useTransition in a child component as well

export default App;
