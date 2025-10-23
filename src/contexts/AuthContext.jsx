import { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '@/config/firebase';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setSession(currentUser ? { user: currentUser } : null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email, password, fullName, photoURL) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      if (fullName || photoURL) {
        await firebaseUpdateProfile(userCredential.user, {
          displayName: fullName,
          photoURL: photoURL || null
        });
      }

      toast({
        title: "Success!",
        description: "Account created successfully!",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      
      toast({
        title: "Welcome!",
        description: "Successfully signed in with Google.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);

      toast({
        title: "Signed out",
        description: "Come back soon!",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateProfile = async (name, photoURL) => {
    try {
      if (!auth.currentUser) throw new Error('No user logged in');

      await firebaseUpdateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL
      });
      await auth.currentUser.reload();
      const updatedUser = auth.currentUser;
      setUser(updatedUser);

      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully!",
      });
      return updatedUser;
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);

      toast({
        title: "Password reset email sent",
        description: "Please check your email to reset your password.",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, signUp, signIn, signInWithGoogle, signOut, updateProfile, resetPassword, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
