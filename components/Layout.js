import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div style={styles.container}>
      <Navbar />
      <main style={styles.main}>
        {children}
      </main>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: '2rem 1rem',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  },
};

export default Layout; 