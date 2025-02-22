'use strict';

var require$$0 = require('vscode');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);

var uuid = {exports: {}};

/**
 * UUID.js - RFC-compliant UUID Generator for JavaScript - Stripped
 * @author  LiosK
 * @version v4.2.8
 * @license Apache License 2.0: Copyright (c) 2010-2021 LiosK
 */

(function (module) {
((function() {

UUID._getRandomInt = function(x) {
  if (x < 0 || x > 53) { return NaN; }
  var n = 0 | Math.random() * 0x40000000; // 1 << 30
  return x > 30 ? n + (0 | Math.random() * (1 << x - 30)) * 0x40000000 : n >>> 30 - x;
};

UUID._hexAligner = function(num, length) {
  var str = num.toString(16), i = length - str.length, z = "0";
  for (; i > 0; i >>>= 1, z += z) { if (i & 1) { str = z + str; } }
  return str;
};

UUID.FIELD_NAMES = ["timeLow", "timeMid", "timeHiAndVersion", "clockSeqHiAndReserved", "clockSeqLow", "node"];
UUID.FIELD_SIZES = [32, 16, 16, 8, 8, 48];

UUID.genV4 = function() {
  var rand = UUID._getRandomInt;
  return new UUID()._init(rand(32), rand(16),
                          0x4000 | rand(12),
                          0x80   | rand(6),
                          rand(8), rand(48));
};

UUID.prototype._init = function() {
  var names = UUID.FIELD_NAMES, sizes = UUID.FIELD_SIZES;
  var bin = UUID._binAligner, hex = UUID._hexAligner;

  this.intFields = new Array(6);
  this.bitFields = new Array(6);
  this.hexFields = new Array(6);

  for (var i = 0; i < 6; i++) {
    var intValue = parseInt(arguments[i] || 0);
    this.intFields[i] = this.intFields[names[i]] = intValue;
    this.bitFields[i] = this.bitFields[names[i]] = bin(intValue, sizes[i]);
    this.hexFields[i] = this.hexFields[names[i]] = hex(intValue, sizes[i] >>> 2);
  }
  // @ts-ignore
  this.version = (this.intFields.timeHiAndVersion >>> 12) & 0xF;
  this.bitString = this.bitFields.join("");
  this.hexNoDelim = this.hexFields.join("");
  this.hexString = this.hexFields[0] + "-" + this.hexFields[1] + "-" + this.hexFields[2]
                 + "-" + this.hexFields[3] + this.hexFields[4] + "-" + this.hexFields[5];
  this.urn = "urn:uuid:" + this.hexString;
  return this;
};

UUID._binAligner = function(num, length) {
  var str = num.toString(2), i = length - str.length, z = "0";
  for (; i > 0; i >>>= 1, z += z) { if (i & 1) { str = z + str; } }
  return str;
};

UUID.prototype.toString = function() { return this.hexString; };

UUID.NIL = new UUID()._init(0, 0, 0, 0, 0, 0);

function UUID() {}

// for nodejs
{
  module.exports = UUID;
}

return UUID;

}))();
}(uuid));

const vscode$1 = require$$0__default["default"];

function utf8_to_str (src, off, lim) {  // https://github.com/quicbit-js/qb-utf8-to-str-tiny
  lim = lim == null ? src.length : lim;
  for (var i = off || 0, s = ''; i < lim; i++) {
    var h = src[i].toString(16);
    if (h.length < 2) h = '0' + h;
    s += '%' + h;
  }
  return decodeURIComponent(s);
}

function getProperty(obj, prop, deflt) { return obj.hasOwnProperty(prop) ? obj[prop] : deflt; }
function getDefaultProperty(obj, deflt) { return getProperty(obj, 'default', deflt); }
function errorMessage(msg, noObject) { vscode$1.window.showErrorMessage(msg); return noObject ? noObject : "Unknown";}
function fileNotInFolderError(noObject) { return errorMessage('File not in Multi-root Workspace', noObject); }
function isString(obj) { return typeof obj === 'string';}
function isArray(obj) { return Array.isArray(obj);}
function isObject(obj) { return (typeof obj === 'object') && !isArray(obj);}
function range(size, startAt = 0) { return [...Array(size).keys()].map(i => i + startAt); }  // https://stackoverflow.com/a/10050831/9938317
function dblQuest(value, deflt) { return value !== undefined ? value : deflt; }
function nUp(i) { return i===0 ? '' : i.toString()+'Up'; }

