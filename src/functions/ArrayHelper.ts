export default class Util {
  static chunk(array: any[], chunkSize: number) {
      return [].concat.apply([],
        array.map(function(elem, i) {
          return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
        })
      );
  }
}
