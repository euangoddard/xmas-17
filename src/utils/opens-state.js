class OpensState {
  static KEY = 'opens';

  constructor() {
    this.opens = this.loadState();
  }

  openDay(day) {
    this.opens[day] = true;
    this.saveState();
  }

  loadState() {
    let stateRaw;
    try {
      stateRaw = localStorage.getItem(OpensState.KEY);
    } catch (e) {}

    let state;
    if (stateRaw) {
      try {
        state = JSON.parse(stateRaw);
      } catch (e) {}
    }

    if (!state) {
      state = {};
      for (let i = 0; i < 25; i++) {
        state[i] = false;
      }
    }
    return state;
  }

  saveState() {
    const stateRaw = JSON.stringify(this.opens);
    try {
      localStorage.setItem(OpensState.KEY, stateRaw);
    } catch (e) {}
  }
}

export const OPEN_STATE = new OpensState();
