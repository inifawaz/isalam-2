import React from 'react'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from '@/lib/axios';

const Editor = ({ onChange, data }) => {
    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData();
                    loader.file.then(async (file) => {
                        body.append("content_image", file);
                        await axios.post('/api/content-images', body).then(res => {
                            resolve({
                                default: res.data.url
                            })
                        }).catch((err) => {
                            reject(err)
                        })
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
        <div className='prose  prose-slate'>
            <CKEditor
                config={{
                    extraPlugins: [uploadPlugin],
                }}
                editor={ClassicEditor}
                onReady={(editor) => {
                }}
                onBlur={(event, editor) => { }}
                onFocus={(event, editor) => { }}
                onChange={inputHandler}
                data={data}
            />
        </div>
    )
}

export default Editor
