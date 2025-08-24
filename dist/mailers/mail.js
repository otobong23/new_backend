"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
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
        position: 'relative',
    },
    headerSection: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '50px 40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    headerPattern: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    },
    logoContainer: {
        position: 'relative',
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
        position: 'relative',
        zIndex: 1,
        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
    },
    content: {
        padding: '50px 40px',
        textAlign: 'center',
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
        position: 'relative',
        overflow: 'hidden',
    },
    descriptionPattern: {
        position: 'absolute',
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
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
    },
    codeSectionPattern: {
        position: 'absolute',
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
        position: 'relative',
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
        position: 'relative',
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
        position: 'relative',
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
        position: 'relative',
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
        textAlign: 'center',
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
const EmailTemplate = ({ firstName, code }) => {
    return (React.createElement("div", { style: styles.body },
        React.createElement("div", { style: styles.container },
            React.createElement("div", { style: styles.headerSection },
                React.createElement("div", { style: styles.headerPattern }),
                React.createElement("div", { style: styles.logoContainer },
                    React.createElement("img", { src: 'https://res.cloudinary.com/dxet6crme/image/upload/v1748654965/Frame-2_egfoww.svg', alt: "New_App Logo", style: styles.logoImage })),
                React.createElement("div", { style: styles.welcomeIcon }, "\uD83C\uDF89")),
            React.createElement("div", { style: styles.content },
                React.createElement("h1", { style: styles.greeting },
                    "Hi, ",
                    firstName,
                    "!"),
                React.createElement("div", { style: styles.welcomeSection },
                    React.createElement("a", { href: "https://newapp.com/", style: styles.welcomeLink }, "Welcome to New_App \u2728")),
                React.createElement("div", { style: styles.description },
                    React.createElement("div", { style: styles.descriptionPattern }),
                    React.createElement("p", { style: { margin: 0, position: 'relative', zIndex: 1 } }, "New_App is a revolutionary trading platform where you can join our global peer-to-peer exchange community. Using cutting-edge business methods and personalized client approaches, we offer a unique investment model for Bitcoin and cryptocurrency traders worldwide.")),
                React.createElement("div", { style: styles.codeSection },
                    React.createElement("div", { style: styles.codeSectionPattern }),
                    React.createElement("div", { style: styles.codeLabel }, "\uD83D\uDD10 Your Verification Code"),
                    React.createElement("div", { style: styles.codeValue }, code || "000000")),
                React.createElement("div", { style: styles.expiryNotice },
                    React.createElement("p", { style: styles.expiryText }, "\u23F0 This code expires in 10 minutes")),
                React.createElement("div", { style: styles.securityTip },
                    React.createElement("p", { style: styles.securityTipText }, "\uD83D\uDEE1\uFE0F Keep this code secure and never share it with anyone"))),
            React.createElement("div", { style: styles.footer },
                React.createElement("p", { style: styles.footerText },
                    React.createElement("span", { style: styles.companyName }, "New_App Trading Platform")),
                React.createElement("p", { style: styles.footerText }, "Secure \u2022 Fast \u2022 Reliable Cryptocurrency Exchange"),
                React.createElement("p", { style: styles.footerText }, "This is an automated message \u2022 Please do not reply to this email")))));
};
exports.default = EmailTemplate;
