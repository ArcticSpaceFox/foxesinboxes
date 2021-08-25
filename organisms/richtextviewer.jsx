import SyntaxHighlighter from "react-syntax-highlighter";

import { RichText } from "@graphcms/rich-text-react-renderer";

import {atomOneDark, atomOneLight} from 'react-syntax-highlighter/dist/cjs/styles/hljs';

import ld from "lang-detector";

import { useTheme } from "next-themes";

const RichTextViewer = ({ content}) => {
  if (!content) return <p className="text-red-400">Error: no content specified</p>
  const {resolvedTheme} = useTheme();

  return (
    <div className="mt-2 mx-auto text-justify break-words prose prose-sm md:prose-lg xl:prose-xl max-w-none dark:text-gray-200">
        <RichText content={content} renderers={{
          code_block: ({children}) => {
            const text = children.props.content[0].text
            const lang = ld(text)

            console.log("Detected lang :",lang)

            return <div>
              <SyntaxHighlighter
                style={resolvedTheme === "light" ? atomOneLight : atomOneDark}
                showLineNumbers={true}
                language={lang}
              >
                {text}
              </SyntaxHighlighter>
            </div>}
        }}/>
    </div>
  )
}

export default RichTextViewer
