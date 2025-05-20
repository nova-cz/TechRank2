
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    
    // Simulación de inicio de sesión
    setTimeout(() => {
      setIsLoading(false);
      // Aquí se implementará la lógica real de autenticación
    }, 1000);
  };

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    
    // Simulación de registro
    setTimeout(() => {
      setIsLoading(false);
      // Aquí se implementará la lógica real de registro
    }, 1000);
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-10">
      <Tabs defaultValue="login" className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <Link to="/" className="flex items-center gap-2 mb-2">
            <ShoppingBag className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">TechRank</span>
          </Link>
        </div>
        
        <TabsList className="grid grid-cols-2 w-full mb-6">
          <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
          <TabsTrigger value="register">Registrarse</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Iniciar sesión</CardTitle>
              <CardDescription>
                Ingresa tus credenciales para acceder a tu cuenta.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Contraseña</Label>
                    <Link to="/reset-password" className="text-xs text-primary hover:underline">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Crear una cuenta</CardTitle>
              <CardDescription>
                Completa el formulario para crear tu cuenta en TechRank.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">Nombre</Label>
                    <Input id="first-name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Apellido</Label>
                    <Input id="last-name" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creando cuenta..." : "Crear cuenta"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Al registrarte, aceptas nuestros 
              <Link to="/terms" className="text-primary hover:underline mx-1">
                términos de servicio
              </Link>
              y
              <Link to="/privacy" className="text-primary hover:underline mx-1">
                política de privacidad
              </Link>.
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
