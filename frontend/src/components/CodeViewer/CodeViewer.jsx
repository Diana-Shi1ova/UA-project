import { useState, useEffect} from 'react';
import hljs from 'highlight.js';
import DOMPurify from 'dompurify';
// import 'highlight.js/styles/stackoverflow-dark.css';
// import 'highlight.js/styles/atom-one-dark.css';
import 'highlight.js/styles/github-dark.css';
import './CodeViewer.css';

const CodeViewerFromUrl = ({ fileUrl }) => {
    const [highlightedHtml, setHighlightedHtml] = useState('');

    useEffect(() => {
        if (!fileUrl) return;

        const fetchCode = async () => {
        try {
            const response = await fetch(fileUrl);
            if (!response.ok) {
                console.error('Error al cargar fichero:', response.statusText);
                setHighlightedHtml(`<span style="color: red;">Error al cargar fichero</span>`);
                return;
            }
            const text = await response.text();

            const language = getLanguageFromUrl(fileUrl);
            const result = hljs.highlight(text, { language });
            // const result = hljs.highlightAuto(text);
            const safeHtml = DOMPurify.sanitize(result.value);
            setHighlightedHtml(safeHtml);
        } catch (e) {
            console.error('Error:', e);
            setHighlightedHtml(`<span style="color: red;">Error al cargar fichero</span>`);
        }
        };

        fetchCode();
    }, [fileUrl]);


    const getLanguageFromUrl = (url) => {
        try {
            const pathname = new URL(url).pathname;
            const lastSegment = pathname.split('/').pop();
            const ext = lastSegment.split('.').pop().toLowerCase();

            const map = {
                js: 'javascript',
                jsx: 'javascript',
                ts: 'typescript',
                tsx: 'typescript',
                py: 'python',
                html: 'xml',
                css: 'css',
                json: 'json',
                sh: 'bash',
                md: 'markdown',
                txt: 'plaintext',
            };

            return map[ext] || 'plaintext';
        } catch (e) {
            return 'plaintext';
        }
    };


  return (
    <pre className='code-pre'>
      <code
        className="hljs"
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
    </pre>
  );
};

export default CodeViewerFromUrl;
