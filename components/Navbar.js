import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();

  // Helper function to check if a link is active
  const isActive = (path) => {
    return router.pathname === path;
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link href="/" style={styles.brand}>
          Aitrator
        </Link>
        
        <div style={styles.links}>
          <Link 
            href="/" 
            style={{
              ...styles.link,
              ...(isActive('/') && styles.activeLink)
            }}
          >
            Home
          </Link>
          
          <Link 
            href="/library" 
            style={{
              ...styles.link,
              ...(isActive('/library') && styles.activeLink)
            }}
          >
            Library
          </Link>
          
          <Link 
            href="/generate" 
            style={{
              ...styles.link,
              ...(isActive('/generate') && styles.activeLink)
            }}
          >
            Generate
          </Link>
          
          <Link 
            href="/cart" 
            style={{
              ...styles.link,
              ...(isActive('/cart') && styles.activeLink)
            }}
          >
            Cart
          </Link>
          
          <Link 
            href="/login" 
            style={{
              ...styles.link,
              ...(isActive('/login') && styles.activeLink)
            }}
          >
            Login
          </Link>
          
          <Link 
            href="/register" 
            style={{
              ...styles.link,
              ...(isActive('/register') && styles.activeLink)
            }}
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

// Minimal styling
const styles = {
  nav: {
    backgroundColor: '#f8f9fa',
    padding: '1rem 0',
    borderBottom: '1px solid #dee2e6',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    textDecoration: 'none',
  },
  links: {
    display: 'flex',
    gap: '1rem',
  },
  link: {
    color: '#666',
    textDecoration: 'none',
    padding: '0.5rem',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
  },
  activeLink: {
    color: '#007bff',
    backgroundColor: 'rgba(0, 123, 255, 0.1)',
  },
};

export default Navbar; 