import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  code?: string;
}

const styles = {
  body: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    backgroundColor: '#0f0f23',
    margin: 0,
    padding: '40px 20px',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f23 0%, #1a1b3e 50%, #2d1b69 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    maxWidth: '600px',
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    position: 'relative' as 'relative',
  },
  headerSection: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '50px 40px',
    textAlign: 'center' as 'center',
    position: 'relative' as 'relative',
    overflow: 'hidden',
  },
  headerPattern: {
    position: 'absolute' as 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  },
  logoContainer: {
    position: 'relative' as 'relative',
    zIndex: 1,
    marginBottom: '20px',
  },
  logoImage: {
    width: '120px',
    height: 'auto',
    filter: 'brightness(0) invert(1)',
    dropShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  welcomeIcon: {
    fontSize: '4rem',
    marginBottom: '20px',
    position: 'relative' as 'relative',
    zIndex: 1,
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
  },
  content: {
    padding: '50px 40px',
    textAlign: 'center' as 'center',
    background: '#ffffff',
  },
  greeting: {
    fontSize: '2.2rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '20px',
    lineHeight: '1.2',
  },
  welcomeSection: {
    marginBottom: '40px',
  },
  welcomeLink: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    padding: '12px 24px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '1.1rem',
    display: 'inline-block',
    marginBottom: '25px',
    boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
    transition: 'all 0.2s ease',
  },
  description: {
    fontSize: '1.1rem',
    color: '#4b5563',
    lineHeight: '1.7',
    marginBottom: '40px',
    padding: '25px',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    borderRadius: '16px',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    position: 'relative' as 'relative',
    overflow: 'hidden',
  },
  descriptionPattern: {
    position: 'absolute' as 'absolute',
    top: 0,
    right: 0,
    width: '100px',
    height: '100px',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23667eea' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
  },
  codeSection: {
    background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
    borderRadius: '20px',
    padding: '40px',
    marginBottom: '30px',
    position: 'relative' as 'relative',
    overflow: 'hidden',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
  },
  codeSectionPattern: {
    position: 'absolute' as 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M25 25c0-7-5.5-12.5-12.5-12.5S0 18 0 25s5.5 12.5 12.5 12.5S25 32 25 25zm25 0c0-7-5.5-12.5-12.5-12.5S25 18 25 25s5.5 12.5 12.5 12.5S50 32 50 25z'/%3E%3C/g%3E%3C/svg%3E")`,
  },
  codeLabel: {
    fontSize: '1.2rem',
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
    marginBottom: '20px',
    position: 'relative' as 'relative',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  codeValue: {
    fontSize: '2.5rem',
    fontWeight: '900',
    color: '#ffffff',
    fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace',
    letterSpacing: '8px',
    marginBottom: '20px',
    position: 'relative' as 'relative',
    zIndex: 1,
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  expiryNotice: {
    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    borderRadius: '12px',
    padding: '16px 24px',
    marginBottom: '30px',
    boxShadow: '0 8px 20px rgba(251, 191, 36, 0.2)',
    position: 'relative' as 'relative',
    overflow: 'hidden',
  },
  expiryText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '1.1rem',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    position: 'relative' as 'relative',
    zIndex: 1,
  },
  securityTip: {
    background: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    borderRadius: '16px',
    padding: '20px',
    marginTop: '30px',
  },
  securityTipText: {
    fontSize: '0.95rem',
    color: '#1e40af',
    margin: 0,
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  footer: {
    background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
    padding: '40px 30px',
    textAlign: 'center' as 'center',
    fontSize: '0.9rem',
    color: '#6b7280',
    borderTop: '1px solid rgba(229, 231, 235, 0.8)',
  },
  footerText: {
    margin: '8px 0',
    lineHeight: '1.6',
  },
  companyName: {
    fontWeight: '800',
    color: '#374151',
    fontSize: '1.1rem',
  },
};

const EmailTemplate: React.FC<EmailTemplateProps> = ({ firstName, code }) => {
  return (
    <div style={styles.body}>
      <div style={styles.container}>
        {/* Header Section */}
        <div style={styles.headerSection}>
          <div style={styles.headerPattern}></div>
          <div style={styles.logoContainer}>
            <img 
              src='https://res.cloudinary.com/dxet6crme/image/upload/v1748654965/Frame-2_egfoww.svg' 
              alt="New_App Logo" 
              style={styles.logoImage} 
            />
          </div>
          <div style={styles.welcomeIcon}>🎉</div>
        </div>

        {/* Content */}
        <div style={styles.content}>
          <h1 style={styles.greeting}>Hi, {firstName}!</h1>
          
          <div style={styles.welcomeSection}>
            <a href="https://newapp.com/" style={styles.welcomeLink}>
              Welcome to New_App ✨
            </a>
          </div>

          <div style={styles.description}>
            <div style={styles.descriptionPattern}></div>
            <p style={{margin: 0, position: 'relative', zIndex: 1}}>
              New_App is a revolutionary trading platform where you can join our global peer-to-peer exchange community. 
              Using cutting-edge business methods and personalized client approaches, we offer a unique investment model 
              for Bitcoin and cryptocurrency traders worldwide.
            </p>
          </div>

          {/* Code Section */}
          <div style={styles.codeSection}>
            <div style={styles.codeSectionPattern}></div>
            <div style={styles.codeLabel}>
              🔐 Your Verification Code
            </div>
            <div style={styles.codeValue}>
              {code || "000000"}
            </div>
          </div>

          {/* Expiry Notice */}
          <div style={styles.expiryNotice}>
            <p style={styles.expiryText}>
              ⏰ This code expires in 10 minutes
            </p>
          </div>

          {/* Security Tip */}
          <div style={styles.securityTip}>
            <p style={styles.securityTipText}>
              🛡️ Keep this code secure and never share it with anyone
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            <span style={styles.companyName}>New_App Trading Platform</span>
          </p>
          <p style={styles.footerText}>
            Secure • Fast • Reliable Cryptocurrency Exchange
          </p>
          <p style={styles.footerText}>
            This is an automated message • Please do not reply to this email
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplate;