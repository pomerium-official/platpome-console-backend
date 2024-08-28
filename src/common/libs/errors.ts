export class ApplicationError extends Error {
  get name() {
    return this.constructor.name;
  }
}

export class ParseSortError extends ApplicationError {}
