import React, { useCallback, useState, useRef } from "react";
import Navbar from "./components/Navbar";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import Result from "./components/Result";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const html_editor_ext = [html(true)];
const css_editor_ext = [css(true)];
const js_editor_ext = [javascript(true)];

function App() {
  //* create three usestate
  const [html_edit, setHtml_Edit] = useState("");
  const [css_edit, setCss_Edit] = useState("");
  const [js_edit, setJs_Edit] = useState("");
  const [mode, setMode] = useState("dark");
  const [isDarkModeWritten, setIsDarkMode] = useState(false);

  const changeMode = () => {
    setMode(mode === "dark" ? "light" : "dark");

    setIsDarkMode(!isDarkModeWritten);
  };

  //* Html onchange handler
  const onChangeHtml = useCallback((value) => {
    setHtml_Edit(value);
  }, []);

  //* Css onchange handler
  const onChangeCss = useCallback((value) => {
    setCss_Edit(value);
  }, []);

  //* JavaScript onchange handler
  const onChangeJavaScript = useCallback((value) => {
    setJs_Edit(value);
  }, []);

  const htmlEditorRef = useRef();
  const cssEditorRef = useRef();
  const jsEditorRef = useRef();

  const handleDownload = useCallback((code, fileName, mimeType) => {
    toast(`${fileName} is downloading`);

    setTimeout(() => {
      const blob = new Blob([code], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 5000);
  }, []);

  const handleClearScreen = useCallback(() => {
    setHtml_Edit("");
    setCss_Edit("");
    setJs_Edit("");
  }, []);

  //* Create Html Document
  const srcCode = `
  <html>
  <body>${html_edit}</body>
  <style>${css_edit}</style>
  <script>${js_edit}</script>
  </html>`;

  return (
    <div>
      {/* Navbar  */}
      <Navbar
        handleClearScreen={handleClearScreen}
        changeMode={changeMode}
        isDarkModeWritten={isDarkModeWritten}
      />

      {/* main content  */}
      <div className=" p-2 w-[100%]">
        {/* Editor  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ">
          {/* Html Editor */}
          <div className="bg-[#282c34] p-4 rounded-lg shadow">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold mb-2 text-white">HTML</h2>
              <button
                className="bg-blue-500 text-white font-semibold mr-5 pl-4 pr-4 rounded-lg hover:bg-white hover:text-black hover:border-[3px] "
                onClick={() =>
                  handleDownload(
                    htmlEditorRef.current,
                    "code.html",
                    "text/html"
                  )
                }
              >
                Save
              </button>
            </div>
            <CodeMirror
              className="text-xl border-gray-700 border"
              value={html_edit}
              height="342px"
              theme={mode}
              onChange={onChangeHtml}
              extensions={html_editor_ext}
              ref={htmlEditorRef}
              onBeforeChange={(editor, data, value) => {
                htmlEditorRef.current = value;
              }}
            />
          </div>

          {/* Css Editor  */}
          <div className="bg-[#282c34] p-4 rounded-lg shadow">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold mb-2 text-white">CSS</h2>
              <button
                className="bg-blue-500 text-white font-semibold mr-5 pl-4 pr-4 rounded-lg hover:bg-white hover:text-black hover:border-[3px] "
                onClick={() =>
                  handleDownload(cssEditorRef.current, "styles.css", "css")
                }
              >
                Save
              </button>
            </div>
            <CodeMirror
              className="text-xl border-gray-700 border"
              value={css_edit}
              height="342px"
              theme={mode}
              extensions={css_editor_ext}
              onChange={onChangeCss}
              ref={cssEditorRef}
              onBeforeChange={(editor, data, value) => {
                cssEditorRef.current = value;
              }}
            />
          </div>

          {/* JavaScript Editor  */}
          <div className="bg-[#282c34] p-4 rounded-lg shadow">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold mb-2 text-white">
                JavaScript
              </h2>
              <button
                className="bg-blue-500 text-black font-semibold mr-5 pl-4 pr-4 rounded-lg hover:bg-white hover:text-black hover:border-[3px] "
                onClick={() =>
                  handleDownload(
                    jsEditorRef.current,
                    "script.js",
                    "application/javascript"
                  )
                }
              >
                Save
              </button>
            </div>
            <CodeMirror
              className="text-xl border-gray-700 border"
              value={js_edit}
              height="342px"
              theme={mode}
              extensions={js_editor_ext}
              onChange={onChangeJavaScript}
              ref={jsEditorRef}
              onBeforeChange={(editor, data, value) => {
                jsEditorRef.current = value;
              }}
            />
          </div>
        </div>

        <Result srcCode={srcCode} mode={mode} />
      </div>
    </div>
  );
}

export default App;
