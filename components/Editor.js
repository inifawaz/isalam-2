export default function Editor() {
    const Editor = dynamic(() => import("./MyEditor"), { ssr: false });
    return (
        <div className='shadow '>
            <Editor />
        </div>
    );
}
