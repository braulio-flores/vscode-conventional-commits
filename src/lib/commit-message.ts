/**
 * @since 2020-07-06 23:02
 * @author vivaxy
 */
export class CommitMessage {
  private _type: string = '';
  private _scope: string = '';
  private _gitmoji: string = '';
  private _subject: string = '';
  private _body: string = '';
  private _footer: string = '';
  private _ci: string = '';
  private _issueKey: string = ''; // Nuevo campo

  get type() {
    return this._type;
  }

  set type(input: string) {
    this._type = input.trim();
  }

  get scope() {
    return this._scope;
  }

  set scope(input: string) {
    this._scope = input.trim();
  }

  get gitmoji() {
    return this._gitmoji;
  }

  set gitmoji(input: string) {
    this._gitmoji = input.trim();
  }

  get subject() {
    return this._subject;
  }

  set subject(input: string) {
    this._subject = input.trim();
  }

  get body() {
    return this._body;
  }

  set body(input: string) {
    this._body = input.trim();
  }

  get footer() {
    return this._footer;
  }

  set footer(input: string) {
    this._footer = input.trim();
  }

  get ci() {
    return this._ci;
  }

  set ci(input: string) {
    this._ci = input.trim();
  }

  get issueKey() {
    return this._issueKey;
  }

  set issueKey(input: string) {
    this._issueKey = input.trim();
  }
}

export function serializeSubject(partialCommitMessage: {
  gitmoji: string;
  subject: string;
}) {
  let result = '';
  const { gitmoji, subject } = partialCommitMessage;
  if (gitmoji) {
    result += `${gitmoji}`;
  }
  if (gitmoji && subject) {
    result += ' ';
  }
  if (subject) {
    result += subject;
  }
  return result;
}

export function serializeHeader(partialCommitMessage: {
  ci: string;
  type: string;
  scope: string;
  gitmoji: string;
  subject: string;
}) {
  let result = '';
  result += partialCommitMessage.type;
  const { scope, ci } = partialCommitMessage;
  if (scope) {
    result += `(${scope})`;
  }
  result += ': ';
  const subject = serializeSubject(partialCommitMessage);
  if (subject) {
    result += subject;
  }
  if (ci === 'Yes') {
    result += ' [skip ci]';
  }
  return result;
}

export function serialize(commitMessage: CommitMessage) {
  let message = serializeHeader(commitMessage);
  const { body, footer, issueKey } = commitMessage;
  if (body) {
    message += `\n\n${body}`;
  }
  if (footer) {
    message += `\n\n${footer}`;
  }
  if (issueKey) {
    message += ` [${issueKey}]`; // Añadir el issueKey al final, envuelto en corchetes
  }
  return message;
}
