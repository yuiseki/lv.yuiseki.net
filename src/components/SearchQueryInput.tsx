import { Fragment, useEffect, useRef, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const suggestWords = [
  "ビジュー",
  "ポルト クレ",
  "ポルト モネ",
  "ポルト カルト",
  "ポルト フォイユ",
  "ブラスレ",
  "ブラスレ パーティ",
  "エテュイ",
  "ジッピー",
  "ポシェット",
  "ネヴァーフル",
  "ドーフィーヌ",
  "オン ザ ゴー",
  "プティット マル",
  "コフレ",
  "フレグランス",
  "ゲーム オン",
  "スカーフ",
  "ドレス",
  "コート",
];

export const SearchQueryInput: React.FC<{
  onChange: (value: string) => void;
}> = ({ onChange: _onChange }) => {
  const [value, setValue] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    _onChange(value);
  }, [value]);

  return (
    <div style={{ position: "relative", top: 0 }}>
      <Combobox
        value={value}
        onChange={(selectedValue) => {
          setIsActive(false);
          setValue(selectedValue);
        }}
      >
        {({ open }) => (
          <div style={{ position: "relative" }}>
            <div
              style={{
                backgroundColor: "#f6f5f3",
              }}
            >
              <Combobox.Input
                onFocus={() => !open && setIsActive(true)}
                onBlur={() => open && setIsActive(false)}
                displayValue={() => {
                  return value;
                }}
                onChange={(e) => {
                  setValue(e.currentTarget.value);
                  setIsActive(e.currentTarget.value.length === 0);
                }}
                style={{
                  maxWidth: "90%",
                  minWidth: "30%",
                  fontSize: "1.5em",
                  padding: "10px",
                  border: "0 none",
                  borderRadius: 0,
                  background: "transparent",
                }}
              />
              <Combobox.Button
                onClick={() =>
                  isActive ? setIsActive(false) : setIsActive(true)
                }
                style={{
                  background: "transparent",
                  border: "0 none",
                }}
              >
                <ChevronUpDownIcon
                  style={{ height: "1.5em", width: "1.5em" }}
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition as={Fragment} show={isActive}>
              <Combobox.Options
                style={{
                  position: "absolute",
                  background: "#fff",
                  width: "90%",
                  maxWidth: "90%",
                  minWidth: "30%",
                  maxHeight: "200px",
                  overflowY: "auto",
                  listStyle: "none",
                  margin: 0,
                  padding: 10,
                  zIndex: 1000,
                }}
              >
                {suggestWords.map((word) => (
                  <Combobox.Option
                    key={word}
                    value={word}
                    style={{
                      position: "relative",
                      cursor: "pointer",
                      margin: "5px 0",
                    }}
                  >
                    {word}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Transition>
          </div>
        )}
      </Combobox>
    </div>
  );
};
