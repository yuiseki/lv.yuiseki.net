// https://piecedesign.co.jp/lab/103/
export const yenFormat = (_val?: number) => {
  if (!_val) return "0円";
  if (_val === 0) return "0円";
  const _string = String(_val);
  const _length = _string.length;
  const _digits = ["", "万", "億", "兆", "京", "垓"];
  let _result = "";
  let _results: number[] = [];

  for (let i = 0; i < Math.ceil(_length / 4); i++) {
    _results[i] = Number(
      _string.substring(_length - i * 4, _length - (i + 1) * 4)
    );
    if (_results[i] != 0)
      _result =
        String(_results[i]).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,") +
        _digits[i] +
        _result;
  }
  return _result + "円";
};
