import './Header.css';

type HeaderProps = {};

export default function Header() {
  return (
    <header className='headerContainer'>
      <section className='headerItemsLeft'>
        <div>
          <div className='userName'>GodsApp </div>
        </div>
      </section>
      <section className='headerItemsRight'>
        <div className='backIcon'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-search'
            viewBox='0 0 16 16'
          >
            <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0' />
          </svg>
        </div>
        <div className='headerIconsDots'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            fill='currentColor'
            className='bi bi-three-dots-vertical'
            viewBox='0 0 16 16'
          >
            <path d='M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0' />
          </svg>
        </div>
      </section>
    </header>
  );
}
