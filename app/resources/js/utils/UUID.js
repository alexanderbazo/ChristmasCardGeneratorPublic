let last;

function createUniqueID() {
  if (last) {
    last += 1;
  } else {
    last = Date.now();
  }
  return last;
}

class UUID {

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

export default UUID;