import { newUUID } from 'lively.lang/string.js';
import { pt } from 'lively.graphics';
import { UserRegistry } from 'lively.user';
import { config } from 'lively.morphic';

export class CommentData {
  constructor (text, relativePosition = pt(0, 0)) {
    this.text = text;
    this.uuid = newUUID();
    this.timestamp = new Date().getTime();
    this.position = relativePosition;
    this.resolved = undefined;
    this.username = UserRegistry.current.loadUserFromLocalStorage(config.users.authServerURL).name;
    this.viewCollapsed = false;
  }

  equals (comment) {
    return this.uuid === comment.uuid;
  }

  resolve () {
    this.resolved = new Date().getTime();
  }

  unresolve () {
    this.resolved = undefined;
  }

  isResolved () {
    return !!this.resolved;
  }

  toggleResolveStatus () {
    this.isResolved() ? this.unresolve() : this.resolve();
  }
}