var utils$1 = {
  getProperty, getDefaultProperty, errorMessage, fileNotInFolderError, isString, isArray, isObject, range, dblQuest, nUp, utf8_to_str
};

const vscode = require$$0__default["default"];
const UUID = uuid.exports;
const utils = utils$1;

/** @type {vscode.ExtensionContext} */
let extensionContext = undefined;

let deprecationStore = {};
let gDeprecationRememberPickVariable = 'rememberPickVariable';
let gDeprecationRememberPickCommand = 'rememberPickCommand';

function showDeprecationMessage(key) {
  let showMessage = utils.getProperty(deprecationStore, key, true);
  if (!showMessage) { return; } // already shown this session
  let msg = undefined;
  if (key === gDeprecationRememberPickVariable ) {
    msg = "'${rememberPick}' variable is deprecated, use '${remember}' variable";
  }
  if (key === gDeprecationRememberPickCommand) {
    msg = "'extension.commandvariable.rememberPick' command is deprecated, use command 'extension.commandvariable.remember'";
  }
  if (msg) {
    vscode.window.showInformationMessage(msg);
  }
  deprecationStore[key] = false;
}

let gWebExtension = true;

function setAsDesktopExtension() {
  gWebExtension = false;
}

let numberStore = {};

let rememberStore = { __not_yet: "I don't remember", empty: "", "__undefined": undefined };

function getRememberStore() {
  return rememberStore;
}
function storeStringRemember(args, result) {
  if (result !== undefined) {
    let argkey = utils.getProperty(args, 'key', '__unknown');
    if (!utils.isString(result)) {
      result = result.value;
      if (utils.isObject(result)) {
        for (const vkey in result) {
          if (result.hasOwnProperty(vkey)) {
            rememberStore[vkey] = result[vkey];
          }
        }
        return getRememberKey(argkey);
      }
    }
    rememberStore[argkey] = result;
  }
  return result !== undefined ? result : utils.getDefaultProperty(args);
}
/** @param {object} args has 'key' and ['default'] property @param {any} result undefined, kv-object, single value */
function storeStringRemember2(args, result, defaultFromArgs) {
  if (result !== undefined) {
    let argkey = utils.getProperty(args, 'key', '__unknown');
    if (utils.isObject(result)) {
      for (const vkey in result) {
        if (result.hasOwnProperty(vkey)) {
          rememberStore[vkey] = result[vkey];
        }
      }
      return getRememberKey(argkey);
    }
    rememberStore[argkey] = result;
  }
  if (defaultFromArgs === undefined) { defaultFromArgs = true; }
  return result !== undefined ? result : (defaultFromArgs ? utils.getDefaultProperty(args) : undefined);
}

function getRememberKey(key, defaultKey) {
  const numberPrefix = 'number-';
  if (key.startsWith(numberPrefix)) {
    let numberConfig = utils.getProperty(numberStore, key.slice(numberPrefix.length), [0]);
    return numberConfig[numberConfig.length-1].toString();
  }
  defaultKey = utils.dblQuest(defaultKey, '__not_yet');
  return utils.getProperty(rememberStore, key, rememberStore[defaultKey]);
}

let gRememberKeyEscapedUI = '__escapedUI';
let gRememberPropertyCheckEscapedUI = 'checkEscapedUI';

/** @returns value of escapedUI state if check property in args else false */
function checkEscapedUI(args) {
  args = utils.dblQuest(args, {});
  if (utils.getProperty(args, gRememberPropertyCheckEscapedUI)) {
    return utils.getProperty(rememberStore, gRememberKeyEscapedUI);
  }
  return false;
}
/** @returns uiResult */
function storeEscapedUI(uiResult) {
  rememberStore[gRememberKeyEscapedUI] = (uiResult === undefined);
  return uiResult;
}

async function rememberCommand(args, processKey) {
  args = utils.dblQuest(args, {});
  if (checkEscapedUI(args)) { return undefined; }
  args.key = utils.getProperty(args, 'key', 'empty');
  if (args.key && processKey) { args.key = await processKey(args.key); }
  return storeStringRemember2(args, utils.getProperty(args, 'store', {}) );
}

