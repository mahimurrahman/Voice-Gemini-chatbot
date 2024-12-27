import React from 'react';

const Message = ({ message }) => {
    const { sender, text } = message;
    
    const getMessageClass = () => {
        switch (sender) {
            case 'user':
                return 'message user';
            case 'assistant':
                return 'message assistant';
            case 'system':
                return 'message system';
            default:
                return 'message';
        }
    };

    const formatText = (text) => {
        if (!text) return '';
        
        // Handle code blocks
        text = text.replace(/```([\s\S]*?)```/g, (match, code) => {
            return `<pre><code>${code.trim()}</code></pre>`;
        });

        // Handle inline code
        text = text.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Handle links
        text = text.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
        );

        // Handle line breaks
        text = text.replace(/\n/g, '<br>');

        return text;
    };

    return (
        <div className={getMessageClass()}>
            <div 
                className="message-content"
                dangerouslySetInnerHTML={{ __html: formatText(text) }}
            />
        </div>
    );
};

export default Message;
