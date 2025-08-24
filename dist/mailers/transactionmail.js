"use strict";
// import * as React from 'react';
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
// interface EmailTemplateProps {
//   email: string;
//   transactionId: string;
//   amount?: number | string;
//   type: string;
//   coin?: string;
//   timestamp?: string;
// }
// const styles = {
//   body: {
//     fontFamily: 'Arial, sans-serif',
//     backgroundColor: '#f5f5f5',
//     margin: 0,
//     padding: '20px',
//     minHeight: '100vh',
//   },
//   container: {
//     maxWidth: '600px',
//     margin: '0 auto',
//     backgroundColor: '#ffffff',
//     borderRadius: '8px',
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//     overflow: 'hidden',
//   },
//   header: {
//     backgroundColor: '#1a365d',
//     color: '#ffffff',
//     padding: '20px',
//     textAlign: 'center' as 'center',
//   },
//   logo: {
//     fontSize: '1.8rem',
//     fontWeight: 'bold',
//     marginBottom: '5px',
//   },
//   tagline: {
//     fontSize: '0.9rem',
//     opacity: 0.9,
//   },
//   content: {
//     padding: '30px',
//   },
//   alertBanner: {
//     backgroundColor: '#fef3c7',
//     border: '1px solid #f59e0b',
//     borderRadius: '6px',
//     padding: '15px',
//     marginBottom: '25px',
//     display: 'flex',
//     alignItems: 'center',
//   },
//   alertIcon: {
//     marginRight: '10px',
//     fontSize: '1.2rem',
//   },
//   alertText: {
//     color: '#92400e',
//     fontWeight: '600',
//     margin: 0,
//   },
//   greeting: {
//     fontSize: '1.1rem',
//     color: '#2d3748',
//     marginBottom: '20px',
//   },
//   transactionCard: {
//     backgroundColor: '#f8fafc',
//     border: '2px solid #e2e8f0',
//     borderRadius: '8px',
//     padding: '20px',
//     marginBottom: '20px',
//   },
//   transactionTitle: {
//     fontSize: '1.3rem',
//     fontWeight: 'bold',
//     color: '#1a202c',
//     marginBottom: '15px',
//     textAlign: 'center' as 'center',
//   },
//   transactionDetails: {
//     display: 'grid',
//     gap: '12px',
//   },
//   detailRow: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '8px 0',
//     borderBottom: '1px solid #e2e8f0',
//   },
//   detailLabel: {
//     fontWeight: '600',
//     color: '#4a5568',
//   },
//   detailValue: {
//     color: '#2d3748',
//     fontWeight: '500',
//   },
//   transactionId: {
//     backgroundColor: '#edf2f7',
//     padding: '12px',
//     borderRadius: '6px',
//     fontFamily: 'monospace',
//     fontSize: '1rem',
//     fontWeight: 'bold',
//     textAlign: 'center' as 'center',
//     color: '#2d3748',
//     marginBottom: '15px',
//   },
//   urgency: {
//     backgroundColor: '#fed7d7',
//     border: '1px solid #fc8181',
//     borderRadius: '6px',
//     padding: '12px',
//     textAlign: 'center' as 'center',
//     marginBottom: '20px',
//   },
//   urgencyText: {
//     color: '#c53030',
//     fontWeight: '600',
//     margin: 0,
//   },
//   actionSection: {
//     textAlign: 'center' as 'center',
//     marginTop: '25px',
//   },
//   actionButton: {
//     backgroundColor: '#3182ce',
//     color: '#ffffff',
//     padding: '12px 30px',
//     borderRadius: '6px',
//     textDecoration: 'none',
//     fontWeight: '600',
//     fontSize: '1rem',
//     display: 'inline-block',
//     margin: '0 10px 10px 10px',
//   },
//   secondaryButton: {
//     backgroundColor: '#718096',
//     color: '#ffffff',
//     padding: '12px 30px',
//     borderRadius: '6px',
//     textDecoration: 'none',
//     fontWeight: '600',
//     fontSize: '1rem',
//     display: 'inline-block',
//     margin: '0 10px 10px 10px',
//   },
//   footer: {
//     backgroundColor: '#edf2f7',
//     padding: '20px',
//     textAlign: 'center' as 'center',
//     fontSize: '0.85rem',
//     color: '#718096',
//   },
//   footerText: {
//     margin: '5px 0',
//   },
// };
// const TransactionMail: React.FC<EmailTemplateProps> = ({ 
//   email, 
//   transactionId,
//   amount = "Amount not specified",
//   type,
//   coin = "USDT",
//   timestamp = new Date().toLocaleString()
// }) => {
//   const review = 'https://www.rejah.net/admin/transactions'
//   const dashboard = 'https://www.rejah.net/admin/dashboard'
//   return (
//     <div style={styles.body}>
//       <div style={styles.container}>
//         {/* Header */}
//         <div style={styles.header}>
//           <div style={styles.logo}>Rejah</div>
//           <div style={styles.tagline}>Peer-to-Peer Trading Platform</div>
//         </div>
//         {/* Content */}
//         <div style={styles.content}>
//           {/* Alert Banner */}
//           <div style={styles.alertBanner}>
//             <span style={styles.alertIcon}>⚠️</span>
//             <p style={styles.alertText}>Admin Action Required - Transaction Review</p>
//           </div>
//           {/* Greeting */}
//           <p style={styles.greeting}>
//             Hello Admin,
//           </p>
//           {/* Transaction Card */}
//           <div style={styles.transactionCard}>
//             <h2 style={styles.transactionTitle}>📥 Incoming Transaction</h2>
//             <div style={styles.transactionId}>
//               ID: {transactionId}
//             </div>
//             <div style={styles.transactionDetails}>
//               <div style={styles.detailRow}>
//                 <span style={styles.detailLabel}>User:</span>
//                 <span style={styles.detailValue}>{email}</span>
//               </div>
//               <div style={styles.detailRow}>
//                 <span style={styles.detailLabel}>Type:</span>
//                 <span style={styles.detailValue}>{type} {coin}</span>
//               </div>
//               <div style={styles.detailRow}>
//                 <span style={styles.detailLabel}>Amount:</span>
//                 <span style={styles.detailValue}>{amount} {coin}</span>
//               </div>
//               <div style={styles.detailRow}>
//                 <span style={styles.detailLabel}>Timestamp:</span>
//                 <span style={styles.detailValue}>{timestamp}</span>
//               </div>
//               <div style={styles.detailRow}>
//                 <span style={styles.detailLabel}>Status:</span>
//                 <span style={styles.detailValue}>⏳ Pending Review</span>
//               </div>
//             </div>
//           </div>
//           {/* Urgency Notice */}
//           {/* <div style={styles.urgency}>
//             <p style={styles.urgencyText}>
//               ⏰ This transaction expires in 10 minutes
//             </p>
//           </div> */}
//           {/* Action Buttons */}
//           <div style={styles.actionSection}>
//             <a href={review} style={styles.actionButton}>
//               🔍 Review Transaction
//             </a>
//             <a href={dashboard} style={styles.secondaryButton}>
//               📊 View Dashboard
//             </a>
//           </div>
//           <p style={{ fontSize: '0.9rem', color: '#718096', textAlign: 'center', marginTop: '20px' }}>
//             Please review this transaction promptly to ensure smooth processing for our users.
//           </p>
//         </div>
//         {/* Footer */}
//         <div style={styles.footer}>
//           <p style={styles.footerText}>
//             <strong>New_App Trading Platform</strong>
//           </p>
//           <p style={styles.footerText}>
//             Modern P2P Bitcoin & Cryptocurrency Exchange
//           </p>
//           <p style={styles.footerText}>
//             This is an automated notification. Please do not reply to this email.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default TransactionMail;
const React = __importStar(require("react"));
const styles = {
    body: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        backgroundColor: '#0f0f23',
        margin: 0,
        padding: '40px 20px',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1b3e 50%, #2d1b69 100%)',
    },
    container: {
        maxWidth: '680px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        position: 'relative',
    },
    headerGradient: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px 30px',
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
    logo: {
        fontSize: '2.5rem',
        fontWeight: '800',
        color: '#ffffff',
        marginBottom: '8px',
        position: 'relative',
        zIndex: 1,
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    tagline: {
        fontSize: '1.1rem',
        color: 'rgba(255, 255, 255, 0.9)',
        position: 'relative',
        zIndex: 1,
        fontWeight: '500',
    },
    content: {
        padding: '50px 40px',
        background: '#ffffff',
    },
    alertBanner: {
        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '30px',
        boxShadow: '0 10px 25px rgba(251, 191, 36, 0.2)',
        position: 'relative',
        overflow: 'hidden',
    },
    alertContent: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
    },
    alertIcon: {
        fontSize: '1.5rem',
        marginRight: '15px',
        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
    },
    alertText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: '1.1rem',
        margin: 0,
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    },
    greeting: {
        fontSize: '1.3rem',
        color: '#1f2937',
        marginBottom: '30px',
        fontWeight: '600',
    },
    transactionCard: {
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        border: '1px solid rgba(148, 163, 184, 0.2)',
        borderRadius: '20px',
        padding: '35px',
        marginBottom: '30px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
    },
    transactionCardPattern: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '200px',
        height: '200px',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23667eea' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
    },
    transactionTitle: {
        fontSize: '1.6rem',
        fontWeight: '800',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '25px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
    },
    transactionId: {
        background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
        color: '#ffffff',
        padding: '16px 20px',
        borderRadius: '12px',
        fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace',
        fontSize: '1.1rem',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: '25px',
        letterSpacing: '0.5px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        zIndex: 1,
    },
    transactionDetails: {
        display: 'grid',
        gap: '16px',
        position: 'relative',
        zIndex: 1,
    },
    detailRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 20px',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '12px',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
        backdropFilter: 'blur(10px)',
    },
    detailLabel: {
        fontWeight: '700',
        color: '#374151',
        fontSize: '1rem',
    },
    detailValue: {
        color: '#1f2937',
        fontWeight: '600',
        fontSize: '1rem',
    },
    statusValue: {
        color: '#f59e0b',
        fontWeight: '700',
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    actionSection: {
        textAlign: 'center',
        marginTop: '40px',
        display: 'flex',
        gap: '16px',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    actionButton: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#ffffff',
        padding: '16px 32px',
        borderRadius: '14px',
        textDecoration: 'none',
        fontWeight: '700',
        fontSize: '1.1rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
        transition: 'all 0.2s ease',
        border: 'none',
        cursor: 'pointer',
        minWidth: '180px',
        justifyContent: 'center',
    },
    secondaryButton: {
        background: 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)',
        color: '#ffffff',
        padding: '16px 32px',
        borderRadius: '14px',
        textDecoration: 'none',
        fontWeight: '700',
        fontSize: '1.1rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 10px 25px rgba(107, 114, 128, 0.2)',
        transition: 'all 0.2s ease',
        border: 'none',
        cursor: 'pointer',
        minWidth: '180px',
        justifyContent: 'center',
    },
    noteText: {
        fontSize: '1rem',
        color: '#6b7280',
        textAlign: 'center',
        marginTop: '30px',
        padding: '20px',
        background: 'rgba(243, 244, 246, 0.5)',
        borderRadius: '12px',
        border: '1px solid rgba(209, 213, 219, 0.3)',
    },
    footer: {
        background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
        padding: '40px 30px',
        textAlign: 'center',
        fontSize: '0.95rem',
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
const TransactionMail = ({ email, transactionId, amount = "Amount not specified", type, coin = "USDT", timestamp = new Date().toLocaleString() }) => {
    const review = 'https://www.rejah.net/admin/transactions';
    const dashboard = 'https://www.rejah.net/admin/dashboard';
    return (React.createElement("div", { style: styles.body },
        React.createElement("div", { style: styles.container },
            React.createElement("div", { style: styles.headerGradient },
                React.createElement("div", { style: styles.headerPattern }),
                React.createElement("div", { style: styles.logo }, "Rejah"),
                React.createElement("div", { style: styles.tagline }, "Next-Generation P2P Trading Platform")),
            React.createElement("div", { style: styles.content },
                React.createElement("div", { style: styles.alertBanner },
                    React.createElement("div", { style: styles.alertContent },
                        React.createElement("span", { style: styles.alertIcon }, "\u26A1"),
                        React.createElement("p", { style: styles.alertText }, "Admin Action Required - Transaction Review"))),
                React.createElement("p", { style: styles.greeting }, "Hello Admin Team,"),
                React.createElement("div", { style: styles.transactionCard },
                    React.createElement("div", { style: styles.transactionCardPattern }),
                    React.createElement("h2", { style: styles.transactionTitle }, "\uD83D\uDC8E New Transaction Alert"),
                    React.createElement("div", { style: styles.transactionId },
                        "TX: ",
                        transactionId),
                    React.createElement("div", { style: styles.transactionDetails },
                        React.createElement("div", { style: styles.detailRow },
                            React.createElement("span", { style: styles.detailLabel }, "\uD83D\uDC64 User:"),
                            React.createElement("span", { style: styles.detailValue }, email)),
                        React.createElement("div", { style: styles.detailRow },
                            React.createElement("span", { style: styles.detailLabel }, "\uD83D\uDD04 Type:"),
                            React.createElement("span", { style: styles.detailValue },
                                type,
                                " ",
                                coin)),
                        React.createElement("div", { style: styles.detailRow },
                            React.createElement("span", { style: styles.detailLabel }, "\uD83D\uDCB0 Amount:"),
                            React.createElement("span", { style: styles.detailValue },
                                amount,
                                " ",
                                coin)),
                        React.createElement("div", { style: styles.detailRow },
                            React.createElement("span", { style: styles.detailLabel }, "\uD83D\uDD50 Time:"),
                            React.createElement("span", { style: styles.detailValue }, timestamp)),
                        React.createElement("div", { style: styles.detailRow },
                            React.createElement("span", { style: styles.detailLabel }, "\uD83D\uDCCA Status:"),
                            React.createElement("span", { style: styles.statusValue },
                                React.createElement("span", { style: { fontSize: '0.8rem' } }, "\u23F3"),
                                " Pending Review")))),
                React.createElement("div", { style: styles.actionSection },
                    React.createElement("a", { href: review, style: styles.actionButton }, "\uD83D\uDD0D Review Transaction"),
                    React.createElement("a", { href: dashboard, style: styles.secondaryButton }, "\uD83D\uDCC8 Dashboard")),
                React.createElement("p", { style: styles.noteText }, "\u26A1 Swift action ensures optimal user experience and platform efficiency. Your prompt attention is greatly appreciated.")),
            React.createElement("div", { style: styles.footer },
                React.createElement("p", { style: styles.footerText },
                    React.createElement("span", { style: styles.companyName }, "Rejah Trading Platform")),
                React.createElement("p", { style: styles.footerText }, "Modern P2P Bitcoin & Cryptocurrency Exchange"),
                React.createElement("p", { style: styles.footerText }, "This is an automated notification \u2022 Please do not reply to this email")))));
};
exports.default = TransactionMail;