function getNamedWorkspaceFolder(name, workspaceFolder, editor) {
  const folders = utils.dblQuest(vscode.workspace.workspaceFolders, []);
  if (!name) {
    if (editor) { return workspaceFolder; }
    if (folders.length === 1) { return workspaceFolder; }
    utils.errorMessage('Use the name of the Workspace Folder in the variable or argument');
    return undefined;
  }
  let filterPred = w => w.name === name;
  if (name.indexOf('/') >= 0) { filterPred = w => w.uri.path.endsWith(name); }
  let wsfLst = folders.filter(filterPred);
  if (wsfLst.length === 0) {
    utils.errorMessage(`Workspace not found with name: ${name}`);
    return undefined;
  }
  return wsfLst[0];
}function activeTextEditorVariable(action, args, noEditor, editorOptional) {
  const editor = vscode.window.activeTextEditor;
  if (!editorOptional) {
    if (!editor) { return utils.errorMessage('No editor', noEditor); }
  }
  return action(editor, args);
}function activeWorkspaceFolder(action, noWorkSpace, editorOptional) {
  const folders = vscode.workspace.workspaceFolders;
  if (!folders) { return utils.errorMessage('No folder open', noWorkSpace); }
  return activeTextEditorVariable( editor => {
    let folder = undefined;
    if (editor) {
      folder = vscode.workspace.getWorkspaceFolder(editor.document.uri);
    }
    if (!folder) {
      folder = folders[0];  // choose first folder in the list
    }
    return folder ? action(folder, editor) : utils.fileNotInFolderError(noWorkSpace);
  }, undefined, undefined, editorOptional);
}function activeWorkspaceFolderEditorOptional(action, noWorkSpace, workspaceName) {
  const editorOptional = true;
  return activeWorkspaceFolder( (workspaceFolder, editor) => {
    workspaceFolder = getNamedWorkspaceFolder(workspaceName, workspaceFolder, editor);
    if (!workspaceFolder) { return 'Unknown'; }
    return action(workspaceFolder, editor);
  }, noWorkSpace, editorOptional);
}function toString(obj) {
  if (utils.isString(obj)) { return obj; }
  if (utils.isObject(obj)) {
    let elements = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        elements.push(`${key}="${obj[key]}"`);
      }
    }
    return elements.join(', ');
  }
  return obj.toString();
}

class PickStringMulti {
  constructor(name, label, dependsOn) {
    this.name = name;
    this.label = label;
    this.dependsOn = dependsOn ? dependsOn : 'true';
    this.dependsOnFunc = x => false;  // pass checkConstraint for non multi pick
    this.pickCount = 0;
  }
  collectNames() {
    let names = [];
    if (this.name) { names.push(this.name); }
    return names;
  }
  constructDependsOnFunc(definedNamesRegex) {
    this.dependsOnFunc = getExpressionFunction(this.dependsOn.replace(definedNamesRegex, 'content.$1'), 'commandvariable.pickStringRemember');
  }
  calcPickCount(pickedLabels) {
    this.pickCount = pickedLabels.includes(this.label) ? 1 : 0;
    return this.pickCount;
  }
  updatePickContext(pickContext) {
    if (this.name) {
      pickContext[this.name] = this.pickCount;
    }
  }
  allowedLabel(pickContext, label) {
    return (this.label === label) && this.dependsOnFunc(pickContext);
  }
}

class PickStringItem extends PickStringMulti {
  constructor(name, label, dependsOn) {
    super(name, label, dependsOn);
  }
}

