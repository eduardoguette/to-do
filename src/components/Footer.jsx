import { Link } from 'react-router-dom';
import logoImg from '../../img/logo.png';
export const Footer = () => {
  return (
    <footer className='bg-midnight text-white py-10 px-5 md:px-20 mt-10 '>
      <div className='content wrapper-1000 px-4 mx-auto flex md:flex-row flex-col md:justify-between'>
        <div>
          <Link to='/'>
            <img src={logoImg} alt='Logo to-do' width={100}/>
          </Link>
          <p className='opacity-90 text-xs w-72 my-2'>I'll help you organize your day and increase your productivity.</p>
          <ul className='mt-2 flex gap-3 items-center'>
            <li className='opacity-50 hover:opacity-100'>
              <a href='https://es.linkedin.com/in/eduardo-guette' target='_blank' rel='noopener noreferrer'>
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
                  <circle cx='4.983' cy='5.009' r='2.188'></circle>
                  <path d='M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z'></path>
                </svg>
              </a>
            </li>

            <li className='opacity-50 hover:opacity-100'>
              <a href='https://twitter.com/eduardoguette?lang=es' target='_blank' rel='noopener noreferrer'>
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z'></path>
                </svg>
              </a>
            </li>
            <li className='opacity-50 hover:opacity-100'>
              <a href='http://https://www.instagram.com/eduardoguette/?hl=es' target='_blank' rel='noopener noreferrer'>
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z'></path>
                  <circle cx='16.806' cy='7.207' r='1.078'></circle>
                  <path d='M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z'></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <div className='flex flex-col md:flex-row gap-6 md:gap-48 mt-10 md:m-0'>
          <div>
            <h4 className='font-bold'>Other Apps</h4>
            <ul>
              <li>
                <a className='text-white text-sm opacity-40 hover:opacity-100' href='https://start-home.netlify.app/' target='_blank' rel='noopener noreferrer'>
                  Start Home
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-bold'>About the author</h4>
            <p className='text-xs opacity-50 hover:opacity-100 py-1'>
              <a href='https://linkedin.com/in/eduardo-guette' target='_blank' rel='noopener noreferrer'>
                @eduardoguette
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
