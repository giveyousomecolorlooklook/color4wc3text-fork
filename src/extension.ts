// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { HexDocumentColorProvider, ColorDocumentColorProvider, Color3DocumentColorProvider, CssDocumentColorProvider, RGBADocumentColorProvider, RGBDocumentColorProvider } from './main/color-provider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

let hexProvider = new HexDocumentColorProvider;
let colorProvider = new ColorDocumentColorProvider;
let color3Provider = new Color3DocumentColorProvider;
let cssProvider = new CssDocumentColorProvider;
let rgbaProvider = new RGBADocumentColorProvider;
let rgbProvider = new RGBDocumentColorProvider;

const hexSupportLanguages = ["jass","lua","ini","vjass","zinc","fdf","json",'js',"javascript","typescript"];
const colorSupportLanguages = ["jass","lua","vjass","zinc",'js',"javascript","typescript"];
const cssSupportLanguages = ["css","html","xml","json",'js',"javascript","typescript","lua","ini"];
const rgbaSupportLanguages = ["css","html",'js',"javascript","typescript"];




hexSupportLanguages.forEach(language => {
  vscode.languages.registerColorProvider(language, hexProvider);
});

colorSupportLanguages.forEach(language => {
  vscode.languages.registerColorProvider(language, colorProvider);
  vscode.languages.registerColorProvider(language, color3Provider);
});

cssSupportLanguages.forEach(language => {
  vscode.languages.registerColorProvider(language, cssProvider);
});

rgbaSupportLanguages.forEach(language => {
  vscode.languages.registerColorProvider(language, rgbaProvider);
  vscode.languages.registerColorProvider(language, rgbProvider);
});


  // 添加可见范围变化的事件监听器
  context.subscriptions.push(
    vscode.window.onDidChangeTextEditorVisibleRanges(() => {
      hexProvider.triggerUpdate();
    })
  );

  // 添加活动编辑器变化的事件监听器
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(() => {
      hexProvider.triggerUpdate();
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
