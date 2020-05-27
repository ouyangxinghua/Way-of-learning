export class IDictionary<T> implements Iterable<T> {
    [index: string]: T

    *[Symbol.iterator](): Iterator<T> {
        let keys = Object.values(this);
        for (let i of keys) {
            yield i;
        }
    }
}
