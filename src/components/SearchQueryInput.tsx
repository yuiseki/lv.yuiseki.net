import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
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
  query: string;
  onChange: (value: string) => void;
}> = ({ query, onChange }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <Combobox
        value={query}
        onChange={(selectedValue) => {
          onChange(selectedValue);
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
              <Combobox.Input
                as={Fragment}
                displayValue={() => {
                  return query;
                }}
                onChange={(e) => {
                  onChange(e.currentTarget.value);
                  setIsActive(e.currentTarget.value.length === 0);
                }}
              >
                <input
                  onFocus={() => !open && query.length === 0 && setIsActive(true)}
                  onBlur={() =>
                    setTimeout(() => {
                    setIsActive(false);
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
              </Combobox.Input>
              {query.length > 0 && (
                <button
                  onClick={() => {
                    onChange("");
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
              <Combobox.Button
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
              </Combobox.Button>
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
                <Combobox.Options
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
          </div>
        )}
      </Combobox>
    </div>
  );
};
