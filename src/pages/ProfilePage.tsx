
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";

export default function ProfilePage() {
  // Datos de ejemplo del perfil
  const profile = {
    name: "Usuario Demo",
    email: "usuario@demo.com",
    joined: "Mayo 2024",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-10">
        <div className="flex flex-col md:flex-row gap-8">
          <Card className="md:w-80 h-fit">
            <CardHeader>
              <CardTitle>Perfil</CardTitle>
              <CardDescription>Gestiona tu información personal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <p className="text-sm font-medium">Nombre</p>
                <p className="text-sm text-muted-foreground">{profile.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Miembro desde</p>
                <p className="text-sm text-muted-foreground">{profile.joined}</p>
              </div>
              <Button variant="outline" className="w-full">Cerrar sesión</Button>
            </CardContent>
          </Card>
          
          <div className="flex-1">
            <Tabs defaultValue="settings" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="settings">Configuración</TabsTrigger>
                <TabsTrigger value="history">Historial</TabsTrigger>
                <TabsTrigger value="saved">Guardados</TabsTrigger>
              </TabsList>
              
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuración de la cuenta</CardTitle>
                    <CardDescription>
                      Actualiza tu información personal y preferencias.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nombre</Label>
                          <Input id="name" defaultValue={profile.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue={profile.email} />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Contraseña actual</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="new-password">Nueva contraseña</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                      </div>
                      
                      <Button>Guardar cambios</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Historial de búsquedas</CardTitle>
                    <CardDescription>
                      Tus búsquedas recientes en TechRank.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      No tienes búsquedas recientes.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="saved">
                <Card>
                  <CardHeader>
                    <CardTitle>Productos guardados</CardTitle>
                    <CardDescription>
                      Productos que has guardado para comparar más tarde.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      No tienes productos guardados.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