class PickStringGroup extends PickStringMulti {
  constructor(name, label, minCount, maxCount, dependsOn) {
    super(name, label, dependsOn);
    this.minCount = minCount;
    this.maxCount = maxCount;
    this.items = [];
  }
  addItem(qpItem) {
    let label = utils.getProperty(qpItem, 'label');
    let name = utils.getProperty(qpItem, 'name');
    let dependsOn = utils.getProperty(qpItem, 'dependsOn');
    this.items.push(new PickStringItem(name, label, dependsOn));
  }
  collectNames() {
    return super.collectNames().concat(this.items.flatMap(i => i.collectNames()));
  }
  constructDependsOnFunc(definedNamesRegex) {
    super.constructDependsOnFunc(definedNamesRegex);
    this.items.forEach(i => i.constructDependsOnFunc(definedNamesRegex));
  }
  calcPickCount(pickedLabels) {
    this.pickCount = this.items.reduce((count, item) => count + item.calcPickCount(pickedLabels), 0);
    return this.pickCount;
  }
  updatePickContext(pickContext) {
    super.updatePickContext(pickContext);
    this.items.forEach(i => i.updatePickContext(pickContext));
  }
  allowedLabel(pickContext, label) {
    if (!this.dependsOnFunc(pickContext)) { return false; }
    return this.items.some(i => i.allowedLabel(pickContext, label));
  }
  checkConstraint(pickContext) {
    if (!this.dependsOnFunc(pickContext)) { return true; }
    let violation = false;
    if (this.minCount && (this.pickCount < this.minCount)) { violation = true; }
    if (this.maxCount && (this.pickCount > this.maxCount)) { violation = true; }
    if (violation) {
      utils.errorMessage(`Constraint violation in group: ${this.label} selected: ${this.pickCount}${this.minCount ? ' min: '+this.minCount.toString() : ''}${this.maxCount ? ' max: '+this.maxCount.toString() : ''}`);
    }
    return !violation;
  }
}

