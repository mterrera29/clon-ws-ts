import { useState, useRef } from 'react';
import { Message } from '../../types';

type MessageInputProps = {
  handleNewMessage: (message: Message) => void;
};

export default function MessageInput({ handleNewMessage }: MessageInputProps) {
  const inputRef = useRef(null);
  const [text, setText] = useState<string>('');

  const date = Date.now();

  const handleSubmit = () => {
    if (text.length === 0) return;
    const user = 'You';
    const content = text;
    const msg: Message = {
      date: new Date(date),
      user: user,
      content: content,
    };

    handleNewMessage(msg);
    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <section
      style={{
        width: '97%',
        height: 35,
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        margin: 5,
        position: 'absolute',
        bottom: 1,
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          height: 35,
          width: '90%',
          display: 'flex',
          flexDirection: 'row',
          alignSelf: 'flex-start',
          borderRadius: 30,
          marginRight: 5,
          boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div
          style={{
            height: '35px',
            width: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#878c8f',
            fontSize: '18px',
          }}
        >
          <i className='bi bi-emoji-laughing'></i>
        </div>
        <input
          type='text'
          placeholder='Write a mesagge'
          ref={inputRef}
          style={{
            alignSelf: 'center',
            height: 30,
            width: '60%',
            borderTopWidth: 0,
            textAlign: 'left',
            borderWidth: 0,
            outlineStyle: 'none',
            backgroundColor: '#ffffff',
            color: 'black',
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onSubmit={handleSubmit}
          maxLength={250}
        ></input>
        <div
          style={{
            height: '35px',
            width: '25px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#878c8f',
            fontSize: '18px',
          }}
        >
          <i className='bi bi-paperclip'></i>
        </div>
        <div
          style={{
            height: '35px',
            width: '25px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#878c8f',
            fontSize: '18px',
          }}
        >
          <i className='bi bi-camera'></i>
        </div>
      </div>
      <div
        onClick={handleSubmit}
        style={{
          backgroundColor: '#075e55',
          height: 35,
          width: 35,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'flex-end',
          borderRadius: '100%',
          color: '#ffffff',
          boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div
          style={{
            fontSize: 15,
            color: '#ffffff',
            alignSelf: 'center',
          }}
        >
          {text ? (
            <div
              style={{
                transform: 'rotate(45deg)',
                display: 'inline-block',
                paddingRight: '5px',
                paddingTop: '3px',
              }}
            >
              <i className='bi bi-send'></i>
            </div>
          ) : (
            <i className='bi bi-mic-fill'></i>
          )}
        </div>
      </div>
    </section>
  );
}
