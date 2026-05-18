import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const navigate = useNavigate();
  const { session, isAdmin, loading: authLoading } = useAdminAuth();

  useEffect(() => {
    if (!authLoading && session && isAdmin) navigate("/admin/inzendingen", { replace: true });
  }, [session, isAdmin, authLoading, navigate]);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin/inzendingen` },
        });
        if (error) throw error;
        toast({ title: "Account aangemaakt", description: "Check je e-mail om je adres te bevestigen. Een admin moet je nog rechten geven." });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: any) {
      toast({ title: "Inloggen mislukt", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin login | JesusToday</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <main className="min-h-screen bg-cream flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-background rounded-2xl shadow-card border border-border/50 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
              <Lock className="w-5 h-5 text-gold" />
            </div>
            <h1 className="text-2xl font-bold text-anthracite">Admin {mode === "signup" ? "account aanmaken" : "login"}</h1>
          </div>
          <form onSubmit={handle} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">E-mail</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Wachtwoord</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? "Bezig..." : mode === "signup" ? "Account aanmaken" : "Inloggen"}
            </Button>
          </form>
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="mt-4 text-sm text-muted-foreground hover:text-anthracite w-full text-center"
          >
            {mode === "login" ? "Nog geen account? Maak er een aan" : "Al een account? Inloggen"}
          </button>
        </div>
      </main>
    </>
  );
};

export default AdminLogin;