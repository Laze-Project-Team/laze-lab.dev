class FileList<T> {
  _files: T[];
  length: number;
  constructor(files: T[]) {
    this._files = files;
    this.length = this._files.length;
  }
  item(index: number) {
    return this._files[index];
  }
  get [Symbol.toStringTag]() {
    return 'FileList';
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.FileList = FileList;

export {};
