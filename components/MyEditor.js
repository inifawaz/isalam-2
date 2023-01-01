import React, { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getCookie } from "cookies-next";

const API_URL = "https://api.isalamwakaf.com/api";
const UPLOAD_ENDPOINT = "assets/img/projects/content";

export default function MyEditor({
    label,
    onChange,
    data,

    // ...props
}) {
    const [value, setValue] = useState("lksdjflsdkjf");
    let [loaded, setLoaded] = useState(false);
    // const editorRef = useRef();
    // const { CKEditor, ClassicEditor } = editorRef.current || {};
    // useEffect(() => {
    //     editorRef.current = {
    //         CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
    //         ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    //     };
    //     setLoaded(true);
    // }, []);
    useEffect(() => {
        setLoaded(true);
    }, []); // run on mounting

    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData();
                    loader.file.then((file) => {
                        body.append("files", file);
                        // let headers = new Headers();
                        // headers.append("Origin", "http://localhost:3000");
                        fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
                            method: "post",
                            body: body,
                            // mode: "no-cors"
                            headers: {
                                Authorization: `Bearer ${getCookie("token")}`,
                            },
                        })
                            .then((res) => res.json())
                            .then((res) => {
                                resolve({
                                    default: res.filename,
                                });
                            })
                            .catch((err) => {
                                reject(err);
                            });
                    });
                });
            },
        };
    }
    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
        };
    }

    const inputHandler = (event, editor) => {
        onChange(editor.getData());
    };
    return (
        <div className='  mb-4 w-full max-w-6xl prose'>
            <label className='text-gray-500 tracking-wider mb-1'>{label}</label>
            {/* {editorLoaded && ( */}
            <CKEditor
                config={{
                    extraPlugins: [uploadPlugin],
                }}
                // data={value}
                editor={ClassicEditor}
                onReady={(editor) => {
                    // editor.ui.view.editable.element.style.minHeight = "500px";
                    // editor.ui.view.editable.element.style.maxWidth = "100%";
                }}
                onBlur={(event, editor) => { }}
                onFocus={(event, editor) => { }}
                onChange={inputHandler}
                data={data}
            // {...props}
            />
            {/* )} */}
        </div>
    );
    // } else {
    //     return <h2>Editor Loading</h2>;
    // }

    // if (loaded) {
    //     return (
    //         <CKEditor
    //             editor={ClassicEditor}
    //             data='<p>Hello from CKEditor 5!</p>'
    //             onReady={(editor) => {
    //                 // You can store the "editor" and use when it is needed.
    //                 console.log("Editor is ready to use!", editor);
    //             }}
    //             onChange={(event, editor) => {
    //                 // do something when editor's content changed
    //                 // const data = editor.getData();
    //                 // console.log({ event, editor, data });
    //             }}
    //             onBlur={(event, editor) => {
    //                 console.log("Blur.", editor);
    //             }}
    //             onFocus={(event, editor) => {
    //                 console.log("Focus.", editor);
    //             }}
    //         />
    //     );
    // } else {
    //     return <h2> Editor is loading </h2>;
    // }
}
