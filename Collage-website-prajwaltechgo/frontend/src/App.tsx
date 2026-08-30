import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';
import { StudentPortalLayout } from './components/StudentPortalLayout.js';
import { AdminPortalLayout } from './components/AdminPortalLayout.js';

// Public Pages
import { HomePage } from './pages/HomePage.js';
import { AboutPage } from './pages/AboutPage.js';
import { CoursesPage } from './pages/CoursesPage.js';
import { AdmissionsPage } from './pages/AdmissionsPage.js';
import { CampusLifePage } from './pages/CampusLifePage.js';
import { FacultyPage } from './pages/FacultyPage.js';
import { ContactPage } from './pages/ContactPage.js';
import { LoginPage } from './pages/LoginPage.js';
import { RegisterPage } from './pages/RegisterPage.js';

// Student Pages
import { StudentDashboardPage } from './pages/student/StudentDashboardPage.js';
import { StudentApplicationPage } from './pages/student/StudentApplicationPage.js';
import { StudentProfilePage } from './pages/student/StudentProfilePage.js';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage.js';
import { AdminApplicationsPage } from './pages/admin/AdminApplicationsPage.js';
import { AdminStudentsPage } from './pages/admin/AdminStudentsPage.js';

const MainRouter: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const { user, isAdmin } = useAuth();

  // Custom Navigation Handler
  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // --- Route Guarding ---
  // Student Portal Guard
  if (currentPath.startsWith('/student')) {
    if (!user) {
      return (
        <div className="min-h-screen flex flex-col bg-slate-50">
          <Navbar currentPath={currentPath} onNavigate={handleNavigate} />
          <main className="flex-1 flex items-center justify-center p-4">
            <LoginPage onNavigate={handleNavigate} />
          </main>
          <Footer onNavigate={handleNavigate} />
        </div>
      );
    }

    return (
      <StudentPortalLayout currentPath={currentPath} onNavigate={handleNavigate}>
        {currentPath === '/student/dashboard' && <StudentDashboardPage onNavigate={handleNavigate} />}
        {currentPath === '/student/application' && <StudentApplicationPage onNavigate={handleNavigate} />}
        {currentPath === '/student/profile' && <StudentProfilePage onNavigate={handleNavigate} />}
        {/* Default student fallback */}
        {!['/student/dashboard', '/student/application', '/student/profile'].includes(currentPath) && (
          <StudentDashboardPage onNavigate={handleNavigate} />
        )}
      </StudentPortalLayout>
    );
  }

  // Admin Portal Guard
  if (currentPath.startsWith('/admin')) {
    if (!user || !isAdmin) {
      return (
        <div className="min-h-screen flex flex-col bg-slate-50">
          <Navbar currentPath={currentPath} onNavigate={handleNavigate} />
          <main className="flex-1 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-4 bg-white p-8 border border-slate-200 border-l-4 border-l-amber-500 shadow-lg">
              <h2 className="text-xl font-bold uppercase tracking-tight text-slate-900">
                Administrator Access Required
              </h2>
              <p className="text-xs text-slate-500">
                Please log in with administrator credentials (e.g. <code className="bg-slate-100 px-1.5 py-0.5 text-slate-900 font-mono">admin@prajwaltechgo.edu</code>) to view the administration console.
              </p>
              <button
                onClick={() => handleNavigate('/login')}
                className="w-full py-2.5 bg-slate-900 text-white font-bold uppercase tracking-wider text-xs shadow-md cursor-pointer hover:bg-slate-800"
              >
                Go to Sign In
              </button>
            </div>
          </main>
          <Footer onNavigate={handleNavigate} />
        </div>
      );
    }

    return (
      <AdminPortalLayout currentPath={currentPath} onNavigate={handleNavigate}>
        {currentPath === '/admin/dashboard' && <AdminDashboardPage onNavigate={handleNavigate} />}
        {currentPath === '/admin/applications' && <AdminApplicationsPage onNavigate={handleNavigate} />}
        {currentPath === '/admin/students' && <AdminStudentsPage onNavigate={handleNavigate} />}
        {/* Default admin fallback */}
        {!['/admin/dashboard', '/admin/applications', '/admin/students'].includes(currentPath) && (
          <AdminDashboardPage onNavigate={handleNavigate} />
        )}
      </AdminPortalLayout>
    );
  }

  // --- Public Website Layout ---
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased selection:bg-amber-400 selection:text-slate-950">
      <Navbar currentPath={currentPath} onNavigate={handleNavigate} />

      <main className="flex-1">
        {currentPath === '/' && <HomePage onNavigate={handleNavigate} />}
        {currentPath === '/about' && <AboutPage onNavigate={handleNavigate} />}
        {currentPath === '/courses' && <CoursesPage onNavigate={handleNavigate} />}
        {currentPath === '/admissions' && <AdmissionsPage onNavigate={handleNavigate} />}
        {currentPath === '/campus' && <CampusLifePage onNavigate={handleNavigate} />}
        {currentPath === '/faculty' && <FacultyPage onNavigate={handleNavigate} />}
        {currentPath === '/contact' && <ContactPage onNavigate={handleNavigate} />}
        {currentPath === '/login' && <LoginPage onNavigate={handleNavigate} />}
        {currentPath === '/register' && <RegisterPage onNavigate={handleNavigate} />}

        {/* 404 Fallback */}
        {![
          '/',
          '/about',
          '/courses',
          '/admissions',
          '/campus',
          '/faculty',
          '/contact',
          '/login',
          '/register',
        ].includes(currentPath) && (
          <div className="max-w-xl mx-auto py-24 px-4 text-center space-y-4">
            <h2 className="text-4xl font-extrabold uppercase tracking-tight text-slate-900">404</h2>
            <p className="text-sm text-slate-600">Page not found in Prajwal Tech Go College Directory.</p>
            <button
              onClick={() => handleNavigate('/')}
              className="px-6 py-2.5 bg-slate-900 text-white font-bold uppercase tracking-wider text-xs shadow-md cursor-pointer hover:bg-slate-800"
            >
              Return to College Homepage
            </button>
          </div>
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <MainRouter />
    </AuthProvider>
  );
}

export default App;
