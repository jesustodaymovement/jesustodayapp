import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { LogOut, Search, Mail, Phone, Building2, Calendar, Trash2 } from "lucide-react";

type Submission = {
  id: string;
  type: "contact" | "vraag" | "partner";
  status: "nieuw" | "gelezen" | "afgehandeld";
  name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  subject: string | null;
  message: string;
  metadata: any;
  created_at: string;
};

const typeLabels = { contact: "Contact", vraag: "Vraag", partner: "Partner" } as const;
const statusColors: Record<Submission["status"], string> = {
  nieuw: "bg-gold/30 text-anthracite",
  gelezen: "bg-muted text-muted-foreground",
  afgehandeld: "bg-green-100 text-green-800",
};

const AdminSubmissions = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading: authLoading } = useAdminAuth();
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selected, setSelected] = useState<Submission | null>(null);

  useEffect(() => {
    if (!authLoading && (!session || !isAdmin)) navigate("/admin/login", { replace: true });
  }, [session, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    void load();
  }, [isAdmin]);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from("submissions").select("*").order("created_at", { ascending: false });
    if (error) toast({ title: "Laden mislukt", description: error.message, variant: "destructive" });
    else setItems((data as Submission[]) ?? []);
    setLoading(false);
  }

  async function updateStatus(id: string, status: Submission["status"]) {
    const { error } = await supabase.from("submissions").update({ status }).eq("id", id);
    if (error) toast({ title: "Bijwerken mislukt", description: error.message, variant: "destructive" });
    else {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
      if (selected?.id === id) setSelected({ ...selected, status });
    }
  }

  async function remove(id: string) {
    if (!confirm("Deze inzending definitief verwijderen?")) return;
    const { error } = await supabase.from("submissions").delete().eq("id", id);
    if (error) toast({ title: "Verwijderen mislukt", description: error.message, variant: "destructive" });
    else {
      setItems((prev) => prev.filter((i) => i.id !== id));
      if (selected?.id === id) setSelected(null);
    }
  }

  const filtered = useMemo(() => {
    return items.filter((i) => {
      if (filterType !== "all" && i.type !== filterType) return false;
      if (filterStatus !== "all" && i.status !== filterStatus) return false;
      if (search) {
        const s = search.toLowerCase();
        if (
          !i.name.toLowerCase().includes(s) &&
          !i.email.toLowerCase().includes(s) &&
          !i.message.toLowerCase().includes(s) &&
          !(i.organization ?? "").toLowerCase().includes(s) &&
          !(i.subject ?? "").toLowerCase().includes(s)
        )
          return false;
      }
      return true;
    });
  }, [items, search, filterType, filterStatus]);

  if (authLoading || !isAdmin) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-muted-foreground">Bezig met laden...</p>
      </main>
    );
  }

  return (
    <>
      <Helmet>
        <title>Inzendingen | JesusToday admin</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <main className="min-h-screen bg-cream">
        <header className="bg-background border-b border-border/50">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-anthracite">Inzendingen</h1>
              <p className="text-xs text-muted-foreground">{session?.user.email}</p>
            </div>
            <Button
              variant="outline"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate("/admin/login", { replace: true });
              }}
            >
              <LogOut className="w-4 h-4" /> Uitloggen
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Zoek op naam, e-mail, bericht..." className="pl-9" />
            </div>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="all">Alle types</option>
              <option value="contact">Contact</option>
              <option value="vraag">Vraag</option>
              <option value="partner">Partner</option>
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="all">Alle statussen</option>
              <option value="nieuw">Nieuw</option>
              <option value="gelezen">Gelezen</option>
              <option value="afgehandeld">Afgehandeld</option>
            </select>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
            <div className="bg-background rounded-2xl border border-border/50 overflow-hidden">
              {loading ? (
                <p className="p-6 text-muted-foreground">Laden...</p>
              ) : filtered.length === 0 ? (
                <p className="p-6 text-muted-foreground">Geen inzendingen gevonden.</p>
              ) : (
                <ul className="divide-y divide-border/50 max-h-[70vh] overflow-y-auto">
                  {filtered.map((i) => (
                    <li key={i.id}>
                      <button
                        onClick={() => {
                          setSelected(i);
                          if (i.status === "nieuw") updateStatus(i.id, "gelezen");
                        }}
                        className={`w-full text-left p-4 hover:bg-cream transition ${selected?.id === i.id ? "bg-cream" : ""}`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-semibold text-anthracite text-sm">{i.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[i.status]}`}>{i.status}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                          <span className="font-medium">{typeLabels[i.type]}</span>
                          <span>·</span>
                          <span>{new Date(i.created_at).toLocaleString("nl-NL")}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{i.subject || i.message}</p>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="bg-background rounded-2xl border border-border/50 p-6">
              {!selected ? (
                <p className="text-muted-foreground">Selecteer een inzending om details te zien.</p>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-bold text-anthracite">{selected.subject || typeLabels[selected.type]}</h2>
                      <p className="text-sm text-muted-foreground">{typeLabels[selected.type]}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full ${statusColors[selected.status]}`}>{selected.status}</span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-anthracite">
                      <Mail className="w-4 h-4 text-gold" />
                      <a href={`mailto:${selected.email}`} className="hover:underline">{selected.email}</a>
                    </div>
                    {selected.phone && (
                      <div className="flex items-center gap-2 text-anthracite">
                        <Phone className="w-4 h-4 text-gold" />
                        <a href={`tel:${selected.phone}`} className="hover:underline">{selected.phone}</a>
                      </div>
                    )}
                    {selected.organization && (
                      <div className="flex items-center gap-2 text-anthracite">
                        <Building2 className="w-4 h-4 text-gold" />
                        <span>{selected.organization}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(selected.created_at).toLocaleString("nl-NL")}</span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-cream p-4">
                    <p className="text-sm whitespace-pre-wrap text-anthracite">{selected.message}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                    <Button size="sm" variant={selected.status === "nieuw" ? "default" : "outline"} onClick={() => updateStatus(selected.id, "nieuw")}>Nieuw</Button>
                    <Button size="sm" variant={selected.status === "gelezen" ? "default" : "outline"} onClick={() => updateStatus(selected.id, "gelezen")}>Gelezen</Button>
                    <Button size="sm" variant={selected.status === "afgehandeld" ? "default" : "outline"} onClick={() => updateStatus(selected.id, "afgehandeld")}>Afgehandeld</Button>
                    <Button size="sm" variant="ghost" className="ml-auto text-destructive" onClick={() => remove(selected.id)}>
                      <Trash2 className="w-4 h-4" /> Verwijderen
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminSubmissions;