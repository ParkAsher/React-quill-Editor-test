import React, { useState, useRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import axios from 'axios';

function App() {


    const [content, setContent] = useState("");

    const [image, setImage] = useState("");

    const quillRef = useRef();

    const imageHandler = () => {

        const input = document.createElement("input");

        input.setAttribute("type", 'file');
        input.setAttribute("accept", "image/*");
        input.click();

        input.addEventListener('change', async () => {

            console.log('체인지');

            const file = input.files[0];

            var formData = new FormData();
            formData.append("file", file);

            console.log(file);


            axios.post("/api/image", formData).then((res) => {

                const editor = quillRef.current.getEditor();
                const range = editor.getSelection();
                editor.insertEmbed(range.index, 'image', res.data.filePath);
                console.log(range);

            }).catch((err) => {
                console.log(err)
            })
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        let body = {
            content: content,
        }

        axios.post("/api/post/submit", body).then((res) => {
            if (res.data.success) {
                alert("작성완료")
            } else {
                alert("작성 실패")
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [false, 1, 2, 3, 4, 5] }],
                ['bold', 'italic', 'underline', 'blockquote', 'code-block'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['image'],
            ],
            handlers: {
                image: imageHandler,
            }
        },

    }), [])

    return (
        <div>
            <form>
                <ReactQuill ref={quillRef} modules={modules} theme="snow" value={content} onChange={setContent}></ReactQuill>
                <button onClick={(e) => onSubmit(e)}>제출</button>
            </form>
        </div>
    );
}

export default App;
