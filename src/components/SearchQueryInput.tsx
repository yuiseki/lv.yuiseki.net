import { useState } from "react";

export const SearchQueryInput: React.FC<{
  onChange: (value: string) => void;
}> = ({ onChange }) => {
  const [value, setValue] = useState("");

  return (
    <>
      <input
        type="text"
        placeholder={"Search items..."}
        autoComplete="on"
        list="search"
        style={{
          maxWidth: "90%",
          minWidth: "30%",
          fontSize: "1.5em",
          padding: "10px",
          backgroundColor: "#f6f5f3",
          border: "none",
        }}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
      <datalist id="search">
        <option value="ビジュー" />
        <option value="ポルト クレ" />
        <option value="ポルト モネ" />
        <option value="ポルト カルト" />
        <option value="ポルト フォイユ" />
        <option value="ブラスレ" />
        <option value="エテュイ" />
        <option value="ジッピー" />
        <option value="ポシェット" />
        <option value="ジッピー" />
        <option value="ネヴァーフル" />
        <option value="ドーフィーヌ" />
        <option value="オン ザ ゴー" />
        <option value="プティット マル" />
        <option value="コフレ" />
        <option value="フレグランス" />
        <option value="ゲーム オン" />
        <option value="スカーフ" />
        <option value="ドレス" />
        <option value="コート" />
      </datalist>
    </>
  );
};