async function pickStringRemember(args, processPick) {
  args = utils.dblQuest(args, {});
  args.key = utils.getProperty(args, 'key', 'pickString');
  if (checkEscapedUI(args)) { return undefined; }
  let multiPick = utils.getProperty(args, 'multiPick');
  let multiPickStorage = utils.getProperty(args, 'multiPickStorage') === 'global' ? extensionContext.globalState : extensionContext.workspaceState;
  let multiPickLabelSeparator = '@zyx@';
  let multiPickLabelKey = 'commandvariable:pickStringMultiPick@@' + args.key;
  let previousPicked = multiPickStorage.get(multiPickLabelKey, '').split(multiPickLabelSeparator);
  let optionGroups = utils.getProperty(args, 'optionGroups');
  if (!optionGroups) {
    optionGroups = [ {options: utils.getProperty(args, 'options', ['item1', 'item2'])} ];
  }
  let result = undefined;
  let pickContext = {};
  let groups = [];
  const quickPickSeparator = -1;
  while (true) {
    let qpItems = [];
    groups = [];
    for (const optionGroup of optionGroups) {
      let name = utils.getProperty(optionGroup, 'name');
      let groupLabel = utils.getProperty(optionGroup, 'label', name);
      let minCount = utils.getProperty(optionGroup, 'minCount');
      let maxCount = utils.getProperty(optionGroup, 'maxCount');
      let dependsOn = utils.getProperty(optionGroup, 'dependsOn');
      if (groupLabel !== undefined || minCount !== undefined || maxCount !== undefined) {
        let separatorLabel = groupLabel ? ` ${groupLabel} ` : '';
        separatorLabel = `—${separatorLabel}—`;
        if (minCount !== undefined) { separatorLabel += ` min: ${minCount}`; }
        if (maxCount !== undefined) { separatorLabel += ` max: ${maxCount}`; }
        qpItems.push({label: separatorLabel, kind:quickPickSeparator});
      } else {
        if (groups.length >= 1) {
          qpItems.push({label: '', kind:quickPickSeparator});
        }
      }
      name = name ? name : `group-${groups.length + 1}`;
      groupLabel = groupLabel ? groupLabel : name;
      let group = new PickStringGroup(name, groupLabel, minCount, maxCount, dependsOn);
      groups.push(group);
      for (const option of utils.getProperty(optionGroup, 'options', ['item1', 'item2'])) {
        let qpItem = undefined;
        if (utils.isString(option)) {
          qpItem = {value:option, label:option};
        }
        if (utils.isArray(option) && (option.length === 2)) {
          qpItem = {value:option[1], label:option[0], description:toString(option[1])};
        }
        if (utils.isObject(option)) {
          let value = utils.getProperty(option, "value");
          if (value === undefined) { continue; }
          let label = utils.getProperty(option, "label");
          if (label === undefined) { label = toString(value); }
          if (processPick) { label = await processPick(label, args); }
          let description = utils.getProperty(option, "description");
          if (description !== undefined && processPick) {
            description = await processPick(description, args);
          }
          let name = utils.getProperty(option, 'name');
          let dependsOn = utils.getProperty(option, 'dependsOn');
          qpItem = {value, label, description, name, dependsOn};
        }
        if (qpItem) {
          // @ts-ignore
          qpItem.picked = previousPicked.includes(qpItem.label);
          qpItems.push(qpItem);
          group.addItem(qpItem);
        }
      }
    }
    result = await vscode.window.showQuickPick(qpItems, {
      placeHolder: utils.getProperty(args, 'description', 'Choose:'),
      canPickMany: multiPick
    });
    if (result === undefined) {
      result = utils.getDefaultProperty(args);
      if (result && processPick) {
        result = await processPick(result, args);
      }
      return storeEscapedUI(result);
    }
    if (multiPick) {
      previousPicked = result.map(e => e.label);
      let definedNames = groups.flatMap(g => g.collectNames());
      let definedNamesRegex = new RegExp(`\\b(${definedNames.join('|')})\\b`, 'g');
      groups.forEach(g => g.constructDependsOnFunc(definedNamesRegex));
      groups.forEach(g => g.calcPickCount(previousPicked));
      pickContext = {};
      groups.forEach(g => g.updatePickContext(pickContext));
    }
    if (groups.every(g => g.checkConstraint(previousPicked))) {
      break;
    }
  }
  if (multiPick) {
    let prevStored = multiPickStorage.get(multiPickLabelKey, '');
    let newStored = previousPicked.join(multiPickLabelSeparator);
    if (newStored !== prevStored) {
      multiPickStorage.update(multiPickLabelKey, newStored);
    }
    result = { value: result.filter(e => groups.some(g => g.allowedLabel(pickContext, e.label))).map(e => e.value).join(utils.getProperty(args, 'separator', ' '))};
  }
  let rememberTransformed = utils.getProperty(args, 'rememberTransformed', false);
  // @ts-ignore
  result = result.value;
  if (utils.isObject(result) || !rememberTransformed) {
    result = storeStringRemember2(args, result);
  }
  if (result && processPick) {
    result = await processPick(result, args);
  }
  if (rememberTransformed) {
    storeStringRemember2(args, result);
  }
  return storeEscapedUI(result);
}
async function promptStringRemember(args) {
  args = utils.dblQuest(args, {});
  if (checkEscapedUI(args)) { return undefined; }
  let value = undefined;
  args.key = utils.getProperty(args, 'key');
  if (args.key === undefined) {
    args.key = 'promptString';
  } else {
    value = getRememberKey(args.key, '__undefined');
  }
  let result = await vscode.window.showInputBox({
      prompt: utils.getProperty(args, 'description', 'Enter:'),
      password: utils.getProperty(args, 'password', false),
      value: value !== undefined ? value : utils.getProperty(args, 'default')
  });
  result = storeStringRemember2(args, result, false);
  return storeEscapedUI(result);
}
function getExpressionFunction(expr, commandID) {
  try {
    return Function(`"use strict";return (function calcexpr(content, contentExt) {
      return ${expr};
    })`)();
  }
  catch (ex) {
    vscode.window.showErrorMessage(`${commandID}: Incomplete expression`);
  }
}
function getExpressionFunctionFilterSelection(expr) {
  try {
    return Function(`"use strict";return (function calcexpr(value, index, numSel) {
      return ${expr};
    })`)();
  }
  catch (ex) {
    vscode.window.showErrorMessage("extension.commandvariable.selectedText: Incomplete expression");
  }
}
function concatMapSelections(args, map_func) {
  args = args || {};
  let separator = utils.getProperty(args, 'separator', '\n');
  let selectionFilter = getExpressionFunctionFilterSelection(utils.getProperty(args, 'filterSelection', 'true'));
  return activeTextEditorVariable( editor => {
    let numSel = editor.selections.length;
    return editor.selections.sort((a, b) => { return a.start.compareTo(b.start); })
        .map( s => map_func(editor, s) )
        .filter ( (value, index) => selectionFilter(value, index, numSel))
        .join(separator);
  });
}function getEditorSelection(editor, selection) {
  var document = editor.document;
  var selectStart = document.offsetAt(selection.start);
  var selectEnd = document.offsetAt(selection.end);
  return document.getText().substring(selectStart, selectEnd);
}function notEnoughParentDirectories() {
  vscode.window.showErrorMessage('Not enough parent directories');
  return "Unknown";
}
function checkIfArgsIsLaunchConfig(args) {
  // when using a ${command} variable in the launch config strings, the complete launch config is passed as the first argument of the command
  // https://github.com/microsoft/vscode/issues/144648
  if (args === undefined || args.request) { return undefined; }
  return args;
}

