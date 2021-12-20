let last;

function createUniqueID() {
  if (last) {
    last += 1;
  } else {
    last = Date.now();
  }
  return last;
}

/**
 * Represents an ID unique in this applications life cycle.
 */
class AUID {

  constructor() {
    this.id = createUniqueID();
    Object.freeze(this);
  }

  asString() {
    return this.id.toString();
  }

  equals(uuid) {
    return this.id === uuid.id;
  }

}

export default AUID;