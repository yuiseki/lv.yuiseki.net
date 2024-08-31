import { Fragment, useEffect, useRef, useState } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

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
  //const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    _onChange(value);
  }, [value]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <Combobox
        value={value}
        onChange={(selectedValue) => {
          setValue(selectedValue ? selectedValue : "");
          setIsActive(false);
        }}
      >
        {({ open }) => (
          <div
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                background: "transparent",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <ComboboxInput
                as={Fragment}
                displayValue={() => {
                  return value;
                }}
                onChange={(e) => {
                  setValue(e.currentTarget.value);
                  setIsActive(e.currentTarget.value.length === 0);
                }}
              >
                <input
                  onFocus={() => !open && setIsActive(true)}
                  onBlur={() =>
                    setTimeout(() => {
                      open && setIsActive(false);
                    }, 100)
                  }
                  placeholder="Search by word..."
                  style={{
                    display: "block",
                    width: "100%",
                    fontSize: "1.4em",
                    lineHeight: "1.4em",
                    padding: "10px",
                    border: "0 none",
                    borderRadius: 0,
                    backgroundColor: "#f6f5f3",
                  }}
                />
              </ComboboxInput>
              {value.length > 0 && (
                <button
                  onClick={() => {
                    setValue("");
                    setIsActive(false);
                  }}
                  style={{
                    display: "block",
                    backgroundColor: "#f6f5f3",
                    border: "0 none",
                    cursor: "pointer",
                  }}
                >
                  <XMarkIcon
                    style={{ height: "1.5em", width: "1.5em" }}
                    aria-hidden="true"
                  />
                </button>
              )}
              <ComboboxButton
                onClick={() => setIsActive(true)}
                style={{
                  display: "block",
                  backgroundColor: "#f6f5f3",
                  border: "0 none",
                  cursor: "pointer",
                }}
              >
                <ChevronUpDownIcon
                  style={{ height: "1.5em", width: "1.5em" }}
                  aria-hidden="true"
                />
              </ComboboxButton>
            </div>
            <div
              style={{
                position: "absolute",
                top: "3em",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Transition as={Fragment} show={isActive}>
                <ComboboxOptions
                  style={{
                    display: "block",
                    background: "#fff",
                    width: "100%",
                    maxHeight: "200px",
                    overflowY: "auto",
                    listStyle: "none",
                    margin: 0,
                    padding: 10,
                    zIndex: 1000,
                  }}
                  static
                >
                  {suggestWords.map((word) => (
                    <ComboboxOption
                      key={word}
                      value={word}
                      style={{
                        position: "relative",
                        cursor: "pointer",
                        margin: "5px 0",
                      }}
                    >
                      {word}
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              </Transition>
            </div>
          </div>
        )}
      </Combobox>
    </div>
  );
};
