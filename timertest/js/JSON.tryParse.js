if (JSON) {
  JSON.tryParse = function (val) {
      try {
        return JSON.parse(val);
      } catch (e) {
        return undefined;
      }
  }
}
