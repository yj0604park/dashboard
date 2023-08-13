export default class Util {
  static chunk<Type>(array: Type[], chunkSize: number): Type[][] {
      return [].concat.apply([],
        array.map(function(elem, i) {
          return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
        })
      );
  }
}