function activate(context) {
  const getProperty = utils.getProperty;
  const range = utils.range;
  const dblQuest = utils.dblQuest;

  extensionContext = context;

  var basenameNUp = function (dirUriPath, n) {
    const rootParts = dirUriPath.split('/');
    if (n > rootParts.length-2) { return notEnoughParentDirectories(); }
    return rootParts[rootParts.length - (n+1)];
  };
  var workspaceFolderBasenameNUp = function (n, args) {
    args = checkIfArgsIsLaunchConfig(args);
    return activeWorkspaceFolderEditorOptional( workspaceFolder => {
      return basenameNUp(workspaceFolder.uri.path, n);
    }, undefined, args !== undefined ? args.name : undefined);
  };
  var fileDirBasenameNUp = function (n) {
    return activeTextEditorVariable( editor => {
      const path = editor.document.uri.path;
      const lastSep = path.lastIndexOf('/');
      if (lastSep === -1) { return "Unknown"; }
      return basenameNUp(path.substring(0, lastSep), n);
    });
  };
  context.subscriptions.push( ...range(6).map(
    i => vscode.commands.registerCommand(`extension.commandvariable.file.fileDirBasename${utils.nUp(i)}`,
        () => fileDirBasenameNUp(i) )) );
  context.subscriptions.push( ...range(6).map(
    i => vscode.commands.registerCommand(`extension.commandvariable.workspace.folderBasename${utils.nUp(i)}`,
        (args) => workspaceFolderBasenameNUp(i, args) )) );
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.commandvariable.selectedText', args => {
      args = checkIfArgsIsLaunchConfig(args);
      return concatMapSelections(args, getEditorSelection);
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.commandvariable.currentLineText', args => {
      args = checkIfArgsIsLaunchConfig(args);
      return concatMapSelections(args, (editor, selection) => {
        return editor.document.lineAt(selection.start).text;
      });
    })
  );
  var positionLineColumn = function (kind, lineChar) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) { vscode.window.showErrorMessage('No editor'); return '1'; }
    var position = (kind==='start') ? editor.selection.start : editor.selection.end;
    return (( lineChar==='line' ? position.line : position.character ) + 1 ).toString();
  };
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.commandvariable.selectionStartLineNumber', () => { return positionLineColumn('start', 'line'); })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.commandvariable.selectionStartColumnNumber', () => { return positionLineColumn('start', 'column'); })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.commandvariable.selectionEndLineNumber', () => { return positionLineColumn('end', 'line'); })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.commandvariable.selectionEndColumnNumber', () => { return positionLineColumn('end', 'column'); })
  );
  if (gWebExtension) {
    context.subscriptions.push(
      vscode.commands.registerCommand('extension.commandvariable.pickStringRemember', args => { return pickStringRemember(checkIfArgsIsLaunchConfig(args)); })
    );
    context.subscriptions.push(
      vscode.commands.registerCommand('extension.commandvariable.remember', args => rememberCommand(checkIfArgsIsLaunchConfig(args)) )
    );
  }
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.commandvariable.promptStringRemember', args => { return promptStringRemember(checkIfArgsIsLaunchConfig(args)); })
  );
  context.subscriptions.push(
    // TODO Deprecated 2021-10
    vscode.commands.registerCommand('extension.commandvariable.rememberPick', args => {
      showDeprecationMessage(gDeprecationRememberPickCommand);
      return rememberCommand(checkIfArgsIsLaunchConfig(args));
    })
  );
  let dateTimeFormat = (args) => {
    args = dblQuest(args, {});
    let locale = getProperty(args, 'locale', undefined);
    let options = getProperty(args, 'options', undefined);
    let template = getProperty(args, 'template', undefined);
    let parts = new Intl.DateTimeFormat(locale, options).formatToParts(new Date());
    if (!template) { return parts.map(({type, value}) => value).join(''); }
    let dateTimeFormatParts = {};
    parts.forEach(({type, value}) => { dateTimeFormatParts[type] = value; });
    return template.replace(/\${(\w+)}/g, (match, p1) => { return getProperty(dateTimeFormatParts, p1, ''); });
  };
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.commandvariable.dateTime', args => dateTimeFormat(checkIfArgsIsLaunchConfig(args)))
  );
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand('extension.commandvariable.dateTimeInEditor', function (editor, edit, args) {
      edit.replace(editor.selection, dateTimeFormat(checkIfArgsIsLaunchConfig(args)));
    })
  );
  let uuidv4 = undefined;
  let UUIDFormat = args => {
    args = dblQuest(args, {});
    if (getProperty(args, 'use', 'new') === 'new') { uuidv4 = UUID.genV4(); }
    if (!uuidv4) { return 'Unknown'; }
    switch (getProperty(args, 'output', 'hexString')) {
      case 'hexString': return uuidv4.hexString;
      case 'hexNoDelim': return uuidv4.hexNoDelim;
      case 'bitString': return uuidv4.bitString;
      case 'urn': return uuidv4.urn;
    }
    return 'Unknown';
  };
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.commandvariable.UUID', args => UUIDFormat(checkIfArgsIsLaunchConfig(args)))
  );
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand('extension.commandvariable.UUIDInEditor', function (editor, edit, args) {
      edit.replace(editor.selection, UUIDFormat(checkIfArgsIsLaunchConfig(args)));
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.commandvariable.setClipboard', args => vscode.env.clipboard.writeText(args.text).then(v=>v, v=>null) )
  );
  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.commandvariable.number', args => {
      args = checkIfArgsIsLaunchConfig(args);
      let name = getProperty(args, 'name', '__number');
      let [minimum, maximum] = getProperty(args, 'range', [0, 100]);
      let step = getProperty(args, 'step', 1);
      let random = getProperty(args, 'random', false);
      let uniqueCount = getProperty(args, 'uniqueCount', 0);
      let number = 0;
      let numberConfig = getProperty(numberStore, name);
      if (random) {
        if (uniqueCount > 0 && uniqueCount > (maximum - minimum - 5)) {
          vscode.window.showErrorMessage('uniqueCount is too close to rangeCount');
          return number;
        }
        if (numberConfig === undefined) { numberConfig = []; }
        let unique = true;
        do {
          unique = true;
          number = getRandomIntInclusive(minimum, maximum);
          if (uniqueCount > 0) {
            if (numberConfig.length > uniqueCount) {
              numberConfig = numberConfig.slice(-uniqueCount);
            }
            if (numberConfig.indexOf(number) >= 0) {
              unique = false;
            } else {
              const count = numberConfig.push(number);
              if (count > uniqueCount) {
                numberConfig = numberConfig.slice(-uniqueCount);
              }
            }
          } else {
            numberConfig = [number];
          }
        } while (!unique);
      } else {
        if (numberConfig === undefined) {
          number = step >= 0 ? minimum : maximum;
        } else {
          number = numberConfig[numberConfig.length-1] + step;
          if (step >= 0) {
            if (number > maximum) { number = minimum; }
          } else {
            if (number < minimum) { number = maximum; }
          }
        }
        numberConfig = [number];
      }
      numberStore[name] = numberConfig;
      return number.toString();
    })
  );
}
function deactivate() {}

module.exports = {
  activate,
  deactivate,
  showDeprecationMessage,
  gDeprecationRememberPickVariable,
  gDeprecationRememberPickCommand,
  storeStringRemember,
  storeStringRemember2,
  getRememberStore,
  rememberCommand,
  getRememberKey,
  checkEscapedUI,
  storeEscapedUI,
  gRememberPropertyCheckEscapedUI,
  getExpressionFunction,
  getNamedWorkspaceFolder,
  activeTextEditorVariable,
  activeWorkspaceFolder,
  activeWorkspaceFolderEditorOptional,
  pickStringRemember,
  promptStringRemember,
  concatMapSelections,
  getEditorSelection,
  notEnoughParentDirectories,
  checkIfArgsIsLaunchConfig,
  setAsDesktopExtension
};

