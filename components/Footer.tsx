export const Footer: React.FC = () => {
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-auto">
      <aside className="flex gap-6">
        <p>
          Created by{' '}
          <a
            href="https://eetueskelinen.com"
            className="hover:link-accent hover:underline hover:decoration-wavy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Eetu Eskelinen
          </a>
        </p>
        <p>Created with 🎶 by Eetu Eskelinen</p>
        {/* <p>&copy; {new Date().getFullYear()} - All rights reserved </p> */}
      </aside>
    </footer>
  );
};
